/**
 * sync_positions.mjs
 * ===================
 * Sync NBA player positions from the `nba` npm library into the three
 * decade-based JS data files:
 *   - nba-data-60s-80s.js  (NBA_DATA_60S_80S)
 *   - nba-data-90s-00s.js  (NBA_DATA_90S_00S)
 *   - nba-data-10s-20s.js  (NBA_DATA_10S_20S)
 *
 * Workflow:
 *   1. Read each JS file, extract the player objects
 *   2. Load mapping_v4.json (Chinese → English name)
 *   3. Fetch ALL historical players via nba.stats.playersInfo (5126 players)
 *   4. For each unique Chinese player name, map to English, look up
 *      playerId, then fetch position via nba.stats.playerInfo
 *   5. Update the `pos` field in each player object
 *   6. Write updated JS files back to disk
 *
 * Resilience:
 *   - Map-based cache to avoid duplicate lookups (same player in multiple eras)
 *   - 600 ms delay between API calls
 *   - try-catch on every request; errors recorded as "Error: ..."
 *   - All original fields preserved
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import nba from 'nba';

// ── Config ─────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));

const JS_FILES = [
  { path: 'nba-data-60s-80s.js', varName: 'NBA_DATA_60S_80S' },
  { path: 'nba-data-90s-00s.js', varName: 'NBA_DATA_90S_00S' },
  { path: 'nba-data-10s-20s.js', varName: 'NBA_DATA_10S_20S' },
];

const MAPPING_FILE = '_cache/mapping_v4.json';
const API_DELAY_MS = 650;   // between consecutive requests
const MAX_RETRIES = 3;      // per playerInfo call

// ── Caches ─────────────────────────────────────────────────────────────
/** Map ChineseName → position string — avoids duplicate API calls */
const positionCache = new Map();
/** Set of Chinese names already logged as unmapped (avoid spam) */
const unmappedLogged = new Set();

// ── Helpers ────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * Read a JS data file and return { varName, content, data }.
 * Where `data` is the parsed JSON object.
 */
function readJsFile(filePath) {
  const absPath = resolve(__dirname, filePath);
  const content = readFileSync(absPath, 'utf-8');

  // Find "const NBA_DATA_XXX = {" and get the opening brace position
  const varMatch = content.match(/const\s+(NBA_DATA_\w+)\s*=\s*(\{)/);
  if (!varMatch) {
    throw new Error(`Could not find variable in ${filePath}`);
  }

  const varName = varMatch[1];
  const objStart = varMatch.index + varMatch[0].length - 1; // position of '{'

  // Count braces to find the matching closing brace
  let depth = 1;
  let pos = objStart + 1;
  while (depth > 0 && pos < content.length) {
    if (content[pos] === '{') depth++;
    else if (content[pos] === '}') depth--;
    pos++;
  }

  const jsonStr = content.slice(objStart, pos);

  // Parse JSON (keys are already double-quoted in the source)
  const data = JSON.parse(jsonStr);
  return { varName, content, data };
}

/**
 * Serialize a data object back into JS format, replacing the old content.
 * Preserves the original `const NBA_DATA_XXX = ` wrapper and trailing `;`.
 */
function writeJsFile(filePath, varName, data) {
  const absPath = resolve(__dirname, filePath);
  const json = JSON.stringify(data, null, 2);
  const newContent = `// ================================================================\n// NBA_DATA — Updated with real stats from nba_api\n// ================================================================\n\nconst ${varName} = ${json};\n`;
  writeFileSync(absPath, newContent, 'utf-8');
  console.log(`  [SAVE] Written ${absPath}`);
}

/**
 * Build a { downcaseName → playerId } map from the ALL-TIME player list.
 */
async function buildNameToIdMap() {
  console.log('[INFO] Fetching all-time player list (IsOnlyCurrentSeason=0) …');
  const allPlayers = await nba.stats.playersInfo({
    LeagueID: '00',
    Season: '2023-24',
    IsOnlyCurrentSeason: 0,
  });
  console.log(`[INFO] Received ${allPlayers.length} total players.`);

  const map = new Map();
  for (const p of allPlayers) {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    if (!map.has(fullName)) {
      map.set(fullName, p.playerId);
    }
    // Also index by "last, first"
    const lfKey = `${p.lastName}, ${p.firstName}`.toLowerCase();
    if (!map.has(lfKey)) {
      map.set(lfKey, p.playerId);
    }
  }
  console.log(`[INFO] Name→ID map built with ${map.size} entries.`);
  return map;
}

/**
 * Fetch the raw position string for a playerId via CommonPlayerInfo.
 */
async function fetchPosition(playerId) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const data = await nba.stats.playerInfo({ PlayerID: playerId });
      const info = data?.commonPlayerInfo?.[0];
      if (info?.position) {
        return info.position.trim();
      }
      return 'N/A';
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        console.warn(`    [WARN] Attempt ${attempt}/${MAX_RETRIES} failed for playerId=${playerId}: ${err.message}`);
        await sleep(2000 * attempt);
      } else {
        return `Error: ${err.message}`;
      }
    }
  }
  return 'N/A';
}

/**
 * Given an English player name, resolve its position.
 * Returns the cached position if available.
 */
async function resolvePosition(englishName, nameToIdMap) {
  const cacheKey = englishName.toLowerCase().trim();
  if (positionCache.has(cacheKey)) {
    return positionCache.get(cacheKey);
  }

  // Try exact match
  let playerId = nameToIdMap.get(cacheKey);

  // Try "last, first"
  if (playerId === undefined) {
    const parts = englishName.split(' ');
    if (parts.length >= 2) {
      const lastName = parts.pop();
      const firstName = parts.join(' ');
      const lfKey = `${lastName}, ${firstName}`.toLowerCase();
      playerId = nameToIdMap.get(lfKey);
    }
  }

  // Try stripping suffixes (Jr., Sr., III, II)
  if (playerId === undefined) {
    const cleaned = cacheKey.replace(/\b(jr\.?|sr\.?|iii|ii)\b/g, '').replace(/\s+/g, ' ').trim();
    if (cleaned !== cacheKey) {
      playerId = nameToIdMap.get(cleaned);
    }
  }

  if (playerId === undefined) {
    console.warn(`    [WARN] No playerId found for "${englishName}"`);
    positionCache.set(cacheKey, 'N/A');
    return 'N/A';
  }

  console.log(`    [API] Fetching position for playerId=${playerId} (${englishName}) …`);
  const position = await fetchPosition(playerId);
  positionCache.set(cacheKey, position);
  return position;
}

/**
 * Load mapping_v4.json (Chinese → English name).
 */
function loadNameMapping() {
  const absPath = resolve(__dirname, MAPPING_FILE);
  try {
    const raw = readFileSync(absPath, 'utf-8');
    const map = JSON.parse(raw);
    console.log(`[INFO] Loaded ${Object.keys(map).length} Chinese→English name mappings.`);
    return map;
  } catch (err) {
    console.warn(`[WARN] Could not load ${MAPPING_FILE}: ${err.message}`);
    return {};
  }
}

// ── Collect all unique Chinese names from JS files ─────────────────────

function collectUniqueChineseNames(jsFilesData) {
  const names = new Set();
  for (const { data } of jsFilesData) {
    for (const era of Object.keys(data)) {
      for (const team of Object.keys(data[era])) {
        for (const player of data[era][team]) {
          if (player.name) {
            names.add(player.name);
          }
        }
      }
    }
  }
  return [...names];
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  console.log('='.repeat(65));
  console.log('  NBA Position Sync — Decade-based JS data files');
  console.log('='.repeat(65));

  // 1. Read all JS data files
  const jsFilesData = [];
  for (const f of JS_FILES) {
    const { varName, content, data } = readJsFile(f.path);
    jsFilesData.push({ ...f, varName, content, data });
    const playerCount = countPlayers(data);
    console.log(`[INFO] Loaded ${f.path} (${varName}): ${playerCount} players`);
  }
  const totalPlayers = jsFilesData.reduce((s, j) => s + countPlayers(j.data), 0);
  console.log(`[INFO] Total player entries across all files: ${totalPlayers}`);

  // 2. Collect unique Chinese names
  const uniqueChineseNames = collectUniqueChineseNames(jsFilesData);
  console.log(`[INFO] Unique Chinese player names: ${uniqueChineseNames.length}`);

  // 3. Load Chinese→English name mapping
  const nameMapping = loadNameMapping();
  const mappedCount = uniqueChineseNames.filter(n => nameMapping[n]).length;
  console.log(`[INFO] ${mappedCount}/${uniqueChineseNames.length} names have mappings.`);

  // 4. Build all-time name→id map from NBA API
  const nameToIdMap = await buildNameToIdMap();

  // 5. Process each unique Chinese name → look up position
  //    Then update all occurrences in the JS data objects.
  let updated = 0;
  let skipped = 0;
  let notMapped = 0;
  let apiErrors = 0;
  let apiCalls = 0;

  for (const chineseName of uniqueChineseNames) {
    const englishName = nameMapping[chineseName];

    if (!englishName) {
      // No mapping → keep existing position (skip)
      notMapped++;
      if (!unmappedLogged.has('firstFew')) {
        console.log(`  [SKIP] No English mapping for "${chineseName}" — keeping existing pos`);
        unmappedLogged.add('firstFew');
      }
      continue;
    }

    // Check cache first
    const cacheKey = englishName.toLowerCase().trim();
    let position = positionCache.get(cacheKey);

    if (position === undefined) {
      // Need to call API
      console.log(`\n  Processing: ${chineseName} → ${englishName}`);
      position = await resolvePosition(englishName, nameToIdMap);
      positionCache.set(cacheKey, position);
      apiCalls++;

      if (position.startsWith('Error:')) {
        apiErrors++;
      } else if (position !== 'N/A') {
        updated++;
      }

      console.log(`  → ${chineseName} (${englishName}): ${position}`);

      // Rate limit
      await sleep(API_DELAY_MS);
    } else {
      // Cached — still count as updated if it's a real position
      if (position !== 'N/A' && !position.startsWith('Error:')) {
        // Already counted when first fetched
      }
    }

    // Apply position to ALL occurrences of this Chinese name across all files
    for (const { data } of jsFilesData) {
      for (const era of Object.keys(data)) {
        for (const team of Object.keys(data[era])) {
          for (const player of data[era][team]) {
            if (player.name === chineseName) {
              // Only update if different or if existing is placeholder
              if (player.pos !== position) {
                player.pos = position;
              }
            }
          }
        }
      }
    }
  }

  // For names without mapping, keep existing positions (already there)
  // Count them as skipped
  skipped = totalPlayers - updated - notMapped;

  // 6. Write back all JS files
  console.log('\n' + '-'.repeat(65));
  console.log('  Writing updated files …');
  for (const { path, varName, data } of jsFilesData) {
    writeJsFile(path, varName, data);
  }

  // 7. Summary
  console.log('\n' + '='.repeat(65));
  console.log('  SYNC COMPLETE');
  console.log('='.repeat(65));
  console.log(`  Total entries          : ${totalPlayers}`);
  console.log(`  Unique Chinese names   : ${uniqueChineseNames.length}`);
  console.log(`  Mapped to English      : ${mappedCount}`);
  console.log(`  No mapping (kept orig) : ${notMapped}`);
  console.log(`  API calls made         : ${apiCalls}`);
  console.log(`  Positions updated      : ${updated}`);
  console.log(`  API errors             : ${apiErrors}`);
  console.log(`  Files written          : ${JS_FILES.length}`);
  console.log('='.repeat(65));
}

function countPlayers(data) {
  let count = 0;
  for (const era of Object.keys(data)) {
    for (const team of Object.keys(data[era])) {
      count += data[era][team].length;
    }
  }
  return count;
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
