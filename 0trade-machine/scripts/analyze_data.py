#!/usr/bin/env python3
"""
Analyze data.js to identify:
1. Duplicate players
2. Placeholder/fake players (generic stats)
3. Missing key players
4. Suspicious salaries
"""
import re
import json
import sys

# Read the data.js file
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract team IDs
team_pattern = re.compile(r"(\w+):\s*\{[^}]*?id:\s*'\1'", re.DOTALL)
team_ids = re.findall(r"(\w+):\s*\{", content)

# Known real team abbreviations
real_teams = ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou','ind',
              'lac','lal','mem','mia','mil','min','nop','nyk','okc','orl','phi','phx',
              'por','sac','sas','tor','uta','was']

print("=" * 80)
print("NBA DATA.JS ANALYSIS REPORT")
print("=" * 80)

# For each team, extract players
team_data = {}
current_team = None
team_players = {}

# Simple parser to extract teams and their players
team_blocks = re.findall(r'(\w{3}):\s*\{([^}]+?players:\s*\[(.*?)\]\s*)\}', content, re.DOTALL)

# Better approach: split by team blocks
for team_id in real_teams:
    # Find team block
    start = content.find(f"  {team_id}: {{")
    if start == -1:
        continue
    
    # Find the players array
    players_start = content.find("players: [", start)
    if players_start == -1:
        continue
    
    # Count brackets to find end
    depth = 0
    in_array = False
    players_end = players_start
    for i in range(players_start, len(content)):
        if content[i] == '[':
            depth += 1
            in_array = True
        elif content[i] == ']':
            depth -= 1
            if depth == 0 and in_array:
                players_end = i + 1
                break
    
    players_block = content[players_start:players_end]
    
    # Extract individual player objects
    player_objects = []
    depth = 0
    current_obj = ""
    in_obj = False
    
    for i, c in enumerate(players_block):
        if c == '{':
            if depth == 0:
                current_obj = ""
                in_obj = True
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0 and in_obj:
                current_obj += c
                player_objects.append(current_obj)
                current_obj = ""
                in_obj = False
        if in_obj:
            current_obj += c
    
    team_players[team_id] = []
    for obj in player_objects:
        # Extract id
        id_match = re.search(r"id:\s*'([^']+)'", obj)
        # Extract name
        name_match = re.search(r"name:\s*'([^']+)'", obj)
        # Extract salary
        salary_match = re.search(r"salary:\s*(\d+)", obj)
        # Extract yearsRemaining
        years_match = re.search(r"yearsRemaining:\s*(\d+)", obj)
        # Check if has stats (real or generic)
        has_stats = 'stats:' in obj
        
        player_info = {
            'id': id_match.group(1) if id_match else 'unknown',
            'name': name_match.group(1) if name_match else 'unknown',
            'salary': int(salary_match.group(1)) if salary_match else 0,
            'yearsRemaining': int(years_match.group(1)) if years_match else 0,
            'has_stats': has_stats,
            'raw': obj
        }
        
        # Check if ID has Chinese characters (placeholder)
        player_info['is_placeholder'] = bool(re.search(r'[\u4e00-\u9fff]', player_info['id']))
        
        # Check for generic stats (all placeholder stats are identical pattern)
        if has_stats:
            stats_match = re.search(r"stats:\{([^}]+)\}", obj)
            if stats_match:
                stats_str = stats_match.group(1)
                # Placeholder stats have g:45, gs:5, mp:16.0 pattern
                player_info['is_generic_stats'] = 'g:45' in stats_str and 'gs:5' in stats_str and 'mp:16.0' in stats_str
            else:
                player_info['is_generic_stats'] = False
        else:
            player_info['is_generic_stats'] = False
        
        team_players[team_id].append(player_info)

# ============ REPORT ============

print(f"\nTotal teams analyzed: {len(team_players)}")
total_players = sum(len(players) for players in team_players.values())
print(f"Total players: {total_players}")

# 1. Identify placeholder/fake players
print("\n" + "=" * 80)
print("SECTION 1: PLACEHOLDER / FAKE PLAYERS (Chinese IDs + Generic Stats)")
print("=" * 80)
placeholder_count = 0
for team_id, players in team_players.items():
    team_placeholders = [p for p in players if p['is_placeholder']]
    if team_placeholders:
        placeholder_count += len(team_placeholders)
        print(f"\n  {team_id.upper()} ({len(team_placeholders)} placeholders):")
        for p in team_placeholders:
            print(f"    - {p['name']} | salary=${p['salary']:,} | years={p['yearsRemaining']}")

print(f"\n  Total placeholder players: {placeholder_count}")

# 2. Find duplicate names within same team
print("\n" + "=" * 80)
print("SECTION 2: DUPLICATE PLAYERS (same team)")
print("=" * 80)
for team_id, players in team_players.items():
    # Check for duplicated name patterns (normalize Chinese punctuation)
    name_counts = {}
    for p in players:
        # Normalize name
        name_normalized = p['name'].replace('·', '·').replace('·', '·')
        name_counts[name_normalized] = name_counts.get(name_normalized, 0) + 1
    
    for name, count in name_counts.items():
        if count > 1:
            dups = [p for p in players if p['name'] == name]
            print(f"\n  {team_id.upper()}: '{name}' appears {count} times:")
            for p in dups:
                tag = "[PLACEHOLDER]" if p['is_placeholder'] else "[REAL]"
                print(f"    {tag} salary=${p['salary']:,} id={p['id']}")

# 3. Identify players that appear on multiple teams
print("\n" + "=" * 80)
print("SECTION 3: SAME PLAYER ON MULTIPLE TEAMS")
print("=" * 80)

# Check for same name across teams
from collections import defaultdict
name_to_teams = defaultdict(list)
for team_id, players in team_players.items():
    for p in players:
        name_to_teams[p['name']].append((team_id, p['is_placeholder']))

for name, teams in name_to_teams.items():
    unique_teams = set(t[0] for t in teams)
    if len(unique_teams) > 1:
        print(f"\n  '{name}' appears on {len(unique_teams)} teams: {', '.join(unique_teams)}")
        for team_id, is_ph in teams:
            tag = "[PLACEHOLDER]" if is_ph else "[REAL]"
            p = [x for x in team_players[team_id] if x['name'] == name][0]
            print(f"    {tag} {team_id}: ${p['salary']:,}")

# 4. Suspicious players (well-known players on wrong teams)
print("\n" + "=" * 80)
print("SECTION 4: NOTABLE PLAYERS - VERIFY TEAM PLACEMENT")
print("=" * 80)

notable_checks = [
    # (name, expected_team_2025_26, notes)
    ("乔纳森-库明加", "atl", "勇士新秀, 不在老鹰"),
    ("詹姆斯-哈登", "cle", "2025在快船/76人, 不在骑士"),
    ("卡梅伦-约翰逊", "den", "2025在篮网, 不在掘金"),
    ("凯文-杜兰特", "hou", "2025在太阳, 不在火箭"),
    ("多里安-芬尼-史密斯", "hou", "DFS应该在一支球队"),
    ("伊维察-祖巴茨", "ind", "2025在快船, 不在步行者"),
    ("达里厄斯-加兰", "lac", "2025在骑士, 不在快船"),
    ("德安德烈-艾顿", "lal", "2025在开拓者, 不在湖人"),
    ("马库斯-斯马特", "lal", "2025在灰熊, 不在湖人"),
    ("邓肯-罗宾逊", "det", "2025在热火, 不在活塞"),
    ("艾尔-霍福德", "gsw", "2025在凯尔特人, 不在勇士"),
    ("狄龙-布鲁克斯", "phx", "2025在火箭, 不在太阳"),
    ("杰伦-格林", "phx", "可能匹配, 但通常是火箭"),
    ("朱-霍勒迪", "por", "2025在凯尔特人, 不在开拓者"),
    ("达米安-利拉德", "por", "$13M太低了, 2025在雄鹿"),
    ("杰拉米-格兰特", "por", "应该在开拓者, 验证"),
    ("德马尔-德罗赞", "sac", "应该在国王, 验证"),
    ("达龙-福克斯", "sas", "2025在国王, 不在马刺"),
    ("布兰登-英格拉姆", "tor", "2025在鹈鹕, 不在猛龙"),
    ("安东尼-戴维斯", "was", "2025在独行侠, 不在奇才"),
    ("特雷-杨", "was", "2025在老鹰, 不在奇才"),
    ("小贾伦-杰克逊", "uta", "2025在灰熊, 不在爵士"),
    ("劳里-马尔卡宁", "uta", "应该在爵士, 验证"),
    ("多诺万-米切尔", "cle", "应该在骑士, 验证"),
    ("以赛亚-杰克逊", "lac", "也出现在IND, 应该在一队"),
    ("波格丹-波格丹诺维奇", "lac", "2025在老鹰, 不在快船"),
    ("布鲁克-洛佩斯", "lac", "2025在雄鹿, 不在快船"),
    ("科里-基斯珀特", "atl", "2025在奇才, 不在老鹰"),
    ("巴迪-希尔德", "atl", "2025在勇士, 不在老鹰"),
    ("小迈克尔-波特", "bkn", "2025在掘金, 不在篮网"),
    ("特伦斯-曼", "bkn", "2025在快船, 不在篮网"),
    ("迈尔斯-特纳", "mil", "2025在步行者, 不在雄鹿"),
    ("凯尔-库兹马", "mil", "2025在奇才, 不在雄鹿"),
    ("约纳斯-瓦兰丘纳斯", "den", "2025在奇才/国王, 不在掘金"),
    ("克里斯蒂安-布朗", "den", "应该是Christian Braun在掘金"),
    ("卡里斯-勒韦尔", "det", "2025在骑士, 不在活塞"),
    ("保罗-乔治", "phi", "应该在76人, 验证"),
    ("泰雷斯-马克西", "phi", "应该在76人, 验证"),
    ("德章泰-默里", "nop", "2025在鹈鹕, 验证"),
    ("乔丹-普尔", "nop", "2025在奇才, 不在鹈鹕"),
    ("凯文-卢尼", "nop", "2025在勇士, 不在鹈鹕"),
    ("萨迪克-贝", "nop", "2025在奇才/活塞, 验证"),
    ("赫伯特-琼斯", "nop", "应该在鹈鹕, 验证"),
    ("加里-哈里斯", "mil", "2025在魔术, 不在雄鹿"),
    ("托里恩-普林斯", "mil", "2025在雄鹿, 验证"),
    ("小凯文-波特", "mil", "2025在火箭/骑士, 不在雄鹿"),
    ("AJ-格林", "mil", "应该在雄鹿, 验证"),
    ("博比-波蒂斯", "mil", "应该在雄鹿, 验证"),
    ("肯塔维厄斯-考德威尔-波普", "mem", "2025在魔术, 不在灰熊"),
    ("桑迪-阿尔达马", "mem", "应该在灰熊, 验证"),
    ("布兰登-克拉克", "mem", "应该在灰熊, 验证"),
    ("泰-杰罗姆", "mem", "2025在骑士, 不在灰熊"),
    ("GG-杰克逊", "mem", "应该在灰熊, 验证"),
    ("尼科拉-约维奇", "mia", "应该在热火, 验证"),
    ("戴维恩-米切尔", "mia", "2025在猛龙/国王, 不在热火"),
    ("约什-吉迪", "chi", "应该在公牛, 验证"),
    ("朗佐-鲍尔", "chi", "2025在公牛, 验证"),
    ("扎卡里·里萨切尔", "atl", "2024状元在老鹰, 验证"),
    ("埃文-莫布利", "cle", "应该在骑士, 验证"),
    ("谢伊-吉尔杰斯-亚历山大", "okc", "应该在雷霆主列表, 验证"),
    ("勒布朗-詹姆斯", "lal", "应该在湖人, 验证"),
    ("斯蒂芬-库里", "gsw", "应该在勇士, 验证"),
]

for name, team_in_data, notes in notable_checks:
    for team_id, players in team_players.items():
        for p in players:
            if p['name'] == name:
                tag = "[PLACEHOLDER]" if p['is_placeholder'] else "[REAL]"
                print(f"  {tag} {p['name']} in {team_id.upper()} | ${p['salary']:,} | {notes}")

# 5. Players without stats (might be incomplete)
print("\n" + "=" * 80)
print("SECTION 5: PLAYERS WITHOUT STATS (incomplete data)")
print("=" * 80)
for team_id, players in team_players.items():
    no_stats = [p for p in players if not p['has_stats']]
    for p in no_stats:
        print(f"  {team_id.upper()}: {p['name']} | ${p['salary']:,}")

# 6. Summary
print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
real_players = sum(1 for players in team_players.values() for p in players if not p['is_placeholder'])
fake_players = sum(1 for players in team_players.values() for p in players if p['is_placeholder'])
print(f"  Real/primary players: {real_players}")
print(f"  Placeholder/fake players: {fake_players}")
print(f"  Total: {total_players}")

# List all unique player names across all teams
print("\n" + "=" * 80)
print("ALL UNIQUE REAL PLAYERS:")
print("=" * 80)
all_real = {}
for team_id, players in team_players.items():
    for p in players:
        if not p['is_placeholder']:
            all_real[p['name']] = all_real.get(p['name'], []) + [(team_id, p['salary'])]

for name, teams in sorted(all_real.items()):
    team_str = ", ".join([f"{t[0].upper()}(${t[1]:,})" for t in teams])
    print(f"  {name}: {team_str}")
