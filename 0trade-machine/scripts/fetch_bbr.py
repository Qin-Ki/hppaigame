"""
NBA AI经理 · BBR数据抓取脚本
从 Basketball-Reference.com 抓取 2025-26 赛季所有30支球队的真实阵容数据
输出: data_patch_v2.txt (可直接嵌入 data.js 的球员数据)
"""

import requests
import re
import json
from bs4 import BeautifulSoup
import time
import sys

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.basketball-reference.com/',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
}

# NBA球队缩写映射
TEAM_MAP = {
    'ATL': 'atl', 'BOS': 'bos', 'BRK': 'bkn', 'CHI': 'chi', 'CHO': 'cha',
    'CLE': 'cle', 'DAL': 'dal', 'DEN': 'den', 'DET': 'det', 'GSW': 'gsw',
    'HOU': 'hou', 'IND': 'ind', 'LAC': 'lac', 'LAL': 'lal', 'MEM': 'mem',
    'MIA': 'mia', 'MIL': 'mil', 'MIN': 'min', 'NOP': 'nop', 'NYK': 'nyk',
    'OKC': 'okc', 'ORL': 'orl', 'PHI': 'phi', 'PHO': 'phx', 'POR': 'por',
    'SAC': 'sac', 'SAS': 'sas', 'TOR': 'tor', 'UTA': 'uta', 'WAS': 'was'
}

# NBA球队中文名映射
TEAM_CN = {
    'atl': '老鹰', 'bkn': '篮网', 'bos': '凯尔特人', 'cha': '黄蜂', 'chi': '公牛',
    'cle': '骑士', 'dal': '独行侠', 'den': '掘金', 'det': '活塞', 'gsw': '勇士',
    'hou': '火箭', 'ind': '步行者', 'lac': '快船', 'lal': '湖人', 'mem': '灰熊',
    'mia': '热火', 'mil': '雄鹿', 'min': '森林狼', 'nop': '鹈鹕', 'nyk': '尼克斯',
    'okc': '雷霆', 'orl': '魔术', 'phi': '76人', 'phx': '太阳', 'por': '开拓者',
    'sac': '国王', 'sas': '马刺', 'tor': '猛龙', 'uta': '爵士', 'was': '奇才'
}

# 位置映射
POS_MAP = {
    'PG': 'PG', 'SG': 'SG', 'SF': 'SF', 'PF': 'PF', 'C': 'C',
    'G': 'SG', 'F': 'SF',
}

# 英->中 球员姓名映射（来自现有data.js）
NAME_CN_MAP = {
    # 以现有数据中的名字为准
    "Jalen Johnson": "杰伦-约翰逊",
    "Dyson Daniels": "戴森-丹尼尔斯",
    "Jonathan Kuminga": "乔纳森-库明加",
    "Onyeka Okongwu": "奥涅卡-奥孔古",
    "Nickeil Alexander-Walker": "尼基尔-亚历山大-沃克",
    "Corey Kispert": "科里-基斯珀特",
    "Zaccharie Risacher": "扎卡里·里萨切尔",
    "Buddy Hield": "巴迪-希尔德",
    "Asa Newell": "阿萨-纽厄尔",
    "Mouhamed Gueye": "穆罕穆德-盖伊",
    "Michael Porter Jr.": "小迈克尔-波特",
    "Nicolas Claxton": "尼古拉斯-克拉克斯顿",
    "Terance Mann": "特伦斯-曼",
    "Egor Demin": "叶戈尔-杰明",
    "Ziaire Williams": "宰伊尔-威廉姆斯",
    "Day'Ron Sharpe": "戴罗恩-夏普",
    "Noah Clowney": "诺厄·克洛尼",
    "Nolan Traore": "诺兰-特拉奥雷",
    "Drake Powell": "德雷克-鲍威尔",
    "Ben Saraf": "本-萨拉夫",
    "Jayson Tatum": "杰森-塔特姆",
    "Jaylen Brown": "杰伦-布朗",
    "Derrick White": "德里克-怀特",
    "Sam Hauser": "萨姆-豪瑟",
    "Payton Pritchard": "佩顿-普里查德",
    "Hugo Gonzalez": "雨果-冈萨雷斯",
    "Luka Garza": "卢卡-加尔扎",
    "Dalano Banton": "达拉诺-班顿",
    "Baylor Scheierman": "贝勒·沙伊尔曼",
    "Neemias Queta": "内米亚斯-克塔",
    "LaMelo Ball": "拉梅洛-鲍尔",
    "Miles Bridges": "迈尔斯-布里奇斯",
    "Brandon Miller": "布兰登·米勒",
    "Josh Green": "约什-格林",
    "Grant Williams": "格兰特-威廉姆斯",
    "Kon Knueppel": "康-克尼普尔",
    "Tidjane Salaun": "提贾尼·萨隆",
    "Tre Mann": "特雷-曼",
    "Pat Connaughton": "帕特-康诺顿",
    "Liam McNeely": "利亚姆-麦克尼利",
    "Josh Giddey": "约什-吉迪",
    "Patrick Williams": "帕特里克-威廉姆斯",
    "Isaac Okoro": "艾萨克-奥科罗",
    "Jalen Smith": "杰伦-史密斯",
    "Tre Jones": "特雷-琼斯",
    "Rob Dillingham": "罗伯特·迪林厄姆",
    "Guerschon Yabusele": "盖尔雄-亚布塞莱",
    "Matas Buzelis": "马塔斯·布泽利斯",
    "Noah Essengue": "诺阿-埃森格",
    "Mouhamadou Gueye": "穆哈马杜-盖耶",
    "Evan Mobley": "埃文-莫布利",
    "Donovan Mitchell": "多诺万-米切尔",
    "James Harden": "詹姆斯-哈登",
    "Jarrett Allen": "贾勒特-阿伦",
    "Max Strus": "马克斯-斯特鲁斯",
    "Dennis Schroder": "丹尼斯-施罗德",
    "Sam Merrill": "萨姆-梅里尔",
    "Jaylon Tyson": "杰隆·泰森",
    "Nae'Qwan Tomlin": "内匡-汤姆林",
    "Craig Porter Jr.": "小克雷格·波特",
    "Kyrie Irving": "凯里-欧文",
    "PJ Washington": "PJ-华盛顿",
    "Klay Thompson": "克莱-汤普森",
    "Daniel Gafford": "丹尼尔-加福德",
    "Cooper Flagg": "库珀-弗拉格",
    "Caleb Martin": "凯莱布-马丁",
    "Naji Marshall": "纳吉-马绍尔",
    "Max Christie": "马克斯-克里斯蒂",
    "Dereck Lively II": "德雷克·莱夫利二世",
    "AJ Johnson": "AJ·约翰逊",
    "Nikola Jokic": "尼古拉-约基奇",
    "Jamal Murray": "贾马尔-默里",
    "Aaron Gordon": "阿龙-戈登",
    "Cameron Johnson": "卡梅伦-约翰逊",
    "Christian Braun": "克里斯琴-布朗",
    "Jonas Valanciunas": "约纳斯-瓦兰丘纳斯",
    "Zeke Nnaji": "齐克-纳吉",
    "Julian Strawther": "朱利安·斯特劳瑟",
    "DaRon Holmes II": "达隆·霍姆斯二世",
    "Jalen Pickett": "杰伦-皮克特",
    "Cade Cunningham": "凯德-坎宁安",
    "Duncan Robinson": "邓肯-罗宾逊",
    "Isaiah Stewart": "以赛亚-斯图尔特",
    "Caris LeVert": "卡里斯-勒韦尔",
    "Ausar Thompson": "奥萨尔·汤普森",
    "Ron Holland": "罗恩-霍兰德",
    "Paul Reed": "保罗-里德",
    "Marcus Sasser": "马库斯·萨瑟",
    "Dennis Jenkins": "丹尼斯·詹金斯",
    "Tolu Smith III": "托卢-史密斯三世",
    "Stephen Curry": "斯蒂芬-库里",
    "Jimmy Butler": "吉米-巴特勒",
    "Draymond Green": "德雷蒙德-格林",
    "Moses Moody": "摩西-穆迪",
    "Al Horford": "艾尔-霍福德",
    "Brandin Podziemski": "布兰丁·波杰姆斯基",
    "Gui Santos": "桂-桑托斯",
    "De'Anthony Melton": "丹东尼-梅尔顿",
    "Will Richard": "威尔-理查德",
    "Kevin Durant": "凯文-杜兰特",
    "Alperen Sengun": "阿尔佩伦-申京",
    "Fred VanVleet": "弗雷德-范弗利特",
    "Jabari Smith Jr.": "小贾巴里-史密斯",
    "Dorian Finney-Smith": "多里安-芬尼-史密斯",
    "Steven Adams": "史蒂文-亚当斯",
    "Amen Thompson": "阿门·汤普森",
    "Reed Sheppard": "里德·谢泼德",
    "Clint Capela": "克林特-卡佩拉",
    "JD Davison": "JD-戴维森",
    "Tyrese Haliburton": "泰雷斯-哈利伯顿",
    "Pascal Siakam": "帕斯卡尔-西亚卡姆",
    "Ivica Zubac": "伊维察-祖巴茨",
    "Andrew Nembhard": "安德鲁-内姆布哈德",
    "Obi Toppin": "奥比-托平",
    "TJ McConnell": "TJ-麦康奈尔",
    "Jarace Walker": "贾雷斯-沃克",
    "Ben Sheppard": "本·谢泼德",
    "Kobe Brown": "科比·布朗",
    "Micah Potter": "米卡-波特",
    "Kawhi Leonard": "科怀-伦纳德",
    "Darius Garland": "达里厄斯-加兰",
    "Bogdan Bogdanovic": "波格丹-波格丹诺维奇",
    "Derrick Jones Jr.": "小德里克-琼斯",
    "Brook Lopez": "布鲁克-洛佩斯",
    "Isaiah Jackson": "以赛亚-杰克逊",
    "Nicolas Batum": "尼古拉斯-巴图姆",
    "Kris Dunn": "克里斯-邓恩",
    "Bradley Beal": "布拉德利-比尔",
    "Yanic Konan Niederhauser": "亚尼克-科南-尼德豪泽",
    "Luka Doncic": "卢卡-东契奇",
    "Austin Reaves": "奥斯汀-里夫斯",
    "Jarred Vanderbilt": "贾里德-范德比尔特",
    "Deandre Ayton": "德安德烈-艾顿",
    "Jake LaRavia": "杰克-拉拉维亚",
    "Marcus Smart": "马库斯-斯马特",
    "Dalton Knecht": "道尔顿·克内克特",
    "Nick Smith Jr.": "小尼克·史密斯",
    "Bronny James": "布朗尼·詹姆斯",
    "Adou Thiero": "阿杜-蒂耶罗",
    "Ja Morant": "贾-莫兰特",
    "Kentavious Caldwell-Pope": "肯塔维厄斯-考德威尔-波普",
    "Santi Aldama": "桑迪-阿尔达马",
    "Brandon Clarke": "布兰登-克拉克",
    "Ty Jerome": "泰-杰罗姆",
    "Taylor Hendricks": "泰勒·亨德里克斯",
    "Zach Edey": "扎克·埃迪",
    "Cedric Coward": "塞德里克-考沃德",
    "Walter Clayton Jr.": "沃尔特-克莱顿",
    "Taj Gibson": "泰-吉布森",
    "Bam Adebayo": "巴姆-阿德巴约",
    "Tyler Herro": "泰勒-希罗",
    "Andrew Wiggins": "安德鲁-威金斯",
    "Nikola Jovic": "尼科拉-约维奇",
    "Davion Mitchell": "戴维恩-米切尔",
    "Jaime Jaquez Jr.": "小海梅-哈克斯",
    "Kel'el Ware": "凯莱尔·韦尔",
    "Kasparas Jakucionis": "卡斯帕拉斯-亚库契奥尼斯",
    "Drew Smith": "德鲁-史密斯",
    "Myron Gardner": "迈伦-加德纳",
    "Giannis Antetokounmpo": "扬尼斯-阿德托昆博",
    "Myles Turner": "迈尔斯-特纳",
    "Kyle Kuzma": "凯尔-库兹马",
    "Bobby Portis": "博比-波蒂斯",
    "AJ Green": "AJ-格林",
    "Kevin Porter Jr.": "小凯文-波特",
    "Ryan Rollins": "莱恩-罗林斯",
    "Gary Trent Jr.": "小加里-特伦特",
    "Gary Harris": "加里-哈里斯",
    "Taurean Prince": "托里恩-普林斯",
    "Anthony Edwards": "安东尼-爱德华兹",
    "Rudy Gobert": "鲁迪-戈贝尔",
    "Julius Randle": "朱利叶斯-兰德尔",
    "Jaden McDaniels": "杰登-麦克丹尼尔斯",
    "Naz Reid": "纳兹-里德",
    "Donte DiVincenzo": "唐特-迪温琴佐",
    "Joan Beringer": "若昂-贝兰热",
    "Terrence Shannon Jr.": "小特伦斯·香农",
    "Julian Phillips": "朱利安-菲利普斯",
    "Zion Williamson": "蔡恩-威廉森",
    "Jordan Poole": "乔丹-普尔",
    "Dejounte Murray": "德章泰-默里",
    "Trey Murphy III": "特雷-墨菲",
    "Kevon Looney": "凯文-卢尼",
    "Jeremiah Fears": "杰里迈亚-费尔斯",
    "Jordan Hawkins": "乔丹·霍金斯",
    "Saddiq Bey": "萨迪克-贝",
    "Derik Queen": "德里克-奎因",
    "Yves Missi": "伊夫·蜜西",
    "Karl-Anthony Towns": "卡尔-安东尼-唐斯",
    "OG Anunoby": "OG-阿奴诺比",
    "Jalen Brunson": "杰伦-布伦森",
    "Mikal Bridges": "米卡尔-布里奇斯",
    "Josh Hart": "约什-哈特",
    "Jose Alvarado": "约瑟-阿尔瓦拉多",
    "Miles McBride": "迈尔斯-麦克布莱德",
    "Pacome Dadiet": "帕科姆·达迪耶",
    "Tyler Kolek": "泰勒·科勒克",
    "Jalen Williams": "杰伦-威廉姆斯",
    "Chet Holmgren": "切特-霍姆格伦",
    "Isaiah Hartenstein": "以赛亚-哈尔滕施泰因",
    "Alex Caruso": "亚历克斯-卡鲁索",
    "Luguentz Dort": "吕冈茨-多尔特",
    "Isaiah Joe": "以赛亚-乔",
    "Aaron Wiggins": "阿龙-威金斯",
    "Jaylin Williams": "杰林-威廉姆斯",
    "Cason Wallace": "卡森·华莱士",
    "Kenrich Williams": "肯里奇-威廉姆斯",
    "Franz Wagner": "弗朗茨-瓦格纳",
    "Paolo Banchero": "保罗-班切罗",
    "Desmond Bane": "德斯蒙德-贝恩",
    "Jalen Suggs": "杰伦-萨格斯",
    "Wendell Carter Jr.": "温德尔-卡特",
    "Jonathan Isaac": "乔纳森-艾萨克",
    "Anthony Black": "安东尼·布莱克",
    "Goga Bitadze": "戈加-比塔泽",
    "Jett Howard": "杰特·霍华德",
    "Tristan da Silva": "特里斯坦-达·席尔瓦",
    "Joel Embiid": "乔尔-恩比德",
    "Paul George": "保罗-乔治",
    "Tyrese Maxey": "泰雷斯-马克西",
    "VJ Edgecombe": "VJ-埃奇库姆",
    "Dominick Barlow": "多米尼克-巴洛",
    "Trendon Watford": "特伦登-沃特福特",
    "Jabari Walker": "贾巴里-沃克",
    "Dalen Terry": "达伦-特里",
    "Justin Edwards": "贾斯汀·爱德华兹",
    "Adem Bona": "阿德姆·博纳",
    "Jalen Green": "杰伦-格林",
    "Dillon Brooks": "狄龙-布鲁克斯",
    "Grayson Allen": "格雷森-阿伦",
    "Royce O'Neale": "罗伊斯-奥尼尔",
    "Khaman Maluach": "卡曼-马卢阿奇",
    "Haywood Highsmith": "海伍德-海史密斯",
    "Ryan Dunn": "瑞安·邓恩",
    "Jamaree Bouyea": "贾马雷-布耶",
    "Oso Ighodaro": "奥索·伊戈达罗",
    "Rasheer Fleming": "拉希尔・弗莱明",
    "Jrue Holiday": "朱-霍勒迪",
    "Jerami Grant": "杰拉米-格兰特",
    "Shaedon Sharpe": "谢登-夏普",
    "Toumani Camara": "图马尼-卡马拉",
    "Scoot Henderson": "斯库特·亨德森",
    "Damian Lillard": "达米安-利拉德",
    "Deni Avdija": "德尼-阿夫迪亚",
    "Donovan Clingan": "多诺万·克林根",
    "Kris Murray": "克里斯·默里",
    "Yang Hansen": "杨瀚森",
    "Zach LaVine": "扎克-拉文",
    "Domantas Sabonis": "多曼塔斯-萨博尼斯",
    "DeMar DeRozan": "德马尔-德罗赞",
    "De'Andre Hunter": "德安德烈-亨特",
    "Keegan Murray": "基根-穆雷",
    "Malik Monk": "马利克-蒙克",
    "Devin Carter": "德文·卡特",
    "Nique Clifford": "尼克-克利福德",
    "Killian Hayes": "基利安-海斯",
    "Maxime Raynaud": "马克西姆-雷诺",
    "De'Aaron Fox": "达龙-福克斯",
    "Devin Vassell": "德文-瓦塞尔",
    "Keldon Johnson": "凯尔登-约翰逊",
    "Victor Wembanyama": "维克托·文班亚马",
    "Dylan Harper": "迪伦-哈珀",
    "Luke Kornet": "卢克-科内特",
    "Stephon Castle": "斯蒂芬·卡斯尔",
    "Carter Bryant": "卡特-布莱恩特",
    "Julian Champagnie": "朱利安-尚彭尼",
    "Scottie Barnes": "斯科蒂-巴恩斯",
    "Brandon Ingram": "布兰登-英格拉姆",
    "Immanuel Quickley": "伊曼纽尔-奎克利",
    "RJ Barrett": "RJ-巴雷特",
    "Gradey Dick": "格雷迪·迪克",
    "Colin Murray-Boyles": "科林-默里-博伊尔斯",
    "Ja'Kobe Walter": "贾科比·沃尔特",
    "Sandro Mamukelashvili": "桑德罗-马穆凯拉什维利",
    "Trayce Jackson-Davis": "特雷斯·杰克逊-戴维斯",
    "Jamal Shead": "贾马尔·谢德",
    "Jaren Jackson Jr.": "小贾伦-杰克逊",
    "Lauri Markkanen": "劳里-马尔卡宁",
    "Ace Bailey": "埃斯-贝利",
    "Keyonte George": "基扬特·乔治",
    "John Konchar": "约翰-康查尔",
    "Cody Williams": "科迪·威廉姆斯",
    "Brice Sensabaugh": "布赖斯·森萨博",
    "Svi Mykhailiuk": "斯维亚托斯拉夫-米哈伊柳克",
    "Kyle Filipowski": "凯尔·菲利波夫斯基",
    "Isaiah Collier": "以赛亚·科利尔",
    "Anthony Davis": "安东尼-戴维斯",
    "Trae Young": "特雷-杨",
    "Alex Sarr": "亚历克斯·萨尔",
    "Bilal Coulibaly": "比拉尔·库利巴利",
    "Tre Johnson": "特雷-约翰逊",
    "Jaden Hardy": "杰登-哈迪",
    "D'Angelo Russell": "丹吉洛-拉塞尔",
    "Cam Whitmore": "卡姆·惠特莫尔",
    "Bub Carrington": "卡尔顿·卡林顿",
    "Will Riley": "威尔-莱利",
    # 额外补充
    "CJ McCollum": "CJ-麦科勒姆",
    "Keaton Wallace": "基顿-华莱士",
    "Jock Landale": "乔克-兰代尔",
    "Gabe Vincent": "加布-文森特",
    "Vit Krejci": "维特-克雷伊奇",
    "Luke Kennard": "卢克-肯纳德",
    "Christian Koloko": "克里斯蒂安-科洛科",
    "Tony Bradley": "托尼-布拉德利",
    "RayJ Dennis": "雷伊-丹尼斯",
    "Keshon Gilbert": "凯尚-吉尔伯特",
    "Caleb Houstan": "凯莱布-休斯坦",
    "N'Faly Dante": "恩法利-丹特",
    "Jacob Toppin": "雅各布-托平",
    "Tari Eason": "塔里-伊森",
    "Josh Okogie": "约什-奥科吉",
    "Aaron Holiday": "阿隆-霍勒迪",
    "Jae'Sean Tate": "杰肖恩-泰特",
    "Jeff Green": "杰夫-格林",
    "Isaiah Crawford": "以赛亚-克劳福德",
    "Tristen Newton": "特里斯坦-牛顿",
    "Spencer Jones": "斯宾塞-琼斯",
    "Peyton Watson": "佩顿-沃森",
    "Tyus Jones": "泰厄斯-琼斯",
    "Curtis Jones": "柯蒂斯-琼斯",
    "David Roddy": "大卫-罗迪",
    "KJ Simpson": "KJ-辛普森",
    "Hunter Tyson": "亨特-泰森",
    "Bruce Brown": "布鲁斯-布朗",
    "Tim Hardaway Jr.": "小蒂姆-哈达威",
    "Mason Plumlee": "梅森-普拉姆利",
    "Emanuel Miller": "伊曼纽尔-米勒",
    "Harrison Ingram": "哈里森-英格拉姆",
    "David Jones Garcia": "大卫-琼斯-加西亚",
    "Jordan McLaughlin": "乔丹-麦克劳林",
    "Bismack Biyombo": "俾斯麦-比永博",
    "Kelly Olynyk": "凯利-奥利尼克",
    "Lindy Waters III": "林迪-沃特斯三世",
    "Jeremy Sochan": "杰里米-索汉",
    "Riley Minix": "莱利-米尼克斯",
    "Stanley Umude": "斯坦利-乌穆德",
    "Harrison Barnes": "哈里森-巴恩斯",
    "Shai Gilgeous-Alexander": "谢伊-吉尔杰斯-亚历山大",
    "Ajay Mitchell": "阿贾伊-米切尔",
    "Jared McCain": "贾里德-麦凯恩",
    "Nikola Topic": "尼古拉-托皮奇",
    "Branden Carlson": "布兰登-卡尔森",
    "Ousmane Dieng": "奥斯曼-迪昂",
    "Brooks Barnhizer": "布鲁克斯-巴恩希泽",
    "Payton Sandfort": "佩顿-桑德福特",
    "Chris Youngblood": "克里斯-杨布拉德",
    "Buddy Boeheim": "巴迪-伯海姆",
    "Thomas Sorber": "托马斯-索伯",
    "John Collins": "约翰-科林斯",
    "Kobe Sanders": "科比-桑德斯",
    "Jordan Miller": "乔丹-米勒",
    "Cam Christie": "卡姆-克里斯蒂",
    "Bennedict Mathurin": "本内迪克特-马图林",
    "TyTy Washington Jr.": "小泰泰-华盛顿",
    "Sean Pedulla": "肖恩-佩杜拉",
    "Norchad Omier": "诺查德-奥米尔",
    "Chris Paul": "克里斯-保罗",
    "Patrick Baldwin Jr.": "帕特里克-鲍德温",
    "Jahmyl Telfort": "贾迈尔-特尔福特",
    "SGA": "谢伊-吉尔杰斯-亚历山大",
}


def fetch_url(url, retries=3):
    """获取URL内容，带重试"""
    for i in range(retries):
        try:
            r = requests.get(url, headers=HEADERS, timeout=30)
            if r.status_code == 200:
                return r.text
            elif r.status_code == 429:
                wait = min(30, 5 * (i + 1))
                print(f"  [429] Too many requests, waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"  [HTTP {r.status_code}] Skipping...")
                return None
        except Exception as e:
            print(f"  [Error] {e}, retry {i+1}/{retries}")
            time.sleep(5)
    return None


def parse_roster(soup):
    """解析Roster表格，返回球员列表"""
    players = []
    
    # 查找roster table
    roster_table = soup.find('table', id='roster')
    if not roster_table:
        # 尝试找所有table
        for tbl in soup.find_all('table'):
            caption = tbl.find('caption')
            if caption and 'Roster' in caption.get_text():
                roster_table = tbl
                break
    
    if not roster_table:
        print("  ! 未找到Roster表格")
        return players
    
    rows = roster_table.find_all('tr')
    for row in rows[1:]:  # 跳过表头
        cols = row.find_all('td')
        if len(cols) < 5:
            continue
        
        # 球员名
        name_cell = cols[0]
        name_link = name_cell.find('a')
        if name_link:
            name_en = name_link.get_text().strip()
        else:
            name_en = name_cell.get_text().strip()
        
        # 位置
        pos = cols[1].get_text().strip() if len(cols) > 1 else ''
        
        # 身高
        ht_str = cols[2].get_text().strip() if len(cols) > 2 else ''
        ht_inches = 0
        if ht_str:
            match = re.match(r'(\d+)-(\d+)', ht_str)
            if match:
                ht_inches = int(match.group(1)) * 12 + int(match.group(2))
        
        # 体重
        wt_str = cols[3].get_text().strip() if len(cols) > 3 else ''
        wt = 0
        if wt_str:
            try:
                wt = int(wt_str)
            except:
                pass
        
        # 经验
        exp = cols[6].get_text().strip() if len(cols) > 6 else ''
        if exp == 'R':
            exp = 'R'
        elif exp:
            pass
        
        if name_en and 'TW' not in name_en:
            players.append({
                'name_en': name_en,
                'pos': pos,
                'ht': ht_inches,
                'wt': wt,
                'exp': exp,
            })
    
    return players


def parse_stats(soup):
    """解析Per Game统计数据，返回{球员名: stats_dict}"""
    stats_map = {}
    
    # 查找 per_game stats table
    for tbl_id in ['per_game_stats', 'stats']:
        stats_table = soup.find('table', id=tbl_id)
        if stats_table:
            break
    
    if not stats_table:
        # 尝试按caption查找
        for tbl in soup.find_all('table'):
            caption = tbl.find('caption')
            if caption and 'Per Game' in caption.get_text():
                stats_table = tbl
                break
    
    if not stats_table:
        print("  ! 未找到Per Game统计表")
        return stats_map
    
    rows = stats_table.find_all('tr')
    for row in rows[1:]:
        cols = row.find_all('td')
        if len(cols) < 10:
            continue
        
        # 球员名
        name_cell = cols[0]
        name_link = name_cell.find('a')
        if name_link:
            name = name_link.get_text().strip()
        else:
            continue
        
        # 提取关键数据
        try:
            g = int(cols[2].get_text().strip() if len(cols) > 2 else 0)
            gs = int(cols[3].get_text().strip() if len(cols) > 3 else 0)
            mp = float(cols[4].get_text().strip() if len(cols) > 4 else 0)
            pts = float(cols[29].get_text().strip() if len(cols) > 29 else 0)
            ast = float(cols[23].get_text().strip() if len(cols) > 23 else 0)
            trb = float(cols[22].get_text().strip() if len(cols) > 22 else 0)
            stl = float(cols[24].get_text().strip() if len(cols) > 24 else 0)
            blk = float(cols[25].get_text().strip() if len(cols) > 25 else 0)
            tov = float(cols[26].get_text().strip() if len(cols) > 26 else 0)
            pf = float(cols[27].get_text().strip() if len(cols) > 27 else 0)
            
            fg = float(cols[5].get_text().strip() if len(cols) > 5 else 0)
            fga = float(cols[6].get_text().strip() if len(cols) > 6 else 0)
            fg_pct = float(cols[7].get_text().strip() if len(cols) > 7 else 0)
            
            fg3 = float(cols[8].get_text().strip() if len(cols) > 8 else 0)
            fg3a = float(cols[9].get_text().strip() if len(cols) > 9 else 0)
            fg3_pct = float(cols[10].get_text().strip() if len(cols) > 10 else 0)
            
            ft = float(cols[11].get_text().strip() if len(cols) > 11 else 0)
            fta = float(cols[12].get_text().strip() if len(cols) > 12 else 0)
            ft_pct = float(cols[13].get_text().strip() if len(cols) > 13 else 0)
            
            orb = float(cols[20].get_text().strip() if len(cols) > 20 else 0)
            drb = float(cols[21].get_text().strip() if len(cols) > 21 else 0)
            
            stats_map[name] = {
                'g': g, 'gs': gs, 'mp': mp,
                'pts': pts, 'ast': ast, 'trb': trb,
                'stl': stl, 'blk': blk, 'tov': tov, 'pf': pf,
                'fg': fg, 'fga': fga, 'fg_pct': fg_pct,
                'fg3': fg3, 'fg3a': fg3a, 'fg3_pct': fg3_pct,
                'ft': ft, 'fta': fta, 'ft_pct': ft_pct,
                'orb': orb, 'drb': drb,
            }
        except (ValueError, IndexError):
            continue
    
    return stats_map


def parse_salaries(soup):
    """解析Salaries表格，返回{球员名: 薪资}"""
    salary_map = {}
    
    # 查找 salaries table
    salaries_table = None
    for tbl in soup.find_all('table'):
        caption = tbl.find('caption')
        if caption and 'Salaries' in caption.get_text():
            salaries_table = tbl
            break
    
    if not salaries_table:
        for tbl_id in ['salaries2', 'team_salaries']:
            salaries_table = soup.find('table', id=tbl_id)
            if salaries_table:
                break
    
    if not salaries_table:
        print("  ! 未找到薪资表")
        return salary_map
    
    rows = salaries_table.find_all('tr')
    for row in rows[1:]:
        cols = row.find_all('td')
        if len(cols) < 2:
            continue
        
        name_cell = cols[0]
        name_link = name_cell.find('a')
        name = name_link.get_text().strip() if name_link else ''
        
        salary_str = cols[1].get_text().strip() if len(cols) > 1 else ''
        salary = 0
        if salary_str:
            salary_str = salary_str.replace('$', '').replace(',', '')
            try:
                salary = int(float(salary_str))
            except:
                pass
        
        if name:
            salary_map[name] = salary
    
    return salary_map


def get_chinese_name(name_en):
    """获取中文名"""
    if name_en in NAME_CN_MAP:
        return NAME_CN_MAP[name_en]
    return name_en  # 没有中文名就返回英文名


def calc_per(stats):
    """根据数据估算PER值"""
    if not stats:
        return 10.0
    try:
        pts = stats.get('pts', 0)
        reb = stats.get('trb', 0)
        ast = stats.get('ast', 0)
        stl = stats.get('stl', 0)
        blk = stats.get('blk', 0)
        tov = stats.get('tov', 0)
        fg_pct = stats.get('fg_pct', 0)
        mp = stats.get('mp', 0)
        
        # 简化PER估算
        per = pts + 0.7 * reb + 0.5 * ast + 1.5 * stl + 1.5 * blk - 0.8 * tov - 0.5 * (1 - fg_pct) * 10
        per = per / (mp / 36) if mp > 0 else 0
        per = max(5.0, min(30.0, per))
        return round(per, 1)
    except:
        return 10.0


def format_stats(stats):
    """将统计数据格式化为JS对象"""
    if not stats:
        return None
    return {
        'g': stats.get('g', 0),
        'gs': stats.get('gs', 0),
        'mp': stats.get('mp', 0),
        'pts': stats.get('pts', 0),
        'ast': stats.get('ast', 0),
        'trb': stats.get('trb', 0),
        'stl': stats.get('stl', 0),
        'blk': stats.get('blk', 0),
        'tov': stats.get('tov', 0),
        'pf': stats.get('pf', 0),
        'fg_pct': stats.get('fg_pct', 0),
        'fg3_pct': stats.get('fg3_pct', 0),
        'ft_pct': stats.get('ft_pct', 0),
        'orb': stats.get('orb', 0),
        'drb': stats.get('drb', 0),
        'fg': stats.get('fg', 0),
        'fga': stats.get('fga', 0),
        'fg3': stats.get('fg3', 0),
        'fg3a': stats.get('fg3a', 0),
        'ft': stats.get('ft', 0),
        'fta': stats.get('fta', 0),
    }


def stats_to_js(stats):
    """将stats dict转为JS代码字符串"""
    if not stats:
        return ''
    parts = []
    for key in ['g','gs','mp','pts','ast','trb','stl','blk','tov','pf','fg_pct','fg3_pct','ft_pct','orb','drb','fg','fga','fg3','fg3a','ft','fta']:
        val = stats.get(key, 0)
        parts.append(f"{key}:{val}")
    return '{' + ','.join(parts) + '}'


def process_team(bbrid):
    """处理单个球队，返回球员数据列表"""
    team_id = TEAM_MAP.get(bbrid, bbrid.lower())
    url = f'https://www.basketball-reference.com/teams/{bbrid}/2026.html'
    
    print(f"\n{'='*60}")
    print(f"📋 {TEAM_CN.get(team_id, team_id)} ({team_id}) - {url}")
    print(f"{'='*60}")
    
    html = fetch_url(url)
    if not html:
        print(f"  ❌ 无法获取数据")
        return []
    
    soup = BeautifulSoup(html, 'lxml')
    
    roster = parse_roster(soup)
    stats_map = parse_stats(soup)
    salary_map = parse_salaries(soup)
    
    print(f"  📊 阵容: {len(roster)}人, 有统计: {len(stats_map)}人, 有薪资: {len(salary_map)}人")
    
    # 合并数据
    results = []
    for player in roster:
        name_en = player['name_en']
        chinese_name = get_chinese_name(name_en)
        
        # 获取统计数据
        stats = stats_map.get(name_en, {})
        
        # 获取薪资
        salary = salary_map.get(name_en, 0)
        if salary == 0:
            salary = 2000000  # 默认底薪
        
        # 计算PER
        per = calc_per(stats)
        
        # 位置
        pos = player.get('pos', 'G')
        if pos in POS_MAP:
            pos = POS_MAP[pos]
        
        # 经验年数
        exp = player.get('exp', 'R')
        years_remaining = 1
        if salary > 10000000:
            years_remaining = 2
        if salary > 25000000:
            years_remaining = 3
        
        # 构建数据条目
        clean_name = name_en.lower()
        for ch in [' ', '.', "'", '-']:
            clean_name = clean_name.replace(ch, '')
        entry = {
            'id': f"{team_id}-{clean_name[:10]}-{len(results)+1}",
            'name_cn': chinese_name,
            'name_en': name_en,
            'salary': salary,
            'per': per,
            'years_remaining': years_remaining,
            'pos': pos,
            'ht': player.get('ht', 78),
            'wt': player.get('wt', 210),
            'exp': exp,
            'stats': format_stats(stats),
        }
        results.append(entry)
    
    return results


def generate_js_output(all_results):
    """生成JS代码"""
    lines = []
    lines.append('// ====================================================')
    lines.append('// 自动生成的补充球员数据')
    lines.append(f'// 来源: Basketball-Reference.com 2025-26赛季')
    lines.append(f'// 生成日期: 2026-06-08')
    lines.append('// ====================================================')
    lines.append('')
    
    for team_id, players in all_results.items():
        if not players:
            continue
        
        cn_name = TEAM_CN.get(team_id, team_id)
        lines.append(f'// --- {cn_name} ({team_id}) - {len(players)}人 ---')
        
        for p in players:
            stats_str = stats_to_js(p['stats'])
            id_str = p['id']
            
            if stats_str:
                line = f"{{ id:'{id_str}', name:'{p['name_cn']}', salary:{p['salary']}, per:{p['per']}, yearsRemaining:{p['years_remaining']}, pos:'{p['pos']}', ht:{p['ht']}, wt:{p['wt']}, exp:'{p['exp']}', stats:{stats_str} }},"
            else:
                line = f"{{ id:'{id_str}', name:'{p['name_cn']}', salary:{p['salary']}, per:{p['per']}, yearsRemaining:{p['years_remaining']}, pos:'{p['pos']}, ht:{p['ht']}, wt:{p['wt']}, exp:'{p['exp']}' }},"
            
            lines.append(f'      {line}')
        
        lines.append('')
    
    return '\n'.join(lines)


def main():
    # BBR球队缩写
    bbr_teams = ['ATL', 'BOS', 'BRK', 'CHI', 'CHO', 'CLE', 'DAL', 'DEN', 'DET', 'GSW',
                 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK',
                 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS']
    
    all_results = {}
    
    for i, bbrid in enumerate(bbr_teams):
        team_id = TEAM_MAP.get(bbrid, bbrid.lower())
        print(f"\n[{i+1}/30] 处理 {TEAM_CN.get(team_id, team_id)} ({bbrid})...")
        
        players = process_team(bbrid)
        all_results[team_id] = players
        
        # 暂停一下，避免被限流
        if i < len(bbr_teams) - 1:
            time.sleep(2)
    
    # 统计
    total_players = sum(len(plist) for plist in all_results.values())
    print(f"\n{'='*60}")
    print(f"✅ 完成! 共 {total_players} 名球员数据")
    print(f"{'='*60}")
    
    for team_id, players in all_results.items():
        cn = TEAM_CN.get(team_id, team_id)
        print(f"  {cn} ({team_id}): {len(players)}人")
    
    # 输出JS
    output = generate_js_output(all_results)
    output_path = 'c:\\Users\\chenqi\\Desktop\\tod\\bbr_output.txt'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"\n📝 输出已保存到: {output_path}")
    
    # 也输出汇总CSV
    csv_path = 'c:\\Users\\chenqi\\Desktop\\tod\\bbr_summary.csv'
    with open(csv_path, 'w', encoding='utf-8') as f:
        f.write("team,team_cn,player_name,salary,per,pos\n")
        for team_id, players in all_results.items():
            cn = TEAM_CN.get(team_id, team_id)
            for p in players:
                f.write(f"{team_id},{cn},{p['name_cn']},{p['salary']},{p['per']},{p['pos']}\n")
    
    print(f"📊 汇总CSV已保存到: {csv_path}")


if __name__ == '__main__':
    main()
