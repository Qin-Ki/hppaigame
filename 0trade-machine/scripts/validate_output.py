#!/usr/bin/env python3
import re

with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    c = f.read()

print(f"File size: {len(c)} bytes")
print(f"Lines: {c.count(chr(10))}")
print(f"Has TEAMS_DATA: {'var TEAMS_DATA' in c}")
print(f"Has DRAFT_PICKS: {'var DRAFT_PICKS_DATA' in c}")

# Count players per team
teams_found = re.findall(r'(\w{3}):\s*\{[^}]*?id:\s*\'', c)
print(f"Team code refs: {len(teams_found)}")

# Count player objects with English IDs
player_count = len(re.findall(r"id:\s*'[a-z]{3}-[a-z0-9]+", c))
print(f"Player entries (English IDs): {player_count}")

# Check for leftover Chinese IDs
leftover = len(re.findall(r"id:\s*'[a-z]{3}-[\u4e00-\u9fff]", c))
print(f"Leftover Chinese IDs: {leftover}")

# Check bracket balance
opens = c.count('{')
closes = c.count('}')
print(f"Braces: open={opens} close={closes} balanced={opens==closes}")

# Check verification markers
need_verify = c.count('NEEDS_VERIFICATION')
print(f"Players marked NEEDS_VERIFICATION: {need_verify}")

# Check for verification fields
verify_count = c.count('verification:"')
print(f"Players with verification field: {verify_count}")

# Verify BBR data was applied - check a few known salaries
checks = [
    ("斯蒂芬-库里", "59606817"),
    ("尼古拉-约基奇", "55224526"),
    ("杰森-塔特姆", "54126450"),
    ("凯德-坎宁安", "46394100"),
]
for name, expected_sal in checks:
    pattern = fr"name:'{re.escape(name)}'.*?salary:(\d+)"
    m = re.search(pattern, c, re.DOTALL)
    if m:
        actual = m.group(1)
        status = "OK" if actual == expected_sal else f"MISMATCH (got {actual})"
        print(f"  {name}: {status}")
    else:
        print(f"  {name}: NOT FOUND")

print("\nValidation complete!")
