/**
 * NBA Future Draft Picks Data
 * Source: RealGM (https://basketball.realgm.com/nba/draft/future_drafts/team)
 * Parsed: 2026-06-08
 * Each ;-separated segment = one pick entry
 * #N-#M format = pick position range
 */

var DRAFT_PICKS_DATA = {

  // ========== 老鹰 ==========
  atl: [
    { id:'atl-2026r1-nop', year:2026, round:1, originalTeam:'nop', protection:'none', label:'2026首轮（#8，来自鹈鹕）' },
    { id:'atl-2026r1-cle', year:2026, round:1, originalTeam:'cle', protection:'none', label:'2026首轮（#23，来自骑士）' },
    { id:'atl-2026r2-bos', year:2026, round:2, originalTeam:'bos', protection:'none', label:'2026次轮（#57，来自凯尔特人）' },
    { id:'atl-2028r1-cle', year:2028, round:1, originalTeam:'cle', protection:'none', label:'2028首轮（来自骑士）' },
    { id:'atl-2029r1-atl', year:2029, round:1, originalTeam:'atl', protection:'none', label:'2029首轮（自有）' },
    { id:'atl-2030r1-atl', year:2030, round:1, originalTeam:'atl', protection:'none', label:'2030首轮（自有）' },
    { id:'atl-2030r2-atl', year:2030, round:2, originalTeam:'atl', protection:'none', label:'2030次轮（自有）' },
    { id:'atl-2031r1-atl', year:2031, round:1, originalTeam:'atl', protection:'none', label:'2031首轮（自有）' },
    { id:'atl-2031r2-atl', year:2031, round:2, originalTeam:'atl', protection:'none', label:'2031次轮（自有）' },
    { id:'atl-2032r1-atl', year:2032, round:1, originalTeam:'atl', protection:'none', label:'2032首轮（自有）' },
    { id:'atl-2032r2-atl', year:2032, round:2, originalTeam:'atl', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 篮网 ==========
  bkn: [
    { id:'bkn-2026r1-bkn', year:2026, round:1, originalTeam:'bkn', protection:'none', label:'2026首轮（#6，自有）' },
    { id:'bkn-2026r2-bkn', year:2026, round:2, originalTeam:'bkn', protection:'none', label:'2026次轮（#33，自有）' },
    { id:'bkn-2026r2-lac', year:2026, round:2, originalTeam:'lac', protection:'none', label:'2026次轮（#43，来自快船）' },
    { id:'bkn-2027r1-bkn', year:2027, round:1, originalTeam:'bkn', protection:'none', label:'2027首轮（自有）' },
    { id:'bkn-2027r2-det', year:2027, round:2, originalTeam:'det', protection:'none', label:'2027次轮（来自活塞）' },
    { id:'bkn-2028r1-nyk', year:2028, round:1, originalTeam:'nyk', protection:'top8', label:'2028首轮（来自尼克斯，前8保护）' },
    { id:'bkn-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，#9-#30，前8保护）' },
    { id:'bkn-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'none', label:'2028首轮（来自太阳）' },
    { id:'bkn-2028r2-bkn', year:2028, round:2, originalTeam:'bkn', protection:'none', label:'2028次轮（自有）' },
    { id:'bkn-2028r2-atl', year:2028, round:2, originalTeam:'atl', protection:'none', label:'2028次轮（来自老鹰）' },
    { id:'bkn-2028r2-mem', year:2028, round:2, originalTeam:'mem', protection:'none', label:'2028次轮（来自灰熊）' },
    { id:'bkn-2029r1-bkn', year:2029, round:1, originalTeam:'bkn', protection:'none', label:'2029首轮（自有）' },
    { id:'bkn-2029r1-dal', year:2029, round:1, originalTeam:'dal', protection:'none', label:'2029首轮（来自独行侠）' },
    { id:'bkn-2029r1-hou', year:2029, round:1, originalTeam:'hou', protection:'none', label:'2029首轮（来自火箭）' },
    { id:'bkn-2029r2-bkn', year:2029, round:2, originalTeam:'bkn', protection:'none', label:'2029次轮（自有）' },
    { id:'bkn-2029r2-dal', year:2029, round:2, originalTeam:'dal', protection:'none', label:'2029次轮（来自独行侠）' },
    { id:'bkn-2029r2-gsw', year:2029, round:2, originalTeam:'gsw', protection:'none', label:'2029次轮（来自勇士）' },
    { id:'bkn-2029r2-mem', year:2029, round:2, originalTeam:'mem', protection:'none', label:'2029次轮（来自灰熊）' },
    { id:'bkn-2030r1-bkn', year:2030, round:1, originalTeam:'bkn', protection:'none', label:'2030首轮（自有）' },
    { id:'bkn-2030r2-bkn', year:2030, round:2, originalTeam:'bkn', protection:'none', label:'2030次轮（自有）' },
    { id:'bkn-2030r2-bos', year:2030, round:2, originalTeam:'bos', protection:'none', label:'2030次轮（来自凯尔特人）' },
    { id:'bkn-2030r2-dal', year:2030, round:2, originalTeam:'dal', protection:'none', label:'2030次轮（来自独行侠）' },
    { id:'bkn-2031r1-bkn', year:2031, round:1, originalTeam:'bkn', protection:'none', label:'2031首轮（自有）' },
    { id:'bkn-2031r2-bkn', year:2031, round:2, originalTeam:'bkn', protection:'none', label:'2031次轮（自有）' },
    { id:'bkn-2032r1-bkn', year:2032, round:1, originalTeam:'bkn', protection:'none', label:'2032首轮（自有）' },
    { id:'bkn-2032r2-bkn', year:2032, round:2, originalTeam:'bkn', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 凯尔特人 ==========
  bos: [
    { id:'bos-2026r1-bos', year:2026, round:1, originalTeam:'bos', protection:'none', label:'2026首轮（#27，自有）' },
    { id:'bos-2026r2-mil', year:2026, round:2, originalTeam:'mil', protection:'none', label:'2026次轮（#40，来自雄鹿）' },
    { id:'bos-2027r1-bos', year:2027, round:1, originalTeam:'bos', protection:'none', label:'2027首轮（自有）' },
    { id:'bos-2027r2-orl', year:2027, round:2, originalTeam:'orl', protection:'none', label:'2027次轮（来自魔术）' },
    { id:'bos-2028r1-bos', year:2028, round:1, originalTeam:'bos', protection:'none', label:'2028首轮（#2-#30顺位自有）' },
    { id:'bos-2028r2-nyk', year:2028, round:2, originalTeam:'nyk', protection:'none', label:'2028次轮（来自尼克斯）' },
    { id:'bos-2029r1-por', year:2029, round:1, originalTeam:'por', protection:'none', label:'2029首轮（来自开拓者）' },
    { id:'bos-2029r1-was', year:2029, round:1, originalTeam:'was', protection:'none', label:'2029首轮（来自奇才）' },
    { id:'bos-2030r1-bos', year:2030, round:1, originalTeam:'bos', protection:'none', label:'2030首轮（自有）' },
    { id:'bos-2031r1-bos', year:2031, round:1, originalTeam:'bos', protection:'none', label:'2031首轮（自有）' },
    { id:'bos-2031r2-uta', year:2031, round:2, originalTeam:'uta', protection:'none', label:'2031次轮（来自爵士）' },
    { id:'bos-2032r2-bos', year:2032, round:2, originalTeam:'bos', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 黄蜂 ==========
  cha: [
    { id:'cha-2026r1-cha', year:2026, round:1, originalTeam:'cha', protection:'none', label:'2026首轮（#14，自有）' },
    { id:'cha-2026r1-orl', year:2026, round:1, originalTeam:'orl', protection:'none', label:'2026首轮（#18，来自魔术）' },
    { id:'cha-2027r1-cha', year:2027, round:1, originalTeam:'cha', protection:'top2', label:'2027首轮（自有，前2保护）' },
    { id:'cha-2027r1-dal', year:2027, round:1, originalTeam:'dal', protection:'top2', label:'2027首轮（来自独行侠，#3-#30，前2保护）' },
    { id:'cha-2027r2-nop', year:2027, round:2, originalTeam:'nop', protection:'none', label:'2027次轮（来自鹈鹕）' },
    { id:'cha-2028r1-cha', year:2028, round:1, originalTeam:'cha', protection:'none', label:'2028首轮（自有）' },
    { id:'cha-2029r1-cha', year:2029, round:1, originalTeam:'cha', protection:'none', label:'2029首轮（自有）' },
    { id:'cha-2029r1-min', year:2029, round:1, originalTeam:'min', protection:'none', label:'2029首轮（来自森林狼，#6-#30）' },
    { id:'cha-2029r1-uta', year:2029, round:1, originalTeam:'uta', protection:'none', label:'2029首轮（来自爵士）' },
    { id:'cha-2029r2-cha', year:2029, round:2, originalTeam:'cha', protection:'none', label:'2029次轮（自有）' },
    { id:'cha-2030r1-cha', year:2030, round:1, originalTeam:'cha', protection:'none', label:'2030首轮（自有）' },
    { id:'cha-2030r2-cha', year:2030, round:2, originalTeam:'cha', protection:'none', label:'2030次轮（自有）' },
    { id:'cha-2030r2-lac', year:2030, round:2, originalTeam:'lac', protection:'none', label:'2030次轮（来自快船）' },
    { id:'cha-2031r1-cha', year:2031, round:1, originalTeam:'cha', protection:'none', label:'2031首轮（自有）' },
    { id:'cha-2031r2-cha', year:2031, round:2, originalTeam:'cha', protection:'none', label:'2031次轮（自有）' },
    { id:'cha-2031r2-den', year:2031, round:2, originalTeam:'den', protection:'none', label:'2031次轮（来自掘金）' },
    { id:'cha-2031r2-mil', year:2031, round:2, originalTeam:'mil', protection:'none', label:'2031次轮（来自雄鹿）' },
    { id:'cha-2031r2-nyk', year:2031, round:2, originalTeam:'nyk', protection:'none', label:'2031次轮（来自尼克斯）' },
    { id:'cha-2032r1-cha', year:2032, round:1, originalTeam:'cha', protection:'none', label:'2032首轮（自有）' },
    { id:'cha-2032r2-cha', year:2032, round:2, originalTeam:'cha', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 公牛 ==========
  chi: [
    { id:'chi-2026r1-chi', year:2026, round:1, originalTeam:'chi', protection:'none', label:'2026首轮（#4，自有）' },
    { id:'chi-2026r1-por', year:2026, round:1, originalTeam:'por', protection:'none', label:'2026首轮（#15，来自开拓者）' },
    { id:'chi-2026r2-nop', year:2026, round:2, originalTeam:'nop', protection:'none', label:'2026次轮（#38，来自鹈鹕）' },
    { id:'chi-2026r2-den', year:2026, round:2, originalTeam:'den', protection:'none', label:'2026次轮（#56，来自掘金）' },
    { id:'chi-2027r1-chi', year:2027, round:1, originalTeam:'chi', protection:'top14', label:'2027首轮（自有，乐透保护）' },
    { id:'chi-2028r1-chi', year:2028, round:1, originalTeam:'chi', protection:'top14', label:'2028首轮（自有，乐透保护）' },
    { id:'chi-2028r2-chi', year:2028, round:2, originalTeam:'chi', protection:'none', label:'2028次轮（自有）' },
    { id:'chi-2029r1-chi', year:2029, round:1, originalTeam:'chi', protection:'none', label:'2029首轮（自有）' },
    { id:'chi-2029r2-chi', year:2029, round:2, originalTeam:'chi', protection:'none', label:'2029次轮（自有）' },
    { id:'chi-2030r1-chi', year:2030, round:1, originalTeam:'chi', protection:'none', label:'2030首轮（自有）' },
    { id:'chi-2030r2-chi', year:2030, round:2, originalTeam:'chi', protection:'none', label:'2030次轮（自有）' },
    { id:'chi-2031r1-chi', year:2031, round:1, originalTeam:'chi', protection:'none', label:'2031首轮（自有）' },
    { id:'chi-2031r2-chi', year:2031, round:2, originalTeam:'chi', protection:'none', label:'2031次轮（自有）' },
    { id:'chi-2032r1-chi', year:2032, round:1, originalTeam:'chi', protection:'none', label:'2032首轮（自有）' },
    { id:'chi-2032r2-chi', year:2032, round:2, originalTeam:'chi', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 骑士 ==========
  cle: [
    { id:'cle-2026r1-sas', year:2026, round:1, originalTeam:'sas', protection:'none', label:'2026首轮（#29，来自马刺）' },
    { id:'cle-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'none', label:'2027首轮（来自太阳）' },
    { id:'cle-2028r1-atl', year:2028, round:1, originalTeam:'atl', protection:'none', label:'2028首轮（来自老鹰）' },
    { id:'cle-2028r1-uta', year:2028, round:1, originalTeam:'uta', protection:'none', label:'2028首轮（来自爵士）' },
    { id:'cle-2028r2-cle', year:2028, round:2, originalTeam:'cle', protection:'none', label:'2028次轮（自有）' },
    { id:'cle-2029r1-cha', year:2029, round:1, originalTeam:'cha', protection:'none', label:'2029首轮（来自黄蜂）' },
    { id:'cle-2030r1-cle', year:2030, round:1, originalTeam:'cle', protection:'none', label:'2030首轮（自有）' },
    { id:'cle-2031r1-cle', year:2031, round:1, originalTeam:'cle', protection:'none', label:'2031首轮（自有）' },
    { id:'cle-2031r2-bos', year:2031, round:2, originalTeam:'bos', protection:'none', label:'2031次轮（来自凯尔特人）' },
    { id:'cle-2032r1-cle', year:2032, round:1, originalTeam:'cle', protection:'none', label:'2032首轮（自有）' },
    { id:'cle-2032r2-cle', year:2032, round:2, originalTeam:'cle', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 独行侠 ==========
  dal: [
    { id:'dal-2026r1-dal', year:2026, round:1, originalTeam:'dal', protection:'none', label:'2026首轮（#9，自有）' },
    { id:'dal-2026r1-okc', year:2026, round:1, originalTeam:'okc', protection:'none', label:'2026首轮（#30，来自雷霆）' },
    { id:'dal-2026r2-phx', year:2026, round:2, originalTeam:'phx', protection:'none', label:'2026次轮（#48，来自太阳）' },
    { id:'dal-2027r1-dal', year:2027, round:1, originalTeam:'dal', protection:'top2', label:'2027首轮（#1-#2顺位自有，前2保护）' },
    { id:'dal-2027r2-det', year:2027, round:2, originalTeam:'det', protection:'none', label:'2027次轮（来自活塞）' },
    { id:'dal-2028r1-dal', year:2028, round:1, originalTeam:'dal', protection:'none', label:'2028首轮（自有）' },
    { id:'dal-2029r1-bkn', year:2029, round:1, originalTeam:'bkn', protection:'none', label:'2029首轮（来自篮网）' },
    { id:'dal-2029r1-hou', year:2029, round:1, originalTeam:'hou', protection:'none', label:'2029首轮（来自火箭）' },
    { id:'dal-2030r1-dal', year:2030, round:1, originalTeam:'dal', protection:'none', label:'2030首轮（自有）' },
    { id:'dal-2030r1-sas', year:2030, round:1, originalTeam:'sas', protection:'none', label:'2030首轮（来自马刺）' },
    { id:'dal-2031r1-dal', year:2031, round:1, originalTeam:'dal', protection:'none', label:'2031首轮（自有）' },
    { id:'dal-2032r1-dal', year:2032, round:1, originalTeam:'dal', protection:'none', label:'2032首轮（自有）' },
    { id:'dal-2032r2-dal', year:2032, round:2, originalTeam:'dal', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 掘金 ==========
  den: [
    { id:'den-2026r1-den', year:2026, round:1, originalTeam:'den', protection:'none', label:'2026首轮（#26，自有）' },
    { id:'den-2026r2-atl', year:2026, round:2, originalTeam:'atl', protection:'none', label:'2026次轮（#49，来自老鹰）' },
    { id:'den-2027r1-den', year:2027, round:1, originalTeam:'den', protection:'top5', label:'2027首轮（#1-#5顺位自有，前5保护）' },
    { id:'den-2028r1-den', year:2028, round:1, originalTeam:'den', protection:'top5', label:'2028首轮（#1-#5顺位自有，前5保护）' },
    { id:'den-2028r2-den', year:2028, round:2, originalTeam:'den', protection:'none', label:'2028次轮（#31-#33顺位自有）' },
    { id:'den-2028r2-was', year:2028, round:2, originalTeam:'was', protection:'none', label:'2028次轮（来自奇才）' },
    { id:'den-2029r1-den', year:2029, round:1, originalTeam:'den', protection:'top5', label:'2029首轮（#1-#5顺位自有，前5保护）' },
    { id:'den-2030r1-den', year:2030, round:1, originalTeam:'den', protection:'top5', label:'2030首轮（#1-#5顺位自有，前5保护）' },
    { id:'den-2031r1-den', year:2031, round:1, originalTeam:'den', protection:'none', label:'2031首轮（自有）' },
    { id:'den-2032r2-den', year:2032, round:2, originalTeam:'den', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 活塞 ==========
  det: [
    { id:'det-2026r1-min', year:2026, round:1, originalTeam:'min', protection:'none', label:'2026首轮（#21，来自森林狼）' },
    { id:'det-2027r1-det', year:2027, round:1, originalTeam:'det', protection:'none', label:'2027首轮（自有）' },
    { id:'det-2027r2-det', year:2027, round:2, originalTeam:'det', protection:'none', label:'2027次轮（自有）' },
    { id:'det-2027r2-dal', year:2027, round:2, originalTeam:'dal', protection:'none', label:'2027次轮（来自独行侠）' },
    { id:'det-2027r2-mil', year:2027, round:2, originalTeam:'mil', protection:'none', label:'2027次轮（来自雄鹿）' },
    { id:'det-2028r1-det', year:2028, round:1, originalTeam:'det', protection:'none', label:'2028首轮（自有）' },
    { id:'det-2028r2-det', year:2028, round:2, originalTeam:'det', protection:'none', label:'2028次轮（#31-#55顺位自有）' },
    { id:'det-2028r2-phi', year:2028, round:2, originalTeam:'phi', protection:'none', label:'2028次轮（来自76人）' },
    { id:'det-2029r1-det', year:2029, round:1, originalTeam:'det', protection:'none', label:'2029首轮（自有）' },
    { id:'det-2029r2-sac', year:2029, round:2, originalTeam:'sac', protection:'none', label:'2029次轮（来自国王）' },
    { id:'det-2030r1-det', year:2030, round:1, originalTeam:'det', protection:'none', label:'2030首轮（自有）' },
    { id:'det-2030r2-det', year:2030, round:2, originalTeam:'det', protection:'none', label:'2030次轮（自有）' },
    { id:'det-2031r1-det', year:2031, round:1, originalTeam:'det', protection:'none', label:'2031首轮（自有）' },
    { id:'det-2031r2-det', year:2031, round:2, originalTeam:'det', protection:'none', label:'2031次轮（自有）' },
    { id:'det-2031r2-dal', year:2031, round:2, originalTeam:'dal', protection:'none', label:'2031次轮（来自独行侠）' },
    { id:'det-2031r2-min', year:2031, round:2, originalTeam:'min', protection:'none', label:'2031次轮（来自森林狼）' },
    { id:'det-2032r1-det', year:2032, round:1, originalTeam:'det', protection:'none', label:'2032首轮（自有）' },
    { id:'det-2032r2-det', year:2032, round:2, originalTeam:'det', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 勇士 ==========
  gsw: [
    { id:'gsw-2026r1-gsw', year:2026, round:1, originalTeam:'gsw', protection:'none', label:'2026首轮（#11，自有）' },
    { id:'gsw-2026r2-lal', year:2026, round:2, originalTeam:'lal', protection:'none', label:'2026次轮（#54，来自湖人）' },
    { id:'gsw-2027r1-gsw', year:2027, round:1, originalTeam:'gsw', protection:'none', label:'2027首轮（自有）' },
    { id:'gsw-2027r2-was', year:2027, round:2, originalTeam:'was', protection:'none', label:'2027次轮（来自奇才）' },
    { id:'gsw-2028r1-gsw', year:2028, round:1, originalTeam:'gsw', protection:'none', label:'2028首轮（自有）' },
    { id:'gsw-2029r1-gsw', year:2029, round:1, originalTeam:'gsw', protection:'none', label:'2029首轮（自有）' },
    { id:'gsw-2030r1-gsw', year:2030, round:1, originalTeam:'gsw', protection:'top20', label:'2030首轮（#1-#20顺位自有，前20保护）' },
    { id:'gsw-2031r1-gsw', year:2031, round:1, originalTeam:'gsw', protection:'none', label:'2031首轮（自有）' },
    { id:'gsw-2031r2-det', year:2031, round:2, originalTeam:'det', protection:'none', label:'2031次轮（来自活塞）' },
    { id:'gsw-2032r1-gsw', year:2032, round:1, originalTeam:'gsw', protection:'none', label:'2032首轮（自有）' },
    { id:'gsw-2032r2-gsw', year:2032, round:2, originalTeam:'gsw', protection:'none', label:'2032次轮（#31-#50顺位自有）' }
  ],

  // ========== 火箭 ==========
  hou: [
    { id:'hou-2026r2-chi', year:2026, round:2, originalTeam:'chi', protection:'none', label:'2026次轮（#39，来自公牛）' },
    { id:'hou-2026r2-hou', year:2026, round:2, originalTeam:'hou', protection:'none', label:'2026次轮（#53，自有）' },
    { id:'hou-2027r1-hou', year:2027, round:1, originalTeam:'hou', protection:'none', label:'2027首轮（自有）' },
    { id:'hou-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'none', label:'2027首轮（来自太阳）' },
    { id:'hou-2027r2-mem', year:2027, round:2, originalTeam:'mem', protection:'none', label:'2027次轮（来自灰熊）' },
    { id:'hou-2027r2-mia', year:2027, round:2, originalTeam:'mia', protection:'none', label:'2027次轮（来自热火）' },
    { id:'hou-2027r2-nyk', year:2027, round:2, originalTeam:'nyk', protection:'none', label:'2027次轮（来自尼克斯）' },
    { id:'hou-2027r2-okc', year:2027, round:2, originalTeam:'okc', protection:'none', label:'2027次轮（来自雷霆）' },
    { id:'hou-2028r1-hou', year:2028, round:1, originalTeam:'hou', protection:'none', label:'2028首轮（自有）' },
    { id:'hou-2028r2-hou', year:2028, round:2, originalTeam:'hou', protection:'none', label:'2028次轮（自有）' },
    { id:'hou-2029r1-bkn', year:2029, round:1, originalTeam:'bkn', protection:'none', label:'2029首轮（来自篮网）' },
    { id:'hou-2029r2-sac', year:2029, round:2, originalTeam:'sac', protection:'none', label:'2029次轮（来自国王）' },
    { id:'hou-2030r1-hou', year:2030, round:1, originalTeam:'hou', protection:'none', label:'2030首轮（自有）' },
    { id:'hou-2031r1-hou', year:2031, round:1, originalTeam:'hou', protection:'none', label:'2031首轮（自有）' },
    { id:'hou-2031r2-hou', year:2031, round:2, originalTeam:'hou', protection:'none', label:'2031次轮（#31-#55顺位自有）' },
    { id:'hou-2032r1-hou', year:2032, round:1, originalTeam:'hou', protection:'none', label:'2032首轮（自有）' },
    { id:'hou-2032r2-phx', year:2032, round:2, originalTeam:'phx', protection:'none', label:'2032次轮（来自太阳）' }
  ],

  // ========== 步行者 ==========
  ind: [
    { id:'ind-2027r1-ind', year:2027, round:1, originalTeam:'ind', protection:'none', label:'2027首轮（自有）' },
    { id:'ind-2027r2-mia', year:2027, round:2, originalTeam:'mia', protection:'none', label:'2027次轮（来自热火）' },
    { id:'ind-2027r2-nyk', year:2027, round:2, originalTeam:'nyk', protection:'none', label:'2027次轮（来自尼克斯）' },
    { id:'ind-2027r2-okc', year:2027, round:2, originalTeam:'okc', protection:'none', label:'2027次轮（来自雷霆）' },
    { id:'ind-2027r2-uta', year:2027, round:2, originalTeam:'uta', protection:'none', label:'2027次轮（来自爵士）' },
    { id:'ind-2028r1-ind', year:2028, round:1, originalTeam:'ind', protection:'none', label:'2028首轮（自有）' },
    { id:'ind-2028r2-dal', year:2028, round:2, originalTeam:'dal', protection:'none', label:'2028次轮（来自独行侠）' },
    { id:'ind-2028r2-nyk', year:2028, round:2, originalTeam:'nyk', protection:'none', label:'2028次轮（来自尼克斯）' },
    { id:'ind-2029r1-ind', year:2029, round:1, originalTeam:'ind', protection:'none', label:'2029首轮（自有）' },
    { id:'ind-2029r2-por', year:2029, round:2, originalTeam:'por', protection:'none', label:'2029次轮（来自开拓者）' },
    { id:'ind-2030r1-ind', year:2030, round:1, originalTeam:'ind', protection:'none', label:'2030首轮（自有）' },
    { id:'ind-2030r2-ind', year:2030, round:2, originalTeam:'ind', protection:'none', label:'2030次轮（自有）' },
    { id:'ind-2031r1-ind', year:2031, round:1, originalTeam:'ind', protection:'none', label:'2031首轮（自有）' },
    { id:'ind-2031r2-mem', year:2031, round:2, originalTeam:'mem', protection:'none', label:'2031次轮（来自灰熊）' },
    { id:'ind-2031r2-was', year:2031, round:2, originalTeam:'was', protection:'none', label:'2031次轮（来自奇才）' },
    { id:'ind-2032r1-ind', year:2032, round:1, originalTeam:'ind', protection:'none', label:'2032首轮（自有）' },
    { id:'ind-2032r2-ind', year:2032, round:2, originalTeam:'ind', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 快船 ==========
  lac: [
    { id:'lac-2026r1-ind', year:2026, round:1, originalTeam:'ind', protection:'none', label:'2026首轮（#5，来自步行者）' },
    { id:'lac-2026r2-mem', year:2026, round:2, originalTeam:'mem', protection:'none', label:'2026次轮（#36，来自灰熊）' },
    { id:'lac-2026r2-cle', year:2026, round:2, originalTeam:'cle', protection:'none', label:'2026次轮（#52，来自骑士）' },
    { id:'lac-2027r1-okc', year:2027, round:1, originalTeam:'okc', protection:'top5', label:'2027首轮（来自雷霆，前5保护）' },
    { id:'lac-2029r1-lac', year:2029, round:1, originalTeam:'lac', protection:'top3', label:'2029首轮（#1-#3顺位自有，前3保护）' },
    { id:'lac-2030r1-lac', year:2030, round:1, originalTeam:'lac', protection:'none', label:'2030首轮（自有）' },
    { id:'lac-2031r1-lac', year:2031, round:1, originalTeam:'lac', protection:'none', label:'2031首轮（自有）' },
    { id:'lac-2031r2-lac', year:2031, round:2, originalTeam:'lac', protection:'none', label:'2031次轮（自有）' },
    { id:'lac-2032r1-lac', year:2032, round:1, originalTeam:'lac', protection:'none', label:'2032首轮（自有）' },
    { id:'lac-2032r2-lac', year:2032, round:2, originalTeam:'lac', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 湖人 ==========
  lal: [
    { id:'lal-2026r1-lal', year:2026, round:1, originalTeam:'lal', protection:'none', label:'2026首轮（#25，自有）' },
    { id:'lal-2027r1-lal', year:2027, round:1, originalTeam:'lal', protection:'top4', label:'2027首轮（#1-#4顺位自有，前4保护）' },
    { id:'lal-2028r1-lal', year:2028, round:1, originalTeam:'lal', protection:'none', label:'2028首轮（自有）' },
    { id:'lal-2028r2-orl', year:2028, round:2, originalTeam:'orl', protection:'none', label:'2028次轮（来自魔术）' },
    { id:'lal-2028r2-was', year:2028, round:2, originalTeam:'was', protection:'none', label:'2028次轮（来自奇才）' },
    { id:'lal-2030r1-lal', year:2030, round:1, originalTeam:'lal', protection:'none', label:'2030首轮（自有）' },
    { id:'lal-2031r1-lal', year:2031, round:1, originalTeam:'lal', protection:'none', label:'2031首轮（自有）' },
    { id:'lal-2032r1-lal', year:2032, round:1, originalTeam:'lal', protection:'none', label:'2032首轮（自有）' },
    { id:'lal-2032r2-lal', year:2032, round:2, originalTeam:'lal', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 灰熊 ==========
  mem: [
    { id:'mem-2026r1-mem', year:2026, round:1, originalTeam:'mem', protection:'none', label:'2026首轮（#3，自有）' },
    { id:'mem-2026r1-phx', year:2026, round:1, originalTeam:'phx', protection:'none', label:'2026首轮（#16，来自太阳）' },
    { id:'mem-2026r2-ind', year:2026, round:2, originalTeam:'ind', protection:'none', label:'2026次轮（#32，来自步行者）' },
    { id:'mem-2027r1-mem', year:2027, round:1, originalTeam:'mem', protection:'none', label:'2027首轮（自有）' },
    { id:'mem-2028r1-mem', year:2028, round:1, originalTeam:'mem', protection:'none', label:'2028首轮（自有）' },
    { id:'mem-2029r1-mem', year:2029, round:1, originalTeam:'mem', protection:'none', label:'2029首轮（自有）' },
    { id:'mem-2029r2-por', year:2029, round:2, originalTeam:'por', protection:'none', label:'2029次轮（来自开拓者）' },
    { id:'mem-2030r1-phx', year:2030, round:1, originalTeam:'phx', protection:'none', label:'2030首轮（来自太阳）' },
    { id:'mem-2030r2-mem', year:2030, round:2, originalTeam:'mem', protection:'none', label:'2030次轮（#31-#50顺位自有）' },
    { id:'mem-2031r1-mem', year:2031, round:1, originalTeam:'mem', protection:'none', label:'2031首轮（自有）' },
    { id:'mem-2031r2-ind', year:2031, round:2, originalTeam:'ind', protection:'none', label:'2031次轮（来自步行者）' },
    { id:'mem-2032r1-mem', year:2032, round:1, originalTeam:'mem', protection:'none', label:'2032首轮（自有）' },
    { id:'mem-2032r2-mem', year:2032, round:2, originalTeam:'mem', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 热火 ==========
  mia: [
    { id:'mia-2026r1-mia', year:2026, round:1, originalTeam:'mia', protection:'none', label:'2026首轮（#13，自有）' },
    { id:'mia-2026r2-gsw', year:2026, round:2, originalTeam:'gsw', protection:'none', label:'2026次轮（#41，来自勇士）' },
    { id:'mia-2027r1-mia', year:2027, round:1, originalTeam:'mia', protection:'top14', label:'2027首轮（#1-#14顺位自有，乐透保护）' },
    { id:'mia-2027r2-hou', year:2027, round:2, originalTeam:'hou', protection:'none', label:'2027次轮（来自火箭）' },
    { id:'mia-2027r2-nyk', year:2027, round:2, originalTeam:'nyk', protection:'none', label:'2027次轮（来自尼克斯）' },
    { id:'mia-2027r2-okc', year:2027, round:2, originalTeam:'okc', protection:'none', label:'2027次轮（来自雷霆）' },
    { id:'mia-2027r2-sas', year:2027, round:2, originalTeam:'sas', protection:'none', label:'2027次轮（来自马刺）' },
    { id:'mia-2029r1-mia', year:2029, round:1, originalTeam:'mia', protection:'none', label:'2029首轮（自有）' },
    { id:'mia-2030r1-mia', year:2030, round:1, originalTeam:'mia', protection:'none', label:'2030首轮（自有）' },
    { id:'mia-2031r1-mia', year:2031, round:1, originalTeam:'mia', protection:'none', label:'2031首轮（自有）' },
    { id:'mia-2031r2-ind', year:2031, round:2, originalTeam:'ind', protection:'none', label:'2031次轮（来自步行者）' },
    { id:'mia-2031r2-was', year:2031, round:2, originalTeam:'was', protection:'none', label:'2031次轮（来自奇才）' },
    { id:'mia-2032r1-mia', year:2032, round:1, originalTeam:'mia', protection:'none', label:'2032首轮（自有）' }
  ],

  // ========== 雄鹿 ==========
  mil: [
    { id:'mil-2026r1-mil', year:2026, round:1, originalTeam:'mil', protection:'none', label:'2026首轮（#10，自有）' },
    { id:'mil-2028r1-bkn', year:2028, round:1, originalTeam:'bkn', protection:'top8', label:'2028首轮（来自篮网，前8保护）' },
    { id:'mil-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，#9-#30，前8保护）' },
    { id:'mil-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'none', label:'2028首轮（来自太阳）' },
    { id:'mil-2028r1-was', year:2028, round:1, originalTeam:'was', protection:'none', label:'2028首轮（来自奇才）' },
    { id:'mil-2029r1-por', year:2029, round:1, originalTeam:'por', protection:'none', label:'2029首轮（来自开拓者）' },
    { id:'mil-2029r1-was', year:2029, round:1, originalTeam:'was', protection:'none', label:'2029首轮（来自奇才）' },
    { id:'mil-2029r2-det', year:2029, round:2, originalTeam:'det', protection:'none', label:'2029次轮（来自活塞）' },
    { id:'mil-2029r2-sac', year:2029, round:2, originalTeam:'sac', protection:'none', label:'2029次轮（来自国王）' },
    { id:'mil-2030r1-mil', year:2030, round:1, originalTeam:'mil', protection:'none', label:'2030首轮（自有）' },
    { id:'mil-2031r1-mil', year:2031, round:1, originalTeam:'mil', protection:'none', label:'2031首轮（自有）' },
    { id:'mil-2032r1-mil', year:2032, round:1, originalTeam:'mil', protection:'none', label:'2032首轮（自有）' }
  ],

  // ========== 森林狼 ==========
  min: [
    { id:'min-2026r1-det', year:2026, round:1, originalTeam:'det', protection:'none', label:'2026首轮（#28，来自活塞）' },
    { id:'min-2026r2-sas', year:2026, round:2, originalTeam:'sas', protection:'none', label:'2026次轮（#59，来自马刺）' },
    { id:'min-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'none', label:'2027首轮（来自太阳）' },
    { id:'min-2027r2-cle', year:2027, round:2, originalTeam:'cle', protection:'none', label:'2027次轮（来自骑士）' },
    { id:'min-2028r1-min', year:2028, round:1, originalTeam:'min', protection:'none', label:'2028首轮（自有）' },
    { id:'min-2029r1-min', year:2029, round:1, originalTeam:'min', protection:'top5', label:'2029首轮（#1-#5顺位自有，前5保护）' },
    { id:'min-2029r1-cha', year:2029, round:1, originalTeam:'cha', protection:'none', label:'2029首轮（来自黄蜂）' },
    { id:'min-2030r1-min', year:2030, round:1, originalTeam:'min', protection:'none', label:'2030首轮（自有）' },
    { id:'min-2030r1-dal', year:2030, round:1, originalTeam:'dal', protection:'none', label:'2030首轮（来自独行侠）' },
    { id:'min-2030r1-sas', year:2030, round:1, originalTeam:'sas', protection:'none', label:'2030首轮（来自马刺）' },
    { id:'min-2030r2-mem', year:2030, round:2, originalTeam:'mem', protection:'none', label:'2030次轮（来自灰熊，#51-#601）' },
    { id:'min-2031r2-det', year:2031, round:2, originalTeam:'det', protection:'none', label:'2031次轮（来自活塞）' },
    { id:'min-2032r2-min', year:2032, round:2, originalTeam:'min', protection:'none', label:'2032次轮（自有）' },
    { id:'min-2032r2-hou', year:2032, round:2, originalTeam:'hou', protection:'none', label:'2032次轮（来自火箭）' }
  ],

  // ========== 鹈鹕 ==========
  nop: [
    { id:'nop-2026r2-det', year:2026, round:2, originalTeam:'det', protection:'none', label:'2026次轮（#58，来自活塞）' },
    { id:'nop-2028r1-nop', year:2028, round:1, originalTeam:'nop', protection:'none', label:'2028首轮（自有）' },
    { id:'nop-2029r1-nop', year:2029, round:1, originalTeam:'nop', protection:'none', label:'2029首轮（自有）' },
    { id:'nop-2030r1-nop', year:2030, round:1, originalTeam:'nop', protection:'none', label:'2030首轮（自有）' },
    { id:'nop-2030r2-nop', year:2030, round:2, originalTeam:'nop', protection:'none', label:'2030次轮（自有）' },
    { id:'nop-2031r1-nop', year:2031, round:1, originalTeam:'nop', protection:'none', label:'2031首轮（自有）' },
    { id:'nop-2031r2-okc', year:2031, round:2, originalTeam:'okc', protection:'none', label:'2031次轮（来自雷霆）' },
    { id:'nop-2032r1-nop', year:2032, round:1, originalTeam:'nop', protection:'none', label:'2032首轮（自有）' },
    { id:'nop-2032r2-nop', year:2032, round:2, originalTeam:'nop', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 尼克斯 ==========
  nyk: [
    { id:'nyk-2026r1-nyk', year:2026, round:1, originalTeam:'nyk', protection:'none', label:'2026首轮（#24，自有）' },
    { id:'nyk-2026r2-was', year:2026, round:2, originalTeam:'was', protection:'none', label:'2026次轮（#31，来自奇才）' },
    { id:'nyk-2026r2-nyk', year:2026, round:2, originalTeam:'nyk', protection:'none', label:'2026次轮（#55，自有）' },
    { id:'nyk-2027r2-nyk', year:2027, round:2, originalTeam:'nyk', protection:'none', label:'2027次轮（自有）' },
    { id:'nyk-2027r2-hou', year:2027, round:2, originalTeam:'hou', protection:'none', label:'2027次轮（来自火箭）' },
    { id:'nyk-2027r2-mia', year:2027, round:2, originalTeam:'mia', protection:'none', label:'2027次轮（来自热火）' },
    { id:'nyk-2027r2-okc', year:2027, round:2, originalTeam:'okc', protection:'none', label:'2027次轮（来自雷霆）' },
    { id:'nyk-2028r1-bkn', year:2028, round:1, originalTeam:'bkn', protection:'top8', label:'2028首轮（来自篮网，前8保护）' },
    { id:'nyk-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，#9-#30，前8保护）' },
    { id:'nyk-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'none', label:'2028首轮（来自太阳）' },
    { id:'nyk-2028r2-bos', year:2028, round:2, originalTeam:'bos', protection:'none', label:'2028次轮（来自凯尔特人，#46-#60）' },
    { id:'nyk-2028r2-phx', year:2028, round:2, originalTeam:'phx', protection:'none', label:'2028次轮（来自太阳）' },
    { id:'nyk-2029r2-det', year:2029, round:2, originalTeam:'det', protection:'none', label:'2029次轮（来自活塞）' },
    { id:'nyk-2029r2-sac', year:2029, round:2, originalTeam:'sac', protection:'none', label:'2029次轮（来自国王）' },
    { id:'nyk-2030r1-nyk', year:2030, round:1, originalTeam:'nyk', protection:'none', label:'2030首轮（自有）' },
    { id:'nyk-2032r1-nyk', year:2032, round:1, originalTeam:'nyk', protection:'none', label:'2032首轮（自有）' },
    { id:'nyk-2032r2-nyk', year:2032, round:2, originalTeam:'nyk', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 雷霆 ==========
  okc: [
    { id:'okc-2026r1-lac', year:2026, round:1, originalTeam:'lac', protection:'none', label:'2026首轮（#12，来自快船）' },
    { id:'okc-2026r1-phi', year:2026, round:1, originalTeam:'phi', protection:'none', label:'2026首轮（#17，来自76人）' },
    { id:'okc-2026r2-dal', year:2026, round:2, originalTeam:'dal', protection:'none', label:'2026次轮（#37，来自独行侠）' },
    { id:'okc-2027r1-lac', year:2027, round:1, originalTeam:'lac', protection:'top4', label:'2027首轮（来自快船，前4保护）' },
    { id:'okc-2027r1-sas', year:2027, round:1, originalTeam:'sas', protection:'top4', label:'2027首轮（来自马刺，#17-#30，前4保护）' },
    { id:'okc-2027r2-hou', year:2027, round:2, originalTeam:'hou', protection:'none', label:'2027次轮（来自火箭）' },
    { id:'okc-2027r2-mia', year:2027, round:2, originalTeam:'mia', protection:'none', label:'2027次轮（来自热火）' },
    { id:'okc-2027r2-nyk', year:2027, round:2, originalTeam:'nyk', protection:'none', label:'2027次轮（来自尼克斯）' },
    { id:'okc-2028r1-okc', year:2028, round:1, originalTeam:'okc', protection:'top5', label:'2028首轮（自有，前5保护）' },
    { id:'okc-2028r2-okc', year:2028, round:2, originalTeam:'okc', protection:'none', label:'2028次轮（自有）' },
    { id:'okc-2028r2-mil', year:2028, round:2, originalTeam:'mil', protection:'none', label:'2028次轮（来自雄鹿）' },
    { id:'okc-2029r1-okc', year:2029, round:1, originalTeam:'okc', protection:'top5', label:'2029首轮（自有，前5保护）' },
    { id:'okc-2029r2-okc', year:2029, round:2, originalTeam:'okc', protection:'none', label:'2029次轮（自有）' },
    { id:'okc-2029r2-atl', year:2029, round:2, originalTeam:'atl', protection:'none', label:'2029次轮（来自老鹰）' },
    { id:'okc-2029r2-bos', year:2029, round:2, originalTeam:'bos', protection:'none', label:'2029次轮（来自凯尔特人）' },
    { id:'okc-2030r1-okc', year:2030, round:1, originalTeam:'okc', protection:'top5', label:'2030首轮（自有，前5保护）' },
    { id:'okc-2030r2-okc', year:2030, round:2, originalTeam:'okc', protection:'none', label:'2030次轮（自有）' },
    { id:'okc-2030r2-hou', year:2030, round:2, originalTeam:'hou', protection:'none', label:'2030次轮（来自火箭）' },
    { id:'okc-2031r1-okc', year:2031, round:1, originalTeam:'okc', protection:'none', label:'2031首轮（自有）' },
    { id:'okc-2031r2-okc', year:2031, round:2, originalTeam:'okc', protection:'none', label:'2031次轮（自有）' },
    { id:'okc-2031r2-orl', year:2031, round:2, originalTeam:'orl', protection:'none', label:'2031次轮（来自魔术）' },
    { id:'okc-2032r1-okc', year:2032, round:1, originalTeam:'okc', protection:'none', label:'2032首轮（自有）' },
    { id:'okc-2032r2-okc', year:2032, round:2, originalTeam:'okc', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 魔术 ==========
  orl: [
    { id:'orl-2026r2-orl', year:2026, round:2, originalTeam:'orl', protection:'none', label:'2026次轮（#46，自有）' },
    { id:'orl-2027r1-orl', year:2027, round:1, originalTeam:'orl', protection:'none', label:'2027首轮（自有）' },
    { id:'orl-2027r2-uta', year:2027, round:2, originalTeam:'uta', protection:'none', label:'2027次轮（来自爵士）' },
    { id:'orl-2028r2-orl', year:2028, round:2, originalTeam:'orl', protection:'none', label:'2028次轮（自有）' },
    { id:'orl-2028r2-was', year:2028, round:2, originalTeam:'was', protection:'none', label:'2028次轮（来自奇才）' },
    { id:'orl-2029r1-orl', year:2029, round:1, originalTeam:'orl', protection:'top2', label:'2029首轮（#1-#2顺位自有，前2保护）' },
    { id:'orl-2030r2-orl', year:2030, round:2, originalTeam:'orl', protection:'none', label:'2030次轮（自有）' },
    { id:'orl-2031r1-orl', year:2031, round:1, originalTeam:'orl', protection:'none', label:'2031首轮（自有）' },
    { id:'orl-2031r2-okc', year:2031, round:2, originalTeam:'okc', protection:'none', label:'2031次轮（来自雷霆）' },
    { id:'orl-2032r1-orl', year:2032, round:1, originalTeam:'orl', protection:'none', label:'2032首轮（自有）' },
    { id:'orl-2032r2-orl', year:2032, round:2, originalTeam:'orl', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 76人 ==========
  phi: [
    { id:'phi-2026r1-hou', year:2026, round:1, originalTeam:'hou', protection:'none', label:'2026首轮（#22，来自火箭）' },
    { id:'phi-2027r1-phi', year:2027, round:1, originalTeam:'phi', protection:'top4', label:'2027首轮（#1-#4顺位自有，前4保护）' },
    { id:'phi-2027r2-phx', year:2027, round:2, originalTeam:'phx', protection:'none', label:'2027次轮（来自太阳）' },
    { id:'phi-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（#1-#8顺位自有，前8保护）' },
    { id:'phi-2028r1-bkn', year:2028, round:1, originalTeam:'bkn', protection:'top8', label:'2028首轮（来自篮网，前8保护）' },
    { id:'phi-2028r1-nyk', year:2028, round:1, originalTeam:'nyk', protection:'top8', label:'2028首轮（来自尼克斯，前8保护）' },
    { id:'phi-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'top8', label:'2028首轮（来自太阳，前8保护）' },
    { id:'phi-2028r2-det', year:2028, round:2, originalTeam:'det', protection:'none', label:'2028次轮（来自活塞，#56-#60）' },
    { id:'phi-2028r2-gsw', year:2028, round:2, originalTeam:'gsw', protection:'none', label:'2028次轮（来自勇士）' },
    { id:'phi-2029r1-phi', year:2029, round:1, originalTeam:'phi', protection:'none', label:'2029首轮（自有）' },
    { id:'phi-2029r2-phi', year:2029, round:2, originalTeam:'phi', protection:'none', label:'2029次轮（自有）' },
    { id:'phi-2030r1-phi', year:2030, round:1, originalTeam:'phi', protection:'none', label:'2030首轮（自有）' },
    { id:'phi-2030r2-por', year:2030, round:2, originalTeam:'por', protection:'none', label:'2030次轮（来自开拓者）' },
    { id:'phi-2031r1-phi', year:2031, round:1, originalTeam:'phi', protection:'none', label:'2031首轮（自有）' },
    { id:'phi-2031r2-phi', year:2031, round:2, originalTeam:'phi', protection:'none', label:'2031次轮（自有）' },
    { id:'phi-2032r1-phi', year:2032, round:1, originalTeam:'phi', protection:'none', label:'2032首轮（自有）' },
    { id:'phi-2032r2-phi', year:2032, round:2, originalTeam:'phi', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 太阳 ==========
  phx: [
    { id:'phx-2026r2-phi', year:2026, round:2, originalTeam:'phi', protection:'none', label:'2026次轮（#47，来自76人）' },
    { id:'phx-2027r1-min', year:2027, round:1, originalTeam:'min', protection:'none', label:'2027首轮（来自森林狼）' },
    { id:'phx-2027r1-uta', year:2027, round:1, originalTeam:'uta', protection:'none', label:'2027首轮（来自爵士）' },
    { id:'phx-2027r2-was', year:2027, round:2, originalTeam:'was', protection:'none', label:'2027次轮（来自奇才）' },
    { id:'phx-2028r1-bkn', year:2028, round:1, originalTeam:'bkn', protection:'top8', label:'2028首轮（来自篮网，前8保护）' },
    { id:'phx-2028r1-nyk', year:2028, round:1, originalTeam:'nyk', protection:'top8', label:'2028首轮（来自尼克斯，前8保护）' },
    { id:'phx-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，#9-#30，前8保护）' },
    { id:'phx-2028r1-was', year:2028, round:1, originalTeam:'was', protection:'none', label:'2028首轮（来自奇才）' },
    { id:'phx-2028r2-nyk', year:2028, round:2, originalTeam:'nyk', protection:'none', label:'2028次轮（来自尼克斯）' },
    { id:'phx-2029r1-bkn', year:2029, round:1, originalTeam:'bkn', protection:'none', label:'2029首轮（来自篮网）' },
    { id:'phx-2029r1-hou', year:2029, round:1, originalTeam:'hou', protection:'none', label:'2029首轮（来自火箭）' },
    { id:'phx-2029r2-phx', year:2029, round:2, originalTeam:'phx', protection:'none', label:'2029次轮（自有）' },
    { id:'phx-2030r1-mem', year:2030, round:1, originalTeam:'mem', protection:'none', label:'2030首轮（来自灰熊）' },
    { id:'phx-2030r1-was', year:2030, round:1, originalTeam:'was', protection:'none', label:'2030首轮（来自奇才）' },
    { id:'phx-2030r2-was', year:2030, round:2, originalTeam:'was', protection:'none', label:'2030次轮（来自奇才）' },
    { id:'phx-2032r2-min', year:2032, round:2, originalTeam:'min', protection:'none', label:'2032次轮（来自森林狼）' }
  ],

  // ========== 开拓者 ==========
  por: [
    { id:'por-2027r1-por', year:2027, round:1, originalTeam:'por', protection:'top14', label:'2027首轮（#1-#14顺位自有，乐透保护）' },
    { id:'por-2027r2-atl', year:2027, round:2, originalTeam:'atl', protection:'none', label:'2027次轮（来自老鹰）' },
    { id:'por-2027r2-cha', year:2027, round:2, originalTeam:'cha', protection:'none', label:'2027次轮（来自黄蜂）' },
    { id:'por-2027r2-hou', year:2027, round:2, originalTeam:'hou', protection:'none', label:'2027次轮（来自火箭）' },
    { id:'por-2027r2-min', year:2027, round:2, originalTeam:'min', protection:'none', label:'2027次轮（来自森林狼）' },
    { id:'por-2028r1-por', year:2028, round:1, originalTeam:'por', protection:'top14', label:'2028首轮（#1-#14顺位自有，乐透保护）' },
    { id:'por-2028r1-orl', year:2028, round:1, originalTeam:'orl', protection:'none', label:'2028首轮（来自魔术）' },
    { id:'por-2028r2-sac', year:2028, round:2, originalTeam:'sac', protection:'none', label:'2028次轮（来自国王）' },
    { id:'por-2029r1-mil', year:2029, round:1, originalTeam:'mil', protection:'none', label:'2029首轮（来自雄鹿）' },
    { id:'por-2029r1-was', year:2029, round:1, originalTeam:'was', protection:'none', label:'2029首轮（来自奇才）' },
    { id:'por-2029r2-was', year:2029, round:2, originalTeam:'was', protection:'none', label:'2029次轮（来自奇才）' },
    { id:'por-2030r1-por', year:2030, round:1, originalTeam:'por', protection:'none', label:'2030首轮（自有）' },
    { id:'por-2030r2-was', year:2030, round:2, originalTeam:'was', protection:'none', label:'2030次轮（来自奇才）' },
    { id:'por-2031r1-por', year:2031, round:1, originalTeam:'por', protection:'none', label:'2031首轮（自有）' },
    { id:'por-2031r2-por', year:2031, round:2, originalTeam:'por', protection:'none', label:'2031次轮（自有）' },
    { id:'por-2032r1-por', year:2032, round:1, originalTeam:'por', protection:'none', label:'2032首轮（自有）' },
    { id:'por-2032r2-por', year:2032, round:2, originalTeam:'por', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 国王 ==========
  sac: [
    { id:'sac-2026r1-sac', year:2026, round:1, originalTeam:'sac', protection:'none', label:'2026首轮（#7，自有）' },
    { id:'sac-2026r2-sac', year:2026, round:2, originalTeam:'sac', protection:'none', label:'2026次轮（#34，自有）' },
    { id:'sac-2026r2-cha', year:2026, round:2, originalTeam:'cha', protection:'none', label:'2026次轮（#45，来自黄蜂）' },
    { id:'sac-2027r1-sac', year:2027, round:1, originalTeam:'sac', protection:'top16', label:'2027首轮（自有，前16保护）' },
    { id:'sac-2028r1-sac', year:2028, round:1, originalTeam:'sac', protection:'none', label:'2028首轮（自有）' },
    { id:'sac-2029r1-sac', year:2029, round:1, originalTeam:'sac', protection:'none', label:'2029首轮（自有）' },
    { id:'sac-2029r2-det', year:2029, round:2, originalTeam:'det', protection:'none', label:'2029次轮（来自活塞）' },
    { id:'sac-2029r2-nyk', year:2029, round:2, originalTeam:'nyk', protection:'none', label:'2029次轮（来自尼克斯）' },
    { id:'sac-2030r1-sac', year:2030, round:1, originalTeam:'sac', protection:'none', label:'2030首轮（自有）' },
    { id:'sac-2031r1-sac', year:2031, round:1, originalTeam:'sac', protection:'none', label:'2031首轮（自有）' },
    { id:'sac-2031r1-min', year:2031, round:1, originalTeam:'min', protection:'none', label:'2031首轮（来自森林狼）' },
    { id:'sac-2032r1-sac', year:2032, round:1, originalTeam:'sac', protection:'none', label:'2032首轮（自有）' },
    { id:'sac-2032r2-sac', year:2032, round:2, originalTeam:'sac', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 马刺 ==========
  sas: [
    { id:'sas-2026r1-atl', year:2026, round:1, originalTeam:'atl', protection:'none', label:'2026首轮（#20，来自老鹰）' },
    { id:'sas-2026r2-uta', year:2026, round:2, originalTeam:'uta', protection:'none', label:'2026次轮（#35，来自爵士）' },
    { id:'sas-2026r2-por', year:2026, round:2, originalTeam:'por', protection:'none', label:'2026次轮（#42，来自开拓者）' },
    { id:'sas-2026r2-mia', year:2026, round:2, originalTeam:'mia', protection:'none', label:'2026次轮（#44，来自热火）' },
    { id:'sas-2027r1-okc', year:2027, round:1, originalTeam:'okc', protection:'top16', label:'2027首轮（来自雷霆，前16保护）' },
    { id:'sas-2027r1-sac', year:2027, round:1, originalTeam:'sac', protection:'top16', label:'2027首轮（来自国王，前16保护）' },
    { id:'sas-2027r2-hou', year:2027, round:2, originalTeam:'hou', protection:'none', label:'2027次轮（来自火箭）' },
    { id:'sas-2027r2-mia', year:2027, round:2, originalTeam:'mia', protection:'none', label:'2027次轮（来自热火）' },
    { id:'sas-2027r2-okc', year:2027, round:2, originalTeam:'okc', protection:'none', label:'2027次轮（来自雷霆）' },
    { id:'sas-2028r1-sas', year:2028, round:1, originalTeam:'sas', protection:'none', label:'2028首轮（自有）' },
    { id:'sas-2028r2-sas', year:2028, round:2, originalTeam:'sas', protection:'none', label:'2028次轮（自有）' },
    { id:'sas-2028r2-min', year:2028, round:2, originalTeam:'min', protection:'none', label:'2028次轮（来自森林狼）' },
    { id:'sas-2029r1-sas', year:2029, round:1, originalTeam:'sas', protection:'none', label:'2029首轮（自有）' },
    { id:'sas-2029r2-sas', year:2029, round:2, originalTeam:'sas', protection:'none', label:'2029次轮（自有）' },
    { id:'sas-2029r2-lac', year:2029, round:2, originalTeam:'lac', protection:'none', label:'2029次轮（来自快船）' },
    { id:'sas-2030r1-dal', year:2030, round:1, originalTeam:'dal', protection:'none', label:'2030首轮（来自独行侠）' },
    { id:'sas-2030r1-min', year:2030, round:1, originalTeam:'min', protection:'none', label:'2030首轮（来自森林狼，#2-#30）' },
    { id:'sas-2030r2-sas', year:2030, round:2, originalTeam:'sas', protection:'none', label:'2030次轮（自有）' },
    { id:'sas-2030r2-cle', year:2030, round:2, originalTeam:'cle', protection:'none', label:'2030次轮（来自骑士）' },
    { id:'sas-2030r2-sac', year:2030, round:2, originalTeam:'sac', protection:'none', label:'2030次轮（来自国王）' },
    { id:'sas-2031r1-sas', year:2031, round:1, originalTeam:'sas', protection:'none', label:'2031首轮（自有）' },
    { id:'sas-2031r2-sas', year:2031, round:2, originalTeam:'sas', protection:'none', label:'2031次轮（自有）' },
    { id:'sas-2032r1-sas', year:2032, round:1, originalTeam:'sas', protection:'none', label:'2032首轮（自有）' },
    { id:'sas-2032r2-sas', year:2032, round:2, originalTeam:'sas', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 猛龙 ==========
  tor: [
    { id:'tor-2026r1-tor', year:2026, round:1, originalTeam:'tor', protection:'none', label:'2026首轮（#19，自有）' },
    { id:'tor-2026r2-tor', year:2026, round:2, originalTeam:'tor', protection:'none', label:'2026次轮（#50，自有）' },
    { id:'tor-2027r1-tor', year:2027, round:1, originalTeam:'tor', protection:'none', label:'2027首轮（自有）' },
    { id:'tor-2027r2-tor', year:2027, round:2, originalTeam:'tor', protection:'none', label:'2027次轮（自有）' },
    { id:'tor-2028r1-tor', year:2028, round:1, originalTeam:'tor', protection:'none', label:'2028首轮（自有）' },
    { id:'tor-2028r2-tor', year:2028, round:2, originalTeam:'tor', protection:'none', label:'2028次轮（自有）' },
    { id:'tor-2029r1-tor', year:2029, round:1, originalTeam:'tor', protection:'none', label:'2029首轮（自有）' },
    { id:'tor-2029r2-tor', year:2029, round:2, originalTeam:'tor', protection:'none', label:'2029次轮（自有）' },
    { id:'tor-2030r1-tor', year:2030, round:1, originalTeam:'tor', protection:'none', label:'2030首轮（自有）' },
    { id:'tor-2030r2-tor', year:2030, round:2, originalTeam:'tor', protection:'none', label:'2030次轮（自有）' },
    { id:'tor-2031r1-tor', year:2031, round:1, originalTeam:'tor', protection:'none', label:'2031首轮（自有）' },
    { id:'tor-2032r1-tor', year:2032, round:1, originalTeam:'tor', protection:'none', label:'2032首轮（自有）' },
    { id:'tor-2032r2-tor', year:2032, round:2, originalTeam:'tor', protection:'none', label:'2032次轮（自有）' }
  ],

  // ========== 爵士 ==========
  uta: [
    { id:'uta-2026r1-uta', year:2026, round:1, originalTeam:'uta', protection:'none', label:'2026首轮（#2，自有）' },
    { id:'uta-2027r1-phx', year:2027, round:1, originalTeam:'phx', protection:'top4', label:'2027首轮（来自太阳，前4保护）' },
    { id:'uta-2027r2-lac', year:2027, round:2, originalTeam:'lac', protection:'none', label:'2027次轮（来自快船）' },
    { id:'uta-2027r2-orl', year:2027, round:2, originalTeam:'orl', protection:'none', label:'2027次轮（来自魔术）' },
    { id:'uta-2028r1-uta', year:2028, round:1, originalTeam:'uta', protection:'none', label:'2028首轮（自有）' },
    { id:'uta-2028r2-det', year:2028, round:2, originalTeam:'det', protection:'none', label:'2028次轮（来自活塞，#31-#55）' },
    { id:'uta-2028r2-lac', year:2028, round:2, originalTeam:'lac', protection:'none', label:'2028次轮（来自快船）' },
    { id:'uta-2029r1-cha', year:2029, round:1, originalTeam:'cha', protection:'none', label:'2029首轮（来自黄蜂）' },
    { id:'uta-2029r2-uta', year:2029, round:2, originalTeam:'uta', protection:'none', label:'2029次轮（自有）' },
    { id:'uta-2030r1-uta', year:2030, round:1, originalTeam:'uta', protection:'none', label:'2030首轮（自有）' },
    { id:'uta-2030r2-cha', year:2030, round:2, originalTeam:'cha', protection:'none', label:'2030次轮（来自黄蜂）' },
    { id:'uta-2031r1-uta', year:2031, round:1, originalTeam:'uta', protection:'none', label:'2031首轮（自有）' },
    { id:'uta-2031r2-uta', year:2031, round:2, originalTeam:'uta', protection:'none', label:'2031次轮（自有）' },
    { id:'uta-2031r2-cle', year:2031, round:2, originalTeam:'cle', protection:'none', label:'2031次轮（来自骑士）' },
    { id:'uta-2032r1-uta', year:2032, round:1, originalTeam:'uta', protection:'none', label:'2032首轮（自有）' }
  ],

  // ========== 奇才 ==========
  was: [
    { id:'was-2026r1-was', year:2026, round:1, originalTeam:'was', protection:'none', label:'2026首轮（#1，自有）' },
    { id:'was-2026r2-min', year:2026, round:2, originalTeam:'min', protection:'none', label:'2026次轮（#51，来自森林狼）' },
    { id:'was-2026r2-okc', year:2026, round:2, originalTeam:'okc', protection:'none', label:'2026次轮（#60，来自雷霆）' },
    { id:'was-2027r1-was', year:2027, round:1, originalTeam:'was', protection:'none', label:'2027首轮（自有）' },
    { id:'was-2027r2-dal', year:2027, round:2, originalTeam:'dal', protection:'none', label:'2027次轮（来自独行侠）' },
    { id:'was-2028r1-bkn', year:2028, round:1, originalTeam:'bkn', protection:'top8', label:'2028首轮（来自篮网，前8保护）' },
    { id:'was-2028r1-mil', year:2028, round:1, originalTeam:'mil', protection:'top8', label:'2028首轮（来自雄鹿，前8保护）' },
    { id:'was-2028r1-phi', year:2028, round:1, originalTeam:'phi', protection:'top8', label:'2028首轮（来自76人，#9-#30，前8保护）' },
    { id:'was-2028r1-phx', year:2028, round:1, originalTeam:'phx', protection:'none', label:'2028首轮（来自太阳）' },
    { id:'was-2028r2-den', year:2028, round:2, originalTeam:'den', protection:'none', label:'2028次轮（来自掘金，#34-#60）' },
    { id:'was-2028r2-orl', year:2028, round:2, originalTeam:'orl', protection:'none', label:'2028次轮（来自魔术）' },
    { id:'was-2029r1-was', year:2029, round:1, originalTeam:'was', protection:'none', label:'2029首轮（自有）' },
    { id:'was-2029r1-mil', year:2029, round:1, originalTeam:'mil', protection:'none', label:'2029首轮（来自雄鹿）' },
    { id:'was-2029r1-por', year:2029, round:1, originalTeam:'por', protection:'none', label:'2029首轮（来自开拓者）' },
    { id:'was-2029r2-hou', year:2029, round:2, originalTeam:'hou', protection:'none', label:'2029次轮（来自火箭）' },
    { id:'was-2029r2-por', year:2029, round:2, originalTeam:'por', protection:'none', label:'2029次轮（来自开拓者）' },
    { id:'was-2030r1-phx', year:2030, round:1, originalTeam:'phx', protection:'top20', label:'2030首轮（来自太阳，前20保护）' },
    { id:'was-2031r1-was', year:2031, round:1, originalTeam:'was', protection:'none', label:'2031首轮（自有）' },
    { id:'was-2031r2-was', year:2031, round:2, originalTeam:'was', protection:'none', label:'2031次轮（自有）' },
    { id:'was-2031r2-ind', year:2031, round:2, originalTeam:'ind', protection:'none', label:'2031次轮（来自步行者）' },
    { id:'was-2032r1-was', year:2032, round:1, originalTeam:'was', protection:'none', label:'2032首轮（自有）' },
    { id:'was-2032r2-was', year:2032, round:2, originalTeam:'was', protection:'none', label:'2032次轮（自有）' }
  ],
};
