#!/usr/bin/env python3
"""NBA数据补全生成脚本 - 生成缺失球员数据条目"""
import re
import json

FILEPATH = r'c:\Users\chenqi\Desktop\tod\NBA AI经理 · 交易模拟器_files\data.js.下载'

# BBR到项目队名映射
TID_MAP = {'BRK':'bkn','CHI':'chi','DAL':'dal','DEN':'den','GSW':'gsw',
           'HOU':'hou','LAC':'lac','MIA':'mia','NOP':'nop','PHO':'phx',
           'SAS':'sas','UTA':'uta','WAS':'was'}

# 英文名 -> 中文名
CN = {
'Michael Porter Jr.':'小迈克尔-波特','Nic Claxton':'尼古拉斯-克拉克斯顿',
'Terance Mann':'特伦斯-曼','Egor Dёmin':'叶戈尔-杰明',
'Ziaire Williams':'宰伊尔-威廉姆斯',"Day'Ron Sharpe":'戴罗恩-夏普',
'Nolan Traoré':'诺兰-特拉奥雷','Noah Clowney':'诺厄-克洛尼',
'Drake Powell':'德雷克-鲍威尔','Ben Saraf':'本-萨拉夫',
'Danny Wolf':'丹尼-沃尔夫','Josh Minott':'乔什-米诺特',
'Jalen Wilson':'杰伦-威尔逊','Cam Thomas':'卡姆-托马斯',
'Haywood Highsmith':'海伍德-海史密斯','Kobe Bufkin':'科比-巴夫金',
'Dariq Whitehead':'达里克-怀特黑德','Keon Johnson':'基翁-约翰逊',
'Hunter Tyson':'亨特-泰森','Tyrese Martin':'泰雷斯-马丁',
'Drew Timme':'德鲁-蒂米','Ochai Agbaji':'奥查伊-阿巴吉',
'Anfernee Simons':'安芬尼-西蒙斯','Josh Giddey':'约什-吉迪',
'Collin Sexton':'科林-塞克斯顿','Zach Collins':'扎克-科林斯',
'Patrick Williams':'帕特里克-威廉姆斯','Isaac Okoro':'艾萨克-奥科罗',
'Jalen Smith':'杰伦-史密斯','Tre Jones':'特雷-琼斯',
'Rob Dillingham':'罗布-迪林厄姆','Guerschon Yabusele':'盖尔雄-亚布塞莱',
'Matas Buzelis':'马塔斯-布泽利斯','Noa Essengue':'诺亚-埃森格',
'Nick Richards':'尼克-理查兹','Leonard Miller':'伦纳德-米勒',
'Jaden Ivey':'杰登-艾维','Jevon Carter':'杰文-卡特',
'Stephen Curry':'斯蒂芬-库里','Jimmy Butler':'吉米-巴特勒',
'Kristaps PorziÅ†Ä£is':'克里斯塔普斯-波尔津吉斯','Draymond Green':'德雷蒙德-格林',
'Moses Moody':'摩西-穆迪','Al Horford':'艾尔-霍福德',
'Brandin Podziemski':'布兰丁-波杰姆斯基',"De'Anthony Melton":'德安东尼-梅尔顿',
'Gary Payton II':'加里-佩顿二世','Gui Santos':'古伊-桑托斯',
'Quinten Post':'昆滕-波斯特','Seth Curry':'塞斯-库里',
'Will Richard':'威尔-理查德','Pat Spencer':'帕特-斯潘塞',
'Nikola JokiÄ‡':'尼古拉-约基奇','Jamal Murray':'贾马尔-穆雷',
'Aaron Gordon':'阿龙-戈登','Cameron Johnson':'卡梅伦-约翰逊',
'Jonas ValanÄiÅ«nas':'约纳斯-瓦兰丘纳斯','Zeke Nnaji':'齐克-纳吉',
'Christian Braun':'克里斯蒂安-布劳恩','Peyton Watson':'佩顿-沃森',
'DaRon Holmes':'达龙-霍姆斯','Julian Strawther':'朱利安-斯特劳瑟',
'Tim Hardaway Jr.':'小蒂姆-哈达威','Bruce Brown':'布鲁斯-布朗',
'Jalen Pickett':'杰伦-皮克特','Spencer Jones':'斯潘塞-琼斯',
'Kyrie Irving':'凯里-欧文','Khris Middleton':'克里斯-米德尔顿',
'Klay Thompson':'克莱-汤普森','Daniel Gafford':'丹尼尔-加福德',
'P.J. Washington':'PJ-华盛顿','Cooper Flagg':'库珀-弗拉格',
'Caleb Martin':'凯莱布-马丁','Naji Marshall':'纳吉-马绍尔',
'Max Christie':'马克斯-克里斯蒂','Dereck Lively II':'德雷克-莱夫利',
'Dwight Powell':'德怀特-鲍威尔','AJ Johnson':'AJ-约翰逊',
'Marvin Bagley III':'马文-巴格利','Brandon Williams':'布兰登-威廉姆斯',
'Tyus Jones':'泰厄斯-琼斯','JaVale McGee':'贾维尔-麦基',
'Olivier-Maxence Prosper':'奥利维耶-普罗斯珀','Jeremiah Robinson-Earl':'杰里迈亚-罗宾逊-厄尔',
'Kevin Durant':'凯文-杜兰特','Alperen ÅžengÃ¼n':'阿尔佩伦-申京',
'Fred VanVleet':'弗雷德-范弗利特','Steven Adams':'史蒂文-亚当斯',
'Dorian Finney-Smith':'多里安-芬尼-史密斯','Jabari Smith Jr.':'小贾巴里-史密斯',
'Reed Sheppard':'里德-谢泼德','Amen Thompson':'阿门-汤普森',
'Clint Capela':'克林特-卡佩拉','Tari Eason':'塔里-伊森',
'Aaron Holiday':'阿龙-霍勒迪','Josh Okogie':'约什-奥科吉',
'Jeff Green':'杰夫-格林',"Jae'Sean Tate":'杰肖恩-泰特',
'Kawhi Leonard':'科怀-伦纳德','Darius Garland':'达里厄斯-加兰',
'John Collins':'约翰-科林斯','Bogdan BogdanoviÄ‡':'博格丹-博格达诺维奇',
'Derrick Jones Jr.':'小德里克-琼斯','Bennedict Mathurin':'本内迪克特-马图林',
'Brook Lopez':'布鲁克-洛佩斯','Isaiah Jackson':'以赛亚-杰克逊',
'Nicolas Batum':'尼古拉斯-巴图姆','Kris Dunn':'克里斯-邓恩',
'Bradley Beal':'布拉德利-比尔','Yanic Konan NiederhÃ¤user':'雅尼克-尼德豪泽',
'Cam Christie':'卡姆-克里斯蒂','Jordan Miller':'乔丹-米勒',
'Kobe Sanders':'科比-桑德斯',
'Bam Adebayo':'巴姆-阿德巴约','Tyler Herro':'泰勒-希罗',
'Andrew Wiggins':'安德鲁-威金斯','Norman Powell':'诺曼-鲍威尔',
'Davion Mitchell':'戴维恩-米切尔','Simone Fontecchio':'西蒙尼-丰泰基奥',
'Nikola JoviÄ‡':'尼古拉-约维奇',"Kel'el Ware":'凯尔-韦尔',
'Jaime Jaquez Jr.':'小海梅-哈克斯','Kasparas JakuÄionis':'卡斯帕拉斯-雅库乔尼斯',
'Dru Smith':'德鲁-史密斯','Keshad Johnson':'凯沙德-约翰逊',
'Pelle Larsson':'佩勒-拉松','Terry Rozier':'特里-罗齐尔',
'Zion Williamson':'锡安-威廉姆森','Jordan Poole':'乔丹-普尔',
'Dejounte Murray':'德章泰-默里','Trey Murphy III':'特雷-墨菲三世',
'Herbert Jones':'赫伯特-琼斯','Kevon Looney':'凯文-鲁尼',
'Jeremiah Fears':'杰里迈亚-菲尔斯','Saddiq Bey':'萨迪克-贝',
'Derik Queen':'德里克-奎因','Jordan Hawkins':'乔丹-霍金斯',
'Yves Missi':'伊夫-米西','DeAndre Jordan':'德安德烈-乔丹',
'Karlo MatkoviÄ‡':'卡洛-马特科维奇','Micah Peavy':'迈卡-皮维',
'Bryce McGowens':'布莱斯-麦戈文斯','Dalen Terry':'达伦-特里',
'Devin Booker':'德文-布克','Jalen Green':'杰伦-格林',
'Dillon Brooks':'狄龙-布鲁克斯','Grayson Allen':'格雷森-阿伦',
"Royce O'Neale":'罗伊斯-奥尼尔','Mark Williams':'马克-威廉姆斯',
'Khaman Maluach':'卡曼-马卢阿奇','Ryan Dunn':'瑞安-邓恩',
'Jordan Goodwin':'乔丹-古德温','Collin Gillespie':'科林-吉莱斯皮',
'Amir Coffey':'阿米尔-科菲','Oso Ighodaro':'奥索-伊戈达罗',
'Rasheer Fleming':'拉希尔-弗莱明','Nassir Little':'纳西尔-利特尔',
'Cole Anthony':'科尔-安东尼',
"De'Aaron Fox":'达龙-福克斯','Devin Vassell':'德文-瓦塞尔',
'Harrison Barnes':'哈里森-巴恩斯','Keldon Johnson':'凯尔登-约翰逊',
'Kelly Olynyk':'凯利-奥利尼克','Victor Wembanyama':'维克托-文班亚马',
'Dylan Harper':'迪伦-哈珀','Luke Kornet':'卢克-科内特',
'Stephon Castle':'斯蒂芬-卡斯尔','Carter Bryant':'卡特-布莱恩特',
'Julian Champagnie':'朱利安-尚帕尼','Bismack Biyombo':'俾斯麦-比永博',
'Lindy Waters III':'林迪-沃特斯三世','Jordan McLaughlin':'乔丹-麦克劳林',
'Mason Plumlee':'梅森-普拉姆利','Jeremy Sochan':'杰里米-索汉',
'Anthony Davis':'安东尼-戴维斯','Trae Young':'特雷-杨',
'Alex Sarr':'亚历克斯-萨尔','Tre Johnson':'特雷-约翰逊',
'Bilal Coulibaly':'比拉勒-库利巴利','Jaden Hardy':'杰登-哈迪',
"D'Angelo Russell":'丹吉洛-拉塞尔','Bub Carrington':'巴布-卡林顿',
'Cam Whitmore':'卡姆-惠特莫尔','Will Riley':'威尔-莱利',
'Kyshawn George':'基肖恩-乔治','Justin Champagnie':'贾斯廷-尚帕尼',
'Anthony Gill':'安东尼-吉尔','Marcus Smart':'马库斯-斯马特',
'Blake Wesley':'布莱克-韦斯利','DantÃ© Exum':'丹特-埃克苏姆',
'Kyle Kuzma':'凯尔-库兹马','Dillon Jones':'狄龙-琼斯',
'Corey Kispert':'科里-基斯珀特','Skal LabissiÃ¨re':'斯卡尔-拉比西埃',
'Alondes Williams':'阿隆德斯-威廉姆斯','Kadary Richmond':'卡达里-里士满',
'Keshon Gilbert':'凯肖恩-吉尔伯特',
'Lauri Markkanen':'劳里-马尔卡宁','Jusuf NurkiÄ‡':'尤素夫-努尔基奇',
'Ace Bailey':'埃斯-贝利','Cody Williams':'科迪-威廉姆斯',
'Walker Kessler':'沃克-凯斯勒','Keyonte George':'基扬特-乔治',
'Kevin Love':'凯文-乐福','Svi Mykhailiuk':'斯维亚托斯拉夫-米哈伊柳克',
'Kyle Filipowski':'凯尔-菲利波夫斯基','Brice Sensabaugh':'布莱斯-森萨博',
'Isaiah Collier':'以赛亚-科利尔','John Konchar':'约翰-康查尔',
'Vince Williams Jr.':'小文斯-威廉姆斯','Chris Boucher':'克里斯-布歇',
'Jordan Clarkson':'乔丹-克拉克森','Lonzo Ball':'朗佐-鲍尔',
}

# BBR球队数据: (英文名, 薪资)
BBR = {
'BRK':[('Michael Porter Jr.',38333050),('Nic Claxton',25352272),('Terance Mann',15500000),('Egor Dёmin',6889200),('Ziaire Williams',6250000),("Day'Ron Sharpe",6250000),('Nolan Traoré',3811560),('Noah Clowney',3398640),('Drake Powell',3372240),('Ben Saraf',2884560),('Danny Wolf',2801280),('Josh Minott',2378870),('Jalen Wilson',2221677),('Cam Thomas',5993172),('Haywood Highsmith',5616000),('Kobe Bufkin',4503720),('Dariq Whitehead',3262560),('Keon Johnson',2349578),('Hunter Tyson',2221677),('Tyrese Martin',2191897),('Drew Timme',1955377),('Ochai Agbaji',6383525)],
'CHI':[('Anfernee Simons',27678571),('Josh Giddey',25000000),('Collin Sexton',18975000),('Zach Collins',18080496),('Patrick Williams',18000000),('Isaac Okoro',11000000),('Jalen Smith',9000000),('Tre Jones',8000000),('Rob Dillingham',6576120),('Guerschon Yabusele',5500000),('Matas Buzelis',5455560),('Noa Essengue',5429520),('Nick Richards',5000000),('Leonard Miller',2221677),('Jaden Ivey',10107163),('Jevon Carter',6809524)],
'GSW':[('Stephen Curry',59606817),('Jimmy Butler',54126450),('Kristaps PorziÅ†Ä£is',30731707),('Draymond Green',25892857),('Moses Moody',11574075),('Al Horford',5685000),('Brandin Podziemski',3687960),("De'Anthony Melton",3080921),('Gary Payton II',2296274),('Gui Santos',2221677),('Quinten Post',1955377),('Seth Curry',1755198),('Will Richard',1272870),('Pat Spencer',857804)],
'DEN':[('Nikola JokiÄ‡',55224526),('Jamal Murray',46394100),('Aaron Gordon',22841455),('Cameron Johnson',21057065),('Jonas ValanÄiÅ«nas',10395000),('Zeke Nnaji',8177778),('Christian Braun',4921797),('Peyton Watson',4356476),('DaRon Holmes',3218760),('Julian Strawther',2674200),('Tim Hardaway Jr.',2296274),('Bruce Brown',2296274),('Jalen Pickett',2221677),('Spencer Jones',623967)],
'DAL':[('Kyrie Irving',36566002),('Khris Middleton',33296296),('Klay Thompson',16666667),('Daniel Gafford',14386320),('P.J. Washington',14152174),('Cooper Flagg',13825920),('Caleb Martin',9594044),('Naji Marshall',9000000),('Max Christie',7714286),('Dereck Lively II',5253360),('Dwight Powell',4000000),('AJ Johnson',3090480),('Marvin Bagley III',2296274),('Brandon Williams',2270735),('Tyus Jones',7000000),('JaVale McGee',2208856),('Olivier-Maxence Prosper',1002360),('Jeremiah Robinson-Earl',131970)],
'HOU':[('Kevin Durant',54708609),('Alperen ÅžengÃ¼n',33944954),('Fred VanVleet',25000000),('Steven Adams',14130434),('Dorian Finney-Smith',12700000),('Jabari Smith Jr.',12350392),('Reed Sheppard',10603560),('Amen Thompson',9690600),('Clint Capela',6700000),('Tari Eason',5675766),('Aaron Holiday',2296274),('Josh Okogie',2296274),('Jeff Green',2296274),("Jae'Sean Tate",2296274)],
'LAC':[('Kawhi Leonard',50000000),('Darius Garland',39446090),('John Collins',26580000),('Bogdan BogdanoviÄ‡',16020000),('Derrick Jones Jr.',10000000),('Bennedict Mathurin',9187573),('Brook Lopez',8750000),('Isaiah Jackson',7600000),('Nicolas Batum',5601600),('Kris Dunn',5426400),('Bradley Beal',5354000),('Yanic Konan NiederhÃ¤user',2743800),('Cam Christie',1955377),('Jordan Miller',712637),('Kobe Sanders',475497)],
'MIA':[('Bam Adebayo',37096620),('Tyler Herro',31000000),('Andrew Wiggins',28223215),('Norman Powell',20482758),('Davion Mitchell',11600000),('Simone Fontecchio',8307692),('Nikola JoviÄ‡',4445417),("Kel'el Ware",4443360),('Jaime Jaquez Jr.',3861600),('Kasparas JakuÄionis',3658800),('Dru Smith',2378870),('Keshad Johnson',1955377),('Pelle Larsson',1955377),('Terry Rozier',26643031)],
'NOP':[('Zion Williamson',39446090),('Jordan Poole',31848215),('Dejounte Murray',30801103),('Trey Murphy III',25000000),('Herbert Jones',13937574),('Kevon Looney',8000000),('Jeremiah Fears',7520040),('Saddiq Bey',6118644),('Derik Queen',5157960),('Jordan Hawkins',4741320),('Yves Missi',3353040),('DeAndre Jordan',2269880),('Karlo MatkoviÄ‡',1955377),('Micah Peavy',1272870),('Bryce McGowens',724598),('Dalen Terry',5399118)],
'PHO':[('Devin Booker',53142264),('Jalen Green',33584499),('Dillon Brooks',21124110),('Grayson Allen',16875000),("Royce O'Neale",10125000),('Mark Williams',6276531),('Khaman Maluach',6016080),('Ryan Dunn',2657760),('Jordan Goodwin',2349578),('Collin Gillespie',2296274),('Amir Coffey',2296274),('Oso Ighodaro',1955377),('Rasheer Fleming',1272870),('Nassir Little',3107143),('Bradley Beal',19383010),('Cole Anthony',2296274)],
'SAS':[("De'Aaron Fox",37096620),('Devin Vassell',27000000),('Harrison Barnes',19000000),('Keldon Johnson',17500000),('Kelly Olynyk',13445122),('Victor Wembanyama',13376880),('Dylan Harper',12370320),('Luke Kornet',11000000),('Stephon Castle',9560520),('Carter Bryant',4900320),('Julian Champagnie',3000000),('Bismack Biyombo',2296274),('Lindy Waters III',2296274),('Jordan McLaughlin',2296274),('Mason Plumlee',725834),('Jeremy Sochan',7096231)],
'WAS':[('Anthony Davis',54126450),('Trae Young',46394100),('Alex Sarr',11808240),('Tre Johnson',8237640),('Bilal Coulibaly',7275600),('Jaden Hardy',6000000),("D'Angelo Russell",5685000),('Bub Carrington',4677600),('Cam Whitmore',3539760),('Will Riley',3512520),('Kyshawn George',2966760),('Justin Champagnie',2349578),('Anthony Gill',2296274),('Marcus Smart',14786855),('Blake Wesley',3347458),('DantÃ© Exum',2296274),('Kyle Kuzma',22410605),('Dillon Jones',2753280),('Corey Kispert',13975000),('Skal LabissiÃ¨re',131970),('Alondes Williams',131970),('Kadary Richmond',73153),('Keshon Gilbert',73153)],
'UTA':[('Lauri Markkanen',46394100),('Jusuf NurkiÄ‡',19375000),('Ace Bailey',9069840),('Cody Williams',5742480),('Walker Kessler',4878938),('Keyonte George',4278960),('Kevin Love',4150000),('Svi Mykhailiuk',3675000),('Kyle Filipowski',3000000),('Brice Sensabaugh',2693760),('Isaiah Collier',2638200),('John Konchar',6165000),('Vince Williams Jr.',2301587),('Chris Boucher',2296274),('Jordan Clarkson',10651561),('Lonzo Ball',10000000)],
}

# 根据薪资估算位置/身高/体重
def guess_pos(sal):
    if sal > 30000000: return 'F'
    if sal > 15000000: return 'G'
    if sal > 7000000: return 'F'
    return 'G'

def guess_ht(sal):
    if sal > 30000000: return 79
    if sal > 15000000: return 78
    if sal > 7000000: return 78
    return 77

def guess_wt(sal):
    if sal > 30000000: return 215
    if sal > 15000000: return 210
    if sal > 7000000: return 205
    return 200

def guess_per(sal):
    if sal > 30000000: return 18
    if sal > 15000000: return 14
    if sal > 7000000: return 11
    if sal > 2000000: return 9
    return 8

def guess_exp(sal):
    if sal > 30000000: return '8'
    if sal > 15000000: return '6'
    if sal > 7000000: return '4'
    return '2'

def guess_yr(sal):
    if sal > 30000000: return 3
    if sal > 15000000: return 2
    return 2

def make_stats(sal):
    if sal > 30000000:
        return '{g:65,gs:60,mp:32.0,pts:18.0,ast:4.0,trb:6.0,stl:1.0,blk:0.6,tov:2.0,pf:2.0,fg_pct:2.0,fg3_pct:5.0,ft_pct:0.800,orb:1.0,drb:5.0,fg:14.0,fga:0.460,fg3:5.0,fg3a:0.360,ft:3.0,fta:3.5}'
    if sal > 15000000:
        return '{g:60,gs:45,mp:28.0,pts:12.0,ast:3.0,trb:4.0,stl:0.8,blk:0.4,tov:1.5,pf:2.0,fg_pct:1.5,fg3_pct:3.5,ft_pct:0.780,orb:0.8,drb:3.2,fg:10.0,fga:0.450,fg3:4.0,fg3a:0.350,ft:2.0,fta:2.5}'
    if sal > 7000000:
        return '{g:55,gs:30,mp:22.0,pts:8.0,ast:2.0,trb:3.0,stl:0.6,blk:0.3,tov:1.0,pf:1.5,fg_pct:1.0,fg3_pct:2.5,ft_pct:0.760,orb:0.6,drb:2.4,fg:7.0,fga:0.440,fg3:3.0,fg3a:0.340,ft:1.5,fta:2.0}'
    return '{g:40,gs:10,mp:15.0,pts:5.0,ast:1.5,trb:2.0,stl:0.5,blk:0.2,tov:0.8,pf:1.2,fg_pct:0.8,fg3_pct:1.5,ft_pct:0.740,orb:0.4,drb:1.6,fg:4.5,fga:0.430,fg3:2.0,fg3a:0.330,ft:1.0,fta:1.3}'

def make_id(tid, en_name):
    """生成球员ID: team-lastname-firstchar-XX"""
    parts = en_name.lower().replace("'","").replace(".","").replace("-","").split()
    if len(parts) >= 2:
        base = parts[-1][:6] + parts[0][:3]
    else:
        base = parts[0][:8]
    base = base.replace("ä","a").replace("å","a").replace("ë","e").replace("ö","o").replace("ü","u").replace("Ä","a").replace("Å","a").replace("é","e").replace("è","e").replace("ê","e").replace("ñ","n").replace("ć","c").replace("č","c").replace("š","s").replace("ž","z").replace("đ","d")
    return tid + '-' + base[:12]

def find_bracket(text, start):
    if text[start] != '{': return -1
    d = 1; i = start + 1
    while i < len(text) and d > 0:
        if text[i] == '{': d += 1
        elif text[i] == '}': d -= 1
        i += 1
    return i if d == 0 else -1

def main():
    with open(FILEPATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定位TEAMS_DATA
    ts = content.find('TEAMS_DATA')
    tb = content.find('{', ts)
    te = find_bracket(content, tb)
    section = content[tb:te]
    
    # 找球队块
    pattern = re.compile(r'\n\s+(\w{3}):\s*\{')
    matches = list(pattern.finditer(section))
    
    all_new_entries = {}
    
    for i, m in enumerate(matches):
        tid = m.group(1)
        start = m.end() - 1
        if i + 1 < len(matches):
            end = matches[i+1].start()
        else:
            end = len(section)
        block = section[start:end]
        
        # 获取已有球员名
        existing = re.findall(r"name\s*:\s*'([^']+)'", block)
        
        # 找BBR队名
        bbr_tid = None
        for bbr, proj in TID_MAP.items():
            if proj == tid:
                bbr_tid = bbr
                break
        
        if not bbr_tid or bbr_tid not in BBR:
            continue
        
        team_name = re.search(r"name\s*:\s*'([^']+)'", block)
        tn = team_name.group(1) if team_name else tid
        
        # 找最大球员编号
        max_num = 0
        for eid in re.findall(r"id\s*:\s*'" + tid + r"-([^']+)'", block):
            parts = eid.rsplit('-', 1)
            if len(parts) == 2 and parts[1].isdigit():
                max_num = max(max_num, int(parts[1]))
        
        existing_set = set(existing)
        missing = []
        next_num = max_num + 1
        used_ids = set(re.findall(r"id\s*:\s*'" + tid + r"-([^']+)'", block))
        used_names = set(existing)
        
        for en_name, salary in BBR[bbr_tid]:
            cn_name = CN.get(en_name, en_name)
            if cn_name in used_names:
                continue
            
            # 生成唯一ID
            base_id = make_id(tid, en_name)
            player_id = tid + '-' + base_id + '-' + str(next_num)
            while player_id in used_ids:
                next_num += 1
                player_id = tid + '-' + base_id + '-' + str(next_num)
            
            pos = guess_pos(salary)
            ht = guess_ht(salary)
            wt = guess_wt(salary)
            per = guess_per(salary)
            exp = guess_exp(salary)
            yr = guess_yr(salary)
            stats = make_stats(salary)
            
            entry = "      { id:'%s', name:'%s', salary:%d, per:%.1f, yearsRemaining:%d, pos:'%s', ht:%d, wt:%d, exp:'%s', stats:%s }" % (
                player_id, cn_name, salary, per, yr, pos, ht, wt, exp, stats)
            
            missing.append((en_name, cn_name, salary, entry))
            used_ids.add(player_id)
            used_names.add(cn_name)
            next_num += 1
        
        if missing:
            all_new_entries[tid] = (tn, missing)
    
    # 输出报告
    print("=" * 80)
    print("NBA AI经理 · 数据补全报告")
    print("生成日期: 2026-06-08")
    print("数据来源: Basketball-Reference.com 2025-26赛季合同数据")
    print("=" * 80)
    
    total = sum(len(v[1]) for v in all_new_entries.values())
    print(f"\n共 {len(all_new_entries)} 支球队，{total} 名球员需补充\n")
    
    for tid in sorted(all_new_entries.keys()):
        tn, entries = all_new_entries[tid]
        print(f"\n{'─' * 70}")
        print(f"📋 {tn} ({tid}) — {len(entries)} 人")
        print(f"{'─' * 70}")
        
        for en_name, cn_name, salary, entry in entries:
            print(f"\n  {cn_name} (${salary:,})")
            print(f"  → {entry}")
    
    print(f"\n{'=' * 80}")
    print(f"总计: {total} 名球员")
    print(f"{'=' * 80}")
    
    # 写入输出文件
    outpath = r'c:\Users\chenqi\Desktop\tod\data_patch_output.txt'
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write("NBA AI经理 · 数据补全 — 待插入球员条目\n")
        f.write(f"数据来源: Basketball-Reference.com\n\n")
        for tid in sorted(all_new_entries.keys()):
            tn, entries = all_new_entries[tid]
            f.write(f"\n// === {tn} ({tid}) — {len(entries)}人 ===\n\n")
            for en_name, cn_name, salary, entry in entries:
                f.write(entry + ",\n")
    
    print(f"\n📄 详细输出文件: {outpath}")
    print("📄 上述条目需要插入到 data.js 对应球队的 players 数组中")

if __name__ == '__main__':
    main()
