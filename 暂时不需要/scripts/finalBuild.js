/**
 * Final build: merge API cache + Kaggle data into complete offline HTML.
 * Usage: node scripts/finalBuild.js
 */
const fs = require('fs'), path = require('path');
const CSV_DIR = path.join(process.env.USERPROFILE, '.cache', 'kagglehub', 'datasets', 'wyattowalsh', 'basketball', 'versions', '231', 'csv');
const CACHE = path.join(__dirname, '..', 'build-cache');

function parseCsv(file) {
  const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const vals = [];
    let i = 0, cur = '';
    while (i < line.length) {
      if (line[i] === '"') { i++; while (i < line.length && line[i] !== '"') { cur += line[i]; i++; } i++; }
      else if (line[i] === ',') { vals.push(cur); cur = ''; i++; }
      else { cur += line[i]; i++; }
    }
    vals.push(cur);
    const obj = {};
    headers.forEach((h, idx) => obj[h.trim()] = (vals[idx] || '').trim());
    return obj;
  });
}

const NBA_TEAMS = [
  {teamId:1610612737,abbrev:'ATL',fullName:'Atlanta Hawks'},{teamId:1610612738,abbrev:'BOS',fullName:'Boston Celtics'},
  {teamId:1610612739,abbrev:'CLE',fullName:'Cleveland Cavaliers'},{teamId:1610612740,abbrev:'NOP',fullName:'New Orleans Pelicans'},
  {teamId:1610612741,abbrev:'CHI',fullName:'Chicago Bulls'},{teamId:1610612742,abbrev:'DAL',fullName:'Dallas Mavericks'},
  {teamId:1610612743,abbrev:'DEN',fullName:'Denver Nuggets'},{teamId:1610612744,abbrev:'GSW',fullName:'Golden State Warriors'},
  {teamId:1610612745,abbrev:'HOU',fullName:'Houston Rockets'},{teamId:1610612746,abbrev:'LAC',fullName:'LA Clippers'},
  {teamId:1610612747,abbrev:'LAL',fullName:'Los Angeles Lakers'},{teamId:1610612748,abbrev:'MIA',fullName:'Miami Heat'},
  {teamId:1610612749,abbrev:'MIL',fullName:'Milwaukee Bucks'},{teamId:1610612750,abbrev:'MIN',fullName:'Minnesota Timberwolves'},
  {teamId:1610612751,abbrev:'BKN',fullName:'Brooklyn Nets'},{teamId:1610612752,abbrev:'NYK',fullName:'New York Knicks'},
  {teamId:1610612753,abbrev:'ORL',fullName:'Orlando Magic'},{teamId:1610612754,abbrev:'IND',fullName:'Indiana Pacers'},
  {teamId:1610612755,abbrev:'PHI',fullName:'Philadelphia 76ers'},{teamId:1610612756,abbrev:'PHX',fullName:'Phoenix Suns'},
  {teamId:1610612757,abbrev:'POR',fullName:'Portland Trail Blazers'},{teamId:1610612758,abbrev:'SAC',fullName:'Sacramento Kings'},
  {teamId:1610612759,abbrev:'SAS',fullName:'San Antonio Spurs'},{teamId:1610612760,abbrev:'OKC',fullName:'Oklahoma City Thunder'},
  {teamId:1610612761,abbrev:'TOR',fullName:'Toronto Raptors'},{teamId:1610612762,abbrev:'UTA',fullName:'Utah Jazz'},
  {teamId:1610612763,abbrev:'MEM',fullName:'Memphis Grizzlies'},{teamId:1610612764,abbrev:'WAS',fullName:'Washington Wizards'},
  {teamId:1610612765,abbrev:'DET',fullName:'Detroit Pistons'},{teamId:1610612766,abbrev:'CHA',fullName:'Charlotte Hornets'},
];

const TID_MAP = {};
NBA_TEAMS.forEach(t => TID_MAP[t.teamId] = t);
const ABB_MAP = {};
NBA_TEAMS.forEach(t => ABB_MAP[t.abbrev] = t);

function build() {
  console.log('=== Final Build ===\n');

  // 1. Load API data
  const apiPlayers = JSON.parse(fs.readFileSync(path.join(CACHE, 'fullBuild.json'), 'utf-8'));
  console.log(`API validated: ${apiPlayers.length}`);

  const apiMap = new Map(apiPlayers.map(p => [String(p[0]), p]));

  // 2. Load Kaggle data
  const kaggle = parseCsv(path.join(CSV_DIR, 'common_player_info.csv'));
  console.log(`Kaggle players: ${kaggle.length}`);

  // 3. Merge: API data for team history + stats, Kaggle for draft/country
  const merged = [];
  const teamIds = new Set(NBA_TEAMS.map(t => t.teamId));
  const seen = new Set();

  // First pass: API data (already has best info)
  for (const p of apiPlayers) {
    merged.push(p);
    seen.add(String(p[0]));
  }

  // Second pass: Kaggle players not in API
  let added = 0;
  for (const k of kaggle) {
    const pid = parseInt(k.person_id);
    if (seen.has(k.person_id)) continue;
    seen.add(k.person_id);

    // Current team
    const teamId = parseInt(k.team_id);
    const teams = teamId && teamIds.has(teamId) ? [teamId] : [];
    const abbrev = k.team_abbreviation || '';

    // Compute player bitmask (draft round + country)
    let pbm = 0;
    const draftRound = parseInt(k.draft_round);
    if (draftRound === 1) pbm |= (1 << 15); // first_round_pick
    if (!draftRound || draftRound === 0) pbm |= (1 << 16); // undrafted
    const country = (k.country || '').toLowerCase();
    if (country && !['usa','united states',''].includes(country)) pbm |= (1 << 14); // born_outside_us

    merged.push([pid, k.display_first_last || `${k.first_name} ${k.last_name}`, abbrev, teams, [], pbm, []]);
    added++;
  }

  console.log(`Total validated: ${merged.length}`);

  // 4. Build search list (all unique players)
  const allPlayers = JSON.parse(fs.readFileSync(path.join(CACHE, 'players.json'), 'utf-8'));
  const searchIds = new Set();
  const searchList = [];
  for (const p of allPlayers) {
    if (!searchIds.has(p.pid)) {
      searchIds.add(p.pid);
      searchList.push([p.pid, p.name, p.abbrev || '']);
    }
  }
  // Add any from Kaggle not in allPlayers
  for (const k of kaggle) {
    const pid = parseInt(k.person_id);
    if (!searchIds.has(pid)) {
      searchIds.add(pid);
      searchList.push([pid, k.display_first_last || `${k.first_name} ${k.last_name}`, k.team_abbreviation || '']);
    }
  }
  console.log(`Searchable: ${searchList.length}`);

  // 5. Generate HTML
  console.log('\nGenerating HTML...');
  const css = fs.readFileSync(path.join(CACHE, 'style.css'), 'utf-8');
  const body = fs.readFileSync(path.join(CACHE, 'body.html'), 'utf-8');
  const gj = fs.readFileSync(path.join(CACHE, 'game.js'), 'utf-8');

  const html = buildHtml(merged, searchList, css, body, gj);
  const outFile = path.join(__dirname, '..', 'public', 'index.html');
  fs.writeFileSync(outFile, html);
  console.log(`Done! ${outFile} (${Math.round(html.length/1024)}KB)`);
}

function buildHtml(pd, sl, css, body, gj) {
  const cats = [{"id":"20_ppg","label":"20+ PPG","shortLabel":"20+ PTS","type":"stat_season","statConfig":{"field":"PTS","operator":">=","threshold":20,"perGame":true}},{"id":"25_ppg","label":"25+ PPG","shortLabel":"25+ PTS","type":"stat_season","statConfig":{"field":"PTS","operator":">=","threshold":25,"perGame":true}},{"id":"30_ppg","label":"30+ PPG","shortLabel":"30+ PTS","type":"stat_season","statConfig":{"field":"PTS","operator":">=","threshold":30,"perGame":true}},{"id":"10_rpg","label":"10+ RPG","shortLabel":"10+ REB","type":"stat_season","statConfig":{"field":"REB","operator":">=","threshold":10,"perGame":true}},{"id":"5_apg","label":"5+ APG","shortLabel":"5+ AST","type":"stat_season","statConfig":{"field":"AST","operator":">=","threshold":5,"perGame":true}},{"id":"10_apg","label":"10+ APG","shortLabel":"10+ AST","type":"stat_season","statConfig":{"field":"AST","operator":">=","threshold":10,"perGame":true}},{"id":"1_spg","label":"1+ SPG","shortLabel":"1+ STL","type":"stat_season","statConfig":{"field":"STL","operator":">=","threshold":1,"perGame":true}},{"id":"2_spg","label":"2+ SPG","shortLabel":"2+ STL","type":"stat_season","statConfig":{"field":"STL","operator":">=","threshold":2,"perGame":true}},{"id":"1_bpg","label":"1+ BPG","shortLabel":"1+ BLK","type":"stat_season","statConfig":{"field":"BLK","operator":">=","threshold":1,"perGame":true}},{"id":"50_fg","label":"50+ FG%","shortLabel":"50+ FG%","type":"stat_season","statConfig":{"field":"FG_PCT","operator":">=","threshold":0.5,"perGame":true}},{"id":"40_3p","label":"40+ 3P%","shortLabel":"40+ 3P%","type":"stat_season","statConfig":{"field":"FG3_PCT","operator":">=","threshold":0.4,"perGame":true}},{"id":"80_ft","label":"80+ FT%","shortLabel":"80+ FT%","type":"stat_season","statConfig":{"field":"FT_PCT","operator":">=","threshold":0.8,"perGame":true}},{"id":"20000_pts","label":"20,000+ Points","shortLabel":"20K Pts","type":"stat_career","statConfig":{"field":"PTS","operator":">=","threshold":20000,"perGame":false}},{"id":"10000_reb","label":"10,000+ Rebounds","shortLabel":"10K Reb","type":"stat_career","statConfig":{"field":"REB","operator":">=","threshold":10000,"perGame":false}},{"id":"5000_ast","label":"5,000+ Assists","shortLabel":"5K Ast","type":"stat_career","statConfig":{"field":"AST","operator":">=","threshold":5000,"perGame":false}},{"id":"1000_stl","label":"1,000+ Steals","shortLabel":"1K Stl","type":"stat_career","statConfig":{"field":"STL","operator":">=","threshold":1000,"perGame":false}},{"id":"1000_blk","label":"1,000+ Blocks","shortLabel":"1K Blk","type":"stat_career","statConfig":{"field":"BLK","operator":">=","threshold":1000,"perGame":false}},{"id":"mvp","label":"MVP","shortLabel":"MVP","type":"award","awardType":"mvp"},{"id":"all_star","label":"All-Star","shortLabel":"All-Star","type":"award","awardType":"all_star"},{"id":"champion","label":"Champion","shortLabel":"Champ","type":"award","awardType":"champion"},{"id":"hall_of_fame","label":"Hall of Fame","shortLabel":"HOF","type":"award","awardType":"hall_of_fame"},{"id":"dpoy","label":"DPOY","shortLabel":"DPOY","type":"award","awardType":"dpoy"},{"id":"roty","label":"Rookie of the Year","shortLabel":"ROTY","type":"award","awardType":"roty"},{"id":"finals_mvp","label":"Finals MVP","shortLabel":"Finals MVP","type":"award","awardType":"finals_mvp"},{"id":"all_nba","label":"All-NBA","shortLabel":"All-NBA","type":"award","awardType":"all_nba"},{"id":"only_one_team","label":"Only 1 Team","shortLabel":"1 Team","type":"background","backgroundType":"only_one_team"},{"id":"born_outside_us","label":"Born Outside US","shortLabel":"Non-US","type":"background","backgroundType":"born_outside_us"},{"id":"first_round_pick","label":"1st Round Pick","shortLabel":"1st Rd","type":"draft","draftType":"first_round"},{"id":"undrafted","label":"Undrafted","shortLabel":"Undrafted","type":"draft","draftType":"undrafted"}];

  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">\n<title>Immaculate Grid - Basketball</title>\n<style>'+css+'</style></head><body>'+body+'<script>\nvar PD='+JSON.stringify(pd)+';\nvar SL='+JSON.stringify(sl)+';\nvar TD='+JSON.stringify(NBA_TEAMS)+';\n'+gj+'\nvar SB={"20_ppg":0,"25_ppg":1,"30_ppg":2,"10_rpg":3,"5_apg":4,"10_apg":5,"1_spg":6,"2_spg":7,"1_bpg":8,"50_fg":9,"40_3p":10,"80_ft":11};\nvar PB={"20000_pts":0,"10000_reb":1,"5000_ast":2,"1000_stl":3,"1000_blk":4,"mvp":5,"all_star":6,"champion":7,"hall_of_fame":8,"dpoy":9,"roty":10,"finals_mvp":11,"all_nba":12,"only_one_team":13,"born_outside_us":14,"first_round_pick":15,"undrafted":16};\nvar OC='+JSON.stringify(cats)+';\nfunction sr(s){return function(){s=(s*1664525+1013904223)&0x7fffffff;return s/0x7fffffff;};}\nfunction gds(s){var h=0,i;for(i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return Math.abs(h);}\nfunction sf(a,r){var x=[].concat(a),i,j;for(i=x.length-1;i>0;i--){j=Math.floor(r()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}\nfunction genG(sd){\n  var dd=!!sd,ds=sd||new Date().toISOString().split("T")[0],sn=sd?gds(ds):Date.now(),r=dd?sr(sn):Math.random,\n      st=sf(TD,r),oc2=sf(OC,r),cr=r(),tc=cr<0.4?3:(cr<0.7?2:1);\n  function tm(t){return{id:t.abbrev.toLowerCase(),label:t.fullName,shortLabel:t.abbrev,type:"team",teamId:t.teamId,teamAbbrev:t.abbrev,logoUrl:"https://cdn.nba.com/logos/nba/"+t.teamId+"/global/L/logo.svg"};}\n  var rts=st.slice(0,6),rns=oc2.slice(0,6),rws=sf([].concat(rts.slice(0,tc).map(tm),rns.slice(0,3-tc)),r);\n  var cts=st.slice(tc,tc+6),cns=oc2.slice(3-tc,(3-tc)+6),cls=sf([].concat(cts.slice(0,3-tc).map(tm),cns.slice(0,tc)),r);\n  return{id:dd?ds:"r-"+Date.now(),date:ds,rows:rws,columns:cls};\n}\nfunction so(q,lim){\n  if(!q||q.length<2)return[];q=q.toLowerCase().trim();\n  var sc=[],i,p,fn,ln,s;\n  for(i=0;i<SL.length;i++){p=SL[i];fn=p[1].toLowerCase();if(!fn.includes(q))continue;\n    ln=fn.split(" ").pop();s=100;\n    if(ln===q)s=0;else if(ln.startsWith(q))s=10;else if(ln.includes(q))s=20;else if(fn.startsWith(q))s=30;else s=50;\n    sc.push({i:i,s:s});}\n  sc.sort(function(a,b){return a.s-b.s||SL[a.i][1].localeCompare(SL[b.i][1]);});\n  return sc.slice(0,lim||10).map(function(x){var p=SL[x.i];return{playerId:p[0],fullName:p[1],headshotUrl:"https://cdn.nba.com/headshots/nba/latest/260x190/"+p[0]+".png",teamAbbrev:p[2],teamId:0,firstName:p[1].split(" ")[0].toLowerCase(),lastName:(p[1].split(" ").slice(1).join(" ")||p[1]).toLowerCase()};});\n}\nfunction cc(p,cat,rc,cc2){\n  if(!cat||!p)return false;\n  var tid=p[3],tbm=p[4],pbm=p[5];\n  switch(cat.type){\n    case"team":return tid.length===0?false:tid.indexOf(cat.teamId)>=0;\n    case"stat_season":\n      var tc=rc.type==="team"?rc:(cc2.type==="team"?cc2:null),bt=SB[cat.id];\n      if(bt===undefined)return false;\n      if(tc){var ix=tid.indexOf(tc.teamId);return ix>=0&&(tbm[ix]&(1<<bt))!==0;}\n      for(var i=0;i<tbm.length;i++){if(tbm[i]&(1<<bt))return true;}return false;\n    default:var bt=PB[cat.id];return bt!==undefined&&(pbm&(1<<bt))!==0;\n  }\n}\nfunction vo(pid,rc,cc2){\n  var p=PD.find(function(d){return d[0]===pid;});\n  if(!p)return{valid:false,player:null};\n  if(!cc(p,rc,rc,cc2)||!cc(p,cc2,rc,cc2))return{valid:false,player:null};\n  return{valid:true,player:{playerId:pid,fullName:p[1],headshotUrl:"https://cdn.nba.com/headshots/nba/latest/260x190/"+pid+".png",teamIds:p[3],teamAbbrevs:p[3].map(function(t){var tx=TD.find(function(tm){return tm.teamId===t;});return tx?tx.abbrev:"";}).filter(Boolean),teamLogos:p[3].map(function(t){return "https://cdn.nba.com/logos/nba/"+t+"/global/L/logo.svg";})}};\n}\nAPI.getTodayGrid=function(){return Promise.resolve(genG(new Date().toISOString().split("T")[0]));};\nAPI.getRandomGrid=function(){return Promise.resolve(genG(null));};\nAPI.searchPlayers=function(q,l){return Promise.resolve(so(q,l));};\nAPI.validateAnswer=function(pid,rc,cc2){return Promise.resolve(vo(pid,rc,cc2));};\nAPI.submitAnswer=function(gid,r,c,pid){\n  try{var k="igr_"+gid+"_"+r+"_"+c,d=JSON.parse(localStorage.getItem(k)||"{}");d[pid]=(d[pid]||0)+1;localStorage.setItem(k,JSON.stringify(d));\n  var t=Object.values(d).reduce(function(a,b){return a+b;},0);return Promise.resolve({rarity:Math.round((d[pid]/t)*1000)/10});}catch(e){return Promise.resolve({rarity:null});}\n};\nAPI.healthCheck=function(){return Promise.resolve(true);};\nconsole.log("Ready: "+SL.length+" players, "+PD.length+" validated");\n</script></body></html>';
}

build();
