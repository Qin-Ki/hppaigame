import json

with open('nba_cname_filled.json','r',encoding='utf-8') as f:
    data = json.load(f)

ids = [
    'domantas_sabonis_ind_2010s',
    'yao_ming_hou_2000s',
    'stephen_curry_gsw_2010s',
    'lebron_james_cle_2000s',
    'kobe_bryant_lal_2000s',
]

lookup = {d['id']: d['cname'] for d in data}
for i in ids:
    print(f'{i}: cname={lookup.get(i, "NOT FOUND")}')

# Verify nba-data.js is valid
with open('nba-data.js','r',encoding='utf-8') as f:
    content = f.read()
assert content.startswith('//'), 'Missing header'
assert 'const NBA_DATA_RAW =' in content, 'Missing variable'
# Parse the JSON from the JS file
js_obj = content.split('const NBA_DATA_RAW = ', 1)[1].strip()
if js_obj.endswith(';'):
    js_obj = js_obj[:-1]
parsed = json.loads(js_obj)
print(f'\nnba-data.js: {len(parsed)} items, valid!')
import re
chinese = [d for d in parsed if re.search(r'[\u4e00-\u9fff]', str(d['cname']))]
non_chinese = [d for d in parsed if not re.search(r'[\u4e00-\u9fff]', str(d['cname']))]
print(f'Chinese cname: {len(chinese)}')
print(f'Non-Chinese cname: {len(non_chinese)}')
for d in non_chinese[:10]:
    print(f'  {d["id"]}: cname={d["cname"]}')
