"""Fix missing commas in data.js"""
import re

with open(r'C:\Users\chenqi\Desktop\tod\NBA AI经理 · 交易模拟器_files\data.js.下载', 'r', encoding='utf-8') as f:
    content = f.read()

fix_count = 0
teams = ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou',
         'ind','lac','lal','mem','mia','mil','min','nop','nyk','okc','orl',
         'phi','phx','por','sac','sas','tor','uta','was']

for tid in teams:
    # Find players array for this team
    pattern1 = f"'{tid}': {{"
    m = content.find(pattern1)
    if m < 0:
        pattern1 = f"{tid}: {{"
        m = content.find(pattern1)
    if m < 0:
        continue
    
    players_pos = content.find('players: [', m)
    if players_pos < 0:
        continue
    
    start = content.index('[', players_pos)
    depth = 1
    pos = start + 1
    while depth > 0 and pos < len(content):
        if content[pos] == '[':
            depth += 1
        elif content[pos] == ']':
            depth -= 1
        pos += 1
    
    end = pos - 1  # position of ]
    
    # Find the last occurrence of '}  }' before ]
    last_close = content.rfind('}  }', start, end)
    if last_close > 0:
        insert_pos = last_close + 4  # after '}  }'
        # Check if next non-whitespace char is '{' (new player) and not ','
        rest = content[insert_pos:end].strip()
        if rest.startswith('{') and not content[insert_pos:insert_pos+1] == ',':
            content = content[:insert_pos] + ',' + content[insert_pos:]
            fix_count += 1
            print(f'{tid}: fixed')

print(f'\nTotal: {fix_count} fixes')

with open(r'C:\Users\chenqi\Desktop\tod\NBA AI经理 · 交易模拟器_files\data.js.下载', 'w', encoding='utf-8') as f:
    f.write(content)
