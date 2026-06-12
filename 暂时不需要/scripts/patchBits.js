/**
 * Patch missing playerBitmask bits (awards, draft, background).
 * Reads the existing fullBuild.json, fills in bits 5-16 from NBA API + Kaggle.
 * Usage: node scripts/patchBits.js
 */
const fs = require('fs'), path = require('path');
const STATE = path.join(__dirname, '..', 'build-cache', 'fullBuild.json');
const CSV_DIR = path.join(process.env.USERPROFILE, '.cache', 'kagglehub', 'datasets', 'wyattowalsh', 'basketball', 'versions', '231', 'csv');

// Load existing data
const players = JSON.parse(fs.readFileSync(STATE, 'utf-8'));
console.log('Loaded', players.length, 'players');

// Load Kaggle data for draft/country
function parseCsv(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const vals = [];
    let i = 0, cur = '';
    while (i < line.length) {
      if (line[i] === '"') { i++; while (i < line.length && line[i] !== '"') { cur += line[i]; i++; } i++; }
      else if (line[i] === ',') { vals.push(cur); cur = ''; i++; }
      else { cur += line[i]; i++; }
    }
    vals.push(cur);
    const obj = {};
    headers.forEach((h, idx) => obj[h.trim()] = (vals[idx] || '').trim());
    return obj;
  });
}

console.log('Loading Kaggle data...');
const kagglePlayers = {};
const kaggleRows = parseCsv(path.join(CSV_DIR, 'common_player_info.csv'));
for (const r of kaggleRows) {
  kagglePlayers[r.person_id] = r;
}

// Bit position constants (PB)
const BITS = {
  mvp: 5, all_star: 6, champion: 7, hall_of_fame: 8,
  dpoy: 9, roty: 10, finals_mvp: 11, all_nba: 12,
  only_one_team: 13, born_outside_us: 14,
  first_round_pick: 15, undrafted: 16
};

// Phase 1: Fill from Kaggle (draft, country) and existing data (only_one_team)
console.log('\n=== Phase 1: Kaggle + existing data ===');
let patched = 0;
for (const p of players) {
  let bm = p[5]; // existing bits (0-4: career stats)

  // Bit 13: only_one_team
  if (p[3].length === 1) { bm |= (1 << BITS.only_one_team); }

  // Bits 14-16: from Kaggle
  const k = kagglePlayers[String(p[0])];
  if (k) {
    const country = (k.country || '').toLowerCase();
    if (country && !['usa', 'united states', ''].includes(country)) {
      bm |= (1 << BITS.born_outside_us);
    }
    const dr = (k.draft_round || '').trim();
    if (dr === '1') { bm |= (1 << BITS.first_round_pick); }
    else if (dr === '' || dr === '0' || dr === 'Undrafted') { bm |= (1 << BITS.undrafted); }
  }

  p[5] = bm;
  if (bm !== (p[5] & ~0x3F | (p[5] & 0x3F))) patched++; // just counting
}
console.log('Phase 1 done. Total players with additional bits:', patched);

// Save Phase 1 progress
fs.writeFileSync(STATE, JSON.stringify(players));
console.log('Saved Phase 1 to fullBuild.json');

// Phase 2: Fetch awards from NBA API
console.log('\n=== Phase 2: Fetching awards from API ===');
const nba = require('nba-api-client');

// Track which bits we've already set to avoid unnecessary API calls
// Key awards: mvp(5), all_star(6), champion(7), hof(8), dpoy(9), roty(10), finals_mvp(11), all_nba(12)
// We need to know: did the player win each award?
const AWARD_MAP = {
  'mvp': 'mvp',
  'all_star': 'all_star',
  'champion': 'champion',
  'hall_of_fame': 'hall_of_fame',
  'dpoy': 'dpoy',
  'roty': 'roty',
  'finals_mvp': 'finals_mvp',
  'all_nba': 'all_nba',
};

// Process all players for awards
let todo = players.map((p, i) => ({ p, i })).filter(({ p }) => {
  // Skip players who already have all award bits set (optimization)
  return (p[5] & 0x1FE0) !== 0x1FE0; // bits 5-12 = 0x1FE0
});

console.log('Players needing awards check:', todo.length, '/', players.length);
let fetched = 0;
let batch = [];
const BATCH_SAVE = 50;

// Try nba-api-client for awards
const usedApi = {}; // track which players used the API

for (let i = 0; i < todo.length; i++) {
  const { p, idx } = todo[i];
  const pid = p[0];
  const name = p[1];

  process.stdout.write(`${name} (${pid})... `);

  try {
    const awards = await Promise.race([
      nba.playerAwards({ PlayerID: pid }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))
    ]);

    if (awards) {
      let bm = p[5];
      // Extract award types from the response
      // The response format varies - try common formats
      let awardList = [];
      if (Array.isArray(awards)) awardList = awards;
      else if (awards.awards) awardList = Array.isArray(awards.awards) ? awards.awards : [awards.awards];
      else if (awards.OtherSets) {
        // Some response formats have nested data
        for (const key of Object.keys(awards)) {
          if (Array.isArray(awards[key])) awardList = awardList.concat(awards[key]);
        }
      }

      // Normalize award names and set bits
      for (const award of awardList) {
        const aName = (typeof award === 'string' ? award : (award.award || award.awardName || award.name || award.description || '')).toLowerCase();
        if (aName.includes('most valuable player')) bm |= (1 << BITS.mvp);
        if (aName.includes('all-star') || aName.includes('all star')) bm |= (1 << BITS.all_star);
        if (aName.includes('champion') || aName.includes('championship') || aName.includes('title') || aName.includes('nba champion')) bm |= (1 << BITS.champion);
        if (aName.includes('hall of fame') || aName.includes('hof')) bm |= (1 << BITS.hall_of_fame);
        if (aName.includes('defensive player')) bm |= (1 << BITS.dpoy);
        if (aName.includes('rookie of the year') || aName.includes('roty')) bm |= (1 << BITS.roty);
        if (aName.includes('finals mvp') || aName.includes('bill russell')) bm |= (1 << BITS.finals_mvp);
        if (aName.includes('all-nba') || aName.includes('all nba')) bm |= (1 << BITS.all_nba);
      }

      p[5] = bm;
      usedApi[pid] = true;
      process.stdout.write(`awards OK\n`);
    } else {
      process.stdout.write(`no awards data\n`);
    }
    fetched++;
  } catch (e) {
    process.stdout.write(`skip (${e.message})\n`);
  }

  batch.push(players[idx]);
  if (batch.length >= BATCH_SAVE || i === todo.length - 1) {
    fs.writeFileSync(STATE, JSON.stringify(players));
    console.log(`>>> Saved: ${fetched}/${todo.length} checked <<<`);
    batch = [];
  }
}

// Final save
fs.writeFileSync(STATE, JSON.stringify(players));
console.log(`\nDone! Processed ${fetched} players for awards`);

// Report final bitmask coverage
const bmCoverage = {};
for (const p of players) {
  for (let bit = 0; bit < 17; bit++) {
    if (p[5] & (1 << bit)) bmCoverage[bit] = (bmCoverage[bit] || 0) + 1;
  }
}
const BN = {0:'20000pts',1:'10000reb',2:'5000ast',3:'1000stl',4:'1000blk',
            5:'mvp',6:'all_star',7:'champion',8:'hof',9:'dpoy',10:'roty',
            11:'finals_mvp',12:'all_nba',13:'only_one_team',14:'born_outside_us',
            15:'first_round',16:'undrafted'};
console.log('\n=== Final bitmask coverage ===');
for (let bit = 0; bit < 17; bit++) {
  const cnt = bmCoverage[bit] || 0;
  console.log(`  bit ${bit} (${BN[bit]}): ${cnt} players (${(cnt/players.length*100).toFixed(1)}%)`);
}
