/**
 * Nuclear Build: processes each player in its own OS-level process.
 * Calls scripts/processOne.js for each player.
 * Usage: node scripts/nuclearBuild.js
 */
const { execSync } = require('child_process');
const fs = require('fs'), path = require('path');
const STATE = path.join(__dirname, '..', 'build-cache', 'fullBuild.json');
const PLAYERS = path.join(__dirname, '..', 'build-cache', 'players.json');

const done = fs.existsSync(STATE) ? JSON.parse(fs.readFileSync(STATE, 'utf-8')) : [];
const doneIds = new Set(done.map(d => d[0]));
const all = JSON.parse(fs.readFileSync(PLAYERS, 'utf-8'));
const todo = all.filter(p => !doneIds.has(p.pid));

console.log('Resumed:', done.length, 'cached,', todo.length, 'todo');
let batch = [];

for (let i = 0; i < todo.length; i++) {
  const p = todo[i];
  process.stdout.write(`${p.name} (${p.pid})... `);
  try {
    const out = execSync(
      `node "${path.join(__dirname, 'processOne.js')}" ${p.pid} "${(p.name||'').replace(/"/g,'\\"')}" "${(p.abbrev||'').replace(/"/g,'\\"')}"`,
      { timeout: 20000, cwd: path.join(__dirname, '..'), windowsHide: true, maxBuffer: 1024 * 1024, stdio: ['pipe', 'pipe', 'ignore'] }
    );
    const data = JSON.parse(out.toString().trim());
    done.push(data);
    batch.push(data);
    process.stdout.write(`${data[3].length} teams\n`);
  } catch (e) {
    process.stdout.write(`skip\n`);
  }

  if (batch.length >= 10 || i === todo.length - 1) {
    fs.writeFileSync(STATE, JSON.stringify(done));
    const pct = Math.round(done.length / all.length * 100);
    console.log('>>> SAVED: ' + done.length + '/' + all.length + ' (' + pct + '%) <<<');
    batch = [];
  }
}

console.log('\nDone! ' + done.length + ' players');
