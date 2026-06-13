import json, math

with open('nba-data.js', 'r', encoding='utf-8') as f:
    content = f.read()
start = content.find('[')
end = content.rfind(']') + 1
data = json.loads(content[start:end])

# 收集所有球员
players = []
for p in data:
    pts = p.get('ppg') or 0
    reb = p.get('rpg') or 0
    ast = p.get('apg') or 0
    total = pts + reb + ast
    players.append({
        'name': p.get('cname') or p.get('player'),
        'team': p['team'],
        'era': p['era'],
        'pts': pts,
        'reb': reb,
        'ast': ast,
        'total': total
    })

players.sort(key=lambda x: x['total'])

print('=== 总数据最差的10名球员 ===')
for p in players[:10]:
    print(f'  {p["name"]:20s} | {p["team"]} {p["era"]} | PTS={p["pts"]} REB={p["reb"]} AST={p["ast"]} total={p["total"]}')

# 模拟index.html中的playerRating
# 近似实现
ERA_BENCH = {
    "1960s": {"pts":30,"reb":18,"ast":8},
    "1970s": {"pts":28,"reb":13,"ast":9},
    "1980s": {"pts":28,"reb":11,"ast":11},
    "1990s": {"pts":27,"reb":11,"ast":9},
    "2000s": {"pts":27,"reb":11,"ast":9},
    "2010s": {"pts":28,"reb":11,"ast":9},
    "2020s": {"pts":28,"reb":11,"ast":9},
}

def player_rating(p, weak=False):
    bench = ERA_BENCH.get(p["era"], ERA_BENCH["2020s"])
    n = (p["pts"]/bench["pts"] + p["reb"]/bench["reb"] + p["ast"]/bench["ast"]) / 3
    base = 40 + 20*n if weak else 60 + 40*n
    return min(100, round(base * 10) / 10)

# 最差5人(weak)
worst5 = players[:5]
ratings = [player_rating(p, weak=True) for p in worst5]
print(f'\n=== 最差5人阵容(weak) ===')
for p, r in zip(worst5, ratings):
    print(f'  {p["name"]:20s} | {p["team"]} {p["era"]} | total={p["total"]} | rating={r}')
geo = (math.prod(ratings)) ** (1/len(ratings))
team_ovr = round(geo * 1.1 * 10) / 10
wins = round(82 * (min(team_ovr/110, 1)) ** 2.2)
print(f'  几何均值={geo:.2f}, teamOvr={team_ovr}, 预测胜场={wins}')

# 最差5人(非weak)
ratings2 = [player_rating(p, weak=False) for p in worst5]
print(f'\n=== 最差5人阵容(非weak) ===')
for p, r in zip(worst5, ratings2):
    print(f'  {p["name"]:20s} | total={p["total"]} | rating={r}')
geo2 = (math.prod(ratings2)) ** (1/len(ratings2))
team_ovr2 = round(geo2 * 1.1 * 10) / 10
wins2 = round(82 * (min(team_ovr2/110, 1)) ** 2.2)
print(f'  几何均值={geo2:.2f}, teamOvr={team_ovr2}, 预测胜场={wins2}')

# 极端情况: 5个pts=0, reb=0, ast=0的球员
print(f'\n=== 极端情况: 5个全0球员 ===')
r0 = player_rating({"era":"2020s","pts":0,"reb":0,"ast":0}, weak=True)
print(f'  weak球员评分={r0}')
geo0 = r0
team_ovr0 = round(geo0 * 1.1 * 10) / 10
wins0 = round(82 * (min(team_ovr0/110, 1)) ** 2.2)
print(f'  teamOvr={team_ovr0}, 胜场={wins0}')

r0b = player_rating({"era":"2020s","pts":0,"reb":0,"ast":0}, weak=False)
print(f'  非weak球员评分={r0b}')
geo0b = r0b
team_ovr0b = round(geo0b * 1.1 * 10) / 10
wins0b = round(82 * (min(team_ovr0b/110, 1)) ** 2.2)
print(f'  teamOvr={team_ovr0b}, 胜场={wins0b}')

# 看看有没有pts=0且reb=0且ast=0的球员
zero_all = [p for p in players if p['pts'] == 0 and p['reb'] == 0 and p['ast'] == 0]
print(f'\n=== 三项数据全为0的球员数: {len(zero_all)} ===')
for p in zero_all[:10]:
    print(f'  {p["name"]:20s} | {p["team"]} {p["era"]}')
