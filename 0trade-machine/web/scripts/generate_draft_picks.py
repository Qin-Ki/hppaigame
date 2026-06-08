#!/usr/bin/env python3
"""Generate draft-picks.js from realgm_draft_parsed.json"""
import json, re, os

# Load data
with open('data/realgm_draft_parsed.json', 'r', encoding='utf-8') as f:
    realgm = json.load(f)

# Team ID -> Chinese name
CN = {
    'atl':'老鹰','bkn':'篮网','bos':'凯尔特人','cha':'黄蜂','chi':'公牛',
    'cle':'骑士','dal':'独行侠','den':'掘金','det':'活塞','gsw':'勇士',
    'hou':'火箭','ind':'步行者','lac':'快船','lal':'湖人','mem':'灰熊',
    'mia':'热火','mil':'雄鹿','min':'森林狼','nop':'鹈鹕','nyk':'尼克斯',
    'okc':'雷霆','orl':'魔术','phi':'76人','phx':'太阳','por':'开拓者',
    'sac':'国王','sas':'马刺','tor':'猛龙','uta':'爵士','was':'奇才'
}

# RealGM team code -> our team ID mapping
TEAM_MAP = {
    'ATL':'atl', 'BOS':'bos', 'BRK':'bkn', 'CHA':'cha', 'CHI':'chi',
    'CLE':'cle', 'DAL':'dal', 'DEN':'den', 'DET':'det', 'GOS':'gsw',
    'HOU':'hou', 'IND':'ind', 'LAC':'lac', 'LAL':'lal', 'MEM':'mem',
    'MIA':'mia', 'MIL':'mil', 'MIN':'min', 'NOP':'nop', 'NYK':'nyk',
    'OKC':'okc', 'ORL':'orl', 'PHL':'phi', 'PHX':'phx', 'POR':'por',
    'SAC':'sac', 'SAN':'sas', 'TOR':'tor', 'UTH':'uta', 'WAS':'was'
}

def pick_id(team, year, rnd, origin, idx=0):
    suffix = f"-{idx}" if idx > 0 else ""
    return f"{team}-{year}r{rnd}-{origin}{suffix}"

def protection_code(text):
    t = text or ''
    # Check for Own pick protection first (specific patterns)
    if re.search(r'(?:^|[;, ])1-4\s+Own', t): return 'top4'
    if re.search(r'(?:^|[;, ])1-5\s+Own', t): return 'top5'
    if re.search(r'(?:^|[;, ])1-8\s+Own', t): return 'top8'
    if re.search(r'(?:^|[;, ])1-14\s+Own', t): return 'top14'
    if re.search(r'(?:^|[;, ])1-20\s+Own', t): return 'top20'
    if re.search(r'(?:^|[;, ])1-2\s+Own', t): return 'top2'
    if re.search(r'(?:^|[;, ])1-3\s+Own', t): return 'top3'
    if re.search(r'1-16', t): return 'top16'
    # Incoming picks protection
    if re.search(r'POR\s+15-30', t): return 'top14'
    if re.search(r'DAL\s+3-30', t): return 'top2'
    if re.search(r'MIA\s+15-30', t): return 'top14'
    if re.search(r'WAS\s+1-8', t): return 'top8'
    if re.search(r'UTH\s+1-8', t): return 'top8'
    if re.search(r'MIN\s+1-8', t): return 'top8'
    if re.search(r'WAS\s+9-30', t): return 'none'
    if re.search(r'PHL\s+5-30', t): return 'top4'
    if re.search(r'UTH\s+9-30', t): return 'none'
    if re.search(r'DEN\s+6-30', t): return 'top5'
    if re.search(r'LAL\s+5-30', t): return 'top4'
    if re.search(r'SAN\s+17-30', t): return 'none'
    if re.search(r'PHL\s+9-30', t): return 'top8'
    if re.search(r'GOS\s+21-30', t): return 'top20'
    return 'none'

# Build picks for each team
result = {}
team_order = ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou',
              'ind','lac','lal','mem','mia','mil','min','nop','nyk','okc','orl',
              'phi','phx','por','sac','sas','tor','uta','was']

for tid in team_order:
    if tid not in realgm:
        result[tid] = []
        continue
    
    team_picks = []
    entries = realgm[tid]['picks']
    
    for entry in entries:
        year = entry['year']
        first = entry.get('first_round', '')
        second = entry.get('second_round', '')
        
        # Process first round
        if first and first.strip() != '0':
            # Check if team gets its own pick
            text = first
            rnd = 1
            
            # "Own" case: team retains its pick
            if 'Own' in text:
                prot = protection_code(text)
                # Extract protection range if any
                range_match = re.search(r'(\d+-\d+)\s*Own', text)
                r = range_match.group(1) if range_match else ''
                # Format as #N-#M
                rf = f'#{r.replace("-","-#")}' if r else ''
                range_str = f"（{rf}顺位自有" if rf else "（自有"
                if prot != 'none':
                    prot_names = {'top4':'前4保护','top5':'前5保护','top8':'前8保护','top14':'乐透保护',
                                  'top20':'前20保护','top2':'前2保护','top3':'前3保护','top16':'前16保护'}
                    range_str += f"，{prot_names.get(prot, prot)}"
                range_str += "）"
                label = f"{year}首轮{range_str}"
                team_picks.append({
                    'id': pick_id(tid, year, rnd, tid),
                    'year': year, 'round': rnd, 'originalTeam': tid,
                    'protection': prot, 'label': label
                })
            
            # Check for incoming picks from other teams
            # Pattern: "TEAM" or "TEAM XX-XX" followed by via or end
            team_codes = ['ATL','BOS','BRK','CHA','CHI','CLE','DAL','DEN','DET','GOS','HOU','IND',
                          'LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK','OKC','ORL','PHL','PHX',
                          'POR','SAC','SAN','TOR','UTH','WAS']
            
            # Remove the Own part to avoid re-processing
            remaining = re.sub(r'[^;]*Own[^;]*;?', '', text)
            
            for tc in team_codes:
                mapped_id = TEAM_MAP.get(tc, tc.lower())
                if mapped_id == tid:
                    continue
                # Skip "To TEAM" patterns (outgoing)
                if re.search(r'To\s+' + tc, remaining):
                    continue
                # Check if team appears as source (TEAM followed by space or number or via or end)
                if re.search(r'(?:^|[;, ])' + tc + r'(?:\s+[\d\-]+)?(?:\s*\(?via|\s*$|[;,])', remaining):
                    range_m = re.search(tc + r'\s+([\d\-]+)', remaining)
                    prot = protection_code(remaining)
                    rs = range_m.group(1) if range_m else ''
                    # Format range as #N-#M
                    rf = f'#{rs.replace("-","-#")}' if rs else ''
                    prot_names = {'top4':'前4保护','top5':'前5保护','top8':'前8保护','top14':'乐透保护',
                                  'top20':'前20保护','top2':'前2保护','top3':'前3保护','top16':'前16保护'}
                    extra = f"，{prot_names.get(prot, prot)}" if prot != 'none' else ''
                    range_part = f"，{rf}" if rf else ""
                    label = f"{year}首轮（来自{CN.get(mapped_id, tc)}{range_part}{extra}）"
                    # Remove from remaining to avoid duplicates
                    remaining = re.sub(tc + r'(?:\s+[\d\-]+)?(?:\s*\(?via[^;]*)?', '', remaining)
                    team_picks.append({
                        'id': pick_id(tid, year, rnd, mapped_id),
                        'year': year, 'round': rnd, 'originalTeam': mapped_id,
                        'protection': prot, 'label': label
                    })
        
        # Process second round (same logic)
        if second and second.strip() != '0':
            text = second
            rnd = 2
            
            if 'Own' in text:
                prot = protection_code(text)
                range_match = re.search(r'(\d+-\d+)\s*Own', text)
                if range_match:
                    r = range_match.group(1)
                    rf = f'#{r.replace("-","-#")}'
                    label = f"{year}次轮（{rf}顺位自有）"
                else:
                    range_m2 = re.search(r'(\d+-\d+)\s*Own', text)
                    if range_m2:
                        r = range_m2.group(1)
                        rf = f'#{r.replace("-","-#")}'
                        label = f"{year}次轮（{rf}顺位自有）"
                    else:
                        label = f"{year}次轮（自有）"
                team_picks.append({
                    'id': pick_id(tid, year, rnd, tid),
                    'year': year, 'round': rnd, 'originalTeam': tid,
                    'protection': prot, 'label': label
                })
            
            remaining = re.sub(r'[^;]*Own[^;]*;?', '', text)
            
            team_codes = ['ATL','BOS','BRK','CHA','CHI','CLE','DAL','DEN','DET','GOS','HOU','IND',
                          'LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK','OKC','ORL','PHL','PHX',
                          'POR','SAC','SAN','TOR','UTH','WAS']
            
            for tc in team_codes:
                mapped_id = TEAM_MAP.get(tc, tc.lower())
                if mapped_id == tid:
                    continue
                if re.search(r'To\s+' + tc, remaining):
                    continue
                if re.search(r'(?:^|[;, ])' + tc + r'(?:\s+[\d\-]+)?(?:\s*\(?via|\s*$|[;,])', remaining):
                    range_m = re.search(tc + r'\s+([\d\-]+)', remaining)
                    rs = range_m.group(1) if range_m else ''
                    rf = f'#{rs.replace("-","-#")}' if rs else ''
                    range_part = f"，{rf}" if rf else ""
                    label = f"{year}次轮（来自{CN.get(mapped_id, tc)}{range_part}）"
                    remaining = re.sub(tc + r'(?:\s+[\d\-]+)?(?:\s*\(?via[^;]*)?', '', remaining)
                    team_picks.append({
                        'id': pick_id(tid, year, rnd, mapped_id),
                        'year': year, 'round': rnd, 'originalTeam': mapped_id,
                        'protection': 'none', 'label': label
                    })
    
    result[tid] = team_picks

# Output as JS
lines = [
    '/**',
    ' * NBA Future Draft Picks Data',
    ' * Source: RealGM (https://basketball.realgm.com/nba/draft/future_drafts/team)',
    ' * Parsed: 2026-06-08',
    ' * Each ;-separated segment = one pick entry',
    ' * #N-#M format = pick position range',
    ' */',
    '',
    'var DRAFT_PICKS_DATA = {',
]

for tid in team_order:
    lines.append(f'')
    lines.append(f'  // ========== {CN.get(tid, tid.upper())} ==========')
    lines.append(f'  {tid}: [')
    picks = result.get(tid, [])
    for i, p in enumerate(picks):
        comma = ',' if i < len(picks) - 1 else ''
        lines.append(f"    {{ id:'{p['id']}', year:{p['year']}, round:{p['round']}, originalTeam:'{p['originalTeam']}', protection:'{p['protection']}', label:'{p['label']}' }}{comma}")
    lines.append(f'  ],')

lines.append('};')
lines.append('')

output = '\n'.join(lines)

# Save to file
out_path = 'NBA AI经理 · 交易模拟器_files/js/draft-picks.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(output)

# Stats
total = sum(len(v) for v in result.values())
print(f"Generated {out_path}")
print(f"Total picks: {total}")
print(f"Teams: {len(result)}")
for tid in team_order:
    print(f"  {tid} ({CN.get(tid,'?')}): {len(result.get(tid,[]))} picks")
