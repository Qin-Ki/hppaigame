"""
在 data.js 中插入补充球员数据
"""
import re

DATA_PATH = r'C:\Users\chenqi\Desktop\tod\NBA AI经理 · 交易模拟器_files\data.js.下载'
PATCH_PATH = r'C:\Users\chenqi\Desktop\tod\data_patch_v2.txt'

with open(DATA_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

with open(PATCH_PATH, 'r', encoding='utf-8') as f:
    patch = f.read()

# 解析 patch 文件，按队伍组织新球员数据
# 格式: // --- 老鹰 (atl) +5 人 --- 然后 { ... } 行

team_patches = {}
current_team = None
current_lines = []

for line in patch.split('\n'):
    m = re.match(r'// ---.*\((\w{3})\)', line)
    if m:
        if current_team and current_lines:
            team_patches[current_team] = current_lines
        current_team = m.group(1)
        current_lines = []
    elif current_team and line.strip().startswith('{'):
        current_lines.append(line)

if current_team and current_lines:
    team_patches[current_team] = current_lines

print(f"解析到 {len(team_patches)} 个队的补充数据")

# 在每个队的 players 数组末尾，] 之前插入新数据
# 注意 data.js 格式: players: [ ... ] 或 players: [ ... ] }
# 找到每个 { id:'team-player-XX ... } 后的最后一个 ]，

modified = content
total_inserted = 0

for team_id, new_lines in team_patches.items():
    if not new_lines:
        continue
    
    # 查找该队的 players 数组
    # 找到 players: [ 的位置
    pattern = rf"({team_id}:\s*{{[^}}]*?players:\s*\[)"
    match = re.search(pattern, modified, re.DOTALL)
    if not match:
        print(f"  未找到 {team_id} 的 players 数组")
        continue
    
    # 找到该 players 数组的结束位置
    start = match.end() - 1  # 指向 [
    depth = 1
    pos = start + 1
    while depth > 0 and pos < len(modified):
        if modified[pos] == '[':
            depth += 1
        elif modified[pos] == ']':
            depth -= 1
        pos += 1
    
    # pos-1 是 ] 的位置
    # 在 ] 之前插入新数据
    insert_pos = pos - 1
    
    new_block = '\n' + '\n'.join(new_lines) + '\n    '
    modified = modified[:insert_pos] + new_block + modified[insert_pos:]
    total_inserted += len(new_lines)
    print(f"  {team_id}: 插入 {len(new_lines)} 人")

# 写回文件
backup_path = DATA_PATH + '.bak'
with open(backup_path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\n备份已保存: {backup_path}")

with open(DATA_PATH, 'w', encoding='utf-8') as f:
    f.write(modified)

print(f"✅ 已插入 {total_inserted} 名球员到 data.js")
print(f"📝 文件: {DATA_PATH}")
