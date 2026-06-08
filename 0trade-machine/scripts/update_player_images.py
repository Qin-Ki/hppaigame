"""Match player image URLs from user input and update data.js"""
import re
import json

# ======== USER DATA ========
# Extracted from the user's message - team label -> (name, url) pairs
# Format: {team_label: [(name_in_user_text, url), ...]}

raw_text = """王：湖人：https://i11.hoopchina.com.cn/editor/76b11c4fe7568c6e624bfd7bdc87d117_w_1040_h_760_.png 东契奇https://i1.hoopchina.com.cn/newsPost/ed8ffcdbfd3fbf7eddceab1e074c460a_w_1040_h_760_.png 詹姆斯https://i10.hoopchina.com.cn/editor/fe3fa05e681546adb4bf9b7867ecdb95_w_1040_h_760_.png 里夫斯https://i5.hoopchina.com.cn/editor/daac407a8e3507694126462676dcbe78_w_1040_h_760_.png 八村垒https://i1.hoopchina.com.cn/editor/8cab42afc074491cd9b545fa6b08e673_w_1040_h_760_.png 艾顿https://i11.hoopchina.com.cn/editor/52711eeab38779bd8d3494de428e3938_w_1040_h_760_.png 斯马特https://i5.hoopchina.com.cn/editor/5e9ab4c6f9ccb79429b6fb8ba8f29c21_w_1040_h_760_.png 肯纳德https://i10.hoopchina.com.cn/editor/f604a7de8231dfe3400332747d5cea5d_w_1040_h_760_.png 海斯https://i3.hoopchina.com.cn/editor/d5ea6895b65a48ac49c5c12f703905b9_w_1040_h_760_.png 范德比尔特https://i5.hoopchina.com.cn/editor/75f6be2828691b1b2c5f8f81fa7a159d_w_1040_h_760_.png 拉拉维亚https://i10.hoopchina.com.cn/editor/932a7dcf6c74d968ad4085025dfdeb63_w_1040_h_760_.png 布朗尼https://i3.hoopchina.com.cn/editor/75df946b9148d2a8422908f75a0ffaf4_w_1040_h_760_.png 克内克特https://i11.hoopchina.com.cn/editor/0fd776701387717095e517b7c9eebda8_w_1040_h_760_.png 克勒贝尔
雷霆：https://i5.hoopchina.com.cn/editor/a1a04f8498b86a7d565659fcbf872047_w_1040_h_760_.png 亚历山大https://i1.hoopchina.com.cn/editor/5a79e49b9d5dcada136c847d73d1a00d_w_1040_h_760_.png 霍姆格伦https://i11.hoopchina.com.cn/editor/e1ca4b187297395359fec8c17e683ff1_w_1040_h_760_.png 杰伦-威廉姆斯https://i5.hoopchina.com.cn/editor/83f17515c18c7e1be73e8fa0ddc74890_w_1040_h_760_.png 阿杰伊-米切尔https://i3.hoopchina.com.cn/editor/8c7f62c1876db85ec8f01b63b0ef7740_w_1040_h_760_.png 多尔特https://i10.hoopchina.com.cn/editor/deefaf1a0ce81542b38d71a6260bd010_w_1040_h_760_.png 哈尔滕施泰因https://i5.hoopchina.com.cn/editor/9ac3d032378e3cc8933c6fb4c5704992_w_1040_h_760_.png 卡鲁索https://i3.hoopchina.com.cn/editor/52af677dc84320b9d0cfd9f2bf1734c8_w_1040_h_760_.png 麦凯恩https://i1.hoopchina.com.cn/editor/d2d9902db3d5a6f383319c13017ff273_w_1040_h_760_.png 杰林-威廉姆斯https://i1.hoopchina.com.cn/editor/4c466f953832ab59f7f67fd9785b8abc_w_1040_h_760_.png 卡森-华莱士https://i3.hoopchina.com.cn/editor/46fbe3781a2b3ef92a7603f0b4b247bd_w_1040_h_760_.png 以赛亚-乔https://i11.hoopchina.com.cn/editor/e50a1d1824c3021d2274cd957936433d_w_1040_h_760_.png 阿龙-威金斯https://i10.hoopchina.com.cn/editor/aa7863ce537d87d74b461f1b010de044_w_1040_h_760_.png 戴格诺特（主教练）
尼克斯：https://i1.hoopchina.com.cn/editor/850f1b9e11b663fcc919b5c763039dd0_w_1040_h_760_.png 布伦森https://i3.hoopchina.com.cn/editor/44598b0d5621efe6ee08868744722906_w_1040_h_760_.png 唐斯https://i10.hoopchina.com.cn/editor/fe850d543b256761e8d8ff17cb07ed83_w_1040_h_760_.png 阿奴诺比https://i11.hoopchina.com.cn/editor/fd63c9f8c9ecaf73d159dd03e9e51219_w_1040_h_760_.png 布里奇斯https://i11.hoopchina.com.cn/editor/cfb2c2ccbf9dc4f68324d0a97bc6fbc7_w_1040_h_760_.png 哈特https://i11.hoopchina.com.cn/editor/b5a55800cc872516e97dd85e434155ad_w_1040_h_760_.png 麦克布莱德https://i3.hoopchina.com.cn/editor/33a6209fefcfa5c269a116c7bba7947d_w_1040_h_760_.png 米切尔-罗宾逊https://i11.hoopchina.com.cn/editor/5c63cf935270439e64fca0fe2919a85e_w_1040_h_760_.png 沙梅特https://i11.hoopchina.com.cn/editor/6ac1e4f50d4ec1e6152bff89f03c030d_w_1040_h_760_.png 克拉克森https://i10.hoopchina.com.cn/editor/a9620f3682b3e59c31a187bf59e92944_w_1040_h_760_.png 阿尔瓦拉多https://i11.hoopchina.com.cn/editor/931678b3d0455e5876f0e1fc6ad8e0bb_w_1040_h_760_.png 胡克波尔蒂https://i1.hoopchina.com.cn/editor/2094af3f7d99216e072c8cfc3212fc8f_w_1040_h_760_.png 布朗（主教练）
76人：https://i10.hoopchina.com.cn/editor/491f2fd75960bdf23ff0e08c705fdc90_w_1040_h_760_.png 马克西https://i10.hoopchina.com.cn/editor/c106a38bdee12a4c49130dde8c4107e4_w_1040_h_760_.png 恩比德https://i5.hoopchina.com.cn/editor/6cee910a137d63768d04743a603de7e1_w_1040_h_760_.png 乔治https://i11.hoopchina.com.cn/editor/f4ac01de2ad4007c5c807015aa9af5d7_w_1040_h_760_.png VJ-埃奇库姆https://i5.hoopchina.com.cn/editor/3109a74aed1387e3e9441dae2b9d6611_w_1040_h_760_.png 格兰姆斯https://i11.hoopchina.com.cn/editor/86b0d593b6e497d9b32a581787fd0228_w_1040_h_760_.png 乌布雷https://i3.hoopchina.com.cn/editor/6d9ee60aa5f46e25a7142b34738dc588_w_1040_h_760_.png 德拉蒙德https://i11.hoopchina.com.cn/editor/de710facf9af12a0c354b207dc7b8904_w_1040_h_760_.png 博纳https://i10.hoopchina.com.cn/editor/2d9aa95e7b67ded5f9679848ee65d95f_w_1040_h_760_.png 爱德华兹https://i11.hoopchina.com.cn/editor/84a738230bed0401bd1d9933890d000b_w_1040_h_760_.png 巴洛https://i10.hoopchina.com.cn/editor/5f8461788e1be2d8df295fbfc2e5eeaa_w_1040_h_760_.png 沃特福德https://i3.hoopchina.com.cn/editor/de889cd9ec567992aef9404cb663d119_w_1040_h_760_.png 洛瑞
活塞：https://i5.hoopchina.com.cn/editor/4492d50176be71553ee16d4c3e14ef65_w_1040_h_760_.png 坎宁安https://i3.hoopchina.com.cn/editor/2aba7267eeac2a63286a06d5eb897a49_w_1040_h_760_.png 杜伦https://i3.hoopchina.com.cn/editor/7a8b7fd1044db0b7fa5bed3ee39585e6_w_1040_h_760_.png 奥萨尔-汤普森https://i5.hoopchina.com.cn/editor/3fe771e14e91b1c0b80475feda4270d6_w_1040_h_760_.png 哈里斯https://i10.hoopchina.com.cn/editor/ae06db64e5bc9d811607c70135fc2a5c_w_1040_h_760_.png 邓肯-罗宾逊https://i3.hoopchina.com.cn/editor/fec6e749e96710cc722435904303dbb1_w_1040_h_760_.png 詹金斯https://i1.hoopchina.com.cn/editor/5adcf4760e90eb79e8eaeab3171ecd38_w_1040_h_760_.png 勒韦尔https://i10.hoopchina.com.cn/editor/95be9062eb500bc99b94db0355769582_w_1040_h_760_.png 斯图尔特https://i1.hoopchina.com.cn/editor/f508990ae1c391f132e6fb052d4cbd4a_w_1040_h_760_.png 保罗-里德https://i3.hoopchina.com.cn/editor/bece7b02e72f20f79d9d451165fec0e2_w_1040_h_760_.png 贾文特-格林https://i1.hoopchina.com.cn/editor/c299a0ede470cc684bd9b9c14c964b73_w_1040_h_760_.png 霍兰德https://i10.hoopchina.com.cn/editor/f3cb7a772a0e6478e8b384c8dc5ccae2_w_1040_h_760_.png 赫尔特https://i3.hoopchina.com.cn/newsPost/94a5cc1c0709508cac3d224a750735b8_w_1932_h_1468_.png 比克斯塔夫（主教练）
骑士：https://i3.hoopchina.com.cn/editor/25e33208569d1a6f9f68f7ef2dceb497_w_1040_h_760_.png 米切尔https://i5.hoopchina.com.cn/newsPost/6e0fe3db7d0cd238195b525de2afae58_w_1040_h_760_.png 哈登https://i3.hoopchina.com.cn/editor/96cb6e328b1ab5fdcd783e18651ae682_w_1040_h_760_.png 莫布利https://i10.hoopchina.com.cn/editor/71ef6d776096a6564adbd7b3e1023b1a_w_1040_h_760_.png 贾勒特-阿伦https://i11.hoopchina.com.cn/editor/4bcb604e4036baabe04a4085a26a44b1_w_1040_h_760_.png 斯特鲁斯https://i1.hoopchina.com.cn/editor/daa8baf34251fd1a18fc13bcaef3280f_w_1040_h_760_.png 迪恩-韦德https://i11.hoopchina.com.cn/editor/60e4952b0fd349788cbdaaf50e7d1c08_w_1040_h_760_.png 施罗德https://i5.hoopchina.com.cn/editor/78a7df92a65301ad90f8892eb44cdbd7_w_1040_h_760_.png 梅里尔https://i10.hoopchina.com.cn/editor/0e2602f14544d8920439bbed53d3e9cc_w_1040_h_760_.png 杰隆-泰森https://i1.hoopchina.com.cn/editor/832c5dae04ad9d90d25c3643f645866e_w_1040_h_760_.png 埃利斯https://i3.hoopchina.com.cn/editor/c85f9110e1a536c185be3e964b50a85f_w_1040_h_760_.png 托马斯-布莱恩特https://i11.hoopchina.com.cn/editor/a833c540b971345476f9eb6ab17e2fb6_w_1040_h_760_.png 阿特金森（主教练）
马刺：https://i5.hoopchina.com.cn/editor/355a40d5555305ab7e1a0aaf0583961e_w_1040_h_760_.png 文班亚马https://i10.hoopchina.com.cn/editor/661e8730cc5a1beea210d25eb71380f3_w_1040_h_760_.png 福克斯https://i1.hoopchina.com.cn/editor/7f419a4d7849b37f8eb8b7eb3c653906_w_1040_h_760_.png 卡斯尔https://i3.hoopchina.com.cn/editor/721fc439b7e0a43bf83828e329050e11_w_1040_h_760_.png 迪伦-哈珀https://i1.hoopchina.com.cn/editor/114c69dd19f6e253559beb25240b1c8f_w_1040_h_760_.png 瓦塞尔https://i1.hoopchina.com.cn/editor/5564c76d7da1614ccf593b6a58845b72_w_1040_h_760_.png 凯尔登-约翰逊https://i10.hoopchina.com.cn/editor/e30bab97922440bbe3326b11f291a603_w_1040_h_760_.png 尚帕尼https://i10.hoopchina.com.cn/editor/03ea010ecab9967b3473df0e6b7440fd_w_1040_h_760_.png 科内特https://i1.hoopchina.com.cn/editor/1281e5e0e2164e8824747bfcfedbf368_w_1040_h_760_.png 卡特-布莱恩特https://i5.hoopchina.com.cn/editor/b74a812dc230fc8d9f5a87d05b86b69e_w_1040_h_760_.png 哈里森-巴恩斯https://i1.hoopchina.com.cn/editor/60ceff61e8f3b4dbd562b30155af5e15_w_1040_h_760_.png 奥利尼克https://i3.hoopchina.com.cn/editor/068bbf2b3c122e8c81dd16b39d187acc_w_1040_h_760_.png 普拉姆利https://i3.hoopchina.com.cn/newsPost/3775554e9947d94311c66735f8e062a5_w_982_h_704_.png 米奇（主教练）
森林狼：https://i3.hoopchina.com.cn/editor/fe2f50e37db5859d03c8c8764c215578_w_1040_h_760_.png 爱德华兹https://i11.hoopchina.com.cn/editor/d611438569d0030b676aeccf56ccf0ae_w_1040_h_760_.png 兰德尔https://i11.hoopchina.com.cn/editor/e1e7e1461b62e2cd4c272d5259449893_w_1040_h_760_.png 麦克丹尼尔斯https://i1.hoopchina.com.cn/editor/a7020bc2708774efb428d81faa446720_w_1040_h_760_.png 戈贝尔https://i1.hoopchina.com.cn/editor/b058c669acd76117cbf673a8f47e0963_w_1040_h_760_.png 里德https://i11.hoopchina.com.cn/editor/ff6ae0bd2f70e3b37d0661d152df853a_w_1040_h_760_.png 小香农https://i11.hoopchina.com.cn/editor/9a7b5b145966b85ce73f544fe5fef4e3_w_1040_h_760_.png 多森姆https://i10.hoopchina.com.cn/editor/126b4683c0b04c81983633f5986a5d0d_w_1040_h_760_.png 康利https://i11.hoopchina.com.cn/editor/9d8767615b539145de1a3c164c6094be_w_1040_h_760_.png 李凯尔https://i11.hoopchina.com.cn/editor/ae6198a5415899cd81989770e4504ffd_w_1040_h_760_.png 迪温琴佐https://i5.hoopchina.com.cn/editor/9c102b28038c16b80cf6bd62b25d98ec_w_1040_h_760_.png 海兰德https://i3.hoopchina.com.cn/editor/6b90f505f6899aa38a8306db461f378d_w_1040_h_760_.png 英格尔斯https://i5.hoopchina.com.cn/editor/00744c53a29a7eefb1b9418053caf911_w_1040_h_760_.png 芬奇（主教练）
火箭：https://i11.hoopchina.com.cn/editor/a6f101d22587146cb83652d4056fe08e_w_1040_h_760_.png 杜兰特https://i11.hoopchina.com.cn/editor/31c15b922d5c78d3b52f41698961680b_w_1040_h_760_.png 申京https://i3.hoopchina.com.cn/editor/a336eaa032ab48776078f827a789fdd9_w_1040_h_760_.png 阿门-汤普森https://i10.hoopchina.com.cn/editor/db9d38836d8c7c2df835c6b70f4f2a14_w_1040_h_760_.png 小贾巴里-史密斯https://i10.hoopchina.com.cn/editor/cf98473e016f17c0da4d18e36e1df964_w_1040_h_760_.png 伊森https://i5.hoopchina.com.cn/editor/ac49ca1c96ee0e203cf3445f2ef6f7d2_w_1040_h_760_.png 谢泼德https://i3.hoopchina.com.cn/editor/9181f991e6d507b62a44c02f784b1c53_w_1040_h_760_.png 奥科吉https://i11.hoopchina.com.cn/editor/8c43cb1eb462a7569729eb1e66bd7c1f_w_1040_h_760_.png 阿龙-霍勒迪https://i5.hoopchina.com.cn/editor/f2bf50ee38383e5c24b341ac2b020399_w_1040_h_760_.png 泰特https://i11.hoopchina.com.cn/editor/0c9ef49af42f56a5c61058e67df0cd6b_w_1040_h_760_.png 芬尼-史密斯https://i1.hoopchina.com.cn/editor/1076a208cc7ef136c40cbd0caac37edb_w_1040_h_760_.png 卡佩拉https://i10.hoopchina.com.cn/editor/602c609ebacbd58804784630dc246232_w_1040_h_760_.png 范弗利特https://i1.hoopchina.com.cn/editor/ff01effea78a83133a4598920b401e8a_w_1040_h_760_.png 亚当斯https://i10.hoopchina.com.cn/editor/76feb010fe0307d18647354a067c920f_w_1040_h_760_.png 杰夫-格林https://i5.hoopchina.com.cn/newsPost/4a9b04058c0f5da503cc27ea9b76b833_w_572_h_387_.png 乌度卡
凯尔特人：https://i10.hoopchina.com.cn/editor/21fb7f63790bc84e0046d6d17d8604d6_w_1040_h_760_.png 布朗https://i3.hoopchina.com.cn/editor/4342457d68adcb7c6623d004578a38ea_w_1040_h_760_.png 塔图姆https://i10.hoopchina.com.cn/editor/a740c26266a97955ac5d30500394df2f_w_1040_h_760_.png 怀特https://i11.hoopchina.com.cn/editor/7c4868a6d30642d45f1b263a9a9f64f6_w_1040_h_760_.png 普里查德https://i11.hoopchina.com.cn/editor/0b1e0703ae64ed05e590dcfa2c168cc0_w_1040_h_760_.png 克塔https://i3.hoopchina.com.cn/editor/f1f7728423f5004ce242b16659222ac7_w_1040_h_760_.png 豪瑟https://i10.hoopchina.com.cn/editor/5f5b151ad32b1ea0eb32bc1568832a1f_w_1040_h_760_.png 武切维奇https://i11.hoopchina.com.cn/editor/85cf07898ec0fb17c9c65a8b2d57ffce_w_1040_h_760_.png 沙伊尔曼https://i5.hoopchina.com.cn/editor/d50b3c0df7a9b7276357b906df3b47bf_w_1040_h_760_.png 冈萨雷斯https://i3.hoopchina.com.cn/editor/b70c60b756a0c904da18e1f617b8a89f_w_1040_h_760_.png 沃尔什https://i5.hoopchina.com.cn/editor/79a04c0a0b376832d8dea1cb0b43d38d_w_1040_h_760_.png 加尔扎
陈：猛龙：https://i1.hoopchina.com.cn/editor/188199bfc87409ac6ec5a291edcc48b5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 巴雷特https://i3.hoopchina.com.cn/editor/153032d31940c9cee617ec14b837f7a6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 斯科蒂-巴恩斯https://i1.hoopchina.com.cn/editor/cda0b6a26f72201c38e3eccf83a93b11_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 博伊尔斯https://i1.hoopchina.com.cn/editor/3c6dc920c5c913e127c2e4d30e9a59a8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 英格拉姆https://i5.hoopchina.com.cn/editor/2b10d4df0788f692cc392c23f41d0288_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp奎克利https://i5.hoopchina.com.cn/editor/d50011d5836d1a86abede3f6d3fe810c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 沃尔特https://i10.hoopchina.com.cn/editor/46322e7be88113e8282f88573a251f16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 谢德https://i5.hoopchina.com.cn/editor/851e2780d3ef3698ac677a398bbdaebe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 珀尔特尔https://i5.hoopchina.com.cn/editor/a0fa65af0a9a9ccc88691a073f8b70e7_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 巴特尔https://i10.hoopchina.com.cn/editor/51ead4a1484bf2949155563e25b20726_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 马穆凯拉什维利https://i5.hoopchina.com.cn/editor/22878903ef811fe1d966963497200c7a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 劳森https://i3.hoopchina.com.cn/editor/32ea7857bd87af2cab91ae40b3836201_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 迪克https://i5.hoopchina.com.cn/editor/292c3fbd724464a93c6f66b4ac602788_w_933_h_633_.png?x-oss-process=image/resize,w_800/format,webp 拉贾科维奇https://i1.hoopchina.com.cn/editor/2687453f6bc5b06e36cd01ff5ef7402d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 坦普尔https://i10.hoopchina.com.cn/editor/6844df1e9bccd243c18760f684aff7af_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 莫格博https://i5.hoopchina.com.cn/editor/d4f4b87857e35c686d141f4be2f0a8c6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp tjdhttps://i10.hoopchina.com.cn/editor/e4deef1033a7b38f6c067926292fd0e6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp Chucky hepburnhttps://i1.hoopchina.com.cn/editor/045260bec880d96cb647826699ca01b9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp Alija Martin
掘金：https://i11.hoopchina.com.cn/editor/f350578222002fab0a0327313993d348_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 约基奇https://i1.hoopchina.com.cn/editor/e67ad82e868e451e00539d23c91e6f1b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 默里https://i11.hoopchina.com.cn/editor/4f2b727f86bca61a20a839b4ddada906_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 约翰逊https://i3.hoopchina.com.cn/editor/6dbe64feb0684d4d4fed88f91627ed60_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 戈登https://i11.hoopchina.com.cn/editor/59fdc4a8558a7e34c3890901fdbe01ca_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 小哈达威https://i5.hoopchina.com.cn/editor/0c3d3f78ec3fc758b613a6d70162d360_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布劳恩https://i3.hoopchina.com.cn/editor/657c86fa85f6ed3fd88575994ed6f39d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 斯宾塞-琼斯https://i10.hoopchina.com.cn/editor/0f6726d634463afd44e9895241a5e5d6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布朗https://i11.hoopchina.com.cn/editor/1f7a9fdf382be54cfaebb2ff448b9d67_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webpg 纳吉https://i11.hoopchina.com.cn/editor/0f308b587869b73ec6414cd1510914bb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 斯特劳瑟https://i5.hoopchina.com.cn/editor/54a0b2f920fad9e8ff13ea9638c866e5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 瓦兰丘纳斯https://i3.hoopchina.com.cn/newsPost/6aed50598726961dda22a51a4b654fab_w_569_h_343_.png 阿德尔曼
老鹰：https://i1.hoopchina.com.cn/editor/41f855a47720f573b6c6d618d73aa6d3_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 杰伦-约翰逊https://i3.hoopchina.com.cn/editor/2fa9411bec16b75ae9419324b01d138d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 戴森-丹尼尔斯https://i3.hoopchina.com.cn/editor/5429252f108e272ac53c0ad7aa3102a9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 亚历山大-沃克https://i11.hoopchina.com.cn/editor/dca0f074c223d1b656c3931d76a37568_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 麦科勒姆https://i10.hoopchina.com.cn/editor/b721242d9172edd4e3f67b58286b1bb5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 奥孔古https://i11.hoopchina.com.cn/editor/39b9df4fbcf1be7bcb321014e32c03cc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 库明加https://i3.hoopchina.com.cn/editor/2c5073124d4f540dadf109e019d1307e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 里萨谢https://i1.hoopchina.com.cn/editor/6dfafb3d4e7efb98b1610d2ac541bd2a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 纽厄尔https://i10.hoopchina.com.cn/editor/88d0fc1111c07e4714fe1e9de6f14fa5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 兰代尔https://i11.hoopchina.com.cn/editor/70156838d6614534caf4ac050e0a1882_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 文森特https://i11.hoopchina.com.cn/editor/9e98258743c77f246ed5cb84df670055_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 希尔德https://i11.hoopchina.com.cn/editor/e3a88282741e9a565dfdc6fc315b5cc0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 古耶https://i1.hoopchina.com.cn/editor/3bd5f75d9929846c48c42bd5b1008c02_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 基斯珀特https://i1.hoopchina.com.cn/editor/c01afbd404c6f06e9825315e995935db_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 基顿-华莱士
魔术：https://i11.hoopchina.com.cn/editor/ece17875585f8ce09c00b3f9e565cddb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 班凯罗https://i11.hoopchina.com.cn/editor/9780d6e62fbd9813e64520688728d0db_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 弗朗茨-瓦格纳https://i3.hoopchina.com.cn/editor/f7bcc375af3a6d396fbf413990fb4b0d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 贝恩https://i3.hoopchina.com.cn/editor/747ac4d31fcb65d78d067eb1219e0303_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 萨格斯https://i11.hoopchina.com.cn/editor/2401aacb4ca18d44ac027998db0feed4_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 小温德尔-卡特https://i5.hoopchina.com.cn/editor/fdd50fb5b4010b4d29b5e00bc673a571_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 比塔泽https://i3.hoopchina.com.cn/editor/10101d476aa64ed784a3f2fe7a8c47bd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布莱克https://i11.hoopchina.com.cn/editor/e7f7e3fe9ac3d1620f8a523346cda8be_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 达席尔瓦https://i1.hoopchina.com.cn/editor/3b5318bed1efad035f6a002afbe858ae_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 杰特-霍华德https://i5.hoopchina.com.cn/editor/df854b53842edcec7207b66df15b0cfe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 艾萨克https://i3.hoopchina.com.cn/editor/5b49ac21ad95b5ddbb0ba0fe3d76d269_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 卡因https://i10.hoopchina.com.cn/editor/6db1c06e3c6eed9c3bd82ec3151e047a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 杰文-卡特https://i3.hoopchina.com.cn/editor/99fe01fdc23d2450245f9e4f1659f017_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 理查德森https://i3.hoopchina.com.cn/editor/38d39622caad52ca67ac53d517cb0001_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 莫里茨-瓦格纳https://i11.hoopchina.com.cn/editor/2d9d91caf13c1d57a7fa3b26bb84df94_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 庞达
太阳：https://i3.hoopchina.com.cn/editor/c36e98f9f60697039fb458fa0c2d989d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布克https://i1.hoopchina.com.cn/editor/3e64f5ec3c3e9c09d7c53599f64b3c9b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 狄龙https://i1.hoopchina.com.cn/editor/8c5b54296c0a304183e010d1d2e61b0b_w_1040_h_760_.png 杰伦-格林https://i5.hoopchina.com.cn/editor/ce633e92b34bf8938394f7d5be270731_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 马克-威廉姆斯https://i10.hoopchina.com.cn/editor/e51a553f95c49a38386d1bcaade447eb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 伊戈达罗https://i5.hoopchina.com.cn/editor/6cd07ee459e3bbe5ce19c4e6ba72714f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 格雷森-阿伦https://i1.hoopchina.com.cn/editor/a025d210f90f4c022b0b4750d5d8f7be_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 吉莱斯皮https://i1.hoopchina.com.cn/editor/bf4c6b8eab42d7e0b9c1eab9951d0e3a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 奥尼尔https://i3.hoopchina.com.cn/editor/011a5d761c603fe46a97dd94adb27662_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 古德温https://i3.hoopchina.com.cn/editor/fece62df6a48fec0a40cce1053cd4b81_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 马卢阿奇https://i3.hoopchina.com.cn/editor/29b3f16a088e21c7557034bf3f80fcfa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 瑞安-邓恩
开拓者：https://i3.hoopchina.com.cn/editor/6f83694d24ff2e5441dbce2ca656efc1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 利拉德https://i5.hoopchina.com.cn/editor/37db6a72e38b3a0bdb072c32aa0896b6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 阿夫迪亚https://i11.hoopchina.com.cn/editor/9ddd6c5ba6ac4e5ba9b0d378778a3586_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 霍勒迪https://i3.hoopchina.com.cn/editor/4b78e8630c9eda95c27079371e4e17c1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 亨德森https://i11.hoopchina.com.cn/editor/f091e28a630cfeec0e77a436d0ca12ce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 谢登-夏普https://i1.hoopchina.com.cn/editor/ccf14d4913db8d3ce9e0fba1cc372a62_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 杰拉米-格兰特https://i10.hoopchina.com.cn/editor/8384bf82a72ad03730513fc68aab98d5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 克林根https://i10.hoopchina.com.cn/editor/cad6de714cc0e2ecaffc517c97ba5366_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 卡马拉https://i11.hoopchina.com.cn/editor/2173b6493afc345f915068e8126edf47_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 罗威https://i3.hoopchina.com.cn/editor/fc67673ecdec25faf7aea20d81d444c0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 杨瀚森https://i3.hoopchina.com.cn/editor/6f87901817f0435e75121ed43f045c7c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 塞布尔https://i10.hoopchina.com.cn/editor/7c5e9e99b9c0cb00f9937515e4b4dd8b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 克里斯-默里
勇士：https://i11.hoopchina.com.cn/editor/2ed0a8f59423eaa15146f6cb86eaf2cd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 库里https://i10.hoopchina.com.cn/editor/bee7807f3bfccbaefcdfe4917ccf1e40_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 巴特勒https://i11.hoopchina.com.cn/editor/14b791675da2dc3b18b88be4b5fa44a3_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 波尔津吉斯https://i1.hoopchina.com.cn/editor/c4cf23d04f4d81458e4ca705d0d9e528_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 德雷蒙德-格林https://i3.hoopchina.com.cn/editor/0d1540d9a7a8b60162d190034bc104a9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 波杰姆斯基https://i5.hoopchina.com.cn/editor/cd5bfd561c5152ceb9d65b5a5fa65dce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 穆迪https://i3.hoopchina.com.cn/editor/67d63133c2dbcad11b4ddd24ea8fe49b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 霍福德https://i1.hoopchina.com.cn/editor/aa17526656ddcb6e0d89375b2eed4751_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 梅尔顿https://i3.hoopchina.com.cn/editor/7e9ce1a382d9a429fcc3accbd652302f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 小佩顿https://i3.hoopchina.com.cn/editor/d45ca082bdcfb1e06f3233a563724092_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 桑托斯https://i10.hoopchina.com.cn/editor/cbca53243c08dfeb1e299407abfdcb7e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 塞思-库里https://i11.hoopchina.com.cn/editor/06d059f7fb4971b8b1fc50bc8d3e4358_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 波斯特
快船：https://i11.hoopchina.com.cn/editor/f8b4d0019b849ac0fd50a5f31b69ab3a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 伦纳德https://i5.hoopchina.com.cn/editor/af47cb0f9481a006920c7f1de8120aed_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 加兰https://i11.hoopchina.com.cn/editor/cfdcddcb762f043734cfedbfc3efc163_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 马瑟林https://i11.hoopchina.com.cn/editor/f37d6d87c5166de210c2fa36ae189a87_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 小琼斯https://i3.hoopchina.com.cn/editor/ce53605f105ad01def2a52d54681a75c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 科林斯https://i10.hoopchina.com.cn/editor/ecca9694500e98d99c6d2620448c60c8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 邓恩https://i11.hoopchina.com.cn/editor/8438b904d078acbd7f66e070863d7436_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 尼德豪泽https://i1.hoopchina.com.cn/editor/e891f78f5cacd59005cd553c9a1fca16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 比尔https://i10.hoopchina.com.cn/editor/69de28a9410ec347a8d3324a46387c81_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 大洛佩斯https://i10.hoopchina.com.cn/editor/825987d0822b71a0316dedef6716ea41_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 巴图姆https://i5.hoopchina.com.cn/editor/3e79b1600fd183c8bbfc3ac415f8630a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 波格丹诺维奇https://i1.hoopchina.com.cn/editor/fa970a093db1e4ba474cc51afca525aa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 乔丹-米勒
黄蜂：https://i1.hoopchina.com.cn/editor/981b6b629fe5f99740362bc84e1f1844_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 克尼普尔https://i1.hoopchina.com.cn/editor/a881a7ad9bed1622d7105f196f201e3a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 拉梅洛-鲍尔https://i5.hoopchina.com.cn/editor/9b4c7b67b607cbc3b7d36b979302db3f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布兰登-米勒https://i5.hoopchina.com.cn/editor/8cad8c14122ffce947652c6a14bf867b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 布里奇斯https://i5.hoopchina.com.cn/editor/fe59ee5fde70c631a5f14e4e445d3aa8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 迪亚巴特https://i11.hoopchina.com.cn/editor/35897454018e5f068670a3c6b7bc4c74_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 科比-怀特https://i3.hoopchina.com.cn/editor/229dbbf2be610725b191023106cef681_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 西恩-詹姆斯https://i1.hoopchina.com.cn/editor/82ce0f2642fb302abf3df97bcf6e9914_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 格兰特-威廉姆斯https://i1.hoopchina.com.cn/editor/8079590ebe14a18efc6f17515e329c68_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 卡尔克布伦纳https://i10.hoopchina.com.cn/editor/199eb524091652f45fdc1358406b2f04_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 麦克尼利
热火：https://i10.hoopchina.com.cn/editor/28bfea50227f785d439a0b939fd2ef00_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 阿德巴约https://i1.hoopchina.com.cn/editor/daa5272020df61551a542e78c0db004a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 希罗https://i1.hoopchina.com.cn/editor/25bb2b255fd696750463da945cfeceae_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 鲍威尔https://i10.hoopchina.com.cn/editor/bd5cc040f065c9d1451192e62ea89f6d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 韦尔https://i10.hoopchina.com.cn/editor/823da767942d82e3e903e968321d8555_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 威金斯https://i10.hoopchina.com.cn/editor/2847a516feb0bb99a9b143f68a0b267c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 哈克斯https://i11.hoopchina.com.cn/editor/30703514165f765aa8de23be7f5fa32f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 约维奇https://i5.hoopchina.com.cn/editor/27d52bc0a281f012e1b60c4cbc35a352_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 小米切尔https://i3.hoopchina.com.cn/editor/07bbafb9f08cb98ea4abc91951abaa29_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 拉尔松https://i1.hoopchina.com.cn/editor/e6cae317e60053a6267341e933d10812_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 雅库契奥尼斯https://i10.hoopchina.com.cn/editor/1072fa03d3f8f4e396cbbf78bf0edac6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 冯泰奇奥
魏：篮网：https://i10.hoopchina.com.cn/editor/fa2b12b4ddf526d03cff3e84fa5087ed_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp迈克尔-波特https://i5.hoopchina.com.cn/editor/564abf074420092ad612e7488ea2a5c6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米诺特https://i1.hoopchina.com.cn/editor/61f61d65f1b7ccf130f87040da2b6343_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp扎伊尔威廉姆斯https://i1.hoopchina.com.cn/editor/7c68b913d46b35ad1a957daea7c6a40e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp沃尔夫https://i10.hoopchina.com.cn/editor/879429537abc886583138a5edea8623f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp杰明https://i3.hoopchina.com.cn/editor/fc27413e98634571430934b1bf624529_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp鲍威尔https://i11.hoopchina.com.cn/editor/f84002718b6227b3e401249c62a0bb11_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp曼恩https://i1.hoopchina.com.cn/editor/fe174f59c9cd3b7d71b3033db04c77fb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp  EJ利德尔https://i1.hoopchina.com.cn/editor/13544c1842f00829c01aa4aa82333156_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp夏普https://i10.hoopchina.com.cn/editor/093a5ca88c8a51358616a0e59a681ab4_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克劳尼https://i1.hoopchina.com.cn/editor/4434b98f09bfc9b16859f33797ed61df_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp威尔逊https://i1.hoopchina.com.cn/editor/1566a6421ea6aab1fd5666f70096bf16_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp阿巴基https://i11.hoopchina.com.cn/editor/fd787d18f90b4149494dc6010019d53f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克拉克斯顿https://i11.hoopchina.com.cn/editor/175518cfcf757fcbc835de595f7211b6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特拉奥雷https://i5.hoopchina.com.cn/editor/4c53f3b70a6a1f24dcadf172ab7fc63f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp萨拉夫
爵士：https://i11.hoopchina.com.cn/editor/9385f04b7eb049d4beeb20c1f5c5fdc9_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小贾伦-杰克逊https://i11.hoopchina.com.cn/editor/52953a94a5aa28bb40fea06cacee8faa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp欣森https://i11.hoopchina.com.cn/editor/7d25097a39bce620a18eeb796e7b4a4d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp猪猪侠https://i5.hoopchina.com.cn/editor/de115fdbddc96f28cb534825c7580eb6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp科迪威廉姆斯https://i10.hoopchina.com.cn/editor/77311096441a6bffc64484262949e56f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp科利尔https://i1.hoopchina.com.cn/editor/2183362c34adc804a7e714ea72c80397_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米哈伊柳克https://i11.hoopchina.com.cn/editor/6aa6d8e3083536a162ef84b434a81f11_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp贝利https://i5.hoopchina.com.cn/editor/76b599900de33479095b918879070c3e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp哈克莱斯https://i1.hoopchina.com.cn/editor/21e5b724606db00587e342da64cadefc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp菲利波夫斯基https://i1.hoopchina.com.cn/editor/eba1cbb4ff40e41e27a41f8ce16902ce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马卡https://i5.hoopchina.com.cn/editor/702617605f18de0f7876905985824c15_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp凯斯勒https://i1.hoopchina.com.cn/editor/499865a36a8407053db3023dc0f393a1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp森萨博https://i1.hoopchina.com.cn/editor/3600dcc702aa3fd901a83ca3ef0bda4e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp乐福https://i1.hoopchina.com.cn/editor/ac6c82324ee3286e354badd657ac60cd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp康查尔https://i1.hoopchina.com.cn/editor/eb5b845a63e21eaeb96321a3d26f2dc2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp努尔基奇
公牛：https://i11.hoopchina.com.cn/editor/33c4eb6f8927c8d8f730ed22f24b8e86_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp塞克斯顿https://i1.hoopchina.com.cn/editor/8e250b6dce94f6987d1481cab3321a10_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小西蒙斯https://i11.hoopchina.com.cn/editor/1768f0a8e53b3033498aad489797756d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp吉迪https://i5.hoopchina.com.cn/editor/26d65eb216887452e8eeabcf3d37ea13_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp麦克朗https://i3.hoopchina.com.cn/editor/0fd86f42c19dcade88b8836e428be067_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp迪林厄姆https://i10.hoopchina.com.cn/editor/ad5af8611e5cfba326bfa24c0138beb6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp河村永辉https://i10.hoopchina.com.cn/editor/6464ed8c8a23eab14b20540231479681_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp伦纳德米勒https://i5.hoopchina.com.cn/editor/73f90b3ed988402b1a40d8beb9c065a8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp科林斯https://i5.hoopchina.com.cn/editor/20d489df23172f1c918b51c04fb22f5c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp理查兹https://i3.hoopchina.com.cn/editor/f1bf4f1ceb46fb44a1a7bcd0b4c78a14_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp布泽利斯https://i1.hoopchina.com.cn/editor/9daf0395352ecb73c77b203654bdd7e8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp古耶https://i3.hoopchina.com.cn/editor/408ddff1da0d6d06817ecfe9aa77c7f0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp诺阿埃森格https://i11.hoopchina.com.cn/editor/8639010c892a1ec9740de6bb9da55d45_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp杰伦史密斯https://i10.hoopchina.com.cn/editor/15dafa87c99741b0bc36a58537fa91e0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp亚布塞莱https://i11.hoopchina.com.cn/editor/0625d259361af3ffd6679205f226271f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特雷琼斯https://i3.hoopchina.com.cn/editor/27a899c93f228e99276881fc66096328_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp奥科罗https://i1.hoopchina.com.cn/editor/4ef9d5e68a11933aa0e9003bddb639db_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp帕威https://i1.hoopchina.com.cn/editor/36d3df66982ed18827c7aee8154f4383_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp奥尔布里希
雄鹿：https://i3.hoopchina.com.cn/editor/47b09785884f4c259fbcddc9a33b41fe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小特伦特https://i5.hoopchina.com.cn/editor/7928a126ab22d9737f5f17ed531bfe4a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp西姆斯https://i1.hoopchina.com.cn/editor/2fe656788ab7de7bbbc363b50c0527ea_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特纳https://i11.hoopchina.com.cn/editor/90cfac5deeb29b5503e00f6a1defa68b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小凯文波特https://i11.hoopchina.com.cn/editor/3328cb50de109c2dc55123bf399294ce_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp波蒂斯https://i5.hoopchina.com.cn/editor/407bafc2b239a12d5bdcb40c890f5575_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp普林斯https://i1.hoopchina.com.cn/editor/8994a311862fb209743e316b51d18d1f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp莱恩罗林斯https://i3.hoopchina.com.cn/editor/60420ed2971cf725b6ba07ff6a2434bb_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp库兹马https://i5.hoopchina.com.cn/editor/c85aa07a1a9cfab3a805529e0af11bc5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp AJ格林https://i1.hoopchina.com.cn/editor/851108f3997857214b1c48ec5658a52a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp吉昂https://i3.hoopchina.com.cn/editor/75650768aa9fe0f47d9cf0c14e4a10e8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp字母哥https://i3.hoopchina.com.cn/editor/1bdd43d5cfe888fcdc7b23c6d481fb28_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp字母哥哥https://i11.hoopchina.com.cn/editor/d4a177d550ab2a32068739358a801a7a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp字母弟 https://i5.hoopchina.com.cn/editor/46425331432c2767725638d8d527f79d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小杰克逊
独行侠：https://i1.hoopchina.com.cn/editor/aac348eec3611d3e506d4d94dbc6fdd5_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp巴格利https://i11.hoopchina.com.cn/editor/159cbbe2f54ac661e9dd2d72904debfa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马克斯克里斯蒂https://i10.hoopchina.com.cn/editor/4e6269c89ca0ad97e0634849cd4726ca_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp莱弗利https://i3.hoopchina.com.cn/editor/b824ed352c251bd0aa5a1ecb7d2067a8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp鲍威尔https://i3.hoopchina.com.cn/editor/7c51d2f150b98c9946132c3527eef14d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp AJ约翰逊https://i5.hoopchina.com.cn/editor/5b0715bf204191d99a08d75867397ec6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp瑞安 内姆布哈德https://i10.hoopchina.com.cn/editor/cc81861dfa14a4e28b218a869afeaa33_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp布兰登威廉姆斯https://i10.hoopchina.com.cn/editor/d9c17e8f5c5be430704a05e7ba788d5a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp欧文https://i11.hoopchina.com.cn/editor/f90d70c5dff6fba590880f6d38dd35b2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马绍尔https://i11.hoopchina.com.cn/editor/2786ce70956fcd2caee32187414ca7c8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马丁https://i3.hoopchina.com.cn/editor/cdd086d73cbf83da234da8d765b0ca9c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米德尔顿https://i5.hoopchina.com.cn/editor/2d0e4a7dd44858c3a5876fc831613ebe_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp加福德https://i11.hoopchina.com.cn/editor/385b2f03281b23ba5bcaca7b0b321cee_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp泰勒史密斯https://i5.hoopchina.com.cn/editor/e0865e533128d966bd3593ecccc426ac_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp pj华盛顿https://i1.hoopchina.com.cn/editor/1cfcdec24814a2629317fe4c5ec7d3bc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp西塞https://i3.hoopchina.com.cn/editor/355879dda43efafbdbab673588333e05_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 汤普森https://i3.hoopchina.com.cn/editor/9ee619b9befaf26d03224bbf5e96f8a2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp弗拉格
奇才：https://i3.hoopchina.com.cn/editor/49470908e672dc8c10c0a2501eca3cb0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特雷杨https://i3.hoopchina.com.cn/editor/3ef62cc3df354ea890569c911a9f1100_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp朱利安里斯https://i11.hoopchina.com.cn/editor/cd20f431f49269e73e6151240ca45f17_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp库利巴利https://i3.hoopchina.com.cn/editor/7fa0edebf0b2705a2ddaad357504a1bc_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp武克切维奇https://i1.hoopchina.com.cn/editor/dbdfd9e146ebfb0352837765ee09cf2d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp惠特莫尔https://i10.hoopchina.com.cn/editor/31314dceeed78a85e06c9946652e2e50_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp拉塞尔https://i5.hoopchina.com.cn/editor/847ee2b3d8e8357dcb106f54d72c0489_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp贾米尔-沃特金斯https://i10.hoopchina.com.cn/editor/1030f79a5512d744bed03aa21dc91fec_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp卡林顿https://i10.hoopchina.com.cn/editor/deeb6cde60e5ef1e25b163535081be79_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp杰登哈迪https://i1.hoopchina.com.cn/editor/cd74d62c14f1d9bcf79ec591b44422f2_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp贾斯汀-尚帕尼https://i1.hoopchina.com.cn/editor/e27c7679108986de5965509e7ade829e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特雷-约翰逊https://i5.hoopchina.com.cn/editor/47ce67bf412361050282b690514b2f78_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp谢里夫-库珀https://i1.hoopchina.com.cn/editor/ab5b651c5a075610174a18a543d772aa_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp凯肖恩-乔治https://i3.hoopchina.com.cn/editor/b0bd5ce6686a0c99ba1c8c808af5004e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp萨尔https://i11.hoopchina.com.cn/editor/4e2fc522a87e0cbb1da2530ef60a22c0_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp安东尼戴维斯https://i11.hoopchina.com.cn/editor/71061d9120892f3a18cb43c1f8c81e0a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp威尔莱利
步行者：https://i5.hoopchina.com.cn/editor/11533547ffd921301f450057da89a961_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp哈利伯顿https://i11.hoopchina.com.cn/editor/df7def9f7f4897d95885866a5aeca107_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp托平https://i1.hoopchina.com.cn/editor/e41a63af7d26896edde7873e1347d489_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp内姆布哈德https://i11.hoopchina.com.cn/editor/ea30bb93da2ae5a25afd009beaf576c4_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp泰隆彼得https://i3.hoopchina.com.cn/editor/773991df20facff307b15d7e91231c6a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp贾雷斯沃克https://i11.hoopchina.com.cn/editor/471b767ee8fa8e521529faeb26ff052a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp卡姆琼斯https://i1.hoopchina.com.cn/editor/9fa9df323446c17d7ce01950a0725512_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp麦克康奈尔https://i11.hoopchina.com.cn/editor/6ef6b8db2d0987855b61482bcdfb8c1e_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米卡波特https://i3.hoopchina.com.cn/editor/4b8841a72dbfd427e5744da3949213c7_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp内史密斯https://i3.hoopchina.com.cn/editor/a0e756248871f0b26cf55d160ddf7967_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp科比布朗https://i10.hoopchina.com.cn/editor/820de3c3a27ed2205f7fb8eb8b20dc06_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp本谢泼德https://i5.hoopchina.com.cn/editor/301b2e45c335e5b5ccab68262ef8a8b8_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp昆顿杰克逊https://i5.hoopchina.com.cn/editor/ef96912ea4d1b82a71b1eee1cc19f545_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp胡夫https://i3.hoopchina.com.cn/editor/48a2f63af031535580831b5a33c64a93_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp祖巴茨https://i5.hoopchina.com.cn/editor/f64d2c3f264ba0faecfcfc819924f3f6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp西亚卡姆
鹈鹕：https://i11.hoopchina.com.cn/editor/85cb452cbce280017b7e3e218b09f99c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp迈卡-皮维https://i5.hoopchina.com.cn/editor/466171701233a191cad8b81aac966c0d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp费尔斯https://i3.hoopchina.com.cn/editor/0509e735f6cf1d699290c10d44bd1828_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp锡安https://i3.hoopchina.com.cn/editor/4e040ecb45b59d4714373abfa3a2d67a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp赫伯特琼斯https://i10.hoopchina.com.cn/editor/4ba6801fcf3dc26de83110903efb192c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp普尔https://i3.hoopchina.com.cn/editor/4e69cd17b9876d7e61646884794c495b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp穆雷https://i11.hoopchina.com.cn/editor/1fb4530264a0f5db32044a8fcc048d0b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小乔丹https://i11.hoopchina.com.cn/editor/1fb4530264a0f5db32044a8fcc048d0b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp麦戈文斯https://i10.hoopchina.com.cn/editor/448798d8ee39b03b28be2615917087ae_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp马特科维奇https://i3.hoopchina.com.cn/editor/b677ea4070d5a91a308700a6d1ca2240_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp米西https://i11.hoopchina.com.cn/editor/b1f7b9a61402ff053c8cd6aa8c0c8d12_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp奎因https://i1.hoopchina.com.cn/editor/e750c7453d85dc08aad65577ebb6795c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp特雷-亚历山大https://i5.hoopchina.com.cn/editor/3099295e231fdb4254c81f1351c700ad_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp乔丹霍金斯https://i10.hoopchina.com.cn/editor/683869e3f5cca0eb9c2633a4f8a393a6_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp墨菲三世https://i10.hoopchina.com.cn/editor/96c2e85034e3c00c61f6660eee3e739d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp鲁尼https://i11.hoopchina.com.cn/editor/d5b0a08a545b51e0f0c3b0157ae0ea72_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp萨迪克贝
灰熊：https://i3.hoopchina.com.cn/editor/0944e27c64e6aa15b772126bc92a82cd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp韦尔斯https://i10.hoopchina.com.cn/editor/fa950355284754e2617c91ddfe1f8b70_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp小皮蓬https://i11.hoopchina.com.cn/editor/2963c070ba428dbfb6f83b5b655d432c_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp杰罗姆https://i10.hoopchina.com.cn/editor/4d4d55672d77747d0c2b603da9ab117d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp波普https://i1.hoopchina.com.cn/editor/0293deeb1f9decedf7333356bb6c9bba_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克莱顿https://i5.hoopchina.com.cn/editor/94332e43c6fd8e9f5aac50b4e8c8eace_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp阿尔达马https://i5.hoopchina.com.cn/editor/0f1d468983707d504349490c0eed0423_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp斯莫尔https://i10.hoopchina.com.cn/editor/663448a5c3e0779645162b61784f5fde_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp莫兰特https://i11.hoopchina.com.cn/editor/735df4c3e2c262bf3f1b94aa4e374f07_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp普洛斯珀https://i3.hoopchina.com.cn/editor/89745fee38f17ea97402af1fc379fd0f_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp伊迪https://i5.hoopchina.com.cn/editor/2c0bed85b8f19439efc1d8988c8494bf_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp吕佩尔https://i11.hoopchina.com.cn/editor/daf59f179715aeba853160ead06ca75d_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp亨德里克斯https://i5.hoopchina.com.cn/editor/57f5773af37be23a68cd2d0fdc316618_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp?x-oss-process=image/resize,w_800/format,webp考沃德https://i10.hoopchina.com.cn/editor/704b8ec71d04df08d864c453d7947f4b_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp斯宾塞https://i1.hoopchina.com.cn/editor/9ce7cf6f2a3a1ecf7de223cd6c6ae0ab_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp  GG杰克逊https://i1.hoopchina.com.cn/editor/900544941bd831f22cedff69f174cd27_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp吉布森
国王：https://i11.hoopchina.com.cn/editor/0507a839e285924b2fbad61352ac6b60_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp 蒙克https://i3.hoopchina.com.cn/editor/89598276607835343a6cd511e80f39f1_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp克利福德https://i1.hoopchina.com.cn/editor/9526a56a8d3676ce3ab42eecc3ca032a_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp海耶斯https://i3.hoopchina.com.cn/editor/c5f76c2f237a293a89414e223378ae89_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp迈克德莫特https://i3.hoopchina.com.cn/editor/d2a64b2afa4e2015eb089775fdd70b75_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp拉文https://i1.hoopchina.com.cn/editor/7b135d8e068eaf66ad492e263e520e33_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp阿丘瓦https://i3.hoopchina.com.cn/editor/bccf943a2a22270b5e6fba44311deb82_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp德罗赞https://i1.hoopchina.com.cn/editor/66ba8867f88e0d034666fb7194cf6f31_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp萨博尼斯https://i10.hoopchina.com.cn/editor/79ba193d083e4105eeb4297c661eb419_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp基根穆雷https://i3.hoopchina.com.cn/editor/6cc176f93893f527e1c9fdace221e423_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp威少https://i11.hoopchina.com.cn/editor/61c0b7b4c257f5b4b8a28ea495e330cd_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp尤班克斯https://i10.hoopchina.com.cn/editor/da19038143c2ea8903f1efc10e7cb921_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp亨特https://i10.hoopchina.com.cn/editor/602c609ebacbd58804784630dc246232_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp德文卡特https://i5.hoopchina.com.cn/editor/be64228e0b271c3b3125849de6d9ef17_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp鲍德温https://i1.hoopchina.com.cn/editor/b2e7887f09e806e0533a47d5b00e1f59_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp以赛亚-史蒂文斯https://i1.hoopchina.com.cn/editor/3dce2f32c459203fcfc9355434ced130_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp普老登https://i1.hoopchina.com.cn/editor/ce392bf4cf40b3b4ae429dbbdf12e278_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp卡德维尔https://i10.hoopchina.com.cn/editor/3d115aaa9eab973efdda02794de9ad27_w_1040_h_760_.png?x-oss-process=image/resize,w_800/format,webp雷诺"""

# ======== TEAM LABEL MAPPING ========
team_label_map = {
    '湖人': 'lal', '雷霆': 'okc', '尼克斯': 'nyk', '76人': 'phi',
    '活塞': 'det', '骑士': 'cle', '马刺': 'sas', '森林狼': 'min',
    '火箭': 'hou', '凯尔特人': 'bos', '猛龙': 'tor', '掘金': 'den',
    '老鹰': 'atl', '魔术': 'orl', '太阳': 'phx', '开拓者': 'por',
    '勇士': 'gsw', '快船': 'lac', '黄蜂': 'cha', '热火': 'mia',
    '篮网': 'bkn', '爵士': 'uta', '公牛': 'chi', '雄鹿': 'mil',
    '独行侠': 'dal', '奇才': 'was', '步行者': 'ind', '鹈鹕': 'nop',
    '灰熊': 'mem', '国王': 'sac'
}

# ======== NAME MAPPING (user name -> data.js name) ========
# Only include names we're confident about
name_map = {
    # Lakers
    '东契奇': '卢卡-东契奇',
    '詹姆斯': 'LeBron James',
    '里夫斯': '奥斯汀-里夫斯',
    '八村垒': 'Rui Hachimura',
    '艾顿': '德安德烈-艾顿',
    '斯马特': '马库斯-斯马特',
    '肯纳德': 'Luke Kennard',
    '海斯': 'Jaxson Hayes',
    '范德比尔特': '贾里德-范德比尔特',
    '拉拉维亚': '杰克-拉拉维亚',
    '布朗尼': '布朗尼·詹姆斯',
    '克内克特': '道尔顿·克内克特',
    '克勒贝尔': 'Maxi Kleber',
    # Thunder
    '亚历山大': 'Shai Gilgeous-Alexander',
    '霍姆格伦': '切特-霍姆格伦',
    '杰伦-威廉姆斯': '杰伦-威廉姆斯',
    '阿杰伊-米切尔': 'Ajay Mitchell',
    '多尔特': '吕冈茨-多尔特',
    '哈尔滕施泰因': '以赛亚-哈尔滕施泰因',
    '卡鲁索': '亚历克斯-卡鲁索',
    '麦凯恩': 'Jared McCain',
    '杰林-威廉姆斯': '杰林-威廉姆斯',
    '卡森-华莱士': '卡森·华莱士',
    '以赛亚-乔': '以赛亚-乔',
    '阿龙-威金斯': '阿龙-威金斯',
    # Knicks
    '布伦森': '杰伦-布伦森',
    '唐斯': '卡尔-安东尼-唐斯',
    '阿奴诺比': 'OG-阿奴诺比',
    '布里奇斯': '米卡尔-布里奇斯',
    '哈特': '约什-哈特',
    '麦克布莱德': '迈尔斯-麦克布莱德',
    '米切尔-罗宾逊': 'Mitchell Robinson',
    '沙梅特': 'Landry Shamet',
    '克拉克森': 'Jordan Clarkson',
    '阿尔瓦拉多': '约瑟-阿尔瓦拉多',
    '胡克波尔蒂': 'Ariel Hukporti',
    # 76ers
    '马克西': '泰雷斯-马克西',
    '恩比德': '乔尔-恩比德',
    '乔治': '保罗-乔治',
    'VJ-埃奇库姆': 'VJ-埃奇库姆',
    '格兰姆斯': 'Quentin Grimes',
    '乌布雷': 'Kelly Oubre Jr.',
    '德拉蒙德': 'Andre Drummond',
    '博纳': '阿德姆·博纳',
    '爱德华兹': '贾斯汀·爱德华兹',
    '巴洛': '多米尼克-巴洛',
    '沃特福德': '特伦登-沃特福特',
    '洛瑞': 'Kyle Lowry',
    # Pistons
    '坎宁安': '凯德-坎宁安',
    '杜伦': 'Jalen Duren',
    '奥萨尔-汤普森': '奥萨尔·汤普森',
    '哈里斯': 'Tobias Harris',
    '邓肯-罗宾逊': '邓肯-罗宾逊',
    '詹金斯': '丹尼斯·詹金斯',
    '勒韦尔': '卡里斯-勒韦尔',
    '斯图尔特': '以赛亚-斯图尔特',
    '保罗-里德': '保罗-里德',
    '贾文特-格林': 'Javonte Green',
    '霍兰德': '罗恩-霍兰德',
    '赫尔特': 'Kevin Huerter',
    # Cavs
    '米切尔': '多诺万-米切尔',
    '哈登': '詹姆斯-哈登',
    '莫布利': '埃文-莫布利',
    '贾勒特-阿伦': '贾勒特-阿伦',
    '斯特鲁斯': '马克斯-斯特鲁斯',
    '迪恩-韦德': 'Dean Wade',
    '施罗德': '丹尼斯-施罗德',
    '梅里尔': '萨姆-梅里尔',
    '杰隆-泰森': '杰隆·泰森',
    '埃利斯': 'Keon Ellis',
    '托马斯-布莱恩特': 'Thomas Bryant',
    # Spurs
    '文班亚马': '维克托·文班亚马',
    '福克斯': '达龙-福克斯',
    '卡斯尔': '斯蒂芬·卡斯尔',
    '迪伦-哈珀': '迪伦-哈珀',
    '瓦塞尔': '德文-瓦塞尔',
    '凯尔登-约翰逊': '凯尔登-约翰逊',
    '尚帕尼': '朱利安-尚彭尼',
    '科内特': '卢克-科内特',
    '卡特-布莱恩特': '卡特-布莱恩特',
    '哈里森-巴恩斯': 'Harrison Barnes',
    '奥利尼克': 'Kelly Olynyk',
    '普拉姆利': 'Mason Plumlee',
    # Timberwolves
    '爱德华兹': '安东尼-爱德华兹',
    '兰德尔': '朱利叶斯-兰德尔',
    '麦克丹尼尔斯': '杰登-麦克丹尼尔斯',
    '戈贝尔': '鲁迪-戈贝尔',
    '里德': '纳兹-里德',
    '小香农': '小特伦斯·香农',
    '多森姆': 'Ayo Dosunmu',
    '康利': 'Mike Conley',
    '李凯尔': 'Kyle Anderson',
    '迪温琴佐': '唐特-迪温琴佐',
    '海兰德': 'Bones Hyland',
    '英格尔斯': 'Joe Ingles',
    # Rockets
    '杜兰特': '凯文-杜兰特',
    '申京': '阿尔佩伦-申京',
    '阿门-汤普森': '阿门·汤普森',
    '小贾巴里-史密斯': '小贾巴里-史密斯',
    '伊森': 'Tari Eason',
    '谢泼德': '里德·谢泼德',
    '奥科吉': 'Josh Okogie',
    '阿龙-霍勒迪': 'Aaron Holiday',
    '泰特': 'Jae\'Sean Tate',  # will handle differently
    '芬尼-史密斯': '多里安-芬尼-史密斯',
    '卡佩拉': '克林特-卡佩拉',
    '范弗利特': '弗雷德-范弗利特',
    '亚当斯': '史蒂文-亚当斯',
    '杰夫-格林': 'Jeff Green',
    # Celtics
    '布朗': '杰伦-布朗',
    '塔图姆': '杰森-塔特姆',
    '怀特': '德里克-怀特',
    '普里查德': '佩顿-普里查德',
    '克塔': '内米亚斯-克塔',
    '豪瑟': '萨姆-豪瑟',
    '武切维奇': 'Nikola Vučević',
    '沙伊尔曼': '贝勒·沙伊尔曼',
    '冈萨雷斯': '雨果-冈萨雷斯',
    '沃尔什': 'Jordan Walsh',
    '加尔扎': '卢卡-加尔扎',
    # Raptors
    '巴雷特': 'RJ-巴雷特',
    '斯科蒂-巴恩斯': '斯科蒂-巴恩斯',
    '博伊尔斯': '科林-默里-博伊尔斯',
    '英格拉姆': '布兰登-英格拉姆',
    '奎克利': '伊曼纽尔-奎克利',
    '沃尔特': '贾科比·沃尔特',
    '谢德': '贾马尔·谢德',
    '珀尔特尔': 'Jakob Poeltl',
    '巴特尔': 'Jamison Battle',
    '马穆凯拉什维利': '桑德罗-马穆凯拉什维利',
    '劳森': 'Jaden Lawson',  # not found - skip
    '迪克': '格雷迪·迪克',
    '坦普尔': 'Garrett Temple',
    '莫格博': 'Jonathan Mogbo',
    # Raptors - special names
    # 'tjd' -> TJD is Trayce Jackson-Davis... but in Tor players? Let me check
    # Actually looking at Tor players, there's '特雷斯·杰克逊-戴维斯' -> that's Trayce Jackson-Davis (TJD)
    # 'Chucky hepburn' -> not found
    # 'Alija Martin' -> not found
    # Nuggets
    '约基奇': '尼古拉-约基奇',
    '默里': '贾马尔-默里',
    '约翰逊': '卡梅伦-约翰逊',
    '戈登': '阿龙-戈登',
    '小哈达威': 'Tim Hardaway Jr.',
    '布劳恩': 'Christian Braun',  # check
    '斯宾塞-琼斯': 'Spencer Jones',
    '布朗': 'Bruce Brown',
    '纳吉': '齐克-纳吉',
    '斯特劳瑟': '朱利安·斯特劳瑟',
    '瓦兰丘纳斯': '约纳斯-瓦兰丘纳斯',
    # Hawks
    '杰伦-约翰逊': '杰伦-约翰逊',
    '戴森-丹尼尔斯': '戴森-丹尼尔斯',
    '亚历山大-沃克': '尼基尔-亚历山大-沃克',
    '麦科勒姆': 'CJ McCollum',
    '奥孔古': '奥涅卡-奥孔古',
    '库明加': '乔纳森-库明加',
    '里萨谢': '扎卡里·里萨切尔',
    '纽厄尔': '阿萨-纽厄尔',
    '兰代尔': 'Jock Landale',
    '文森特': 'Gabe Vincent',
    '希尔德': '巴迪-希尔德',
    '古耶': '穆罕穆德-盖伊',
    '基斯珀特': '科里-基斯珀特',
    '基顿-华莱士': 'Keaton Wallace',
    # Magic
    '班凯罗': '保罗-班切罗',
    '弗朗茨-瓦格纳': '弗朗茨-瓦格纳',
    '贝恩': '德斯蒙德-贝恩',
    '萨格斯': '杰伦-萨格斯',
    '小温德尔-卡特': '温德尔-卡特',
    '比塔泽': '戈加-比塔泽',
    '布莱克': '安东尼·布莱克',
    '达席尔瓦': '特里斯坦-达·席尔瓦',
    '杰特-霍华德': '杰特·霍华德',
    '艾萨克': '乔纳森-艾萨克',
    '卡因': 'Jevon Carter',  # uncertain
    '杰文-卡特': 'Jevon Carter',
    '理查德森': 'Jase Richardson',  # uncertain
    '莫里茨-瓦格纳': 'Moritz Wagner',
    '庞达': 'Noah Penda',
    # Suns
    '布克': 'Devin Booker',
    '狄龙': '狄龙-布鲁克斯',
    '杰伦-格林': '杰伦-格林',
    '马克-威廉姆斯': 'Mark Williams',
    '伊戈达罗': '奥索·伊戈达罗',
    '格雷森-阿伦': '格雷森-阿伦',
    '吉莱斯皮': 'Collin Gillespie',
    '奥尼尔': '罗伊斯-奥尼尔',
    '古德温': 'Jordan Goodwin',
    '马卢阿奇': '卡曼-马卢阿奇',
    '瑞安-邓恩': '瑞安·邓恩',
    # Trailblazers
    '利拉德': '达米安-利拉德',
    '阿夫迪亚': '德尼-阿夫迪亚',
    '霍勒迪': '朱-霍勒迪',
    '亨德森': '斯库特·亨德森',
    '谢登-夏普': '谢登-夏普',
    '杰拉米-格兰特': '杰拉米-格兰特',
    '克林根': '多诺万·克林根',
    '卡马拉': '图马尼-卡马拉',
    '罗威': 'Robert Williams',
    '杨瀚森': '杨瀚森',
    '塞布尔': 'Matisse Thybulle',
    '克里斯-默里': '克里斯·默里',
    # Warriors
    '库里': '斯蒂芬-库里',
    '巴特勒': '吉米-巴特勒',
    '波尔津吉斯': 'Kristaps Porziņģis',
    '德雷蒙德-格林': '德雷蒙德-格林',
    '波杰姆斯基': '布兰丁·波杰姆斯基',
    '穆迪': '摩西-穆迪',
    '霍福德': '艾尔-霍福德',
    '梅尔顿': '丹东尼-梅尔顿',
    '小佩顿': 'Gary Payton II',
    '桑托斯': '桂-桑托斯',
    '塞思-库里': 'Seth Curry',
    '波斯特': 'Quinten Post',
    # Clippers
    '伦纳德': '科怀-伦纳德',
    '加兰': '达里厄斯-加兰',
    '马瑟林': 'Bennedict Mathurin',
    '小琼斯': '小德里克-琼斯',
    '科林斯': 'John Collins',
    '邓恩': '克里斯-邓恩',
    '尼德豪泽': '亚尼克-科南-尼德豪泽',
    '比尔': '布拉德利-比尔',
    '大洛佩斯': '布鲁克-洛佩斯',
    '巴图姆': '尼古拉斯-巴图姆',
    '波格丹诺维奇': '波格丹-波格丹诺维奇',
    '乔丹-米勒': 'Jordan Miller',
    # Hornets
    '克尼普尔': '康-克尼普尔',
    '拉梅洛-鲍尔': '拉梅洛-鲍尔',
    '布兰登-米勒': '布兰登·米勒',
    '布里奇斯': '迈尔斯-布里奇斯',
    '迪亚巴特': 'Moussa Diabaté',
    '科比-怀特': 'Coby White',
    '西恩-詹姆斯': 'Sion James',
    '格兰特-威廉姆斯': '格兰特-威廉姆斯',
    '卡尔克布伦纳': 'Ryan Kalkbrenner',
    '麦克尼利': '利亚姆-麦克尼利',
    # Heat
    '阿德巴约': '巴姆-阿德巴约',
    '希罗': '泰勒-希罗',
    '鲍威尔': 'Norman Powell',
    '韦尔': '凯莱尔·韦尔',
    '威金斯': '安德鲁-威金斯',
    '哈克斯': '小海梅-哈克斯',
    '约维奇': '尼科拉-约维奇',
    '小米切尔': '戴维恩-米切尔',
    '拉尔松': 'Pelle Larsson',
    '雅库契奥尼斯': '卡斯帕拉斯-亚库契奥尼斯',
    '冯泰奇奥': 'Simone Fontecchio',
    # Nets
    '迈克尔-波特': '小迈克尔-波特',
    '米诺特': 'Josh Minott',
    '扎伊尔威廉姆斯': '宰伊尔-威廉姆斯',
    '沃尔夫': 'Danny Wolf',
    '杰明': 'Egor Dёmin',  # uncertain
    '鲍威尔': '德雷克-鲍威尔',
    '曼恩': '特伦斯-曼',
    'EJ利德尔': 'E.J. Liddell',
    '夏普': '戴罗恩-夏普',
    '克劳尼': '诺厄·克洛尼',
    '威尔逊': 'Jalen Wilson',
    '阿巴基': 'Ochai Agbaji',
    '克拉克斯顿': 'Nic Claxton',
    '特拉奥雷': '诺兰-特拉奥雷',
    '萨拉夫': '本-萨拉夫',
    # Jazz
    '小贾伦-杰克逊': '小贾伦-杰克逊',
    '欣森': 'Vince Williams Jr.',  # uncertain
    '猪猪侠': 'Keyonte George',  # uncertain
    '科迪威廉姆斯': '科迪·威廉姆斯',
    '科利尔': '以赛亚·科利尔',
    '米哈伊柳克': 'Svi Mykhailiuk',
    '贝利': '埃斯-贝利',
    '哈克莱斯': 'Maurice Harkless',  # not in data
    '菲利波夫斯基': '凯尔·菲利波夫斯基',
    '马卡': '劳里-马尔卡宁',
    '凯斯勒': 'Walker Kessler',
    '森萨博': '布赖斯·森萨博',
    '乐福': 'Kevin Love',
    '康查尔': '约翰-康查尔',
    '努尔基奇': 'Jusuf Nurkić',
    # Bulls
    '塞克斯顿': 'Collin Sexton',
    '小西蒙斯': 'Anfernee Simons',
    '吉迪': '约什-吉迪',
    '麦克朗': 'Mac McClung',
    '迪林厄姆': '罗伯特·迪林厄姆',
    '河村永辉': 'Yuki Kawamura',  # not found
    '伦纳德米勒': 'Leonard Miller',
    '科林斯': 'Zach Collins',
    '理查兹': 'Nick Richards',
    '布泽利斯': '马塔斯·布泽利斯',
    '古耶': 'Mouhamed Gueye',  # not found in chi
    '诺阿埃森格': '诺阿-埃森格',
    '杰伦史密斯': '杰伦-史密斯',
    '亚布塞莱': '盖尔雄-亚布塞莱',
    '特雷琼斯': '特雷-琼斯',
    '奥科罗': '艾萨克-奥科罗',
    '帕威': '帕特里克-威廉姆斯',
    '奥尔布里希': 'Max Abmas',  # uncertain
    # Bucks
    '小特伦特': '小加里-特伦特',
    '西姆斯': 'Jericho Sims',
    '特纳': '迈尔斯-特纳',
    '小凯文波特': '小凯文-波特',
    '波蒂斯': '博比-波蒂斯',
    '普林斯': '托里恩-普林斯',
    '莱恩罗林斯': '莱恩-罗林斯',
    '库兹马': '凯尔-库兹马',
    'AJ格林': 'AJ-格林',
    '吉昂': 'Ousmane Dieng',
    '字母哥': '扬尼斯-阿德托昆博',
    '字母哥哥': 'Thanasis Antetokounmpo',
    '字母弟': 'Nigel Hayes-Davis',  # uncertain
    '小杰克逊': 'Andre Jackson Jr.',
    # Mavericks
    '巴格利': 'Marvin Bagley III',
    '马克斯克里斯蒂': '马克斯-克里斯蒂',
    '莱弗利': '德雷克·莱夫利二世',
    '鲍威尔': 'Dwight Powell',
    'AJ约翰逊': 'AJ·约翰逊',
    '瑞安 内姆布哈德': 'Tyus Jones',  # uncertain - Ryan Nembhard not found
    '布兰登威廉姆斯': 'Brandon Williams',
    '欧文': '凯里-欧文',
    '马绍尔': '纳吉-马绍尔',
    '马丁': '凯莱布-马丁',
    '米德尔顿': 'Khris Middleton',
    '加福德': '丹尼尔-加福德',
    '泰勒史密斯': 'Tyler Smith',
    'pj华盛顿': 'PJ-华盛顿',
    '西塞': 'Sidy Cissoko',  # not in dal
    '汤普森': '克莱-汤普森',
    '弗拉格': '库珀-弗拉格',
    # Wizards
    '特雷杨': '特雷-杨',
    '朱利安里斯': 'Jared Butler',  # uncertain
    '库利巴利': '比拉尔·库利巴利',
    '武克切维奇': 'Tristan Vukčević',  # not found
    '惠特莫尔': '卡姆·惠特莫尔',
    '拉塞尔': '丹吉洛-拉塞尔',
    '贾米尔-沃特金斯': 'Jamil Watkins',  # not found
    '卡林顿': '卡尔顿·卡林顿',
    '杰登哈迪': '杰登-哈迪',
    '贾斯汀-尚帕尼': 'Justin Champagnie',
    '特雷-约翰逊': '特雷-约翰逊',
    '谢里夫-库珀': 'Kadary Richmond',  # uncertain
    '凯肖恩-乔治': 'Kyshawn George',
    '萨尔': '亚历克斯·萨尔',
    '安东尼戴维斯': '安东尼-戴维斯',
    '威尔莱利': '威尔-莱利',
    # Pacers
    '哈利伯顿': '泰雷斯-哈利伯顿',
    '托平': '奥比-托平',
    '内姆布哈德': '安德鲁-内姆布哈德',
    '泰隆彼得': 'Tony Bradley',  # uncertain
    '贾雷斯沃克': '贾雷斯-沃克',
    '卡姆琼斯': 'Kam Jones',
    '麦克康奈尔': 'TJ-麦康奈尔',
    '米卡波特': '米卡-波特',
    '内史密斯': 'Aaron Nesmith',
    '科比布朗': '科比·布朗',
    '本谢泼德': '本·谢泼德',
    '昆顿杰克逊': 'Quenton Jackson',  # not found
    '胡夫': 'Jay Huff',
    '祖巴茨': '伊维察-祖巴茨',
    '西亚卡姆': '帕斯卡尔-西亚卡姆',
    # Pelicans
    '迈卡-皮维': 'Micah Peavy',
    '费尔斯': '杰里迈亚-费尔斯',
    '锡安': '蔡恩-威廉森',
    '赫伯特琼斯': 'Herbert Jones',
    '普尔': '乔丹-普尔',
    '穆雷': '德章泰-默里',
    '小乔丹': 'DeAndre Jordan',
    '麦戈文斯': 'Bryce McGowens',
    '马特科维奇': 'Karlo Matković',
    '米西': '伊夫·蜜西',
    '奎因': '德里克-奎因',
    '特雷-亚历山大': 'Trey Alexander',  # not found
    '乔丹霍金斯': '乔丹·霍金斯',
    '墨菲三世': '特雷-墨菲',
    '鲁尼': '凯文-卢尼',
    '萨迪克贝': '萨迪克-贝',
    # Grizzlies
    '韦尔斯': 'Jaylen Wells',
    '小皮蓬': 'Scotty Pippen Jr.',
    '杰罗姆': '泰-杰罗姆',
    '波普': '肯塔维厄斯-考德威尔-波普',
    '克莱顿': '沃尔特-克莱顿',
    '阿尔达马': '桑迪-阿尔达马',
    '斯莫尔': 'Adama-Alpha Bal',  # uncertain
    '莫兰特': '贾-莫兰特',
    '普洛斯珀': 'Olivier-Maxence Prosper',
    '伊迪': '扎克·埃迪',
    '吕佩尔': 'Rayan Rupert',
    '亨德里克斯': '泰勒·亨德里克斯',
    '考沃德': '塞德里克-考沃德',
    '斯宾塞': 'Cam Spencer',
    'GG杰克逊': 'GG Jackson II',
    '吉布森': 'Taj Gibson',  # not found
    # Kings
    '蒙克': '马利克-蒙克',
    '克利福德': '尼克-克利福德',
    '海耶斯': '基利安-海斯',
    '迈克德莫特': 'Doug McDermott',
    '拉文': '扎克-拉文',
    '阿丘瓦': 'Precious Achiuwa',
    '德罗赞': '德马尔-德罗赞',
    '萨博尼斯': '多曼塔斯-萨博尼斯',
    '基根穆雷': '基根-穆雷',
    '威少': 'Russell Westbrook',
    '尤班克斯': 'Drew Eubanks',
    '亨特': '德安德烈-亨特',
    '德文卡特': '德文·卡特',
    '鲍德温': 'Patrick Baldwin Jr.',
    '以赛亚-史蒂文斯': 'Isaiah Stevens',  # not found
    '普老登': 'Doug McDermott',  # uncertain
    '卡德维尔': 'Kentavious Caldwell-Pope',  # uncertain
    '雷诺': '马克西姆-雷诺',
    # Den - specific fixes
    '布劳恩': 'Christian Braun',  # in data as what?
}

# Looking at den players: '克里斯琴-布朗' must be Christian Braun?
# Actually '克里斯琴-布朗' seems to be Christian Braun
# And 'Bruce Brown' is separate
# Let me check... den has: '克里斯琴-布朗', 'Bruce Brown'
# So the user's "布劳恩" = Christian Braun = '克里斯琴-布朗', and "布朗" = Bruce Brown

# Actually let me check more carefully
# Let's just handle the tricky ones

# For Raptors special names:
# tjd = Trayce Jackson-Davis = 特雷斯·杰克逊-戴维斯
# Chucky Hepburn -> not in data
# Alija Martin -> not in data

# For Nuggets - the '布劳恩' -> Christian Braun -> '克里斯琴-布朗'
# And the second '布朗' -> 'Bruce Brown'

# Let me just add these overrides
more_maps = {
    # Nuggets
    '布劳恩': '克里斯琴-布朗',  # Christian Braun
    '布朗': 'Bruce Brown',
    # Raptors special
    'tjd': '特雷斯·杰克逊-戴维斯',  # Trayce Jackson-Davis (TJD)
    # Bucks
    '字母弟': 'Tyler Smith',  # the youngest Antetokounmpo brother... actually in data the 3rd one
    # OK - the user said "字母弟弟" or "字母弟" - in the text it says "字母弟"
    # In MIL roster there's no clear "字母弟" - there's Thanasis (字母哥哥) and Giannis (字母哥)
    # Let me skip uncertain ones
    
    # Actually for "猪猪侠" (juju xia) -> in UTA players there's '基扬特·乔治' = Keyonte George
    # "猪猪侠" is a nickname for Keyonte George
    '猪猪侠': '基扬特·乔治',
    
    # "欣森" in UTA -> maybe Vince Williams Jr.? But he's not in UTA data
    # Skip
    
    # Mavs: "瑞安 内姆布哈德" -> that's Ryan Nembhard, not in DAL data
    # Skip

    # "泰隆彼得" in IND -> IND has 'Tony Bradley', 'Tyrese Proctor'
    # Skip as uncertain
    
    # Bulls "古耶" -> MOUHAMED GUEYE but not in CHI. Skip
    
    # Bulls "奥尔布里希" -> not sure, skip
    
    # "杰明" in BKN -> Egor Dёmin or someone else?
    # BKN has 'Egor Dёmin' - "杰明" could be part of Egor Demin's name
    '杰明': 'Egor Dёmin',
    
    # Jazz "欣森" - not confident, skip
    
    # "卡德维尔" in SAC - this is probably Caldwell-Pope but he's in MEM not SAC
    # Skip
    
    # "普老登" in SAC - probably not matchable, skip
}

# Merge
name_map.update(more_maps)

# ======== PARSE USER INPUT ========
# Split by team labels
# Pattern: team_label followed by URLs and names
# Each entry: nameURL or just URL

def parse_team_data(text):
    """Parse the raw text into {team_id: [(name, url), ...]}"""
    import re as _re
    
    # Find all team sections
    # Pattern: optional prefix (王：陈：魏：) + team_label + content until next team or end
    team_pattern = _re.compile(r'(?:王|陈|魏)?：?(湖人|雷霆|尼克斯|76人|活塞|骑士|马刺|森林狼|火箭|凯尔特人|猛龙|掘金|老鹰|魔术|太阳|开拓者|勇士|快船|黄蜂|热火|篮网|爵士|公牛|雄鹿|独行侠|奇才|步行者|鹈鹕|灰熊|国王)：')
    
    # Find all team positions
    matches = list(team_pattern.finditer(text))
    result = {}
    
    for i, m in enumerate(matches):
        label = m.group(1)
        team_id = team_label_map.get(label)
        if not team_id:
            continue
        
        # Content from this match to next match
        start = m.end()
        if i + 1 < len(matches):
            end = matches[i+1].start()
        else:
            end = len(text)
        
        content = text[start:end]
        
        # Extract name-url pairs
        # Pattern: name(Chinese or English) immediately followed by https://...
        # URL pattern: https://...png... (could have query params)
        pairs = []
        
        # Split by URL pattern
        url_pattern = _re.compile(r'(https://[^\s]+(?:png|webp))')
        parts = url_pattern.split(content)
        
        # parts[0] is text before first URL (usually empty or has some prefix)
        # Then alternating: URL, text_before_next_url, URL, ...
        
        i = 0
        while i < len(parts):
            part = parts[i].strip()
            if part.startswith('https://'):
                url = part
                i += 1
                continue
            i += 1
        
        # Better approach: find all name positions and URL positions in order
        # A name is Chinese/English text right before a URL
        # Split text into chunks: text before URL, URL, text before next URL, URL, ...
        
        chunks = url_pattern.split(content)
        
        # First chunk is text before first URL (usually empty or has prefix like spaces)
        # Then pairs: (text_before_url, url)
        
        for j in range(1, len(chunks), 2):
            url = chunks[j].strip()
            
            # The text before this URL is chunks[j-1]
            text_before = chunks[j-1].strip() if j-1 < len(chunks) else ''
            
            # Extract the name from text_before - it's the last word/name
            # Names can be Chinese characters or English words
            if text_before:
                # Find the last "word" in text_before
                # Could be Chinese chars, English, or mixed
                name_match = _re.search(r'([\u4e00-\u9fff·A-Za-z0-9\- ]+)\s*$', text_before)
                if name_match:
                    name = name_match.group(1).strip()
                    # Clean up - remove various prefixes
                    # Remove any non-name prefixes
                    # Check if this looks like a player name
                    if name and len(name) >= 2:
                        pairs.append((name, url))
        
        if pairs:
            result[team_id] = pairs
    
    return result

parsed = parse_team_data(raw_text)

print("=== PARSED DATA ===")
for tid, pairs in parsed.items():
    print(f"\n{tid}:")
    for name, url in pairs:
        print(f"  {name} -> {url[:60]}...")

# Now match and update
with open(r'c:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

matched = []
unmatched = []

# For each team
for tid, pairs in parsed.items():
    for user_name, url in pairs:
        # Find matching data.js name
        expected_name = name_map.get(user_name)
        if not expected_name:
            unmatched.append((tid, user_name, 'no mapping'))
            continue
        
        # Find this player in content for this team
        # Build a pattern: find name within team's players array
        # Search for: name:'EXACT_NAME',img:''
        pattern = f"name:'{expected_name}',img:''"
        if pattern in content:
            old = f"name:'{expected_name}',img:''"
            new = f"name:'{expected_name}',img:'{url}'"
            content = content.replace(old, new, 1)
            matched.append((tid, expected_name, user_name))
        else:
            unmatched.append((tid, user_name, f'"{expected_name}" not found in data.js'))

# Write updated content
with open(r'c:\Users\chenqi\Desktop\tod\web\NBA AI经理 · 交易模拟器_files\js\data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n\n=== RESULTS ===")
print(f"Matched: {len(matched)}")
for tid, ename, uname in matched:
    print(f"  ✓ {tid}: {uname} -> {ename}")

print(f"\nUnmatched: {len(unmatched)}")
for tid, uname, reason in unmatched:
    print(f"  ✗ {tid}: {uname} ({reason})")
