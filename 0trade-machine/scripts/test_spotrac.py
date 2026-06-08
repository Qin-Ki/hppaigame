"""Test Spotrac scraping for one team"""
import cloudscraper
import re

scraper = cloudscraper.create_scraper(
    browser={'browser': 'chrome', 'platform': 'windows', 'mobile': False}
)

url = "https://www.spotrac.com/nba/atlanta-hawks/yearly"
r = scraper.get(url, timeout=30)
print(f"Status: {r.status_code}")

# Try different patterns
pattern1 = r'<tr[^>]*>.*?<td[^>]*><a[^>]*href="[^"]*player[^"]*"[^>]*>([^<]+)</a></td>\s*<td[^>]*>([A-Z]+)</td>\s*<td[^>]*>\$?([\d,]+)'
m = re.findall(pattern1, r.text, re.DOTALL)
print(f"Pattern 1: Found {len(m)} players")
for x in m[:8]:
    print(f"  {x[0]} | {x[1]} | ${x[2]}")

if len(m) == 0:
    # Try to find any player links
    player_links = re.findall(r'href="/nba/player/[^"]*"[^>]*>([^<]+)</a>', r.text)
    print(f"\nPlayer links found: {len(player_links)}")
    for p in player_links[:10]:
        print(f"  {p}")
