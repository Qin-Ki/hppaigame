#!/usr/bin/env python3
"""Parse RealGM draft data: each ; = one pick, with # range format."""
import json, re, os

with open('data/realgm_draft_raw_data.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

CN = {
    'atl':'老鹰','bkn':'篮网','bos':'凯尔特人','cha':'黄蜂','chi':'公牛',
    'cle':'骑士','dal':'独行侠','den':'掘金','det':'活塞','gsw':'勇士',
    'hou':'火箭','ind':'步行者','lac':'快船','lal':'湖人','mem':'灰熊',
    'mia':'热火','mil':'雄鹿','min':'森林狼','nop':'鹈鹕','nyk':'尼克斯',
    'okc':'雷霆','orl':'魔术','phi':'76人','phx':'太阳','por':'开拓者',
    'sac':'国王','sas':'马刺','tor':'猛龙','uta':'爵士','was':'奇才'
}
RG2ID = {
    'ATL':'atl','BOS':'bos','BRK':'bkn','CHA':'cha','CHI':'chi',
    'CLE':'cle','DAL':'dal','DEN':'den','DET':'det','GOS':'gsw',
    'HOU':'hou','IND':'ind','LAC':'lac','LAL':'lal','MEM':'mem',
    'MIA':'mia','MIL':'mil','MIN':'min','NOP':'nop','NYK':'nyk',
    'OKC':'okc','ORL':'orl','PHL':'phi','PHX':'phx','POR':'por',
    'SAC':'sac','SAN':'sas','TOR':'tor','UTH':'uta','WAS':'was'
}
ALL_RG = list(RG2ID.keys())

def count_from_end(t):
    m = re.search(r'(\d+(?:\+\d+)?)\s*$', t.strip().rstrip(')'))
    if m:
        v = m.group(1)
        if '+' in v:
            a,b = v.split('+')
            return int(a)+int(b)
        return int(v)
    return 0

def strip_count(t):
    return re.sub(r'\d+(?:\+\d+)?\s*$', '', t).rstrip('; ')

def extract_range(t):
    m = re.search(r'(\d{1,2}-\d{1,2})', t)
    return m.group(1) if m else ''

def prot_from_range(r):
    if not r: return 'none'
    parts = r.split('-')
    low = int(parts[0])
    if low == 1:
        high = int(parts[1])
        if high == 2: return 'top2'
        if high == 3: return 'top3'
        if high == 4: return 'top4'
        if high == 5: return 'top5'
        if high == 8: return 'top8'
        if high == 14: return 'top14'
        if high == 16: return 'top16'
        if high == 20: return 'top20'
    return 'none'

def prot_label(pc):
    return {'top2':'前2保护','top3':'前3保护','top4':'前4保护','top5':'前5保护',
            'top8':'前8保护','top14':'乐透保护','top16':'前16保护','top20':'前20保护'}.get(pc,'')

def fmt_r(r):
    if not r: return ''
    parts = r.split('-')
    return f'#{parts[0]}-#{parts[1]}'

def norm(tc):
    return RG2ID.get(tc, tc.lower())

def split_semi(t):
    result = []
    dp, db = 0, 0
    cur = []
    for ch in t:
        if ch == '(': dp += 1
        elif ch == ')': dp -= 1
        elif ch == '[': db += 1
        elif ch == ']': db -= 1
        elif ch == ';' and dp == 0 and db == 0:
            result.append(''.join(cur))
            cur = []
            continue
        cur.append(ch)
    if cur: result.append(''.join(cur))
    return result

def parse_round(tid, year, rnd, raw_text):
    if not raw_text or raw_text.strip() in ('0', ''):
        return []
    
    total = count_from_end(raw_text)
    body = strip_count(raw_text)
    segs = split_semi(body)
    
    picks = []
    incoming_segs = []
    
    for seg in segs:
        seg = seg.strip()
        if not seg: continue
        if re.match(r'^To\s+', seg): continue
        
        if 'Own' in seg:
            r = extract_range(seg)
            pc = prot_from_range(r)
            pl = prot_label(pc)
            rp = f'{fmt_r(r)}顺位' if r else ''
            pp = f'，{pl}' if pl else ''
            if rp:
                label = f'{year}{"首轮" if rnd == 1 else "次轮"}（{rp}自有{pp}）'
            else:
                label = f'{year}{"首轮" if rnd == 1 else "次轮"}（自有）'
            picks.append({
                'id': f'{tid}-{year}r{rnd}-{tid}',
                'year': year, 'round': rnd, 'originalTeam': tid,
                'protection': pc, 'label': label
            })
            continue
        
        if 'Frozen' in seg:
            picks.append({
                'id': f'{tid}-{year}r{rnd}-{tid}',
                'year': year, 'round': rnd, 'originalTeam': tid,
                'protection': 'none',
                'label': f'{year}首轮（#1-#30，自有，冻结至2027-28赛季）' if rnd == 1 else f'{year}次轮（冻结）'
            })
            continue
        
        to_m = re.search(r'\bto\s+([A-Z]{3})', seg, re.IGNORECASE)
        if to_m:
            target = norm(to_m.group(1))
            if target != tid:
                continue
        
        incoming_segs.append(seg)
    
    if len(picks) < total:
        for seg in segs:
            seg = seg.strip()
            if not seg or 'Own' in seg or 'Frozen' in seg or re.match(r'^To\s+', seg):
                continue
            to_m = re.search(r'\bto\s+([A-Z]{3})', seg, re.IGNORECASE)
            if to_m and norm(to_m.group(1)) != tid:
                continue
            if seg not in incoming_segs:
                incoming_segs.append(seg)
    
    for seg in incoming_segs:
        r = extract_range(seg)
        pc = prot_from_range(r)
        pl = prot_label(pc)
        
        source = None
        for tc in ALL_RG:
            mid = norm(tc)
            if mid == tid: continue
            if re.search(rf'(?<!\bto\s)\b{tc}\b', seg):
                source = tc
                break
        
        if source:
            mid = norm(source)
            src_cn = CN.get(mid, source)
            rp = f'{fmt_r(r)}' if r else ''
            pp = f'，{pl}' if pl else ''
            rn = '首轮' if rnd == 1 else '次轮'
            
            if rp:
                label = f'{year}{rn}（{rp}，来自{src_cn}{pp}）'
            else:
                label = f'{year}{rn}（来自{src_cn}{pp}）'
            
            picks.append({
                'id': f'{tid}-{year}r{rnd}-{mid}',
                'year': year, 'round': rnd, 'originalTeam': mid,
                'protection': pc, 'label': label
            })
    
    return picks

results = {}
team_order = ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou',
              'ind','lac','lal','mem','mia','mil','min','nop','nyk','okc','orl',
              'phi','phx','por','sac','sas','tor','uta','was']

for tid in team_order:
    if tid not in raw:
        results[tid] = []; continue
    team_picks = []
    for entry in raw[tid]['picks']:
        team_picks.extend(parse_round(tid, entry['year'], 1, entry.get('first_round','')))
        team_picks.extend(parse_round(tid, entry['year'], 2, entry.get('second_round','')))
    results[tid] = team_picks

total = sum(len(v) for v in results.values())
print(f"Total picks: {total}")
for tid in team_order:
    print(f"  {tid} ({CN.get(tid,'?')}): {len(results.get(tid,[]))} picks")

# Generate JS
lines = [
    '/**',
    ' * NBA Future Draft Picks Data',
    ' * Source: RealGM (https://basketball.realgm.com/nba/draft/future_drafts/team)',
    ' * Parsed: each ;-separated entry = one draft pick',
    ' * #N-#M format = pick position range',
    ' */',
    '', 'var DRAFT_PICKS_DATA = {',
]
for tid in team_order:
    lines.append(f'\n  // ========== {CN.get(tid, tid.upper())} ==========')
    lines.append(f'  {tid}: [')
    picks = results.get(tid, [])
    for i, p in enumerate(picks):
        c = ',' if i < len(picks)-1 else ''
        lines.append(f"    {{ id:'{p['id']}', year:{p['year']}, round:{p['round']}, originalTeam:'{p['originalTeam']}', protection:'{p['protection']}', label:'{p['label']}' }}{c}")
    lines.append(f'  ],')
lines.append('};')

out = 'NBA AI经理 · 交易模拟器_files/js/draft-picks.js'
with open(out, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print(f"\nWritten to {out}")
