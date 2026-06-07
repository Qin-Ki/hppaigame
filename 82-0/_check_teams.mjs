import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const jsContent = readFileSync(resolve(__dirname, 'nba-data-60s-80s.js'), 'utf-8');
const nbaData = JSON.parse(readFileSync(resolve(__dirname, 'nba_data.json'), 'utf-8'));

// Extract all quoted Chinese strings (team names) from the JS content
// Match anything between double quotes that contains Chinese characters
const regex = /"([\u4e00-\u9fff][\u4e00-\u9fff]*)"/g;
const matches = [...jsContent.matchAll(regex)];
const uniqueChineseTeams = [...new Set(matches.map(m => m[1]))];
console.log('Chinese team names (' + uniqueChineseTeams.length + '):');
console.log(uniqueChineseTeams.join(', '));

console.log('\n---');

// English team names from nba_data.json (1960s)
const englishTeams60s = Object.keys(nbaData['1960s']);
console.log('English 1960s teams (' + englishTeams60s.length + '):');
console.log(englishTeams60s.join(', '));

// Check if count matches
console.log('\nCounts: JS Chinese teams=' + uniqueChineseTeams.length + ', NBA English teams(1960s)=' + englishTeams60s.length);
