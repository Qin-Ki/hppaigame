/**
 * Process a single player and output JSON result to stdout.
 * Called as a child process by nuclearBuild.js
 * Usage: node scripts/processOne.js <playerId> "<name>" "<abbrev>"
 */
const nba = require('nba-api-client');

const pid = parseInt(process.argv[2]);
const name = process.argv[3] || '';
const abbrev = process.argv[4] || '';

const ALL_TIDS = new Set([1610612737,1610612738,1610612739,1610612740,1610612741,1610612742,1610612743,1610612744,1610612745,1610612746,1610612747,1610612748,1610612749,1610612750,1610612751,1610612752,1610612753,1610612754,1610612755,1610612756,1610612757,1610612758,1610612759,1610612760,1610612761,1610612762,1610612763,1610612764,1610612765,1610612766]);

function toArray(o) {
  if (Array.isArray(o)) return o.filter(Boolean);
  if (o && typeof o === 'object') return Object.values(o).filter(Boolean);
  return [];
}

async function main() {
  try {
    const result = await Promise.race([
      nba.playerCareerStats({ PlayerID: pid }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 12000))
    ]);
    if (!result) { console.log(JSON.stringify([pid, name, abbrev, [], [], 0, []])); process.exit(0); }

    const seasons = toArray(result.SeasonTotalsRegularSeason);
    if (seasons.length === 0) { console.log(JSON.stringify([pid, name, abbrev, [], [], 0, []])); process.exit(0); }

    // Extract team IDs
    const tids = [], seen = new Set();
    for (const s of seasons) {
      if (s.TEAM_ID && ALL_TIDS.has(s.TEAM_ID) && !seen.has(s.TEAM_ID)) {
        seen.add(s.TEAM_ID);
        tids.push(s.TEAM_ID);
      }
    }
    if (tids.length === 0) { console.log(JSON.stringify([pid, name, abbrev, [], [], 0, []])); process.exit(0); }

    // Per-team stat season bitmasks
    const checks = [[20,'PTS'],[25,'PTS'],[30,'PTS'],[10,'REB'],[5,'AST'],[10,'AST'],[1,'STL'],[2,'STL'],[1,'BLK'],[.5,'FG_PCT'],[.4,'FG3_PCT'],[.8,'FT_PCT']];
    const tbm = tids.map(tid => {
      let bm = 0;
      const ts = seasons.filter(s => s.TEAM_ID === tid);
      for (let i = 0; i < checks.length; i++) {
        for (const s of ts) {
          const v = parseFloat(s[checks[i][1]]);
          if (!isNaN(v) && v >= checks[i][0]) { bm |= (1 << i); break; }
        }
      }
      return bm;
    });

    // Career totals
    let cp = 0, cr = 0, ca = 0, cs = 0, cb = 0;
    for (const s of seasons) {
      const gp = parseInt(s.GP, 10);
      if (!gp) continue;
      const pts = parseFloat(s.PTS); if (!isNaN(pts)) cp += pts * gp;
      const reb = parseFloat(s.REB); if (!isNaN(reb)) cr += reb * gp;
      const ast = parseFloat(s.AST); if (!isNaN(ast)) ca += ast * gp;
      const stl = parseFloat(s.STL); if (!isNaN(stl)) cs += stl * gp;
      const blk = parseFloat(s.BLK); if (!isNaN(blk)) cb += blk * gp;
    }

    // Player bitmask (5 bits for career stats)
    let pbm = 0;
    if (cp >= 20000) pbm |= 1;
    if (cr >= 10000) pbm |= 2;
    if (ca >= 5000) pbm |= 4;
    if (cs >= 1000) pbm |= 8;
    if (cb >= 1000) pbm |= 16;

    console.log(JSON.stringify([pid, name, abbrev, tids, tbm, pbm, []]));
  } catch (e) {
    console.log(JSON.stringify([pid, name, abbrev, [], [], 0, []]));
  }
}

main();
