import json
import re
from datetime import datetime

# Playwright returned JSON data directly - embed it here
# Data was extracted from the table with id="player-contracts"
# Total: 530 players

# We'll get the data directly from the evaluate result embedded
# The raw JSON data from Playwright is stored in this variable
RAW_JSON = None  # Will be populated by reading from temp file

def parse_salary(val):
    """Convert '$XX,XXX,XXX' to int, or empty string to None"""
    val = val.strip()
    if not val:
        return None
    # Remove $ and commas
    val = val.replace('$', '').replace(',', '')
    try:
        return int(val)
    except ValueError:
        return None

def parse_guaranteed(val):
    """Check if guaranteed column has a value (non-empty)"""
    val = val.strip()
    if not val:
        return False
    return True

# Process all players
output = []
failed = 0
success = 0

for p in players:
    try:
        record = {
            "player": p["player"],
            "team": p["team"],
            "salary_2025_26": parse_salary(p["s2025"]),
            "salary_2026_27": parse_salary(p["s2026"]),
            "salary_2027_28": parse_salary(p["s2027"]),
            "salary_2028_29": parse_salary(p["s2028"]),
            "salary_2029_30": parse_salary(p["s2029"]),
            "source": "Basketball Reference"
        }
        output.append(record)
        success += 1
    except Exception as e:
        print(f"Failed to parse row: {p.get('player', 'unknown')} - {e}")
        failed += 1

# Write SCRAPE_REPORT.md
report = f"""# SCRAPE_REPORT.md

- 抓取时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- 总球员数: {len(players)}
- 成功解析行数: {success}
- 失败行数: {failed}
- 数据来源: Basketball Reference (https://www.basketball-reference.com/contracts/players.html)
- 页面标题: 2025-26 NBA Player Contracts
- 赛季: 2025-26

## 校验

- 总记录数: {len(players)}
- 页面声称: 530 Contracts
- 匹配: {"✅ 是" if len(players) == 530 else "❌ 否, 差异: " + str(len(players) - 530)}
"""

with open(r'c:\Users\chenqi\Desktop\tod\docs\SCRAPE_REPORT.md', 'w', encoding='utf-8') as f:
    f.write(report)

print(report)

# Write the full JSON output
# Split into parts if needed (each part max ~5000 chars for compact JSON, but we'll use pretty print)
output_json = json.dumps(output, ensure_ascii=False, indent=2)

# Save full JSON to file
with open(r'c:\Users\chenqi\Desktop\tod\docs\PLAYERS_SALARIES_JSON.json', 'w', encoding='utf-8') as f:
    f.write(output_json)

print(f"\nTotal players extracted: {len(output)}")
print(f"JSON file saved to docs/PLAYERS_SALARIES_JSON.json")

# Print the player count verification
print(f"\n{{")
print(f"  total_players: {len(output)}")
print(f"}}")
