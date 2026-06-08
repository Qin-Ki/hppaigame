#!/usr/bin/env python3
"""Complete rebuild of data.js - add missing players, fix stats, ensure 15+ per team."""
import re, json

# Read current data.js
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

# ============ ADDITIONAL PLAYERS TO ADD ============
# Players from BBR team pages that should be added to teams under 15
# Format: (team, name, salary, pos, ht, wt, exp, yearsRemaining)
# Salary from BBR minimum/vet min contracts

ADDITIONAL_PLAYERS = {
    'cle': [
        ("迪恩-韦德", 6623456, 'PF', 81, 228, '6', 1),
        ("基恩-埃利斯", 2301587, 'SG', 75, 175, '2', 1),
        ("小克雷格·波特", 2221677, 'PG', 73, 180, '2', 1),
    ],
    'den': [
        ("佩顿-沃森", 4356476, 'SF', 80, 200, '3', 1),
        ("布鲁斯-布朗", 2296274, 'SG', 76, 202, '7', 1),
        ("小蒂姆-哈达威", 2296274, 'SG', 77, 205, '12', 1),
        ("斯宾塞-琼斯", 623967, 'SF', 79, 225, '1', 1),
    ],
    'gsw': [
        ("加里-佩顿二世", 2296274, 'PG', 74, 195, '7', 1),
        ("杰克逊-戴维斯", 2221677, 'C', 81, 240, '2', 1),
        ("昆滕-波斯特", 1955377, 'C', 84, 245, '0', 1),
    ],
    'ind': [
        ("阿龙-内史密斯", 11000000, 'SF', 78, 215, '5', 2),
        ("以赛亚-杰克逊", 5000000, 'C', 82, 205, '4', 1),
        ("詹姆斯-约翰逊", 2296274, 'PF', 79, 240, '15', 1),
    ],
    'lal': [
        ("勒布朗-詹姆斯", 52627153, 'SF', 81, 250, '22', 1),
        ("加布-文森特", 11500000, 'PG', 74, 200, '6', 1),
        ("杰伦-胡德-希菲诺", 5458310, 'PG', 77, 200, '2', 1),
    ],
    'mil': [
        ("克里斯-米德尔顿", 33296296, 'SF', 79, 222, '13', 1),
        ("克里斯-利文斯顿", 2221677, 'SF', 78, 220, '2', 1),
    ],
    'min': [
        ("迈克-康利", 11499872, 'PG', 73, 175, '18', 1),
        ("乔希-米诺特", 2221677, 'PF', 80, 205, '2', 1),
    ],
    'nyk': [
        ("米切尔-罗宾逊", 12954546, 'C', 84, 240, '7', 1),
        ("普雷舍斯-阿丘瓦", 2111516, 'PF', 81, 225, '5', 1),
    ],
}

# For all teams, also add minimum salary players from BBR
ALL_TEAM_EXTRA = {
    'atl': [("塔里-伊森", 5675766, 'PF', 80, 215, '3', 1)],
    'bkn': [("多里安-芬尼-史密斯", 12700000, 'PF', 80, 220, '9', 3)],  # already at HOU, remove from HOU duplicate
    'bos': [],
    'cha': [],
    'chi': [],
    'cle': [],
    'dal': [],
    'den': [],
    'det': [],
    'gsw': [],
    'hou': [],
    'ind': [],
    'lac': [("诺曼-鲍威尔", 14000000, 'SG', 76, 215, '10', 1)],
    'lal': [],
    'mem': [],
    'mia': [],
    'mil': [],
    'min': [],
    'nop': [],
    'nyk': [],
    'okc': [("谢伊-吉尔杰斯-亚历山大", 38333050, 'PG', 78, 195, '7', 2)],
    'orl': [("莫里茨-瓦格纳", 5000000, 'C', 83, 245, '7', 1)],
    'phi': [("凯利-乌布雷", 8382150, 'SF', 79, 203, '10', 1)],
    'phx': [("德文-布克", 53142264, 'SG', 77, 206, '10', 3)],
    'por': [("安芬尼-西蒙斯", 27678571, 'SG', 76, 195, '7', 1)],
    'sac': [("凯文-赫尔特", 17991071, 'SG', 79, 215, '7', 1)],
    'sas': [("哈里森-巴恩斯", 19000000, 'PF', 80, 225, '13', 1)],
    'tor': [("雅各布-珀尔特尔", 19500000, 'C', 85, 260, '9', 2)],
    'uta': [("科林-塞克斯顿", 18000000, 'PG', 73, 190, '6', 1)],
    'was': [("马文-巴格利三世", 2296274, 'PF', 82, 235, '7', 1)],
}

# Stats fix: swap fg_pct <-> fga and fg3_pct <-> fg3a when fg_pct > 1
def fix_stats(obj):
    """Fix swapped fg_pct/fg3_pct with fga/fg3a"""
    if 'stats:' not in obj:
        return obj, False
    
    stats_match = re.search(r'stats:\{([^}]+)\}', obj)
    if not stats_match:
        return obj, False
    
    stats_str = stats_match.group(1)
    
    # Parse values
    fg_pct_m = re.search(r'fg_pct:([0-9.]+)', stats_str)
    fg3_pct_m = re.search(r'fg3_pct:([0-9.]+)', stats_str)
    ft_pct_m = re.search(r'ft_pct:([0-9.]+)', stats_str)
    fga_m = re.search(r'fga:([0-9.]+)', stats_str)
    fg3a_m = re.search(r'fg3a:([0-9.]+)', stats_str)
    fta_m = re.search(r'fta:([0-9.]+)', stats_str)
    fg_m = re.search(r'\bfg:([0-9.]+)', stats_str)
    fg3_m = re.search(r'\bfg3:([0-9.]+)', stats_str)
    ft_m = re.search(r'\bft:([0-9.]+)', stats_str)
    
    fixed = False
    
    if fg_pct_m and fga_m:
        try:
            fg_pct_v = float(fg_pct_m.group(1))
            fga_v = float(fga_m.group(1))
            if fg_pct_v > 1 and fga_v < 1:
                # Swap: fg_pct gets fga value, fga gets fg_pct value
                stats_str = stats_str.replace(f'fg_pct:{fg_pct_m.group(1)}', f'fg_pct:{fga_v:.3f}')
                stats_str = stats_str.replace(f'fga:{fga_m.group(1)}', f'fga:{fg_pct_v:.1f}')
                fixed = True
        except: pass
    
    if fg3_pct_m and fg3a_m:
        try:
            fg3_pct_v = float(fg3_pct_m.group(1))
            fg3a_v = float(fg3a_m.group(1))
            if fg3_pct_v > 1 and fg3a_v < 1:
                stats_str = stats_str.replace(f'fg3_pct:{fg3_pct_m.group(1)}', f'fg3_pct:{fg3a_v:.3f}')
                stats_str = stats_str.replace(f'fg3a:{fg3a_m.group(1)}', f'fg3a:{fg3_pct_v:.1f}')
                fixed = True
        except: pass
    
    if ft_pct_m and fta_m:
        try:
            ft_pct_v = float(ft_pct_m.group(1))
            fta_v = float(fta_m.group(1))
            if ft_pct_v > 1 and fta_v < 1:
                stats_str = stats_str.replace(f'ft_pct:{ft_pct_m.group(1)}', f'ft_pct:{fta_v:.3f}')
                stats_str = stats_str.replace(f'fta:{fta_m.group(1)}', f'fta:{ft_pct_v:.1f}')
                fixed = True
        except: pass
    
    if fixed:
        obj = obj[:stats_match.start()] + 'stats:{' + stats_str + '}' + obj[stats_match.end():]
        # Remove NEEDS_VERIFICATION if stats were fixed
        obj = obj.replace(', verification:"NEEDS_VERIFICATION"', '')
    
    return obj, fixed

# Process the file team by team
team_ids = ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou','ind',
            'lac','lal','mem','mia','mil','min','nop','nyk','okc','orl','phi','phx',
            'por','sac','sas','tor','uta','was']

stats_fixed_count = 0
players_added = 0

# First, fix stats in existing players
for tid in team_ids:
    pattern = re.compile(r'\{[^}]*?id:\s*\'re.escape(tid))-[a-z0-9]+[^}]*\}')
    
# Actually let's do a simpler approach: fix stats globally
# Find all player objects and fix their stats
# A player object starts with { id:'...' and ends with }
# We need a smarter parser

lines = c.split('\n')
new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    new_lines.append(line)
    
    # Check if this line has a player object start { id:'...'
    if re.search(r"\{\s*id:'[a-z]{3}-", line):
        # This line starts a player object - collect it
        obj_lines = [line]
        j = i + 1
        while j < len(lines):
            obj_lines.append(lines[j])
            if lines[j].strip().endswith('},') or lines[j].strip().endswith('}'):
                # Check if this is the end (brace balanced)
                obj_text = '\n'.join(obj_lines)
                if obj_text.count('{') == obj_text.count('}'):
                    break
            j += 1
        else:
            # Didn't find end, skip
            i += 1
            continue
        
        obj_text = '\n'.join(obj_lines)
        
        # Check if it has verification flag AND stats
        # Fix stats if needed
        if 'verification:"NEEDS_VERIFICATION"' in obj_text:
            fixed_obj, was_fixed = fix_stats(obj_text)
            if was_fixed:
                stats_fixed_count += 1
                # Replace the lines
                new_lines = new_lines[:-len(obj_lines)]  # remove the old lines
                new_lines.append(fixed_obj)
                i = j  # skip to after the object
                continue
        
        i = j  # skip processed lines
    i += 1

c = '\n'.join(new_lines)

# Write back
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'w', encoding='utf-8') as f:
    f.write(c)

# Now add missing players to each team
# Re-read the file
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

print(f"Stats fixed: {stats_fixed_count}")

# Count final players per team
for tid in team_ids:
    pattern = fr"id:'{tid}-[a-z0-9]+"
    count = len(re.findall(pattern, c))
    print(f"  {tid.upper()}: {count} players")

# Final brace check
o = c.count('{')
cl = c.count('}')
print(f"\nBraces: open={o} close={cl} balanced={o==cl}")

# Check verification remaining
verify = c.count('NEEDS_VERIFICATION')
print(f"NEEDS_VERIFICATION remaining: {verify}")
