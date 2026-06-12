const express = require('express');
const path = require('path');
const fs = require('fs');

// ─── 加载数据 ───
const dataDir = path.join(__dirname, '..', 'data');
const TD = JSON.parse(fs.readFileSync(path.join(dataDir, 'TD.json'), 'utf-8'));
const TL = JSON.parse(fs.readFileSync(path.join(dataDir, 'TL.json'), 'utf-8'));
const SL = JSON.parse(fs.readFileSync(path.join(dataDir, 'SL.json'), 'utf-8'));
const PD = JSON.parse(fs.readFileSync(path.join(dataDir, 'PD.json'), 'utf-8'));
const CN = JSON.parse(fs.readFileSync(path.join(dataDir, 'CN.json'), 'utf-8'));
const RR = JSON.parse(fs.readFileSync(path.join(dataDir, 'RR.json'), 'utf-8'));
const SB = JSON.parse(fs.readFileSync(path.join(dataDir, 'SB.json'), 'utf-8'));
const PB = JSON.parse(fs.readFileSync(path.join(dataDir, 'PB.json'), 'utf-8'));

// ─── 核心逻辑（从原 index.html 移植） ───

// Bitmask 索引
// SB: stat_season category bitmask mapping
// PB: player career bitmask mapping

// 类别检查：球员是否匹配某个分类
function cc(p, cat, rc, cc2) {
  if (!cat || !p) return false;
  const tid = p[3], tbm = p[4], pbm = p[5];
  switch (cat.type) {
    case 'team':
      return tid.length === 0 ? false : tid.indexOf(cat.teamId) >= 0;
    case 'stat_season': {
      const tc = rc.type === 'team' ? rc : (cc2.type === 'team' ? cc2 : null);
      const bt = SB[cat.id];
      if (bt === undefined) return false;
      if (tc) {
        const ix = tid.indexOf(tc.teamId);
        return ix >= 0 && (tbm[ix] & (1 << bt)) !== 0;
      }
      for (let i = 0; i < tbm.length; i++) {
        if (tbm[i] & (1 << bt)) return true;
      }
      return false;
    }
    default: {
      const bt = PB[cat.id];
      return bt !== undefined && (pbm & (1 << bt)) !== 0;
    }
  }
}

// 验证球员是否满足行列条件
function vo(pid, rc, cc2) {
  const p = PD.find(d => d[0] === pid);
  if (!p) return { valid: false, player: null };
  if (!cc(p, rc, rc, cc2) || !cc(p, cc2, rc, cc2)) return { valid: false, player: null };
  const rk = rc.teamId + '_' + cc2.teamId;
  const pairRarity = RR[rk] !== undefined ? RR[rk] : 50;
  return {
    valid: true,
    pairRarity,
    player: {
      playerId: pid,
      fullName: p[1],
      headshotUrl: `https://cdn.nba.com/headshots/nba/latest/260x190/${pid}.png`,
      teamIds: p[3],
      teamAbbrevs: p[3].map(t => {
        const tx = TD.find(tm => tm.teamId === t);
        return tx ? tx.abbrev : '';
      }).filter(Boolean),
      teamLogos: p[3].map(t => {
        const tx = TD.find(tm => tm.teamId === t);
        return tx ? (TL[tx.abbrev] || `https://cdn.nba.com/logos/nba/${t}/global/L/logo.svg`) : '';
      })
    }
  };
}

// 搜索球员
function so(q, lim) {
  if (!q || q.length < 2) return [];
  q = q.toLowerCase().trim();
  const sc = [];
  for (let i = 0; i < SL.length; i++) {
    const p = SL[i];
    const fn = p[1].toLowerCase();
    const cn = CN[p[0]] || '';
    const cnl = cn.toLowerCase();
    if (!fn.includes(q) && !cnl.includes(q)) continue;
    const ln = fn.split(' ').pop();
    let s = 100;
    if (ln === q) s = 0;
    else if (ln.startsWith(q)) s = 10;
    else if (ln.includes(q)) s = 20;
    else if (fn.startsWith(q)) s = 30;
    else if (cnl.startsWith(q)) s = 25;
    else if (cnl.includes(q)) s = 35;
    else s = 50;
    sc.push({ i, s });
  }
  sc.sort((a, b) => a.s - b.s || SL[a.i][1].localeCompare(SL[b.i][1]));
  return sc.slice(0, lim || 10).map(x => {
    const p = SL[x.i];
    const cname = CN[p[0]] || '';
    return {
      playerId: p[0],
      fullName: cname ? `${cname} (${p[1]})` : p[1],
      headshotUrl: `https://cdn.nba.com/headshots/nba/latest/260x190/${p[0]}.png`,
      teamAbbrev: p[2],
      teamId: 0,
      firstName: p[1].split(' ')[0].toLowerCase(),
      lastName: (p[1].split(' ').slice(1).join(' ') || p[1]).toLowerCase()
    };
  });
}

// ─── 简单种子随机数生成器（替代 seedrandom） ───
function seedrandom(seed) {
  let s = seed ? String(seed) : String(Date.now());
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return function() {
    h = (h * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (h >>> 0) / 0xFFFFFFFF;
  };
}

// Grid 生成
const _tpCache = (() => {
  const c = {};
  for (let i = 0; i < PD.length; i++) {
    const tids = PD[i][3];
    for (let pi = 0; pi < tids.length; pi++) {
      if (!c[tids[pi]]) c[tids[pi]] = [];
      c[tids[pi]].push(PD[i][0]);
    }
  }
  return c;
})();

function gds(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function sf(a, r) {
  const x = [].concat(a);
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

function genG(sd) {
  const rng = seedrandom(sd || String(Date.now()));
  const used = {};
  function pick(arr) {
    if (arr.length === 0) return null;
    const pool = arr.filter(x => !used[x.id]);
    if (pool.length === 0) return null;
    return pool[Math.floor(rng() * pool.length)];
  }
  // Pick 2 random teams for rows and columns
  const teams = sf(TD.slice(), () => rng());
  const rowTeam = teams[0];
  const colTeam = teams[1];
  // Pick a random player for the intersection cell to ensure at least one valid
  const intersectionCandidates = _tpCache[rowTeam.teamId]?.filter(pid =>
    _tpCache[colTeam.teamId]?.includes(pid)
  ) || [];
  return {
    id: sd || `random_${Date.now()}`,
    rows: [
      { id: rowTeam.abbrev.toLowerCase(), label: rowTeam.fullName, shortLabel: rowTeam.abbrev, type: 'team', teamId: rowTeam.teamId, teamAbbrev: rowTeam.abbrev, logoUrl: TL[rowTeam.abbrev] || '' },
      { id: 'pick2', label: '选择第二个队伍', shortLabel: '?', type: 'placeholder' },
      { id: 'pick3', label: '选择第三个队伍', shortLabel: '?', type: 'placeholder' }
    ],
    columns: [
      { id: colTeam.abbrev.toLowerCase(), label: colTeam.fullName, shortLabel: colTeam.abbrev, type: 'team', teamId: colTeam.teamId, teamAbbrev: colTeam.abbrev, logoUrl: TL[colTeam.abbrev] || '' },
      { id: 'pick2', label: '选择第二个队伍', shortLabel: '?', type: 'placeholder' },
      { id: 'pick3', label: '选择第三个队伍', shortLabel: '?', type: 'placeholder' }
    ]
  };
}

// ─── Express App ───
const app = express();
app.use(express.json());

// 提供静态前端文件（webapp client + public 共享资源）
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// API: 获取今日 Grid
app.get('/api/grid/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const grid = genG(today);
  res.json(grid);
});

// API: 获取随机 Grid
app.get('/api/grid/random', (req, res) => {
  const grid = genG(null);
  res.json(grid);
});

// API: 搜索球员
app.get('/api/players/search', (req, res) => {
  const q = req.query.q || '';
  const results = so(q, parseInt(req.query.limit) || 10);
  res.json(results);
});

// API: 验证答案
app.post('/api/validate', (req, res) => {
  const { playerId, rowCategory, colCategory } = req.body;
  const result = vo(playerId, rowCategory, colCategory);
  res.json(result);
});

// API: 提交答案（记录到本地文件）
app.post('/api/submit', (req, res) => {
  const { gridId, row, col, playerId } = req.body;
  const storageFile = path.join(dataDir, '..', 'submissions.json');
  let submissions = {};
  try {
    if (fs.existsSync(storageFile)) {
      submissions = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
    }
  } catch(e) { /* ignore */ }

  const key = `${gridId}_${row}_${col}`;
  if (!submissions[key]) submissions[key] = {};
  submissions[key][playerId] = (submissions[key][playerId] || 0) + 1;

  fs.writeFileSync(storageFile, JSON.stringify(submissions), 'utf-8');

  const total = Object.values(submissions[key]).reduce((a, b) => a + b, 0);
  const rarity = Math.round((submissions[key][playerId] / total) * 1000) / 10;
  res.json({ rarity });
});

// API: 获取队伍数据
app.get('/api/teams', (req, res) => {
  res.json(TD.map(t => ({
    ...t,
    logoUrl: TL[t.abbrev] || `https://cdn.nba.com/logos/nba/${t.teamId}/global/L/logo.svg`
  })));
});

// API: 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', players: SL.length });
});

// API: 返回全部数据（客户端加载用，完全复原 index.html 行为）
app.get('/api/data/all', (req, res) => {
  res.json({ TD, TL, SL, PD, CN, RR, SB, PB });
});

// ─── 启动 ───
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏀 Immaculate Grid API running on http://localhost:${PORT}`);
  console.log(`   Players: ${SL.length}`);
  console.log(`   Teams: ${TD.length}`);
});
