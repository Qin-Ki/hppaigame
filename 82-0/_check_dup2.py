import json

with open('nba-data.js', 'r', encoding='utf-8') as f:
    content = f.read()
start = content.find('[')
end = content.rfind(']') + 1
data = json.loads(content[start:end])

from collections import Counter

for team_label, team_code in [('CHA (黄蜂)', 'CHA'), ('MIA (热火)', 'MIA')]:
    players = [p for p in data if p.get('team') == team_code and p.get('era') == '1980s']
    print(f'{team_label} 1980s 球员数: {len(players)}')
    names = [p['player'] for p in players]
    dups = {n: c for n, c in Counter(names).items() if c > 1}
    if dups:
        print(f'  发现重复: {dups}')
        for n in dups:
            entries = [p for p in players if p['player'] == n]
            for e in entries:
                print(f'    id={e["id"]}, cname={e.get("cname","")}')
    else:
        print('  无重复')
    print()

# Also check if any player appears in BOTH CHA and MIA 1980s
cha_players = {p['player'] for p in data if p.get('team') == 'CHA' and p.get('era') == '1980s'}
mia_players = {p['player'] for p in data if p.get('team') == 'MIA' and p.get('era') == '1980s'}
common = cha_players & mia_players
if common:
    print(f'同时在CHA和MIA 1980s出现的球员: {common}')
else:
    print('没有同时在CHA和MIA 1980s出现的球员')

# Check: does any player appear in CHA 1980s AND also in CHA from another era?
for team_code in ['CHA', 'MIA']:
    all_eras = {}
    for p in data:
        if p.get('team') == team_code:
            all_eras.setdefault(p['player'], []).append(p['era'])
    name_era_multi = {n: es for n, es in all_eras.items() if len(set(es)) > 1}
    if name_era_multi:
        print(f'\n{team_code} 跨年代重复球员:')
        for n, es in sorted(name_era_multi.items()):
            print(f'  {n}: {es}')
