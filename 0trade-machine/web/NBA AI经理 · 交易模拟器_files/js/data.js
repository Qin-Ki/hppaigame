var TEAMS_DATA = {

  atl: {
    id:'atl',
    name:'亚特兰大老鹰',  
    shortName:'老鹰',  
    conference:'east',  
    color:'#C8102E',  
    accent:'#FDB927',  
    overTaxLine:0,
    capRoom:1931029,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'atl-jalenjoh-1',name:'杰伦-约翰逊',img:'https://i3.hoopchina.com.cn/editor/2fa9411bec16b75ae9419324b01d138d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:30000000,per:16.8,yearsRemaining:4,pos:'SF',ht:80,wt:219,exp:'4',salary_2026_27:30000000,salary_2027_28:30000000,salary_2028_29:30000000,salary_2029_30:30000000,stats:{g:72,gs:72,mp:35.2,pts:22.5,ast:7.9,trb:10.3,stl:1.2,blk:0.4,tov:3.4,pf:2.1,fg_pct:0.489,fg3_pct:0.352,ft_pct:0.788,orb:1.4,drb:8.9,fg:17.1,fga:1.7,fg3:4.7,fg3a:6.7,ft:4.2,fta:5.3}},
      {id:'atl-dysondan-2',name:'戴森-丹尼尔斯',img:'https://i3.hoopchina.com.cn/editor/5429252f108e272ac53c0ad7aa3102a9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7707709,per:14.7,yearsRemaining:4,pos:'SG',ht:79,wt:199,exp:'3',salary_2026_27:25000000,salary_2027_28:25000000,salary_2028_29:25000000,salary_2029_30:25000000,stats:{g:76,gs:76,mp:33.2,pts:11.9,ast:5.9,trb:6.8,stl:2,blk:0.4,tov:1.8,pf:2.2,fg_pct:0.3,fg3_pct:0.188,ft_pct:0.615,orb:2.4,drb:4.4,fg:10.2,fga:0.517,fg3:1.5,fg3a:5,ft:1,fta:1.6}},
      {id:'atl-jonathan-3',name:'乔纳森-库明加',img:'https://i3.hoopchina.com.cn/editor/2c5073124d4f540dadf109e019d1307e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:23799569,per:14.3,yearsRemaining:1,pos:'PF',ht:79,wt:225,exp:'4',salary_2026_27:24300000,stats:{g:16,gs:1,mp:22.1,pts:12.3,ast:2.1,trb:5.3,stl:0.9,blk:0.3,tov:1.3,pf:1.4,fg_pct:0.476,fg3_pct:0.346,ft_pct:0.702,orb:1.3,drb:4.1,fg:9.1,fga:1.1,fg3:3.3,fg3a:3.2,ft:2.5,fta:3.6}},
      {id:'atl-onyekaok-4',name:'奥涅卡-奥孔古',img:'https://i11.hoopchina.com.cn/editor/39b9df4fbcf1be7bcb321014e32c03cc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:15000000,per:10.6,yearsRemaining:3,pos:'C',ht:82,wt:240,exp:'5',salary_2026_27:16120000,salary_2027_28:16880000,stats:{g:74,gs:63,mp:31,pts:15.2,ast:3.1,trb:7.6,stl:1.1,blk:1.1,tov:1.7,pf:3.3,fg_pct:0.48,fg3_pct:0.376,ft_pct:0.757,orb:1.9,drb:5.7,fg:11.6,fga:1.9,fg3:5.2,fg3a:3.6,ft:2.1,fta:2.7}},
      {id:'atl-nickeila-5',name:'尼基尔-亚历山大-沃克',img:'https://i11.hoopchina.com.cn/editor/dca0f074c223d1b656c3931d76a37568_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:15161800,per:12.4,yearsRemaining:3,pos:'SG',ht:77,wt:205,exp:'6',salary_2026_27:14403710,salary_2027_28:15161800,salary_2028_29:15919890,stats:{g:78,gs:71,mp:33.4,pts:20.8,ast:3.7,trb:3.4,stl:1.3,blk:0.5,tov:2.1,pf:2.2,fg_pct:0.459,fg3_pct:0.399,ft_pct:0.902,orb:0.7,drb:2.8,fg:15.3,fga:3.2,fg3:8.1,fg3a:3.8,ft:3.6,fta:3.9}},
      {id:'atl-coreykis-6',name:'科里-基斯珀特',img:'https://i1.hoopchina.com.cn/editor/c01afbd404c6f06e9825315e995935db_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:13975000,per:10.8,yearsRemaining:3,pos:'SF',ht:78,wt:224,exp:'4',salary_2026_27:13975000,salary_2027_28:13050000,salary_2028_29:13050000,stats:{g:39,gs:8,mp:18.2,pts:9.2,ast:1.5,trb:2.3,stl:0.2,blk:0.2,tov:0.8,pf:1,fg_pct:0.455,fg3_pct:0.354,ft_pct:0.81,orb:0.5,drb:1.7,fg:7.1,fga:1.5,fg3:4.1,fg3a:1.7,ft:1.3,fta:1.6}},
      {id:'atl-zacchari-7',name:'扎卡里·里萨切尔',img:'https://i1.hoopchina.com.cn/editor/6dfafb3d4e7efb98b1610d2ac541bd2a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:13197720,per:11.4,yearsRemaining:2,pos:'SF',ht:80,wt:200,exp:'1',salary_2026_27:13826040,salary_2027_28:17434637,stats:{g:67,gs:46,mp:22.4,pts:9.6,ast:1.1,trb:3.8,stl:0.9,blk:0.5,tov:0.9,pf:2.2,fg_pct:0.455,fg3_pct:0.368,ft_pct:0.644,orb:1.1,drb:2.8,fg:8,fga:1.4,fg3:3.9,fg3a:2.2,ft:0.9,fta:1.3}},
      {id:'atl-buddyhie-8',name:'巴迪-希尔德',img:'https://i11.hoopchina.com.cn/editor/e3a88282741e9a565dfdc6fc315b5cc0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:9219512,per:9.7,yearsRemaining:2,pos:'SG',ht:76,wt:220,exp:'9',salary_2026_27:9658536,salary_2027_28:10097560,stats:{g:7,gs:0,mp:7.3,pts:5.1,ast:0.7,trb:1.1,stl:0.3,blk:0,tov:0.9,pf:0.1,fg_pct:1,fg3_pct:0.9,ft_pct:1,orb:0.1,drb:1,fg:3.9,fga:0.481,fg3:2.4,fg3a:0.412,ft:0.4,fta:0.4}},
      {id:'atl-asanewel-9',name:'阿萨-纽厄尔',img:'https://i10.hoopchina.com.cn/editor/88d0fc1111c07e4714fe1e9de6f14fa5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3237480,per:9.1,yearsRemaining:3,pos:'PF',ht:82,wt:220,exp:'R',salary_2026_27:3399480,salary_2027_28:3560880,salary_2028_29:6042814,stats:{g:44,gs:2,mp:11.4,pts:5.2,ast:0.6,trb:2.2,stl:0.4,blk:0.3,tov:0.5,pf:1.5,fg_pct:0.7,fg3_pct:0.387,ft_pct:0.552,orb:1,drb:1.2,fg:3.8,fga:0.538,fg3:1.7,fg3a:1.4,ft:0.4,fta:0.7}},
      {id:'atl-mouhamed-10',name:'穆罕穆德-盖伊',img:'',salary:2221677,per:10.7,yearsRemaining:1,pos:'PF',ht:83,wt:210,exp:'2',salary_2026_27:2406205,stats:{g:77,gs:8,mp:15.3,pts:4.4,ast:0.9,trb:3.6,stl:0.8,blk:0.5,tov:0.4,pf:1.6,fg_pct:0.5,fg3_pct:0.308,ft_pct:0.645,orb:1.2,drb:2.4,fg:3.8,fga:0.452,fg3:1.7,fg3a:1.2,ft:0.5,fta:0.8}},
      {id:'atl-cjmccoll-105',name:'CJ McCollum',img:'https://i10.hoopchina.com.cn/editor/b721242d9172edd4e3f67b58286b1bb5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:30666666,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-gabevinc-106',name:'Gabe Vincent',img:'https://i11.hoopchina.com.cn/editor/9e98258743c77f246ed5cb84df670055_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:11500000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-keatonwa-107',name:'Keaton Wallace',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-jockland-108',name:'Jock Landale',img:'https://i11.hoopchina.com.cn/editor/70156838d6614534caf4ac050e0a1882_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-duopreat-109',name:'Duop Reath',img:'',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-nfalydan-110',name:'N\'Faly Dante',salary:2048494,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-nikoladj-111',name:'Nikola Djurisic',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'atl-calebhou-112',name:'Caleb Houstan',img:'',salary:699440,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  bkn: {
    id:'bkn',
    name:'布鲁克林篮网',  
    shortName:'篮网',  
    conference:'east',  
    color:'#000000',  
    accent:'#FFFFFF',  
    overTaxLine:0,
    capRoom:39654198,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'bkn-michaelp-11',name:'小迈克尔-波特',img:'',salary:38333050,per:17.6,yearsRemaining:1,pos:'SF',ht:82,wt:218,exp:'6',salary_2026_27:40806150,stats:{g:52,gs:52,mp:32.5,pts:24.2,ast:3,trb:7.1,stl:1.1,blk:0.3,tov:2.3,pf:2.2,fg_pct:0.463,fg3_pct:0.363,ft_pct:0.859,orb:1.3,drb:5.7,fg:18.4,fga:3.4,fg3:9.3,fg3a:5.2,ft:3.8,fta:4.4}},
      {id:'bkn-terancem-13',name:'特伦斯-曼',img:'',salary:15500000,per:10.2,yearsRemaining:2,pos:'SG',ht:78,wt:215,exp:'6',salary_2026_27:15500000,salary_2027_28:16000000,stats:{g:63,gs:51,mp:24.3,pts:7.2,ast:3,trb:3.2,stl:0.7,blk:0.2,tov:1.1,pf:2.5,fg_pct:0.9,fg3_pct:0.364,ft_pct:0.788,orb:1.1,drb:2.1,fg:5.8,fga:0.457,fg3:2.4,fg3a:1.8,ft:1,fta:1.3}},
      {id:'bkn-ziairewi-15',name:'宰伊尔-威廉姆斯',img:'',salary:6250000,per:8.7,yearsRemaining:1,pos:'SF',ht:81,wt:185,exp:'4',salary_2026_27:6250000,stats:{g:56,gs:13,mp:22.9,pts:10.2,ast:1.1,trb:2.4,stl:1.4,blk:0.4,tov:1.1,pf:2.1,fg_pct:0.425,fg3_pct:0.343,ft_pct:0.85,orb:0.5,drb:1.9,fg:7.7,fga:1.5,fg3:4.5,fg3a:1.8,ft:2.1,fta:2.5}},
      {id:'bkn-dayronsh-16',name:'戴罗恩-夏普',img:'',salary:6250000,per:10.6,yearsRemaining:1,pos:'C',ht:82,wt:265,exp:'4',salary_2026_27:6250000,stats:{g:62,gs:7,mp:18.7,pts:8.7,ast:2.3,trb:6.7,stl:1.1,blk:0.4,tov:1.7,pf:2.4,fg_pct:0.1,fg3_pct:0.231,ft_pct:0.678,orb:2.8,drb:3.9,fg:5.7,fga:0.601,fg3:0.6,fg3a:3.3,ft:1.7,fta:2.5}},
      {id:'bkn-noahclow-17',name:'诺厄·克洛尼',img:'',salary:3398640,per:8.6,yearsRemaining:1,pos:'PF',ht:82,wt:210,exp:'2',salary_2026_27:5414034,stats:{g:66,gs:60,mp:27,pts:12.3,ast:1.6,trb:4.1,stl:0.8,blk:0.7,tov:1.5,pf:2.5,fg_pct:0.396,fg3_pct:0.329,ft_pct:0.804,orb:0.8,drb:3.3,fg:9.6,fga:2,fg3:5.9,fg3a:1.8,ft:2.7,fta:3.4}},
      {id:'bkn-nolantra-18',name:'诺兰-特拉奥雷',img:'',salary:3811560,per:11.9,yearsRemaining:3,pos:'PG',ht:75,wt:185,exp:'0',salary_2026_27:4002000,salary_2027_28:4193040,salary_2028_29:6457282},
      {id:'bkn-drakepow-19',name:'德雷克-鲍威尔',img:'',salary:3372240,per:9.7,yearsRemaining:3,pos:'SG',ht:77,wt:195,exp:'R',salary_2026_27:3540600,salary_2027_28:3709320,salary_2028_29:6101832,stats:{g:63,gs:24,mp:21,pts:6.5,ast:1.4,trb:1.8,stl:0.6,blk:0.2,tov:1,pf:1.4,fg_pct:0.8,fg3_pct:0.28,ft_pct:0.896,orb:0.3,drb:1.4,fg:5.7,fga:0.402,fg3:2.9,fg3a:1.5,ft:1.1,fta:1.2}},
      {id:'bkn-bensaraf-20',name:'本-萨拉夫',img:'',salary:2884560,per:10.4,yearsRemaining:3,pos:'SG',ht:78,wt:200,exp:'R',salary_2026_27:3028560,salary_2027_28:3172920,salary_2028_29:5720776,stats:{g:44,gs:11,mp:20.8,pts:7.5,ast:3.3,trb:2.1,stl:0.9,blk:0.2,tov:2.3,pf:1.8,fg_pct:0.4,fg3_pct:0.211,ft_pct:0.83,orb:0.5,drb:1.6,fg:6.9,fga:0.396,fg3:2,fg3a:2.3,ft:1.7,fta:2}},
      {id:'bkn-nicclaxt-105',name:'Nic Claxton',img:'',salary:25352272,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:23147727,salary_2027_28:20943184},
      {id:'bkn-egordmin-106',name:'Egor Dёmin',img:'',salary:6889200,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:7233720,salary_2027_28:7578240,salary_2028_29:9639522},
      {id:'bkn-ochaiagb-107',name:'Ochai Agbaji',img:'',salary:6383525,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-camthoma-108',name:'Cam Thomas',img:'',salary:6837779,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-haywoodh-109',name:'Haywood Highsmith',img:'',salary:6443984,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3018158},
      {id:'bkn-kobebufk-110',name:'Kobe Bufkin',img:'',salary:5480297,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-dariqwhi-111',name:'Dariq Whitehead',img:'',salary:3262560,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-dannywol-112',name:'Danny Wolf',img:'',salary:2801280,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2941440,salary_2027_28:3081840,salary_2028_29:5559640},
      {id:'bkn-joshmino-113',name:'Josh Minott',img:'',salary:2378870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2584539},
      {id:'bkn-keonjohn-114',name:'Keon Johnson',img:'',salary:2349578,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-hunterty-115',name:'Hunter Tyson',img:'',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-jalenwil-116',name:'Jalen Wilson',img:'',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-tyresema-117',name:'Tyrese Martin',img:'',salary:2191897,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-drewtimm-118',name:'Drew Timme',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-trescott-119',name:'Tre Scott',img:'',salary:129503,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-malachis-120',name:'Malachi Smith',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bkn-grantnel-121',name:'Grant Nelson',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  bos: {
    id:'bos',
    name:'波士顿凯尔特人',  
    shortName:'凯尔特人',  
    conference:'east',  
    color:'#007A33',  
    accent:'#BA9653',  
    overTaxLine:0,
    capRoom:-23437602,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'bos-jaysonta-21',name:'杰森-塔特姆',img:'https://i10.hoopchina.com.cn/editor/a740c26266a97955ac5d30500394df2f_w_1040_h_760_.png',salary:54126450,per:19.8,yearsRemaining:4,pos:'PF',ht:80,wt:210,exp:'8',salary_2026_27:58456566,salary_2027_28:62786682,salary_2028_29:67116798,salary_2029_30:71446914,stats:{g:16,gs:16,mp:32.6,pts:21.8,ast:5.3,trb:10,stl:1.4,blk:0.2,tov:2.4,pf:1.6,fg_pct:0.411,fg3_pct:0.329,ft_pct:0.823,orb:0.5,drb:9.5,fg:17.9,fga:2.9,fg3:8.9,fg3a:4.4,ft:4.1,fta:4.9}},
      {id:'bos-jaylenbr-22',name:'杰伦-布朗',img:'',salary:53142264,per:21.3,yearsRemaining:3,pos:'SF',ht:78,wt:223,exp:'9',salary_2026_27:57078728,salary_2027_28:61015192,salary_2028_29:64951656,stats:{g:71,gs:71,mp:34.4,pts:28.7,ast:5.1,trb:6.9,stl:1,blk:0.4,tov:3.6,pf:2.7,fg_pct:0.477,fg3_pct:0.347,ft_pct:0.795,orb:1.1,drb:5.8,fg:21.7,fga:2,fg3:5.7,fg3a:8.4,ft:6,fta:7.5}},
      {id:'bos-derrickw-23',name:'德里克-怀特',img:'https://i11.hoopchina.com.cn/editor/7c4868a6d30642d45f1b263a9a9f64f6_w_1040_h_760_.png',salary:28100000,per:17.6,yearsRemaining:3,pos:'SG',ht:76,wt:190,exp:'8',salary_2026_27:30348000,salary_2027_28:32596000,salary_2028_29:34844000,stats:{g:77,gs:77,mp:34.1,pts:16.5,ast:5.4,trb:4.4,stl:1.1,blk:1.3,tov:1.7,pf:1.5,fg_pct:0.394,fg3_pct:0.327,ft_pct:0.902,orb:1.1,drb:3.3,fg:14.4,fga:2.7,fg3:8.3,fg3a:3,ft:2.4,fta:2.6}},
      {id:'bos-samhause-24',name:'萨姆-豪瑟',img:'https://i10.hoopchina.com.cn/editor/5f5b151ad32b1ea0eb32bc1568832a1f_w_1040_h_760_.png',salary:10044644,per:13.6,yearsRemaining:3,pos:'PF',ht:79,wt:217,exp:'4',salary_2026_27:10848215,salary_2027_28:11651785,salary_2028_29:12455356,stats:{g:78,gs:49,mp:24.8,pts:9.2,ast:1.5,trb:3.8,stl:0.5,blk:0.3,tov:0.4,pf:1.4,fg_pct:0.419,fg3_pct:0.7,ft_pct:0.85,orb:0.7,drb:3.1,fg:7.7,fga:2.5,fg3:6.5,fg3a:0.393,ft:0.2,fta:0.3}},
      {id:'bos-paytonpr-25',name:'佩顿-普里查德',img:'https://i11.hoopchina.com.cn/editor/0b1e0703ae64ed05e590dcfa2c168cc0_w_1040_h_760_.png',salary:7232143,per:11.1,yearsRemaining:2,pos:'PG',ht:73,wt:195,exp:'5',salary_2026_27:7767857,salary_2027_28:8303571,stats:{g:79,gs:50,mp:32.4,pts:17,ast:5.2,trb:3.9,stl:0.7,blk:0.1,tov:1.4,pf:1.5,fg_pct:0.464,fg3_pct:0.377,ft_pct:0.89,orb:0.9,drb:3.1,fg:13.8,fga:2.7,fg3:7.1,fg3a:3.7,ft:1.5,fta:1.7}},
      {id:'bos-hugogonz-26',name:'雨果-冈萨雷斯',img:'https://i3.hoopchina.com.cn/editor/b70c60b756a0c904da18e1f617b8a89f_w_1040_h_760_.png',salary:2783880,per:10.2,yearsRemaining:3,pos:'SF',ht:78,wt:200,exp:'R',salary_2026_27:2923560,salary_2027_28:3062640,salary_2028_29:5528065,stats:{g:74,gs:3,mp:14.6,pts:3.9,ast:0.5,trb:3.3,stl:0.6,blk:0.3,tov:0.5,pf:1.7,fg_pct:0.6,fg3_pct:1,ft_pct:0.5,orb:0.8,drb:2.5,fg:3.3,fga:0.476,fg3:1.6,fg3a:0.362,ft:0.2,fta:0.4}},
      {id:'bos-lukagarz-27',name:'卢卡-加尔扎',img:'',salary:2461463,per:11.6,yearsRemaining:1,pos:'C',ht:82,wt:243,exp:'4',salary_2026_27:2801346,stats:{g:69,gs:6,mp:16.2,pts:8.1,ast:1,trb:4.1,stl:0.4,blk:0.4,tov:0.7,pf:2.3,fg_pct:0.8,fg3_pct:0.433,ft_pct:0.769,orb:2.3,drb:1.8,fg:5.2,fga:0.577,fg3:1.8,fg3a:2.2,ft:1.3,fta:1.7}},
      {id:'bos-dalanoba-28',name:'达拉诺-班顿',img:'',salary:263940,per:10.1,yearsRemaining:1,pos:'PG',ht:80,wt:203,exp:'4',stats:{g:4,gs:0,mp:13,pts:1.5,ast:2.3,trb:1,stl:0.3,blk:1.3,tov:1.8,pf:0.8,fg_pct:0,fg3_pct:0.3,ft_pct:1,orb:0.3,drb:0.8,fg:2,fga:0.125,fg3:0.3,fg3a:0,ft:1,fta:1}},
      {id:'bos-baylorsc-29',name:'贝勒·沙伊尔曼',img:'https://i5.hoopchina.com.cn/editor/d50b3c0df7a9b7276357b906df3b47bf_w_1040_h_760_.png',salary:2619000,per:9.9,yearsRemaining:2,pos:'SG',ht:78,wt:205,exp:'1',salary_2026_27:2744040,salary_2027_28:4952993,stats:{g:77,gs:20,mp:18.6,pts:5.5,ast:1.5,trb:3.5,stl:0.5,blk:0.1,tov:0.6,pf:1.4,fg_pct:0.453,fg3_pct:0.7,ft_pct:0.903,orb:0.7,drb:2.8,fg:4.3,fga:1.3,fg3:3.2,fg3a:0.399,ft:0.4,fta:0.4}},
      {id:'bos-neemiasq-30',name:'内米亚斯-克塔',img:'https://i3.hoopchina.com.cn/editor/f1f7728423f5004ce242b16659222ac7_w_1040_h_760_.png',salary:2349578,per:11.5,yearsRemaining:1,pos:'C',ht:84,wt:248,exp:'4',salary_2026_27:2667944,stats:{g:76,gs:75,mp:25.3,pts:10.2,ast:1.7,trb:8.4,stl:0.8,blk:1.3,tov:1,pf:2.8,fg_pct:0,fg3_pct:0.125,ft_pct:0.703,orb:3,drb:5.3,fg:6.6,fga:0.653,fg3:0.1,fg3a:4.3,ft:1.6,fta:2.3}},
      {id:'bos-nikolavu-105',name:'Nikola Vučević',img:'https://i11.hoopchina.com.cn/editor/85cf07898ec0fb17c9c65a8b2d57ffce_w_1040_h_760_.png',salary:21481481,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bos-jddaviso-106',name:'JD Davison',img:'',salary:2270735,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'bos-jordanwa-107',name:'Jordan Walsh',img:'https://i5.hoopchina.com.cn/editor/79a04c0a0b376832d8dea1cb0b43d38d_w_1040_h_760_.png',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2406205},
      {id:'bos-amariwil-108',name:'Amari Williams',img:'',salary:490128,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917},
      {id:'bos-johntonj-109',name:'John Tonje',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  cha: {
    id:'cha',
    name:'夏洛特黄蜂',  
    shortName:'黄蜂',  
    conference:'east',  
    color:'#1D1160',  
    accent:'#00788C',  
    overTaxLine:0,
    capRoom:13881624,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'cha-lameloba-31',name:'拉梅洛-鲍尔',img:'https://i5.hoopchina.com.cn/editor/9b4c7b67b607cbc3b7d36b979302db3f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:37958760,per:19.8,yearsRemaining:3,pos:'PG',ht:79,wt:180,exp:'5',salary_2026_27:40770520,salary_2027_28:43582280,salary_2028_29:46394040,stats:{g:72,gs:69,mp:28,pts:20.1,ast:7.1,trb:4.8,stl:1.2,blk:0.2,tov:2.8,pf:2.7,fg_pct:0.407,fg3_pct:0.368,ft_pct:0.899,orb:0.9,drb:3.9,fg:17.3,fga:3.8,fg3:10.3,fg3a:3.3,ft:2.2,fta:2.5}},
      {id:'cha-milesbri-32',name:'迈尔斯-布里奇斯',img:'https://i11.hoopchina.com.cn/editor/cfb2c2ccbf9dc4f68324d0a97bc6fbc7_w_1040_h_760_.png',salary:25000000,per:14.3,yearsRemaining:1,pos:'PF',ht:79,wt:225,exp:'6',salary_2026_27:22826087,stats:{g:77,gs:77,mp:31,pts:17.1,ast:3.2,trb:5.8,stl:0.6,blk:0.4,tov:1.4,pf:1.7,fg_pct:0.46,fg3_pct:0.333,ft_pct:0.822,orb:1,drb:4.9,fg:13.5,fga:1.9,fg3:5.8,fg3a:4.3,ft:2.7,fta:3.3}},
      {id:'cha-brandonm-33',name:'布兰登·米勒',img:'https://i5.hoopchina.com.cn/editor/8cad8c14122ffce947652c6a14bf867b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:11968800,per:11.8,yearsRemaining:1,pos:'SF',ht:79,wt:200,exp:'2',salary_2026_27:15104626,stats:{g:65,gs:65,mp:30.3,pts:20.2,ast:3.3,trb:4.9,stl:1,blk:0.7,tov:2.5,pf:2.8,fg_pct:0.435,fg3_pct:0.383,ft_pct:0.892,orb:1.1,drb:3.8,fg:16.1,fga:3.1,fg3:8.2,fg3a:3.8,ft:3.1,fta:3.4}},
      {id:'cha-joshgree-34',name:'约什-格林',img:'',salary:13666667,per:10.3,yearsRemaining:1,pos:'SG',ht:78,wt:200,exp:'5',salary_2026_27:14679012,stats:{g:58,gs:0,mp:15.7,pts:4.3,ast:0.8,trb:1.8,stl:0.6,blk:0.1,tov:0.6,pf:1.1,fg_pct:1,fg3_pct:0.4,ft_pct:0.893,orb:0.8,drb:1,fg:3.1,fga:0.459,fg3:2.4,fg3a:0.42,ft:0.4,fta:0.5}},
      {id:'cha-grantwil-35',name:'格兰特-威廉姆斯',img:'https://i1.hoopchina.com.cn/editor/8079590ebe14a18efc6f17515e329c68_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:13645500,per:12.3,yearsRemaining:1,pos:'PF',ht:79,wt:236,exp:'6',salary_2026_27:14265750,stats:{g:36,gs:3,mp:19.8,pts:7,ast:1.6,trb:3.9,stl:0.5,blk:0.5,tov:0.9,pf:1.6,fg_pct:0.426,fg3_pct:0.7,ft_pct:0.815,orb:1.3,drb:2.7,fg:5.1,fga:1.4,fg3:3.7,fg3a:0.388,ft:1.2,fta:1.5}},
      {id:'cha-konknuep-36',name:'康-克尼普尔',img:'https://i1.hoopchina.com.cn/editor/a881a7ad9bed1622d7105f196f201e3a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:10015680,per:10.3,yearsRemaining:3,pos:'SF',ht:78,wt:215,exp:'R',salary_2026_27:10516560,salary_2027_28:11017560,salary_2028_29:13937214,stats:{g:81,gs:80,mp:31.5,pts:18.5,ast:3.4,trb:5.3,stl:0.7,blk:0.2,tov:2,pf:2.1,fg_pct:0.475,fg3_pct:0.425,ft_pct:0.863,orb:1.2,drb:4.1,fg:13.4,fga:3.4,fg3:7.9,fg3a:3,ft:2.4,fta:2.8}},
      {id:'cha-tidjanes-37',name:'提贾尼·萨隆',img:'',salary:7863240,per:10.1,yearsRemaining:2,pos:'PF',ht:82,wt:207,exp:'1',salary_2026_27:8237880,salary_2027_28:10445633,stats:{g:37,gs:0,mp:15.5,pts:6,ast:0.7,trb:4,stl:0.4,blk:0.2,tov:0.7,pf:1.5,fg_pct:1,fg3_pct:0.434,ft_pct:0.65,orb:0.7,drb:3.3,fg:4.3,fga:0.503,fg3:2.2,fg3a:1.2,ft:0.7,fta:1.1}},
      {id:'cha-tremann-38',name:'特雷-曼',img:'',salary:8000000,per:8.4,yearsRemaining:2,pos:'PG',ht:76,wt:178,exp:'4',salary_2026_27:8000000,salary_2027_28:8000000,stats:{g:53,gs:1,mp:12.6,pts:5.5,ast:1.6,trb:1.7,stl:0.5,blk:0.1,tov:1,pf:1.3,fg_pct:0.9,fg3_pct:0.323,ft_pct:0.852,orb:0.4,drb:1.4,fg:5.7,fga:0.36,fg3:2.9,fg3a:1.1,ft:0.4,fta:0.5}},
      {id:'cha-patconna-39',name:'帕特-康诺顿',img:'',salary:10739683,per:9.7,yearsRemaining:1,pos:'SG',ht:77,wt:209,exp:'10',salary_2026_27:3815861,stats:{g:42,gs:0,mp:7.1,pts:2.6,ast:0.4,trb:1.5,stl:0.3,blk:0,tov:0.3,pf:0.2,fg_pct:0.5,fg3_pct:0.4,ft_pct:0.65,orb:0.4,drb:1.1,fg:2,fga:0.447,fg3:1.2,fg3a:0.404,ft:0.3,fta:0.5}},
      {id:'cha-liammcne-40',name:'利亚姆-麦克尼利',img:'',salary:2763960,per:8.4,yearsRemaining:3,pos:'SF',ht:79,wt:210,exp:'R',salary_2026_27:2902080,salary_2027_28:3040320,salary_2028_29:5487778,stats:{g:31,gs:0,mp:11.9,pts:4.3,ast:0.8,trb:2.4,stl:0.2,blk:0.1,tov:0.4,pf:1.2,fg_pct:0.8,fg3_pct:0.5,ft_pct:0.821,orb:0.4,drb:1.9,fg:3.1,fga:0.4,fg3:1.9,fg3a:0.4,ft:1,fta:1.3}},
      {id:'cha-cobywhit-105',name:'Coby White',img:'https://i3.hoopchina.com.cn/editor/229dbbf2be610725b191023106cef681_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:12888889,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cha-mikeconl-106',name:'Mike Conley',img:'https://i11.hoopchina.com.cn/editor/9d8767615b539145de1a3c164c6094be_w_1040_h_760_.png',salary:11499872,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cha-malakibr-107',name:'Malaki Branham',img:'',salary:4962033,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cha-nicksmit-108',name:'Nick Smith Jr.',img:'',salary:2710680,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cha-xavierti-109',name:'Xavier Tillman Sr.',img:'',salary:2546675,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cha-ryankalk-110',name:'Ryan Kalkbrenner',img:'https://i10.hoopchina.com.cn/editor/199eb524091652f45fdc1358406b2f04_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2411090,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'cha-sionjame-111',name:'Sion James',img:'https://i1.hoopchina.com.cn/editor/82ce0f2642fb302abf3df97bcf6e9914_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2411090,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'cha-moussadi-112',name:'Moussa Diabaté',img:'https://i11.hoopchina.com.cn/editor/35897454018e5f068670a3c6b7bc4c74_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2270735,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2461462}
    ]
  },

  chi: {
    id:'chi',
    name:'芝加哥公牛',  
    shortName:'公牛',  
    conference:'east',  
    color:'#CE1141',  
    accent:'#000000',  
    overTaxLine:0,
    capRoom:56264645,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'chi-joshgidd-41',name:'约什-吉迪',img:'',salary:25000000,per:15.5,yearsRemaining:3,pos:'PG',ht:79,wt:216,exp:'4',salary_2026_27:25000000,salary_2027_28:25000000,salary_2028_29:25000000,stats:{g:54,gs:51,mp:32.1,pts:17,ast:9.1,trb:8.3,stl:1,blk:0.5,tov:3.6,pf:1.7,fg_pct:0.448,fg3_pct:0.364,ft_pct:0.763,orb:1.2,drb:7.1,fg:13.3,fga:1.9,fg3:5.2,fg3a:4,ft:3.2,fta:4.2}},
      {id:'chi-patrickw-42',name:'帕特里克-威廉姆斯',img:'',salary:18000000,per:10.8,yearsRemaining:3,pos:'PF',ht:78,wt:215,exp:'5',salary_2026_27:18000000,salary_2027_28:18000000,salary_2028_29:18000000,stats:{g:72,gs:6,mp:20.5,pts:7,ast:1.5,trb:3,stl:0.7,blk:0.4,tov:1,pf:1.3,fg_pct:0.372,fg3_pct:0.347,ft_pct:0.72,orb:0.7,drb:2.3,fg:6.6,fga:1.3,fg3:3.8,fg3a:1.2,ft:0.8,fta:1}},
      {id:'chi-isaacoko-43',name:'艾萨克-奥科罗',img:'',salary:11000000,per:11.8,yearsRemaining:1,pos:'SG',ht:76,wt:225,exp:'5',salary_2026_27:11814814,stats:{g:63,gs:62,mp:26.9,pts:9.3,ast:1.6,trb:2.7,stl:0.7,blk:0.5,tov:0.7,pf:2.6,fg_pct:0.46,fg3_pct:0.33,ft_pct:0.795,orb:1.1,drb:1.7,fg:7.3,fga:1.2,fg3:3.5,fg3a:2.2,ft:1.4,fta:1.8}},
      {id:'chi-jalensmi-44',name:'杰伦-史密斯',img:'',salary:9000000,per:9.9,yearsRemaining:1,pos:'C',ht:80,wt:215,exp:'5',salary_2026_27:9428571,stats:{g:53,gs:21,mp:20.7,pts:10.2,ast:1.2,trb:6.7,stl:0.5,blk:0.8,tov:1,pf:2.1,fg_pct:0.483,fg3_pct:0.373,ft_pct:0.742,orb:1.8,drb:4.8,fg:7.6,fga:1.5,fg3:4.2,fg3a:2.1,ft:1.3,fta:1.8}},
      {id:'chi-trejones-45',name:'特雷-琼斯',img:'',salary:8000000,per:8.9,yearsRemaining:2,pos:'PG',ht:73,wt:185,exp:'5',salary_2026_27:8000000,salary_2027_28:8000000,stats:{g:65,gs:41,mp:27,pts:14.1,ast:5.4,trb:3.1,stl:1.2,blk:0.2,tov:1.4,pf:1.4,fg_pct:0.6,fg3_pct:0.315,ft_pct:0.841,orb:0.6,drb:2.6,fg:9.5,fga:0.553,fg3:2,fg3a:4.6,ft:2.9,fta:3.5}},
      {id:'chi-robdilli-46',name:'罗伯特·迪林厄姆',img:'',salary:6576120,per:8.4,yearsRemaining:2,pos:'PG',ht:74,wt:175,exp:'1',salary_2026_27:6889320,salary_2027_28:8763216,stats:{g:30,gs:0,mp:21.5,pts:9.6,ast:2.8,trb:3,stl:0.9,blk:0.1,tov:2.1,pf:2.6,fg_pct:1,fg3_pct:0.3,ft_pct:0.743,orb:0.5,drb:2.5,fg:9,fga:0.428,fg3:3.3,fg3a:2.9,ft:0.9,fta:1.2}},
      {id:'chi-guerscho-47',name:'盖尔雄-亚布塞莱',img:'',salary:5500000,per:9.2,yearsRemaining:1,pos:'C',ht:79,wt:265,exp:'3',stats:{g:26,gs:19,mp:24.7,pts:10,ast:1.7,trb:5.7,stl:0.8,blk:0.4,tov:1,pf:1.7,fg_pct:0.405,fg3_pct:0.383,ft_pct:0.767,orb:1.2,drb:4.4,fg:7.9,fga:1.9,fg3:4.9,fg3a:1.3,ft:1.8,fta:2.3}},
      {id:'chi-matasbuz-48',name:'马塔斯·布泽利斯',img:'',salary:5455560,per:8.4,yearsRemaining:2,pos:'PF',ht:80,wt:209,exp:'1',salary_2026_27:5715360,salary_2027_28:7584283,stats:{g:77,gs:77,mp:29.2,pts:16.3,ast:2.1,trb:5.8,stl:0.7,blk:1.5,tov:2.1,pf:2.3,fg_pct:0.463,fg3_pct:0.349,ft_pct:0.786,orb:1,drb:4.8,fg:12.5,fga:2.2,fg3:6.4,fg3a:3.5,ft:2.4,fta:3.1}},
      {id:'chi-noaessen-49',name:'诺阿-埃森格',img:'',salary:5429520,per:10.1,yearsRemaining:3,pos:'PF',ht:80,wt:200,exp:'R',salary_2026_27:5701200,salary_2027_28:5972760,salary_2028_29:8230464,stats:{g:2,gs:0,mp:3,pts:0,ast:0,trb:0,stl:0.5,blk:0,tov:0,pf:0.5,fg_pct:0,fg3_pct:0,ft_pct:0,orb:0,drb:0,fg:1.5,fga:0,fg3:1,fg3a:0,ft:0,fta:0}},
      {id:'chi-anfernee-105',name:'Anfernee Simons',img:'',salary:27678571,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-collinse-106',name:'Collin Sexton',img:'',salary:18975000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-zachcoll-107',name:'Zach Collins',img:'https://i10.hoopchina.com.cn/editor/ecca9694500e98d99c6d2620448c60c8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:18080496,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-jadenive-108',name:'Jaden Ivey',img:'',salary:10107163,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-jevoncar-109',name:'Jevon Carter',img:'https://i10.hoopchina.com.cn/editor/6db1c06e3c6eed9c3bd82ec3151e047a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7680524,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-nickrich-110',name:'Nick Richards',img:'',salary:5000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'chi-leonardm-111',name:'Leonard Miller',img:'',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2406205}
    ]
  },

  cle: {
    id:'cle',
    name:'克利夫兰骑士',  
    shortName:'骑士',  
    conference:'east',  
    color:'#860038',  
    accent:'#FDBB30',  
    overTaxLine:28635169,
    capRoom:-64635169,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'cle-evanmobl-51',name:'埃文-莫布利',img:'https://i10.hoopchina.com.cn/editor/71ef6d776096a6564adbd7b3e1023b1a_w_1040_h_760_.png',salary:46394100,per:18.9,yearsRemaining:4,pos:'PF',ht:83,wt:215,exp:'4',salary_2026_27:50105628,salary_2027_28:53817156,salary_2028_29:57528684,salary_2029_30:61240212,stats:{g:65,gs:63,mp:31.9,pts:18.2,ast:3.6,trb:9,stl:0.7,blk:1.7,tov:1.9,pf:2.4,fg_pct:1,fg3_pct:0.297,ft_pct:0.606,orb:2.4,drb:6.6,fg:13.2,fga:0.546,fg3:3.2,fg3a:6.3,ft:2.8,fta:4.6}},
      {id:'cle-donovanm-52',name:'多诺万-米切尔',img:'https://i5.hoopchina.com.cn/newsPost/6e0fe3db7d0cd238195b525de2afae58_w_1040_h_760_.png',salary:46394100,per:22.7,yearsRemaining:2,pos:'SG',ht:74,wt:215,exp:'8',salary_2026_27:50105628,salary_2027_28:53817156,stats:{g:70,gs:70,mp:33.5,pts:27.9,ast:5.7,trb:4.5,stl:1.5,blk:0.3,tov:2.8,pf:2.3,fg_pct:0.483,fg3_pct:0.364,ft_pct:0.865,orb:0.7,drb:3.8,fg:20,fga:3.2,fg3:8.8,fg3a:6.5,ft:5.3,fta:6.1}},
      {id:'cle-jameshar-53',name:'詹姆斯-哈登',img:'https://i3.hoopchina.com.cn/editor/96cb6e328b1ab5fdcd783e18651ae682_w_1040_h_760_.png',salary:39182693,per:18.6,yearsRemaining:1,pos:'PG',ht:77,wt:220,exp:'16',salary_2026_27:42317307,stats:{g:26,gs:26,mp:33.8,pts:20.5,ast:7.7,trb:4.8,stl:0.8,blk:0.5,tov:3.2,pf:2.1,fg_pct:0.466,fg3_pct:0.435,ft_pct:0.84,orb:0.5,drb:4.3,fg:13.5,fga:3.1,fg3:7.1,fg3a:3.2,ft:4.8,fta:5.8}},
      {id:'cle-jarretta-54',name:'贾勒特-阿伦',img:'https://i11.hoopchina.com.cn/editor/4bcb604e4036baabe04a4085a26a44b1_w_1040_h_760_.png',salary:20000000,per:15,yearsRemaining:3,pos:'C',ht:81,wt:243,exp:'8',salary_2026_27:28000000,salary_2027_28:30240000,salary_2028_29:32480000,stats:{g:56,gs:56,mp:27.1,pts:15.4,ast:1.8,trb:8.5,stl:1,blk:0.8,tov:1.3,pf:1.7,fg_pct:0,fg3_pct:0.1,ft_pct:0.709,orb:2.6,drb:5.9,fg:9.4,fga:0.638,fg3:0.2,fg3a:6,ft:3.3,fta:4.7}},
      {id:'cle-maxstrus-55',name:'马克斯-斯特鲁斯',img:'https://i1.hoopchina.com.cn/editor/daa8baf34251fd1a18fc13bcaef3280f_w_1040_h_760_.png',salary:15936452,per:11,yearsRemaining:1,pos:'SF',ht:77,wt:215,exp:'6',salary_2026_27:16660836,stats:{g:12,gs:5,mp:24,pts:11.2,ast:2,trb:5.4,stl:0.3,blk:0,tov:0.8,pf:2.8,fg_pct:0.443,fg3_pct:0.402,ft_pct:0.778,orb:0.8,drb:4.7,fg:8.8,fga:2.8,fg3:6.8,fg3a:1.2,ft:0.6,fta:0.8}},
      {id:'cle-dennissc-56',name:'丹尼斯-施罗德',img:'https://i5.hoopchina.com.cn/editor/78a7df92a65301ad90f8892eb44cdbd7_w_1040_h_760_.png',salary:14104000,per:13.7,yearsRemaining:2,pos:'PG',ht:73,wt:175,exp:'12',salary_2026_27:14809200,salary_2027_28:15514400,stats:{g:30,gs:3,mp:21.4,pts:8.2,ast:4.3,trb:2.3,stl:0.8,blk:0.2,tov:1.5,pf:1.4,fg_pct:0.6,fg3_pct:0.29,ft_pct:0.861,orb:0.4,drb:1.9,fg:6.9,fga:0.401,fg3:2.1,fg3a:2.2,ft:2.1,fta:2.4}},
      {id:'cle-sammerri-57',name:'萨姆-梅里尔',img:'https://i10.hoopchina.com.cn/editor/0e2602f14544d8920439bbed53d3e9cc_w_1040_h_760_.png',salary:8482144,per:11.6,yearsRemaining:3,pos:'SG',ht:76,wt:205,exp:'5',salary_2026_27:9160715,salary_2027_28:9839285,salary_2028_29:10517856,stats:{g:52,gs:38,mp:26.5,pts:12.8,ast:2.4,trb:2.6,stl:0.6,blk:0.1,tov:0.8,pf:2.4,fg_pct:0.461,fg3_pct:0.421,ft_pct:0.855,orb:0.5,drb:2,fg:9.3,fga:3,fg3:7.2,fg3a:1.3,ft:1.1,fta:1.3}},
      {id:'cle-jaylonty-58',name:'杰隆·泰森',img:'https://i1.hoopchina.com.cn/editor/832c5dae04ad9d90d25c3643f645866e_w_1040_h_760_.png',salary:3492480,per:11.2,yearsRemaining:2,pos:'SG',ht:78,wt:215,exp:'1',salary_2026_27:3658560,salary_2027_28:5641500,stats:{g:66,gs:42,mp:26.9,pts:13.2,ast:2.2,trb:5.1,stl:0.8,blk:0.4,tov:1.5,pf:2.5,fg_pct:0.493,fg3_pct:0.446,ft_pct:0.738,orb:1.8,drb:3.3,fg:10.2,fga:2,fg3:4.5,fg3a:3,ft:1.2,fta:1.6}},
      {id:'cle-naeqwant-59',name:'内匡-汤姆林',img:'',salary:718150,per:11.1,yearsRemaining:1,pos:'PF',ht:80,wt:210,exp:'1',salary_2026_27:2411090,stats:{g:64,gs:3,mp:15.7,pts:5.8,ast:0.8,trb:2.9,stl:0.6,blk:0.5,tov:0.5,pf:2,fg_pct:0.4,fg3_pct:0.235,ft_pct:0.77,orb:1.3,drb:1.6,fg:4.9,fga:0.478,fg3:1.8,fg3a:1.9,ft:0.7,fta:1}},
      {id:'cle-craigpor-60',name:'小克雷格·波特',img:'',salary:2221677,per:9.8,yearsRemaining:1,pos:'PG',ht:73,wt:180,exp:'2',salary_2026_27:2406205,stats:{g:64,gs:3,mp:17.9,pts:4.5,ast:3.2,trb:3.4,stl:0.9,blk:0.6,tov:0.9,pf:1.1,fg_pct:0.5,fg3_pct:0.355,ft_pct:0.6,orb:1.3,drb:2.1,fg:4,fga:0.45,fg3:1.5,fg3a:1.3,ft:0.4,fta:0.6}},
      {id:'cle-deanwade-105',name:'Dean Wade',img:'https://i11.hoopchina.com.cn/editor/60e4952b0fd349788cbdaaf50e7d1c08_w_1040_h_760_.png',salary:6623456,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cle-keonelli-106',name:'Keon Ellis',img:'https://i3.hoopchina.com.cn/editor/c85f9110e1a536c185be3e964b50a85f_w_1040_h_760_.png',salary:2301587,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cle-thomasbr-107',name:'Thomas Bryant',img:'https://i11.hoopchina.com.cn/editor/a833c540b971345476f9eb6ab17e2fb6_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cle-larrynan-108',name:'Larry Nance Jr.',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'cle-tyresepr-109',name:'Tyrese Proctor',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'cle-rickyrub-110',name:'Ricky Rubio',img:'',salary:424672,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:424672}
    ]
  },

  dal: {
    id:'dal',
    name:'达拉斯独行侠',  
    shortName:'独行侠',  
    conference:'west',  
    color:'#00538C',  
    accent:'#002B5E',  
    overTaxLine:0,
    capRoom:8262263,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'dal-kyrieirv-61',name:'凯里-欧文',img:'',salary:36566002,per:14.3,yearsRemaining:2,pos:'SG',ht:74,wt:195,exp:'14',salary_2026_27:39491282,salary_2027_28:42416562},
      {id:'dal-pjwashin-62',name:'PJ-华盛顿',img:'https://i1.hoopchina.com.cn/editor/1cfcdec24814a2629317fe4c5ec7d3bc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp西塞https://i3.hoopchina.com.cn/editor/355879dda43efafbdbab673588333e05_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:14152174,per:11.7,yearsRemaining:4,pos:'PF',ht:79,wt:230,exp:'6',salary_2026_27:19813044,salary_2027_28:21398088,salary_2028_29:22983132,salary_2029_30:24568176,stats:{g:56,gs:53,mp:31,pts:14.2,ast:1.8,trb:7,stl:1,blk:1.1,tov:1.7,pf:2.1,fg_pct:0.45,fg3_pct:0.325,ft_pct:0.687,orb:1.5,drb:5.5,fg:11.8,fga:1.4,fg3:4.2,fg3a:3.9,ft:2.2,fta:3.3}},
      {id:'dal-klaythom-63',name:'克莱-汤普森',img:'https://i3.hoopchina.com.cn/editor/9ee619b9befaf26d03224bbf5e96f8a2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:16666667,per:11.3,yearsRemaining:1,pos:'SF',ht:77,wt:220,exp:'12',salary_2026_27:17460317,stats:{g:69,gs:8,mp:21.7,pts:11.7,ast:1.4,trb:2.1,stl:0.5,blk:0.3,tov:0.9,pf:1,fg_pct:0.393,fg3_pct:0.383,ft_pct:0.766,orb:0.3,drb:1.8,fg:10.6,fga:2.9,fg3:7.6,fg3a:1.2,ft:0.5,fta:0.7}},
      {id:'dal-danielga-64',name:'丹尼尔-加福德',img:'',salary:14386320,per:12.6,yearsRemaining:3,pos:'C',ht:82,wt:265,exp:'6',salary_2026_27:17263584,salary_2027_28:18126763,salary_2028_29:18989942,stats:{g:55,gs:44,mp:21.7,pts:9.5,ast:1.1,trb:6.9,stl:0.8,blk:1.3,tov:1.1,pf:2.6,fg_pct:0,fg3_pct:0,ft_pct:0.683,orb:2.5,drb:4.4,fg:5.7,fga:0.655,fg3:0,fg3a:3.8,ft:2,fta:2.9}},
      {id:'dal-cooperfl-65',name:'库珀-弗拉格',img:'',salary:13825920,per:12.3,yearsRemaining:3,pos:'SF',ht:81,wt:205,exp:'R',salary_2026_27:14517480,salary_2027_28:15208680,salary_2028_29:19178146,stats:{g:70,gs:70,mp:33.5,pts:21,ast:4.5,trb:6.7,stl:1.2,blk:0.9,tov:2.3,pf:2,fg_pct:1,fg3_pct:0.295,ft_pct:0.827,orb:1.2,drb:5.4,fg:17.1,fga:0.468,fg3:3.5,fg3a:7,ft:4,fta:4.9}},
      {id:'dal-calebmar-66',name:'凯莱布-马丁',img:'',salary:9594044,per:12.3,yearsRemaining:2,pos:'SF',ht:77,wt:205,exp:'6',salary_2026_27:10001493,salary_2027_28:9371351,stats:{g:58,gs:12,mp:14.8,pts:3.9,ast:1.4,trb:2.5,stl:0.7,blk:0.3,tov:0.7,pf:1.5,fg_pct:0.3,fg3_pct:0.351,ft_pct:0.607,orb:0.5,drb:2,fg:3.3,fga:0.45,fg3:1,fg3a:1.1,ft:0.6,fta:1.1}},
      {id:'dal-najimars-67',name:'纳吉-马绍尔',img:'',salary:9000000,per:10.9,yearsRemaining:1,pos:'SF',ht:78,wt:220,exp:'5',salary_2026_27:9428571,stats:{g:74,gs:47,mp:29.5,pts:15.2,ast:3.3,trb:4.7,stl:1.1,blk:0.1,tov:1.6,pf:1.9,fg_pct:0.8,fg3_pct:0.291,ft_pct:0.76,orb:0.9,drb:3.8,fg:11.1,fga:0.51,fg3:2.9,fg3a:4.8,ft:3.1,fta:4.1}},
      {id:'dal-maxchris-68',name:'马克斯-克里斯蒂',img:'',salary:7714286,per:8,yearsRemaining:2,pos:'SG',ht:77,wt:190,exp:'3',salary_2026_27:8285714,salary_2027_28:8857143,stats:{g:77,gs:68,mp:29.1,pts:12.3,ast:2,trb:3.2,stl:0.6,blk:0.4,tov:1.2,pf:1.3,fg_pct:0.441,fg3_pct:0.404,ft_pct:0.899,orb:0.2,drb:3,fg:9.4,fga:2.3,fg3:5.8,fg3a:1.8,ft:1.6,fta:1.8}},
      {id:'dal-dereckli-69',name:'德雷克·莱夫利二世',img:'',salary:5253360,per:9.9,yearsRemaining:1,pos:'C',ht:85,wt:230,exp:'2',salary_2026_27:7239131,stats:{g:7,gs:4,mp:16.4,pts:4.3,ast:1.9,trb:5.3,stl:0.6,blk:1.6,tov:1.4,pf:3,fg_pct:0,fg3_pct:0,ft_pct:0.8,orb:2,drb:3.3,fg:2.6,fga:0.611,fg3:0,fg3a:1.6,ft:1.1,fta:1.4}},
      {id:'dal-ajjohnso-70',name:'AJ·约翰逊',img:'https://i5.hoopchina.com.cn/editor/5b0715bf204191d99a08d75867397ec6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3090480,per:11.4,yearsRemaining:2,pos:'SG',ht:77,wt:160,exp:'1',salary_2026_27:3237120,salary_2027_28:5493394,stats:{g:23,gs:0,mp:10.4,pts:3.9,ast:1.1,trb:1,stl:0.2,blk:0.1,tov:0.5,pf:0.7,fg_pct:0.2,fg3_pct:0.156,ft_pct:0.893,orb:0.3,drb:0.8,fg:4,fga:0.323,fg3:1.4,fg3a:1.1,ft:1.1,fta:1.2}},
      {id:'dal-khrismid-105',name:'Khris Middleton',img:'',salary:33296296,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'dal-tyusjone-106',name:'Tyus Jones',img:'https://i10.hoopchina.com.cn/editor/cc81861dfa14a4e28b218a869afeaa33_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp布兰登威廉姆斯https://i10.hoopchina.com.cn/editor/d9c17e8f5c5be430704a05e7ba788d5a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp欧文https://i11.hoopchina.com.cn/editor/f90d70c5dff6fba590880f6d38dd35b2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马绍尔https://i11.hoopchina.com.cn/editor/2786ce70956fcd2caee32187414ca7c8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马丁https://i3.hoopchina.com.cn/editor/cdd086d73cbf83da234da8d765b0ca9c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米德尔顿https://i5.hoopchina.com.cn/editor/2d0e4a7dd44858c3a5876fc831613ebe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp加福德https://i11.hoopchina.com.cn/editor/385b2f03281b23ba5bcaca7b0b321cee_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp泰勒史密斯https://i5.hoopchina.com.cn/editor/e0865e533128d966bd3593ecccc426ac_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'dal-dwightpo-107',name:'Dwight Powell',img:'https://i10.hoopchina.com.cn/editor/bd5cc040f065c9d1451192e62ea89f6d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:4000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'dal-marvinba-108',name:'Marvin Bagley III',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'dal-brandonw-109',name:'Brandon Williams',img:'',salary:2270735,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'dal-javalemc-110',name:'JaVale McGee',img:'',salary:2208856,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2208856,salary_2027_28:2208856},
      {id:'dal-olivierm-111',name:'Olivier-Maxence Prosper',img:'',salary:1002360,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:1002360,salary_2027_28:1002360},
      {id:'dal-jeremiah-112',name:'Jeremiah Robinson-Earl',img:'',salary:131970,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  den: {
    id:'den',
    name:'丹佛掘金',  
    shortName:'掘金',  
    conference:'west',  
    color:'#0E2240',  
    accent:'#FEC524',  
    overTaxLine:22802928,
    capRoom:-58802928,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'den-nikolajo-71',name:'尼古拉-约基奇',img:'https://i1.hoopchina.com.cn/editor/e67ad82e868e451e00539d23c91e6f1b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:55224526,per:19.1,yearsRemaining:2,pos:'C',ht:83,wt:284,exp:'10',salary_2026_27:59033114,salary_2027_28:62841702,stats:{g:65,gs:65,mp:34.8,pts:27.7,ast:10.7,trb:12.9,stl:1.4,blk:0.8,tov:3.7,pf:2.7,fg_pct:0.569,fg3_pct:0.38,ft_pct:0.831,orb:3,drb:9.9,fg:17.4,fga:1.7,fg3:4.5,fg3a:8.2,ft:6.1,fta:7.4}},
      {id:'den-jamalmur-72',name:'贾马尔-默里',img:'https://i11.hoopchina.com.cn/editor/4f2b727f86bca61a20a839b4ddada906_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:46394100,per:19.5,yearsRemaining:3,pos:'PG',ht:76,wt:215,exp:'8',salary_2026_27:50105628,salary_2027_28:53817156,salary_2028_29:57528684,stats:{g:75,gs:75,mp:35.4,pts:25.4,ast:7.1,trb:4.4,stl:0.9,blk:0.4,tov:2.3,pf:1.7,fg_pct:0.483,fg3_pct:0.435,ft_pct:0.887,orb:0.4,drb:4,fg:18.1,fga:3.3,fg3:7.5,fg3a:5.5,ft:4.6,fta:5.2}},
      {id:'den-aarongor-73',name:'阿龙-戈登',img:'https://i11.hoopchina.com.cn/editor/59fdc4a8558a7e34c3890901fdbe01ca_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:22841455,per:14,yearsRemaining:3,pos:'PF',ht:80,wt:235,exp:'11',salary_2026_27:33658037,salary_2027_28:36350680,salary_2028_29:39043323,stats:{g:36,gs:33,mp:27.9,pts:16.2,ast:2.7,trb:5.8,stl:0.6,blk:0.3,tov:1.1,pf:1.7,fg_pct:0.497,fg3_pct:0.389,ft_pct:0.767,orb:1.4,drb:4.4,fg:11.1,fga:1.7,fg3:4.4,fg3a:3.8,ft:3.5,fta:4.5}},
      {id:'den-cameronj-74',name:'卡梅伦-约翰逊',img:'https://i3.hoopchina.com.cn/editor/6dbe64feb0684d4d4fed88f91627ed60_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:21057065,per:13.2,yearsRemaining:1,pos:'SF',ht:80,wt:210,exp:'6',salary_2026_27:23062500,stats:{g:54,gs:54,mp:30.5,pts:12.2,ast:2.4,trb:3.8,stl:0.7,blk:0.4,tov:0.9,pf:2.3,fg_pct:0.48,fg3_pct:0.43,ft_pct:0.839,orb:0.8,drb:3,fg:8.8,fga:2,fg3:4.7,fg3a:2.2,ft:1.7,fta:2.1}},
      {id:'den-christia-75',name:'克里斯琴-布朗',img:'https://i3.hoopchina.com.cn/editor/657c86fa85f6ed3fd88575994ed6f39d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:4921797,per:15.2,yearsRemaining:5,pos:'SG',ht:78,wt:220,exp:'3',salary_2026_27:21551726,salary_2027_28:23275863,salary_2028_29:25000000,salary_2029_30:26724137,stats:{g:44,gs:44,mp:31.8,pts:12,ast:2.7,trb:4.8,stl:0.7,blk:0.3,tov:1,pf:2.3,fg_pct:1,fg3_pct:0.301,ft_pct:0.782,orb:1.4,drb:3.4,fg:8.8,fga:0.519,fg3:3.3,fg3a:3.6,ft:1.8,fta:2.3}},
      {id:'den-jonasval-76',name:'约纳斯-瓦兰丘纳斯',img:'https://i3.hoopchina.com.cn/newsPost/6aed50598726961dda22a51a4b654fab_w_569_h_343_.png',salary:10395000,per:10.4,yearsRemaining:1,pos:'C',ht:83,wt:265,exp:'13',salary_2026_27:10000000,stats:{g:65,gs:6,mp:13.4,pts:8.7,ast:1.2,trb:5.1,stl:0.2,blk:0.6,tov:1.1,pf:2,fg_pct:0.1,fg3_pct:0.308,ft_pct:0.772,orb:1.6,drb:3.4,fg:6,fga:0.582,fg3:0.4,fg3a:3.4,ft:1.6,fta:2.1}},
      {id:'den-zekennaj-77',name:'齐克-纳吉',img:'',salary:8177778,per:8.8,yearsRemaining:2,pos:'PF',ht:82,wt:240,exp:'5',salary_2026_27:7466667,salary_2027_28:7466667,stats:{g:52,gs:4,mp:12,pts:3.7,ast:0.6,trb:2.6,stl:0.3,blk:0.5,tov:0.5,pf:1.4,fg_pct:0.3,fg3_pct:0.259,ft_pct:0.773,orb:0.6,drb:2,fg:2.9,fga:0.47,fg3:1,fg3a:1.1,ft:0.7,fta:0.8}},
      {id:'den-julianst-78',name:'朱利安·斯特劳瑟',img:'https://i5.hoopchina.com.cn/editor/54a0b2f920fad9e8ff13ea9638c866e5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2674200,per:9.6,yearsRemaining:1,pos:'SG',ht:78,wt:205,exp:'2',salary_2026_27:4826931,stats:{g:57,gs:14,mp:15.1,pts:7.2,ast:1.1,trb:2,stl:0.4,blk:0.1,tov:0.6,pf:1.3,fg_pct:1,fg3_pct:0.387,ft_pct:0.814,orb:0.2,drb:1.8,fg:5.6,fga:0.467,fg3:2.6,fg3a:1.6,ft:1,fta:1.2}},
      {id:'den-daronhol-79',name:'达隆·霍姆斯二世',img:'',salary:3218760,per:9.8,yearsRemaining:2,pos:'PF',ht:81,wt:225,exp:'R',salary_2026_27:3372120,salary_2027_28:5547138,stats:{g:25,gs:6,mp:8.4,pts:3.7,ast:0.6,trb:1.4,stl:0,blk:0.2,tov:0.5,pf:0.8,fg_pct:0.8,fg3_pct:0.4,ft_pct:0.786,orb:0.3,drb:1.1,fg:2.4,fga:0.508,fg3:1.8,fg3a:0.444,ft:0.4,fta:0.6}},
      {id:'den-jalenpic-80',name:'杰伦-皮克特',img:'',salary:2221677,per:9.5,yearsRemaining:1,pos:'SG',ht:74,wt:202,exp:'2',salary_2026_27:2406205,stats:{g:50,gs:18,mp:16.1,pts:5.2,ast:2.3,trb:2.3,stl:0.3,blk:0.1,tov:0.7,pf:0.8,fg_pct:1,fg3_pct:1,ft_pct:0.789,orb:0.4,drb:1.9,fg:4.6,fga:0.422,fg3:2.5,fg3a:0.386,ft:0.3,fta:0.4}},
      {id:'den-peytonwa-105',name:'Peyton Watson',img:'',salary:4356476,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'den-timharda-106',name:'Tim Hardaway Jr.',img:'https://i5.hoopchina.com.cn/editor/0c3d3f78ec3fc758b613a6d70162d360_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'den-brucebro-107',name:'Bruce Brown',img:'https://i3.hoopchina.com.cn/editor/4342457d68adcb7c6623d004578a38ea_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'den-spencerj-108',name:'Spencer Jones',img:'https://i10.hoopchina.com.cn/editor/0f6726d634463afd44e9895241a5e5d6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:623967,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  det: {
    id:'det',
    name:'底特律活塞',  
    shortName:'活塞',  
    conference:'east',  
    color:'#C8102E',  
    accent:'#1D42BA',  
    overTaxLine:0,
    capRoom:21691928,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'det-cadecunn-81',name:'凯德-坎宁安',img:'https://i3.hoopchina.com.cn/editor/2aba7267eeac2a63286a06d5eb897a49_w_1040_h_760_.png',salary:46394100,per:19.6,yearsRemaining:4,pos:'PG',ht:78,wt:220,exp:'4',salary_2026_27:50105628,salary_2027_28:53817156,salary_2028_29:57528684,salary_2029_30:61240212,stats:{g:64,gs:64,mp:33.9,pts:23.9,ast:9.9,trb:5.5,stl:1.4,blk:0.8,tov:3.7,pf:3.1,fg_pct:0.461,fg3_pct:0.342,ft_pct:0.812,orb:0.9,drb:4.7,fg:18.6,fga:2,fg3:5.7,fg3a:6.6,ft:4.8,fta:6}},
      {id:'det-duncanro-82',name:'邓肯-罗宾逊',img:'https://i3.hoopchina.com.cn/editor/fec6e749e96710cc722435904303dbb1_w_1040_h_760_.png',salary:16834692,per:10.6,yearsRemaining:2,pos:'SG',ht:79,wt:215,exp:'7',salary_2026_27:15992957,salary_2027_28:15151222,stats:{g:77,gs:77,mp:27.4,pts:12.2,ast:2.1,trb:2.7,stl:0.6,blk:0.3,tov:0.7,pf:2.2,fg_pct:0.456,fg3_pct:0.41,ft_pct:0.755,orb:0.4,drb:2.3,fg:9.1,fga:2.9,fg3:7,fg3a:1.3,ft:1.1,fta:1.4}},
      {id:'det-isaiahst-83',name:'以赛亚-斯图尔特',img:'https://i1.hoopchina.com.cn/editor/f508990ae1c391f132e6fb052d4cbd4a_w_1040_h_760_.png',salary:15000000,per:12.9,yearsRemaining:2,pos:'C',ht:80,wt:250,exp:'5',salary_2026_27:15000000,salary_2027_28:15000000,stats:{g:58,gs:13,mp:22.7,pts:10,ast:1.1,trb:5,stl:0.3,blk:1.6,tov:1.2,pf:2.9,fg_pct:0.7,fg3_pct:0.333,ft_pct:0.756,orb:1.7,drb:3.3,fg:6.9,fga:0.55,fg3:2.1,fg3a:3.1,ft:1.7,fta:2.3}},
      {id:'det-carislev-84',name:'卡里斯-勒韦尔',img:'https://i10.hoopchina.com.cn/editor/95be9062eb500bc99b94db0355769582_w_1040_h_760_.png',salary:14104000,per:10.1,yearsRemaining:1,pos:'SG',ht:79,wt:205,exp:'9',salary_2026_27:14809200,stats:{g:60,gs:0,mp:19.2,pts:7.4,ast:2.7,trb:2,stl:0.9,blk:0.7,tov:1.4,pf:1.5,fg_pct:1,fg3_pct:0.333,ft_pct:0.679,orb:0.4,drb:1.6,fg:6.5,fga:0.417,fg3:3,fg3a:1.7,ft:1,fta:1.4}},
      {id:'det-ausartho-85',name:'奥萨尔·汤普森',img:'https://i5.hoopchina.com.cn/editor/3fe771e14e91b1c0b80475feda4270d6_w_1040_h_760_.png',salary:8775000,per:11.5,yearsRemaining:1,pos:'SF',ht:79,wt:205,exp:'2',salary_2026_27:11117925,stats:{g:73,gs:72,mp:26,pts:9.9,ast:3.1,trb:5.7,stl:2,blk:0.9,tov:1.5,pf:2.7,fg_pct:0.1,fg3_pct:0.25,ft_pct:0.571,orb:2.1,drb:3.7,fg:7.9,fga:0.525,fg3:0.3,fg3a:4.1,ft:1.5,fta:2.6}},
      {id:'det-ronholla-86',name:'罗恩-霍兰德',img:'https://i10.hoopchina.com.cn/editor/f3cb7a772a0e6478e8b384c8dc5ccae2_w_1040_h_760_.png',salary:8657280,per:8.4,yearsRemaining:2,pos:'SF',ht:80,wt:206,exp:'1',salary_2026_27:9069600,salary_2027_28:11491183,stats:{g:78,gs:5,mp:19.9,pts:8.2,ast:1.2,trb:4,stl:1.2,blk:0.3,tov:1.2,pf:2.3,fg_pct:0.6,fg3_pct:0.253,ft_pct:0.805,orb:1.1,drb:3,fg:7,fga:0.432,fg3:2.5,fg3a:2.4,ft:1.5,fta:1.9}},
      {id:'det-paulreed-87',name:'保罗-里德',img:'https://i3.hoopchina.com.cn/editor/bece7b02e72f20f79d9d451165fec0e2_w_1040_h_760_.png',salary:5335894,per:9.7,yearsRemaining:1,pos:'C',ht:81,wt:210,exp:'5',salary_2026_27:5602689,stats:{g:65,gs:11,mp:13.9,pts:7.8,ast:1.2,trb:4.5,stl:0.9,blk:0.9,tov:0.9,pf:1.8,fg_pct:0.2,fg3_pct:0.325,ft_pct:0.664,orb:2,drb:2.5,fg:5.2,fga:0.617,fg3:0.6,fg3a:3,ft:1.1,fta:1.7}},
      {id:'det-marcussa-88',name:'马库斯·萨瑟',img:'',salary:2886720,per:8.4,yearsRemaining:1,pos:'PG',ht:73,wt:195,exp:'2',salary_2026_27:5198983,stats:{g:38,gs:5,mp:12,pts:5.2,ast:2,trb:1,stl:0.5,blk:0.1,tov:0.8,pf:1.1,fg_pct:0.39,fg3_pct:0.7,ft_pct:0.833,orb:0.2,drb:0.8,fg:4.7,fga:1.2,fg3:2.8,fg3a:0.415,ft:0.4,fta:0.5}},
      {id:'det-danissje-89',name:'丹尼斯·詹金斯',img:'https://i1.hoopchina.com.cn/editor/5adcf4760e90eb79e8eaeab3171ecd38_w_1040_h_760_.png',salary:3809524,per:8.9,yearsRemaining:1,pos:'PG',ht:76,wt:165,exp:'1',salary_2026_27:4000000,stats:{g:72,gs:19,mp:20.2,pts:9.3,ast:3.9,trb:2.3,stl:0.9,blk:0.2,tov:1.6,pf:1.5,fg_pct:1,fg3_pct:0.374,ft_pct:0.832,orb:0.7,drb:1.6,fg:7.9,fga:0.408,fg3:2.7,fg3a:2.2,ft:1.9,fta:2.2}},
      {id:'det-tobiasha-105',name:'Tobias Harris',img:'https://i10.hoopchina.com.cn/editor/ae06db64e5bc9d811607c70135fc2a5c_w_1040_h_760_.png',salary:26634146,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-kevinhue-106',name:'Kevin Huerter',img:'https://i3.hoopchina.com.cn/newsPost/94a5cc1c0709508cac3d224a750735b8_w_1932_h_1468_.png',salary:17991071,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-jalendur-107',name:'Jalen Duren',img:'https://i3.hoopchina.com.cn/editor/7a8b7fd1044db0b7fa5bed3ee39585e6_w_1040_h_760_.png',salary:6483144,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-dariosar-108',name:'Dario Šarić',img:'',salary:5426400,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-javonteg-109',name:'Javonte Green',img:'https://i1.hoopchina.com.cn/editor/c299a0ede470cc684bd9b9c14c964b73_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-bobiklin-110',name:'Bobi Klintman',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-isaacjon-111',name:'Isaac Jones',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'det-chazlani-112',name:'Chaz Lanier',img:'',salary:1372870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698}
    ]
  },

  gsw: {
    id:'gsw',
    name:'金州勇士',  
    shortName:'勇士',  
    conference:'west',  
    color:'#1D428A',  
    accent:'#FFC72C',  
    overTaxLine:0,
    capRoom:-28479537,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'gsw-stephenc-91',name:'斯蒂芬-库里',img:'https://i10.hoopchina.com.cn/editor/bee7807f3bfccbaefcdfe4917ccf1e40_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:59606817,per:19.9,yearsRemaining:1,pos:'PG',ht:74,wt:185,exp:'16',salary_2026_27:62587158,stats:{g:43,gs:41,mp:30.9,pts:26.6,ast:4.7,trb:3.6,stl:1.1,blk:0.4,tov:2.8,pf:1.7,fg_pct:0.468,fg3_pct:0.393,ft_pct:0.923,orb:0.4,drb:3.2,fg:18.6,fga:4.4,fg3:11.3,fg3a:4.3,ft:4.7,fta:5.1}},
      {id:'gsw-jimmybut-92',name:'吉米-巴特勒',img:'https://i11.hoopchina.com.cn/editor/14b791675da2dc3b18b88be4b5fa44a3_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:54126450,per:18.5,yearsRemaining:1,pos:'SF',ht:78,wt:230,exp:'14',salary_2026_27:56832773,stats:{g:38,gs:38,mp:31.1,pts:20,ast:4.9,trb:5.6,stl:1.4,blk:0.2,tov:1.6,pf:1.2,fg_pct:0.8,fg3_pct:0.376,ft_pct:0.864,orb:2.3,drb:3.2,fg:12.2,fga:0.519,fg3:2.2,fg3a:5.5,ft:6.5,fta:7.6}},
      {id:'gsw-draymond-93',name:'德雷蒙德-格林',img:'https://i3.hoopchina.com.cn/editor/0d1540d9a7a8b60162d190034bc104a9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:25892857,per:14.7,yearsRemaining:1,pos:'PF',ht:78,wt:230,exp:'13',salary_2026_27:27678571,stats:{g:68,gs:68,mp:27.5,pts:8.4,ast:5.5,trb:5.5,stl:0.9,blk:0.6,tov:2.7,pf:2.9,fg_pct:0.418,fg3_pct:0.326,ft_pct:0.702,orb:0.8,drb:4.7,fg:7.2,fga:1.5,fg3:4.6,fg3a:1.5,ft:0.9,fta:1.2}},
      {id:'gsw-mosesmoo-94',name:'摩西-穆迪',img:'https://i3.hoopchina.com.cn/editor/67d63133c2dbcad11b4ddd24ea8fe49b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:11574075,per:11.1,yearsRemaining:2,pos:'SG',ht:77,wt:211,exp:'4',salary_2026_27:12500000,salary_2027_28:13425925,stats:{g:60,gs:49,mp:25.7,pts:12.1,ast:1.6,trb:3.3,stl:1,blk:0.6,tov:1,pf:2,fg_pct:0.44,fg3_pct:0.401,ft_pct:0.77,orb:0.9,drb:2.5,fg:9.3,fga:2.5,fg3:6.3,fg3a:1.6,ft:1.5,fta:1.9}},
      {id:'gsw-alhorfor-95',name:'艾尔-霍福德',img:'https://i1.hoopchina.com.cn/editor/aa17526656ddcb6e0d89375b2eed4751_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:5685000,per:10.5,yearsRemaining:1,pos:'C',ht:80,wt:240,exp:'18',salary_2026_27:5969250,stats:{g:45,gs:13,mp:21.5,pts:8.3,ast:2.6,trb:4.9,stl:0.7,blk:1.1,tov:0.9,pf:1.1,fg_pct:0.426,fg3_pct:0.361,ft_pct:0.846,orb:1,drb:3.9,fg:7.2,fga:1.6,fg3:4.6,fg3a:1.4,ft:0.5,fta:0.6}},
      {id:'gsw-brandinp-96',name:'布兰丁·波杰姆斯基',img:'https://i5.hoopchina.com.cn/editor/cd5bfd561c5152ceb9d65b5a5fa65dce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3687960,per:10.2,yearsRemaining:1,pos:'SG',ht:76,wt:205,exp:'2',salary_2026_27:5679459,stats:{g:82,gs:43,mp:28.5,pts:13.8,ast:3.7,trb:5.1,stl:1.1,blk:0.2,tov:1.6,pf:1.7,fg_pct:0.455,fg3_pct:0.371,ft_pct:0.797,orb:0.9,drb:4.2,fg:10.6,fga:1.9,fg3:5,fg3a:2.9,ft:2.3,fta:2.9}},
      {id:'gsw-guisanto-97',name:'桂-桑托斯',img:'https://i10.hoopchina.com.cn/editor/cbca53243c08dfeb1e299407abfdcb7e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2221677,per:10.2,yearsRemaining:3,pos:'PF',ht:79,wt:185,exp:'2',salary_2026_27:4629630,salary_2027_28:5000000,salary_2028_29:5370370,stats:{g:68,gs:30,mp:20.5,pts:9.2,ast:2.3,trb:3.9,stl:0.9,blk:0.3,tov:1.5,pf:2.1,fg_pct:0.5,fg3_pct:0.351,ft_pct:0.725,orb:1.1,drb:2.8,fg:6.8,fga:1.1,fg3:3.3,fg3a:2.2,ft:1.3,fta:1.8}},
      {id:'gsw-deanthon-98',name:'丹东尼-梅尔顿',img:'https://i3.hoopchina.com.cn/editor/7e9ce1a382d9a429fcc3accbd652302f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3080921,per:11.2,yearsRemaining:1,pos:'PG',ht:74,wt:200,exp:'7',salary_2026_27:3451779,stats:{g:49,gs:24,mp:23,pts:12.3,ast:2.6,trb:3.2,stl:1.6,blk:0.4,tov:1.9,pf:1.9,fg_pct:0.407,fg3_pct:0.294,ft_pct:0.826,orb:0.8,drb:2.4,fg:10.8,fga:1.5,fg3:5,fg3a:2.9,ft:2,fta:2.5}},
      {id:'gsw-willrich-99',name:'威尔-理查德',img:'',salary:1272870,per:9,yearsRemaining:3,pos:'SG',ht:75,wt:206,exp:'R',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698,stats:{g:69,gs:21,mp:20,pts:6.4,ast:1.3,trb:2.5,stl:1.2,blk:0.1,tov:0.8,pf:1.9,fg_pct:1,fg3_pct:0.335,ft_pct:0.852,orb:1,drb:1.5,fg:5,fga:0.468,fg3:3.1,fg3a:1.3,ft:0.7,fta:0.8}},
      {id:'gsw-kristaps-106',name:'Kristaps Porziņģis',img:'https://i1.hoopchina.com.cn/editor/c4cf23d04f4d81458e4ca705d0d9e528_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:30731707,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'gsw-garypayt-107',name:'Gary Payton II',img:'https://i3.hoopchina.com.cn/editor/d45ca082bdcfb1e06f3233a563724092_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'gsw-quintenp-108',name:'Quinten Post',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'gsw-sethcurr-109',name:'Seth Curry',img:'https://i11.hoopchina.com.cn/editor/06d059f7fb4971b8b1fc50bc8d3e4358_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1755198,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'gsw-patspenc-110',name:'Pat Spencer',img:'',salary:857804,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  hou: {
    id:'hou',
    name:'休斯顿火箭',  
    shortName:'火箭',  
    conference:'west',  
    color:'#CE1141',  
    accent:'#C4CED4',  
    overTaxLine:0,
    capRoom:-32510080,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'hou-kevindur-100',name:'凯文-杜兰特',img:'https://i11.hoopchina.com.cn/editor/31c15b922d5c78d3b52f41698961680b_w_1040_h_760_.png',salary:54708609,per:16.7,yearsRemaining:2,pos:'SF',ht:83,wt:240,exp:'17',salary_2026_27:43902439,salary_2027_28:46097561,stats:{g:78,gs:78,mp:36.4,pts:26,ast:4.8,trb:5.5,stl:0.8,blk:0.9,tov:3.2,pf:1.8,fg_pct:0.52,fg3_pct:0.413,ft_pct:0.874,orb:0.5,drb:4.9,fg:17.6,fga:2.4,fg3:5.8,fg3a:6.8,ft:5.2,fta:6}},
      {id:'hou-alperens-101',name:'阿尔佩伦-申京',img:'https://i3.hoopchina.com.cn/editor/a336eaa032ab48776078f827a789fdd9_w_1040_h_760_.png',salary:33944954,per:14.5,yearsRemaining:4,pos:'C',ht:83,wt:243,exp:'4',salary_2026_27:35642202,salary_2027_28:37339450,salary_2028_29:39036697,salary_2029_30:39036697,stats:{g:72,gs:72,mp:33.3,pts:20.4,ast:6.2,trb:8.9,stl:1.2,blk:1.1,tov:3.2,pf:3.3,fg_pct:0.6,fg3_pct:0.305,ft_pct:0.691,orb:3,drb:5.9,fg:15.6,fga:0.519,fg3:1.8,fg3a:7.5,ft:3.6,fta:5.2}},
      {id:'hou-fredvanv-102',name:'弗雷德-范弗利特',img:'https://i1.hoopchina.com.cn/editor/ff01effea78a83133a4598920b401e8a_w_1040_h_760_.png',salary:25000000,per:12.2,yearsRemaining:1,pos:'PG',ht:72,wt:197,exp:'9',salary_2026_27:25000000},
      {id:'hou-jabarism-103',name:'小贾巴里-史密斯',img:'https://i10.hoopchina.com.cn/editor/cf98473e016f17c0da4d18e36e1df964_w_1040_h_760_.png',salary:12350392,per:14.6,yearsRemaining:5,pos:'PF',ht:83,wt:220,exp:'3',salary_2026_27:23643411,salary_2027_28:21751940,salary_2028_29:23643411,salary_2029_30:25534883,stats:{g:77,gs:77,mp:35.1,pts:15.8,ast:1.9,trb:6.9,stl:0.7,blk:0.9,tov:1.4,pf:2.5,fg_pct:0.45,fg3_pct:0.363,ft_pct:0.775,orb:1.4,drb:5.5,fg:12.6,fga:2.3,fg3:6.3,fg3a:3.4,ft:2.1,fta:2.7}},
      {id:'hou-dorianfi-104',name:'多里安-芬尼-史密斯',img:'https://i1.hoopchina.com.cn/editor/1076a208cc7ef136c40cbd0caac37edb_w_1040_h_760_.png',salary:12700000,per:11.4,yearsRemaining:3,pos:'PF',ht:79,wt:220,exp:'9',salary_2026_27:13335000,salary_2027_28:13335000,salary_2028_29:13335000,stats:{g:37,gs:1,mp:16.8,pts:3.3,ast:1,trb:2.5,stl:0.4,blk:0.2,tov:0.6,pf:1.6,fg_pct:0.7,fg3_pct:0.5,ft_pct:0.889,orb:0.9,drb:1.6,fg:3.6,fga:0.333,fg3:2.7,fg3a:0.27,ft:0.2,fta:0.2}},
      {id:'hou-stevenad-105',name:'史蒂文-亚当斯',img:'https://i10.hoopchina.com.cn/editor/76feb010fe0307d18647354a067c920f_w_1040_h_760_.png',salary:14130434,per:13.6,yearsRemaining:2,pos:'C',ht:83,wt:265,exp:'11',salary_2026_27:13000000,salary_2027_28:11869566,stats:{g:32,gs:11,mp:22.8,pts:5.8,ast:1.5,trb:8.6,stl:0.7,blk:0.6,tov:1.1,pf:1.7,fg_pct:0,fg3_pct:0,ft_pct:0.58,orb:4.5,drb:4.1,fg:4.3,fga:0.504,fg3:0,fg3a:2.2,ft:1.5,fta:2.5}},
      {id:'hou-amenthom-106',name:'阿门·汤普森',img:'https://i10.hoopchina.com.cn/editor/db9d38836d8c7c2df835c6b70f4f2a14_w_1040_h_760_.png',salary:9690600,per:13.8,yearsRemaining:1,pos:'PG',ht:79,wt:200,exp:'2',salary_2026_27:12258609,stats:{g:79,gs:79,mp:37.4,pts:18.3,ast:5.3,trb:7.8,stl:1.5,blk:0.6,tov:2.4,pf:2.2,fg_pct:0.3,fg3_pct:0.216,ft_pct:0.779,orb:3,drb:4.8,fg:13.2,fga:0.534,fg3:1.5,fg3a:6.7,ft:3.8,fta:4.9}},
      {id:'hou-reedshep-107',name:'里德·谢泼德',img:'https://i3.hoopchina.com.cn/editor/9181f991e6d507b62a44c02f784b1c53_w_1040_h_760_.png',salary:10603560,per:11.1,yearsRemaining:2,pos:'SG',ht:74,wt:185,exp:'1',salary_2026_27:11108880,salary_2027_28:14041625,stats:{g:82,gs:21,mp:26.2,pts:13.5,ast:3.4,trb:2.9,stl:1.5,blk:0.7,tov:1.5,pf:2,fg_pct:0.43,fg3_pct:0.394,ft_pct:0.802,orb:0.3,drb:2.6,fg:11.5,fga:2.8,fg3:7,fg3a:2.2,ft:0.8,fta:1}},
      {id:'hou-clintcap-108',name:'克林特-卡佩拉',img:'https://i10.hoopchina.com.cn/editor/602c609ebacbd58804784630dc246232_w_1040_h_760_.png',salary:6700000,per:8.4,yearsRemaining:2,pos:'C',ht:82,wt:256,exp:'11',salary_2026_27:7035000,salary_2027_28:7370000,stats:{g:75,gs:3,mp:12.3,pts:3.8,ast:0.7,trb:4.6,stl:0.5,blk:0.8,tov:0.5,pf:1,fg_pct:0,fg3_pct:0.5,ft_pct:0.577,orb:2.1,drb:2.5,fg:3,fga:0.52,fg3:0,fg3a:1.6,ft:0.6,fta:1}},
      {id:'hou-tarieaso-110',name:'Tari Eason',img:'https://i5.hoopchina.com.cn/editor/ac49ca1c96ee0e203cf3445f2ef6f7d2_w_1040_h_760_.png',salary:5675766,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'hou-joshokog-111',name:'Josh Okogie',img:'https://i11.hoopchina.com.cn/editor/8c43cb1eb462a7569729eb1e66bd7c1f_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'hou-jeffgree-112',name:'Jeff Green',img:'https://i5.hoopchina.com.cn/newsPost/4a9b04058c0f5da503cc27ea9b76b833_w_572_h_387_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'hou-aaronhol-113',name:'Aaron Holiday',img:'https://i5.hoopchina.com.cn/editor/f2bf50ee38383e5c24b341ac2b020399_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'hou-jaeseant-114',name:'Jae\'Sean Tate',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  ind: {
    id:'ind',
    name:'印第安纳步行者',  
    shortName:'步行者',  
    conference:'east',  
    color:'#002D62',  
    accent:'#FDBB30',  
    overTaxLine:0,
    capRoom:-29845164,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'ind-tyreseha-110',name:'泰雷斯-哈利伯顿',img:'',salary:45550512,per:18.4,yearsRemaining:3,pos:'PG',ht:77,wt:185,exp:'5',salary_2026_27:48924624,salary_2027_28:52298736,salary_2028_29:55672848},
      {id:'ind-pascalsi-111',name:'帕斯卡尔-西亚卡姆',img:'',salary:45550512,per:17.3,yearsRemaining:2,pos:'PF',ht:80,wt:245,exp:'9',salary_2026_27:48924624,salary_2027_28:52298736,stats:{g:62,gs:62,mp:33.2,pts:24,ast:3.8,trb:6.6,stl:1.1,blk:0.4,tov:2.2,pf:2.4,fg_pct:0.484,fg3_pct:0.358,ft_pct:0.693,orb:1.4,drb:5.2,fg:18.6,fga:1.7,fg3:4.7,fg3a:7.3,ft:4.2,fta:6.1}},
      {id:'ind-ivicazub-112',name:'伊维察-祖巴茨',img:'',salary:18893980,per:15.4,yearsRemaining:2,pos:'C',ht:84,wt:240,exp:'9',salary_2026_27:20342140,salary_2027_28:21790300,stats:{g:5,gs:5,mp:23.6,pts:11.6,ast:1.8,trb:7.2,stl:0.4,blk:0.8,tov:0.8,pf:1.6,fg_pct:0,fg3_pct:0,ft_pct:0.8,orb:2.8,drb:4.4,fg:10.6,fga:0.472,fg3:0,fg3a:5,ft:1.6,fta:2}},
      {id:'ind-andrewne-113',name:'安德鲁-内姆布哈德',img:'',salary:18102000,per:11.2,yearsRemaining:2,pos:'PG',ht:76,wt:191,exp:'3',salary_2026_27:19550160,salary_2027_28:20998320,stats:{g:57,gs:57,mp:31.3,pts:16.9,ast:7.7,trb:2.8,stl:0.9,blk:0.1,tov:2.4,pf:2.2,fg_pct:0.442,fg3_pct:0.361,ft_pct:0.825,orb:0.4,drb:2.4,fg:13.2,fga:1.9,fg3:5.2,fg3a:4,ft:3.4,fta:4.1}},
      {id:'ind-obitoppi-114',name:'奥比-托平',img:'',salary:14000000,per:12.4,yearsRemaining:2,pos:'PF',ht:81,wt:220,exp:'5',salary_2026_27:15000000,salary_2027_28:16025000,stats:{g:24,gs:3,mp:17.7,pts:11.6,ast:2.3,trb:4.4,stl:0.5,blk:0,tov:1.2,pf:1.2,fg_pct:0.503,fg3_pct:0.352,ft_pct:0.913,orb:0.5,drb:3.9,fg:8.3,fga:1.5,fg3:4.4,fg3a:2.6,ft:1.8,fta:1.9}},
      {id:'ind-tjmcconn-115',name:'TJ-麦康奈尔',img:'',salary:10200000,per:13.3,yearsRemaining:3,pos:'PG',ht:73,wt:190,exp:'10',salary_2026_27:11000000,salary_2027_28:11800000,salary_2028_29:11800000,stats:{g:56,gs:4,mp:17.2,pts:9.4,ast:5.1,trb:2.2,stl:1,blk:0.2,tov:1.1,pf:1.1,fg_pct:0.3,fg3_pct:0.32,ft_pct:0.862,orb:0.4,drb:1.8,fg:8,fga:0.538,fg3:0.9,fg3a:4,ft:0.4,fta:0.5}},
      {id:'ind-jaracewa-116',name:'贾雷斯-沃克',img:'',salary:6665520,per:11.7,yearsRemaining:1,pos:'PF',ht:79,wt:235,exp:'2',salary_2026_27:8478542,stats:{g:76,gs:41,mp:25.7,pts:11.6,ast:2.5,trb:5.1,stl:0.8,blk:0.3,tov:1.8,pf:1.6,fg_pct:0.419,fg3_pct:0.374,ft_pct:0.749,orb:0.6,drb:4.5,fg:9.6,fga:1.8,fg3:4.7,fg3a:2.3,ft:1.8,fta:2.4}},
      {id:'ind-benshepp-117',name:'本·谢泼德',img:'',salary:2790720,per:8.4,yearsRemaining:1,pos:'SG',ht:78,wt:190,exp:'2',salary_2026_27:5031669,stats:{g:65,gs:20,mp:21.4,pts:7.1,ast:1.8,trb:3,stl:0.6,blk:0.1,tov:0.6,pf:1.8,fg_pct:0.434,fg3_pct:0.362,ft_pct:0.765,orb:0.7,drb:2.3,fg:6,fga:1.3,fg3:3.6,fg3a:1.3,ft:0.6,fta:0.8}},
      {id:'ind-kobebrow-118',name:'科比·布朗',img:'',salary:2654880,per:11.2,yearsRemaining:1,pos:'PF',ht:79,wt:250,exp:'2',salary_2026_27:4792059,stats:{g:27,gs:10,mp:24.7,pts:9.4,ast:2,trb:4.9,stl:0.5,blk:0.4,tov:1.4,pf:2,fg_pct:0.503,fg3_pct:0.433,ft_pct:0.788,orb:1.9,drb:3,fg:6.9,fga:1.4,fg3:3.3,fg3a:2,ft:1,fta:1.2}},
      {id:'ind-micahpot-119',name:'米卡-波特',img:'',salary:1527805,per:11.8,yearsRemaining:1,pos:'C',ht:81,wt:248,exp:'4',salary_2026_27:2801346,stats:{g:47,gs:7,mp:19.3,pts:9.7,ast:1.5,trb:5,stl:0.5,blk:0.3,tov:1,pf:1.7,fg_pct:0.515,fg3_pct:0.423,ft_pct:0.842,orb:1.2,drb:3.7,fg:6.2,fga:1.5,fg3:3.6,fg3a:1.7,ft:1.8,fta:2.1}},
      {id:'ind-aaronnes-120',name:'Aaron Nesmith',img:'',salary:11000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:11000000,salary_2027_28:19418000,salary_2028_29:20971440},
      {id:'ind-tonybrad-121',name:'Tony Bradley',img:'',salary:3204816,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-jayhuff-122',name:'Jay Huff',img:'',salary:2349578,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2667944,salary_2027_28:3005085},
      {id:'ind-johnnyfu-123',name:'Johnny Furphy',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995},
      {id:'ind-kamjones-124',name:'Kam Jones',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'ind-jameswis-125',name:'James Wiseman',img:'',salary:1131970,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-jeremiah-126',name:'Jeremiah Robinson-Earl',img:'',salary:131970,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-montemor-127',name:'Monte Morris',img:'',salary:321184,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-garrison-128',name:'Garrison Mathews',img:'',salary:429325,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-macmcclu-129',name:'Mac McClung',img:'',salary:164060,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'ind-gabemcgl-130',name:'Gabe McGlothan',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  lac: {
    id:'lac',
    name:'洛杉矶快船',  
    shortName:'快船',  
    conference:'west',  
    color:'#C8102E',  
    accent:'#1D428A',  
    overTaxLine:0,
    capRoom:-219340,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'lac-kawhileo-120',name:'科怀-伦纳德',img:'https://i5.hoopchina.com.cn/editor/af47cb0f9481a006920c7f1de8120aed_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:50000000,per:20.2,yearsRemaining:1,pos:'SF',ht:78,wt:225,exp:'13',salary_2026_27:50300000,stats:{g:65,gs:65,mp:32.1,pts:27.9,ast:3.6,trb:6.4,stl:1.9,blk:0.4,tov:2,pf:1.2,fg_pct:0.505,fg3_pct:0.387,ft_pct:0.892,orb:1.1,drb:5.3,fg:19.4,fga:2.6,fg3:6.8,fg3a:7.1,ft:5.7,fta:6.4}},
      {id:'lac-dariusga-121',name:'达里厄斯-加兰',img:'https://i11.hoopchina.com.cn/editor/cfdcddcb762f043734cfedbfc3efc163_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:39446090,per:17,yearsRemaining:2,pos:'PG',ht:73,wt:192,exp:'6',salary_2026_27:42166510,salary_2027_28:44886930,stats:{g:19,gs:17,mp:29.1,pts:19.9,ast:6.4,trb:2.3,stl:1.2,blk:0.3,tov:3,pf:1.9,fg_pct:0.471,fg3_pct:0.438,ft_pct:0.86,orb:0.3,drb:2,fg:15.5,fga:3.3,fg3:7.6,fg3a:4,ft:1.9,fta:2.3}},
      {id:'lac-bogdanbo-122',name:'波格丹-波格丹诺维奇',img:'https://i1.hoopchina.com.cn/editor/fa970a093db1e4ba474cc51afca525aa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:16020000,per:10.3,yearsRemaining:1,pos:'SG',ht:77,wt:225,exp:'8',salary_2026_27:16020000,stats:{g:23,gs:3,mp:19.7,pts:7.4,ast:2.2,trb:2.6,stl:0.4,blk:0.1,tov:1.2,pf:2,fg_pct:0.388,fg3_pct:0.347,ft_pct:0.8,orb:0.3,drb:2.3,fg:6.6,fga:1.4,fg3:4.1,fg3a:1.1,ft:0.9,fta:1.1}},
      {id:'lac-derrickj-123',name:'小德里克-琼斯',img:'https://i3.hoopchina.com.cn/editor/ce53605f105ad01def2a52d54681a75c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:10000000,per:12.3,yearsRemaining:1,pos:'SF',ht:78,wt:210,exp:'9',salary_2026_27:10476190,stats:{g:50,gs:45,mp:27,pts:10.1,ast:1.4,trb:3.5,stl:0.9,blk:1,tov:0.8,pf:2.1,fg_pct:0.499,fg3_pct:0.359,ft_pct:0.763,orb:1.2,drb:2.2,fg:7.6,fga:1.1,fg3:3.1,fg3a:2.7,ft:1.4,fta:1.9}},
      {id:'lac-brooklop-124',name:'布鲁克-洛佩斯',img:'https://i10.hoopchina.com.cn/editor/825987d0822b71a0316dedef6716ea41_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:8750000,per:10.9,yearsRemaining:1,pos:'C',ht:85,wt:282,exp:'17',salary_2026_27:9187500,stats:{g:75,gs:40,mp:21.8,pts:8.5,ast:1.3,trb:3.6,stl:0.6,blk:1.2,tov:0.8,pf:2.1,fg_pct:0.428,fg3_pct:0.36,ft_pct:0.757,orb:0.6,drb:3,fg:7.2,fga:1.5,fg3:4.2,fg3a:1.6,ft:0.7,fta:1}},
      {id:'lac-isaiahja-125',name:'以赛亚-杰克逊',img:'',salary:7600000,per:8.8,yearsRemaining:2,pos:'C',ht:80,wt:205,exp:'4',salary_2026_27:7000000,salary_2027_28:6400000,stats:{g:17,gs:0,mp:15.9,pts:7.5,ast:1.2,trb:4.6,stl:0.6,blk:1.2,tov:0.9,pf:2.3,fg_pct:0,fg3_pct:0,ft_pct:0.548,orb:1.6,drb:3.1,fg:4.2,fga:0.764,fg3:0.1,fg3a:3.2,ft:1,fta:1.8}},
      {id:'lac-nicolasb-126',name:'尼古拉斯-巴图姆',img:'https://i5.hoopchina.com.cn/editor/3e79b1600fd183c8bbfc3ac415f8630a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:5601600,per:8.3,yearsRemaining:1,pos:'PF',ht:79,wt:230,exp:'17',salary_2026_27:5881680,stats:{g:74,gs:6,mp:17.5,pts:4,ast:0.9,trb:2.5,stl:0.6,blk:0.3,tov:0.5,pf:1.4,fg_pct:0.403,fg3_pct:0.1,ft_pct:0.818,orb:0.3,drb:2.2,fg:3.2,fga:1.2,fg3:3.1,fg3a:0.404,ft:0.1,fta:0.1}},
      {id:'lac-krisdunn-127',name:'克里斯-邓恩',img:'https://i11.hoopchina.com.cn/editor/8438b904d078acbd7f66e070863d7436_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:5426400,per:11.5,yearsRemaining:1,pos:'PG',ht:75,wt:205,exp:'9',salary_2026_27:5684800,stats:{g:82,gs:68,mp:27.2,pts:7.3,ast:3.6,trb:3.3,stl:1.6,blk:0.2,tov:1.4,pf:2.3,fg_pct:1,fg3_pct:0.374,ft_pct:0.765,orb:0.7,drb:2.6,fg:5.8,fga:0.476,fg3:2.6,fg3a:1.8,ft:0.8,fta:1}},
      {id:'lac-bradleyb-128',name:'布拉德利-比尔',img:'https://i10.hoopchina.com.cn/editor/69de28a9410ec347a8d3324a46387c81_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:24737010,per:9.1,yearsRemaining:1,pos:'SG',ht:76,wt:207,exp:'13',salary_2026_27:25004710,salary_2027_28:19383010,salary_2028_29:19383010,salary_2029_30:19383010,stats:{g:6,gs:6,mp:20.2,pts:8.2,ast:1.7,trb:0.8,stl:0.5,blk:0,tov:1.5,pf:2.3,fg_pct:0.375,fg3_pct:0.368,ft_pct:0.75,orb:0.3,drb:0.5,fg:8,fga:1.2,fg3:3.2,fg3a:1.8,ft:1,fta:1.3}},
      {id:'lac-yanickon-129',name:'亚尼克-科南-尼德豪泽',img:'https://i1.hoopchina.com.cn/editor/e891f78f5cacd59005cd553c9a1fca16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2743800,per:11.7,yearsRemaining:3,pos:'C',ht:83,wt:242,exp:'R',salary_2026_27:2880960,salary_2027_28:3018480,salary_2028_29:5448356,stats:{g:41,gs:0,mp:10.3,pts:4.3,ast:0.3,trb:2.9,stl:0.1,blk:0.7,tov:0.6,pf:1.6,fg_pct:0,fg3_pct:0.2,ft_pct:0.758,orb:0.9,drb:2,fg:2.4,fga:0.64,fg3:0.1,fg3a:1.5,ft:1.1,fta:1.5}},
      {id:'lac-johncoll-130',name:'John Collins',img:'',salary:26580000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lac-bennedic-131',name:'Bennedict Mathurin',img:'https://i11.hoopchina.com.cn/editor/f37d6d87c5166de210c2fa36ae189a87_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:9187573,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lac-camchris-132',name:'Cam Christie',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995},
      {id:'lac-jordanmi-133',name:'Jordan Miller',img:'',salary:712637,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2497812},
      {id:'lac-kobesand-134',name:'Kobe Sanders',img:'',salary:475497,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917},
      {id:'lac-dalanoba-135',name:'Dalano Banton',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lac-patrickb-136',name:'Patrick Baldwin Jr.',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  lal: {
    id:'lal',
    name:'洛杉矶湖人',  
    shortName:'湖人',  
    conference:'west',  
    color:'#552583',  
    accent:'#FDB927',  
    overTaxLine:0,
    capRoom:47531863,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'lal-lukadonc-130',name:'卢卡-东契奇',img:'https://i1.hoopchina.com.cn/newsPost/ed8ffcdbfd3fbf7eddceab1e074c460a_w_1040_h_760_.png',salary:45999660,per:18.7,yearsRemaining:3,pos:'PG',ht:80,wt:230,exp:'7',salary_2026_27:49800000,salary_2027_28:53784000,salary_2028_29:57768000,stats:{g:64,gs:64,mp:35.8,pts:33.5,ast:8.3,trb:7.7,stl:1.6,blk:0.5,tov:4,pf:2.4,fg_pct:0.476,fg3_pct:0.366,ft_pct:0.78,orb:0.6,drb:7.1,fg:22.8,fga:4,fg3:10.8,fg3a:6.9,ft:7.9,fta:10.1}},
      {id:'lal-austinre-131',name:'奥斯汀-里夫斯',img:'https://i5.hoopchina.com.cn/editor/daac407a8e3507694126462676dcbe78_w_1040_h_760_.png',salary:13937574,per:13,yearsRemaining:1,pos:'SG',ht:77,wt:197,exp:'4',salary_2026_27:14898786,stats:{g:51,gs:45,mp:34.5,pts:23.3,ast:5.5,trb:4.7,stl:1.1,blk:0.4,tov:3,pf:2.2,fg_pct:0.49,fg3_pct:0.36,ft_pct:0.871,orb:0.6,drb:4.1,fg:14.9,fga:2.3,fg3:6.4,fg3a:5,ft:6.3,fta:7.3}},
      {id:'lal-jarredva-132',name:'贾里德-范德比尔特',img:'https://i5.hoopchina.com.cn/editor/75f6be2828691b1b2c5f8f81fa7a159d_w_1040_h_760_.png',salary:11571429,per:11.9,yearsRemaining:2,pos:'PF',ht:80,wt:214,exp:'7',salary_2026_27:12428571,salary_2027_28:13285714,stats:{g:65,gs:3,mp:17.4,pts:4.4,ast:1.3,trb:4.5,stl:0.8,blk:0.3,tov:0.9,pf:1.6,fg_pct:0.4,fg3_pct:0.293,ft_pct:0.589,orb:1.2,drb:3.3,fg:3.7,fga:0.471,fg3:1.5,fg3a:1.3,ft:0.5,fta:0.9}},
      {id:'lal-deandrea-133',name:'德安德烈-艾顿',img:'https://i11.hoopchina.com.cn/editor/52711eeab38779bd8d3494de428e3938_w_1040_h_760_.png',salary:33654814,per:10.6,yearsRemaining:1,pos:'C',ht:84,wt:252,exp:'7',salary_2026_27:8104000,stats:{g:72,gs:72,mp:27.2,pts:12.5,ast:0.8,trb:8,stl:0.6,blk:1,tov:1.2,pf:2.2,fg_pct:0,fg3_pct:0,ft_pct:0.645,orb:2.6,drb:5.4,fg:8.3,fga:0.671,fg3:0,fg3a:5.6,ft:1.3,fta:2}},
      {id:'lal-jakelara-134',name:'杰克-拉拉维亚',img:'https://i10.hoopchina.com.cn/editor/932a7dcf6c74d968ad4085025dfdeb63_w_1040_h_760_.png',salary:6000000,per:11.9,yearsRemaining:1,pos:'PF',ht:79,wt:235,exp:'3',salary_2026_27:6000000,stats:{g:82,gs:43,mp:25.1,pts:8.2,ast:1.8,trb:4,stl:1.3,blk:0.5,tov:1.1,pf:2.4,fg_pct:1,fg3_pct:0.321,ft_pct:0.763,orb:1.4,drb:2.6,fg:6.4,fga:0.459,fg3:3,fg3a:2,ft:1.4,fta:1.9}},
      {id:'lal-marcussm-135',name:'马库斯-斯马特',img:'https://i5.hoopchina.com.cn/editor/5e9ab4c6f9ccb79429b6fb8ba8f29c21_w_1040_h_760_.png',salary:19920855,per:8.5,yearsRemaining:1,pos:'SG',ht:75,wt:220,exp:'11',salary_2026_27:5390700,stats:{g:62,gs:54,mp:28.5,pts:9.3,ast:3,trb:2.8,stl:1.4,blk:0.4,tov:1.5,pf:2.6,fg_pct:0.395,fg3_pct:0.331,ft_pct:0.822,orb:0.6,drb:2.2,fg:7.7,fga:1.6,fg3:4.7,fg3a:1.5,ft:1.7,fta:2.1}},
      {id:'lal-daltonkn-136',name:'道尔顿·克内克特',img:'https://i11.hoopchina.com.cn/editor/0fd776701387717095e517b7c9eebda8_w_1040_h_760_.png',salary:4010160,per:9.2,yearsRemaining:2,pos:'SF',ht:78,wt:215,exp:'1',salary_2026_27:4201080,salary_2027_28:6452860,stats:{g:54,gs:1,mp:10.2,pts:4.2,ast:0.4,trb:1.4,stl:0.2,blk:0.2,tov:0.4,pf:0.8,fg_pct:0.7,fg3_pct:0.9,ft_pct:0.727,orb:0.3,drb:1.1,fg:3.5,fga:0.455,fg3:2.1,fg3a:0.342,ft:0.3,fta:0.4}},
      {id:'lal-bronnyja-138',name:'布朗尼·詹姆斯',img:'https://i3.hoopchina.com.cn/editor/75df946b9148d2a8422908f75a0ffaf4_w_1040_h_760_.png',salary:1955377,per:9.8,yearsRemaining:2,pos:'SG',ht:74,wt:210,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995,stats:{g:42,gs:1,mp:8.9,pts:2.9,ast:1.2,trb:0.5,stl:0.5,blk:0.1,tov:0.6,pf:0.7,fg_pct:0.5,fg3_pct:0.6,ft_pct:0.857,orb:0.1,drb:0.4,fg:2.7,fga:0.409,fg3:1.4,fg3a:0.386,ft:0.1,fta:0.2}},
      {id:'lal-adouthie-139',name:'阿杜-蒂耶罗',img:'',salary:1272870,per:11.2,yearsRemaining:2,pos:'SF',ht:79,wt:220,exp:'R',salary_2026_27:2150917,salary_2027_28:2525901,stats:{g:25,gs:0,mp:6,pts:1.9,ast:0.4,trb:1.1,stl:0.3,blk:0.1,tov:0.4,pf:0.8,fg_pct:0,fg3_pct:0.6,ft_pct:0.636,orb:0.4,drb:0.8,fg:1.2,fga:0.516,fg3:0.1,fg3a:0.333,ft:0.6,fta:0.9}},
      {id:'lal-lebronja-140',name:'LeBron James',img:'https://i10.hoopchina.com.cn/editor/fe3fa05e681546adb4bf9b7867ecdb95_w_1040_h_760_.png',salary:52627153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lal-ruihachi-141',name:'Rui Hachimura',img:'https://i1.hoopchina.com.cn/editor/8cab42afc074491cd9b545fa6b08e673_w_1040_h_760_.png',salary:18259259,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lal-lukekenn-142',name:'Luke Kennard',img:'https://i10.hoopchina.com.cn/editor/f604a7de8231dfe3400332747d5cea5d_w_1040_h_760_.png',salary:11000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lal-maxikleb-143',name:'Maxi Kleber',img:'',salary:11000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lal-jaxsonha-144',name:'Jaxson Hayes',img:'https://i3.hoopchina.com.cn/editor/d5ea6895b65a48ac49c5c12f703905b9_w_1040_h_760_.png',salary:3449323,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'lal-kobebufk-145',name:'Kobe Bufkin',img:'',salary:5480297,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  mem: {
    id:'mem',
    name:'孟菲斯灰熊',  
    shortName:'灰熊',  
    conference:'west',  
    color:'#5D76A9',  
    accent:'#12173F',  
    overTaxLine:0,
    capRoom:24338776,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'mem-jamorant-140',name:'贾-莫兰特',img:'',salary:39446090,per:16,yearsRemaining:2,pos:'PG',ht:74,wt:174,exp:'6',salary_2026_27:42166510,salary_2027_28:44886930,stats:{g:20,gs:20,mp:28.5,pts:19.5,ast:8.1,trb:3.3,stl:1,blk:0.3,tov:3.6,pf:2,fg_pct:1,fg3_pct:0.235,ft_pct:0.897,orb:0.4,drb:2.9,fg:16.1,fga:0.41,fg3:4.3,fg3a:5.6,ft:5.3,fta:5.9}},
      {id:'mem-kentavio-141',name:'肯塔维厄斯-考德威尔-波普',img:'',salary:21621500,per:12.2,yearsRemaining:1,pos:'SG',ht:77,wt:204,exp:'12',salary_2026_27:21621500,stats:{g:51,gs:14,mp:21.3,pts:8.4,ast:2.7,trb:2.5,stl:0.8,blk:0.2,tov:1.2,pf:1.1,fg_pct:0.41,fg3_pct:0.316,ft_pct:0.913,orb:0.4,drb:2.1,fg:7.2,fga:1.1,fg3:3.4,fg3a:1.9,ft:1.4,fta:1.6}},
      {id:'mem-santiald-142',name:'桑迪-阿尔达马',img:'',salary:18485916,per:11.3,yearsRemaining:2,pos:'PF',ht:84,wt:215,exp:'4',salary_2026_27:17007043,salary_2027_28:17007043,stats:{g:43,gs:11,mp:27.9,pts:14,ast:2.9,trb:6.7,stl:0.9,blk:0.7,tov:1.3,pf:1.6,fg_pct:0.479,fg3_pct:0.35,ft_pct:0.667,orb:1.6,drb:5.1,fg:11.1,fga:1.6,fg3:4.7,fg3a:3.7,ft:1.8,fta:2.7}},
      {id:'mem-brandonc-143',name:'布兰登-克拉克',img:'',salary:12500000,per:13.4,yearsRemaining:1,pos:'PF',ht:80,wt:215,exp:'6',salary_2026_27:12500000,stats:{g:2,gs:2,mp:10,pts:4,ast:0.5,trb:3,stl:1,blk:0,tov:0,pf:2.5,fg_pct:0,fg3_pct:0,ft_pct:0.5,orb:2,drb:1,fg:4.5,fga:0.333,fg3:0,fg3a:1.5,ft:1,fta:2}},
      {id:'mem-tyjerome-144',name:'泰-杰罗姆',img:'',salary:8781000,per:11.8,yearsRemaining:2,pos:'SG',ht:77,wt:195,exp:'6',salary_2026_27:9220050,salary_2027_28:9659100,stats:{g:15,gs:15,mp:22.6,pts:19.7,ast:5.7,trb:2.8,stl:1.1,blk:0.3,tov:1.8,pf:2.1,fg_pct:0.474,fg3_pct:0.42,ft_pct:0.875,orb:0.7,drb:2.1,fg:14.3,fga:2.8,fg3:6.7,fg3a:4,ft:3.3,fta:3.7}},
      {id:'mem-taylorhe-145',name:'泰勒·亨德里克斯',img:'',salary:6127080,per:11.6,yearsRemaining:1,pos:'PF',ht:81,wt:215,exp:'2',salary_2026_27:7805900,stats:{g:26,gs:11,mp:24.1,pts:10.6,ast:1.2,trb:4.7,stl:1.4,blk:0.8,tov:1.2,pf:2.3,fg_pct:0.463,fg3_pct:0.342,ft_pct:0.65,orb:1.4,drb:3.3,fg:8.7,fga:1.5,fg3:4.4,fg3a:2.5,ft:1,fta:1.5}},
      {id:'mem-zachedey-146',name:'扎克·埃迪',img:'',salary:6045000,per:9,yearsRemaining:2,pos:'C',ht:87,wt:305,exp:'1',salary_2026_27:6332760,salary_2027_28:8067937,stats:{g:11,gs:11,mp:25.8,pts:13.6,ast:1.1,trb:11.1,stl:0.6,blk:1.9,tov:2.4,pf:3.4,fg_pct:0.1,fg3_pct:0.2,ft_pct:0.781,orb:3.9,drb:7.2,fg:8.9,fga:0.633,fg3:0.5,fg3a:5.5,ft:2.3,fta:2.9}},
      {id:'mem-cedricco-147',name:'塞德里克-考沃德',img:'',salary:5715120,per:10.9,yearsRemaining:3,pos:'SG',ht:77,wt:206,exp:'R',salary_2026_27:6001080,salary_2027_28:6286920,salary_2028_29:8342743,stats:{g:62,gs:47,mp:25.8,pts:13.6,ast:2.8,trb:5.9,stl:0.6,blk:0.4,tov:1.7,pf:2,fg_pct:0.471,fg3_pct:0.338,ft_pct:0.843,orb:1.3,drb:4.5,fg:10.5,fga:1.5,fg3:4.4,fg3a:3.4,ft:2.3,fta:2.7}},
      {id:'mem-waltercl-148',name:'沃尔特-克莱顿',img:'',salary:3991320,per:9.8,yearsRemaining:3,pos:'PG',ht:76,wt:195,exp:'R',salary_2026_27:4190520,salary_2027_28:4390320,salary_2028_29:6752312,stats:{g:24,gs:6,mp:25,pts:9.7,ast:5.7,trb:2.1,stl:0.8,blk:0.3,tov:2.5,pf:1.7,fg_pct:0.366,fg3_pct:0.307,ft_pct:0.864,orb:0.4,drb:1.7,fg:8.5,fga:1.3,fg3:4.2,fg3a:1.8,ft:2.1,fta:2.5}},
      {id:'mem-kyleande-150',name:'Kyle Anderson',img:'https://i11.hoopchina.com.cn/editor/ae6198a5415899cd81989770e4504ffd_w_1040_h_760_.png',salary:9219512,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-georgesn-151',name:'Georges Niang',img:'',salary:8200000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-coleanth-152',name:'Cole Anthony',img:'',salary:5996274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3700000,salary_2027_28:3700000},
      {id:'mem-camspenc-153',name:'Cam Spencer',img:'',salary:2537989,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2411090,salary_2027_28:2616754,salary_2028_29:2830685},
      {id:'mem-ericgord-154',name:'Eric Gordon',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-scottypi-155',name:'Scotty Pippen Jr.',img:'',salary:2270735,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2461462,salary_2027_28:2789215},
      {id:'mem-ggjackso-156',name:'GG Jackson II',img:'https://i1.hoopchina.com.cn/editor/900544941bd831f22cedff69f174cd27_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2406205},
      {id:'mem-jaylenwe-157',name:'Jaylen Wells',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995},
      {id:'mem-mamadidi-158',name:'Mamadi Diakite',img:'',salary:464050,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:464050},
      {id:'mem-christia-159',name:'Christian Koloko',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-kobebufk-160',name:'Kobe Bufkin',img:'',salary:5480297,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-rayanrup-161',name:'Rayan Rupert',img:'',salary:2353647,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-charlesb-162',name:'Charles Bassey',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-lawsonlo-163',name:'Lawson Lovering',img:'',salary:87784,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-adamaalp-164',name:'Adama-Alpha Bal',img:'',salary:117045,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mem-lucaswil-165',name:'Lucas Williamson',img:'',salary:21946,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  mia: {
    id:'mia',
    name:'迈阿密热火',  
    shortName:'热火',  
    conference:'east',  
    color:'#98002E',  
    accent:'#F9A01B',  
    overTaxLine:0,
    capRoom:-5874463,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'mia-bamadeba-150',name:'巴姆-阿德巴约',img:'https://i1.hoopchina.com.cn/editor/daa5272020df61551a542e78c0db004a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:37096620,per:18.4,yearsRemaining:3,pos:'C',ht:81,wt:255,exp:'8',salary_2026_27:49800000,salary_2027_28:53784000,salary_2028_29:57768000,stats:{g:73,gs:73,mp:32.4,pts:20.1,ast:3.2,trb:10,stl:1.2,blk:0.7,tov:1.6,pf:1.7,fg_pct:0.442,fg3_pct:0.318,ft_pct:0.778,orb:2,drb:8,fg:15.7,fga:1.7,fg3:5.5,fg3a:5.2,ft:4.5,fta:5.8}},
      {id:'mia-tylerher-151',name:'泰勒-希罗',img:'https://i1.hoopchina.com.cn/editor/25bb2b255fd696750463da945cfeceae_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:31000000,per:15.8,yearsRemaining:1,pos:'SG',ht:77,wt:195,exp:'6',salary_2026_27:33000000,stats:{g:33,gs:28,mp:31.3,pts:20.5,ast:4.1,trb:4.8,stl:0.7,blk:0.4,tov:1.9,pf:1.9,fg_pct:0.48,fg3_pct:0.378,ft_pct:0.917,orb:0.4,drb:4.4,fg:15.6,fga:2.5,fg3:6.7,fg3a:4.9,ft:3,fta:3.3}},
      {id:'mia-andrewwi-152',name:'安德鲁-威金斯',img:'https://i10.hoopchina.com.cn/editor/2847a516feb0bb99a9b143f68a0b267c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:28223215,per:17.1,yearsRemaining:1,pos:'SF',ht:78,wt:197,exp:'11',salary_2026_27:30169644,stats:{g:68,gs:68,mp:30.3,pts:15.4,ast:2.7,trb:4.8,stl:1.1,blk:1,tov:1.5,pf:2.3,fg_pct:0.475,fg3_pct:0.414,ft_pct:0.784,orb:1.7,drb:3.1,fg:12.1,fga:2,fg3:4.9,fg3a:3.7,ft:1.9,fta:2.4}},
      {id:'mia-nikolajo-153',name:'尼科拉-约维奇',img:'https://i5.hoopchina.com.cn/editor/27d52bc0a281f012e1b60c4cbc35a352_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:4445417,per:13,yearsRemaining:4,pos:'PF',ht:82,wt:205,exp:'3',salary_2026_27:16200000,salary_2027_28:14904000,salary_2028_29:15096000,salary_2029_30:16200000,stats:{g:47,gs:1,mp:17.2,pts:7.3,ast:2.2,trb:3.3,stl:0.6,blk:0.4,tov:1.4,pf:1.4,fg_pct:1,fg3_pct:0.269,ft_pct:0.683,orb:0.5,drb:2.7,fg:6.7,fga:0.366,fg3:3.6,fg3a:1.5,ft:1.5,fta:2.1}},
      {id:'mia-davionmi-154',name:'戴维恩-米切尔',img:'https://i3.hoopchina.com.cn/editor/07bbafb9f08cb98ea4abc91951abaa29_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:11600000,per:13.2,yearsRemaining:1,pos:'PG',ht:72,wt:202,exp:'4',salary_2026_27:12400000,stats:{g:70,gs:70,mp:28.6,pts:9.3,ast:6.5,trb:2.7,stl:1,blk:0.2,tov:1.5,pf:2.6,fg_pct:0.49,fg3_pct:0.395,ft_pct:0.646,orb:0.5,drb:2.2,fg:7.6,fga:1.3,fg3:3.3,fg3a:2.4,ft:0.6,fta:0.9}},
      {id:'mia-jaimejaq-155',name:'小海梅-哈克斯',img:'https://i11.hoopchina.com.cn/editor/30703514165f765aa8de23be7f5fa32f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3861600,per:8.8,yearsRemaining:1,pos:'SF',ht:78,wt:225,exp:'2',salary_2026_27:5939141,stats:{g:75,gs:1,mp:28.3,pts:15.4,ast:4.7,trb:5,stl:0.7,blk:0.3,tov:2,pf:1.8,fg_pct:0.8,fg3_pct:0.317,ft_pct:0.769,orb:1.3,drb:3.7,fg:12.2,fga:0.507,fg3:2.4,fg3a:5.4,ft:2.2,fta:2.9}},
      {id:'mia-kelelwar-156',name:'凯莱尔·韦尔',img:'https://i10.hoopchina.com.cn/editor/823da767942d82e3e903e968321d8555_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:4443360,per:9.3,yearsRemaining:2,pos:'C',ht:84,wt:230,exp:'1',salary_2026_27:4654920,salary_2027_28:7135992,stats:{g:77,gs:34,mp:22.1,pts:11.1,ast:0.7,trb:9,stl:0.8,blk:1.1,tov:0.8,pf:1.5,fg_pct:0.53,fg3_pct:0.395,ft_pct:0.74,orb:2.8,drb:6.2,fg:8.4,fga:1.2,fg3:3,fg3a:3.3,ft:0.9,fta:1.2}},
      {id:'mia-kasparas-157',name:'卡斯帕拉斯-亚库契奥尼斯',img:'https://i10.hoopchina.com.cn/editor/1072fa03d3f8f4e396cbbf78bf0edac6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3658800,per:8.3,yearsRemaining:3,pos:'PG',ht:77,wt:200,exp:'R',salary_2026_27:3841680,salary_2027_28:4024440,salary_2028_29:6205687,stats:{g:53,gs:12,mp:17.8,pts:6.2,ast:2.6,trb:2.6,stl:0.6,blk:0.1,tov:0.9,pf:1.9,fg_pct:0.429,fg3_pct:0.7,ft_pct:0.879,orb:0.8,drb:1.8,fg:4.5,fga:1.2,fg3:2.9,fg3a:0.423,ft:1.1,fta:1.2}},
      {id:'mia-drusmith-158',name:'德鲁-史密斯',img:'',salary:2378870,per:10,yearsRemaining:2,pos:'SG',ht:74,wt:203,exp:'3',salary_2026_27:2584539,salary_2027_28:2934742,stats:{g:70,gs:1,mp:16.3,pts:5.6,ast:2.6,trb:2.5,stl:1.4,blk:0.3,tov:0.8,pf:1.6,fg_pct:0.5,fg3_pct:0.295,ft_pct:0.829,orb:0.9,drb:1.6,fg:4.6,fga:0.415,fg3:1.8,fg3a:1.4,ft:1.2,fta:1.5}},
      {id:'mia-myrongar-159',name:'迈伦-加德纳',img:'',salary:395029,per:10.6,yearsRemaining:2,pos:'SF',ht:77,wt:220,exp:'R',salary_2026_27:2150917,salary_2027_28:2525901,stats:{g:45,gs:7,mp:9.1,pts:3.6,ast:1,trb:2.7,stl:0.4,blk:0.2,tov:0.4,pf:1.7,fg_pct:0.6,fg3_pct:0.7,ft_pct:0.731,orb:0.9,drb:1.8,fg:2.7,fga:0.48,fg3:1.4,fg3a:0.406,ft:0.4,fta:0.6}},
      {id:'mia-terryroz-160',name:'Terry Rozier',img:'',salary:26643031,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mia-normanpo-161',name:'Norman Powell',img:'',salary:20482758,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mia-simonefo-162',name:'Simone Fontecchio',img:'',salary:8307692,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mia-keshadjo-163',name:'Keshad Johnson',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mia-pellelar-164',name:'Pelle Larsson',img:'https://i1.hoopchina.com.cn/editor/e6cae317e60053a6267341e933d10812_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271}
    ]
  },

  mil: {
    id:'mil',
    name:'密尔沃基雄鹿',  
    shortName:'雄鹿',  
    conference:'east',  
    color:'#00471B',  
    accent:'#EEE1C6',  
    overTaxLine:0,
    capRoom:3998678,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'mil-giannisa-160',name:'扬尼斯-阿德托昆博',img:'',salary:54126450,per:19.9,yearsRemaining:2,pos:'PF',ht:83,wt:243,exp:'12',salary_2026_27:58456566,salary_2027_28:62786682,stats:{g:36,gs:36,mp:28.9,pts:27.6,ast:5.4,trb:9.8,stl:0.9,blk:0.7,tov:3.2,pf:2.4,fg_pct:0.4,fg3_pct:0.333,ft_pct:0.65,orb:2.7,drb:7.1,fg:16.6,fga:0.624,fg3:1.3,fg3a:9.9,ft:6.4,fta:9.9}},
      {id:'mil-mylestur-161',name:'迈尔斯-特纳',img:'',salary:25318251,per:14.9,yearsRemaining:3,pos:'C',ht:83,wt:250,exp:'10',salary_2026_27:26584164,salary_2027_28:27850077,salary_2028_29:29115990,stats:{g:71,gs:71,mp:26.9,pts:11.9,ast:1.5,trb:5.3,stl:0.7,blk:1.6,tov:1.2,pf:2.6,fg_pct:0.44,fg3_pct:0.383,ft_pct:0.74,orb:1.1,drb:4.3,fg:9.1,fga:2.1,fg3:5.4,fg3a:1.9,ft:1.8,fta:2.5}},
      {id:'mil-kylekuzm-162',name:'凯尔-库兹马',img:'',salary:22410605,per:14.4,yearsRemaining:1,pos:'PF',ht:80,wt:221,exp:'8',salary_2026_27:20345152,stats:{g:69,gs:43,mp:26.2,pts:13,ast:2.7,trb:4.5,stl:0.7,blk:0.4,tov:1.7,pf:1.9,fg_pct:0.492,fg3_pct:0.347,ft_pct:0.726,orb:0.8,drb:3.7,fg:10,fga:1.2,fg3:3.5,fg3a:3.7,ft:2,fta:2.7}},
      {id:'mil-bobbypor-163',name:'博比-波蒂斯',img:'',salary:13445754,per:13.9,yearsRemaining:2,pos:'PF',ht:81,wt:250,exp:'10',salary_2026_27:14521414,salary_2027_28:15597074,stats:{g:67,gs:9,mp:24.2,pts:13.7,ast:1.6,trb:6.4,stl:0.6,blk:0.2,tov:1,pf:1.6,fg_pct:0.488,fg3_pct:0.456,ft_pct:0.706,orb:1.3,drb:5.1,fg:11.2,fga:2,fg3:4.4,fg3a:3.4,ft:0.7,fta:1}},
      {id:'mil-ajgreen-164',name:'AJ-格林',img:'https://i1.hoopchina.com.cn/editor/851108f3997857214b1c48ec5658a52a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp吉昂https://i3.hoopchina.com.cn/editor/75650768aa9fe0f47d9cf0c14e4a10e8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp字母哥https://i3.hoopchina.com.cn/editor/1bdd43d5cfe888fcdc7b23c6d481fb28_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp字母哥哥https://i11.hoopchina.com.cn/editor/d4a177d550ab2a32068739358a801a7a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2301587,per:13,yearsRemaining:4,pos:'SG',ht:76,wt:190,exp:'3',salary_2026_27:10044644,salary_2027_28:10848215,salary_2028_29:11651786,salary_2029_30:12455355,stats:{g:78,gs:68,mp:29.1,pts:10.4,ast:1.9,trb:2.7,stl:0.5,blk:0.1,tov:1,pf:2.3,fg_pct:0.424,fg3_pct:0.4,ft_pct:0.855,orb:0.4,drb:2.4,fg:7.9,fga:3,fg3:7.1,fg3a:0.419,ft:0.7,fta:0.8}},
      {id:'mil-kevinpor-165',name:'小凯文-波特',img:'',salary:5134000,per:9.4,yearsRemaining:1,pos:'PG',ht:77,wt:203,exp:'5',salary_2026_27:5390700,stats:{g:38,gs:36,mp:33.2,pts:17.4,ast:7.4,trb:5.2,stl:2.2,blk:0.5,tov:2.9,pf:2.3,fg_pct:0.465,fg3_pct:0.322,ft_pct:0.878,orb:0.9,drb:4.3,fg:13.5,fga:1.2,fg3:3.8,fg3a:5.1,ft:3.6,fta:4.1}},
      {id:'mil-ryanroll-166',name:'莱恩-罗林斯',img:'',salary:4000000,per:8.3,yearsRemaining:2,pos:'PG',ht:75,wt:180,exp:'3',salary_2026_27:4000000,salary_2027_28:4000000,stats:{g:74,gs:67,mp:32.1,pts:17.3,ast:5.6,trb:4.6,stl:1.5,blk:0.4,tov:2.7,pf:2.6,fg_pct:0.472,fg3_pct:0.406,ft_pct:0.796,orb:0.7,drb:3.8,fg:13.9,fga:2.5,fg3:6.1,fg3a:4.1,ft:1.7,fta:2.1}},
      {id:'mil-garytren-167',name:'小加里-特伦特',img:'',salary:3697105,per:10.2,yearsRemaining:1,pos:'SG',ht:77,wt:204,exp:'7',salary_2026_27:3881960,stats:{g:65,gs:21,mp:21.2,pts:8.1,ast:1.2,trb:1,stl:0.5,blk:0,tov:0.6,pf:1.3,fg_pct:0.387,fg3_pct:0.9,ft_pct:0.769,orb:0.1,drb:0.9,fg:7.3,fga:1.9,fg3:5.3,fg3a:0.36,ft:0.6,fta:0.8}},
      {id:'mil-garyharr-168',name:'加里-哈里斯',img:'',salary:3634153,per:10.4,yearsRemaining:1,pos:'SG',ht:76,wt:210,exp:'11',salary_2026_27:3815861,stats:{g:48,gs:2,mp:13.8,pts:2.7,ast:1.1,trb:1.3,stl:0.6,blk:0.2,tov:0.4,pf:1.1,fg_pct:0.6,fg3_pct:0.4,ft_pct:0.889,orb:0.3,drb:0.9,fg:2.2,fga:0.442,fg3:1.4,fg3a:0.412,ft:0.2,fta:0.2}},
      {id:'mil-taureanp-169',name:'托里恩-普林斯',img:'',salary:3303774,per:11.6,yearsRemaining:1,pos:'SF',ht:78,wt:218,exp:'9',salary_2026_27:3815861,stats:{g:26,gs:7,mp:23.5,pts:9.2,ast:1.8,trb:3.1,stl:0.6,blk:0.2,tov:1.2,pf:1.8,fg_pct:0.45,fg3_pct:1,ft_pct:1,orb:0.2,drb:3,fg:7.3,fga:2.3,fg3:5.4,fg3a:0.436,ft:0.2,fta:0.2}},
      {id:'mil-damianli-170',name:'Damian Lillard',img:'',salary:36620603,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:35915403,salary_2027_28:36620603,salary_2028_29:22516603,salary_2029_30:22516603},
      {id:'mil-ousmaned-171',name:'Ousmane Dieng',img:'',salary:6670882,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-jerichos-172',name:'Jericho Sims',img:'',salary:2461463,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2801346},
      {id:'mil-chrisliv-173',name:'Chris Livingston',img:'',salary:null,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-thanasis-174',name:'Thanasis Antetokounmpo',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-andrejac-175',name:'Andre Jackson Jr.',img:'',salary:2221677,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2406205},
      {id:'mil-nigelhay-176',name:'Nigel Hayes-Davis',img:'',salary:2048494,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-tylersmi-177',name:'Tyler Smith',img:'https://i5.hoopchina.com.cn/editor/46425331432c2767725638d8d527f79d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-camthoma-178',name:'Cam Thomas',img:'',salary:6837779,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'mil-vasilije-179',name:'Vasilije Micić',img:'',salary:666667,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:666667,salary_2027_28:666667}
    ]
  },

  min: {
    id:'min',
    name:'明尼苏达森林狼',  
    shortName:'森林狼',  
    conference:'west',  
    color:'#0C2340',  
    accent:'#236192',  
    overTaxLine:0,
    capRoom:-37387865,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'min-anthonye-170',name:'安东尼-爱德华兹',img:'https://i11.hoopchina.com.cn/editor/84a738230bed0401bd1d9933890d000b_w_1040_h_760_.png',salary:45550512,per:18.4,yearsRemaining:3,pos:'SG',ht:76,wt:225,exp:'5',salary_2026_27:48924624,salary_2027_28:52298736,salary_2028_29:55672848,stats:{g:61,gs:60,mp:35,pts:28.8,ast:3.7,trb:5,stl:1.4,blk:0.8,tov:2.9,pf:1.9,fg_pct:0.489,fg3_pct:0.399,ft_pct:0.796,orb:0.6,drb:4.4,fg:20.2,fga:3.4,fg3:8.4,fg3a:6.5,ft:5.7,fta:7.2}},
      {id:'min-rudygobe-171',name:'鲁迪-戈贝尔',img:'https://i1.hoopchina.com.cn/editor/b058c669acd76117cbf673a8f47e0963_w_1040_h_760_.png',salary:35000000,per:15.2,yearsRemaining:2,pos:'C',ht:85,wt:258,exp:'12',salary_2026_27:36500000,salary_2027_28:38000000,stats:{g:76,gs:76,mp:31.3,pts:10.9,ast:1.7,trb:11.5,stl:0.8,blk:1.6,tov:1.4,pf:2.6,fg_pct:0,fg3_pct:0,ft_pct:0.526,orb:3.9,drb:7.5,fg:6.5,fga:0.682,fg3:0.1,fg3a:4.4,ft:2.1,fta:4}},
      {id:'min-juliusra-172',name:'朱利叶斯-兰德尔',img:'https://i11.hoopchina.com.cn/editor/e1e7e1461b62e2cd4c272d5259449893_w_1040_h_760_.png',salary:30864198,per:14,yearsRemaining:2,pos:'PF',ht:81,wt:250,exp:'11',salary_2026_27:33333334,salary_2027_28:35802468,stats:{g:79,gs:79,mp:33,pts:21.1,ast:5,trb:6.7,stl:1.1,blk:0.2,tov:2.7,pf:2.8,fg_pct:0.481,fg3_pct:0.315,ft_pct:0.802,orb:1.7,drb:5.1,fg:15.3,fga:1.4,fg3:4.4,fg3a:6,ft:5,fta:6.3}},
      {id:'min-jadenmcd-173',name:'杰登-麦克丹尼尔斯',img:'https://i1.hoopchina.com.cn/editor/a7020bc2708774efb428d81faa446720_w_1040_h_760_.png',salary:24393104,per:13.3,yearsRemaining:3,pos:'PF',ht:81,wt:185,exp:'5',salary_2026_27:26200001,salary_2027_28:28006898,salary_2028_29:29813790,stats:{g:73,gs:73,mp:31.7,pts:14.8,ast:2.7,trb:4.2,stl:1.1,blk:1,tov:1.8,pf:3.3,fg_pct:0.515,fg3_pct:0.412,ft_pct:0.835,orb:1,drb:3.2,fg:11.1,fga:1.4,fg3:3.4,fg3a:4.3,ft:2,fta:2.4}},
      {id:'min-nazreid-174',name:'纳兹-里德',img:'https://i11.hoopchina.com.cn/editor/ff6ae0bd2f70e3b37d0661d152df853a_w_1040_h_760_.png',salary:21551724,per:15.7,yearsRemaining:4,pos:'C',ht:81,wt:264,exp:'6',salary_2026_27:23275862,salary_2027_28:25000000,salary_2028_29:26724138,salary_2029_30:28448276,stats:{g:77,gs:3,mp:26.1,pts:13.6,ast:2.2,trb:6.2,stl:1,blk:1,tov:1.6,pf:2.5,fg_pct:0.456,fg3_pct:0.362,ft_pct:0.732,orb:1.2,drb:5,fg:11.3,fga:2.1,fg3:5.8,fg3a:3.1,ft:1.2,fta:1.6}},
      {id:'min-dontediv-175',name:'唐特-迪温琴佐',img:'https://i5.hoopchina.com.cn/editor/9c102b28038c16b80cf6bd62b25d98ec_w_1040_h_760_.png',salary:11990000,per:11.6,yearsRemaining:1,pos:'SG',ht:76,wt:203,exp:'7',salary_2026_27:12535000,stats:{g:82,gs:82,mp:30.4,pts:12.2,ast:3.8,trb:4.1,stl:1.3,blk:0.4,tov:1.4,pf:2.4,fg_pct:0.406,fg3_pct:0.379,ft_pct:0.743,orb:0.8,drb:3.3,fg:10.2,fga:3,fg3:7.9,fg3a:1.2,ft:1,fta:1.3}},
      {id:'min-joanberi-176',name:'若昂-贝兰热',img:'',salary:4201080,per:9.9,yearsRemaining:3,pos:'PF',ht:83,wt:230,exp:'R',salary_2026_27:4411200,salary_2027_28:4621200,salary_2028_29:7098163,stats:{g:40,gs:3,mp:7.9,pts:3.9,ast:0.3,trb:2.3,stl:0.2,blk:0.7,tov:0.3,pf:1.2,fg_pct:0,fg3_pct:0,ft_pct:0.703,orb:1.1,drb:1.2,fg:2.5,fga:0.663,fg3:0,fg3a:1.6,ft:0.7,fta:0.9}},
      {id:'min-terrence-177',name:'小特伦斯·香农',img:'https://i11.hoopchina.com.cn/editor/9a7b5b145966b85ce73f544fe5fef4e3_w_1040_h_760_.png',salary:2674080,per:9.2,yearsRemaining:2,pos:'SG',ht:78,wt:215,exp:'1',salary_2026_27:2801640,salary_2027_28:5054159,stats:{g:43,gs:2,mp:12.5,pts:5.6,ast:0.9,trb:1.1,stl:0.3,blk:0,tov:0.6,pf:1.2,fg_pct:0.7,fg3_pct:0.408,ft_pct:0.8,orb:0.2,drb:0.9,fg:4,fga:0.45,fg3:1.8,fg3a:1.1,ft:1.3,fta:1.6}},
      {id:'min-julianph-178',name:'朱利安-菲利普斯',img:'',salary:2221677,per:8.4,yearsRemaining:1,pos:'SF',ht:78,wt:198,exp:'2',salary_2026_27:2406205,stats:{g:13,gs:0,mp:7.2,pts:3.2,ast:0.2,trb:0.4,stl:0.4,blk:0.1,tov:0.3,pf:0.8,fg_pct:0.3,fg3_pct:0.8,ft_pct:0.75,orb:0.1,drb:0.3,fg:2.5,fga:0.424,fg3:1.2,fg3a:0.25,ft:0.7,fta:0.9}},
      {id:'min-ayodosun-179',name:'Ayo Dosunmu',img:'https://i10.hoopchina.com.cn/editor/126b4683c0b04c81983633f5986a5d0d_w_1040_h_760_.png',salary:7518518,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'min-boneshyl-180',name:'Bones Hyland',img:'https://i3.hoopchina.com.cn/editor/6b90f505f6899aa38a8306db461f378d_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'min-joeingle-181',name:'Joe Ingles',img:'https://i5.hoopchina.com.cn/editor/00744c53a29a7eefb1b9418053caf911_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'min-jaylencl-182',name:'Jaylen Clark',img:'',salary:2191897,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'min-mikeconl-183',name:'Mike Conley',img:'',salary:11499872,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  nop: {
    id:'nop',
    name:'新奥尔良鹈鹕',  
    shortName:'鹈鹕',  
    conference:'west',  
    color:'#0C2340',  
    accent:'#85714D',  
    overTaxLine:0,
    capRoom:-19400278,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'nop-zionwill-179',name:'蔡恩-威廉森',img:'',salary:39446090,per:17.7,yearsRemaining:2,pos:'PF',ht:78,wt:284,exp:'5',salary_2026_27:42166510,salary_2027_28:44886930,stats:{g:62,gs:55,mp:29.7,pts:21,ast:3.2,trb:5.7,stl:1,blk:0.5,tov:2,pf:2.3,fg_pct:0,fg3_pct:0.25,ft_pct:0.716,orb:2,drb:3.7,fg:13,fga:0.6,fg3:0.1,fg3a:7.8,ft:5.4,fta:7.5}},
      {id:'nop-jordanpo-180',name:'乔丹-普尔',img:'',salary:31848215,per:15.9,yearsRemaining:1,pos:'PG',ht:76,wt:194,exp:'6',salary_2026_27:34044642,stats:{g:39,gs:8,mp:23.9,pts:13.4,ast:3.1,trb:2,stl:0.6,blk:0.4,tov:1.8,pf:2.3,fg_pct:0.372,fg3_pct:0.333,ft_pct:0.86,orb:0.2,drb:1.7,fg:11.4,fga:2.5,fg3:7.4,fg3a:1.8,ft:2.5,fta:2.9}},
      {id:'nop-dejounte-181',name:'德章泰-默里',img:'',salary:30801103,per:15.6,yearsRemaining:2,pos:'PG',ht:76,wt:180,exp:'8',salary_2026_27:32785071,salary_2027_28:30751504,stats:{g:14,gs:14,mp:27.8,pts:16.7,ast:6.4,trb:5.4,stl:1.6,blk:0.2,tov:3.4,pf:2.4,fg_pct:0.484,fg3_pct:0.306,ft_pct:0.867,orb:0.3,drb:5.1,fg:13,fga:1.4,fg3:4.4,fg3a:4.9,ft:2.8,fta:3.2}},
      {id:'nop-treymurp-182',name:'特雷-墨菲',img:'',salary:25000000,per:15.1,yearsRemaining:3,pos:'SF',ht:80,wt:206,exp:'4',salary_2026_27:27000000,salary_2027_28:29000000,salary_2028_29:31000000,stats:{g:66,gs:66,mp:35.5,pts:21.5,ast:3.8,trb:5.7,stl:1.5,blk:0.4,tov:1.8,pf:2.1,fg_pct:0.47,fg3_pct:0.379,ft_pct:0.886,orb:1,drb:4.8,fg:15.9,fga:3.2,fg3:8.6,fg3a:4.2,ft:3.3,fta:3.7}},
      {id:'nop-kevonloo-183',name:'凯文-卢尼',img:'',salary:8000000,per:11.6,yearsRemaining:1,pos:'C',ht:81,wt:222,exp:'10',salary_2026_27:8000000,stats:{g:21,gs:8,mp:14.7,pts:2.8,ast:1.6,trb:5.6,stl:0.4,blk:0.5,tov:0.4,pf:1.6,fg_pct:0.1,fg3_pct:0.154,ft_pct:0.7,orb:2.3,drb:3.3,fg:2.9,fga:0.417,fg3:0.6,fg3a:1.1,ft:0.3,fta:0.5}},
      {id:'nop-jeremiah-184',name:'杰里迈亚-费尔斯',img:'',salary:7520040,per:10.4,yearsRemaining:3,pos:'PG',ht:75,wt:190,exp:'R',salary_2026_27:7896240,salary_2027_28:8271960,salary_2028_29:10505389,stats:{g:82,gs:49,mp:25.8,pts:14.3,ast:3.4,trb:3.7,stl:1.2,blk:0.4,tov:2.2,pf:1.8,fg_pct:0.434,fg3_pct:0.33,ft_pct:0.789,orb:0.7,drb:2.9,fg:12.3,fga:1.2,fg3:3.7,fg3a:4.1,ft:2.4,fta:3}},
      {id:'nop-jordanha-185',name:'乔丹·霍金斯',img:'',salary:4741320,per:11.7,yearsRemaining:1,pos:'SG',ht:77,wt:190,exp:'2',salary_2026_27:7021895,stats:{g:51,gs:1,mp:13.6,pts:5.1,ast:0.8,trb:1.7,stl:0.3,blk:0.2,tov:0.7,pf:0.6,fg_pct:0.9,fg3_pct:0.9,ft_pct:0.852,orb:0.4,drb:1.3,fg:5,fga:0.366,fg3:2.6,fg3a:0.348,ft:0.5,fta:0.5}},
      {id:'nop-saddiqbe-186',name:'萨迪克-贝',img:'',salary:6118644,per:9.6,yearsRemaining:1,pos:'SF',ht:80,wt:215,exp:'4',salary_2026_27:6440678,stats:{g:72,gs:64,mp:31.2,pts:17.7,ast:2.5,trb:5.6,stl:0.9,blk:0.1,tov:0.9,pf:1.3,fg_pct:0.451,fg3_pct:0.367,ft_pct:0.841,orb:1.7,drb:3.9,fg:13.4,fga:2.1,fg3:5.7,fg3a:4,ft:3.4,fta:4.1}},
      {id:'nop-derikque-187',name:'德里克-奎因',img:'',salary:5157960,per:8.4,yearsRemaining:3,pos:'C',ht:81,wt:250,exp:'R',salary_2026_27:5416080,salary_2027_28:5673840,salary_2028_29:8107918,stats:{g:81,gs:48,mp:25,pts:11.7,ast:3.7,trb:7.1,stl:1,blk:0.9,tov:2.3,pf:2.7,fg_pct:0.3,fg3_pct:0.261,ft_pct:0.795,orb:1.7,drb:5.4,fg:9.2,fga:0.473,fg3:1.1,fg3a:4.1,ft:2.7,fta:3.4}},
      {id:'nop-yvesmiss-188',name:'伊夫·蜜西',img:'',salary:3353040,per:8.2,yearsRemaining:2,pos:'C',ht:83,wt:235,exp:'1',salary_2026_27:3512760,salary_2027_28:5595827,stats:{g:66,gs:14,mp:19.7,pts:5.7,ast:1.3,trb:5.8,stl:0.3,blk:1.5,tov:0.8,pf:1.7,fg_pct:0,fg3_pct:0,ft_pct:0.559,orb:2.8,drb:3.1,fg:4.5,fga:0.544,fg3:0,fg3a:2.4,ft:0.9,fta:1.5}},
      {id:'nop-herbertj-189',name:'Herbert Jones',img:'',salary:13937574,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:14898786,salary_2027_28:20858300,salary_2028_29:22526964,salary_2029_30:24195628},
      {id:'nop-dalenter-190',name:'Dalen Terry',img:'',salary:5399118,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nop-deandrej-191',name:'DeAndre Jordan',img:'',salary:2269880,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nop-karlomat-192',name:'Karlo Matković',img:'',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271},
      {id:'nop-micahpea-193',name:'Micah Peavy',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'nop-brycemcg-194',name:'Bryce McGowens',img:'',salary:724598,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2584539,salary_2027_28:2934742},
      {id:'nop-jadenspr-195',name:'Jaden Springer',img:'',salary:70732,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  nyk: {
    id:'nyk',
    name:'纽约尼克斯',  
    shortName:'尼克斯',  
    conference:'east',  
    color:'#006BB6',  
    accent:'#F58426',  
    overTaxLine:14460628,
    capRoom:-52460628,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'nyk-karlanth-189',name:'卡尔-安东尼-唐斯',img:'https://i10.hoopchina.com.cn/editor/fe850d543b256761e8d8ff17cb07ed83_w_1040_h_760_.png',salary:53142264,per:21.3,yearsRemaining:2,pos:'C',ht:84,wt:248,exp:'10',salary_2026_27:57078728,salary_2027_28:61015192,stats:{g:75,gs:75,mp:31,pts:20.1,ast:3,trb:11.9,stl:0.9,blk:0.5,tov:2.5,pf:3.4,fg_pct:0.501,fg3_pct:0.368,ft_pct:0.858,orb:3.1,drb:8.7,fg:13.8,fga:1.5,fg3:4.1,fg3a:5.4,ft:4.8,fta:5.5}},
      {id:'nyk-oganunob-190',name:'OG-阿奴诺比',img:'https://i11.hoopchina.com.cn/editor/fd63c9f8c9ecaf73d159dd03e9e51219_w_1040_h_760_.png',salary:39568966,per:18.2,yearsRemaining:3,pos:'PF',ht:79,wt:240,exp:'8',salary_2026_27:42500000,salary_2027_28:45431034,salary_2028_29:48362068,stats:{g:67,gs:67,mp:33.2,pts:16.7,ast:2.2,trb:5.2,stl:1.6,blk:0.7,tov:1.8,pf:2.4,fg_pct:0.484,fg3_pct:0.386,ft_pct:0.828,orb:1.3,drb:4,fg:12,fga:2.3,fg3:6.1,fg3a:3.5,ft:2.7,fta:3.3}},
      {id:'nyk-jalenbru-191',name:'杰伦-布伦森',img:'https://i3.hoopchina.com.cn/editor/44598b0d5621efe6ee08868744722906_w_1040_h_760_.png',salary:34944001,per:14.7,yearsRemaining:3,pos:'PG',ht:74,wt:190,exp:'7',salary_2026_27:37739521,salary_2027_28:40535041,salary_2028_29:43330561,stats:{g:74,gs:74,mp:35,pts:26,ast:6.8,trb:3.3,stl:0.8,blk:0.1,tov:2.4,pf:2.3,fg_pct:0.467,fg3_pct:0.369,ft_pct:0.841,orb:0.4,drb:2.9,fg:19.9,fga:2.6,fg3:7.1,fg3a:6.7,ft:4.8,fta:5.7}},
      {id:'nyk-mikalbri-192',name:'米卡尔-布里奇斯',img:'',salary:24900000,per:15.1,yearsRemaining:4,pos:'SF',ht:78,wt:209,exp:'7',salary_2026_27:33482145,salary_2027_28:36160714,salary_2028_29:38839285,salary_2029_30:41517856,stats:{g:82,gs:82,mp:32.8,pts:14.4,ast:3.7,trb:3.8,stl:1.3,blk:0.8,tov:1,pf:2,fg_pct:0.49,fg3_pct:0.371,ft_pct:0.827,orb:1,drb:2.8,fg:11.7,fga:1.9,fg3:5.1,fg3a:3.9,ft:1,fta:1.2}},
      {id:'nyk-joshhart-193',name:'约什-哈特',img:'https://i11.hoopchina.com.cn/editor/b5a55800cc872516e97dd85e434155ad_w_1040_h_760_.png',salary:19472240,per:14.7,yearsRemaining:2,pos:'SF',ht:77,wt:215,exp:'8',salary_2026_27:20923760,salary_2027_28:22375280,stats:{g:66,gs:52,mp:30.2,pts:12,ast:4.8,trb:7.4,stl:1.1,blk:0.3,tov:1.9,pf:2.5,fg_pct:0.508,fg3_pct:0.413,ft_pct:0.72,orb:1.4,drb:6,fg:9,fga:1.5,fg3:3.7,fg3a:3,ft:1.4,fta:1.9}},
      {id:'nyk-josealva-194',name:'约瑟-阿尔瓦拉多',img:'https://i11.hoopchina.com.cn/editor/931678b3d0455e5876f0e1fc6ad8e0bb_w_1040_h_760_.png',salary:4500000,per:9.7,yearsRemaining:1,pos:'PG',ht:72,wt:179,exp:'4',salary_2026_27:4500000,stats:{g:28,gs:3,mp:16.9,pts:6.6,ast:3.8,trb:2,stl:1,blk:0.1,tov:1.1,pf:1.8,fg_pct:0.414,fg3_pct:0.33,ft_pct:0.682,orb:0.4,drb:1.7,fg:6,fga:1.1,fg3:3.4,fg3a:1.4,ft:0.5,fta:0.8}},
      {id:'nyk-milesmcb-195',name:'迈尔斯-麦克布莱德',img:'https://i3.hoopchina.com.cn/editor/33a6209fefcfa5c269a116c7bba7947d_w_1040_h_760_.png',salary:4333333,per:9.3,yearsRemaining:1,pos:'SG',ht:74,wt:195,exp:'4',salary_2026_27:3956523,stats:{g:41,gs:15,mp:26.3,pts:12,ast:2.6,trb:2.4,stl:0.9,blk:0.2,tov:0.8,pf:1.7,fg_pct:0.423,fg3_pct:0.413,ft_pct:0.787,orb:0.6,drb:1.9,fg:9.9,fga:2.7,fg3:6.6,fg3a:1.4,ft:0.9,fta:1.1}},
      {id:'nyk-pacomeda-196',name:'帕科姆·达迪耶',img:'',salary:2847600,per:9.4,yearsRemaining:2,pos:'SG',ht:81,wt:210,exp:'1',salary_2026_27:2983680,salary_2027_28:5373608,stats:{g:29,gs:0,mp:4.7,pts:1.7,ast:0.4,trb:0.9,stl:0.1,blk:0,tov:0.1,pf:0.3,fg_pct:0.2,fg3_pct:0.3,ft_pct:0.818,orb:0.1,drb:0.8,fg:1.7,fga:0.333,fg3:1.1,fg3a:0.219,ft:0.3,fta:0.4}},
      {id:'nyk-tylerkol-197',name:'泰勒·科勒克',img:'',salary:2191897,per:11,yearsRemaining:2,pos:'PG',ht:74,wt:195,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995,stats:{g:62,gs:1,mp:11.7,pts:4.4,ast:2.7,trb:1.6,stl:0.4,blk:0.1,tov:0.9,pf:1,fg_pct:0.7,fg3_pct:1,ft_pct:0.7,orb:0.3,drb:1.3,fg:4,fga:0.435,fg3:1.8,fg3a:0.386,ft:0.2,fta:0.3}},
      {id:'nyk-mitchell-198',name:'Mitchell Robinson',img:'https://i11.hoopchina.com.cn/editor/5c63cf935270439e64fca0fe2919a85e_w_1040_h_760_.png',salary:12954546,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nyk-landrysh-199',name:'Landry Shamet',img:'https://i11.hoopchina.com.cn/editor/6ac1e4f50d4ec1e6152bff89f03c030d_w_1040_h_760_.png',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nyk-jordancl-200',name:'Jordan Clarkson',img:'https://i10.hoopchina.com.cn/editor/a9620f3682b3e59c31a187bf59e92944_w_1040_h_760_.png',salary:12947835,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nyk-arielhuk-201',name:'Ariel Hukporti',img:'https://i1.hoopchina.com.cn/editor/2094af3f7d99216e072c8cfc3212fc8f_w_1040_h_760_.png',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nyk-mohamedd-202',name:'Mohamed Diawara',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'nyk-jeremyso-203',name:'Jeremy Sochan',img:'',salary:7874853,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  okc: {
    id:'okc',
    name:'俄克拉荷马雷霆',  
    shortName:'雷霆',  
    conference:'west',  
    color:'#007AC1',  
    accent:'#EF3B24',  
    overTaxLine:678142,
    capRoom:-36678142,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'okc-jalenwil-198',name:'杰伦-威廉姆斯',img:'https://i5.hoopchina.com.cn/editor/83f17515c18c7e1be73e8fa0ddc74890_w_1040_h_760_.png',salary:6580997,per:16.4,yearsRemaining:5,pos:'SG',ht:77,wt:211,exp:'3',salary_2026_27:41500000,salary_2027_28:44820000,salary_2028_29:48140000,salary_2029_30:51460000,stats:{g:33,gs:33,mp:28.4,pts:17.1,ast:5.5,trb:4.6,stl:1.2,blk:0.3,tov:1.9,pf:2,fg_pct:0.7,fg3_pct:0.299,ft_pct:0.837,orb:0.8,drb:3.8,fg:13.5,fga:0.484,fg3:2.3,fg3a:5.8,ft:3.3,fta:3.9}},
      {id:'okc-chetholm-199',name:'切特-霍姆格伦',img:'https://i11.hoopchina.com.cn/editor/e1ca4b187297395359fec8c17e683ff1_w_1040_h_760_.png',salary:13731368,per:16.9,yearsRemaining:5,pos:'PF',ht:85,wt:208,exp:'2',salary_2026_27:41500000,salary_2027_28:44820000,salary_2028_29:48140000,salary_2029_30:51460000,stats:{g:69,gs:69,mp:28.9,pts:17.1,ast:1.7,trb:8.9,stl:0.6,blk:1.9,tov:1.6,pf:2.3,fg_pct:0.557,fg3_pct:0.362,ft_pct:0.792,orb:1.9,drb:7,fg:11.3,fga:1.3,fg3:3.5,fg3a:5,ft:3.3,fta:4.1}},
      {id:'okc-isaiahha-200',name:'以赛亚-哈尔滕施泰因',img:'https://i5.hoopchina.com.cn/editor/9ac3d032378e3cc8933c6fb4c5704992_w_1040_h_760_.png',salary:28500000,per:12.8,yearsRemaining:1,pos:'C',ht:84,wt:250,exp:'7',salary_2026_27:28500000,stats:{g:47,gs:46,mp:24.2,pts:9.2,ast:3.5,trb:9.4,stl:1,blk:0.8,tov:1.7,pf:2.5,fg_pct:0,fg3_pct:0,ft_pct:0.61,orb:3.2,drb:6.3,fg:6.3,fga:0.622,fg3:0.1,fg3a:3.9,ft:1.4,fta:2.2}},
      {id:'okc-alexcaru-201',name:'亚历克斯-卡鲁索',img:'https://i3.hoopchina.com.cn/editor/52af677dc84320b9d0cfd9f2bf1734c8_w_1040_h_760_.png',salary:18102000,per:10.9,yearsRemaining:3,pos:'SG',ht:77,wt:186,exp:'8',salary_2026_27:19550160,salary_2027_28:20998320,salary_2028_29:22446480,stats:{g:56,gs:0,mp:18.2,pts:6.2,ast:2,trb:2.8,stl:1.3,blk:0.3,tov:0.9,pf:1.2,fg_pct:0.9,fg3_pct:0.293,ft_pct:0.804,orb:0.5,drb:2.3,fg:5.4,fga:0.423,fg3:3.2,fg3a:1.3,ft:0.7,fta:0.9}},
      {id:'okc-luguentz-202',name:'吕冈茨-多尔特',img:'https://i10.hoopchina.com.cn/editor/deefaf1a0ce81542b38d71a6260bd010_w_1040_h_760_.png',salary:18222222,per:11.1,yearsRemaining:1,pos:'SF',ht:76,wt:220,exp:'6',salary_2026_27:18222222,stats:{g:69,gs:69,mp:26.8,pts:8.3,ast:1.2,trb:3.6,stl:0.9,blk:0.4,tov:0.8,pf:2.6,fg_pct:0.385,fg3_pct:0.344,ft_pct:0.759,orb:0.8,drb:2.7,fg:7.6,fga:1.9,fg3:5.4,fg3a:1.1,ft:0.6,fta:0.8}},
      {id:'okc-isaiahjo-203',name:'以赛亚-乔',img:'https://i11.hoopchina.com.cn/editor/e50a1d1824c3021d2274cd957936433d_w_1040_h_760_.png',salary:12362338,per:12.7,yearsRemaining:2,pos:'SG',ht:76,wt:165,exp:'5',salary_2026_27:11323006,salary_2027_28:11323006,stats:{g:71,gs:9,mp:21.2,pts:11.1,ast:1.3,trb:2.5,stl:0.7,blk:0.2,tov:0.6,pf:1.7,fg_pct:0.455,fg3_pct:0.9,ft_pct:0.894,orb:0.5,drb:2.1,fg:7.6,fga:2.5,fg3:6,fg3a:0.423,ft:1.5,fta:1.7}},
      {id:'okc-aaronwig-204',name:'阿龙-威金斯',img:'https://i10.hoopchina.com.cn/editor/aa7863ce537d87d74b461f1b010de044_w_1040_h_760_.png',salary:10102803,per:11.4,yearsRemaining:3,pos:'SG',ht:77,wt:190,exp:'4',salary_2026_27:9224300,salary_2027_28:8345797,salary_2028_29:8345797,stats:{g:65,gs:21,mp:21.8,pts:9.4,ast:1.7,trb:3.1,stl:0.9,blk:0.4,tov:1.2,pf:1.3,fg_pct:0.431,fg3_pct:0.356,ft_pct:0.736,orb:0.6,drb:2.4,fg:8.2,fga:1.5,fg3:4.2,fg3a:2.1,ft:0.8,fta:1.1}},
      {id:'okc-jaylinwi-205',name:'杰林-威廉姆斯',img:'https://i1.hoopchina.com.cn/editor/4c466f953832ab59f7f67fd9785b8abc_w_1040_h_760_.png',salary:8450704,per:10.8,yearsRemaining:2,pos:'PF',ht:81,wt:240,exp:'3',salary_2026_27:7774648,salary_2027_28:7774648,stats:{g:65,gs:11,mp:19.6,pts:7.2,ast:2.4,trb:5.5,stl:0.5,blk:0.6,tov:1,pf:2,fg_pct:0.423,fg3_pct:0.8,ft_pct:0.793,orb:0.5,drb:5,fg:5.4,fga:1.5,fg3:3.9,fg3a:0.383,ft:1.1,fta:1.4}},
      {id:'okc-casonwal-206',name:'卡森·华莱士',img:'https://i3.hoopchina.com.cn/editor/46fbe3781a2b3ef92a7603f0b4b247bd_w_1040_h_760_.png',salary:5820240,per:11.1,yearsRemaining:1,pos:'SG',ht:75,wt:195,exp:'2',salary_2026_27:7420806,stats:{g:77,gs:58,mp:26.6,pts:8.6,ast:2.6,trb:3.1,stl:1.9,blk:0.4,tov:0.9,pf:2,fg_pct:0.432,fg3_pct:0.351,ft_pct:0.809,orb:0.8,drb:2.3,fg:7.6,fga:1.3,fg3:3.7,fg3a:2,ft:0.7,fta:0.9}},
      {id:'okc-kenrichw-207',name:'肯里奇-威廉姆斯',img:'',salary:7163000,per:10.6,yearsRemaining:1,pos:'PF',ht:79,wt:210,exp:'7',salary_2026_27:7163000,stats:{g:56,gs:2,mp:15.3,pts:6.5,ast:1.4,trb:3.3,stl:0.6,blk:0.1,tov:0.8,pf:1.1,fg_pct:0.9,fg3_pct:0.388,ft_pct:0.635,orb:1.1,drb:2.3,fg:5.3,fga:0.473,fg3:2.3,fg3a:1.6,ft:0.6,fta:0.9}},
      {id:'okc-shaigilg-208',name:'Shai Gilgeous-Alexander',img:'https://i1.hoopchina.com.cn/editor/5a79e49b9d5dcada136c847d73d1a00d_w_1040_h_760_.png',salary:38333050,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:40806150,salary_2027_28:61005000,salary_2028_29:65885400,salary_2029_30:70765800},
      {id:'okc-nikolato-209',name:'Nikola Topić',img:'',salary:5182920,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:5429760,salary_2027_28:7482210},
      {id:'okc-thomasso-210',name:'Thomas Sorber',img:'',salary:4655040,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:4887720,salary_2027_28:5120400,salary_2028_29:7849573},
      {id:'okc-jaredmcc-211',name:'Jared McCain',img:'https://i1.hoopchina.com.cn/editor/d2d9902db3d5a6f383319c13017ff273_w_1040_h_760_.png',salary:4221360,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:4422600,salary_2027_28:6784268},
      {id:'okc-ajaymitc-212',name:'Ajay Mitchell',img:'https://i3.hoopchina.com.cn/editor/8c7f62c1876db85ec8f01b63b0ef7740_w_1040_h_760_.png',salary:3000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2850000,salary_2027_28:2850000},
      {id:'okc-masonplu-213',name:'Mason Plumlee',img:'https://i3.hoopchina.com.cn/newsPost/3775554e9947d94311c66735f8e062a5_w_982_h_704_.png',salary:3022108,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  orl: {
    id:'orl',
    name:'奥兰多魔术',  
    shortName:'魔术',  
    conference:'east',  
    color:'#0077C0',  
    accent:'#C4CED4',  
    overTaxLine:25496931,
    capRoom:-61496931,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'orl-franzwag-208',name:'弗朗茨-瓦格纳',img:'https://i3.hoopchina.com.cn/editor/f7bcc375af3a6d396fbf413990fb4b0d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:38661750,per:19,yearsRemaining:4,pos:'SF',ht:82,wt:220,exp:'4',salary_2026_27:41754690,salary_2027_28:44847630,salary_2028_29:47940570,salary_2029_30:51033510,stats:{g:34,gs:32,mp:30,pts:20.6,ast:3.3,trb:5.2,stl:0.9,blk:0.3,tov:1.7,pf:2.1,fg_pct:0.481,fg3_pct:0.345,ft_pct:0.823,orb:1.3,drb:3.9,fg:14.9,fga:1.4,fg3:4.1,fg3a:5.8,ft:4.8,fta:5.8}},
      {id:'orl-paoloban-209',name:'保罗-班切罗',img:'https://i11.hoopchina.com.cn/editor/9780d6e62fbd9813e64520688728d0db_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:15334769,per:18.3,yearsRemaining:5,pos:'PF',ht:82,wt:250,exp:'3',salary_2026_27:41500000,salary_2027_28:44820000,salary_2028_29:48140000,salary_2029_30:51460000,stats:{g:72,gs:72,mp:34.8,pts:22.2,ast:5.2,trb:8.4,stl:0.7,blk:0.6,tov:3.1,pf:2,fg_pct:0.459,fg3_pct:0.305,ft_pct:0.775,orb:1.2,drb:7.2,fg:16,fga:1.2,fg3:3.8,fg3a:6.2,ft:6.3,fta:8.2}},
      {id:'orl-desmondb-210',name:'德斯蒙德-贝恩',img:'https://i3.hoopchina.com.cn/editor/747ac4d31fcb65d78d067eb1219e0303_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:36725670,per:15.9,yearsRemaining:3,pos:'SG',ht:78,wt:215,exp:'5',salary_2026_27:39446090,salary_2027_28:42166510,salary_2028_29:44886930,stats:{g:82,gs:82,mp:33.6,pts:20.1,ast:4.1,trb:4.1,stl:1,blk:0.5,tov:2,pf:3.1,fg_pct:0.484,fg3_pct:0.391,ft_pct:0.908,orb:1.2,drb:2.9,fg:14.7,fga:2,fg3:5.2,fg3a:5.1,ft:3.8,fta:4.2}},
      {id:'orl-jalensug-211',name:'杰伦-萨格斯',img:'https://i11.hoopchina.com.cn/editor/2401aacb4ca18d44ac027998db0feed4_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:35000000,per:16.7,yearsRemaining:4,pos:'PG',ht:77,wt:205,exp:'4',salary_2026_27:32400000,salary_2027_28:29600000,salary_2028_29:26800000,salary_2029_30:26700000,stats:{g:57,gs:56,mp:27.6,pts:13.8,ast:5.5,trb:3.9,stl:1.8,blk:0.7,tov:2.7,pf:2.5,fg_pct:0.435,fg3_pct:0.339,ft_pct:0.855,orb:0.6,drb:3.2,fg:11.4,fga:2.1,fg3:6.3,fg3a:2.8,ft:1.8,fta:2.1}},
      {id:'orl-wendellc-212',name:'温德尔-卡特',img:'https://i5.hoopchina.com.cn/editor/fdd50fb5b4010b4d29b5e00bc673a571_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:10850000,per:11.8,yearsRemaining:3,pos:'C',ht:82,wt:270,exp:'7',salary_2026_27:18102000,salary_2027_28:19550160,salary_2028_29:20998320,stats:{g:78,gs:78,mp:29.3,pts:11.8,ast:2,trb:7.4,stl:0.8,blk:0.6,tov:1.3,pf:3.4,fg_pct:0.9,fg3_pct:0.319,ft_pct:0.792,orb:2.1,drb:5.3,fg:8.2,fga:0.512,fg3:2.9,fg3a:3.3,ft:2.5,fta:3.2}},
      {id:'orl-jonathan-213',name:'乔纳森-艾萨克',img:'https://i3.hoopchina.com.cn/editor/5b49ac21ad95b5ddbb0ba0fe3d76d269_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:15000000,per:11.9,yearsRemaining:3,pos:'PF',ht:82,wt:230,exp:'6',salary_2026_27:14500000,salary_2027_28:14500000,salary_2028_29:15000000,stats:{g:52,gs:0,mp:10,pts:2.6,ast:0.4,trb:2.5,stl:0.4,blk:0.6,tov:0.3,pf:0.8,fg_pct:0.1,fg3_pct:0.8,ft_pct:0.603,orb:0.8,drb:1.7,fg:2.1,fga:0.422,fg3:0.7,fg3a:0.184,ft:0.7,fta:1.1}},
      {id:'orl-anthonyb-214',name:'安东尼·布莱克',img:'https://i11.hoopchina.com.cn/editor/e7f7e3fe9ac3d1620f8a523346cda8be_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7970280,per:10.3,yearsRemaining:1,pos:'PG',ht:79,wt:200,exp:'2',salary_2026_27:10106316,stats:{g:64,gs:40,mp:29.8,pts:15,ast:3.7,trb:3.8,stl:1.4,blk:0.7,tov:2.1,pf:2.7,fg_pct:0.447,fg3_pct:0.333,ft_pct:0.732,orb:0.7,drb:3.1,fg:12.1,fga:1.6,fg3:4.7,fg3a:3.8,ft:2.6,fta:3.6}},
      {id:'orl-gogabita-215',name:'戈加-比塔泽',img:'https://i3.hoopchina.com.cn/editor/10101d476aa64ed784a3f2fe7a8c47bd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:8333333,per:10.8,yearsRemaining:1,pos:'C',ht:83,wt:250,exp:'6',salary_2026_27:7608696,stats:{g:64,gs:3,mp:15.2,pts:5.9,ast:1.3,trb:5,stl:0.6,blk:1,tov:0.7,pf:2.1,fg_pct:0,fg3_pct:0.182,ft_pct:0.711,orb:2.1,drb:2.9,fg:3.5,fga:0.676,fg3:0.2,fg3a:2.3,ft:1.1,fta:1.5}},
      {id:'orl-jetthowa-216',name:'杰特·霍华德',img:'https://i5.hoopchina.com.cn/editor/df854b53842edcec7207b66df15b0cfe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:5529720,per:11.3,yearsRemaining:1,pos:'SF',ht:80,wt:215,exp:'2',salary_2026_27:7337939,stats:{g:55,gs:0,mp:12.6,pts:5.5,ast:0.8,trb:1.6,stl:0.2,blk:0.2,tov:0.3,pf:1.2,fg_pct:1,fg3_pct:0.9,ft_pct:0.949,orb:0.4,drb:1.2,fg:4.6,fga:0.418,fg3:2.6,fg3a:0.372,ft:0.7,fta:0.7}},
      {id:'orl-tristand-217',name:'特里斯坦-达·席尔瓦',img:'https://i1.hoopchina.com.cn/editor/3b5318bed1efad035f6a002afbe858ae_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3809520,per:9.6,yearsRemaining:2,pos:'SF',ht:80,wt:217,exp:'1',salary_2026_27:3991200,salary_2027_28:6138466,stats:{g:77,gs:34,mp:24.7,pts:9.9,ast:1.6,trb:3.7,stl:0.9,blk:0.3,tov:0.9,pf:1.5,fg_pct:0.45,fg3_pct:0.374,ft_pct:0.884,orb:0.8,drb:2.9,fg:8.1,fga:1.6,fg3:4.2,fg3a:2.1,ft:1.1,fta:1.2}},
      {id:'orl-moritzwa-218',name:'Moritz Wagner',img:'https://i11.hoopchina.com.cn/editor/2d9d91caf13c1d57a7fa3b26bb84df94_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:5000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'orl-jaserich-219',name:'Jase Richardson',img:'https://i3.hoopchina.com.cn/editor/38d39622caad52ca67ac53d517cb0001_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2983320,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3132360,salary_2027_28:3282000,salary_2028_29:5910882},
      {id:'orl-noahpend-220',name:'Noah Penda',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'orl-jevoncar-221',name:'Jevon Carter',img:'https://i3.hoopchina.com.cn/editor/99fe01fdc23d2450245f9e4f1659f017_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7680524,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  phi: {
    id:'phi',
    name:'费城76人',  
    shortName:'76人',  
    conference:'east',  
    color:'#006BB6',  
    accent:'#ED174C',  
    overTaxLine:0,
    capRoom:-25639317,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'phi-joelembi-218',name:'乔尔-恩比德',img:'https://i5.hoopchina.com.cn/editor/6cee910a137d63768d04743a603de7e1_w_1040_h_760_.png',salary:55224526,per:22.2,yearsRemaining:3,pos:'C',ht:84,wt:280,exp:'9',salary_2026_27:58100000,salary_2027_28:62748000,salary_2028_29:67396000,stats:{g:38,gs:38,mp:31.6,pts:26.9,ast:3.9,trb:7.7,stl:0.6,blk:1.2,tov:2.9,pf:2.2,fg_pct:0.489,fg3_pct:0.333,ft_pct:0.854,orb:2,drb:5.7,fg:18.3,fga:1.4,fg3:4.2,fg3a:7.6,ft:7.5,fta:8.8}},
      {id:'phi-paulgeor-219',name:'保罗-乔治',img:'https://i11.hoopchina.com.cn/editor/f4ac01de2ad4007c5c807015aa9af5d7_w_1040_h_760_.png',salary:51666090,per:20,yearsRemaining:2,pos:'PF',ht:80,wt:220,exp:'15',salary_2026_27:54126380,salary_2027_28:56586670,stats:{g:37,gs:37,mp:30.7,pts:17.3,ast:3.6,trb:5.3,stl:1.7,blk:0.4,tov:1.7,pf:2.3,fg_pct:0.439,fg3_pct:0.392,ft_pct:0.82,orb:0.5,drb:4.8,fg:13.9,fga:2.7,fg3:6.9,fg3a:3.4,ft:2.5,fta:3}},
      {id:'phi-tyresema-220',name:'泰雷斯-马克西',img:'https://i10.hoopchina.com.cn/editor/c106a38bdee12a4c49130dde8c4107e4_w_1040_h_760_.png',salary:37958760,per:17.8,yearsRemaining:3,pos:'PG',ht:74,wt:200,exp:'5',salary_2026_27:40770520,salary_2027_28:43582280,salary_2028_29:46394040,stats:{g:70,gs:70,mp:38,pts:28.3,ast:6.6,trb:4.1,stl:1.9,blk:0.8,tov:2.4,pf:2.2,fg_pct:0.462,fg3_pct:0.367,ft_pct:0.892,orb:0.3,drb:3.8,fg:21.4,fga:3.1,fg3:8.6,fg3a:6.8,ft:5.3,fta:6}},
      {id:'phi-vjedgeco-221',name:'VJ-埃奇库姆',img:'https://i5.hoopchina.com.cn/editor/3109a74aed1387e3e9441dae2b9d6611_w_1040_h_760_.png',salary:11108880,per:11.4,yearsRemaining:3,pos:'SG',ht:76,wt:180,exp:'R',salary_2026_27:11663880,salary_2027_28:12219720,salary_2028_29:15445727,stats:{g:75,gs:75,mp:35,pts:16,ast:4.2,trb:5.6,stl:1.4,blk:0.5,tov:1.8,pf:2.9,fg_pct:0.438,fg3_pct:0.354,ft_pct:0.818,orb:1.6,drb:4,fg:13.7,fga:2,fg3:5.6,fg3a:4,ft:2,fta:2.4}},
      {id:'phi-dominick-222',name:'多米尼克-巴洛',img:'https://i10.hoopchina.com.cn/editor/5f8461788e1be2d8df295fbfc2e5eeaa_w_1040_h_760_.png',salary:3415000,per:10.2,yearsRemaining:1,pos:'PF',ht:81,wt:215,exp:'3',salary_2026_27:3415000,stats:{g:71,gs:59,mp:23.8,pts:7.7,ast:1.2,trb:4.8,stl:0.9,blk:0.7,tov:0.8,pf:2.1,fg_pct:0.3,fg3_pct:0.256,ft_pct:0.718,orb:1.9,drb:2.9,fg:5.6,fga:0.539,fg3:1.2,fg3a:2.7,ft:1.3,fta:1.8}},
      {id:'phi-trendonw-223',name:'特伦登-沃特福特',img:'https://i3.hoopchina.com.cn/editor/de889cd9ec567992aef9404cb663d119_w_1040_h_760_.png',salary:2461463,per:10.1,yearsRemaining:1,pos:'PF',ht:80,wt:237,exp:'4',salary_2026_27:2801346,stats:{g:53,gs:7,mp:16.3,pts:6.5,ast:2.5,trb:3.3,stl:0.3,blk:0.4,tov:1.2,pf:2,fg_pct:0.2,fg3_pct:0.2,ft_pct:0.779,orb:0.7,drb:2.6,fg:5.1,fga:0.515,fg3:0.9,fg3a:2.4,ft:1.1,fta:1.5}},
      {id:'phi-jabariwa-224',name:'贾巴里-沃克',img:'',salary:724598,per:9.5,yearsRemaining:1,pos:'PF',ht:79,wt:237,exp:'3',salary_2026_27:2584539,stats:{g:64,gs:6,mp:11.9,pts:4.3,ast:0.5,trb:3,stl:0.4,blk:0.2,tov:0.4,pf:1.6,fg_pct:0.5,fg3_pct:1,ft_pct:0.735,orb:1.1,drb:1.9,fg:3.3,fga:0.455,fg3:1.5,fg3a:0.337,ft:0.8,fta:1.1}},
      {id:'phi-justined-226',name:'贾斯汀·爱德华兹',img:'',salary:2048494,per:8.7,yearsRemaining:2,pos:'SF',ht:79,wt:203,exp:'1',salary_2026_27:2411090,salary_2027_28:2616754,stats:{g:64,gs:12,mp:15.3,pts:6,ast:1.3,trb:1.5,stl:0.8,blk:0.2,tov:0.6,pf:1.4,fg_pct:1,fg3_pct:0.372,ft_pct:0.846,orb:0.4,drb:1.1,fg:5,fga:0.447,fg3:2.8,fg3a:1.2,ft:0.5,fta:0.6}},
      {id:'phi-adembona-227',name:'阿德姆·博纳',img:'https://i10.hoopchina.com.cn/editor/2d9aa95e7b67ded5f9679848ee65d95f_w_1040_h_760_.png',salary:1955377,per:9.3,yearsRemaining:2,pos:'C',ht:82,wt:235,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995,stats:{g:71,gs:18,mp:17.4,pts:4.8,ast:0.5,trb:4.3,stl:0.4,blk:1.2,tov:0.8,pf:2.2,fg_pct:0,fg3_pct:0.333,ft_pct:0.708,orb:1.8,drb:2.5,fg:3.1,fga:0.595,fg3:0.1,fg3a:1.8,ft:1.1,fta:1.6}},
      {id:'phi-quenting-228',name:'Quentin Grimes',img:'https://i11.hoopchina.com.cn/editor/86b0d593b6e497d9b32a581787fd0228_w_1040_h_760_.png',salary:8741209,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-kellyoub-229',name:'Kelly Oubre Jr.',img:'https://i3.hoopchina.com.cn/editor/6d9ee60aa5f46e25a7142b34738dc588_w_1040_h_760_.png',salary:8382150,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-andredru-230',name:'Andre Drummond',img:'https://i11.hoopchina.com.cn/editor/de710facf9af12a0c354b207dc7b8904_w_1040_h_760_.png',salary:5000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-kylelowr-231',name:'Kyle Lowry',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-johnibro-232',name:'Johni Broome',img:'',salary:1272870,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698},
      {id:'phi-cameronp-233',name:'Cameron Payne',img:'',salary:712637,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-charlesb-234',name:'Charles Bassey',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phi-patrickb-235',name:'Patrick Baldwin Jr.',img:'',salary:263940,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  phx: {
    id:'phx',
    name:'菲尼克斯太阳',  
    shortName:'太阳',  
    conference:'west',  
    color:'#1D1160',  
    accent:'#E56020',  
    overTaxLine:0,
    capRoom:49605302,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'phx-jalengre-228',name:'杰伦-格林',img:'https://i5.hoopchina.com.cn/editor/ce633e92b34bf8938394f7d5be270731_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:33584499,per:16.4,yearsRemaining:2,pos:'SG',ht:76,wt:186,exp:'4',salary_2026_27:36251166,salary_2027_28:36000000,stats:{g:32,gs:27,mp:25.9,pts:17.8,ast:2.8,trb:3.6,stl:1.1,blk:0.3,tov:2.3,pf:1.3,fg_pct:0.422,fg3_pct:0.313,ft_pct:0.747,orb:0.5,drb:3.1,fg:16,fga:2.2,fg3:7.1,fg3a:4.5,ft:2,fta:2.7}},
      {id:'phx-dillonbr-229',name:'狄龙-布鲁克斯',img:'https://i1.hoopchina.com.cn/editor/8c5b54296c0a304183e010d1d2e61b0b_w_1040_h_760_.png',salary:21124110,per:13,yearsRemaining:1,pos:'SF',ht:79,wt:225,exp:'8',salary_2026_27:19992727,stats:{g:56,gs:56,mp:30.4,pts:20.2,ast:1.8,trb:3.6,stl:1,blk:0.2,tov:1.8,pf:3.3,fg_pct:0.435,fg3_pct:0.344,ft_pct:0.842,orb:0.8,drb:2.9,fg:17.1,fga:2.3,fg3:6.6,fg3a:5.2,ft:3,fta:3.6}},
      {id:'phx-graysona-230',name:'格雷森-阿伦',img:'https://i1.hoopchina.com.cn/editor/a025d210f90f4c022b0b4750d5d8f7be_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:16875000,per:12.6,yearsRemaining:2,pos:'SG',ht:75,wt:198,exp:'7',salary_2026_27:18125000,salary_2027_28:19375000,stats:{g:51,gs:27,mp:28.8,pts:16.5,ast:3.8,trb:3,stl:1.4,blk:0.3,tov:1.6,pf:2.3,fg_pct:0.403,fg3_pct:0.349,ft_pct:0.857,orb:0.7,drb:2.3,fg:13.1,fga:3.1,fg3:8.9,fg3a:2.2,ft:2.8,fta:3.3}},
      {id:'phx-royceone-231',name:'罗伊斯-奥尼尔',img:'https://i3.hoopchina.com.cn/editor/011a5d761c603fe46a97dd94adb27662_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:10125000,per:13.9,yearsRemaining:2,pos:'SF',ht:78,wt:226,exp:'8',salary_2026_27:10875000,salary_2027_28:11625000,stats:{g:78,gs:67,mp:28.4,pts:9.8,ast:2.7,trb:4.8,stl:1.1,blk:0.4,tov:1.3,pf:2.3,fg_pct:0.421,fg3_pct:0.7,ft_pct:0.711,orb:0.8,drb:4,fg:8,fga:2.7,fg3:6.7,fg3a:0.408,ft:0.3,fta:0.5}},
      {id:'phx-khamanma-232',name:'卡曼-马卢阿奇',img:'https://i3.hoopchina.com.cn/editor/29b3f16a088e21c7557034bf3f80fcfa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:6016080,per:11.5,yearsRemaining:3,pos:'C',ht:85,wt:250,exp:'R',salary_2026_27:6316680,salary_2027_28:6617160,salary_2028_29:8436880,stats:{g:46,gs:1,mp:8.9,pts:3,ast:0.1,trb:2.9,stl:0.1,blk:0.7,tov:0.5,pf:0.9,fg_pct:0.1,fg3_pct:0.238,ft_pct:0.71,orb:1.1,drb:1.8,fg:2.3,fga:0.533,fg3:0.5,fg3a:1.1,ft:0.5,fta:0.7}},
      {id:'phx-haywoodh-233',name:'海伍德-海史密斯',img:'',salary:6443984,per:10.3,yearsRemaining:1,pos:'SF',ht:77,wt:220,exp:'5',salary_2026_27:3018158,stats:{g:7,gs:0,mp:13,pts:5.4,ast:1,trb:1.9,stl:0.6,blk:0,tov:0,pf:1.3,fg_pct:0.522,fg3_pct:0.6,ft_pct:0.857,orb:0.9,drb:1,fg:3.3,fga:1.1,fg3:2,fg3a:0.571,ft:0.9,fta:1}},
      {id:'phx-ryandunn-234',name:'瑞安·邓恩',img:'',salary:2657760,per:8.4,yearsRemaining:2,pos:'SF',ht:79,wt:216,exp:'1',salary_2026_27:2784240,salary_2027_28:5025553,stats:{g:70,gs:16,mp:19.4,pts:5.8,ast:1.5,trb:4.2,stl:0.9,blk:0.4,tov:0.8,pf:1.9,fg_pct:0.8,fg3_pct:0.331,ft_pct:0.489,orb:1.4,drb:2.8,fg:5.2,fga:0.453,fg3:2.4,fg3a:1.5,ft:0.3,fta:0.7}},
      {id:'phx-osoighod-236',name:'奥索·伊戈达罗',img:'https://i5.hoopchina.com.cn/editor/6cd07ee459e3bbe5ce19c4e6ba72714f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:10.1,yearsRemaining:2,pos:'PF',ht:83,wt:235,exp:'1',salary_2026_27:2296271,salary_2027_28:2486995,stats:{g:82,gs:24,mp:22,pts:6.5,ast:2.3,trb:5.1,stl:0.9,blk:0.7,tov:1.2,pf:2.7,fg_pct:0,fg3_pct:0,ft_pct:0.453,orb:1.7,drb:3.4,fg:4.5,fga:0.653,fg3:0,fg3a:2.9,ft:0.6,fta:1.4}},
      {id:'phx-rasheerf-237',name:'拉希尔・弗莱明',img:'',salary:1272870,per:9.4,yearsRemaining:3,pos:'PF',ht:81,wt:240,exp:'R',salary_2026_27:2150917,salary_2027_28:2525901,salary_2028_29:2735698,stats:{g:55,gs:1,mp:12.2,pts:4.3,ast:0.3,trb:2.3,stl:0.4,blk:0.4,tov:0.5,pf:1.2,fg_pct:0.8,fg3_pct:0.8,ft_pct:0.559,orb:1,drb:1.2,fg:3.9,fga:0.405,fg3:2.4,fg3a:0.346,ft:0.3,fta:0.6}},
      {id:'phx-devinboo-238',name:'Devin Booker',img:'https://i1.hoopchina.com.cn/editor/3e64f5ec3c3e9c09d7c53599f64b3c9b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:53142264,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:57078728,salary_2027_28:61015192,salary_2028_29:64065952,salary_2029_30:69191228},
      {id:'phx-bradleyb-239',name:'Bradley Beal',img:'',salary:24737010,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:25004710,salary_2027_28:19383010,salary_2028_29:19383010,salary_2029_30:19383010},
      {id:'phx-markwill-240',name:'Mark Williams',img:'https://i10.hoopchina.com.cn/editor/e51a553f95c49a38386d1bcaade447eb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:6276531,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phx-nassirli-241',name:'Nassir Little',img:'',salary:3107143,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3107143,salary_2027_28:3107143,salary_2028_29:3107143},
      {id:'phx-jordango-242',name:'Jordan Goodwin',img:'https://i3.hoopchina.com.cn/editor/fece62df6a48fec0a40cce1053cd4b81_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2349578,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phx-coleanth-243',name:'Cole Anthony',img:'',salary:5996274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3700000,salary_2027_28:3700000},
      {id:'phx-amircoff-244',name:'Amir Coffey',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phx-collingi-245',name:'Collin Gillespie',img:'https://i1.hoopchina.com.cn/editor/bf4c6b8eab42d7e0b9c1eab9951d0e3a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'phx-ejliddel-246',name:'E.J. Liddell',img:'https://i1.hoopchina.com.cn/editor/13544c1842f00829c01aa4aa82333156_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp夏普https://i10.hoopchina.com.cn/editor/093a5ca88c8a51358616a0e59a681ab4_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克劳尼https://i1.hoopchina.com.cn/editor/4434b98f09bfc9b16859f33797ed61df_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp威尔逊https://i1.hoopchina.com.cn/editor/1566a6421ea6aab1fd5666f70096bf16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp阿巴基https://i11.hoopchina.com.cn/editor/fd787d18f90b4149494dc6010019d53f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克拉克斯顿https://i11.hoopchina.com.cn/editor/175518cfcf757fcbc835de595f7211b6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特拉奥雷https://i5.hoopchina.com.cn/editor/4c53f3b70a6a1f24dcadf172ab7fc63f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:706898,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:706898}
    ]
  },

  por: {
    id:'por',
    name:'波特兰开拓者',  
    shortName:'开拓者',  
    conference:'west',  
    color:'#E03A3E',  
    accent:'#000000',  
    overTaxLine:0,
    capRoom:-9763510,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'por-jrueholi-238',name:'朱-霍勒迪',img:'https://i3.hoopchina.com.cn/editor/4b78e8630c9eda95c27079371e4e17c1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:32400000,per:16.2,yearsRemaining:2,pos:'PG',ht:76,wt:220,exp:'16',salary_2026_27:34800000,salary_2027_28:37200000,stats:{g:53,gs:51,mp:29.4,pts:16.3,ast:6.1,trb:4.6,stl:1,blk:0.1,tov:2.8,pf:1.5,fg_pct:0.451,fg3_pct:0.378,ft_pct:0.838,orb:1.3,drb:3.3,fg:13.4,fga:2.6,fg3:6.8,fg3a:3.5,ft:1.7,fta:2}},
      {id:'por-jeramigr-239',name:'杰拉米-格兰特',img:'https://i10.hoopchina.com.cn/editor/8384bf82a72ad03730513fc68aab98d5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:32000001,per:17.9,yearsRemaining:2,pos:'PF',ht:79,wt:213,exp:'11',salary_2026_27:34206898,salary_2027_28:36413790,stats:{g:57,gs:38,mp:29.7,pts:18.6,ast:2.1,trb:3.5,stl:0.7,blk:0.6,tov:2.1,pf:2.5,fg_pct:0.453,fg3_pct:0.389,ft_pct:0.814,orb:1,drb:2.5,fg:12.8,fga:2.4,fg3:6.1,fg3a:3.4,ft:4.6,fta:5.6}},
      {id:'por-shaedons-240',name:'谢登-夏普',img:'https://i1.hoopchina.com.cn/editor/ccf14d4913db8d3ce9e0fba1cc372a62_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:8399983,per:13.8,yearsRemaining:4,pos:'SG',ht:77,wt:210,exp:'3',salary_2026_27:20089287,salary_2027_28:21696429,salary_2028_29:23303571,salary_2029_30:24910713,stats:{g:50,gs:42,mp:29.4,pts:20.8,ast:2.6,trb:4.3,stl:1.4,blk:0.1,tov:2.9,pf:2,fg_pct:0.452,fg3_pct:0.337,ft_pct:0.787,orb:1,drb:3.3,fg:17.4,fga:2.1,fg3:6.1,fg3a:5.8,ft:3.1,fta:3.9}},
      {id:'por-toumanic-241',name:'图马尼-卡马拉',img:'https://i11.hoopchina.com.cn/editor/2173b6493afc345f915068e8126edf47_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2221677,per:11.5,yearsRemaining:4,pos:'PF',ht:79,wt:230,exp:'2',salary_2026_27:18080358,salary_2027_28:19526786,salary_2028_29:20973214,salary_2029_30:22419642,stats:{g:82,gs:82,mp:33.3,pts:13.4,ast:2.5,trb:5.1,stl:1.1,blk:0.4,tov:1.8,pf:2.9,fg_pct:0.44,fg3_pct:0.37,ft_pct:0.708,orb:1.6,drb:3.6,fg:10.9,fga:2.7,fg3:7.2,fg3a:2.1,ft:1.2,fta:1.7}},
      {id:'por-scoothen-242',name:'斯库特·亨德森',img:'https://i11.hoopchina.com.cn/editor/f091e28a630cfeec0e77a436d0ca12ce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:10748040,per:12.4,yearsRemaining:1,pos:'PG',ht:75,wt:207,exp:'2',salary_2026_27:13585523,stats:{g:30,gs:10,mp:24.9,pts:14.2,ast:3.7,trb:2.7,stl:0.9,blk:0.3,tov:2.4,pf:2.8,fg_pct:0.418,fg3_pct:0.352,ft_pct:0.84,orb:0.6,drb:2.1,fg:11.4,fga:1.9,fg3:5.4,fg3a:2.9,ft:2.8,fta:3.3}},
      {id:'por-damianli-243',name:'达米安-利拉德',img:'https://i5.hoopchina.com.cn/editor/37db6a72e38b3a0bdb072c32aa0896b6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:36620603,per:10.7,yearsRemaining:2,pos:'PG',ht:74,wt:200,exp:'13',salary_2026_27:35915403,salary_2027_28:36620603,salary_2028_29:22516603,salary_2029_30:22516603},
      {id:'por-deniavdi-244',name:'德尼-阿夫迪亚',img:'https://i11.hoopchina.com.cn/editor/9ddd6c5ba6ac4e5ba9b0d378778a3586_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:14375000,per:12.9,yearsRemaining:2,pos:'SF',ht:80,wt:228,exp:'5',salary_2026_27:13125000,salary_2027_28:11875000,stats:{g:66,gs:66,mp:33.3,pts:24.2,ast:6.7,trb:6.9,stl:0.8,blk:0.6,tov:3.8,pf:2.5,fg_pct:0.462,fg3_pct:0.318,ft_pct:0.802,orb:1.1,drb:5.8,fg:16.1,fga:1.9,fg3:6,fg3a:5.6,ft:7.4,fta:9.2}},
      {id:'por-donovanc-245',name:'多诺万·克林根',img:'https://i10.hoopchina.com.cn/editor/cad6de714cc0e2ecaffc517c97ba5366_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:7178400,per:8.5,yearsRemaining:2,pos:'C',ht:86,wt:280,exp:'1',salary_2026_27:7519920,salary_2027_28:9550298,stats:{g:77,gs:77,mp:27.2,pts:12.1,ast:2.1,trb:11.6,stl:0.6,blk:1.7,tov:1.2,pf:2.4,fg_pct:0.52,fg3_pct:0.341,ft_pct:0.68,orb:4.5,drb:7.1,fg:8.9,fga:1.1,fg3:3.2,fg3a:3.5,ft:1.8,fta:2.6}},
      {id:'por-krismurr-246',name:'克里斯·默里',img:'',salary:3132000,per:8.6,yearsRemaining:1,pos:'SF',ht:80,wt:218,exp:'2',salary_2026_27:5315004,stats:{g:57,gs:15,mp:23.4,pts:5.8,ast:1.4,trb:3.6,stl:0.9,blk:0.4,tov:0.8,pf:1.6,fg_pct:0.6,fg3_pct:0.279,ft_pct:0.684,orb:1.6,drb:2,fg:4.8,fga:0.467,fg3:2.1,fg3a:1.7,ft:0.7,fta:1}},
      {id:'por-yanghans-247',name:'杨瀚森',img:'https://i3.hoopchina.com.cn/editor/6f87901817f0435e75121ed43f045c7c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:4422360,per:11.4,yearsRemaining:3,pos:'C',ht:85,wt:270,exp:'R',salary_2026_27:4643520,salary_2027_28:4864920,salary_2028_29:7462788,stats:{g:43,gs:1,mp:7,pts:2.2,ast:0.5,trb:1.5,stl:0.1,blk:0.2,tov:0.7,pf:1,fg_pct:0.1,fg3_pct:0.6,ft_pct:0.824,orb:0.5,drb:1.1,fg:2.3,fga:0.31,fg3:1,fg3a:0.119,ft:0.7,fta:0.8}},
      {id:'por-deandrea-248',name:'Deandre Ayton',img:'',salary:33654814,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:8104000},
      {id:'por-robertwi-249',name:'Robert Williams',img:'https://i3.hoopchina.com.cn/editor/fc67673ecdec25faf7aea20d81d444c0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:13285713,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'por-matisset-250',name:'Matisse Thybulle',img:'https://i10.hoopchina.com.cn/editor/7c5e9e99b9c0cb00f9937515e4b4dd8b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:11550000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'por-vitkrejc-251',name:'Vít Krejčí',img:'',salary:2349578,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2667944,salary_2027_28:3005085},
      {id:'por-blakewes-252',name:'Blake Wesley',img:'',salary:5643732,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'por-rayanrup-253',name:'Rayan Rupert',img:'',salary:2353647,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'por-sidyciss-254',name:'Sidy Cissoko',img:'',salary:686243,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2497812},
      {id:'por-didilouz-255',name:'Didi Louzada',img:'',salary:268032,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:268032,salary_2027_28:268032,salary_2028_29:268032}
    ]
  },

  sac: {
    id:'sac',
    name:'萨克拉门托国王',  
    shortName:'国王',  
    conference:'west',  
    color:'#5A2D81',  
    accent:'#63727A',  
    overTaxLine:12008621,
    capRoom:-48008621,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'sac-zachlavi-248',name:'扎克-拉文',img:'',salary:47499660,per:18.2,yearsRemaining:1,pos:'SG',ht:77,wt:200,exp:'11',salary_2026_27:48967380,stats:{g:39,gs:37,mp:31.4,pts:19.2,ast:2.3,trb:2.8,stl:0.7,blk:0.3,tov:1.9,pf:2.1,fg_pct:0.479,fg3_pct:0.39,ft_pct:0.88,orb:0.2,drb:2.6,fg:14,fga:2.5,fg3:6.5,fg3a:4.2,ft:3.2,fta:3.6}},
      {id:'sac-domantas-249',name:'多曼塔斯-萨博尼斯',img:'',salary:42336000,per:18.1,yearsRemaining:2,pos:'C',ht:82,wt:240,exp:'9',salary_2026_27:45472000,salary_2027_28:48608000,stats:{g:19,gs:15,mp:29.7,pts:15.8,ast:4.1,trb:11.4,stl:0.9,blk:0.2,tov:2.7,pf:3.5,fg_pct:0.3,fg3_pct:0.185,ft_pct:0.727,orb:3.4,drb:8,fg:11.6,fga:0.543,fg3:1.4,fg3a:6.1,ft:2.9,fta:4.1}},
      {id:'sac-demarder-250',name:'德马尔-德罗赞',img:'',salary:24570000,per:12.7,yearsRemaining:1,pos:'PF',ht:78,wt:220,exp:'16',salary_2026_27:25740000,stats:{g:77,gs:77,mp:31.2,pts:18.4,ast:4.1,trb:2.9,stl:1,blk:0.3,tov:1.2,pf:1.9,fg_pct:0.6,fg3_pct:0.32,ft_pct:0.868,orb:0.5,drb:2.5,fg:13.1,fga:0.497,fg3:1.9,fg3a:5.9,ft:4.9,fta:5.6}},
      {id:'sac-deandreh-251',name:'德安德烈-亨特',img:'',salary:23303571,per:15.5,yearsRemaining:1,pos:'SF',ht:79,wt:221,exp:'6',salary_2026_27:24910714,stats:{g:2,gs:2,mp:25.5,pts:7.5,ast:0.5,trb:1.5,stl:0,blk:0,tov:2,pf:2.5,fg_pct:1,fg3_pct:1,ft_pct:0.833,orb:0.5,drb:1,fg:9.5,fga:0.211,fg3:4.5,fg3a:0.222,ft:2.5,fta:3}},
      {id:'sac-keeganmu-252',name:'基根-穆雷',img:'',salary:11144093,per:14,yearsRemaining:5,pos:'PF',ht:80,wt:225,exp:'3',salary_2026_27:24137936,salary_2027_28:26068965,salary_2028_29:27999999,salary_2029_30:29931033,stats:{g:23,gs:22,mp:34.5,pts:14,ast:1.7,trb:5.7,stl:1,blk:1.6,tov:1.2,pf:1.8,fg_pct:0.42,fg3_pct:0.277,ft_pct:0.776,orb:1.4,drb:4.3,fg:13,fga:1.3,fg3:4.9,fg3a:4.1,ft:1.7,fta:2.1}},
      {id:'sac-malikmon-253',name:'马利克-蒙克',img:'https://i3.hoopchina.com.cn/editor/89598276607835343a6cd511e80f39f1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克利福德https://i1.hoopchina.com.cn/editor/9526a56a8d3676ce3ab42eecc3ca032a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp海耶斯https://i3.hoopchina.com.cn/editor/c5f76c2f237a293a89414e223378ae89_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp迈克德莫特https://i3.hoopchina.com.cn/editor/d2a64b2afa4e2015eb089775fdd70b75_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp拉文https://i1.hoopchina.com.cn/editor/7b135d8e068eaf66ad492e263e520e33_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp阿丘瓦https://i3.hoopchina.com.cn/editor/bccf943a2a22270b5e6fba44311deb82_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp德罗赞https://i1.hoopchina.com.cn/editor/66ba8867f88e0d034666fb7194cf6f31_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp萨博尼斯https://i10.hoopchina.com.cn/editor/79ba193d083e4105eeb4297c661eb419_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp基根穆雷https://i3.hoopchina.com.cn/editor/6cc176f93893f527e1c9fdace221e423_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp威少https://i11.hoopchina.com.cn/editor/61c0b7b4c257f5b4b8a28ea495e330cd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp尤班克斯https://i10.hoopchina.com.cn/editor/da19038143c2ea8903f1efc10e7cb921_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp亨特https://i10.hoopchina.com.cn/editor/602c609ebacbd58804784630dc246232_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp德文卡特https://i5.hoopchina.com.cn/editor/be64228e0b271c3b3125849de6d9ef17_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp鲍德温https://i1.hoopchina.com.cn/editor/b2e7887f09e806e0533a47d5b00e1f59_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp以赛亚-史蒂文斯https://i1.hoopchina.com.cn/editor/3dce2f32c459203fcfc9355434ced130_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp普老登https://i1.hoopchina.com.cn/editor/ce392bf4cf40b3b4ae429dbbdf12e278_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp卡德维尔https://i10.hoopchina.com.cn/editor/3d115aaa9eab973efdda02794de9ad27_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:18797619,per:15.7,yearsRemaining:2,pos:'SG',ht:75,wt:200,exp:'8',salary_2026_27:20190035,salary_2027_28:21582451,stats:{g:62,gs:3,mp:22,pts:12.5,ast:3,trb:1.9,stl:0.6,blk:0.4,tov:1.5,pf:1.6,fg_pct:0.438,fg3_pct:0.395,ft_pct:0.879,orb:0.2,drb:1.6,fg:10.2,fga:2,fg3:5.1,fg3a:2.5,ft:1.5,fta:1.7}},
      {id:'sac-devincar-254',name:'德文·卡特',img:'',salary:4923720,per:10.8,yearsRemaining:2,pos:'PG',ht:74,wt:195,exp:'1',salary_2026_27:5158080,salary_2027_28:7370897,stats:{g:38,gs:12,mp:18.4,pts:8.9,ast:2.7,trb:3.3,stl:0.9,blk:0.2,tov:1.4,pf:1.3,fg_pct:0.8,fg3_pct:0.263,ft_pct:0.713,orb:0.9,drb:2.3,fg:7.7,fga:0.414,fg3:3,fg3a:2.4,ft:1.8,fta:2.5}},
      {id:'sac-niquecli-255',name:'尼克-克利福德',img:'',salary:3108120,per:8.2,yearsRemaining:3,pos:'SG',ht:77,wt:175,exp:'R',salary_2026_27:3263400,salary_2027_28:3418800,salary_2028_29:5979481,stats:{g:75,gs:28,mp:25.1,pts:8.6,ast:2.4,trb:3.8,stl:0.9,blk:0.3,tov:1.5,pf:2.1,fg_pct:1,fg3_pct:0.333,ft_pct:0.722,orb:0.9,drb:2.9,fg:7.9,fga:0.418,fg3:3.1,fg3a:2.3,ft:0.9,fta:1.3}},
      {id:'sac-killianh-256',name:'基利安-海斯',img:'',salary:263940,per:9.9,yearsRemaining:1,pos:'PG',ht:76,wt:195,exp:'5',stats:{g:23,gs:3,mp:17.7,pts:5.5,ast:3.5,trb:2.3,stl:0.9,blk:0.2,tov:1.2,pf:1.6,fg_pct:0.7,fg3_pct:0.27,ft_pct:0.929,orb:0.2,drb:2.2,fg:6,fga:0.304,fg3:2.7,fg3a:1.1,ft:1.1,fta:1.2}},
      {id:'sac-maximera-257',name:'马克西姆-雷诺',img:'',salary:1272870,per:8.1,yearsRemaining:2,pos:'C',ht:85,wt:250,exp:'R',salary_2026_27:2150917,salary_2027_28:2525901,stats:{g:74,gs:56,mp:26.5,pts:12.5,ast:1.4,trb:7.5,stl:0.5,blk:0.5,tov:1.3,pf:2.3,fg_pct:0.3,fg3_pct:0.324,ft_pct:0.786,orb:1.9,drb:5.6,fg:9.1,fga:0.571,fg3:1,fg3a:4.9,ft:1.8,fta:2.3}},
      {id:'sac-russellw-258',name:'Russell Westbrook',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sac-dougmcde-259',name:'Doug McDermott',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sac-dreweuba-260',name:'Drew Eubanks',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sac-precious-261',name:'Precious Achiuwa',img:'',salary:2111516,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  sas: {
    id:'sas',
    name:'圣安东尼奥马刺',  
    shortName:'马刺',  
    conference:'west',  
    color:'#C4CED4',  
    accent:'#000000',  
    overTaxLine:0,
    capRoom:531434,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'sas-deaaronf-258',name:'达龙-福克斯',img:'https://i1.hoopchina.com.cn/editor/7f419a4d7849b37f8eb8b7eb3c653906_w_1040_h_760_.png',salary:37096620,per:16.2,yearsRemaining:4,pos:'PG',ht:75,wt:185,exp:'8',salary_2026_27:49800000,salary_2027_28:53784000,salary_2028_29:57768000,salary_2029_30:61752000,stats:{g:72,gs:72,mp:31,pts:18.6,ast:6.2,trb:3.8,stl:1.2,blk:0.3,tov:2.3,pf:2.3,fg_pct:0.486,fg3_pct:0.332,ft_pct:0.76,orb:0.6,drb:3.2,fg:14.5,fga:1.8,fg3:5.5,fg3a:5.3,ft:2.6,fta:3.4}},
      {id:'sas-devinvas-259',name:'德文-瓦塞尔',img:'https://i1.hoopchina.com.cn/editor/5564c76d7da1614ccf593b6a58845b72_w_1040_h_760_.png',salary:27000000,per:14.3,yearsRemaining:3,pos:'SG',ht:77,wt:200,exp:'5',salary_2026_27:27000000,salary_2027_28:24652174,salary_2028_29:27000000,stats:{g:67,gs:65,mp:30.5,pts:13.9,ast:2.5,trb:4,stl:0.9,blk:0.4,tov:0.9,pf:1.6,fg_pct:0.437,fg3_pct:0.384,ft_pct:0.815,orb:0.6,drb:3.4,fg:11.3,fga:2.5,fg3:6.4,fg3a:2.4,ft:1.6,fta:1.9}},
      {id:'sas-keldonjo-260',name:'凯尔登-约翰逊',img:'https://i10.hoopchina.com.cn/editor/e30bab97922440bbe3326b11f291a603_w_1040_h_760_.png',salary:17500000,per:10.9,yearsRemaining:1,pos:'SF',ht:78,wt:220,exp:'6',salary_2026_27:17500000,stats:{g:82,gs:0,mp:23.3,pts:13.2,ast:1.4,trb:5.4,stl:0.6,blk:0.1,tov:0.9,pf:2,fg_pct:0.519,fg3_pct:0.363,ft_pct:0.794,orb:1.7,drb:3.7,fg:9.7,fga:1.2,fg3:3.3,fg3a:3.8,ft:1.9,fta:2.4}},
      {id:'sas-victorwe-261',name:'维克托·文班亚马',img:'https://i10.hoopchina.com.cn/editor/661e8730cc5a1beea210d25eb71380f3_w_1040_h_760_.png',salary:13376880,per:12.4,yearsRemaining:1,pos:'C',ht:88,wt:235,exp:'2',salary_2026_27:16868246,stats:{g:64,gs:55,mp:29.2,pts:25,ast:3.1,trb:11.5,stl:1,blk:3.1,tov:2.4,pf:2.4,fg_pct:0.512,fg3_pct:0.349,ft_pct:0.827,orb:2,drb:9.5,fg:16.9,fga:1.9,fg3:5.5,fg3a:6.7,ft:5.8,fta:7}},
      {id:'sas-dylanhar-262',name:'迪伦-哈珀',img:'https://i1.hoopchina.com.cn/editor/114c69dd19f6e253559beb25240b1c8f_w_1040_h_760_.png',salary:12370320,per:11.4,yearsRemaining:3,pos:'SG',ht:77,wt:215,exp:'R',salary_2026_27:12989040,salary_2027_28:13607760,salary_2028_29:17172994,stats:{g:69,gs:4,mp:22.6,pts:11.8,ast:3.9,trb:3.4,stl:0.8,blk:0.3,tov:1.4,pf:2,fg_pct:0.9,fg3_pct:0.343,ft_pct:0.756,orb:0.8,drb:2.6,fg:9.5,fga:0.505,fg3:2.6,fg3a:3.9,ft:1.3,fta:1.7}},
      {id:'sas-lukekorn-263',name:'卢克-科内特',img:'https://i1.hoopchina.com.cn/editor/1281e5e0e2164e8824747bfcfedbf368_w_1040_h_760_.png',salary:11000000,per:13.1,yearsRemaining:3,pos:'C',ht:85,wt:250,exp:'8',salary_2026_27:10450000,salary_2027_28:9900000,salary_2028_29:9350000,stats:{g:68,gs:25,mp:21,pts:6.5,ast:1.9,trb:6.1,stl:0.5,blk:1,tov:0.4,pf:1.8,fg_pct:0,fg3_pct:0,ft_pct:0.825,orb:2.7,drb:3.4,fg:4,fga:0.643,fg3:0,fg3a:2.6,ft:1.4,fta:1.7}},
      {id:'sas-stephonc-264',name:'斯蒂芬·卡斯尔',img:'https://i3.hoopchina.com.cn/editor/721fc439b7e0a43bf83828e329050e11_w_1040_h_760_.png',salary:9560520,per:13.4,yearsRemaining:2,pos:'PG',ht:78,wt:215,exp:'1',salary_2026_27:10015920,salary_2027_28:12670139,stats:{g:68,gs:67,mp:30,pts:16.7,ast:7.4,trb:5.3,stl:1.1,blk:0.3,tov:3.2,pf:3.3,fg_pct:0.471,fg3_pct:0.332,ft_pct:0.734,orb:1.4,drb:3.9,fg:12,fga:1.2,fg3:3.6,fg3a:4.5,ft:4.1,fta:5.6}},
      {id:'sas-carterbr-265',name:'卡特-布莱恩特',img:'https://i5.hoopchina.com.cn/editor/b74a812dc230fc8d9f5a87d05b86b69e_w_1040_h_760_.png',salary:4900320,per:9.5,yearsRemaining:3,pos:'PF',ht:78,wt:220,exp:'R',salary_2026_27:5145360,salary_2027_28:5390640,salary_2028_29:7983539,stats:{g:71,gs:0,mp:11.5,pts:4.2,ast:0.7,trb:2.5,stl:0.2,blk:0.3,tov:0.5,pf:1.3,fg_pct:0.7,fg3_pct:0.8,ft_pct:0.714,orb:0.5,drb:2,fg:3.7,fga:0.408,fg3:2.2,fg3a:0.335,ft:0.4,fta:0.6}},
      {id:'sas-julianch-266',name:'朱利安-尚彭尼',img:'https://i10.hoopchina.com.cn/editor/03ea010ecab9967b3473df0e6b7440fd_w_1040_h_760_.png',salary:3000000,per:10.4,yearsRemaining:1,pos:'SF',ht:79,wt:217,exp:'3',salary_2026_27:3000000,stats:{g:82,gs:68,mp:27.6,pts:11.1,ast:1.5,trb:5.8,stl:0.8,blk:0.5,tov:0.8,pf:1.6,fg_pct:0.437,fg3_pct:0.381,ft_pct:0.844,orb:0.9,drb:4.9,fg:8.4,fga:2.4,fg3:6.2,fg3a:1.3,ft:1.4,fta:1.6}},
      {id:'sas-harrison-267',name:'Harrison Barnes',img:'https://i1.hoopchina.com.cn/editor/60ceff61e8f3b4dbd562b30155af5e15_w_1040_h_760_.png',salary:19000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-kellyoly-268',name:'Kelly Olynyk',img:'https://i3.hoopchina.com.cn/editor/068bbf2b3c122e8c81dd16b39d187acc_w_1040_h_760_.png',salary:13445122,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-jeremyso-269',name:'Jeremy Sochan',img:'',salary:7874853,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-bismackb-270',name:'Bismack Biyombo',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-lindywat-271',name:'Lindy Waters III',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-jordanmc-272',name:'Jordan McLaughlin',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'sas-masonplu-273',name:'Mason Plumlee',img:'',salary:3022108,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  tor: {
    id:'tor',
    name:'多伦多猛龙',  
    shortName:'猛龙',  
    conference:'east',  
    color:'#CE1141',  
    accent:'#000000',  
    overTaxLine:0,
    capRoom:-13967454,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'tor-scottieb-267',name:'斯科蒂-巴恩斯',img:'https://i1.hoopchina.com.cn/editor/cda0b6a26f72201c38e3eccf83a93b11_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:38661750,per:16.7,yearsRemaining:4,pos:'PF',ht:80,wt:237,exp:'4',salary_2026_27:41754690,salary_2027_28:44847630,salary_2028_29:47940570,salary_2029_30:51033510,stats:{g:80,gs:80,mp:33.5,pts:18.1,ast:5.9,trb:7.5,stl:1.4,blk:1.5,tov:2.6,pf:2.6,fg_pct:0.9,fg3_pct:0.304,ft_pct:0.815,orb:1.9,drb:5.6,fg:14,fga:0.507,fg3:2.8,fg3a:6.3,ft:3,fta:3.7}},
      {id:'tor-brandoni-268',name:'布兰登-英格拉姆',img:'https://i5.hoopchina.com.cn/editor/2b10d4df0788f692cc392c23f41d0288_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp奎克利https://i5.hoopchina.com.cn/editor/d50011d5836d1a86abede3f6d3fe810c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:38095238,per:18.3,yearsRemaining:2,pos:'SF',ht:80,wt:190,exp:'9',salary_2026_27:40000000,salary_2027_28:41904762,stats:{g:77,gs:77,mp:33.8,pts:21.5,ast:3.7,trb:5.6,stl:0.8,blk:0.7,tov:2.4,pf:1.9,fg_pct:0.477,fg3_pct:0.382,ft_pct:0.82,orb:0.8,drb:4.8,fg:16.7,fga:1.8,fg3:4.6,fg3a:6.2,ft:3.8,fta:4.6}},
      {id:'tor-immanuel-269',name:'伊曼纽尔-奎克利',img:'',salary:32500000,per:14.9,yearsRemaining:3,pos:'PG',ht:74,wt:190,exp:'5',salary_2026_27:32500000,salary_2027_28:32500000,salary_2028_29:32500000,stats:{g:70,gs:70,mp:31.9,pts:16.4,ast:5.9,trb:4,stl:1.3,blk:0.1,tov:1.5,pf:2,fg_pct:0.443,fg3_pct:0.374,ft_pct:0.821,orb:0.5,drb:3.5,fg:12.9,fga:2.5,fg3:6.8,fg3a:3.2,ft:2.4,fta:3}},
      {id:'tor-rjbarret-270',name:'RJ-巴雷特',img:'https://i3.hoopchina.com.cn/editor/153032d31940c9cee617ec14b837f7a6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:27705357,per:14.4,yearsRemaining:1,pos:'SF',ht:78,wt:214,exp:'6',salary_2026_27:29616071,stats:{g:57,gs:57,mp:30.3,pts:19.3,ast:3.3,trb:5.3,stl:0.7,blk:0.3,tov:1.7,pf:2.6,fg_pct:0.491,fg3_pct:0.339,ft_pct:0.717,orb:1,drb:4.3,fg:14.3,fga:1.7,fg3:5,fg3a:5.4,ft:3.5,fta:4.9}},
      {id:'tor-gradeydi-271',name:'格雷迪·迪克',img:'https://i5.hoopchina.com.cn/editor/292c3fbd724464a93c6f66b4ac602788_w_933_h_633_.png?x-oss-process=image/resize,w_800/format,webp',salary:4990560,per:8.9,yearsRemaining:1,pos:'SG',ht:79,wt:200,exp:'2',salary_2026_27:7131511,stats:{g:76,gs:1,mp:14,pts:6,ast:0.7,trb:1.9,stl:0.6,blk:0.1,tov:0.6,pf:1.3,fg_pct:0.7,fg3_pct:0.301,ft_pct:0.875,orb:0.6,drb:1.4,fg:5.1,fga:0.419,fg3:2.4,fg3a:1.4,ft:1,fta:1.2}},
      {id:'tor-collinmu-272',name:'科林-默里-博伊尔斯',img:'https://i1.hoopchina.com.cn/editor/3c6dc920c5c913e127c2e4d30e9a59a8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:6332520,per:10.4,yearsRemaining:3,pos:'PF',ht:79,wt:245,exp:'R',salary_2026_27:6649560,salary_2027_28:6966000,salary_2028_29:8874684,stats:{g:57,gs:22,mp:21.9,pts:8.5,ast:1.9,trb:5,stl:0.9,blk:0.9,tov:1,pf:2.6,fg_pct:0.3,fg3_pct:0.34,ft_pct:0.657,orb:2.3,drb:2.7,fg:6,fga:0.579,fg3:0.9,fg3a:3.2,ft:1.2,fta:1.9}},
      {id:'tor-jakobewa-273',name:'贾科比·沃尔特',img:'https://i10.hoopchina.com.cn/editor/46322e7be88113e8282f88573a251f16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:3638160,per:8.2,yearsRemaining:2,pos:'SG',ht:76,wt:180,exp:'1',salary_2026_27:3811800,salary_2027_28:5870172,stats:{g:72,gs:19,mp:20.5,pts:7.5,ast:1.2,trb:2.6,stl:1,blk:0.2,tov:0.5,pf:2.3,fg_pct:0.446,fg3_pct:1,ft_pct:0.789,orb:0.8,drb:1.8,fg:5.6,fga:1.5,fg3:3.7,fg3a:0.409,ft:1,fta:1.3}},
      {id:'tor-sandroma-274',name:'桑德罗-马穆凯拉什维利',img:'https://i5.hoopchina.com.cn/editor/22878903ef811fe1d966963497200c7a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2461463,per:10.6,yearsRemaining:1,pos:'C',ht:81,wt:240,exp:'4',salary_2026_27:2801346,stats:{g:80,gs:13,mp:21.9,pts:11.2,ast:1.9,trb:4.9,stl:0.8,blk:0.5,tov:0.8,pf:1.8,fg_pct:0.523,fg3_pct:0.389,ft_pct:0.747,orb:1.4,drb:3.6,fg:7.9,fga:1.4,fg3:3.7,fg3a:2.7,ft:1.5,fta:2}},
      {id:'tor-trayceja-275',name:'特雷斯·杰克逊-戴维斯',img:'https://i10.hoopchina.com.cn/editor/e4deef1033a7b38f6c067926292fd0e6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2221677,per:9,yearsRemaining:1,pos:'C',ht:81,wt:245,exp:'2',salary_2026_27:2406205,stats:{g:17,gs:0,mp:5,pts:1.8,ast:0.4,trb:1.9,stl:0.2,blk:0.3,tov:0.2,pf:0.3,fg_pct:0,fg3_pct:0.6,ft_pct:0.409,orb:1.1,drb:0.8,fg:1.3,fga:0.5,fg3:0,fg3a:0,ft:0.5,fta:1.3}},
      {id:'tor-jamalshe-276',name:'贾马尔·谢德',img:'https://i5.hoopchina.com.cn/editor/851e2780d3ef3698ac677a398bbdaebe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:8.7,yearsRemaining:1,pos:'PG',ht:73,wt:200,exp:'1',salary_2026_27:2296271,stats:{g:82,gs:12,mp:22.6,pts:6.6,ast:5.4,trb:1.7,stl:0.9,blk:0.2,tov:1.4,pf:2,fg_pct:1,fg3_pct:0.321,ft_pct:0.784,orb:0.3,drb:1.4,fg:6.1,fga:0.367,fg3:3.2,fg3a:1.2,ft:1.1,fta:1.4}},
      {id:'tor-jakobpoe-277',name:'Jakob Poeltl',img:'https://i5.hoopchina.com.cn/editor/a0fa65af0a9a9ccc88691a073f8b70e7_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:19500000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:19500000,salary_2027_28:27300000,salary_2028_29:29484000,salary_2029_30:27300000},
      {id:'tor-chrispau-278',name:'Chris Paul',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'tor-garrettt-279',name:'Garrett Temple',img:'https://i10.hoopchina.com.cn/editor/6844df1e9bccd243c18760f684aff7af_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'tor-jonathan-280',name:'Jonathan Mogbo',img:'https://i5.hoopchina.com.cn/editor/d4f4b87857e35c686d141f4be2f0a8c6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271},
      {id:'tor-jamisonb-281',name:'Jamison Battle',img:'https://i10.hoopchina.com.cn/editor/51ead4a1484bf2949155563e25b20726_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp',salary:1955377,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2296271},
      {id:'tor-mobamba-282',name:'Mo Bamba',img:'',salary:458711,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  uta: {
    id:'uta',
    name:'犹他爵士',  
    shortName:'爵士',  
    conference:'west',  
    color:'#002B5C',  
    accent:'#F9A01B',  
    overTaxLine:0,
    capRoom:17143044,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'uta-jarenjac-277',name:'小贾伦-杰克逊',img:'',salary:35000000,per:17.6,yearsRemaining:4,pos:'C',ht:82,wt:242,exp:'7',salary_2026_27:49000000,salary_2027_28:50500000,salary_2028_29:52000000,salary_2029_30:53500000,stats:{g:3,gs:3,mp:24,pts:22.3,ast:2.7,trb:4.3,stl:2,blk:0.3,tov:2.3,pf:3,fg_pct:0.49,fg3_pct:0.333,ft_pct:0.875,orb:0.3,drb:4,fg:16.3,fga:1.7,fg3:5,fg3a:6.3,ft:4.7,fta:5.3}},
      {id:'uta-laurimar-278',name:'劳里-马尔卡宁',img:'',salary:46394100,per:17,yearsRemaining:3,pos:'PF',ht:85,wt:240,exp:'8',salary_2026_27:46113154,salary_2027_28:49824681,salary_2028_29:53536209,stats:{g:42,gs:42,mp:34.4,pts:26.7,ast:2.1,trb:6.9,stl:1,blk:0.5,tov:1.5,pf:1.8,fg_pct:0.477,fg3_pct:0.355,ft_pct:0.896,orb:2,drb:4.9,fg:19.2,fga:2.7,fg3:7.7,fg3a:6.4,ft:5.7,fta:6.4}},
      {id:'uta-acebaile-279',name:'埃斯-贝利',img:'',salary:9069840,per:9,yearsRemaining:3,pos:'SF',ht:81,wt:200,exp:'R',salary_2026_27:9523080,salary_2027_28:9976560,salary_2028_29:12640302,stats:{g:72,gs:61,mp:27.6,pts:13.8,ast:1.8,trb:4.2,stl:0.8,blk:0.7,tov:1.5,pf:2.7,fg_pct:0.443,fg3_pct:0.344,ft_pct:0.75,orb:1.4,drb:2.8,fg:12.4,fga:1.9,fg3:5.5,fg3a:3.6,ft:0.9,fta:1.2}},
      {id:'uta-keyonteg-280',name:'基扬特·乔治',img:'',salary:4278960,per:11.3,yearsRemaining:1,pos:'PG',ht:76,wt:185,exp:'2',salary_2026_27:6563925,stats:{g:54,gs:54,mp:33.1,pts:23.6,ast:6.1,trb:3.7,stl:1.1,blk:0.3,tov:3.1,pf:2.2,fg_pct:0.456,fg3_pct:0.371,ft_pct:0.892,orb:0.4,drb:3.3,fg:16.3,fga:2.5,fg3:6.7,fg3a:5,ft:6.2,fta:7}},
      {id:'uta-johnkonc-281',name:'约翰-康查尔',img:'',salary:6165000,per:11.4,yearsRemaining:1,pos:'SG',ht:77,wt:210,exp:'6',salary_2026_27:6165000,stats:{g:26,gs:7,mp:26.2,pts:5.9,ast:3,trb:5.7,stl:2,blk:1,tov:0.8,pf:1.9,fg_pct:0.6,fg3_pct:0.25,ft_pct:0.774,orb:2.1,drb:3.6,fg:4.9,fga:0.445,fg3:2.3,fg3a:1.6,ft:0.9,fta:1.2}},
      {id:'uta-codywill-282',name:'科迪·威廉姆斯',img:'',salary:5742480,per:8.1,yearsRemaining:2,pos:'SG',ht:80,wt:190,exp:'1',salary_2026_27:6015600,salary_2027_28:7669890,stats:{g:67,gs:41,mp:24.3,pts:8.8,ast:2,trb:3,stl:0.8,blk:0.4,tov:1.1,pf:1.8,fg_pct:0.4,fg3_pct:0.214,ft_pct:0.706,orb:0.9,drb:2,fg:7.6,fga:0.468,fg3:2,fg3a:3.1,ft:1.3,fta:1.8}},
      {id:'uta-bricesen-283',name:'布赖斯·森萨博',img:'',salary:2693760,per:11.6,yearsRemaining:1,pos:'SF',ht:78,wt:235,exp:'2',salary_2026_27:4862237,stats:{g:75,gs:22,mp:23.5,pts:14.9,ast:1.9,trb:3.1,stl:0.7,blk:0.2,tov:1.7,pf:1.9,fg_pct:0.46,fg3_pct:0.367,ft_pct:0.826,orb:0.7,drb:2.3,fg:11.4,fga:2.2,fg3:5.9,fg3a:3.1,ft:2.2,fta:2.7}},
      {id:'uta-kylefili-285',name:'凯尔·菲利波夫斯基',img:'',salary:3000000,per:8.3,yearsRemaining:2,pos:'C',ht:83,wt:250,exp:'1',salary_2026_27:3000000,salary_2027_28:3000000,stats:{g:77,gs:41,mp:23.4,pts:11.4,ast:2.6,trb:7.2,stl:0.9,blk:0.5,tov:1.6,pf:3,fg_pct:1,fg3_pct:0.325,ft_pct:0.75,orb:1.9,drb:5.3,fg:8.5,fga:0.492,fg3:3,fg3a:3.2,ft:2.1,fta:2.8}},
      {id:'uta-isaiahco-286',name:'以赛亚·科利尔',img:'',salary:2638200,per:10.8,yearsRemaining:2,pos:'PG',ht:76,wt:210,exp:'1',salary_2026_27:2763960,salary_2027_28:4988948,stats:{g:59,gs:19,mp:25.7,pts:11.7,ast:7.2,trb:2.5,stl:1.1,blk:0.3,tov:2.5,pf:2.3,fg_pct:0.5,fg3_pct:0.27,ft_pct:0.722,orb:0.4,drb:2.2,fg:8.7,fga:0.495,fg3:1.7,fg3a:3.9,ft:2.6,fta:3.5}},
      {id:'uta-jusufnur-287',name:'Jusuf Nurkić',img:'',salary:19375000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-jordancl-288',name:'Jordan Clarkson',img:'',salary:12947835,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-lonzobal-289',name:'Lonzo Ball',img:'',salary:10000000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-walkerke-290',name:'Walker Kessler',img:'',salary:4878938,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-kevinlov-291',name:'Kevin Love',img:'',salary:4150000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-svimykha-292',name:'Svi Mykhailiuk',img:'',salary:3675000,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3850000,salary_2027_28:4025000},
      {id:'uta-vincewil-293',name:'Vince Williams Jr.',img:'',salary:2301587,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-chrisbou-294',name:'Chris Boucher',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'uta-mobamba-295',name:'Mo Bamba',img:'',salary:458711,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  },

  was: {
    id:'was',
    name:'华盛顿奇才',  
    shortName:'奇才',  
    conference:'east',  
    color:'#002B5C',  
    accent:'#E31837',  
    overTaxLine:0,
    capRoom:-8700678,
    cashUsedThisSeason:0,
    maxCashAllowed:3000000,
    players:[
      {id:'was-anthonyd-287',name:'安东尼-戴维斯',img:'',salary:54126450,per:22,yearsRemaining:2,pos:'PF',ht:82,wt:253,exp:'13',salary_2026_27:58456566,salary_2027_28:62786682},
      {id:'was-traeyoun-288',name:'特雷-杨',img:'',salary:46394100,per:16.1,yearsRemaining:1,pos:'PG',ht:74,wt:164,exp:'7',salary_2026_27:48967380,stats:{g:5,gs:5,mp:20.8,pts:15.2,ast:6.2,trb:3,stl:0.6,blk:0.2,tov:2.6,pf:2.6,fg_pct:0.595,fg3_pct:0.429,ft_pct:0.708,orb:0.8,drb:2.2,fg:8.4,fga:1.8,fg3:4.2,fg3a:3.2,ft:3.4,fta:4.8}},
      {id:'was-alexsarr-289',name:'亚历克斯·萨尔',img:'',salary:11808240,per:10.2,yearsRemaining:2,pos:'C',ht:84,wt:205,exp:'1',salary_2026_27:12370680,salary_2027_28:15611798,stats:{g:48,gs:48,mp:27.2,pts:16.3,ast:2.7,trb:7.4,stl:0.8,blk:2,tov:1.7,pf:2.2,fg_pct:1,fg3_pct:0.333,ft_pct:0.692,orb:2.2,drb:5.2,fg:13.7,fga:0.482,fg3:3.1,fg3a:5.5,ft:2.1,fta:3}},
      {id:'was-bilalcou-290',name:'比拉尔·库利巴利',img:'',salary:7275600,per:9.5,yearsRemaining:1,pos:'SG',ht:79,wt:195,exp:'2',salary_2026_27:9240012,stats:{g:56,gs:56,mp:26.2,pts:11.7,ast:2.6,trb:4.3,stl:1.3,blk:1,tov:1.4,pf:2.3,fg_pct:0.425,fg3_pct:0.319,ft_pct:0.746,orb:0.9,drb:3.5,fg:9.7,fga:1.2,fg3:3.6,fg3a:2.9,ft:2.4,fta:3.2}},
      {id:'was-trejohns-291',name:'特雷-约翰逊',img:'',salary:8237640,per:8.9,yearsRemaining:3,pos:'SG',ht:77,wt:190,exp:'R',salary_2026_27:8649600,salary_2027_28:9061680,salary_2028_29:11490211,stats:{g:60,gs:42,mp:24.1,pts:12.2,ast:2,trb:2.8,stl:0.6,blk:0.3,tov:1.6,pf:2,fg_pct:0.419,fg3_pct:0.358,ft_pct:0.874,orb:0.5,drb:2.4,fg:10.8,fga:1.9,fg3:5.4,fg3a:2.6,ft:1.3,fta:1.5}},
      {id:'was-jadenhar-292',name:'杰登-哈迪',img:'',salary:6000000,per:10.2,yearsRemaining:2,pos:'SG',ht:75,wt:198,exp:'3',salary_2026_27:6000000,salary_2027_28:6000000,stats:{g:23,gs:0,mp:20.4,pts:12.6,ast:1.3,trb:1.7,stl:0.3,blk:0.2,tov:1.5,pf:2.2,fg_pct:0.443,fg3_pct:0.42,ft_pct:0.686,orb:0.2,drb:1.5,fg:10.2,fga:2.5,fg3:6,fg3a:2,ft:1,fta:1.5}},
      {id:'was-dangelor-293',name:'丹吉洛-拉塞尔',img:'',salary:5685000,per:10.3,yearsRemaining:1,pos:'PG',ht:75,wt:193,exp:'10',salary_2026_27:5969250},
      {id:'was-camwhitm-294',name:'卡姆·惠特莫尔',img:'',salary:3539760,per:11.1,yearsRemaining:1,pos:'SF',ht:78,wt:230,exp:'2',salary_2026_27:5458310,stats:{g:21,gs:0,mp:16.9,pts:9.2,ast:0.7,trb:2.8,stl:0.7,blk:0.4,tov:0.9,pf:1.2,fg_pct:0.8,fg3_pct:0.286,ft_pct:0.742,orb:0.9,drb:1.9,fg:8,fga:0.456,fg3:2.7,fg3a:2.9,ft:1.1,fta:1.5}},
      {id:'was-bubcarri-295',name:'卡尔顿·卡林顿',img:'',salary:4677600,per:11.2,yearsRemaining:2,pos:'C',ht:82,wt:250,exp:'2',salary_2026_27:4900560,salary_2027_28:7257730,stats:{g:82,gs:48,mp:27.7,pts:10.7,ast:4.6,trb:3.4,stl:0.6,blk:0.2,tov:2.3,pf:2.2,fg_pct:0.424,fg3_pct:0.408,ft_pct:0.73,orb:0.4,drb:3,fg:9,fga:2.1,fg3:5,fg3a:1.8,ft:1,fta:1.4}},
      {id:'was-willrile-296',name:'威尔-莱利',img:'',salary:3512520,per:10.2,yearsRemaining:3,pos:'SF',ht:81,wt:180,exp:'R',salary_2026_27:3688320,salary_2027_28:3864000,salary_2028_29:6155352,stats:{g:74,gs:18,mp:22.1,pts:10.3,ast:2,trb:2.9,stl:0.7,blk:0.1,tov:1.3,pf:1.2,fg_pct:0.439,fg3_pct:0.316,ft_pct:0.8,orb:0.8,drb:2.1,fg:8.4,fga:1.1,fg3:3.3,fg3a:2.6,ft:1.9,fta:2.4}},
      {id:'was-marcussm-297',name:'Marcus Smart',img:'',salary:19920855,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:5390700},
      {id:'was-blakewes-298',name:'Blake Wesley',img:'',salary:5643732,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-kyshawng-299',name:'Kyshawn George',img:'',salary:2966760,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:3108000,salary_2027_28:5435892},
      {id:'was-dillonjo-300',name:'Dillon Jones',img:'',salary:2753280,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-justinch-301',name:'Justin Champagnie',img:'',salary:2349578,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1',salary_2026_27:2667944,salary_2027_28:3005085},
      {id:'was-danteexu-302',name:'Danté Exum',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-anthonyg-303',name:'Anthony Gill',img:'',salary:2296274,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-alondesw-304',name:'Alondes Williams',img:'',salary:131970,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-skallabi-305',name:'Skal Labissière',img:'',salary:131970,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-kadaryri-306',name:'Kadary Richmond',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'},
      {id:'was-keshongi-307',name:'Keshon Gilbert',img:'',salary:73153,per:10.0,yearsRemaining:1,pos:'NA',ht:78,wt:210,exp:'1'}
    ]
  }

};

var DRAFT_PICKS_DATA = {
  atl: [
    { id:'atl-2026r1-cle', year:2026, round:1, originalTeam:'cle', protection:'none', label:'2026首轮（来自骑士）' },
    { id:'atl-2026r1-nop', year:2026, round:1, originalTeam:'nop', protection:'none', label:'2026首轮（来自鹈鹕）' },
    { id:'atl-2026r2-bos', year:2026, round:2, originalTeam:'bos', protection:'none', label:'2026次轮（来自凯尔特人）' },
    { id:'atl-2027r1-milnop', year:2027, round:1, originalTeam:'mil', protection:'top5', label:'2027首轮（来自雄鹿/鹈鹕，前5保护）' },
    { id:'atl-2027r2-atl', year:2027, round:2, originalTeam:'atl', protection:'none', label:'2027次轮（自有）' },
    { id:'atl-2027r2-cle', year:2027, round:2, originalTeam:'cle', protection:'none', label:'2027次轮（来自骑士）' },
    { id:'atl-2028r1-atl', year:2028, round:1, originalTeam:'atl', protection:'none', label:'2028首轮（自有）' },
    { id:'atl-2029r1-atl', year:2029, round:1, originalTeam:'atl', protection:'none', label:'2029首轮（自有）' },
    { id:'atl-2030r1-atl', year:2030, round:1, originalTeam:'atl', protection:'none', label:'2030首轮（自有）' },
    { id:'atl-2031r1-atl', year:2031, round:1, originalTeam:'atl', protection:'none', label:'2031首轮（自有）' }
  ],
  bkn: [
    { id:'bkn-2026r1-bkn', year:2026, round:1, originalTeam:'bkn', protection:'none', label:'2026首轮（自有）' },
    { id:'bkn-2026r2-bkn', year:2026, round:2, originalTeam:'bkn', protection:'none', label:'2026次轮（自有）' },
    { id:'bkn-2026r2-lac', year:2026, round:2, originalTeam:'lac', protection:'none', label:'2026次轮（来自快船）' },
    { id:'bkn-2027r1-nyk', year:2027, round:1, originalTeam:'nyk', protection:'none', label:'2027首轮（来自尼克斯）' },
    { id:'bkn-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，前8保护）' },
    { id:'bkn-2029r1-nyk', year:2029, round:1, originalTeam:'nyk', protection:'none', label:'2029首轮（来自尼克斯）' },
    { id:'bkn-2029r1-dalhouphx', year:2029, round:1, originalTeam:'phx', protection:'none', label:'2029首轮（来自独行侠/火箭/太阳最差）' },
    { id:'bkn-2031r1-nyk', year:2031, round:1, originalTeam:'nyk', protection:'none', label:'2031首轮（来自尼克斯）' },
    { id:'bkn-2032r1-den', year:2032, round:1, originalTeam:'den', protection:'none', label:'2032首轮（来自掘金）' }
  ],
  bos: [
    { id:'bos-2026r1-bos', year:2026, round:1, originalTeam:'bos', protection:'none', label:'2026首轮（自有）' },
    { id:'bos-2026r2-mil', year:2026, round:2, originalTeam:'mil', protection:'none', label:'2026次轮（来自雄鹿）' },
    { id:'bos-2027r1-bos', year:2027, round:1, originalTeam:'bos', protection:'none', label:'2027首轮（自有）' },
    { id:'bos-2031r1-bos', year:2031, round:1, originalTeam:'bos', protection:'none', label:'2031首轮（自有）' },
    { id:'bos-2033r1-bos', year:2033, round:1, originalTeam:'bos', protection:'none', label:'2033首轮（自有）' }
  ],
  cha: [
    { id:'cha-2026r1-cha', year:2026, round:1, originalTeam:'cha', protection:'none', label:'2026首轮（自有）' },
    { id:'cha-2026r1-orl', year:2026, round:1, originalTeam:'orl', protection:'none', label:'2026首轮（来自魔术）' },
    { id:'cha-2027r1-cha', year:2027, round:1, originalTeam:'cha', protection:'none', label:'2027首轮（自有）' },
    { id:'cha-2027r1-dal', year:2027, round:1, originalTeam:'dal', protection:'top2', label:'2027首轮（来自独行侠，前2保护）' },
    { id:'cha-2027r1-mia', year:2027, round:1, originalTeam:'mia', protection:'top14', label:'2027首轮（来自热火，乐透保护）' },
    { id:'cha-2028r1-cha', year:2028, round:1, originalTeam:'cha', protection:'none', label:'2028首轮（自有）' },
    { id:'cha-2029r1-cha', year:2029, round:1, originalTeam:'cha', protection:'none', label:'2029首轮（自有）' },
    { id:'cha-2030r1-cha', year:2030, round:1, originalTeam:'cha', protection:'none', label:'2030首轮（自有）' },
    { id:'cha-2031r1-cha', year:2031, round:1, originalTeam:'cha', protection:'none', label:'2031首轮（自有）' }
  ],
  chi: [
    { id:'chi-2026r1-chi', year:2026, round:1, originalTeam:'chi', protection:'none', label:'2026首轮（自有）' },
    { id:'chi-2026r1-por', year:2026, round:1, originalTeam:'por', protection:'none', label:'2026首轮（来自开拓者）' },
    { id:'chi-2027r1-chi', year:2027, round:1, originalTeam:'chi', protection:'none', label:'2027首轮（自有）' },
    { id:'chi-2028r1-chi', year:2028, round:1, originalTeam:'chi', protection:'none', label:'2028首轮（自有）' },
    { id:'chi-2029r1-chi', year:2029, round:1, originalTeam:'chi', protection:'none', label:'2029首轮（自有）' },
    { id:'chi-2030r1-chi', year:2030, round:1, originalTeam:'chi', protection:'none', label:'2030首轮（自有）' },
    { id:'chi-2031r1-chi', year:2031, round:1, originalTeam:'chi', protection:'none', label:'2031首轮（自有）' }
  ],
  cle: [
    { id:'cle-2026r1-sas', year:2026, round:1, originalTeam:'sas', protection:'none', label:'2026首轮（来自马刺）' },
    { id:'cle-2031r1-cle', year:2031, round:1, originalTeam:'cle', protection:'none', label:'2031首轮（自有）' },
    { id:'cle-2032r1-cle', year:2032, round:1, originalTeam:'cle', protection:'none', label:'2032首轮（自有）' }
  ],
  dal: [
    { id:'dal-2026r1-dal', year:2026, round:1, originalTeam:'dal', protection:'none', label:'2026首轮（自有）' },
    { id:'dal-2026r1-okc', year:2026, round:1, originalTeam:'okc', protection:'none', label:'2026首轮（来自雷霆）' },
    { id:'dal-2029r1-lal', year:2029, round:1, originalTeam:'lal', protection:'none', label:'2029首轮（来自湖人）' },
    { id:'dal-2030r1-gsw', year:2030, round:1, originalTeam:'gsw', protection:'top20', label:'2030首轮（来自勇士，前20保护）' },
    { id:'dal-2031r1-dal', year:2031, round:1, originalTeam:'dal', protection:'none', label:'2031首轮（自有）' }
  ],
  den: [
    { id:'den-2026r1-den', year:2026, round:1, originalTeam:'den', protection:'none', label:'2026首轮（自有）' },
    { id:'den-2031r1-den', year:2031, round:1, originalTeam:'den', protection:'none', label:'2031首轮（自有）' },
    { id:'den-2033r1-den', year:2033, round:1, originalTeam:'den', protection:'none', label:'2033首轮（自有）' }
  ],
  det: [
    { id:'det-2026r1-min', year:2026, round:1, originalTeam:'min', protection:'none', label:'2026首轮（来自森林狼）' },
    { id:'det-2027r1-det', year:2027, round:1, originalTeam:'det', protection:'none', label:'2027首轮（自有）' },
    { id:'det-2028r1-det', year:2028, round:1, originalTeam:'det', protection:'none', label:'2028首轮（自有）' },
    { id:'det-2029r1-det', year:2029, round:1, originalTeam:'det', protection:'none', label:'2029首轮（自有）' },
    { id:'det-2030r1-det', year:2030, round:1, originalTeam:'det', protection:'none', label:'2030首轮（自有）' },
    { id:'det-2031r1-det', year:2031, round:1, originalTeam:'det', protection:'none', label:'2031首轮（自有）' }
  ],
  gsw: [
    { id:'gsw-2026r1-gsw', year:2026, round:1, originalTeam:'gsw', protection:'none', label:'2026首轮（自有）' },
    { id:'gsw-2027r1-gsw', year:2027, round:1, originalTeam:'gsw', protection:'none', label:'2027首轮（自有）' },
    { id:'gsw-2028r1-gsw', year:2028, round:1, originalTeam:'gsw', protection:'none', label:'2028首轮（自有）' },
    { id:'gsw-2030r1-gsw', year:2030, round:1, originalTeam:'gsw', protection:'top20', label:'2030首轮（自有，前20保护）' },
    { id:'gsw-2032r1-gsw', year:2032, round:1, originalTeam:'gsw', protection:'none', label:'2032首轮（自有）' }
  ],
  hou: [
    { id:'hou-2027r1-bkn', year:2027, round:1, originalTeam:'bkn', protection:'none', label:'2027首轮（来自篮网/自有更好）' },
    { id:'hou-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'none', label:'2027首轮（来自太阳）' },
    { id:'hou-2028r1-hou', year:2028, round:1, originalTeam:'hou', protection:'none', label:'2028首轮（自有）' },
    { id:'hou-2029r1-phx', year:2029, round:1, originalTeam:'phx', protection:'none', label:'2029首轮（来自独行侠/火箭/太阳最好）' },
    { id:'hou-2029r1-dalhouphx', year:2029, round:1, originalTeam:'dal', protection:'none', label:'2029首轮（来自独行侠/火箭/太阳第二好）' },
    { id:'hou-2030r1-hou', year:2030, round:1, originalTeam:'hou', protection:'none', label:'2030首轮（自有）' },
    { id:'hou-2031r1-hou', year:2031, round:1, originalTeam:'hou', protection:'none', label:'2031首轮（自有）' }
  ],
  ind: [
    { id:'ind-2027r1-ind', year:2027, round:1, originalTeam:'ind', protection:'none', label:'2027首轮（自有）' },
    { id:'ind-2031r1-ind', year:2031, round:1, originalTeam:'ind', protection:'none', label:'2031首轮（自有）' },
    { id:'ind-2032r1-ind', year:2032, round:1, originalTeam:'ind', protection:'none', label:'2032首轮（自有）' }
  ],
  lac: [
    { id:'lac-2026r1-ind', year:2026, round:1, originalTeam:'ind', protection:'none', label:'2026首轮（来自步行者）' },
    { id:'lac-2029r1-ind', year:2029, round:1, originalTeam:'ind', protection:'none', label:'2029首轮（来自步行者）' },
    { id:'lac-2030r1-lac', year:2030, round:1, originalTeam:'lac', protection:'none', label:'2030首轮（自有）' },
    { id:'lac-2031r1-lac', year:2031, round:1, originalTeam:'lac', protection:'none', label:'2031首轮（自有）' },
    { id:'lac-2032r1-lac', year:2032, round:1, originalTeam:'lac', protection:'none', label:'2032首轮（自有）' }
  ],
  lal: [
    { id:'lal-2026r1-lal', year:2026, round:1, originalTeam:'lal', protection:'none', label:'2026首轮（自有）' },
    { id:'lal-2027r1-lal', year:2027, round:1, originalTeam:'lal', protection:'top4', label:'2027首轮（自有，前4保护）' },
    { id:'lal-2031r1-lal', year:2031, round:1, originalTeam:'lal', protection:'none', label:'2031首轮（自有）' },
    { id:'lal-2032r1-lal', year:2032, round:1, originalTeam:'lal', protection:'none', label:'2032首轮（自有）' }
  ],
  mem: [
    { id:'mem-2026r1-mem', year:2026, round:1, originalTeam:'mem', protection:'none', label:'2026首轮（自有）' },
    { id:'mem-2026r1-phx', year:2026, round:1, originalTeam:'phx', protection:'none', label:'2026首轮（来自太阳）' },
    { id:'mem-2027r1-mem', year:2027, round:1, originalTeam:'mem', protection:'none', label:'2027首轮（自有）' },
    { id:'mem-2027r1-cleminuta', year:2027, round:1, originalTeam:'cle', protection:'none', label:'2027首轮（来自骑士/森林狼/爵士最好）' },
    { id:'mem-2027r1-lal', year:2027, round:1, originalTeam:'lal', protection:'top4', label:'2027首轮（来自湖人，前4保护）' },
    { id:'mem-2028r1-mem', year:2028, round:1, originalTeam:'mem', protection:'none', label:'2028首轮（自有）' },
    { id:'mem-2029r1-mem', year:2029, round:1, originalTeam:'mem', protection:'none', label:'2029首轮（自有）' },
    { id:'mem-2030r1-orl', year:2030, round:1, originalTeam:'orl', protection:'none', label:'2030首轮（来自魔术）' },
    { id:'mem-2031r1-phx', year:2031, round:1, originalTeam:'phx', protection:'none', label:'2031首轮（来自太阳）' },
    { id:'mem-2031r1-mem', year:2031, round:1, originalTeam:'mem', protection:'none', label:'2031首轮（自有）' }
  ],
  mia: [
    { id:'mia-2027r1-mia', year:2027, round:1, originalTeam:'mia', protection:'none', label:'2027首轮（自有）' },
    { id:'mia-2028r1-mia', year:2028, round:1, originalTeam:'mia', protection:'none', label:'2028首轮（自有）' },
    { id:'mia-2029r1-mia', year:2029, round:1, originalTeam:'mia', protection:'none', label:'2029首轮（自有）' },
    { id:'mia-2030r1-mia', year:2030, round:1, originalTeam:'mia', protection:'none', label:'2030首轮（自有）' },
    { id:'mia-2031r1-mia', year:2031, round:1, originalTeam:'mia', protection:'none', label:'2031首轮（自有）' }
  ],
  mil: [
    { id:'mil-2026r1-mil', year:2026, round:1, originalTeam:'mil', protection:'none', label:'2026首轮（自有）' },
    { id:'mil-2027r1-mil', year:2027, round:1, originalTeam:'mil', protection:'none', label:'2027首轮（自有）' },
    { id:'mil-2028r1-mil', year:2028, round:1, originalTeam:'mil', protection:'none', label:'2028首轮（自有）' },
    { id:'mil-2031r1-mil', year:2031, round:1, originalTeam:'mil', protection:'none', label:'2031首轮（自有）' }
  ],
  min: [
    { id:'min-2027r1-min', year:2027, round:1, originalTeam:'min', protection:'none', label:'2027首轮（自有）' },
    { id:'min-2028r1-min', year:2028, round:1, originalTeam:'min', protection:'none', label:'2028首轮（自有）' },
    { id:'min-2029r1-min', year:2029, round:1, originalTeam:'min', protection:'none', label:'2029首轮（自有）' },
    { id:'min-2030r1-min', year:2030, round:1, originalTeam:'min', protection:'none', label:'2030首轮（自有）' },
    { id:'min-2031r1-min', year:2031, round:1, originalTeam:'min', protection:'none', label:'2031首轮（自有）' }
  ],
  nop: [
    { id:'nop-2027r1-nop', year:2027, round:1, originalTeam:'nop', protection:'none', label:'2027首轮（自有）' },
    { id:'nop-2028r1-nop', year:2028, round:1, originalTeam:'nop', protection:'none', label:'2028首轮（自有）' },
    { id:'nop-2029r1-nop', year:2029, round:1, originalTeam:'nop', protection:'none', label:'2029首轮（自有）' },
    { id:'nop-2030r1-nop', year:2030, round:1, originalTeam:'nop', protection:'none', label:'2030首轮（自有）' },
    { id:'nop-2031r1-nop', year:2031, round:1, originalTeam:'nop', protection:'none', label:'2031首轮（自有）' }
  ],
  nyk: [
    { id:'nyk-2026r1-nyk', year:2026, round:1, originalTeam:'nyk', protection:'none', label:'2026首轮（自有）' },
    { id:'nyk-2027r1-nyk', year:2027, round:1, originalTeam:'nyk', protection:'none', label:'2027首轮（自有）' },
    { id:'nyk-2028r1-nyk', year:2028, round:1, originalTeam:'nyk', protection:'none', label:'2028首轮（自有）' },
    { id:'nyk-2030r1-nyk', year:2030, round:1, originalTeam:'nyk', protection:'none', label:'2030首轮（自有）' },
    { id:'nyk-2031r1-nyk', year:2031, round:1, originalTeam:'nyk', protection:'none', label:'2031首轮（自有）' }
  ],
  okc: [
    { id:'okc-2026r1-okc', year:2026, round:1, originalTeam:'okc', protection:'none', label:'2026首轮（自有）' },
    { id:'okc-2026r1-lac', year:2026, round:1, originalTeam:'lac', protection:'none', label:'2026首轮（来自快船）' },
    { id:'okc-2026r1-hou', year:2026, round:1, originalTeam:'hou', protection:'top4', label:'2026首轮（来自火箭，前4保护）' },
    { id:'okc-2027r1-okc', year:2027, round:1, originalTeam:'okc', protection:'none', label:'2027首轮（自有）' },
    { id:'okc-2027r1-den', year:2027, round:1, originalTeam:'den', protection:'top5', label:'2027首轮（来自掘金，前5保护）' },
    { id:'okc-2027r1-phi', year:2027, round:1, originalTeam:'phi', protection:'top4', label:'2027首轮（来自76人，前4保护）' },
    { id:'okc-2028r1-okc', year:2028, round:1, originalTeam:'okc', protection:'none', label:'2028首轮（自有）' },
    { id:'okc-2028r1-den', year:2028, round:1, originalTeam:'den', protection:'top5', label:'2028首轮（来自掘金，前5保护）' },
    { id:'okc-2029r1-okc', year:2029, round:1, originalTeam:'okc', protection:'none', label:'2029首轮（自有）' },
    { id:'okc-2030r1-okc', year:2030, round:1, originalTeam:'okc', protection:'none', label:'2030首轮（自有）' },
    { id:'okc-2031r1-okc', year:2031, round:1, originalTeam:'okc', protection:'none', label:'2031首轮（自有）' }
  ],
  orl: [
    { id:'orl-2027r1-orl', year:2027, round:1, originalTeam:'orl', protection:'none', label:'2027首轮（自有）' },
    { id:'orl-2028r1-orl', year:2028, round:1, originalTeam:'orl', protection:'none', label:'2028首轮（自有）' },
    { id:'orl-2029r1-orl', year:2029, round:1, originalTeam:'orl', protection:'none', label:'2029首轮（自有）' },
    { id:'orl-2030r1-orl', year:2030, round:1, originalTeam:'orl', protection:'none', label:'2030首轮（自有）' },
    { id:'orl-2031r1-orl', year:2031, round:1, originalTeam:'orl', protection:'none', label:'2031首轮（自有）' }
  ],
  phi: [
    { id:'phi-2026r1-phi', year:2026, round:1, originalTeam:'phi', protection:'none', label:'2026首轮（自有）' },
    { id:'phi-2027r1-phi', year:2027, round:1, originalTeam:'phi', protection:'none', label:'2027首轮（自有）' },
    { id:'phi-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'none', label:'2028首轮（自有）' },
    { id:'phi-2029r1-phi', year:2029, round:1, originalTeam:'phi', protection:'none', label:'2029首轮（自有）' },
    { id:'phi-2030r1-phi', year:2030, round:1, originalTeam:'phi', protection:'none', label:'2030首轮（自有）' },
    { id:'phi-2031r1-phi', year:2031, round:1, originalTeam:'phi', protection:'none', label:'2031首轮（自有）' }
  ],
  phx: [
    { id:'phx-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'none', label:'2027首轮（自有）' },
    { id:'phx-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'none', label:'2028首轮（自有）' },
    { id:'phx-2029r1-phx', year:2029, round:1, originalTeam:'phx', protection:'none', label:'2029首轮（自有）' },
    { id:'phx-2030r1-phx', year:2030, round:1, originalTeam:'phx', protection:'none', label:'2030首轮（自有）' },
    { id:'phx-2031r1-phx', year:2031, round:1, originalTeam:'phx', protection:'none', label:'2031首轮（自有）' }
  ],
  por: [
    { id:'por-2026r1-por', year:2026, round:1, originalTeam:'por', protection:'none', label:'2026首轮（自有）' },
    { id:'por-2027r1-por', year:2027, round:1, originalTeam:'por', protection:'none', label:'2027首轮（自有）' },
    { id:'por-2028r1-por', year:2028, round:1, originalTeam:'por', protection:'none', label:'2028首轮（自有）' },
    { id:'por-2029r1-por', year:2029, round:1, originalTeam:'por', protection:'none', label:'2029首轮（自有）' },
    { id:'por-2030r1-por', year:2030, round:1, originalTeam:'por', protection:'none', label:'2030首轮（自有）' },
    { id:'por-2031r1-por', year:2031, round:1, originalTeam:'por', protection:'none', label:'2031首轮（自有）' }
  ],
  sac: [
    { id:'sac-2026r1-sac', year:2026, round:1, originalTeam:'sac', protection:'none', label:'2026首轮（自有）' },
    { id:'sac-2027r1-sac', year:2027, round:1, originalTeam:'sac', protection:'none', label:'2027首轮（自有）' },
    { id:'sac-2028r1-sac', year:2028, round:1, originalTeam:'sac', protection:'none', label:'2028首轮（自有）' },
    { id:'sac-2029r1-sac', year:2029, round:1, originalTeam:'sac', protection:'none', label:'2029首轮（自有）' },
    { id:'sac-2030r1-sac', year:2030, round:1, originalTeam:'sac', protection:'none', label:'2030首轮（自有）' },
    { id:'sac-2031r1-sac', year:2031, round:1, originalTeam:'sac', protection:'none', label:'2031首轮（自有）' }
  ],
  sas: [
    { id:'sas-2026r1-sas', year:2026, round:1, originalTeam:'sas', protection:'none', label:'2026首轮（自有）' },
    { id:'sas-2027r1-sas', year:2027, round:1, originalTeam:'sas', protection:'none', label:'2027首轮（自有）' },
    { id:'sas-2027r1-atl', year:2027, round:1, originalTeam:'atl', protection:'none', label:'2027首轮（来自老鹰）' },
    { id:'sas-2028r1-sas', year:2028, round:1, originalTeam:'sas', protection:'none', label:'2028首轮（自有）' },
    { id:'sas-2029r1-sas', year:2029, round:1, originalTeam:'sas', protection:'none', label:'2029首轮（自有）' },
    { id:'sas-2030r1-sas', year:2030, round:1, originalTeam:'sas', protection:'none', label:'2030首轮（自有）' },
    { id:'sas-2031r1-min', year:2031, round:1, originalTeam:'min', protection:'none', label:'2031首轮（来自森林狼）' },
    { id:'sas-2031r1-sas', year:2031, round:1, originalTeam:'sas', protection:'none', label:'2031首轮（自有）' }
  ],
  tor: [
    { id:'tor-2026r1-tor', year:2026, round:1, originalTeam:'tor', protection:'none', label:'2026首轮（自有）' },
    { id:'tor-2027r1-tor', year:2027, round:1, originalTeam:'tor', protection:'none', label:'2027首轮（自有）' },
    { id:'tor-2028r1-tor', year:2028, round:1, originalTeam:'tor', protection:'none', label:'2028首轮（自有）' },
    { id:'tor-2029r1-tor', year:2029, round:1, originalTeam:'tor', protection:'none', label:'2029首轮（自有）' },
    { id:'tor-2030r1-tor', year:2030, round:1, originalTeam:'tor', protection:'none', label:'2030首轮（自有）' },
    { id:'tor-2031r1-tor', year:2031, round:1, originalTeam:'tor', protection:'none', label:'2031首轮（自有）' }
  ],
  uta: [
    { id:'uta-2027r1-uta', year:2027, round:1, originalTeam:'uta', protection:'none', label:'2027首轮（自有）' },
    { id:'uta-2027r1-clemin', year:2027, round:1, originalTeam:'cle', protection:'none', label:'2027首轮（来自骑士/森林狼/爵士第二好）' },
    { id:'uta-2028r1-uta', year:2028, round:1, originalTeam:'uta', protection:'none', label:'2028首轮（自有）' },
    { id:'uta-2029r1-uta', year:2029, round:1, originalTeam:'uta', protection:'none', label:'2029首轮（自有）' },
    { id:'uta-2030r1-uta', year:2030, round:1, originalTeam:'uta', protection:'none', label:'2030首轮（自有）' },
    { id:'uta-2031r1-uta', year:2031, round:1, originalTeam:'uta', protection:'none', label:'2031首轮（自有）' },
    { id:'uta-2031r1-phx', year:2031, round:1, originalTeam:'phx', protection:'none', label:'2031首轮（来自太阳）' }
  ],
  was: [
    { id:'was-2026r1-was', year:2026, round:1, originalTeam:'was', protection:'none', label:'2026首轮（自有）' },
    { id:'was-2027r1-was', year:2027, round:1, originalTeam:'was', protection:'none', label:'2027首轮（自有）' },
    { id:'was-2028r1-was', year:2028, round:1, originalTeam:'was', protection:'none', label:'2028首轮（自有）' },
    { id:'was-2029r1-was', year:2029, round:1, originalTeam:'was', protection:'none', label:'2029首轮（自有）' },
    { id:'was-2030r1-was', year:2030, round:1, originalTeam:'was', protection:'none', label:'2030首轮（自有）' },
    { id:'was-2031r1-was', year:2031, round:1, originalTeam:'was', protection:'none', label:'2031首轮（自有）' }
  ]
};

var TEAM_LIST = Object.values(TEAMS_DATA);

var CONFERENCE_LABELS = { west: '西部联盟', east: '东部联盟' };

var RATINGS_NAME_MAP = {
  "Bones Hyland": "Nah'Shon Hyland",
  "Bub Carrington": "Carlton Carrington",
  "AJ Johnson": "A.J. Johnson",
  "GG Jackson": "G.G. Jackson",
  "DJ Carton": "D.J. Carton",
  "PJ Washington": "P.J. Washington",
  "TJ McConnell": "T.J. McConnell",
  "OG Anunoby": "O.G. Anunoby",
  "JD Davison": "J.D. Davison",
  "JK Dobbins": "J.K. Dobbins",
  "JJ Redick": "J.J. Redick",
  "CJ McCollum": "C.J. McCollum",
  "MJ Walker": "M.J. Walker",
  "RP Kao": "R.P. Kao",
  "Cam Thomas": "Cameron Thomas",
  "Cam Johnson": "Cameron Johnson",
  "Cam Spencer": "Cameron Spencer",
  "Nic Claxton": "Nicolas Claxton",
  "Nickeil Alexander-Walker": "Nickeil Alexander-Walker",
  "Mike Conley": "Mike Conley",
  "Mike Porter Jr": "Michael Porter Jr",
  "Michael Porter Jr.": "Michael Porter Jr",
  "Jeff Green": "Jeff Green",
  "Yang Hansen": "Hansen Yang"
};

function normalizeName(name) {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[''ʼ]/g, "'")
    .replace(/\s+(Jr|Sr|II|III|IV|V)\.?$/i, '')
    .replace(/\./g, '')
    .toLowerCase()
    .trim();
}

window.ratingsReady = new Promise(function(resolve) {
  Promise.all([
    fetch('data/output/2k26_ratings.json').then(function(r) { return r.json(); }),
    fetch('data/output/contracts.json').then(function(r) { return r.json(); })
  ])
    .then(function(results) {
      var ratingsData = results[0];
      var contractsData = results[1];

      var ratingLookup = {};
      ratingsData.players.forEach(function(p) {
        var key = normalizeName(p.name);
        ratingLookup[key] = p['2k_rating'];
        var mapped = RATINGS_NAME_MAP[p.name];
        if (mapped) {
          ratingLookup[normalizeName(mapped)] = p['2k_rating'];
        }
      });

      var teamContracts = {};
      var cnRatingLookup = {};
      contractsData.players.forEach(function(p) {
        var abbr = p.team;
        if (!teamContracts[abbr]) teamContracts[abbr] = [];
        var salary = 0;
        if (p.yearly_salary) {
          for (var si = 0; si < p.yearly_salary.length; si++) {
            if (p.yearly_salary[si].season && p.yearly_salary[si].season.indexOf('2025') === 0) {
              salary = p.yearly_salary[si].salary;
              break;
            }
          }
          if (!salary && p.yearly_salary[0]) {
            salary = p.yearly_salary[0].salary;
          }
        }
        var rKey = normalizeName(p.name);
        var rating = ratingLookup[rKey] !== undefined ? ratingLookup[rKey] : null;
        teamContracts[abbr].push({ name: p.name, salary: salary, rating: rating });
        if (rating !== null && p.name_cn) {
          cnRatingLookup[p.name_cn] = rating;
        }
      });

      var matched = 0, estimated = 0, unmatched = 0;
      TEAM_LIST.forEach(function(team) {
        var abbr = String(team.id).toUpperCase();
        var contracts = teamContracts[abbr] || [];
        var used = {};
        team.players.forEach(function(p) {
          if (cnRatingLookup[p.name] !== undefined) {
            p['2k_rating'] = cnRatingLookup[p.name];
            matched++;
            return;
          }
          var bestIdx = -1, bestDiff = Infinity;
          for (var i = 0; i < contracts.length; i++) {
            if (used[i]) continue;
            var diff = Math.abs(contracts[i].salary - p.salary);
            if (diff < bestDiff) {
              bestDiff = diff;
              bestIdx = i;
            }
          }
          var threshold = Math.max(p.salary * 0.15, 1500000);
          if (bestIdx >= 0 && bestDiff <= threshold && contracts[bestIdx].rating !== null) {
            p['2k_rating'] = contracts[bestIdx].rating;
            used[bestIdx] = true;
            matched++;
          } else if (p.per) {
            p['2k_rating'] = Math.round(50 + p.per * 2);
            estimated++;
          } else {
            p['2k_rating'] = null;
            unmatched++;
          }
        });
      });
      console.log('[Ratings] merged: ' + matched + ' matched, ' + estimated + ' estimated from PER, ' + unmatched + ' unmatched');
      resolve({ matched: matched, unmatched: unmatched });
    })
    .catch(function(err) {
      console.warn('[Ratings] load failed, using per as fallback:', err);
      TEAM_LIST.forEach(function(team) {
        team.players.forEach(function(p) {
          p['2k_rating'] = p.per || null;
        });
      });
      resolve({ matched: 0, unmatched: 0, fallback: true });
    });
});