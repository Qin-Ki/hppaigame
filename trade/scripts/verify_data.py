"""Quick verification of nba_data.json contents."""
import json

with open(r"c:\Users\chenqi\Desktop\work\hppaigame\hppaigame\trade\nba_data.json") as f:
    data = json.load(f)

print(f"Last updated: {data['last_updated']}")
print(f"Season: {data['season']}")
print(f"Total teams: {len(data['teams'])}")
print()

total_league_payroll = 0
total_league_players = 0

for t in data['teams']:
    payroll = t['payroll']
    count = len(t['players'])
    total_league_payroll += payroll
    total_league_players += count
    status = "✅" if count > 0 else "⚠️"
    print(f"  {status} {t['team_name']:35s} ${payroll:>10,}  ({count:2d} players)")

print()
print(f"{'TOTAL':35s} ${total_league_payroll:>10,}  ({total_league_players:2d} players)")
print(f"{'Average per team':35s} ${total_league_payroll // max(len(data['teams']), 1):>10,}")
