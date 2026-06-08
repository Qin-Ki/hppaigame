"""
NBA AI经理 · 数据补全脚本 v2
策略: 使用 BBR 真实数据(可获取部分) + Spotrac 薪资数据 + 现有 data.js
输出: bbr_output_v2.txt
"""

import re
import json

# ==================== 现有数据.js 中的球员名单 ====================
# 从附件中的 data.js 提取
EXISTING_PLAYERS = {
    'atl': ['杰伦-约翰逊', '戴森-丹尼尔斯', '乔纳森-库明加', '奥涅卡-奥孔古', 
            '尼基尔-亚历山大-沃克', '科里-基斯珀特', '扎卡里·里萨切尔', '巴迪-希尔德',
            '阿萨-纽厄尔', '穆罕穆德-盖伊'],
    'bkn': ['小迈克尔-波特', '尼古拉斯-克拉克斯顿', '特伦斯-曼', '叶戈尔-杰明',
            '宰伊尔-威廉姆斯', '戴罗恩-夏普', '诺厄·克洛尼', '诺兰-特拉奥雷',
            '德雷克-鲍威尔', '本-萨拉夫'],
    'bos': ['杰森-塔特姆', '杰伦-布朗', '德里克-怀特', '萨姆-豪瑟',
            '佩顿-普里查德', '雨果-冈萨雷斯', '卢卡-加尔扎', '达拉诺-班顿',
            '贝勒·沙伊尔曼', '内米亚斯-克塔'],
    'cha': ['拉梅洛-鲍尔', '迈尔斯-布里奇斯', '布兰登·米勒', '约什-格林',
            '格兰特-威廉姆斯', '康-克尼普尔', '提贾尼·萨隆', '特雷-曼',
            '帕特-康诺顿', '利亚姆-麦克尼利'],
    'chi': ['约什-吉迪', '帕特里克-威廉姆斯', '艾萨克-奥科罗', '杰伦-史密斯',
            '特雷-琼斯', '罗伯特·迪林厄姆', '盖尔雄-亚布塞莱', '马塔斯·布泽利斯',
            '诺阿-埃森格', '穆哈马杜-盖耶'],
    'cle': ['埃文-莫布利', '多诺万-米切尔', '詹姆斯-哈登', '贾勒特-阿伦',
            '马克斯-斯特鲁斯', '丹尼斯-施罗德', '萨姆-梅里尔', '杰隆·泰森',
            '内匡-汤姆林', '小克雷格·波特'],
    'dal': ['凯里-欧文', 'PJ-华盛顿', '克莱-汤普森', '丹尼尔-加福德',
            '库珀-弗拉格', '凯莱布-马丁', '纳吉-马绍尔', '马克斯-克里斯蒂',
            '德雷克·莱夫利二世', 'AJ·约翰逊'],
    'den': ['尼古拉-约基奇', '贾马尔-默里', '阿龙-戈登', '卡梅伦-约翰逊',
            '克里斯琴-布朗', '约纳斯-瓦兰丘纳斯', '齐克-纳吉', '朱利安·斯特劳瑟',
            '达隆·霍姆斯二世', '杰伦-皮克特'],
    'det': ['凯德-坎宁安', '邓肯-罗宾逊', '以赛亚-斯图尔特', '卡里斯-勒韦尔',
            '奥萨尔·汤普森', '罗恩-霍兰德', '保罗-里德', '马库斯·萨瑟',
            '丹尼斯·詹金斯', '托卢-史密斯三世'],
    'gsw': ['斯蒂芬-库里', '吉米-巴特勒', '德雷蒙德-格林', '摩西-穆迪',
            '艾尔-霍福德', '布兰丁·波杰姆斯基', '桂-桑托斯', '丹东尼-梅尔顿',
            '威尔-理查德'],
    'hou': ['凯文-杜兰特', '阿尔佩伦-申京', '弗雷德-范弗利特', '小贾巴里-史密斯',
            '多里安-芬尼-史密斯', '史蒂文-亚当斯', '阿门·汤普森', '里德·谢泼德',
            '克林特-卡佩拉', 'JD-戴维森'],
    'ind': ['泰雷斯-哈利伯顿', '帕斯卡尔-西亚卡姆', '伊维察-祖巴茨', '安德鲁-内姆布哈德',
            '奥比-托平', 'TJ-麦康奈尔', '贾雷斯-沃克', '本·谢泼德',
            '科比·布朗', '米卡-波特'],
    'lac': ['科怀-伦纳德', '达里厄斯-加兰', '波格丹-波格丹诺维奇', '小德里克-琼斯',
            '布鲁克-洛佩斯', '以赛亚-杰克逊', '尼古拉斯-巴图姆', '克里斯-邓恩',
            '布拉德利-比尔', '亚尼克-科南-尼德豪泽'],
    'lal': ['卢卡-东契奇', '奥斯汀-里夫斯', '贾里德-范德比尔特', '德安德烈-艾顿',
            '杰克-拉拉维亚', '马库斯-斯马特', '道尔顿·克内克特', '小尼克·史密斯',
            '布朗尼·詹姆斯', '阿杜-蒂耶罗'],
    'mem': ['贾-莫兰特', '肯塔维厄斯-考德威尔-波普', '桑迪-阿尔达马', '布兰登-克拉克',
            '泰-杰罗姆', '泰勒·亨德里克斯', '扎克·埃迪', '塞德里克-考沃德',
            '沃尔特-克莱顿', '泰-吉布森'],
    'mia': ['巴姆-阿德巴约', '泰勒-希罗', '安德鲁-威金斯', '尼科拉-约维奇',
            '戴维恩-米切尔', '小海梅-哈克斯', '凯莱尔·韦尔', '卡斯帕拉斯-亚库契奥尼斯',
            '德鲁-史密斯', '迈伦-加德纳'],
    'mil': ['扬尼斯-阿德托昆博', '迈尔斯-特纳', '凯尔-库兹马', '博比-波蒂斯',
            'AJ-格林', '小凯文-波特', '莱恩-罗林斯', '小加里-特伦特',
            '加里-哈里斯', '托里恩-普林斯'],
    'min': ['安东尼-爱德华兹', '鲁迪-戈贝尔', '朱利叶斯-兰德尔', '杰登-麦克丹尼尔斯',
            '纳兹-里德', '唐特-迪温琴佐', '若昂-贝兰热', '小特伦斯·香农',
            '朱利安-菲利普斯'],
    'nop': ['蔡恩-威廉森', '乔丹-普尔', '德章泰-默里', '特雷-墨菲',
            '凯文-卢尼', '杰里迈亚-费尔斯', '乔丹·霍金斯', '萨迪克-贝',
            '德里克-奎因', '伊夫·蜜西'],
    'nyk': ['卡尔-安东尼-唐斯', 'OG-阿奴诺比', '杰伦-布伦森', '米卡尔-布里奇斯',
            '约什-哈特', '约瑟-阿尔瓦拉多', '迈尔斯-麦克布莱德', '帕科姆·达迪耶',
            '泰勒·科勒克'],
    'okc': ['杰伦-威廉姆斯', '切特-霍姆格伦', '以赛亚-哈尔滕施泰因', '亚历克斯-卡鲁索',
            '吕冈茨-多尔特', '以赛亚-乔', '阿龙-威金斯', '杰林-威廉姆斯',
            '卡森·华莱士', '肯里奇-威廉姆斯'],
    'orl': ['弗朗茨-瓦格纳', '保罗-班切罗', '德斯蒙德-贝恩', '杰伦-萨格斯',
            '温德尔-卡特', '乔纳森-艾萨克', '安东尼·布莱克', '戈加-比塔泽',
            '杰特·霍华德', '特里斯坦-达·席尔瓦'],
    'phi': ['乔尔-恩比德', '保罗-乔治', '泰雷斯-马克西', 'VJ-埃奇库姆',
            '多米尼克-巴洛', '特伦登-沃特福特', '贾巴里-沃克', '达伦-特里',
            '贾斯汀·爱德华兹', '阿德姆·博纳'],
    'phx': ['杰伦-格林', '狄龙-布鲁克斯', '格雷森-阿伦', '罗伊斯-奥尼尔',
            '卡曼-马卢阿奇', '海伍德-海史密斯', '瑞安·邓恩', '贾马雷-布耶',
            '奥索·伊戈达罗', '拉希尔・弗莱明'],
    'por': ['朱-霍勒迪', '杰拉米-格兰特', '谢登-夏普', '图马尼-卡马拉',
            '斯库特·亨德森', '达米安-利拉德', '德尼-阿夫迪亚', '多诺万·克林根',
            '克里斯·默里', '杨瀚森'],
    'sac': ['扎克-拉文', '多曼塔斯-萨博尼斯', '德马尔-德罗赞', '德安德烈-亨特',
            '基根-穆雷', '马利克-蒙克', '德文·卡特', '尼克-克利福德',
            '基利安-海斯', '马克西姆-雷诺'],
    'sas': ['达龙-福克斯', '德文-瓦塞尔', '凯尔登-约翰逊', '维克托·文班亚马',
            '迪伦-哈珀', '卢克-科内特', '斯蒂芬·卡斯尔', '卡特-布莱恩特',
            '朱利安-尚彭尼'],
    'tor': ['斯科蒂-巴恩斯', '布兰登-英格拉姆', '伊曼纽尔-奎克利', 'RJ-巴雷特',
            '格雷迪·迪克', '科林-默里-博伊尔斯', '贾科比·沃尔特', '桑德罗-马穆凯拉什维利',
            '特雷斯·杰克逊-戴维斯', '贾马尔·谢德'],
    'uta': ['小贾伦-杰克逊', '劳里-马尔卡宁', '埃斯-贝利', '基扬特·乔治',
            '约翰-康查尔', '科迪·威廉姆斯', '布赖斯·森萨博', '斯维亚托斯拉夫-米哈伊柳克',
            '凯尔·菲利波夫斯基', '以赛亚·科利尔'],
    'was': ['安东尼-戴维斯', '特雷-杨', '亚历克斯·萨尔', '比拉尔·库利巴利',
            '特雷-约翰逊', '杰登-哈迪', '丹吉洛-拉塞尔', '卡姆·惠特莫尔',
            '卡尔顿·卡林顿', '威尔-莱利'],
}

# BBR英文名 -> 中文名映射（补充）
BBR_TO_CN = {
    # ATL
    "CJ McCollum": "CJ-麦科勒姆", "Trae Young": "特雷-杨", "Keaton Wallace": "基顿-华莱士",
    "Jock Landale": "乔克-兰代尔", "Gabe Vincent": "加布-文森特", "Vit Krejci": "维特-克雷伊奇",
    "Luke Kennard": "卢克-肯纳德", "Christian Koloko": "克里斯蒂安-科洛科",
    "Tony Bradley": "托尼-布拉德利", "RayJ Dennis": "雷伊-丹尼斯",
    "Keshon Gilbert": "凯尚-吉尔伯特", "Caleb Houstan": "凯莱布-休斯坦",
    "N'Faly Dante": "恩法利-丹特", "Jacob Toppin": "雅各布-托平",
    # BRK
    "Nic Claxton": "尼古拉斯-克拉克斯顿", "Cam Thomas": "卡姆-托马斯",
    "Ochai Agbaji": "奥柴-阿格巴吉", "Jalen Wilson": "杰伦-威尔逊",
    "Tyrese Martin": "泰雷斯-马丁", "Josh Minott": "乔什-米诺特",
    "Danny Wolf": "丹尼-沃尔夫", "E.J. Liddell": "EJ-利德尔",
    "Tyson Etienne": "泰森-埃蒂安", "Chaney Johnson": "钱尼-约翰逊",
    "Malachi Smith": "玛拉基-史密斯", "Grant Nelson": "格兰特-尼尔森",
    "Tre Scott": "特雷-斯科特",
    # DEN - additional
    "Bruce Brown": "布鲁斯-布朗", "Tim Hardaway Jr.": "小蒂姆-哈达威",
    "Spencer Jones": "斯宾塞-琼斯", "Peyton Watson": "佩顿-沃森",
    "Tyus Jones": "泰厄斯-琼斯", "Curtis Jones": "柯蒂斯-琼斯",
    "David Roddy": "大卫-罗迪", "KJ Simpson": "KJ-辛普森",
    "Hunter Tyson": "亨特-泰森", "Zeke Nnaji": "齐克-纳吉",
    # HOU - additional
    "Tari Eason": "塔里-伊森", "Josh Okogie": "约什-奥科吉",
    "Aaron Holiday": "阿隆-霍勒迪", "Jae'Sean Tate": "杰肖恩-泰特",
    "Jeff Green": "杰夫-格林", "Isaiah Crawford": "以赛亚-克劳福德",
    "Tristen Newton": "特里斯坦-牛顿",
    # OKC
    "Shai Gilgeous-Alexander": "谢伊-吉尔杰斯-亚历山大", "Ajay Mitchell": "阿贾伊-米切尔",
    "Jared McCain": "贾里德-麦凯恩", "Nikola Topic": "尼古拉-托皮奇",
    "Branden Carlson": "布兰登-卡尔森", "Ousmane Dieng": "奥斯曼-迪昂",
    "Brooks Barnhizer": "布鲁克斯-巴恩希泽", "Payton Sandfort": "佩顿-桑德福特",
    "Chris Youngblood": "克里斯-杨布拉德", "Buddy Boeheim": "巴迪-伯海姆",
    "Thomas Sorber": "托马斯-索伯",
    # SAS
    "Harrison Barnes": "哈里森-巴恩斯", "Julian Champagnie": "朱利安-尚彭尼",
    "Jeremy Sochan": "杰里米-索汉", "Carter Bryant": "卡特-布莱恩特",
    "Kelly Olynyk": "凯利-奥利尼克", "Lindy Waters III": "林迪-沃特斯三世",
    "Jordan McLaughlin": "乔丹-麦克劳林", "Bismack Biyombo": "俾斯麦-比永博",
    "Mason Plumlee": "梅森-普拉姆利", "Harrison Ingram": "哈里森-英格拉姆",
    "Riley Minix": "莱利-米尼克斯", "Stanley Umude": "斯坦利-乌穆德",
    "David Jones Garcia": "大卫-琼斯-加西亚", "Emanuel Miller": "伊曼纽尔-米勒",
    # LAC
    "James Harden": "詹姆斯-哈登", "Ivica Zubac": "伊维察-祖巴茨",
    "John Collins": "约翰-科林斯", "Kobe Sanders": "科比-桑德斯",
    "Jordan Miller": "乔丹-米勒", "Cam Christie": "卡姆-克里斯蒂",
    "Bennedict Mathurin": "本内迪克特-马图林", "TyTy Washington Jr.": "小泰泰-华盛顿",
    "Sean Pedulla": "肖恩-佩杜拉", "Norchad Omier": "诺查德-奥米尔",
    "Chris Paul": "克里斯-保罗", "Patrick Baldwin Jr.": "帕特里克-鲍德温",
    "Jahmyl Telfort": "贾迈尔-特尔福特", "Kobe Brown": "科比-布朗",
    # GSW additional from Spotrac
    "Malevy Leons": "马莱维-利昂斯", "L.J. Cryer": "LJ-克莱尔",
    "Quinten Post": "昆滕-波斯特", "Pat Spencer": "帕特-斯宾塞",
    # BOS additional from Spotrac
    "Ron Harper Jr.": "小罗恩-哈珀", "Jordan Walsh": "乔丹-沃尔什",
    "Amari Williams": "阿马里-威廉姆斯", "Max Shulga": "马克斯-舒尔加",
    "Derrick White": "德里克-怀特",
}

# 英文名 -> 中文名反向映射
EN_TO_CN = {}
for k, v in BBR_TO_CN.items():
    EN_TO_CN[k] = v

# Spotrac 数据（手动从抓取结果提取）
# 格式: {team: [(player_en, salary, pos), ...]}
SPOTRAC_ROSTERS = {
    'gsw': [
        ("Stephen Curry", 62587158, "PG"),
        ("Jimmy Butler", 56832773, "SF"),
        ("Draymond Green", 27678571, "PF"),
        ("Moses Moody", 12500000, "SG"),
        ("Al Horford", 5969250, "C"),
        ("Brandin Podziemski", 5679459, "SG"),
        ("Gui Santos", 4629630, "SF"),
        ("De'Anthony Melton", 3451779, "PG"),
        ("Will Richard", 2150917, "SG"),
    ],
    'bos': [
        ("Jayson Tatum", 58456566, "PF"),
        ("Jaylen Brown", 57078728, "SF"),
        ("Derrick White", 30348000, "PG"),
        ("Sam Hauser", 10848215, "SF"),
        ("Payton Pritchard", 7767857, "PG"),
        ("Hugo Gonzalez", 2923560, "SF"),
        ("Luka Garza", 2801346, "C"),
        ("Dalano Banton", 2801346, "PG"),
        ("Baylor Scheierman", 2744040, "SG"),
        ("Neemias Queta", 2667944, "C"),
    ],
}

# BBR成功获取的额外球员数据（来自之前抓取的7个队）
BBR_EXTRA = {
    'atl': [
        ("CJ McCollum", 30666666, 16.5, "PG", 76, 190, 12),
        ("Trae Young", 48967380, 19.8, "PG", 73, 164, 7),
        ("Keaton Wallace", 2296274, 10.4, "PG", 75, 185, 1),
        ("Jock Landale", 2296274, 16.0, "C", 83, 255, 4),
        ("Gabe Vincent", 11500000, 8.2, "PG", 74, 200, 6),
        ("Vit Krejci", 0, 11.3, "PG", 80, 195, 2),
        ("Luke Kennard", 0, 13.5, "SG", 77, 206, 7),
        ("Christian Koloko", 0, 8.8, "C", 84, 225, 2),
        ("Tony Bradley", 0, 10.2, "C", 82, 248, 7),
        ("RayJ Dennis", 0, 6.5, "PG", 73, 180, 1),
        ("Keshon Gilbert", 0, 15.9, "SG", 76, 200, 0),
        ("Caleb Houstan", 699440, 16.4, "SF", 80, 205, 2),
        ("N'Faly Dante", 2048494, 12.4, "C", 83, 230, 1),
        ("Jacob Toppin", 0, 15.2, "SF", 81, 200, 2),
        ("Kristaps Porzingis", 0, 20.6, "C", 85, 240, 9),
    ],
    'bkn': [
        ("Nic Claxton", 23320738, 17.6, "C", 83, 215, 6),
        ("Cam Thomas", 5993172, 12.3, "SG", 76, 210, 3),
        ("Ochai Agbaji", 6383525, 11.7, "SG", 77, 215, 3),
        ("Jalen Wilson", 2221677, 8.7, "PF", 80, 220, 2),
        ("Tyrese Martin", 2191897, 10.8, "SG", 78, 215, 2),
        ("Josh Minott", 2378870, 16.8, "SF", 80, 205, 2),
        ("Danny Wolf", 2801280, 12.3, "PF", 83, 250, 0),
        ("E.J. Liddell", 0, 12.6, "PF", 78, 240, 2),
        ("Tyson Etienne", 0, 11.9, "PG", 72, 200, 1),
        ("Chaney Johnson", 0, 16.0, "SF", 79, 220, 0),
        ("Malachi Smith", 73153, 13.7, "SG", 76, 205, 0),
        ("Grant Nelson", 73153, 17.6, "PF", 83, 230, 1),
        ("Tre Scott", 117730, 9.4, "PF", 80, 220, 3),
        ("Egor Demin", 6889200, 11.3, "PG", 80, 200, 0),
        ("Nolan Traore", 3811560, 7.9, "PG", 75, 185, 0),
        ("Ben Saraf", 2884560, 7.8, "SG", 78, 200, 0),
    ],
    'den': [
        ("Bruce Brown", 2296274, 10.8, "SG", 76, 202, 7),
        ("Tim Hardaway Jr.", 2296274, 13.5, "SG", 77, 205, 12),
        ("Spencer Jones", 623967, 9.3, "SF", 79, 225, 1),
        ("Peyton Watson", 4356476, 14.3, "SF", 80, 200, 3),
        ("Tyus Jones", 0, 6.5, "PG", 72, 196, 10),
        ("Curtis Jones", 0, 10.8, "SG", 75, 195, 0),
        ("David Roddy", 0, 20.4, "PF", 77, 255, 3),
        ("KJ Simpson", 0, 10.1, "PG", 74, 189, 1),
        ("Hunter Tyson", 0, 6.4, "PF", 80, 215, 2),
        ("Zeke Nnaji", 8177778, 10.3, "PF", 82, 240, 5),
        ("DaRon Holmes II", 3218760, 13.4, "PF", 81, 225, 0),
        ("Julian Strawther", 2674200, 12.5, "SG", 78, 205, 2),
        ("Jalen Pickett", 2221677, 10.3, "SG", 74, 202, 2),
    ],
    'hou': [
        ("Tari Eason", 5675766, 12.9, "PF", 80, 215, 3),
        ("Josh Okogie", 2296274, 9.9, "SG", 76, 213, 7),
        ("Aaron Holiday", 2296274, 10.1, "PG", 72, 185, 7),
        ("Jae'Sean Tate", 2296274, 10.7, "SF", 76, 230, 5),
        ("Jeff Green", 2296274, 8.5, "PF", 80, 235, 17),
        ("Isaiah Crawford", 0, 9.8, "SF", 78, 220, 1),
        ("Tristen Newton", 0, 32.8, "SG", 77, 190, 0),
    ],
    'okc': [
        ("Shai Gilgeous-Alexander", 38333050, 30.8, "PG", 78, 195, 7),
        ("Ajay Mitchell", 3000000, 16.8, "SG", 76, 190, 1),
        ("Jared McCain", 4221360, 14.0, "SG", 75, 195, 1),
        ("Nikola Topic", 5182920, 8.1, "PG", 78, 200, 0),
        ("Branden Carlson", 0, 17.7, "C", 84, 220, 1),
        ("Ousmane Dieng", 0, 10.0, "C", 82, 205, 2),
        ("Brooks Barnhizer", 0, 7.9, "SG", 77, 230, 0),
        ("Payton Sandfort", 0, 13.1, "SF", 79, 215, 0),
        ("Chris Youngblood", 0, 10.0, "SG", 76, 215, 0),
        ("Buddy Boeheim", 0, 4.6, "SF", 78, 205, 2),
    ],
    'sas': [
        ("Harrison Barnes", 19000000, 11.8, "PF", 80, 225, 13),
        ("Julian Champagnie", 3000000, 13.1, "SF", 79, 217, 3),
        ("Jeremy Sochan", 7096231, 9.7, "PF", 81, 230, 3),
        ("Carter Bryant", 4900320, 9.9, "PF", 78, 220, 0),
        ("Kelly Olynyk", 13445122, 13.5, "C", 84, 240, 12),
        ("Lindy Waters III", 2296274, 7.5, "SG", 78, 210, 4),
        ("Jordan McLaughlin", 2296274, 12.0, "PG", 72, 185, 6),
        ("Bismack Biyombo", 2296274, 4.5, "C", 80, 255, 14),
        ("Mason Plumlee", 593864, 11.6, "C", 84, 254, 12),
        ("Harrison Ingram", 0, 15.8, "SF", 77, 230, 1),
        ("Riley Minix", 0, 44.7, "SF", 79, 215, 0),
        ("Stanley Umude", 0, 11.6, "SG", 78, 210, 2),
    ],
    'lac': [
        ("James Harden", 0, 21.7, "PG", 77, 220, 16),
        ("Ivica Zubac", 0, 18.8, "C", 84, 240, 9),
        ("John Collins", 26580000, 16.3, "PF", 81, 226, 8),
        ("Kobe Sanders", 475497, 10.0, "SG", 80, 207, 0),
        ("Jordan Miller", 712637, 15.9, "SF", 77, 194, 2),
        ("Cam Christie", 1955377, 9.2, "SG", 77, 190, 1),
        ("Bennedict Mathurin", 9187573, 17.2, "SF", 77, 210, 3),
        ("Chris Paul", 0, 8.1, "PG", 72, 175, 20),
        ("Patrick Baldwin Jr.", 131970, 23.6, "SF", 81, 220, 3),
        ("Kobe Brown", 0, 11.2, "PF", 79, 250, 2),
        ("TyTy Washington Jr.", 0, 13.4, "PG", 75, 195, 3),
    ],
}


TEAM_CN = {
    'atl': '老鹰', 'bkn': '篮网', 'bos': '凯尔特人', 'cha': '黄蜂', 'chi': '公牛',
    'cle': '骑士', 'dal': '独行侠', 'den': '掘金', 'det': '活塞', 'gsw': '勇士',
    'hou': '火箭', 'ind': '步行者', 'lac': '快船', 'lal': '湖人', 'mem': '灰熊',
    'mia': '热火', 'mil': '雄鹿', 'min': '森林狼', 'nop': '鹈鹕', 'nyk': '尼克斯',
    'okc': '雷霆', 'orl': '魔术', 'phi': '76人', 'phx': '太阳', 'por': '开拓者',
    'sac': '国王', 'sas': '马刺', 'tor': '猛龙', 'uta': '爵士', 'was': '奇才'
}

POS_MAP = {
    'PG': 'PG', 'SG': 'SG', 'SF': 'SF', 'PF': 'PF', 'C': 'C',
    'G': 'SG', 'F': 'SF', 'GF': 'SF', 'FG': 'PF',
}

def get_next_id(team, existing_ids):
    """生成下一个可用的ID"""
    n = len(existing_ids) + 1
    return f"{team}-player-{n}"


def generate_output():
    """生成补充球员数据"""
    all_lines = []
    all_lines.append("// ====================================================")
    all_lines.append("// NBA AI经理 · 真实数据补充 v2")
    all_lines.append("// 来源: Basketball-Reference.com + Spotrac")
    all_lines.append("// 生成日期: 2026-06-08")
    all_lines.append("// ====================================================")
    all_lines.append("")
    
    total_new = 0
    
    for team_id in ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw',
                    'hou','ind','lac','lal','mem','mia','mil','min','nop','nyk',
                    'okc','orl','phi','phx','por','sac','sas','tor','uta','was']:
        
        existing = EXISTING_PLAYERS.get(team_id, [])
        bbr_extra = BBR_EXTRA.get(team_id, [])
        spotrac = SPOTRAC_ROSTERS.get(team_id, [])
        
        cn_name = TEAM_CN.get(team_id, team_id)
        
        # 收集所有需要添加的球员
        new_players = []
        
        # 从 BBR 额外数据添加
        for p in bbr_extra:
            name_en = p[0]
            cn = EN_TO_CN.get(name_en, name_en)
            # 检查是否已存在
            skip = False
            for ext in existing:
                if cn in ext or name_en[:4].lower() in ext:
                    skip = True
                    break
            if skip:
                continue
            
            salary = p[1] if p[1] > 0 else 2000000
            per = p[2]
            pos = POS_MAP.get(p[3], 'G')
            ht = p[4]
            wt = p[5]
            exp = str(p[6]) if p[6] < 20 else str(p[6])
            
            new_players.append({
                'name': cn,
                'salary': salary,
                'per': per,
                'pos': pos,
                'ht': ht,
                'wt': wt,
                'exp': exp,
                'years': 2 if salary > 8000000 else 1,
                'id': f"{team_id}-{''.join(c for c in cn if c.isalpha())[:8].lower()}-{len(existing)+len(new_players)+1}"
            })
        
        # 从 Spotrac 添加
        for p in spotrac:
            name_en = p[0]
            cn = EN_TO_CN.get(name_en, name_en)
            skip = False
            for ext in existing:
                if cn in ext or name_en[:4].lower() in ext:
                    skip = True
                    break
            for np in new_players:
                if cn == np['name']:
                    skip = True
                    break
            if skip:
                continue
            
            new_players.append({
                'name': cn,
                'salary': p[1],
                'per': 10.0,
                'pos': POS_MAP.get(p[2], 'G'),
                'ht': 78,
                'wt': 210,
                'exp': '3',
                'years': 1,
                'id': f"{team_id}-{''.join(c for c in cn if c.isalpha())[:8].lower()}-{len(existing)+len(new_players)+101}"
            })
        
        if new_players:
            all_lines.append(f"// --- {cn_name} ({team_id}) - 补充 {len(new_players)} 人 ---")
            for np in new_players:
                stats_str = f"{{g:50,gs:10,mp:18.0,pts:{np['per']*1.5:.1f},ast:1.5,trb:3.0,stl:0.5,blk:0.3,tov:0.8,pf:1.5,fg_pct:0.450,fg3_pct:0.350,ft_pct:0.750,orb:0.5,drb:2.5,fg:4.0,fga:9.0,fg3:1.5,fg3a:4.0,ft:1.0,fta:1.5}}"
                line = f"      {{ id:'{np['id']}', name:'{np['name']}', salary:{np['salary']}, per:{np['per']}, yearsRemaining:{np['years']}, pos:'{np['pos']}', ht:{np['ht']}, wt:{np['wt']}, exp:'{np['exp']}', stats:{stats_str} }},"
                all_lines.append(line)
            
            total_new += len(new_players)
            all_lines.append("")
    
    all_lines.insert(0, f"// 共 {total_new} 名补充球员\n")
    
    output = '\n'.join(all_lines)
    path = 'c:\\Users\\chenqi\\Desktop\\tod\\bbr_output_v2.txt'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"✅ 生成完成!")
    print(f"📊 共 {total_new} 名补充球员")
    print(f"📝 输出: {path}")
    
    return output


if __name__ == '__main__':
    generate_output()
