"""
Spotrac NBA Roster Scraper
使用 cloudscraper 绕过 Cloudflare 获取各队薪资数据
"""
import cloudscraper
import re
import json
import time

TEAMS = {
    'atl': 'atlanta-hawks', 'bkn': 'brooklyn-nets', 'bos': 'boston-celtics',
    'cha': 'charlotte-hornets', 'chi': 'chicago-bulls', 'cle': 'cleveland-cavaliers',
    'dal': 'dallas-mavericks', 'den': 'denver-nuggets', 'det': 'detroit-pistons',
    'gsw': 'golden-state-warriors', 'hou': 'houston-rockets', 'ind': 'indiana-pacers',
    'lac': 'la-clippers', 'lal': 'los-angeles-lakers', 'mem': 'memphis-grizzlies',
    'mia': 'miami-heat', 'mil': 'milwaukee-bucks', 'min': 'minnesota-timberwolves',
    'nop': 'new-orleans-pelicans', 'nyk': 'new-york-knicks', 'okc': 'oklahoma-city-thunder',
    'orl': 'orlando-magic', 'phi': 'philadelphia-76ers', 'phx': 'phoenix-suns',
    'por': 'portland-trail-blazers', 'sac': 'sacramento-kings', 'sas': 'san-antonio-spurs',
    'tor': 'toronto-raptors', 'uta': 'utah-jazz', 'was': 'washington-wizards'
}

TEAM_CN = {
    'atl': '老鹰', 'bkn': '篮网', 'bos': '凯尔特人', 'cha': '黄蜂', 'chi': '公牛',
    'cle': '骑士', 'dal': '独行侠', 'den': '掘金', 'det': '活塞', 'gsw': '勇士',
    'hou': '火箭', 'ind': '步行者', 'lac': '快船', 'lal': '湖人', 'mem': '灰熊',
    'mia': '热火', 'mil': '雄鹿', 'min': '森林狼', 'nop': '鹈鹕', 'nyk': '尼克斯',
    'okc': '雷霆', 'orl': '魔术', 'phi': '76人', 'phx': '太阳', 'por': '开拓者',
    'sac': '国王', 'sas': '马刺', 'tor': '猛龙', 'uta': '爵士', 'was': '奇才'
}

EN_TO_CN = {
    "CJ McCollum": "CJ-麦科勒姆", "Trae Young": "特雷-杨",
    "Nic Claxton": "尼古拉斯-克拉克斯顿", "Cam Thomas": "卡姆-托马斯",
    "Jayson Tatum": "杰森-塔特姆", "Jaylen Brown": "杰伦-布朗",
    "Derrick White": "德里克-怀特", "Sam Hauser": "萨姆-豪瑟",
    "Payton Pritchard": "佩顿-普里查德", "Neemias Queta": "内米亚斯-克塔",
    "Josh Giddey": "约什-吉迪", "Patrick Williams": "帕特里克-威廉姆斯",
    "Cade Cunningham": "凯德-坎宁安", "Evan Mobley": "埃文-莫布利",
    "Donovan Mitchell": "多诺万-米切尔", "James Harden": "詹姆斯-哈登",
    "Jarrett Allen": "贾勒特-阿伦", "Max Strus": "马克斯-斯特鲁斯",
    "Dennis Schröder": "丹尼斯-施罗德", "Kyrie Irving": "凯里-欧文",
    "PJ Washington": "PJ-华盛顿", "Klay Thompson": "克莱-汤普森",
    "Daniel Gafford": "丹尼尔-加福德", "Cooper Flagg": "库珀-弗拉格",
    "Caleb Martin": "凯莱布-马丁", "Naji Marshall": "纳吉-马绍尔",
    "Max Christie": "马克斯-克里斯蒂", "Dereck Lively II": "德雷克·莱夫利二世",
    "AJ Johnson": "AJ·约翰逊", "Nikola Jokic": "尼古拉-约基奇",
    "Jamal Murray": "贾马尔-默里", "Aaron Gordon": "阿龙-戈登",
    "Cameron Johnson": "卡梅伦-约翰逊", "Christian Braun": "克里斯琴-布朗",
    "Jonas Valanciunas": "约纳斯-瓦兰丘纳斯", "Zeke Nnaji": "齐克-纳吉",
    "Julian Strawther": "朱利安·斯特劳瑟", "DaRon Holmes II": "达隆·霍姆斯二世",
    "Jalen Pickett": "杰伦-皮克特", "Kevin Durant": "凯文-杜兰特",
    "Alperen Sengun": "阿尔佩伦-申京", "Fred VanVleet": "弗雷德-范弗利特",
    "Jabari Smith Jr.": "小贾巴里-史密斯", "Dorian Finney-Smith": "多里安-芬尼-史密斯",
    "Steven Adams": "史蒂文-亚当斯", "Amen Thompson": "阿门·汤普森",
    "Reed Sheppard": "里德·谢泼德", "Clint Capela": "克林特-卡佩拉",
    "J.D. Davison": "JD-戴维森", "Stephen Curry": "斯蒂芬-库里",
    "Jimmy Butler": "吉米-巴特勒", "Draymond Green": "德雷蒙德-格林",
    "Moses Moody": "摩西-穆迪", "Al Horford": "艾尔-霍福德",
    "Brandin Podziemski": "布兰丁·波杰姆斯基", "Gui Santos": "桂-桑托斯",
    "De'Anthony Melton": "丹东尼-梅尔顿",
    "Kyle Kuzma": "凯尔-库兹马", "Bobby Portis": "博比-波蒂斯",
    "Giannis Antetokounmpo": "扬尼斯-阿德托昆博",
    "Myles Turner": "迈尔斯-特纳", "Luka Doncic": "卢卡-东契奇",
    "Austin Reaves": "奥斯汀-里夫斯",
    "Anthony Davis": "安东尼-戴维斯",
    "Isaac Okoro": "艾萨克-奥科罗", "Jalen Smith": "杰伦-史密斯",
    "Tre Jones": "特雷-琼斯", "Rob Dillingham": "罗伯特·迪林厄姆",
    "Matas Buzelis": "马塔斯·布泽利斯", "Noa Essengue": "诺阿-埃森格",
    "Mouhamadou Gueye": "穆哈马杜-盖耶",
    "Duncan Robinson": "邓肯-罗宾逊", "Isaiah Stewart": "以赛亚-斯图尔特",
    "Caris LeVert": "卡里斯-勒韦尔", "Ausar Thompson": "奥萨尔·汤普森",
    "Ron Holland II": "罗恩-霍兰德", "Paul Reed": "保罗-里德",
    "Marcus Sasser": "马库斯·萨瑟", "Daniss Jenkins": "丹尼斯·詹金斯",
    "Tolu Smith III": "托卢-史密斯三世",
}

def scrape_team(team_id):
    team_slug = TEAMS[team_id]
    url = f"https://www.spotrac.com/nba/{team_slug}/yearly"
    
    scraper = cloudscraper.create_scraper(
        browser={'browser': 'chrome', 'platform': 'windows', 'mobile': False}
    )
    
    try:
        resp = scraper.get(url, timeout=30)
        if resp.status_code != 200:
            print(f"  ❌ {team_id} HTTP {resp.status_code}")
            return None
        
        html = resp.text
        
        players = []
        # 匹配球员行: <tr>包含球员链接、位置、薪资
        pattern = r'<tr[^>]*>.*?<td[^>]*><a[^>]*href="[^"]*player[^"]*"[^>]*>([^<]+)</a></td>\s*<td[^>]*>([A-Z]+)</td>\s*<td[^>]*>\$?([\d,]+)'
        
        matches = re.findall(pattern, html, re.DOTALL)
        
        for name, pos, salary_str in matches:
            salary = int(salary_str.replace(',', ''))
            cn_name = EN_TO_CN.get(name.strip(), name.strip())
            players.append({
                'name_en': name.strip(),
                'name_cn': cn_name,
                'pos': pos,
                'salary': salary
            })
        
        if players:
            print(f"  ✅ {team_id} ({TEAM_CN[team_id]}): {len(players)} 名球员")
            return players
        else:
            print(f"  ⚠️ {team_id} ({TEAM_CN[team_id]}): 未找到球员数据")
            return None
            
    except Exception as e:
        print(f"  ❌ {team_id} 错误: {e}")
        return None

def main():
    all_data = {}
    
    for team_id in TEAMS:
        print(f"\n抓取 {team_id} ({TEAM_CN[team_id]})...")
        result = scrape_team(team_id)
        if result:
            all_data[team_id] = result
        time.sleep(2)
    
    output_path = 'c:\\Users\\chenqi\\Desktop\\tod\\spotrac_data.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    total = sum(len(v) for v in all_data.values())
    print(f"\n✅ 完成! 成功抓取 {len(all_data)} 支球队, 共 {total} 名球员")
    print(f"输出: {output_path}")

if __name__ == '__main__':
    main()
