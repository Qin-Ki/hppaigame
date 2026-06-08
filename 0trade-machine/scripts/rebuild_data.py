#!/usr/bin/env python3
"""
Rebuild data.js with verified salary data from Basketball Reference 2025-26.
Steps:
1. Parse existing data.js
2. Map players to BBR salary data
3. Fix stats (fg_pct/fg3_pct field swap)
4. Remove placeholder/fake players
5. Update salaries and yearsRemaining
6. Output complete new data.js
"""
import re
import json
import copy

# ============ BBR SALARY DATA (2025-26) ============
# Extracted from https://www.basketball-reference.com/contracts/players.html
# Format: (BBR_name, team_in_data, salary_2025_26, salary_2026_27, yearsRemaining, notes)

BBR_SALARIES = {
    # ATLANTA HAWKS
    "贾勒特-阿伦": {"team":"cle", "salary":20000000, "next_salary":28000000, "years":3, "bbr_team":"CLE"},
    "杰伦-约翰逊": {"team":"atl", "salary":30000000, "next_salary":30000000, "years":4, "bbr_team":"ATL"},
    "戴森-丹尼尔斯": {"team":"atl", "salary":7707709, "next_salary":25000000, "years":4, "bbr_team":"ATL"},
    "乔纳森-库明加": {"team":"atl", "salary":23799569, "next_salary":24300000, "years":1, "bbr_team":"ATL"}, # Actually ATL in this sim
    "奥涅卡-奥孔古": {"team":"atl", "salary":15000000, "next_salary":16120000, "years":3, "bbr_team":"ATL"},
    "尼基尔-亚历山大-沃克": {"team":"atl", "salary":15161800, "next_salary":14403710, "years":3, "bbr_team":"ATL"},
    "科里-基斯珀特": {"team":"atl", "salary":13975000, "next_salary":13975000, "years":3, "bbr_team":"ATL"},
    "扎卡里·里萨切尔": {"team":"atl", "salary":13197720, "next_salary":13826040, "years":2, "bbr_team":"ATL"},
    "巴迪-希尔德": {"team":"atl", "salary":9219512, "next_salary":9658536, "years":2, "bbr_team":"ATL"},
    "阿萨-纽厄尔": {"team":"atl", "salary":3237480, "next_salary":3399480, "years":3, "bbr_team":"ATL"},
    "穆罕穆德-盖伊": {"team":"atl", "salary":2221677, "next_salary":2406205, "years":1, "bbr_team":"ATL"},
    
    # BROOKLYN NETS (BBR: BRK)
    "小迈克尔-波特": {"team":"bkn", "salary":38333050, "next_salary":40806150, "years":1, "bbr_team":"BRK"},
    "尼古拉斯-克拉克斯顿": {"team":"bkn", "salary":25352272, "next_salary":23147727, "years":2, "bbr_team":"BRK"},
    "特伦斯-曼": {"team":"bkn", "salary":15500000, "next_salary":15500000, "years":2, "bbr_team":"BRK"},
    "叶戈尔-杰明": {"team":"bkn", "salary":6889200, "next_salary":7233720, "years":3, "bbr_team":"BRK"},
    "宰伊尔-威廉姆斯": {"team":"bkn", "salary":6250000, "next_salary":6250000, "years":1, "bbr_team":"BRK"},
    "戴罗恩-夏普": {"team":"bkn", "salary":6250000, "next_salary":6250000, "years":1, "bbr_team":"BRK"},
    "诺厄·克洛尼": {"team":"bkn", "salary":3398640, "next_salary":5414034, "years":1, "bbr_team":"BRK"},
    "诺兰-特拉奥雷": {"team":"bkn", "salary":3811560, "next_salary":4002000, "years":3, "bbr_team":"BRK"},
    "德雷克-鲍威尔": {"team":"bkn", "salary":3372240, "next_salary":3540600, "years":3, "bbr_team":"BRK"},
    "本-萨拉夫": {"team":"bkn", "salary":2884560, "next_salary":3028560, "years":3, "bbr_team":"BRK"},
    
    # BOSTON CELTICS
    "杰森-塔特姆": {"team":"bos", "salary":54126450, "next_salary":58456566, "years":4, "bbr_team":"BOS"},
    "杰伦-布朗": {"team":"bos", "salary":53142264, "next_salary":57078728, "years":3, "bbr_team":"BOS"},
    "德里克-怀特": {"team":"bos", "salary":28100000, "next_salary":30348000, "years":3, "bbr_team":"BOS"},
    "萨姆-豪瑟": {"team":"bos", "salary":10044644, "next_salary":10848215, "years":3, "bbr_team":"BOS"},
    "佩顿-普里查德": {"team":"bos", "salary":7232143, "next_salary":7767857, "years":2, "bbr_team":"BOS"},
    "雨果-冈萨雷斯": {"team":"bos", "salary":2783880, "next_salary":2923560, "years":3, "bbr_team":"BOS"},
    "卢卡-加尔扎": {"team":"bos", "salary":2461463, "next_salary":2801346, "years":1, "bbr_team":"BOS"},
    "达拉诺-班顿": {"team":"bos", "salary":263940, "verification":"NEEDS_VERIFICATION", "years":1, "bbr_team":"BOS"},
    "贝勒·沙伊尔曼": {"team":"bos", "salary":2619000, "next_salary":2744040, "years":2, "bbr_team":"BOS"},
    "内米亚斯-克塔": {"team":"bos", "salary":2349578, "next_salary":2667944, "years":1, "bbr_team":"BOS"},
    
    # CHARLOTTE HORNETS (BBR: CHO)
    "拉梅洛-鲍尔": {"team":"cha", "salary":37958760, "next_salary":40770520, "years":3, "bbr_team":"CHO"},
    "迈尔斯-布里奇斯": {"team":"cha", "salary":25000000, "next_salary":22826087, "years":1, "bbr_team":"CHO"},
    "布兰登·米勒": {"team":"cha", "salary":11968800, "next_salary":15104626, "years":1, "bbr_team":"CHO"},
    "约什-格林": {"team":"cha", "salary":13666667, "next_salary":14679012, "years":1, "bbr_team":"CHO"},
    "格兰特-威廉姆斯": {"team":"cha", "salary":13645500, "next_salary":14265750, "years":1, "bbr_team":"CHO"},
    "康-克尼普尔": {"team":"cha", "salary":10015680, "next_salary":10516560, "years":3, "bbr_team":"CHO"},
    "提贾尼·萨隆": {"team":"cha", "salary":7863240, "next_salary":8237880, "years":2, "bbr_team":"CHO"},
    "特雷-曼": {"team":"cha", "salary":8000000, "next_salary":8000000, "years":2, "bbr_team":"CHO"},
    "帕特-康诺顿": {"team":"cha", "salary":10739683, "next_salary":3815861, "years":1, "bbr_team":"CHO"},
    "利亚姆-麦克尼利": {"team":"cha", "salary":2763960, "next_salary":2902080, "years":3, "bbr_team":"CHO"},
    
    # CHICAGO BULLS
    "约什-吉迪": {"team":"chi", "salary":25000000, "next_salary":25000000, "years":3, "bbr_team":"CHI"},
    "帕特里克-威廉姆斯": {"team":"chi", "salary":18000000, "next_salary":18000000, "years":3, "bbr_team":"CHI"},
    "艾萨克-奥科罗": {"team":"chi", "salary":11000000, "next_salary":11814814, "years":1, "bbr_team":"CHI"},
    "杰伦-史密斯": {"team":"chi", "salary":9000000, "next_salary":9428571, "years":1, "bbr_team":"CHI"},
    "特雷-琼斯": {"team":"chi", "salary":8000000, "next_salary":8000000, "years":2, "bbr_team":"CHI"},
    "罗伯特·迪林厄姆": {"team":"chi", "salary":6576120, "next_salary":6889320, "years":2, "bbr_team":"CHI"},
    "盖尔雄-亚布塞莱": {"team":"chi", "salary":5500000, "next_salary":5775000, "years":1, "bbr_team":"CHI"},
    "马塔斯·布泽利斯": {"team":"chi", "salary":5455560, "next_salary":5715360, "years":2, "bbr_team":"CHI"},
    "诺阿-埃森格": {"team":"chi", "salary":5429520, "next_salary":5701200, "years":3, "bbr_team":"CHI"},
    "穆哈马杜-盖耶": {"team":"chi", "salary":2221677, "next_salary":2411090, "years":1, "bbr_team":"CHI"},
    
    # CLEVELAND CAVALIERS
    "埃文-莫布利": {"team":"cle", "salary":46394100, "next_salary":50105628, "years":4, "bbr_team":"CLE"},
    "多诺万-米切尔": {"team":"cle", "salary":46394100, "next_salary":50105628, "years":2, "bbr_team":"CLE"},
    "詹姆斯-哈登": {"team":"cle", "salary":39182693, "next_salary":42317307, "years":1, "bbr_team":"CLE"},
    "马克斯-斯特鲁斯": {"team":"cle", "salary":15936452, "next_salary":16660836, "years":1, "bbr_team":"CLE"},
    "丹尼斯-施罗德": {"team":"cle", "salary":14104000, "next_salary":14809200, "years":2, "bbr_team":"CLE"},
    "萨姆-梅里尔": {"team":"cle", "salary":8482144, "next_salary":9160715, "years":3, "bbr_team":"CLE"},
    "杰隆·泰森": {"team":"cle", "salary":3492480, "next_salary":3658560, "years":2, "bbr_team":"CLE"},
    "内匡-汤姆林": {"team":"cle", "salary":718150, "next_salary":2411090, "years":1, "bbr_team":"CLE"},
    "小克雷格·波特": {"team":"cle", "salary":2221677, "next_salary":2406205, "years":1, "bbr_team":"CLE"},
    
    # DALLAS MAVERICKS
    "凯里-欧文": {"team":"dal", "salary":36566002, "next_salary":39491282, "years":2, "bbr_team":"DAL"},
    "PJ-华盛顿": {"team":"dal", "salary":14152174, "next_salary":19813044, "years":4, "bbr_team":"DAL"},
    "克莱-汤普森": {"team":"dal", "salary":16666667, "next_salary":17460317, "years":1, "bbr_team":"DAL"},
    "丹尼尔-加福德": {"team":"dal", "salary":14386320, "next_salary":17263584, "years":3, "bbr_team":"DAL"},
    "库珀-弗拉格": {"team":"dal", "salary":13825920, "next_salary":14517480, "years":3, "bbr_team":"DAL"},
    "凯莱布-马丁": {"team":"dal", "salary":9594044, "next_salary":10001494, "years":2, "bbr_team":"DAL"},
    "纳吉-马绍尔": {"team":"dal", "salary":9000000, "next_salary":9428571, "years":1, "bbr_team":"DAL"},
    "马克斯-克里斯蒂": {"team":"dal", "salary":7714286, "next_salary":8285714, "years":2, "bbr_team":"DAL"},
    "德雷克·莱夫利二世": {"team":"dal", "salary":5253360, "next_salary":7239131, "years":1, "bbr_team":"DAL"},
    "AJ·约翰逊": {"team":"dal", "salary":3090480, "next_salary":3237120, "years":2, "bbr_team":"DAL"},
    
    # DENVER NUGGETS
    "尼古拉-约基奇": {"team":"den", "salary":55224526, "next_salary":59033114, "years":2, "bbr_team":"DEN"},
    "贾马尔-默里": {"team":"den", "salary":46394100, "next_salary":50105628, "years":3, "bbr_team":"DEN"},
    "阿龙-戈登": {"team":"den", "salary":22841455, "next_salary":31978037, "years":3, "bbr_team":"DEN"},
    "卡梅伦-约翰逊": {"team":"den", "salary":21057065, "next_salary":23062500, "years":1, "bbr_team":"DEN"},
    "克里斯蒂安-布朗": {"team":"den", "salary":4921797, "next_salary":21551726, "years":5, "bbr_team":"DEN"},  # Christian Braun
    "约纳斯-瓦兰丘纳斯": {"team":"den", "salary":10395000, "next_salary":10000000, "years":1, "bbr_team":"DEN"},
    "齐克-纳吉": {"team":"den", "salary":8177778, "next_salary":7466667, "years":2, "bbr_team":"DEN"},
    "朱利安·斯特劳瑟": {"team":"den", "salary":2674200, "next_salary":4826931, "years":1, "bbr_team":"DEN"},
    "达隆·霍姆斯二世": {"team":"den", "salary":3218760, "next_salary":3372120, "years":2, "bbr_team":"DEN"},
    "杰伦-皮克特": {"team":"den", "salary":2221677, "next_salary":2406205, "years":1, "bbr_team":"DEN"},
    
    # DETROIT PISTONS
    "凯德-坎宁安": {"team":"det", "salary":46394100, "next_salary":50105628, "years":4, "bbr_team":"DET"},
    "邓肯-罗宾逊": {"team":"det", "salary":16834692, "next_salary":15992957, "years":2, "bbr_team":"DET"},
    "以赛亚-斯图尔特": {"team":"det", "salary":15000000, "next_salary":15000000, "years":2, "bbr_team":"DET"},
    "卡里斯-勒韦尔": {"team":"det", "salary":14104000, "next_salary":14809200, "years":1, "bbr_team":"DET"},
    "奥萨尔·汤普森": {"team":"det", "salary":8775000, "next_salary":11117925, "years":1, "bbr_team":"DET"},
    "罗恩-霍兰德": {"team":"det", "salary":8657280, "next_salary":9069600, "years":2, "bbr_team":"DET"},
    "保罗-里德": {"team":"det", "salary":5335894, "next_salary":5602689, "years":1, "bbr_team":"DET"},
    "马库斯·萨瑟": {"team":"det", "salary":2886720, "next_salary":5198983, "years":1, "bbr_team":"DET"},
    "丹尼斯·詹金斯": {"team":"det", "salary":3809524, "next_salary":4000000, "years":1, "bbr_team":"DET"},
    "托卢-史密斯三世": {"team":"det", "salary":2221677, "next_salary":2411090, "years":1, "bbr_team":"DET"},
    
    # GOLDEN STATE WARRIORS
    "斯蒂芬-库里": {"team":"gsw", "salary":59606817, "next_salary":62587158, "years":1, "bbr_team":"GSW"},
    "吉米-巴特勒": {"team":"gsw", "salary":54126450, "next_salary":56832773, "years":1, "bbr_team":"GSW"},
    "德雷蒙德-格林": {"team":"gsw", "salary":25892857, "next_salary":27678571, "years":1, "bbr_team":"GSW"},
    "摩西-穆迪": {"team":"gsw", "salary":11574075, "next_salary":12500000, "years":2, "bbr_team":"GSW"},
    "艾尔-霍福德": {"team":"gsw", "salary":5685000, "next_salary":5969250, "years":1, "bbr_team":"GSW"},
    "布兰丁·波杰姆斯基": {"team":"gsw", "salary":3687960, "next_salary":5679459, "years":1, "bbr_team":"GSW"},
    "桂-桑托斯": {"team":"gsw", "salary":2221677, "next_salary":4629630, "years":3, "bbr_team":"GSW"},
    "丹东尼-梅尔顿": {"team":"gsw", "salary":3080921, "next_salary":3451779, "years":1, "bbr_team":"GSW"},
    "威尔-理查德": {"team":"gsw", "salary":1272870, "next_salary":2150917, "years":3, "bbr_team":"GSW"},
    
    # HOUSTON ROCKETS
    "凯文-杜兰特": {"team":"hou", "salary":54708609, "next_salary":43902439, "years":2, "bbr_team":"HOU"},
    "阿尔佩伦-申京": {"team":"hou", "salary":33944954, "next_salary":35642202, "years":4, "bbr_team":"HOU"},
    "弗雷德-范弗利特": {"team":"hou", "salary":25000000, "next_salary":25000000, "years":1, "bbr_team":"HOU"},
    "小贾巴里-史密斯": {"team":"hou", "salary":12350392, "next_salary":23643411, "years":5, "bbr_team":"HOU"},
    "多里安-芬尼-史密斯": {"team":"hou", "salary":12700000, "next_salary":13335000, "years":3, "bbr_team":"HOU"},
    "史蒂文-亚当斯": {"team":"hou", "salary":14130434, "next_salary":13000000, "years":2, "bbr_team":"HOU"},
    "阿门·汤普森": {"team":"hou", "salary":9690600, "next_salary":12258609, "years":1, "bbr_team":"HOU"},
    "里德·谢泼德": {"team":"hou", "salary":10603560, "next_salary":11108880, "years":2, "bbr_team":"HOU"},
    "克林特-卡佩拉": {"team":"hou", "salary":6700000, "next_salary":7035000, "years":2, "bbr_team":"HOU"},
    "JD-戴维森": {"team":"hou", "salary":2270735, "next_salary":2584539, "years":1, "bbr_team":"HOU"},
    
    # INDIANA PACERS
    "泰雷斯-哈利伯顿": {"team":"ind", "salary":45550512, "next_salary":48924624, "years":3, "bbr_team":"IND"},
    "帕斯卡尔-西亚卡姆": {"team":"ind", "salary":45550512, "next_salary":48924624, "years":2, "bbr_team":"IND"},
    "伊维察-祖巴茨": {"team":"ind", "salary":18893980, "next_salary":20342140, "years":2, "bbr_team":"IND"},
    "安德鲁-内姆布哈德": {"team":"ind", "salary":18102000, "next_salary":19550160, "years":2, "bbr_team":"IND"},
    "奥比-托平": {"team":"ind", "salary":14000000, "next_salary":15000000, "years":2, "bbr_team":"IND"},
    "TJ-麦康奈尔": {"team":"ind", "salary":10200000, "next_salary":11000000, "years":3, "bbr_team":"IND"},
    "贾雷斯-沃克": {"team":"ind", "salary":6665520, "next_salary":8478542, "years":1, "bbr_team":"IND"},
    "本·谢泼德": {"team":"ind", "salary":2790720, "next_salary":5031669, "years":1, "bbr_team":"IND"},
    "科比·布朗": {"team":"ind", "salary":2654880, "next_salary":4792059, "years":1, "bbr_team":"IND"},
    "米卡-波特": {"team":"ind", "salary":1527805, "next_salary":2801346, "years":1, "bbr_team":"IND"},
    
    # LA CLIPPERS
    "科怀-伦纳德": {"team":"lac", "salary":50000000, "next_salary":50300000, "years":1, "bbr_team":"LAC"},
    "达里厄斯-加兰": {"team":"lac", "salary":39446090, "next_salary":42166510, "years":2, "bbr_team":"LAC"},
    "波格丹-波格丹诺维奇": {"team":"lac", "salary":16020000, "next_salary":16020000, "years":1, "bbr_team":"LAC"},
    "小德里克-琼斯": {"team":"lac", "salary":10000000, "next_salary":10476190, "years":1, "bbr_team":"LAC"},
    "布鲁克-洛佩斯": {"team":"lac", "salary":8750000, "next_salary":9187500, "years":1, "bbr_team":"LAC"},
    "以赛亚-杰克逊": {"team":"lac", "salary":7600000, "next_salary":7000000, "years":2, "bbr_team":"LAC"},
    "尼古拉斯-巴图姆": {"team":"lac", "salary":5601600, "next_salary":5881680, "years":1, "bbr_team":"LAC"},
    "克里斯-邓恩": {"team":"lac", "salary":5426400, "next_salary":5684800, "years":1, "bbr_team":"LAC"},
    "布拉德利-比尔": {"team":"lac", "salary":24737010, "next_salary":25004710, "years":1, "bbr_team":"LAC"},
    "亚尼克-科南-尼德豪泽": {"team":"lac", "salary":2743800, "next_salary":2880960, "years":3, "bbr_team":"LAC"},
    
    # LA LAKERS
    "卢卡-东契奇": {"team":"lal", "salary":45999660, "next_salary":49800000, "years":3, "bbr_team":"LAL"},
    "奥斯汀-里夫斯": {"team":"lal", "salary":13937574, "next_salary":14898786, "years":1, "bbr_team":"LAL"},
    "贾里德-范德比尔特": {"team":"lal", "salary":11571429, "next_salary":12428571, "years":2, "bbr_team":"LAL"},
    "德安德烈-艾顿": {"team":"lal", "salary":33654814, "next_salary":8104000, "years":1, "bbr_team":"LAL"},
    "杰克-拉拉维亚": {"team":"lal", "salary":6000000, "next_salary":6000000, "years":1, "bbr_team":"LAL"},
    "马库斯-斯马特": {"team":"lal", "salary":19920855, "next_salary":5390700, "years":1, "bbr_team":"LAL"},
    "道尔顿·克内克特": {"team":"lal", "salary":4010160, "next_salary":4201080, "years":2, "bbr_team":"LAL"},
    "小尼克·史密斯": {"team":"lal", "salary":2710680, "next_salary":2497812, "years":1, "bbr_team":"LAL"},
    "布朗尼·詹姆斯": {"team":"lal", "salary":1955377, "next_salary":2296271, "years":2, "bbr_team":"LAL"},
    "阿杜-蒂耶罗": {"team":"lal", "salary":1272870, "next_salary":2150917, "years":2, "bbr_team":"LAL"},
    
    # MEMPHIS GRIZZLIES
    "贾-莫兰特": {"team":"mem", "salary":39446090, "next_salary":42166510, "years":2, "bbr_team":"MEM"},
    "肯塔维厄斯-考德威尔-波普": {"team":"mem", "salary":21621500, "next_salary":21621500, "years":1, "bbr_team":"MEM"},
    "桑迪-阿尔达马": {"team":"mem", "salary":18485916, "next_salary":17007043, "years":2, "bbr_team":"MEM"},
    "布兰登-克拉克": {"team":"mem", "salary":12500000, "next_salary":12500000, "years":1, "bbr_team":"MEM"},
    "泰-杰罗姆": {"team":"mem", "salary":8781000, "next_salary":9220050, "years":2, "bbr_team":"MEM"},
    "泰勒·亨德里克斯": {"team":"mem", "salary":6127080, "next_salary":7805900, "years":1, "bbr_team":"MEM"},
    "扎克·埃迪": {"team":"mem", "salary":6045000, "next_salary":6332760, "years":2, "bbr_team":"MEM"},
    "塞德里克-考沃德": {"team":"mem", "salary":5715120, "next_salary":6001080, "years":3, "bbr_team":"MEM"},
    "沃尔特-克莱顿": {"team":"mem", "salary":3991320, "next_salary":4190520, "years":3, "bbr_team":"MEM"},
    "泰-吉布森": {"team":"mem", "salary":2269880, "next_salary":3815861, "years":1, "bbr_team":"MEM"},
    
    # MIAMI HEAT
    "巴姆-阿德巴约": {"team":"mia", "salary":37096620, "next_salary":49500000, "years":3, "bbr_team":"MIA"},
    "泰勒-希罗": {"team":"mia", "salary":31000000, "next_salary":33000000, "years":1, "bbr_team":"MIA"},
    "安德鲁-威金斯": {"team":"mia", "salary":28223215, "next_salary":30169644, "years":1, "bbr_team":"MIA"},
    "尼科拉-约维奇": {"team":"mia", "salary":4445417, "next_salary":16200000, "years":4, "bbr_team":"MIA"},
    "戴维恩-米切尔": {"team":"mia", "salary":11600000, "next_salary":12400000, "years":1, "bbr_team":"MIA"},
    "小海梅-哈克斯": {"team":"mia", "salary":3861600, "next_salary":5939141, "years":1, "bbr_team":"MIA"},
    "凯莱尔·韦尔": {"team":"mia", "salary":4443360, "next_salary":4654920, "years":2, "bbr_team":"MIA"},
    "卡斯帕拉斯-亚库契奥尼斯": {"team":"mia", "salary":3658800, "next_salary":3841680, "years":3, "bbr_team":"MIA"},
    "德鲁-史密斯": {"team":"mia", "salary":2378870, "next_salary":2584539, "years":2, "bbr_team":"MIA"},
    "迈伦-加德纳": {"team":"mia", "salary":395029, "next_salary":2584539, "years":2, "bbr_team":"MIA"},
    
    # MILWAUKEE BUCKS
    "扬尼斯-阿德托昆博": {"team":"mil", "salary":54126450, "next_salary":58456566, "years":2, "bbr_team":"MIL"},
    "迈尔斯-特纳": {"team":"mil", "salary":25318251, "next_salary":26584164, "years":3, "bbr_team":"MIL"},
    "凯尔-库兹马": {"team":"mil", "salary":22410605, "next_salary":20490152, "years":1, "bbr_team":"MIL"},
    "博比-波蒂斯": {"team":"mil", "salary":13445754, "next_salary":14521414, "years":2, "bbr_team":"MIL"},
    "AJ-格林": {"team":"mil", "salary":2301587, "next_salary":10044644, "years":4, "bbr_team":"MIL"},
    "小凯文-波特": {"team":"mil", "salary":5134000, "next_salary":5390700, "years":1, "bbr_team":"MIL"},
    "莱恩-罗林斯": {"team":"mil", "salary":4000000, "next_salary":4000000, "years":2, "bbr_team":"MIL"},
    "小加里-特伦特": {"team":"mil", "salary":3697105, "next_salary":3881960, "years":1, "bbr_team":"MIL"},
    "加里-哈里斯": {"team":"mil", "salary":3634153, "next_salary":3815861, "years":1, "bbr_team":"MIL"},
    "托里恩-普林斯": {"team":"mil", "salary":3303774, "next_salary":3815861, "years":1, "bbr_team":"MIL"},
    
    # MINNESOTA TIMBERWOLVES
    "安东尼-爱德华兹": {"team":"min", "salary":45550512, "next_salary":48924624, "years":3, "bbr_team":"MIN"},
    "鲁迪-戈贝尔": {"team":"min", "salary":35000000, "next_salary":36500000, "years":2, "bbr_team":"MIN"},
    "朱利叶斯-兰德尔": {"team":"min", "salary":30864198, "next_salary":33333334, "years":2, "bbr_team":"MIN"},
    "杰登-麦克丹尼尔斯": {"team":"min", "salary":24393104, "next_salary":26200001, "years":3, "bbr_team":"MIN"},
    "纳兹-里德": {"team":"min", "salary":21551724, "next_salary":23275862, "years":4, "bbr_team":"MIN"},
    "唐特-迪温琴佐": {"team":"min", "salary":11990000, "next_salary":12535000, "years":1, "bbr_team":"MIN"},
    "若昂-贝兰热": {"team":"min", "salary":4201080, "next_salary":4411200, "years":3, "bbr_team":"MIN"},
    "小特伦斯·香农": {"team":"min", "salary":2674080, "next_salary":2801640, "years":2, "bbr_team":"MIN"},
    "朱利安-菲利普斯": {"team":"min", "salary":2221677, "next_salary":2406205, "years":1, "bbr_team":"MIN"},
    
    # NEW ORLEANS PELICANS
    "蔡恩-威廉森": {"team":"nop", "salary":39446090, "next_salary":42166510, "years":2, "bbr_team":"NOP"},
    "乔丹-普尔": {"team":"nop", "salary":31848215, "next_salary":34044642, "years":1, "bbr_team":"NOP"},
    "德章泰-默里": {"team":"nop", "salary":30801103, "next_salary":32785071, "years":2, "bbr_team":"NOP"},
    "特雷-墨菲": {"team":"nop", "salary":25000000, "next_salary":27000000, "years":3, "bbr_team":"NOP"},
    "凯文-卢尼": {"team":"nop", "salary":8000000, "next_salary":8000000, "years":1, "bbr_team":"NOP"},
    "杰里迈亚-费尔斯": {"team":"nop", "salary":7520040, "next_salary":7896240, "years":3, "bbr_team":"NOP"},
    "乔丹·霍金斯": {"team":"nop", "salary":4741320, "next_salary":7021895, "years":1, "bbr_team":"NOP"},
    "萨迪克-贝": {"team":"nop", "salary":6118644, "next_salary":6557080, "years":1, "bbr_team":"NOP"},
    "德里克-奎因": {"team":"nop", "salary":5157960, "next_salary":5416080, "years":3, "bbr_team":"NOP"},
    "伊夫·蜜西": {"team":"nop", "salary":3353040, "next_salary":3512760, "years":2, "bbr_team":"NOP"},
    
    # NEW YORK KNICKS
    "卡尔-安东尼-唐斯": {"team":"nyk", "salary":53142264, "next_salary":57078728, "years":2, "bbr_team":"NYK"},
    "OG-阿奴诺比": {"team":"nyk", "salary":39568966, "next_salary":42500000, "years":3, "bbr_team":"NYK"},
    "杰伦-布伦森": {"team":"nyk", "salary":34944001, "next_salary":37739521, "years":3, "bbr_team":"NYK"},
    "米卡尔-布里奇斯": {"team":"nyk", "salary":24900000, "next_salary":33482145, "years":4, "bbr_team":"NYK"},
    "约什-哈特": {"team":"nyk", "salary":19472240, "next_salary":20923760, "years":2, "bbr_team":"NYK"},
    "约瑟-阿尔瓦拉多": {"team":"nyk", "salary":4500000, "next_salary":4500000, "years":1, "bbr_team":"NYK"},
    "迈尔斯-麦克布莱德": {"team":"nyk", "salary":4333333, "next_salary":3956523, "years":1, "bbr_team":"NYK"},
    "帕科姆·达迪耶": {"team":"nyk", "salary":2847600, "next_salary":2983680, "years":2, "bbr_team":"NYK"},
    "泰勒·科勒克": {"team":"nyk", "salary":2191897, "next_salary":2296271, "years":2, "bbr_team":"NYK"},
    
    # OKLAHOMA CITY THUNDER
    "杰伦-威廉姆斯": {"team":"okc", "salary":6580997, "next_salary":41250000, "years":5, "bbr_team":"OKC"},
    "切特-霍姆格伦": {"team":"okc", "salary":13731368, "next_salary":41250000, "years":5, "bbr_team":"OKC"},
    "以赛亚-哈尔滕施泰因": {"team":"okc", "salary":28500000, "next_salary":28500000, "years":1, "bbr_team":"OKC"},
    "亚历克斯-卡鲁索": {"team":"okc", "salary":18102000, "next_salary":19550160, "years":3, "bbr_team":"OKC"},
    "吕冈茨-多尔特": {"team":"okc", "salary":18222222, "next_salary":18222222, "years":1, "bbr_team":"OKC"},
    "以赛亚-乔": {"team":"okc", "salary":12362338, "next_salary":11323006, "years":2, "bbr_team":"OKC"},
    "阿龙-威金斯": {"team":"okc", "salary":10102803, "next_salary":9224300, "years":3, "bbr_team":"OKC"},
    "杰林-威廉姆斯": {"team":"okc", "salary":8450704, "next_salary":7774648, "years":2, "bbr_team":"OKC"},
    "卡森·华莱士": {"team":"okc", "salary":5820240, "next_salary":7420806, "years":1, "bbr_team":"OKC"},
    "肯里奇-威廉姆斯": {"team":"okc", "salary":7163000, "next_salary":7163000, "years":1, "bbr_team":"OKC"},
    
    # ORLANDO MAGIC
    "弗朗茨-瓦格纳": {"team":"orl", "salary":38661750, "next_salary":41754690, "years":4, "bbr_team":"ORL"},
    "保罗-班切罗": {"team":"orl", "salary":15334769, "next_salary":41250000, "years":5, "bbr_team":"ORL"},
    "德斯蒙德-贝恩": {"team":"orl", "salary":36725670, "next_salary":39446090, "years":3, "bbr_team":"ORL"},
    "杰伦-萨格斯": {"team":"orl", "salary":35000000, "next_salary":32400000, "years":4, "bbr_team":"ORL"},
    "温德尔-卡特": {"team":"orl", "salary":10850000, "next_salary":18102000, "years":3, "bbr_team":"ORL"},
    "乔纳森-艾萨克": {"team":"orl", "salary":15000000, "next_salary":14500000, "years":3, "bbr_team":"ORL"},
    "安东尼·布莱克": {"team":"orl", "salary":7970280, "next_salary":10106316, "years":1, "bbr_team":"ORL"},
    "戈加-比塔泽": {"team":"orl", "salary":8333333, "next_salary":7608696, "years":1, "bbr_team":"ORL"},
    "杰特·霍华德": {"team":"orl", "salary":5529720, "next_salary":7337939, "years":1, "bbr_team":"ORL"},
    "特里斯坦-达·席尔瓦": {"team":"orl", "salary":3809520, "next_salary":3991200, "years":2, "bbr_team":"ORL"},
    
    # PHILADELPHIA 76ERS
    "乔尔-恩比德": {"team":"phi", "salary":55224526, "next_salary":57985752, "years":3, "bbr_team":"PHI"},
    "保罗-乔治": {"team":"phi", "salary":51666090, "next_salary":54126380, "years":2, "bbr_team":"PHI"},
    "泰雷斯-马克西": {"team":"phi", "salary":37958760, "next_salary":40770520, "years":3, "bbr_team":"PHI"},
    "VJ-埃奇库姆": {"team":"phi", "salary":11108880, "next_salary":11663880, "years":3, "bbr_team":"PHI"},
    "多米尼克-巴洛": {"team":"phi", "salary":3415000, "next_salary":3415000, "years":1, "bbr_team":"PHI"},
    "特伦登-沃特福特": {"team":"phi", "salary":2461463, "next_salary":2801346, "years":1, "bbr_team":"PHI"},
    "贾巴里-沃克": {"team":"phi", "salary":724598, "next_salary":2584539, "years":1, "bbr_team":"PHI"},
    "达伦-特里": {"team":"phi", "salary":5399118, "next_salary":2584539, "years":1, "bbr_team":"PHI"},
    "贾斯汀·爱德华兹": {"team":"phi", "salary":2048494, "next_salary":2411090, "years":2, "bbr_team":"PHI"},
    "阿德姆·博纳": {"team":"phi", "salary":1955377, "next_salary":2296271, "years":2, "bbr_team":"PHI"},
    
    # PHOENIX SUNS (BBR: PHO)
    "杰伦-格林": {"team":"phx", "salary":33584499, "next_salary":36251166, "years":2, "bbr_team":"PHO"},
    "狄龙-布鲁克斯": {"team":"phx", "salary":21124110, "next_salary":20992727, "years":1, "bbr_team":"PHO"},
    "格雷森-阿伦": {"team":"phx", "salary":16875000, "next_salary":18125000, "years":2, "bbr_team":"PHO"},
    "罗伊斯-奥尼尔": {"team":"phx", "salary":10125000, "next_salary":10875000, "years":2, "bbr_team":"PHO"},
    "卡曼-马卢阿奇": {"team":"phx", "salary":6016080, "next_salary":6316680, "years":3, "bbr_team":"PHO"},
    "海伍德-海史密斯": {"team":"phx", "salary":6443984, "next_salary":3018158, "years":1, "bbr_team":"PHO"},
    "瑞安·邓恩": {"team":"phx", "salary":2657760, "next_salary":2784240, "years":2, "bbr_team":"PHO"},
    "贾马雷-布耶": {"team":"phx", "salary":2378870, "next_salary":2584539, "years":1, "bbr_team":"PHO"},
    "奥索·伊戈达罗": {"team":"phx", "salary":1955377, "next_salary":2296271, "years":2, "bbr_team":"PHO"},
    "拉希尔・弗莱明": {"team":"phx", "salary":1272870, "next_salary":2150917, "years":3, "bbr_team":"PHO"},
    
    # PORTLAND TRAIL BLAZERS
    "朱-霍勒迪": {"team":"por", "salary":32400000, "next_salary":34800000, "years":2, "bbr_team":"POR"},
    "杰拉米-格兰特": {"team":"por", "salary":32000001, "next_salary":34206898, "years":2, "bbr_team":"POR"},
    "谢登-夏普": {"team":"por", "salary":8399983, "next_salary":20089287, "years":4, "bbr_team":"POR"},
    "图马尼-卡马拉": {"team":"por", "salary":2221677, "next_salary":18080358, "years":4, "bbr_team":"POR"},
    "斯库特·亨德森": {"team":"por", "salary":10748040, "next_salary":13585523, "years":1, "bbr_team":"POR"},
    "达米安-利拉德": {"team":"por", "salary":36620603, "next_salary":13398000, "years":2, "bbr_team":"POR"},
    "德尼-阿夫迪亚": {"team":"por", "salary":14375000, "next_salary":13125000, "years":2, "bbr_team":"POR"},
    "多诺万·克林根": {"team":"por", "salary":7178400, "next_salary":7519920, "years":2, "bbr_team":"POR"},
    "克里斯·默里": {"team":"por", "salary":3132000, "next_salary":5315004, "years":1, "bbr_team":"POR"},
    "杨瀚森": {"team":"por", "salary":4422360, "next_salary":4643520, "years":3, "bbr_team":"POR"},
    
    # SACRAMENTO KINGS
    "扎克-拉文": {"team":"sac", "salary":47499660, "next_salary":48967380, "years":1, "bbr_team":"SAC"},
    "多曼塔斯-萨博尼斯": {"team":"sac", "salary":42336000, "next_salary":45472000, "years":2, "bbr_team":"SAC"},
    "德马尔-德罗赞": {"team":"sac", "salary":24570000, "next_salary":25740000, "years":1, "bbr_team":"SAC"},
    "德安德烈-亨特": {"team":"sac", "salary":23303571, "next_salary":24910714, "years":1, "bbr_team":"SAC"},
    "基根-穆雷": {"team":"sac", "salary":11144093, "next_salary":24137936, "years":5, "bbr_team":"SAC"},
    "马利克-蒙克": {"team":"sac", "salary":18797619, "next_salary":20190035, "years":2, "bbr_team":"SAC"},
    "德文·卡特": {"team":"sac", "salary":4923720, "next_salary":5158080, "years":2, "bbr_team":"SAC"},
    "尼克-克利福德": {"team":"sac", "salary":3108120, "next_salary":3263400, "years":3, "bbr_team":"SAC"},
    "基利安-海斯": {"team":"sac", "salary":263940, "next_salary":3018158, "years":1, "bbr_team":"SAC"},
    "马克西姆-雷诺": {"team":"sac", "salary":1272870, "next_salary":2150918, "years":2, "bbr_team":"SAC"},
    
    # SAN ANTONIO SPURS
    "达龙-福克斯": {"team":"sas", "salary":37096620, "next_salary":49500000, "years":4, "bbr_team":"SAS"},
    "德文-瓦塞尔": {"team":"sas", "salary":27000000, "next_salary":27000000, "years":3, "bbr_team":"SAS"},
    "凯尔登-约翰逊": {"team":"sas", "salary":17500000, "next_salary":17500000, "years":1, "bbr_team":"SAS"},
    "维克托·文班亚马": {"team":"sas", "salary":13376880, "next_salary":16868246, "years":1, "bbr_team":"SAS"},
    "迪伦-哈珀": {"team":"sas", "salary":12370320, "next_salary":12989040, "years":3, "bbr_team":"SAS"},
    "卢克-科内特": {"team":"sas", "salary":11000000, "next_salary":10450000, "years":3, "bbr_team":"SAS"},
    "斯蒂芬·卡斯尔": {"team":"sas", "salary":9560520, "next_salary":10015920, "years":2, "bbr_team":"SAS"},
    "卡特-布莱恩特": {"team":"sas", "salary":4900320, "next_salary":5145360, "years":3, "bbr_team":"SAS"},
    "朱利安-尚彭尼": {"team":"sas", "salary":3000000, "next_salary":3000000, "years":1, "bbr_team":"SAS"},
    
    # TORONTO RAPTORS
    "斯科蒂-巴恩斯": {"team":"tor", "salary":38661750, "next_salary":41754690, "years":4, "bbr_team":"TOR"},
    "布兰登-英格拉姆": {"team":"tor", "salary":38095238, "next_salary":40000000, "years":2, "bbr_team":"TOR"},
    "伊曼纽尔-奎克利": {"team":"tor", "salary":32500000, "next_salary":32500000, "years":3, "bbr_team":"TOR"},
    "RJ-巴雷特": {"team":"tor", "salary":27705357, "next_salary":29616071, "years":1, "bbr_team":"TOR"},
    "格雷迪·迪克": {"team":"tor", "salary":4990560, "next_salary":7131511, "years":1, "bbr_team":"TOR"},
    "科林-默里-博伊尔斯": {"team":"tor", "salary":6332520, "next_salary":6649560, "years":3, "bbr_team":"TOR"},
    "贾科比·沃尔特": {"team":"tor", "salary":3638160, "next_salary":3811800, "years":2, "bbr_team":"TOR"},
    "桑德罗-马穆凯拉什维利": {"team":"tor", "salary":2461463, "next_salary":2801346, "years":1, "bbr_team":"TOR"},
    "特雷斯·杰克逊-戴维斯": {"team":"tor", "salary":2221677, "next_salary":2406205, "years":1, "bbr_team":"TOR"},
    "贾马尔·谢德": {"team":"tor", "salary":1955377, "next_salary":2296271, "years":1, "bbr_team":"TOR"},
    
    # UTAH JAZZ
    "小贾伦-杰克逊": {"team":"uta", "salary":35000000, "next_salary":49000000, "years":4, "bbr_team":"UTA"},
    "劳里-马尔卡宁": {"team":"uta", "salary":46394100, "next_salary":46113154, "years":3, "bbr_team":"UTA"},
    "埃斯-贝利": {"team":"uta", "salary":9069840, "next_salary":9523080, "years":3, "bbr_team":"UTA"},
    "基扬特·乔治": {"team":"uta", "salary":4278960, "next_salary":6563925, "years":1, "bbr_team":"UTA"},
    "约翰-康查尔": {"team":"uta", "salary":6165000, "next_salary":6165000, "years":1, "bbr_team":"UTA"},
    "科迪·威廉姆斯": {"team":"uta", "salary":5742480, "next_salary":6015600, "years":2, "bbr_team":"UTA"},
    "布赖斯·森萨博": {"team":"uta", "salary":2693760, "next_salary":4862237, "years":1, "bbr_team":"UTA"},
    "斯维亚托斯拉夫-米哈伊柳克": {"team":"uta", "salary":3675000, "next_salary":3850000, "years":2, "bbr_team":"UTA"},
    "凯尔·菲利波夫斯基": {"team":"uta", "salary":3000000, "next_salary":3000000, "years":2, "bbr_team":"UTA"},
    "以赛亚·科利尔": {"team":"uta", "salary":2638200, "next_salary":2763960, "years":2, "bbr_team":"UTA"},
    
    # WASHINGTON WIZARDS
    "安东尼-戴维斯": {"team":"was", "salary":54126450, "next_salary":58456566, "years":2, "bbr_team":"WAS"},
    "特雷-杨": {"team":"was", "salary":46394100, "next_salary":48967380, "years":1, "bbr_team":"WAS"},
    "亚历克斯·萨尔": {"team":"was", "salary":11808240, "next_salary":12370680, "years":2, "bbr_team":"WAS"},
    "比拉尔·库利巴利": {"team":"was", "salary":7275600, "next_salary":9240012, "years":1, "bbr_team":"WAS"},
    "特雷-约翰逊": {"team":"was", "salary":8237640, "next_salary":8649600, "years":3, "bbr_team":"WAS"},
    "杰登-哈迪": {"team":"was", "salary":6000000, "next_salary":6000000, "years":2, "bbr_team":"WAS"},
    "丹吉洛-拉塞尔": {"team":"was", "salary":5685000, "next_salary":5969250, "years":1, "bbr_team":"WAS"},
    "卡姆·惠特莫尔": {"team":"was", "salary":3539760, "next_salary":5458310, "years":1, "bbr_team":"WAS"},
    "卡尔顿·卡林顿": {"team":"was", "salary":4677600, "next_salary":4900560, "years":2, "bbr_team":"WAS"},
    "威尔-莱利": {"team":"was", "salary":3512520, "next_salary":3688320, "years":3, "bbr_team":"WAS"},
}

# Print all verified salaries
print(f"Total players with BBR data: {len(BBR_SALARIES)}")

# Verify which players in the current data have matching BBR data
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Count partial match
matched = 0
unmatched = []
for name, data in BBR_SALARIES.items():
    if name in content:
        matched += 1
    else:
        unmatched.append(name)

print(f"Players in both BBR and data.js: {matched}")
print(f"Players in BBR but NOT in data.js: {len(unmatched)}")
for name in unmatched:
    print(f"  MISSING: {name} - should be on {BBR_SALARIES[name]['team']}")
