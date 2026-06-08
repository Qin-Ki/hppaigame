"""List all players by team from data.js"""
import re

with open(r'c:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find team sections by looking for team ID patterns
team_ids = re.findall(r'^  ([a-z]{3}): \{$', content, re.MULTILINE)
print(f'Found {len(team_ids)} teams')

# More robust approach: split by team sections
# Find the position of each team
team_starts = []
for m in re.finditer(r'^  ([a-z]{3}): \{$', content, re.MULTILINE):
    team_starts.append((m.group(1), m.start()))

results = []
for i, (team_id, start) in enumerate(team_starts):
    # Find end: next team or end of file
    if i + 1 < len(team_starts):
        end = team_starts[i+1][1]
    else:
        end = len(content)
    
    section = content[start:end]
    
    # Find players array
    players_match = re.search(r'players:\[(.*?)\]', section, re.DOTALL)
    if players_match:
        players_text = players_match.group(1)
        players = re.findall(r"name:'([^']+)'", players_text)
        results.append((team_id, players))
    else:
        results.append((team_id, []))

# Print
for team_id, players in results:
    print(f'{team_id} ({len(players)}):')
    for p in players:
        print(f'  {p}')
