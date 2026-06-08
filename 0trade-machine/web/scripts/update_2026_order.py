"""Replace 2026 picks in draft-picks.js with actual NBA draft order."""
import re

CN = {
    'atl':'老鹰','bkn':'篮网','bos':'凯尔特人','cha':'黄蜂','chi':'公牛',
    'cle':'骑士','dal':'独行侠','den':'掘金','det':'活塞','gsw':'勇士',
    'hou':'火箭','ind':'步行者','lac':'快船','lal':'湖人','mem':'灰熊',
    'mia':'热火','mil':'雄鹿','min':'森林狼','nop':'鹈鹕','nyk':'尼克斯',
    'okc':'雷霆','orl':'魔术','phi':'76人','phx':'太阳','por':'开拓者',
    'sac':'国王','sas':'马刺','tor':'猛龙','uta':'爵士','was':'奇才'
}

first = [(1,'was','was'),(2,'uta','uta'),(3,'mem','mem'),(4,'chi','chi'),
         (5,'lac','ind'),(6,'bkn','bkn'),(7,'sac','sac'),(8,'atl','nop'),
         (9,'dal','dal'),(10,'mil','mil'),(11,'gsw','gsw'),(12,'okc','lac'),
         (13,'mia','mia'),(14,'cha','cha'),(15,'chi','por'),(16,'mem','phx'),
         (17,'okc','phi'),(18,'cha','orl'),(19,'tor','tor'),(20,'sas','atl'),
         (21,'det','min'),(22,'phi','hou'),(23,'atl','cle'),(24,'nyk','nyk'),
         (25,'lal','lal'),(26,'den','den'),(27,'bos','bos'),(28,'min','det'),
         (29,'cle','sas'),(30,'dal','okc')]

second = [(31,'nyk','was'),(32,'mem','ind'),(33,'bkn','bkn'),(34,'sac','sac'),
          (35,'sas','uta'),(36,'lac','mem'),(37,'okc','dal'),(38,'chi','nop'),
          (39,'hou','chi'),(40,'bos','mil'),(41,'mia','gsw'),(42,'sas','por'),
          (43,'bkn','lac'),(44,'sas','mia'),(45,'sac','cha'),(46,'orl','orl'),
          (47,'phx','phi'),(48,'dal','phx'),(49,'den','atl'),(50,'tor','tor'),
          (51,'was','min'),(52,'lac','cle'),(53,'hou','hou'),(54,'gsw','lal'),
          (55,'nyk','nyk'),(56,'chi','den'),(57,'atl','bos'),(58,'nop','det'),
          (59,'min','sas'),(60,'was','okc')]

# Build new picks by holder team
new_by_holder = {}
for num, holder, origin in first + second:
    rn = '首轮' if num <= 30 else '次轮'
    rid = 1 if num <= 30 else 2
    tag = '自有' if holder == origin else f'来自{CN.get(origin, origin)}'
    label = f'2026{rn}（#{num}，{tag}）'
    new_by_holder.setdefault(holder, []).append(
        f"    {{ id:'{holder}-2026r{rid}-{origin}', year:2026, round:{rid}, originalTeam:'{origin}', protection:'none', label:'{label}' }},"
    )

fpath = 'NBA AI经理 · 交易模拟器_files/js/draft-picks.js'
with open(fpath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Process line by line, tracking which team section we're in
result = []
current_team = None
in_array = False

for line in lines:
    # Detect team section start
    m = re.match(r'\s*// ========== (\w+) ==========', line)
    if m:
        current_team = None
        for tid, cname in CN.items():
            if cname == m.group(1):
                current_team = tid
                break
        in_array = False
    
    # Detect array start
    if current_team and re.match(r'\s+' + current_team + r': \[', line):
        in_array = True
        result.append(line)
        # Insert new 2026 picks right after the [
        if current_team in new_by_holder:
            for pick_line in new_by_holder[current_team]:
                result.append(pick_line + '\n')
        continue
    
    # Detect array end
    if in_array and re.match(r'\s+\],', line):
        in_array = False
        current_team = None
        result.append(line)
        continue
    
    # Skip old 2026 entries
    if in_array and 'year:2026' in line:
        continue
    
    result.append(line)

output = ''.join(result)

with open(fpath, 'w', encoding='utf-8') as f:
    f.write(output)

total_picks = len(re.findall(r"id:'([^']+)'", output))
total_2026 = len(re.findall(r"year:2026", output))
print(f"Done! Total picks: {total_picks}, 2026 entries: {total_2026}")
