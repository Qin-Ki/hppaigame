import re

with open('r.html', 'r', encoding='utf-8') as f:
    content = f.read()

def fix_spaces_around_numbers(text):
    # Remove space between number and Chinese char: '33 分' -> '33分'
    text = re.sub(r'(\d+(?:\.\d+)?) +([\u4e00-\u9fff])', r'\1\2', text)
    text = re.sub(r'([\u4e00-\u9fff]) +(\d+(?:\.\d+)?)', r'\1\2', text)
    # Remove space between number and Chinese punctuation
    text = re.sub(r'(\d+) +([。，、；：])', r'\1\2', text)
    text = re.sub(r'([。，、；：]) +(\d+)', r'\1\2', text)
    return text

def fix_story_field(m):
    prefix = m.group(1)
    story_content = m.group(2)
    suffix = m.group(3)
    fixed = fix_spaces_around_numbers(story_content)
    return prefix + fixed + suffix

# Process story fields - match story:'...' 
count = 0
while True:
    new_content = re.sub(r"(story:\s*')(.*?)('[\s,])", fix_story_field, content)
    if new_content == content:
        break
    content = new_content
    count += 1
    if count > 10:
        break

print(f"Fixed story iterations: {count}")

# Fix the default story template (the one generated for entries without story)
content = content.replace(
    "p.playerName + ' 在 ' + p.year + ' 年总决赛中率领 '",
    "p.playerName + '在' + p.year + '年总决赛中率领'"
)
content = content.replace(
    "' 夺得总冠军，以场均 '",
    "'夺得总冠军，以场均'"
)
content = content.replace(
    "' 分 '",
    "'分'"
)
content = content.replace(
    "' 篮板 '",
    "'篮板'"
)
content = content.replace(
    "' 助攻的杰出表现荣获总决赛MVP（FMVP），书写了属于自己的传奇篇章。'",
    "'助攻的杰出表现荣获总决赛MVP（FMVP），书写了属于自己的传奇篇章。'"
)

with open('r.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Fixed spaces around numbers in stories.")
