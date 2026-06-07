import json

with open('nba.json','r',encoding='utf-8') as f:
    old = json.load(f)
with open(r'C:\Users\chenqi\Downloads\nba_cname_filled.json','r',encoding='utf-8') as f:
    new = json.load(f)

print('nba.json keys:', list(old[0].keys()))
print('filled keys:', list(new[0].keys()))

has_cn = sum(1 for d in old if d.get('cn_name'))
has_cname_old = sum(1 for d in old if d.get('cname'))
has_cname_new = sum(1 for d in new if d.get('cname'))
print(f'nba.json cn_name filled: {has_cn}')
print(f'nba.json cname filled: {has_cname_old}')
print(f'filled.json cname filled: {has_cname_new}')

print('\n--- Sample comparisons ---')
for i in range(5):
    print(f'Item {i}:')
    print(f'  nba.json cn_name:  {old[i].get("cn_name","N/A")}')
    print(f'  filled.json cname: {new[i].get("cname","N/A")}')
    print(f'  nba.json cname:    {old[i].get("cname","N/A")}')

# Check if order matches
match = all(
    old[i]['id'] == new[i]['id']
    for i in range(len(old))
)
print(f'\nIDs match in order: {match}')

# If match, just copy cname from filled -> cn_name in nba.json
if match:
    for i in range(len(old)):
        old[i]['cn_name'] = new[i].get('cname', '')
    
    with open('nba.json','w',encoding='utf-8') as f:
        json.dump(old, f, ensure_ascii=False, indent=2)
    
    # verify
    filled = sum(1 for d in old if d.get('cn_name'))
    print(f'\nUpdated nba.json cn_name filled: {filled}/{len(old)}')
    print('Done!')
else:
    print('IDs do not match! Need another approach.')
