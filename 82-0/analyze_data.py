import json

with open('nba.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('Fields in first object:', list(data[0].keys()))
print(f'Total players: {len(data)}')

# Check cname status
has_chinese = 0
has_english = 0
null_cname = 0
for item in data:
    c = item.get('cname', '')
    if not c:
        null_cname += 1
    elif any('\u4e00' <= ch <= '\u9fff' for ch in str(c)):
        has_chinese += 1
    else:
        has_english += 1

print(f'Already has Chinese cname: {has_chinese}')
print(f'Still English cname: {has_english}')
print(f'Null/empty cname: {null_cname}')

# Show first 30 that need Chinese name
print('\nFirst 30 needing Chinese name:')
count = 0
for item in data:
    c = item.get('cname', '')
    if not c or not any('\u4e00' <= ch <= '\u9fff' for ch in str(c)):
        print(f'  {item["player"]} -> current cname: {c}')
        count += 1
        if count >= 30:
            break

# Print all distinct player names that need cn_name
print('\n\nAll unique player names needing Chinese name:')
names_needed = set()
for item in data:
    c = item.get('cname', '')
    if not c or not any('\u4e00' <= ch <= '\u9fff' for ch in str(c)):
        names_needed.add(item['player'])

for n in sorted(names_needed):
    print(n)
print(f'\nTotal unique names needing translation: {len(names_needed)}')
