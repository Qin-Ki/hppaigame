import json

# Read the file - it's a JS file with const NBA_DATA_RAW = [...]
with open('nba-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array
start = content.find('[')
end = content.rfind(']') + 1
data = json.loads(content[start:end])

# Filter for Miami Heat in 1980s
mia_1980s = [p for p in data if p.get('team') == 'MIA' and p.get('era') == '1980s']
print(f'MIA 1980s 球员总数: {len(mia_1980s)}')
print()

# Check for duplicates by player name
from collections import Counter
name_counts = Counter(p['player'] for p in mia_1980s)
duplicates = {name: count for name, count in name_counts.items() if count > 1}

if duplicates:
    print('发现重复球员:')
    for name, count in duplicates.items():
        print(f'  {name} ({count}次)')
        entries = [p for p in mia_1980s if p['player'] == name]
        for e in entries:
            print(f'    id={e["id"]}, cname={e.get("cname","")}, ppg={e["ppg"]}')
    print()
else:
    print('没有发现重复球员。')
    print()

# Also check for duplicates by id
id_counts = Counter(p['id'] for p in mia_1980s)
id_dups = {idd: cnt for idd, cnt in id_counts.items() if cnt > 1}
if id_dups:
    print('按id检查也有重复:')
    for idd, cnt in id_dups.items():
        print(f'  {idd} ({cnt}次)')

# Print all players for manual inspection
print()
print('所有MIA 1980s球员:')
for p in sorted(mia_1980s, key=lambda x: x['player']):
    print(f'  {p["player"]:25s} | id={p["id"]}')
