import json

with open('nba.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cn = [d for d in data if d.get('cname') and any('\u4e00' <= ch <= '\u9fff' for ch in d['cname'])]
print(f'Total Chinese translations: {len(cn)}')
print('\nSample Chinese translations (first 80):')
for d in cn[:80]:
    print(f'  {d["player"]:35s} -> {d["cname"]}')
