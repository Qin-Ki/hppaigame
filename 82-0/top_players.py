import json, re, math

with open(r'C:\Users\chenqi\AppData\Local\Temp\nba_data_raw.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'NBA_DATA_RAW\s*=\s*(\[.*?\])\s*;', content, re.DOTALL)
data = json.loads(match.group(1))

ERA_BENCHMARKS = {
    "1960s": {"pts": 30, "reb": 18, "ast": 8, "stl": 1.8, "blk": 1.8},
    "1970s": {"pts": 28, "reb": 13, "ast": 9, "stl": 2.0, "blk": 2.0},
    "1980s": {"pts": 28, "reb": 11, "ast": 11, "stl": 2.2, "blk": 2.0},
    "1990s": {"pts": 27, "reb": 11, "ast": 9, "stl": 2.0, "blk": 2.0},
    "2000s": {"pts": 27, "reb": 11, "ast": 9, "stl": 2.0, "blk": 2.0},
    "2010s": {"pts": 28, "reb": 11, "ast": 9, "stl": 1.8, "blk": 1.8},
    "2020s": {"pts": 28, "reb": 11, "ast": 9, "stl": 1.8, "blk": 1.8},
}

POSITION_WEIGHTS = {
    "PG": {"pts": 0.4, "reb": 0.1, "ast": 0.35, "stl": 0.1, "blk": 0.05},
    "SG": {"pts": 0.45, "reb": 0.1, "ast": 0.2, "stl": 0.2, "blk": 0.05},
    "SF": {"pts": 0.45, "reb": 0.15, "ast": 0.2, "stl": 0.15, "blk": 0.05},
    "PF": {"pts": 0.4, "reb": 0.3, "ast": 0.1, "stl": 0.1, "blk": 0.1},
    "C":  {"pts": 0.4, "reb": 0.35, "ast": 0.1, "stl": 0.05, "blk": 0.1},
}

STAT_KEYS = ['pts', 'reb', 'ast', 'stl', 'blk']

def is_num(v):
    return isinstance(v, (int, float)) and not math.isnan(v)

POS_MAP = {'PG': 'PG', 'SG': 'SG', 'SF': 'SF', 'PF': 'PF', 'C': 'C',
           'G': 'PG', 'F': 'SF', 'G/F': 'SG', 'F/G': 'SF', 'F/C': 'PF', 'C/F': 'C'}

def player_rating(p):
    decade = p.get('era', '2020s')
    bench = ERA_BENCHMARKS.get(decade, ERA_BENCHMARKS['2020s'])
    positions = p.get('positions', [])
    pos_str = p.get('pos', 'SF')
    
    # Determine base key for weights
    if positions:
        base_key = positions[0]
    else:
        base_key = POS_MAP.get(pos_str, 'SF')
    
    wk = POS_MAP.get(base_key, 'SF')
    weights = dict(POSITION_WEIGHTS.get(wk, POSITION_WEIGHTS['SF']))
    
    ppg = p.get('ppg', 0) or 0
    rpg = p.get('rpg', 0) or 0
    apg = p.get('apg', 0) or 0
    spg = p.get('spg', 0) or 0
    bpg = p.get('bpg', 0) or 0
    stats = {'pts': ppg, 'reb': rpg, 'ast': apg, 'stl': spg, 'blk': bpg}
    
    missing = [k for k in ['stl', 'blk'] if not is_num(stats[k]) or stats[k] <= 0]
    if missing:
        kept = sum(weights[k] for k in STAT_KEYS if k not in missing)
        scale = 1.0 / kept if kept > 0 else 1.0
        for k in ['pts', 'reb', 'ast']:
            weights[k] *= scale
        for k in missing:
            weights[k] = 0
    
    n = 0.0
    for k in STAT_KEYS:
        v = stats[k]
        if is_num(v) and v > 0:
            ratio = v / bench[k]
            if ratio > 1:
                ratio = math.pow(ratio, 1.25)
            n += weights[k] * ratio
    
    base = 60 + 40 * n
    pos_count = len(positions) if positions else 1
    versatility = (pos_count - 1) * 3
    
    name_lower = (p.get('player', '') or '').lower()
    intangibles_set = set([
        "larry bird","tim duncan","kevin durant","magic johnson",
        "shaquille o'neal","hakeem olajuwon","bill russell","kobe bryant",
        "oscar robertson","karl malone","kevin garnett","isiah thomas",
        "tony parker","manu ginobili","draymond green","scottie pippen",
        "dennis rodman","stephen curry","nikola jokic","dirk nowitzki",
    ])
    intang = 2.5 if name_lower in intangibles_set else 0
    
    return min(100, round((base + versatility + intang) * 10) / 10)

TEAM_CN = {
    "ATL":"老鹰","BKN":"篮网","BOS":"凯尔特人","CHA":"黄蜂","CHI":"公牛",
    "CLE":"骑士","DAL":"独行侠","DEN":"掘金","DET":"活塞","GSW":"勇士",
    "HOU":"火箭","IND":"步行者","LAC":"快船","LAL":"湖人","MEM":"灰熊",
    "MIA":"热火","MIL":"雄鹿","MIN":"森林狼","NOP":"鹈鹕","NYK":"尼克斯",
    "OKC":"雷霆","ORL":"魔术","PHI":"76人","PHX":"太阳","POR":"开拓者",
    "SAC":"国王","SAS":"马刺","TOR":"猛龙","UTA":"爵士","WAS":"奇才"
}

players_with_rating = []
for p in data:
    rating = player_rating(p)
    players_with_rating.append({
        'name': p.get('cname', p.get('player', '')),
        'en_name': p.get('player', ''),
        'team': TEAM_CN.get(p.get('team', ''), p.get('team', '')),
        'era': p.get('era', ''),
        'pos': p.get('pos', ''),
        'positions': p.get('positions', []),
        'rating': rating,
        'pts': p.get('ppg', 0),
        'reb': p.get('rpg', 0),
        'ast': p.get('apg', 0),
    })

players_with_rating.sort(key=lambda x: -x['rating'])
top20 = players_with_rating[:20]

# Show all unique players (deduplicate by name combo)
seen = set()
unique = []
for p in players_with_rating:
    key = (p['name'], p['team'], p['era'])
    if key not in seen:
        seen.add(key)
        unique.append(p)

# Show top 30
print(f"{'排名':<4} {'球员':<22} {'球队':<8} {'年代':<8} {'位置':<14} {'评分':<6}")
print("="*70)
for i, p in enumerate(unique[:50], 1):
    pos_str = '/'.join(p['positions']) if p['positions'] else p['pos']
    print(f"{i:<4} {p['name']:<22} {p['team']:<8} {p['era']:<8} {pos_str:<14} {p['rating']:<6}")
