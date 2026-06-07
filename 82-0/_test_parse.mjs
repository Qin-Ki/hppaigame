import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readJsFile(filePath) {
  const absPath = resolve(__dirname, filePath);
  const content = readFileSync(absPath, 'utf-8');
  
  // Match: const NBA_DATA_XXX = { ... };
  // Need to find the closing brace that matches the opening one
  const varMatch = content.match(/const\s+(NBA_DATA_\w+)\s*=\s*(\{)/);
  if (!varMatch) throw new Error('Could not find variable in ' + filePath);
  
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
  
  // Try to parse as-is first (keys are already quoted with double quotes)
  try {
    const data = JSON.parse(jsonStr);
    return { varName, data };
  } catch (e) {
    // Keys might not be quoted - try quoting them
    console.log('Direct parse failed, trying key quoting...');
    const fixed = jsonStr
      .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
      .replace(/'/g, '"');
    const data = JSON.parse(fixed);
    return { varName, data };
  }
}

// Test parse 60s-80s
const r1 = readJsFile('nba-data-60s-80s.js');
console.log('Parsed:', r1.varName);
console.log('Decades:', Object.keys(r1.data));
const boston = r1.data['1960s']['波士顿凯尔特人'];
console.log('First team players:', boston.slice(0, 3).map(p => p.name + ' (' + p.pos + ')'));
console.log('Total players in file:', countPlayers(r1.data));

// Test parse 90s-00s
const r2 = readJsFile('nba-data-90s-00s.js');
console.log('\nParsed:', r2.varName);
console.log('Decades:', Object.keys(r2.data));
console.log('Total players in file:', countPlayers(r2.data));

// Test parse 10s-20s
const r3 = readJsFile('nba-data-10s-20s.js');
console.log('\nParsed:', r3.varName);
console.log('Decades:', Object.keys(r3.data));
console.log('Total players in file:', countPlayers(r3.data));

function countPlayers(data) {
  let count = 0;
  for (const era of Object.keys(data)) {
    for (const team of Object.keys(data[era])) {
      count += data[era][team].length;
    }
  }
  return count;
}
