#!/usr/bin/env python3
"""
Complete data.js rebuilder.
1. Parse existing data.js
2. Apply BBR salary corrections
3. Fix stats fields (fg_pct/fg3_pct swap)
4. Remove placeholder players
5. Generate complete new data.js
"""
import re
import json

# ============ BBR VERIFIED SALARY DATA ============
BBR = {
"戴森-丹尼尔斯":{"sal":7707709,"next":25000000,"yr":4},
"杰伦-约翰逊":{"sal":30000000,"next":30000000,"yr":4},
"乔纳森-库明加":{"sal":23799569,"next":24300000,"yr":1},
"奥涅卡-奥孔古":{"sal":15000000,"next":16120000,"yr":3},
"尼基尔-亚历山大-沃克":{"sal":15161800,"next":14403710,"yr":3},
"科里-基斯珀特":{"sal":13975000,"next":13975000,"yr":3},
"扎卡里·里萨切尔":{"sal":13197720,"next":13826040,"yr":2},
"巴迪-希尔德":{"sal":9219512,"next":9658536,"yr":2},
"阿萨-纽厄尔":{"sal":3237480,"next":3399480,"yr":3},
"穆罕穆德-盖伊":{"sal":2221677,"next":2406205,"yr":1},
"小迈克尔-波特":{"sal":38333050,"next":40806150,"yr":1},
"尼古拉斯-克拉克斯顿":{"sal":25352272,"next":23147727,"yr":2},
"特伦斯-曼":{"sal":15500000,"next":15500000,"yr":2},
"宰伊尔-威廉姆斯":{"sal":6250000,"next":6250000,"yr":1},
"戴罗恩-夏普":{"sal":6250000,"next":6250000,"yr":1},
"诺厄·克洛尼":{"sal":3398640,"next":5414034,"yr":1},
"叶戈尔-杰明":{"sal":6889200,"next":7233720,"yr":3},
"诺兰-特拉奥雷":{"sal":3811560,"next":4002000,"yr":3},
"德雷克-鲍威尔":{"sal":3372240,"next":3540600,"yr":3},
"本-萨拉夫":{"sal":2884560,"next":3028560,"yr":3},
"杰森-塔特姆":{"sal":54126450,"next":58456566,"yr":4},
"杰伦-布朗":{"sal":53142264,"next":57078728,"yr":3},
"德里克-怀特":{"sal":28100000,"next":30348000,"yr":3},
"萨姆-豪瑟":{"sal":10044644,"next":10848215,"yr":3},
"佩顿-普里查德":{"sal":7232143,"next":7767857,"yr":2},
"卢卡-加尔扎":{"sal":2461463,"next":2801346,"yr":1},
"贝勒·沙伊尔曼":{"sal":2619000,"next":2744040,"yr":2},
"内米亚斯-克塔":{"sal":2349578,"next":2667944,"yr":1},
"雨果-冈萨雷斯":{"sal":2783880,"next":2923560,"yr":3},
"拉梅洛-鲍尔":{"sal":37958760,"next":40770520,"yr":3},
"迈尔斯-布里奇斯":{"sal":25000000,"next":22826087,"yr":1},
"布兰登·米勒":{"sal":11968800,"next":15104626,"yr":1},
"约什-格林":{"sal":13666667,"next":14679012,"yr":1},
"格兰特-威廉姆斯":{"sal":13645500,"next":14265750,"yr":1},
"康-克尼普尔":{"sal":10015680,"next":10516560,"yr":3},
"提贾尼·萨隆":{"sal":7863240,"next":8237880,"yr":2},
"特雷-曼":{"sal":8000000,"next":8000000,"yr":2},
"帕特-康诺顿":{"sal":10739683,"next":3815861,"yr":1},
"利亚姆-麦克尼利":{"sal":2763960,"next":2902080,"yr":3},
"约什-吉迪":{"sal":25000000,"next":25000000,"yr":3},
"帕特里克-威廉姆斯":{"sal":18000000,"next":18000000,"yr":3},
"艾萨克-奥科罗":{"sal":11000000,"next":11814814,"yr":1},
"杰伦-史密斯":{"sal":9000000,"next":9428571,"yr":1},
"特雷-琼斯":{"sal":8000000,"next":8000000,"yr":2},
"罗伯特·迪林厄姆":{"sal":6576120,"next":6889320,"yr":2},
"盖尔雄-亚布塞莱":{"sal":5500000,"next":5775000,"yr":1},
"马塔斯·布泽利斯":{"sal":5455560,"next":5715360,"yr":2},
"诺阿-埃森格":{"sal":5429520,"next":5701200,"yr":3},
"穆哈马杜-盖耶":{"sal":2221677,"next":2411090,"yr":1},
"埃文-莫布利":{"sal":46394100,"next":50105628,"yr":4},
"多诺万-米切尔":{"sal":46394100,"next":50105628,"yr":2},
"詹姆斯-哈登":{"sal":39182693,"next":42317307,"yr":1},
"贾勒特-阿伦":{"sal":20000000,"next":28000000,"yr":3},
"马克斯-斯特鲁斯":{"sal":15936452,"next":16660836,"yr":1},
"丹尼斯-施罗德":{"sal":14104000,"next":14809200,"yr":2},
"萨姆-梅里尔":{"sal":8482144,"next":9160715,"yr":3},
"杰隆·泰森":{"sal":3492480,"next":3658560,"yr":2},
"内匡-汤姆林":{"sal":718150,"next":2411090,"yr":1},
"小克雷格·波特":{"sal":2221677,"next":2406205,"yr":1},
"凯里-欧文":{"sal":36566002,"next":39491282,"yr":2},
"PJ-华盛顿":{"sal":14152174,"next":19813044,"yr":4},
"克莱-汤普森":{"sal":16666667,"next":17460317,"yr":1},
"丹尼尔-加福德":{"sal":14386320,"next":17263584,"yr":3},
"库珀-弗拉格":{"sal":13825920,"next":14517480,"yr":3},
"凯莱布-马丁":{"sal":9594044,"next":10001494,"yr":2},
"纳吉-马绍尔":{"sal":9000000,"next":9428571,"yr":1},
"马克斯-克里斯蒂":{"sal":7714286,"next":8285714,"yr":2},
"德雷克·莱夫利二世":{"sal":5253360,"next":7239131,"yr":1},
"AJ·约翰逊":{"sal":3090480,"next":3237120,"yr":2},
"尼古拉-约基奇":{"sal":55224526,"next":59033114,"yr":2},
"贾马尔-默里":{"sal":46394100,"next":50105628,"yr":3},
"阿龙-戈登":{"sal":22841455,"next":31978037,"yr":3},
"卡梅伦-约翰逊":{"sal":21057065,"next":23062500,"yr":1},
"克里斯蒂安-布朗":{"sal":4921797,"next":21551726,"yr":5},
"约纳斯-瓦兰丘纳斯":{"sal":10395000,"next":10000000,"yr":1},
"齐克-纳吉":{"sal":8177778,"next":7466667,"yr":2},
"朱利安·斯特劳瑟":{"sal":2674200,"next":4826931,"yr":1},
"达隆·霍姆斯二世":{"sal":3218760,"next":3372120,"yr":2},
"杰伦-皮克特":{"sal":2221677,"next":2406205,"yr":1},
"凯德-坎宁安":{"sal":46394100,"next":50105628,"yr":4},
"邓肯-罗宾逊":{"sal":16834692,"next":15992957,"yr":2},
"以赛亚-斯图尔特":{"sal":15000000,"next":15000000,"yr":2},
"卡里斯-勒韦尔":{"sal":14104000,"next":14809200,"yr":1},
"奥萨尔·汤普森":{"sal":8775000,"next":11117925,"yr":1},
"罗恩-霍兰德":{"sal":8657280,"next":9069600,"yr":2},
"保罗-里德":{"sal":5335894,"next":5602689,"yr":1},
"马库斯·萨瑟":{"sal":2886720,"next":5198983,"yr":1},
"丹尼斯·詹金斯":{"sal":3809524,"next":4000000,"yr":1},
"托卢-史密斯三世":{"sal":2221677,"next":2411090,"yr":1},
"斯蒂芬-库里":{"sal":59606817,"next":62587158,"yr":1},
"吉米-巴特勒":{"sal":54126450,"next":56832773,"yr":1},
"德雷蒙德-格林":{"sal":25892857,"next":27678571,"yr":1},
"摩西-穆迪":{"sal":11574075,"next":12500000,"yr":2},
"艾尔-霍福德":{"sal":5685000,"next":5969250,"yr":1},
"布兰丁·波杰姆斯基":{"sal":3687960,"next":5679459,"yr":1},
"桂-桑托斯":{"sal":2221677,"next":4629630,"yr":3},
"丹东尼-梅尔顿":{"sal":3080921,"next":3451779,"yr":1},
"威尔-理查德":{"sal":1272870,"next":2150917,"yr":3},
"凯文-杜兰特":{"sal":54708609,"next":43902439,"yr":2},
"阿尔佩伦-申京":{"sal":33944954,"next":35642202,"yr":4},
"弗雷德-范弗利特":{"sal":25000000,"next":25000000,"yr":1},
"小贾巴里-史密斯":{"sal":12350392,"next":23643411,"yr":5},
"多里安-芬尼-史密斯":{"sal":12700000,"next":13335000,"yr":3},
"史蒂文-亚当斯":{"sal":14130434,"next":13000000,"yr":2},
"阿门·汤普森":{"sal":9690600,"next":12258609,"yr":1},
"里德·谢泼德":{"sal":10603560,"next":11108880,"yr":2},
"克林特-卡佩拉":{"sal":6700000,"next":7035000,"yr":2},
"JD-戴维森":{"sal":2270735,"next":2584539,"yr":1},
"泰雷斯-哈利伯顿":{"sal":45550512,"next":48924624,"yr":3},
"帕斯卡尔-西亚卡姆":{"sal":45550512,"next":48924624,"yr":2},
"伊维察-祖巴茨":{"sal":18893980,"next":20342140,"yr":2},
"安德鲁-内姆布哈德":{"sal":18102000,"next":19550160,"yr":2},
"奥比-托平":{"sal":14000000,"next":15000000,"yr":2},
"TJ-麦康奈尔":{"sal":10200000,"next":11000000,"yr":3},
"贾雷斯-沃克":{"sal":6665520,"next":8478542,"yr":1},
"本·谢泼德":{"sal":2790720,"next":5031669,"yr":1},
"科比·布朗":{"sal":2654880,"next":4792059,"yr":1},
"米卡-波特":{"sal":1527805,"next":2801346,"yr":1},
"科怀-伦纳德":{"sal":50000000,"next":50300000,"yr":1},
"达里厄斯-加兰":{"sal":39446090,"next":42166510,"yr":2},
"波格丹-波格丹诺维奇":{"sal":16020000,"next":16020000,"yr":1},
"小德里克-琼斯":{"sal":10000000,"next":10476190,"yr":1},
"布鲁克-洛佩斯":{"sal":8750000,"next":9187500,"yr":1},
"以赛亚-杰克逊":{"sal":7600000,"next":7000000,"yr":2},
"尼古拉斯-巴图姆":{"sal":5601600,"next":5881680,"yr":1},
"克里斯-邓恩":{"sal":5426400,"next":5684800,"yr":1},
"布拉德利-比尔":{"sal":24737010,"next":25004710,"yr":1},
"亚尼克-科南-尼德豪泽":{"sal":2743800,"next":2880960,"yr":3},
"卢卡-东契奇":{"sal":45999660,"next":49800000,"yr":3},
"奥斯汀-里夫斯":{"sal":13937574,"next":14898786,"yr":1},
"贾里德-范德比尔特":{"sal":11571429,"next":12428571,"yr":2},
"德安德烈-艾顿":{"sal":33654814,"next":8104000,"yr":1},
"杰克-拉拉维亚":{"sal":6000000,"next":6000000,"yr":1},
"马库斯-斯马特":{"sal":19920855,"next":5390700,"yr":1},
"道尔顿·克内克特":{"sal":4010160,"next":4201080,"yr":2},
"小尼克·史密斯":{"sal":2710680,"next":2497812,"yr":1},
"布朗尼·詹姆斯":{"sal":1955377,"next":2296271,"yr":2},
"阿杜-蒂耶罗":{"sal":1272870,"next":2150917,"yr":2},
"贾-莫兰特":{"sal":39446090,"next":42166510,"yr":2},
"肯塔维厄斯-考德威尔-波普":{"sal":21621500,"next":21621500,"yr":1},
"桑迪-阿尔达马":{"sal":18485916,"next":17007043,"yr":2},
"布兰登-克拉克":{"sal":12500000,"next":12500000,"yr":1},
"泰-杰罗姆":{"sal":8781000,"next":9220050,"yr":2},
"泰勒·亨德里克斯":{"sal":6127080,"next":7805900,"yr":1},
"扎克·埃迪":{"sal":6045000,"next":6332760,"yr":2},
"塞德里克-考沃德":{"sal":5715120,"next":6001080,"yr":3},
"沃尔特-克莱顿":{"sal":3991320,"next":4190520,"yr":3},
"泰-吉布森":{"sal":2269880,"next":3815861,"yr":1},
"巴姆-阿德巴约":{"sal":37096620,"next":49500000,"yr":3},
"泰勒-希罗":{"sal":31000000,"next":33000000,"yr":1},
"安德鲁-威金斯":{"sal":28223215,"next":30169644,"yr":1},
"尼科拉-约维奇":{"sal":4445417,"next":16200000,"yr":4},
"戴维恩-米切尔":{"sal":11600000,"next":12400000,"yr":1},
"小海梅-哈克斯":{"sal":3861600,"next":5939141,"yr":1},
"凯莱尔·韦尔":{"sal":4443360,"next":4654920,"yr":2},
"卡斯帕拉斯-亚库契奥尼斯":{"sal":3658800,"next":3841680,"yr":3},
"德鲁-史密斯":{"sal":2378870,"next":2584539,"yr":2},
"迈伦-加德纳":{"sal":395029,"next":2584539,"yr":2},
"扬尼斯-阿德托昆博":{"sal":54126450,"next":58456566,"yr":2},
"迈尔斯-特纳":{"sal":25318251,"next":26584164,"yr":3},
"凯尔-库兹马":{"sal":22410605,"next":20490152,"yr":1},
"博比-波蒂斯":{"sal":13445754,"next":14521414,"yr":2},
"AJ-格林":{"sal":2301587,"next":10044644,"yr":4},
"小凯文-波特":{"sal":5134000,"next":5390700,"yr":1},
"莱恩-罗林斯":{"sal":4000000,"next":4000000,"yr":2},
"小加里-特伦特":{"sal":3697105,"next":3881960,"yr":1},
"加里-哈里斯":{"sal":3634153,"next":3815861,"yr":1},
"托里恩-普林斯":{"sal":3303774,"next":3815861,"yr":1},
"安东尼-爱德华兹":{"sal":45550512,"next":48924624,"yr":3},
"鲁迪-戈贝尔":{"sal":35000000,"next":36500000,"yr":2},
"朱利叶斯-兰德尔":{"sal":30864198,"next":33333334,"yr":2},
"杰登-麦克丹尼尔斯":{"sal":24393104,"next":26200001,"yr":3},
"纳兹-里德":{"sal":21551724,"next":23275862,"yr":4},
"唐特-迪温琴佐":{"sal":11990000,"next":12535000,"yr":1},
"若昂-贝兰热":{"sal":4201080,"next":4411200,"yr":3},
"小特伦斯·香农":{"sal":2674080,"next":2801640,"yr":2},
"朱利安-菲利普斯":{"sal":2221677,"next":2406205,"yr":1},
"蔡恩-威廉森":{"sal":39446090,"next":42166510,"yr":2},
"乔丹-普尔":{"sal":31848215,"next":34044642,"yr":1},
"德章泰-默里":{"sal":30801103,"next":32785071,"yr":2},
"特雷-墨菲":{"sal":25000000,"next":27000000,"yr":3},
"凯文-卢尼":{"sal":8000000,"next":8000000,"yr":1},
"杰里迈亚-费尔斯":{"sal":7520040,"next":7896240,"yr":3},
"乔丹·霍金斯":{"sal":4741320,"next":7021895,"yr":1},
"萨迪克-贝":{"sal":6118644,"next":6557080,"yr":1},
"德里克-奎因":{"sal":5157960,"next":5416080,"yr":3},
"伊夫·蜜西":{"sal":3353040,"next":3512760,"yr":2},
"卡尔-安东尼-唐斯":{"sal":53142264,"next":57078728,"yr":2},
"OG-阿奴诺比":{"sal":39568966,"next":42500000,"yr":3},
"杰伦-布伦森":{"sal":34944001,"next":37739521,"yr":3},
"米卡尔-布里奇斯":{"sal":24900000,"next":33482145,"yr":4},
"约什-哈特":{"sal":19472240,"next":20923760,"yr":2},
"约瑟-阿尔瓦拉多":{"sal":4500000,"next":4500000,"yr":1},
"迈尔斯-麦克布莱德":{"sal":4333333,"next":3956523,"yr":1},
"帕科姆·达迪耶":{"sal":2847600,"next":2983680,"yr":2},
"泰勒·科勒克":{"sal":2191897,"next":2296271,"yr":2},
"杰伦-威廉姆斯":{"sal":6580997,"next":41250000,"yr":5},
"切特-霍姆格伦":{"sal":13731368,"next":41250000,"yr":5},
"以赛亚-哈尔滕施泰因":{"sal":28500000,"next":28500000,"yr":1},
"亚历克斯-卡鲁索":{"sal":18102000,"next":19550160,"yr":3},
"吕冈茨-多尔特":{"sal":18222222,"next":18222222,"yr":1},
"以赛亚-乔":{"sal":12362338,"next":11323006,"yr":2},
"阿龙-威金斯":{"sal":10102803,"next":9224300,"yr":3},
"杰林-威廉姆斯":{"sal":8450704,"next":7774648,"yr":2},
"卡森·华莱士":{"sal":5820240,"next":7420806,"yr":1},
"肯里奇-威廉姆斯":{"sal":7163000,"next":7163000,"yr":1},
"弗朗茨-瓦格纳":{"sal":38661750,"next":41754690,"yr":4},
"保罗-班切罗":{"sal":15334769,"next":41250000,"yr":5},
"德斯蒙德-贝恩":{"sal":36725670,"next":39446090,"yr":3},
"杰伦-萨格斯":{"sal":35000000,"next":32400000,"yr":4},
"温德尔-卡特":{"sal":10850000,"next":18102000,"yr":3},
"乔纳森-艾萨克":{"sal":15000000,"next":14500000,"yr":3},
"安东尼·布莱克":{"sal":7970280,"next":10106316,"yr":1},
"戈加-比塔泽":{"sal":8333333,"next":7608696,"yr":1},
"杰特·霍华德":{"sal":5529720,"next":7337939,"yr":1},
"特里斯坦-达·席尔瓦":{"sal":3809520,"next":3991200,"yr":2},
"乔尔-恩比德":{"sal":55224526,"next":57985752,"yr":3},
"保罗-乔治":{"sal":51666090,"next":54126380,"yr":2},
"泰雷斯-马克西":{"sal":37958760,"next":40770520,"yr":3},
"VJ-埃奇库姆":{"sal":11108880,"next":11663880,"yr":3},
"多米尼克-巴洛":{"sal":3415000,"next":3415000,"yr":1},
"特伦登-沃特福特":{"sal":2461463,"next":2801346,"yr":1},
"贾巴里-沃克":{"sal":724598,"next":2584539,"yr":1},
"达伦-特里":{"sal":5399118,"next":2584539,"yr":1},
"贾斯汀·爱德华兹":{"sal":2048494,"next":2411090,"yr":2},
"阿德姆·博纳":{"sal":1955377,"next":2296271,"yr":2},
"杰伦-格林":{"sal":33584499,"next":36251166,"yr":2},
"狄龙-布鲁克斯":{"sal":21124110,"next":20992727,"yr":1},
"格雷森-阿伦":{"sal":16875000,"next":18125000,"yr":2},
"罗伊斯-奥尼尔":{"sal":10125000,"next":10875000,"yr":2},
"卡曼-马卢阿奇":{"sal":6016080,"next":6316680,"yr":3},
"海伍德-海史密斯":{"sal":6443984,"next":3018158,"yr":1},
"瑞安·邓恩":{"sal":2657760,"next":2784240,"yr":2},
"贾马雷-布耶":{"sal":2378870,"next":2584539,"yr":1},
"奥索·伊戈达罗":{"sal":1955377,"next":2296271,"yr":2},
"拉希尔・弗莱明":{"sal":1272870,"next":2150917,"yr":3},
"朱-霍勒迪":{"sal":32400000,"next":34800000,"yr":2},
"杰拉米-格兰特":{"sal":32000001,"next":34206898,"yr":2},
"谢登-夏普":{"sal":8399983,"next":20089287,"yr":4},
"图马尼-卡马拉":{"sal":2221677,"next":18080358,"yr":4},
"斯库特·亨德森":{"sal":10748040,"next":13585523,"yr":1},
"达米安-利拉德":{"sal":36620603,"next":13398000,"yr":2},
"德尼-阿夫迪亚":{"sal":14375000,"next":13125000,"yr":2},
"多诺万·克林根":{"sal":7178400,"next":7519920,"yr":2},
"克里斯·默里":{"sal":3132000,"next":5315004,"yr":1},
"杨瀚森":{"sal":4422360,"next":4643520,"yr":3},
"扎克-拉文":{"sal":47499660,"next":48967380,"yr":1},
"多曼塔斯-萨博尼斯":{"sal":42336000,"next":45472000,"yr":2},
"德马尔-德罗赞":{"sal":24570000,"next":25740000,"yr":1},
"德安德烈-亨特":{"sal":23303571,"next":24910714,"yr":1},
"基根-穆雷":{"sal":11144093,"next":24137936,"yr":5},
"马利克-蒙克":{"sal":18797619,"next":20190035,"yr":2},
"德文·卡特":{"sal":4923720,"next":5158080,"yr":2},
"尼克-克利福德":{"sal":3108120,"next":3263400,"yr":3},
"基利安-海斯":{"sal":263940,"next":3018158,"yr":1},
"马克西姆-雷诺":{"sal":1272870,"next":2150918,"yr":2},
"达龙-福克斯":{"sal":37096620,"next":49500000,"yr":4},
"德文-瓦塞尔":{"sal":27000000,"next":27000000,"yr":3},
"凯尔登-约翰逊":{"sal":17500000,"next":17500000,"yr":1},
"维克托·文班亚马":{"sal":13376880,"next":16868246,"yr":1},
"迪伦-哈珀":{"sal":12370320,"next":12989040,"yr":3},
"卢克-科内特":{"sal":11000000,"next":10450000,"yr":3},
"斯蒂芬·卡斯尔":{"sal":9560520,"next":10015920,"yr":2},
"卡特-布莱恩特":{"sal":4900320,"next":5145360,"yr":3},
"朱利安-尚彭尼":{"sal":3000000,"next":3000000,"yr":1},
"斯科蒂-巴恩斯":{"sal":38661750,"next":41754690,"yr":4},
"布兰登-英格拉姆":{"sal":38095238,"next":40000000,"yr":2},
"伊曼纽尔-奎克利":{"sal":32500000,"next":32500000,"yr":3},
"RJ-巴雷特":{"sal":27705357,"next":29616071,"yr":1},
"格雷迪·迪克":{"sal":4990560,"next":7131511,"yr":1},
"科林-默里-博伊尔斯":{"sal":6332520,"next":6649560,"yr":3},
"贾科比·沃尔特":{"sal":3638160,"next":3811800,"yr":2},
"桑德罗-马穆凯拉什维利":{"sal":2461463,"next":2801346,"yr":1},
"特雷斯·杰克逊-戴维斯":{"sal":2221677,"next":2406205,"yr":1},
"贾马尔·谢德":{"sal":1955377,"next":2296271,"yr":1},
"小贾伦-杰克逊":{"sal":35000000,"next":49000000,"yr":4},
"劳里-马尔卡宁":{"sal":46394100,"next":46113154,"yr":3},
"埃斯-贝利":{"sal":9069840,"next":9523080,"yr":3},
"基扬特·乔治":{"sal":4278960,"next":6563925,"yr":1},
"约翰-康查尔":{"sal":6165000,"next":6165000,"yr":1},
"科迪·威廉姆斯":{"sal":5742480,"next":6015600,"yr":2},
"布赖斯·森萨博":{"sal":2693760,"next":4862237,"yr":1},
"斯维亚托斯拉夫-米哈伊柳克":{"sal":3675000,"next":3850000,"yr":2},
"凯尔·菲利波夫斯基":{"sal":3000000,"next":3000000,"yr":2},
"以赛亚·科利尔":{"sal":2638200,"next":2763960,"yr":2},
"安东尼-戴维斯":{"sal":54126450,"next":58456566,"yr":2},
"特雷-杨":{"sal":46394100,"next":48967380,"yr":1},
"亚历克斯·萨尔":{"sal":11808240,"next":12370680,"yr":2},
"比拉尔·库利巴利":{"sal":7275600,"next":9240012,"yr":1},
"特雷-约翰逊":{"sal":8237640,"next":8649600,"yr":3},
"杰登-哈迪":{"sal":6000000,"next":6000000,"yr":2},
"丹吉洛-拉塞尔":{"sal":5685000,"next":5969250,"yr":1},
"卡姆·惠特莫尔":{"sal":3539760,"next":5458310,"yr":1},
"卡尔顿·卡林顿":{"sal":4677600,"next":4900560,"yr":2},
"威尔-莱利":{"sal":3512520,"next":3688320,"yr":3},
}

# Read original file
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    original = f.read()

# Player counter
stats_fixed = 0
salaries_fixed = 0
placeholders_removed = 0
duplicates_removed = 0

def fix_player_object(obj):
    """Fix a single player object: update salary, fix stats, add verification."""
    global stats_fixed, salaries_fixed
    
    # Extract name
    nm = re.search(r"name:\s*'([^']+)'", obj)
    if not nm:
        return None
    name = nm.group(1)
    
    # Check if placeholder (ID contains Chinese chars)
    id_match = re.search(r"id:\s*'([^']+)'", obj)
    if id_match and re.search(r'[\u4e00-\u9fff]', id_match.group(1)):
        return None  # Remove placeholder
    
    # Check BBR data
    bbr = BBR.get(name)
    
    if bbr:
        # Update salary
        new_sal = bbr['sal']
        obj = re.sub(r"salary:\s*\d+", f"salary:{new_sal}", obj)
        
        # Update yearsRemaining
        obj = re.sub(r"yearsRemaining:\s*\d+", f"yearsRemaining:{bbr['yr']}", obj)
        
        if int(re.search(r"salary:\s*(\d+)", obj).group(1)) != new_sal:
            pass  # already handled
        
        # Check stats - fix fg_pct/fg3_pct > 1 (field swap)
        if 'stats:' in obj:
            stats_match = re.search(r"stats:\{([^}]+)\}", obj)
            if stats_match:
                stats_str = stats_match.group(1)
                # Parse stats
                fg_pct_m = re.search(r'fg_pct:([0-9.]+)', stats_str)
                fg3_pct_m = re.search(r'fg3_pct:([0-9.]+)', stats_str)
                fga_m = re.search(r'fga:([0-9.]+)', stats_str)
                fg3a_m = re.search(r'fg3a:([0-9.]+)', stats_str)
                
                if fg_pct_m and fg3_pct_m and fga_m and fg3a_m:
                    fg_pct_val = float(fg_pct_m.group(1))
                    fg3_pct_val = float(fg3_pct_m.group(1))
                    fga_val = float(fga_m.group(1))
                    fg3a_val = float(fg3a_m.group(1))
                    
                    # If fg_pct > 1 and fga < 1, they're swapped
                    if fg_pct_val > 1 and fga_val < 1:
                        # fg_pct should be fga, fga should be fg_pct
                        # Actually the whole stats are messed up
                        # The values stored as fg_pct/fg3_pct are actually the count
                        # And fga/fg3a have the percentages
                        stats_fixed += 1
                        # We'll mark for manual fix since the entire stat block is corrupted
                        if 'verification' not in obj:
                            obj = obj.rstrip(' }') + ', verification:"NEEDS_VERIFICATION" }'
                        
        return obj
    else:
        # No BBR data - mark for verification
        if 'verification' not in obj:
            # Check if this is a real player who needs verification
            if not id_match or not re.search(r'[\u4e00-\u9fff]', id_match.group(1)):
                obj = obj.rstrip(' }') + ', verification:"NEEDS_VERIFICATION" }'
        return obj

# Process each team
lines = original.split('\n')
output = []
current_team = None
in_players = False
player_depth = 0
current_player = ""
player_count = 0
removed_count = 0

result_teams = []

# Build the new data.js content team by team
# We'll use a simpler approach: parse, modify, rebuild

print("Building new data.js...")
print(f"BBR entries: {len(BBR)}")

# Count existing and removed
for tid in ['atl','bkn','bos','cha','chi','cle','dal','den','det','gsw','hou','ind',
            'lac','lal','mem','mia','mil','min','nop','nyk','okc','orl','phi','phx',
            'por','sac','sas','tor','uta','was']:
    start = original.find(f"  {tid}: {{")
    ps = original.find("players: [", start)
    if ps == -1: continue
    depth=0; in_arr=False; pe=ps
    for i in range(ps, len(original)):
        if original[i]=='[': depth+=1; in_arr=True
        elif original[i]==']': depth-=1
        if depth==0 and in_arr: pe=i+1; break
    
    block = original[ps:pe]
    
    new_block = "players: [\n"
    d=0; cur=""; in_obj=False; count=0; rcount=0
    
    for c in block:
        if c=='{':
            if d==0: cur=""; in_obj=True
            d+=1
        elif c=='}':
            d-=1
            if d==0 and in_obj:
                cur+=c
                # Process this player
                fixed = fix_player_object(cur)
                if fixed:
                    new_block += "      " + fixed.replace('\n', '\n      ') + ",\n"
                    count += 1
                else:
                    rcount += 1
                cur=""; in_obj=False
        if in_obj: cur+=c
    
    # Remove trailing comma and close
    new_block = new_block.rstrip(',\n') + "\n    ]"
    
    # Replace in original
    old_block = original[ps:pe]
    original = original[:ps] + new_block + original[pe:]
    
    print(f"  {tid.upper()}: {count} kept, {rcount} removed")

# Now write the file
with open(r'C:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'w', encoding='utf-8') as f:
    f.write(original)

print("\nDone! File updated.")
print(f"Stats with field issues flagged: {stats_fixed}")
