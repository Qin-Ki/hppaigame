"""Add img:'' field to each player object in data.js and fix commas"""
import re

with open(r'c:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# First, fix any missing commas after img field
content = re.sub(r"img:''(\w)", r"img:'',\1", content)
print('Fixed missing commas')

# Check if players still need img field added
if "img:''," not in content:
    count = 0
    def add_img(m):
        global count
        count += 1
        return m.group(0) + "img:'',"
    content = re.sub(r"\{id:'[^']+',name:'[^']+',", add_img, content)
    print(f'Added img field to {count} players')
else:
    # count existing img fields
    count = len(re.findall(r"img:'',", content))
    print(f'Total players with img field: {count}')

with open(r'c:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'w', encoding='utf-8') as f:
    f.write(content)
