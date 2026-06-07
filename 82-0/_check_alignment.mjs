import { readFileSync } from 'fs';

function parseJsData(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/const NBA_DATA_\w+\s*=\s*({[\s\S]*?});?\s*$/);
  if (!match) throw new Error('Could not parse: ' + filePath);
  // Replace unquoted keys and single quotes for JSON parsing
  const jsonStr = match[1]
    .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":')
    .replace(/'/g, '"');
  return JSON.parse(jsonStr);
}

const js60s = parseJsData('nba-data-60s-80s.js');
const nbaData = JSON.parse(readFileSync('nba_data.json', 'utf-8'));

console.log('JS 60s-80s decades:', Object.keys(js60s));
console.log('nba_data decades present:', Object.keys(nbaData).filter(k => ['1960s','1970s','1980s'].includes(k)));

// Check team alignment for 1960s
const jsTeams = Object.keys(js60s['1960s']);
const nbaTeams = Object.keys(nbaData['1960s']);
console.log('1960s teams in JS:', jsTeams.length);
console.log('1960s teams in nba_data:', nbaTeams.length);

// Players per team alignment
let mismatches = [];
for (const team of jsTeams) {
  const jsCount = js60s['1960s'][team]?.length || 0;
  const nbaCount = nbaData['1960s'][team]?.length || 0;
  if (jsCount !== nbaCount) {
    mismatches.push({ team, jsCount, nbaCount });
  }
}

if (mismatches.length === 0) {
  console.log('All teams have matching player counts!');
} else {
  console.log('Mismatches:', mismatches.slice(0, 10));
}

// Show first team example
const firstTeam = jsTeams[0];
console.log('\nFirst team:', firstTeam);
console.log('JS names:', js60s['1960s'][firstTeam].slice(0, 5).map(p => p.name));
console.log('NBA names:', nbaData['1960s'][firstTeam]?.slice(0, 5).map(p => p.name));

// Total counts
let jsTotal = 0, nbaTotal = 0;
for (const team of jsTeams) {
  jsTotal += js60s['1960s'][team]?.length || 0;
  nbaTotal += nbaData['1960s'][team]?.length || 0;
}
console.log('\n1960s JS total players:', jsTotal);
console.log('1960s nba_data total players:', nbaTotal);
console.log('Teams match exactly:', JSON.stringify(jsTeams) === JSON.stringify(nbaTeams));
