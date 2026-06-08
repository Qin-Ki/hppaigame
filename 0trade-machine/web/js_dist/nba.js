var StatsEngine = (function() {

  var STAT_LABELS = {
    pts: '得分', ast: '助攻', trb: '篮板', stl: '抢断', blk: '盖帽',
    tov: '失误', pf: '犯规', mp: '上场时间', g: '出场', gs: '首发',
    fg_pct: '命中率', fg3_pct: '三分命中率', ft_pct: '罚球命中率',
    fg3: '三分命中', fg: '投篮命中', fga: '投篮出手',
    fg3a: '三分出手', ft: '罚球命中', fta: '罚球出手',
    orb: '进攻篮板', drb: '防守篮板',
    per: '效率值', salary: '薪资', yearsRemaining: '剩余年限',
    rating: '能力值'
  };

  var STAT_UNITS = {
    pts: '分', ast: '次', trb: '个', stl: '次', blk: '次',
    tov: '次', pf: '次', mp: '分钟', g: '场', gs: '场',
    fg_pct: '%', fg3_pct: '%', ft_pct: '%',
    fg3: '个', fg: '个', fga: '次', fg3a: '次', ft: '个', fta: '次',
    orb: '个', drb: '个', per: '', salary: '$', yearsRemaining: '年',
    rating: ''
  };

  var PLAYER_RANK_STATS = ['pts', 'ast', 'trb', 'stl', 'blk', 'mp', 'g', 'fg3', 'fg_pct', 'ft_pct', 'orb', 'drb', 'rating', 'salary'];

  var TEAM_AGGREGATE_STATS = ['pts', 'ast', 'trb', 'stl', 'blk', 'tov', 'orb', 'drb', 'fg3'];

  function getAllPlayers() {
    var result = [];
    TEAM_LIST.forEach(function(team) {
      team.players.forEach(function(p) {
        result.push({
          id: p.id,
          name: p.name,
          pos: p.pos || '',
          ht: p.ht || 0,
          wt: p.wt || 0,
          exp: p.exp || '',
          salary: p.salary,
          per: p.per,
          rating: p['2k_rating'],
          yearsRemaining: p.yearsRemaining,
          stats: p.stats || {},
          teamId: team.id,
          teamName: team.name,
          teamShortName: team.shortName,
          teamColor: team.color,
          conference: team.conference
        });
      });
    });
    return result;
  }

  function getTopPlayers(stat, n, filter) {
    n = n || 10;
    var players = getAllPlayers();

    if (filter) {
      players = players.filter(function(p) {
        if (filter.conference && p.conference !== filter.conference) return false;
        if (filter.teamId && p.teamId !== filter.teamId) return false;
        if (filter.pos && p.pos !== filter.pos) return false;
        if (filter.minGames && (!p.stats.g || p.stats.g < filter.minGames)) return false;
        if (filter.minMp && (!p.stats.mp || p.stats.mp < filter.minMp)) return false;
        return true;
      });
    }

    players = players.filter(function(p) {
      var val = getStatValue(p, stat);
      return val !== null && val !== undefined;
    });

    players.sort(function(a, b) {
      var va = getStatValue(a, stat);
      var vb = getStatValue(b, stat);
      if (stat === 'tov' || stat === 'pf') {
        return va - vb;
      }
      return vb - va;
    });

    return players.slice(0, n).map(function(p, i) {
      return {
        rank: i + 1,
        id: p.id,
        name: p.name,
        pos: p.pos,
        teamId: p.teamId,
        teamName: p.teamShortName,
        teamColor: p.teamColor,
        conference: p.conference,
        value: getStatValue(p, stat),
        salary: p.salary,
        per: p.per,
        rating: p.rating
      };
    });
  }

  function getStatValue(player, stat) {
    if (stat === 'salary') return player.salary;
    if (stat === 'per') return player.per;
    if (stat === 'rating') return player['2k_rating'];
    if (stat === 'yearsRemaining') return player.yearsRemaining;
    if (!player.stats) return null;
    return player.stats[stat];
  }

  function filterPlayers(criteria) {
    var players = getAllPlayers();

    return players.filter(function(p) {
      if (criteria.conference && p.conference !== criteria.conference) return false;
      if (criteria.teamId && p.teamId !== criteria.teamId) return false;
      if (criteria.pos && p.pos !== criteria.pos) return false;
      if (criteria.minSalary && p.salary < criteria.minSalary) return false;
      if (criteria.maxSalary && p.salary > criteria.maxSalary) return false;
      if (criteria.minPer && (p.per === null || p.per < criteria.minPer)) return false;
      if (criteria.maxPer && (p.per === null || p.per > criteria.maxPer)) return false;
      if (criteria.minYearsRemaining && p.yearsRemaining < criteria.minYearsRemaining) return false;
      if (criteria.maxYearsRemaining && p.yearsRemaining > criteria.maxYearsRemaining) return false;
      if (criteria.minGames && (!p.stats.g || p.stats.g < criteria.minGames)) return false;

      if (criteria.stats) {
        for (var key in criteria.stats) {
          if (!p.stats) return false;
          var condition = criteria.stats[key];
          var val = p.stats[key];
          if (val === undefined || val === null) return false;
          if (condition.min !== undefined && val < condition.min) return false;
          if (condition.max !== undefined && val > condition.max) return false;
        }
      }

      return true;
    });
  }

  function getTeamStats(teamId) {
    var team = TEAMS_DATA[teamId];
    if (!team) return null;

    var activePlayers = team.players.filter(function(p) { return p.stats && p.stats.g > 0; });
    var totalSalary = 0;
    var totalPer = 0;
    var perCount = 0;
    var aggregates = {};

    var totalRating = 0, ratingCount = 0;
    activePlayers.forEach(function(p) {
      if (p['2k_rating'] !== null && p['2k_rating'] !== undefined) {
        totalRating += p['2k_rating'];
        ratingCount++;
      }
    });

    TEAM_AGGREGATE_STATS.forEach(function(stat) { aggregates[stat] = 0; });

    activePlayers.forEach(function(p) {
      totalSalary += p.salary;
      if (p.per !== null && p.per !== undefined) {
        totalPer += p.per;
        perCount++;
      }
      TEAM_AGGREGATE_STATS.forEach(function(stat) {
        if (p.stats[stat] !== undefined && p.stats[stat] !== null) {
          aggregates[stat] += p.stats[stat];
        }
      });
    });

    var avgPer = perCount > 0 ? Math.round(totalPer / perCount * 10) / 10 : 0;
    var avgRating = ratingCount > 0 ? Math.round(totalRating / ratingCount * 10) / 10 : 0;

    var starters = activePlayers
      .filter(function(p) { return p.stats.gs && p.stats.gs > 0; })
      .sort(function(a, b) { return (b.stats.gs || 0) - (a.stats.gs || 0); })
      .slice(0, 5);
    var starterSalary = starters.reduce(function(sum, p) { return sum + p.salary; }, 0);

    return {
      id: team.id,
      name: team.name,
      shortName: team.shortName,
      conference: team.conference,
      color: team.color,
      accent: team.accent,
      overTaxLine: team.overTaxLine,
      capRoom: team.capRoom,
      totalSalary: totalSalary,
      avgPer: avgPer,
      avgRating: avgRating,
      starterSalary: starterSalary,
      playerCount: activePlayers.length,
      aggregates: aggregates
    };
  }

  function getTeamRanking(stat, conference) {
    var teamIds = Object.keys(TEAMS_DATA);
    if (conference) {
      teamIds = teamIds.filter(function(id) { return TEAMS_DATA[id].conference === conference; });
    }

    var teamStats = teamIds.map(function(id) { return getTeamStats(id); }).filter(Boolean);

    teamStats.sort(function(a, b) {
      var va, vb;
      if (stat === 'totalSalary') { va = a.totalSalary; vb = b.totalSalary; }
      else if (stat === 'capRoom') { va = a.capRoom; vb = b.capRoom; }
      else if (stat === 'avgPer') { va = a.avgPer; vb = b.avgPer; }
      else if (stat === 'avgRating') { va = a.avgRating; vb = b.avgRating; }
      else if (stat === 'starterSalary') { va = a.starterSalary; vb = b.starterSalary; }
      else { va = a.aggregates[stat] || 0; vb = b.aggregates[stat] || 0; }
      return vb - va;
    });

    return teamStats.map(function(ts, i) {
      var value;
      if (stat === 'totalSalary') value = ts.totalSalary;
      else if (stat === 'capRoom') value = ts.capRoom;
      else if (stat === 'avgPer') value = ts.avgPer;
      else if (stat === 'avgRating') value = ts.avgRating;
      else if (stat === 'starterSalary') value = ts.starterSalary;
      else value = ts.aggregates[stat] || 0;

      return {
        rank: i + 1,
        id: ts.id,
        name: ts.name,
        shortName: ts.shortName,
        conference: ts.conference,
        color: ts.color,
        value: value,
        totalSalary: ts.totalSalary,
        overTaxLine: ts.overTaxLine
      };
    });
  }

  function getPlayerRank(playerId, stat) {
    var allPlayers = getAllPlayers().filter(function(p) {
      var val = getStatValue(p, stat);
      return val !== null && val !== undefined;
    });

    allPlayers.sort(function(a, b) {
      return getStatValue(b, stat) - getStatValue(a, stat);
    });

    for (var i = 0; i < allPlayers.length; i++) {
      if (allPlayers[i].id === playerId) {
        return {
          rank: i + 1,
          total: allPlayers.length,
          value: getStatValue(allPlayers[i], stat),
          player: allPlayers[i]
        };
      }
    }
    return null;
  }

  function comparePlayers(id1, id2) {
    var p1 = null, p2 = null;
    TEAM_LIST.forEach(function(team) {
      team.players.forEach(function(p) {
        if (p.id === id1) p1 = p;
        if (p.id === id2) p2 = p;
      });
    });
    if (!p1 || !p2) return null;

    var compareFields = ['pts', 'ast', 'trb', 'stl', 'blk', 'tov', 'mp', 'g', 'fg_pct', 'fg3_pct', 'ft_pct', 'fg3', 'orb', 'drb'];
    var comparison = {};

    compareFields.forEach(function(f) {
      var v1 = p1.stats ? p1.stats[f] : null;
      var v2 = p2.stats ? p2.stats[f] : null;
      comparison[f] = {
        p1: v1,
        p2: v2,
        winner: (v1 !== null && v2 !== null) ? (v1 > v2 ? 1 : v1 < v2 ? 2 : 0) : null
      };
    });

    comparison.salary = { p1: p1.salary, p2: p2.salary, winner: p1.salary > p2.salary ? 1 : p1.salary < p2.salary ? 2 : 0 };
    comparison.per = { p1: p1.per, p2: p2.per, winner: (p1.per !== null && p2.per !== null) ? (p1.per > p2.per ? 1 : p1.per < p2.per ? 2 : 0) : null };

    return { player1: p1, player2: p2, comparison: comparison };
  }

  function getPlayerById(playerId) {
    var allPlayers = getAllPlayers();
    for (var i = 0; i < allPlayers.length; i++) {
      if (allPlayers[i].id === playerId) return allPlayers[i];
    }
    return null;
  }

  function getPlayersByTeam(teamId) {
    var team = TEAMS_DATA[teamId];
    if (!team) return [];
    return team.players.map(function(p) {
      return {
        id: p.id,
        name: p.name,
        pos: p.pos || '',
        ht: p.ht || 0,
        wt: p.wt || 0,
        exp: p.exp || '',
        salary: p.salary,
        per: p.per,
        rating: p['2k_rating'],
        yearsRemaining: p.yearsRemaining,
        stats: p.stats || {},
        teamId: team.id,
        teamName: team.name,
        teamShortName: team.shortName,
        teamColor: team.color,
        conference: team.conference
      };
    });
  }

  function searchPlayers(query) {
    var q = query.toLowerCase();
    return getAllPlayers().filter(function(p) {
      return p.name.toLowerCase().indexOf(q) !== -1 ||
             p.teamName.toLowerCase().indexOf(q) !== -1 ||
             p.teamShortName.toLowerCase().indexOf(q) !== -1 ||
             p.pos.toLowerCase().indexOf(q) !== -1;
    });
  }

  function getStatLabel(stat) {
    return STAT_LABELS[stat] || stat;
  }

  function getStatUnit(stat) {
    return STAT_UNITS[stat] || '';
  }

  function formatValue(value, stat) {
    if (value === null || value === undefined) return '-';
    if (stat === 'salary') {
      if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
      if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'K';
      return '$' + value;
    }
    if (stat === 'fg_pct' || stat === 'fg3_pct' || stat === 'ft_pct') {
      if (value > 1) return value.toFixed(1);
      return (value * 100).toFixed(1) + '%';
    }
    if (typeof value === 'number' && value % 1 !== 0) {
      return value.toFixed(1);
    }
    return String(value);
  }

  return {
    getAllPlayers: getAllPlayers,
    getTopPlayers: getTopPlayers,
    filterPlayers: filterPlayers,
    getTeamStats: getTeamStats,
    getTeamRanking: getTeamRanking,
    getPlayerRank: getPlayerRank,
    comparePlayers: comparePlayers,
    getPlayerById: getPlayerById,
    getPlayersByTeam: getPlayersByTeam,
    searchPlayers: searchPlayers,
    getStatLabel: getStatLabel,
    getStatUnit: getStatUnit,
    formatValue: formatValue,
    STAT_LABELS: STAT_LABELS,
    STAT_UNITS: STAT_UNITS,
    PLAYER_RANK_STATS: PLAYER_RANK_STATS,
    TEAM_AGGREGATE_STATS: TEAM_AGGREGATE_STATS
  };

})();


var state = {
  teams: [],
  moves: []
};

var MAX_TEAMS = 4;

function addTeam(teamId) {
  var team = TEAMS_DATA[teamId];
  if (!team) { showToast('球队数据不存在', 'error'); return false; }
  if (state.teams.length >= MAX_TEAMS) { showToast('最多选择 ' + MAX_TEAMS + ' 支球队', 'warn'); return false; }
  if (state.teams.some(function(t) { return t.id === teamId; })) { showToast('该球队已选择', 'warn'); return false; }

  state.teams.push(team);
  clearMovesInvolving(teamId);
  renderAll();
  showToast('已添加 ' + team.name, 'success');
  return true;
}

function removeTeam(teamId) {
  var idx = state.teams.findIndex(function(t) { return t.id === teamId; });
  if (idx === -1) return;
  var name = state.teams[idx].name;
  state.teams.splice(idx, 1);
  state.moves = state.moves.filter(function(m) { return m.from !== teamId && m.to !== teamId; });
  if (typeof activeTeamIndex !== 'undefined') {
    if (state.teams.length === 0) {
      activeTeamIndex = 0;
    } else if (activeTeamIndex >= state.teams.length) {
      activeTeamIndex = state.teams.length - 1;
    } else if (idx < activeTeamIndex) {
      activeTeamIndex--;
    }
  }
  renderAll();
  showToast('已移除 ' + name, 'info');
}

function isFreeAgent(player) {
  // Free agent = only 2025-26 salary, no future years guaranteed
  return player.salary_2026_27 == null && player.salary_2027_28 == null 
      && player.salary_2028_29 == null && player.salary_2029_30 == null;
}

function addMove(player, fromTeamId, toTeamId) {
  if (isFreeAgent(player)) {
    showToast(player.name + ' — 自由球员，不可交易', 'error');
    return;
  }
  if (player.restricted) {
    showToast(player.name + ' — ' + restrictionLabel(player.restrictionType) + '（提示，不阻止交易）', 'warn');
  }

  var dup = state.moves.find(function(m) { return m.type !== 'draft_pick' && m.player.id === player.id; });
  if (dup) {
    showToast(player.name + ' 已在交易中', 'warn');
    return;
  }

  state.moves.push({ type: 'player', player: player, from: fromTeamId, to: toTeamId });
  renderAll();
  showToast(player.name + ' → ' + getTeamShort(toTeamId), 'success');
}

function addDraftPickMove(draftPick, fromTeamId, toTeamId) {
  var dup = state.moves.find(function(m) { return m.type === 'draft_pick' && m.draftPick.id === draftPick.id; });
  if (dup) {
    showToast(draftPick.label + ' 已在交易中', 'warn');
    return;
  }

  state.moves.push({ type: 'draft_pick', draftPick: draftPick, from: fromTeamId, to: toTeamId });
  renderAll();
  showToast(draftPick.label + ' → ' + getTeamShort(toTeamId), 'success');
}

function removeMove(moveId) {
  var idx = state.moves.findIndex(function(m) {
    return m.type === 'draft_pick' ? m.draftPick.id === moveId : m.player.id === moveId;
  });
  if (idx === -1) return;
  var m = state.moves[idx];
  state.moves.splice(idx, 1);
  renderAll();
  var label = m.type === 'draft_pick' ? m.draftPick.label : m.player.name;
  showToast('已移除 ' + label, 'info');
}

function clearMovesInvolving(teamId) {
  state.moves = state.moves.filter(function(m) { return m.from !== teamId && m.to !== teamId; });
}

function isPlayerInTrade(playerId) {
  return state.moves.some(function(m) { return m.type !== 'draft_pick' && m.player.id === playerId; });
}

function isDraftPickInTrade(pickId) {
  return state.moves.some(function(m) { return m.type === 'draft_pick' && m.draftPick.id === pickId; });
}

function getMovesForTeam(teamId, direction) {
  return state.moves.filter(function(m) {
    return direction === 'out' ? m.from === teamId : m.to === teamId;
  });
}

function getTeamPlayersInTrade(teamId) {
  return state.moves.filter(function(m) { return m.from === teamId && m.type !== 'draft_pick'; }).map(function(m) { return m.player; });
}

function getTeamDraftPicksInTrade(teamId) {
  return state.moves.filter(function(m) { return m.from === teamId && m.type === 'draft_pick'; }).map(function(m) { return m.draftPick; });
}

function getTeamPlayersOutgoingCount(teamId) {
  return state.moves.filter(function(m) { return m.from === teamId && m.type !== 'draft_pick'; }).length;
}

function getTeamDraftPicksOutgoingCount(teamId) {
  return state.moves.filter(function(m) { return m.from === teamId && m.type === 'draft_pick'; }).length;
}

function getTeamPlayersIncomingCount(teamId) {
  return state.moves.filter(function(m) { return m.to === teamId && m.type !== 'draft_pick'; }).length;
}

function getTeamDraftPicksIncomingCount(teamId) {
  return state.moves.filter(function(m) { return m.to === teamId && m.type === 'draft_pick'; }).length;
}

function hasTeam(teamId) {
  return state.teams.some(function(t) { return t.id === teamId; });
}

function getTeamShort(teamId) {
  var t = state.teams.find(function(t2) { return t2.id === teamId; });
  return t ? getShortName(t, 4) : teamId;
}

function resetAll() {
  state.teams = [];
  state.moves = [];
  renderAll();
  showToast('已重置全部', 'info');
}

var SALARY_THRESHOLDS = {
  '2025_26': { salaryCap: 154657000, luxuryTaxLine: 187895000, firstApron: 195945000, secondApron: 207824000 },
  '2026_27': { salaryCap: 165000000, luxuryTaxLine: 201000000, firstApron: 209000000, secondApron: 222000000 }
};

var CURRENT_THRESHOLDS = SALARY_THRESHOLDS['2025_26'];

var CASH_LIMITS = {
  '2025_26': 7964320,
  '2026_27': 8497500
};

var MIN_SALARY_2025_26 = {
  0: 1272870, 1: 2048494, 2: 2296274, 3: 2378870, 4: 2461463,
  5: 2667947, 6: 2874436, 7: 3080921, 8: 3287409, 9: 3303774, 10: 3634153
};

function isOverSecondApron(team) {
  return team.overTaxLine > CURRENT_THRESHOLDS.secondApron - CURRENT_THRESHOLDS.luxuryTaxLine;
}

function isOverFirstApron(team) {
  return team.overTaxLine > CURRENT_THRESHOLDS.firstApron - CURRENT_THRESHOLDS.luxuryTaxLine;
}

function getTaxStatusLabel(team) {
  if (team.capRoom >= 0) return '帽下队';
  if (isOverSecondApron(team)) return '第二土豪线';
  if (isOverFirstApron(team)) return '第一土豪线';
  if (team.overTaxLine > 0) return '超税队';
  return '税下队';
}

function isMinSalaryContract(player) {
  var yos = parseInt(player.exp) || 0;
  if (yos < 0) yos = 0;
  if (yos > 10) yos = 10;
  var minSalary = MIN_SALARY_2025_26[yos];
  return minSalary && player.salary <= minSalary;
}

function checkTrade() {
  if (state.teams.length < 2) return;

  var results = [];

  runSalaryCheck(results);
  runApronCheck(results);
  runFirstApronCheck(results);
  runNtcCheck(results);
  runCashLimitCheck(results);
  runRosterSpotCheck(results);
  runRosterCheck(results);
  runStepienRuleCheck(results);

  var allPassed = results.every(function(r) { return r.passed !== false; });
  var hasWarn = results.some(function(r) { return r.level === 'warn'; });

  var icon = allPassed ? '<span class="material-symbols-outlined" style="font-size:20px;color:#22c55e;vertical-align:middle;">check_circle</span>' : '<span class="material-symbols-outlined" style="font-size:20px;color:#ef4444;vertical-align:middle;">cancel</span>';
  var title = allPassed ? (hasWarn ? '规则校验通过（有注意事项）' : '所有规则校验通过') : '规则校验未通过';
  var titleClass = allPassed ? (hasWarn ? 'warn' : 'pass') : 'fail';

  var html = '<div class="result-title" style="color:' + (titleClass === 'fail' ? 'var(--error)' : titleClass === 'warn' ? 'var(--tertiary)' : 'var(--primary)') + '">' + icon + ' ' + title + '</div>';

  results.forEach(function(r) {
    var iconEl = '';
    if (r.level === 'warn') iconEl = '<span class="material-symbols-outlined rule-icon warn" style="font-size:18px;color:var(--tertiary);">warning</span>';
    else if (r.passed) iconEl = '<span class="material-symbols-outlined rule-icon pass" style="font-size:18px;color:#22c55e;">check_circle</span>';
    else iconEl = '<span class="material-symbols-outlined rule-icon fail" style="font-size:18px;color:var(--error);">cancel</span>';

    html += '<div class="rule-item">' +
      iconEl +
      '<div class="rule-detail">' +
      '<span class="rule-name">' + r.name + '</span>' +
      '<div class="rule-desc">' + r.desc + '</div>' +
      '</div></div>';
  });

  document.getElementById('trade-result-modal-body').innerHTML = html;
  showModal('modal-trade-result');
}

function runSalaryCheck(results) {
  state.teams.forEach(function(team) {
    var outSalary = 0;
    var inSalary = 0;
    var minSalaryInCount = 0;

    state.moves.forEach(function(m) {
      if (m.type === 'draft_pick') return;
      if (m.from === team.id) outSalary += m.player.salary;
      if (m.to === team.id) {
        if (isMinSalaryContract(m.player)) {
          minSalaryInCount++;
        } else {
          inSalary += m.player.salary;
        }
      }
    });

    if (outSalary === 0 && inSalary === 0 && minSalaryInCount === 0) return;

    var maxIn = 0;
    var taxLabel = getTaxStatusLabel(team);
    var multLabel = '';

    if (outSalary > 0) {
      if (isOverSecondApron(team)) {
        maxIn = outSalary;
        multLabel = '×1.0（二奢等额交换）';
      } else if (team.overTaxLine > 0) {
        maxIn = Math.floor(outSalary * 1.25 + 100000);
        multLabel = '×1.25+$100K';
      } else if (team.capRoom >= 0) {
        maxIn = Math.floor(outSalary * 2 + 250000);
        multLabel = '×2+$250K';
      } else {
        maxIn = Math.floor(outSalary * 1.5 + 250000);
        multLabel = '×1.5+$250K';
      }
    }

    var pass = outSalary === 0 || inSalary <= maxIn;

    var descParts = ['送出 ' + fmt(outSalary) + ' → 获得 ' + fmt(inSalary)];
    if (minSalaryInCount > 0) {
      descParts.push('底薪特例×' + minSalaryInCount + '（计$0）');
    }
    descParts.push('可接收上限 ' + fmt(maxIn) + '（' + taxLabel + ' ' + multLabel + '）');
    if (!pass) descParts.push('超出 ' + fmt(inSalary - maxIn));

    results.push({
      name: (team.shortName || team.name) + ' · 薪资匹配',
      passed: pass,
      level: pass ? 'pass' : 'fail',
      desc: descParts.join(' | ')
    });
  });
}

function runApronCheck(results) {
  state.teams.forEach(function(team) {
    if (!isOverSecondApron(team)) return;

    var outgoingMoves = state.moves.filter(function(m) { return m.from === team.id; });
    var incomingMoves = state.moves.filter(function(m) { return m.to === team.id; });

    if (outgoingMoves.length === 0 && incomingMoves.length === 0) return;

    if (outgoingMoves.length >= 2) {
      var totalOut = 0;
      outgoingMoves.forEach(function(m) { if (m.type !== 'draft_pick') totalOut += m.player.salary; });

      var maxIncomingSingle = 0;
      outgoingMoves.forEach(function(m) {
        if (m.type === 'draft_pick') return;
        var singleMax = m.player.salary;
        if (singleMax > maxIncomingSingle) maxIncomingSingle = singleMax;
      });

      var anyIncomingExceedsSingle = incomingMoves.some(function(m) {
        if (m.type === 'draft_pick') return false;
        return m.player.salary > maxIncomingSingle;
      });

      if (anyIncomingExceedsSingle) {
        var incomingNames = incomingMoves.filter(function(m) {
          if (m.type === 'draft_pick') return false;
          return m.player.salary > maxIncomingSingle;
        }).map(function(m) { return m.player.name + '（' + fmt(m.player.salary) + '）'; }).join('、');

        results.push({
          name: (team.shortName || team.name) + ' · 二奢薪资聚合限制',
          passed: false,
          level: 'fail',
          desc: '二奢球队不能聚合多名球员薪资匹配更高薪球员。送出球员最高薪资 ' + fmt(maxIncomingSingle) + '，但接收球员薪资更高：' + incomingNames + '。每名送出球员必须单独匹配'
        });
      } else {
        results.push({
          name: (team.shortName || team.name) + ' · 二奢薪资聚合限制',
          passed: true,
          level: 'warn',
          desc: '二奢球队不能聚合薪资，当前每名送出球员可单独匹配接收球员薪资'
        });
      }
    }

    if (incomingMoves.length > 0) {
      var totalIncoming = 0;
      incomingMoves.forEach(function(m) { if (m.type !== 'draft_pick') totalIncoming += m.player.salary; });
      var totalOutgoing = 0;
      outgoingMoves.forEach(function(m) { if (m.type !== 'draft_pick') totalOutgoing += m.player.salary; });

      if (totalIncoming > totalOutgoing) {
        results.push({
          name: (team.shortName || team.name) + ' · 二奢等额交换',
          passed: false,
          level: 'fail',
          desc: '二奢球队只能等额交换，不能引入更高薪资。送出 ' + fmt(totalOutgoing) + '，接收 ' + fmt(totalIncoming) + '，超出 ' + fmt(totalIncoming - totalOutgoing)
        });
      }
    }

    results.push({
      name: (team.shortName || team.name) + ' · 二奢限制提示',
      passed: true,
      level: 'warn',
      desc: '超过第二土豪线（' + fmt(CURRENT_THRESHOLDS.secondApron) + '），限制：不能使用聚合特例 / 不能送现金 / 不能签买断球员（薪资>NTMLE） / 不能先签后换 / 首轮签可能冻结'
    });
  });
}

function runFirstApronCheck(results) {
  state.teams.forEach(function(team) {
    if (!isOverFirstApron(team)) return;
    if (isOverSecondApron(team)) return;

    var incomingMoves = state.moves.filter(function(m) { return m.to === team.id; });
    var outgoingMoves = state.moves.filter(function(m) { return m.from === team.id; });

    if (incomingMoves.length === 0 && outgoingMoves.length === 0) return;

    results.push({
      name: (team.shortName || team.name) + ' · 一奢限制提示',
      passed: true,
      level: 'warn',
      desc: '超过第一土豪线（' + fmt(CURRENT_THRESHOLDS.firstApron) + '），限制：不能使用BAE / 不能使用NTMLE / 不能先签后换引入球员 / 不能签买断球员（薪资>NTMLE） / 扩展TPE不可用 / 标准TPE有时间限制'
    });
  });
}

function runNtcCheck(results) {
  state.moves.forEach(function(m) {
    if (m.type === 'draft_pick') return;
    var player = m.player;
    if (!player.restricted) return;

    var label = restrictionLabel(player.restrictionType);
    var fromTeam = state.teams.find(function(t) { return t.id === m.from; });

    if (player.restrictionType === 'ntc') {
      results.push({
        name: (fromTeam ? fromTeam.shortName || fromTeam.name : '') + ' · 交易否决权',
        passed: false,
        level: 'fail',
        desc: player.name + ' 拥有' + label + '，可拒绝本次交易。需球员本人同意方可执行'
      });
    } else {
      results.push({
        name: (fromTeam ? fromTeam.shortName || fromTeam.name : '') + ' · ' + label,
        passed: true,
        level: 'warn',
        desc: player.name + ' 存在' + label + '，可能影响交易执行，请确认球员是否同意'
      });
    }
  });
}

function runCashLimitCheck(results) {
  state.teams.forEach(function(team) {
    var cashSent = team.cashUsedThisSeason || 0;
    var maxCash = team.maxCashAllowed || CASH_LIMITS['2025_26'];

    if (isOverSecondApron(team)) {
      var hasOutgoing = state.moves.some(function(m) { return m.from === team.id; });
      if (hasOutgoing) {
        results.push({
          name: (team.shortName || team.name) + ' · 现金限制',
          passed: true,
          level: 'warn',
          desc: '二奢球队不能在交易中送出现金'
        });
      }
      return;
    }

    var hasOutgoing = state.moves.some(function(m) { return m.from === team.id; });
    if (!hasOutgoing) return;

    if (cashSent >= maxCash) {
      results.push({
        name: (team.shortName || team.name) + ' · 现金上限',
        passed: false,
        level: 'fail',
        desc: '本季已使用现金额度 ' + fmt(cashSent) + '，达到上限 ' + fmt(maxCash) + '，不能再送出现金'
      });
    } else {
      results.push({
        name: (team.shortName || team.name) + ' · 现金额度',
        passed: true,
        level: 'pass',
        desc: '本季已使用现金 ' + fmt(cashSent) + ' / 上限 ' + fmt(maxCash) + '，剩余 ' + fmt(maxCash - cashSent)
      });
    }
  });
}

function runRosterSpotCheck(results) {
  state.teams.forEach(function(team) {
    var outCount = getTeamPlayersOutgoingCount(team.id);
    var inCount = getTeamPlayersIncomingCount(team.id);

    if (inCount <= outCount) return;

    var currentRoster = team.players.length;
    var openSpots = 15 - currentRoster + outCount;

    if (openSpots < inCount - outCount) {
      results.push({
        name: (team.shortName || team.name) + ' · 阵容空位',
        passed: false,
        level: 'fail',
        desc: '接收 ' + inCount + ' 人 > 送出 ' + outCount + ' 人，需要 ' + (inCount - outCount) + ' 个空位，但当前仅 ' + Math.max(0, openSpots) + ' 个可用空位（需在执行交易前腾出空位）'
      });
    }
  });
}

function runRosterCheck(results) {
  state.teams.forEach(function(team) {
    var current = team.players.length;
    var out = getTeamPlayersOutgoingCount(team.id);
    var inCount = getTeamPlayersIncomingCount(team.id);
    var newCount = current - out + inCount;

    if (out === 0 && inCount === 0) return;

    var passed, desc;
    if (newCount === 0) {
      passed = false;
      desc = current + '人 → ' + newCount + '人（不能为0人）';
    } else if (newCount <= 15) {
      passed = true;
      desc = current + '人 → ' + newCount + '人（常规赛季上限15人）';
    } else if (newCount <= 20) {
      passed = true;
      desc = current + '人 → ' + newCount + '人（超15人，需在开赛前裁至15人；休赛期允许20人）';
    } else {
      passed = false;
      desc = current + '人 → ' + newCount + '人（超过20人上限，需调整交易方案）';
    }

    var level = !passed ? 'fail' : (newCount > 15 ? 'warn' : 'pass');

    results.push({
      name: (team.shortName || team.name) + ' · 阵容人数',
      passed: passed,
      level: level,
      desc: desc
    });
  });
}

function runStepienRuleCheck(results) {
  state.teams.forEach(function(team) {
    var teamId = team.id;
    var allPicks = DRAFT_PICKS_DATA[teamId] || [];

    var firstRoundPicksOwned = allPicks.filter(function(p) { return p.round === 1; });

    var firstRoundPicksByYear = {};
    firstRoundPicksOwned.forEach(function(p) {
      if (!firstRoundPicksByYear[p.year]) firstRoundPicksByYear[p.year] = [];
      firstRoundPicksByYear[p.year].push(p);
    });

    var outgoingFirstRoundPicks = state.moves.filter(function(m) {
      return m.from === teamId && m.type === 'draft_pick' && m.draftPick.round === 1;
    });

    if (outgoingFirstRoundPicks.length === 0) return;

    var outgoingByYear = {};
    outgoingFirstRoundPicks.forEach(function(m) {
      var yr = m.draftPick.year;
      if (!outgoingByYear[yr]) outgoingByYear[yr] = 0;
      outgoingByYear[yr]++;
    });

    var violations = [];

    Object.keys(outgoingByYear).sort().forEach(function(yearStr) {
      var year = parseInt(yearStr);
      var outCount = outgoingByYear[yearStr];
      var owned = firstRoundPicksByYear[year] || [];
      var remaining = owned.length - outCount;

      if (remaining > 0) return;

      var prevYear = year - 1;
      var prevOutCount = outgoingByYear[prevYear] || 0;
      var prevOwned = firstRoundPicksByYear[prevYear] || [];
      var prevRemaining = prevOwned.length - prevOutCount;

      var nextYear = year + 1;
      var nextOutCount = outgoingByYear[nextYear] || 0;
      var nextOwned = firstRoundPicksByYear[nextYear] || [];
      var nextRemaining = nextOwned.length - nextOutCount;

      if (prevRemaining <= 0) {
        violations.push(year + '和' + prevYear + '年均无首轮签');
      }
      if (nextRemaining <= 0) {
        violations.push(year + '和' + nextYear + '年均无首轮签');
      }
    });

    if (violations.length > 0) {
      results.push({
        name: (team.shortName || team.name) + ' · Stepien规则',
        passed: false,
        level: 'fail',
        desc: 'NBA禁止球队连续两年交易掉首轮签。违规：' + violations.join('；')
      });
    } else {
      results.push({
        name: (team.shortName || team.name) + ' · Stepien规则',
        passed: true,
        level: 'pass',
        desc: '未违反Stepien规则（不连续交易首轮签）'
      });
    }
  });
}


var activeTeamIndex = 0;

function isDesktop() {
  return window.innerWidth >= 1024;
}

function renderAll() {
  renderTradeBar();
  renderActiveTeamPanel();
}

window.addEventListener('resize', function() {
  renderActiveTeamPanel();
});

function renderTradeBar() {
  var container = document.getElementById('trade-bar-teams');
  var checkBtn = document.getElementById('btn-check-trade');

  var html = '';

  state.teams.forEach(function(team, idx) {
    var isActive = idx === activeTeamIndex;
    var outgoing = state.moves.filter(function(m) { return m.from === team.id; });
    var incoming = state.moves.filter(function(m) { return m.to === team.id; });
    var outPlayers = outgoing.filter(function(m) { return m.type !== 'draft_pick'; });
    var inPlayers = incoming.filter(function(m) { return m.type !== 'draft_pick'; });
    var outPicks = outgoing.filter(function(m) { return m.type === 'draft_pick'; });
    var inPicks = incoming.filter(function(m) { return m.type === 'draft_pick'; });
    var outSalary = outPlayers.reduce(function(s, m) { return s + m.player.salary; }, 0);
    var inSalary = inPlayers.reduce(function(s, m) { return s + m.player.salary; }, 0);
    var hasMoves = outgoing.length + incoming.length > 0;

    var cls = 'trade-bar-team-card' + (isActive ? ' active' : '');

    html += '<div class="' + cls + '" onclick="switchTeamTab(' + idx + ')" style="' + (isActive ? 'border-color:' + team.color + ';background:' + team.color + '08;' : '') + '">' +
      '<div class="trade-bar-card-head">' +
        '<span class="trade-bar-card-logo" style="background:' + team.color + ';">' + getShortName(team, 2) + '</span>' +
        '<span class="trade-bar-card-name">' + (team.shortName || team.name) + '</span>' +
        (isActive ? '<span class="trade-bar-card-remove" onclick="event.stopPropagation(); removeTeam(\'' + team.id + '\')" title="移除"><span class="material-symbols-outlined">close</span></span>' : '') +
      '</div>' +
      (hasMoves ?
        '<div class="trade-bar-card-info">' +
        (outPlayers.length > 0 ? '<div class="trade-bar-row trade-bar-out"><span class="material-symbols-outlined">north_east</span><span>送出 ' + outPlayers.length + '人 ' + fmt(outSalary) + '</span></div>' : '') +
        (outPicks.length > 0 ? '<div class="trade-bar-row trade-bar-out"><span class="material-symbols-outlined">north_east</span><span>送出 ' + outPicks.length + '签</span></div>' : '') +
        (inPlayers.length > 0 ? '<div class="trade-bar-row trade-bar-in"><span class="material-symbols-outlined">south_west</span><span>接收 ' + inPlayers.length + '人 ' + fmt(inSalary) + '</span></div>' : '') +
        (inPicks.length > 0 ? '<div class="trade-bar-row trade-bar-in"><span class="material-symbols-outlined">south_west</span><span>接收 ' + inPicks.length + '签</span></div>' : '') +
        '</div>'
      : '<div class="trade-bar-card-info trade-bar-card-empty">暂无交易</div>') +
      '</div>';
  });

  if (state.teams.length < MAX_TEAMS) {
    html += '<div class="trade-bar-team-card add-card" onclick="openTeamModal()">' +
      '<span class="material-symbols-outlined" style="font-size:24px;">add</span>' +
      '<span>添加球队</span>' +
      '</div>';
  }

  container.innerHTML = html;
  if (checkBtn) checkBtn.disabled = state.moves.length === 0 || state.teams.length < 2;
}

function switchTeamTab(idx) {
  activeTeamIndex = idx;
  renderTradeBar();
  if (!isDesktop()) {
    renderActiveTeamPanel();
  }
}

function renderActiveTeamPanel() {
  var container = document.getElementById('team-panel-container');

  if (state.teams.length === 0) {
    container.innerHTML = '<div class="panels-empty">' +
      '<span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant);display:block;margin-bottom:12px;">swap_horiz</span>' +
      '请点击上方「+ 添加球队」开始构建交易</div>';
    return;
  }

  if (isDesktop()) {
    var allHtml = '<div class="panels-scroll multi-panel">';
    state.teams.forEach(function(team) {
      allHtml += renderTeamPanel(team);
    });
    allHtml += '</div>';
    container.innerHTML = allHtml;
  } else {
    var team = state.teams[activeTeamIndex] || state.teams[0];
    if (!team) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = renderTeamPanel(team);
  }

  attachPanelEvents();
}

function renderTeamPanel(team) {
  var outgoingIds = state.moves
    .filter(function(m) { return m.from === team.id && m.type !== 'draft_pick'; })
    .map(function(m) { return m.player.id; });
  var outgoingPickIds = state.moves
    .filter(function(m) { return m.from === team.id && m.type === 'draft_pick'; })
    .map(function(m) { return m.draftPick.id; });

  var primaryColor = team.color || '#c8102e';
  var accentColor = team.accent || primaryColor;
  var bgStyle = 'background: linear-gradient(135deg, ' + primaryColor + '08 0%, ' + primaryColor + '04 50%, #ffffff 100%); --panel-accent: ' + primaryColor + '; --panel-accent-secondary: ' + accentColor + ';';

  var html = '<div class="team-panel" data-team-id="' + team.id + '" style="' + bgStyle + '">';

  html += '<div class="panel-letter-bg" style="color:' + primaryColor + ';" aria-hidden="true">' + String(team.id).toUpperCase() + '</div>';

  html += '<div class="panel-head" style="background: linear-gradient(to right, ' + primaryColor + '18, ' + primaryColor + '08);">' +
    '<div class="panel-logo" style="background:' + primaryColor + ';">' + getShortName(team, 2) + '</div>' +
    '<span class="panel-name" style="color:' + primaryColor + ';">' + team.name + '</span>' +
    '<span class="panel-conf" style="background:' + primaryColor + '15; color:' + primaryColor + '; border:1px solid ' + primaryColor + '30;">' + (team.conference === 'west' ? 'WEST' : 'EAST') + '</span>' +
    '</div>';

  html += '<div class="panel-finance" style="background: linear-gradient(to right, ' + accentColor + '10, ' + primaryColor + '06);">' +
    '<div><span class="fin-label">超税线</span><br><span class="fin-val ' + (team.overTaxLine > 0 ? 'danger' : 'success') + '">' + fmt(team.overTaxLine) + '</span></div>' +
    '<div><span class="fin-label">薪资空间</span><br><span class="fin-val ' + (team.capRoom >= 0 ? 'success' : 'danger') + '">' + fmt(team.capRoom) + '</span></div>' +
    '</div>';

  html += '<div class="player-list-header" style="border-bottom-color:' + primaryColor + '30;">' +
    '<span class="plh-name">球员</span>' +
    '<span class="plh-salary">薪资</span>' +
    '<span class="plh-action"></span>' +
    '</div>';

  html += '<div class="player-list">';

  team.players.slice().sort(function(a, b) { return b.salary - a.salary; }).forEach(function(p) {
    var isOut = outgoingIds.indexOf(p.id) !== -1;
    var isInMove = state.moves.some(function(m) { return m.type !== 'draft_pick' && m.player.id === p.id; });
    var isInFromOther = isInMove && !isOut;
    var isFA = isFreeAgent(p);

    var cls = '';
    if (isOut) cls = ' selected';
    else if (isInFromOther) cls = ' restricted';
    else if (p.restricted) cls = ' restricted';
    else if (isFA) cls = ' free-agent';

    var pos = (typeof getPlayerPosition === 'function') ? getPlayerPosition(p.id) : null;
    var posLabel = pos ? (pos + ' / ' + String(team.id).toUpperCase()) : String(team.id).toUpperCase();

    // Check for player option badge (only 2026-27 season)
    var optionInfo = typeof getPlayerOptionById === 'function' ? getPlayerOptionById(p.id) : null;
    var optionBadge = '';
    if (optionInfo && optionInfo[1] === '2026-27') {
      var optType = optionInfo[0] === 'player' ? 'PO' : 'TO';
      optionBadge = ' <span class="option-badge ' + (optionInfo[0] === 'player' ? 'player-option' : 'team-option') + '" title="2026-27 ' + (optionInfo[0] === 'player' ? '球员选项' : '球队选项') + '">' + optType + '</span>';
    }

    html += '<div class="player-row' + cls + '" data-player-id="' + p.id + '" data-team-id="' + team.id + '"' + (isFA ? ' title="自由球员，不可交易"' : '') + '>' +
      '<div class="player-avatar">' + (p.img ? '<img class="player-img" src="' + p.img + '" alt="">' : p.name.charAt(0)) + '</div>' +
      '<div class="player-info">' +
        '<span class="player-name" data-player-id="' + p.id + '">' + p.name + '</span>' +
        '<span class="player-position">' + posLabel + (isFA ? ' <span class="fa-badge">自由球员</span>' : '') + optionBadge + '</span>' +
      '</div>' +
      (p.restricted ? '<span class="material-symbols-outlined lock-icon" style="font-size:12px;color:var(--tertiary);">lock</span>' : '') +
      '<span class="player-salary">' + fmt(p.salary) + '</span>' +
      '<span class="player-action">' + (isFA ? '<span class="material-symbols-outlined" style="font-size:14px;color:var(--outline-variant);">block</span>' : (isOut ? '<span class="material-symbols-outlined checked" style="font-size:16px;">check_circle</span>' : (isInFromOther ? '<span class="material-symbols-outlined arrow" style="font-size:14px;">fiber_manual_record</span>' : '<span class="material-symbols-outlined arrow" style="font-size:14px;">east</span>'))) + '</span>' +
      '</div>';
  });

  var draftPicks = DRAFT_PICKS_DATA[team.id] || [];
  if (draftPicks.length > 0) {
    html += '<div class="draft-pick-section-header" style="border-top-color:' + primaryColor + '30; color:' + primaryColor + ';">' +
      '<span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;">sell</span> 选秀权' +
      '</div>';
    html += '<div class="draft-pick-list">';

    draftPicks.forEach(function(pick) {
      var isOut = outgoingPickIds.indexOf(pick.id) !== -1;
      var isInMove = isDraftPickInTrade(pick.id) && !isOut;

      var cls = 'draft-pick-row';
      if (isOut) cls += ' selected';
      else if (isInMove) cls += ' restricted';

      var roundLabel = pick.round === 1 ? '首轮' : '次轮';
      var protectionLabel = pick.protection !== 'none' ? ' <span class="pick-protection">' + pick.protection + '</span>' : '';

      // Extract pick number from label like "2026首轮（#8，来自鹈鹕）"
      var pickNum = '';
      if (pick.label) {
        var m = pick.label.match(/#(\d+)/);
        if (m) pickNum = ' <span class="pick-number">#' + m[1] + '</span>';
      }

      html += '<div class="' + cls + '" data-pick-id="' + pick.id + '" data-team-id="' + team.id + '">' +
        '<div class="pick-avatar"><span class="material-symbols-outlined" style="font-size:14px;">sell</span></div>' +
        '<div class="pick-info">' +
          '<span class="pick-label">' + pick.year + ' ' + roundLabel + pickNum + protectionLabel + '</span>' +
          '<span class="pick-origin">' + (pick.originalTeam === team.id ? '自有' : '来自' + getTeamShortName(pick.originalTeam)) + '</span>' +
        '</div>' +
        '<span class="pick-action">' + (isOut ? '<span class="material-symbols-outlined checked" style="font-size:16px;">check_circle</span>' : (isInMove ? '<span class="material-symbols-outlined arrow" style="font-size:14px;">fiber_manual_record</span>' : '<span class="material-symbols-outlined arrow" style="font-size:14px;">east</span>')) + '</span>' +
        '</div>';
    });

    html += '</div>';
  }

  html += '</div></div>';
  return html;
}

function attachPanelEvents() {
  document.querySelectorAll('.player-row').forEach(function(row) {
    row.removeEventListener('click', handlePlayerClick);
    row.addEventListener('click', handlePlayerClick);
    row.removeEventListener('mousedown', handlePlayerMouseDown);
    row.addEventListener('mousedown', handlePlayerMouseDown);
    row.removeEventListener('mouseup', handlePlayerMouseUp);
    row.addEventListener('mouseup', handlePlayerMouseUp);
    row.removeEventListener('mouseleave', handlePlayerMouseLeave);
    row.addEventListener('mouseleave', handlePlayerMouseLeave);
  });

  document.querySelectorAll('.player-name[data-player-id]').forEach(function(el) {
    el.removeEventListener('click', handlePlayerNameClick);
    el.addEventListener('click', handlePlayerNameClick);
  });

  document.querySelectorAll('.draft-pick-row').forEach(function(row) {
    row.removeEventListener('click', handleDraftPickClick);
    row.addEventListener('click', handleDraftPickClick);
  });
}

var _longPressTimer = null;
var _longPressPlayer = null;
var _longPressRow = null;

function handlePlayerMouseDown(e) {
  if (e.button !== 0) return;
  var row = e.currentTarget;
  var playerId = row.getAttribute('data-player-id');
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === playerId; });
  if (!player) return;
  
  _longPressPlayer = player;
  _longPressRow = row;
  _longPressTimer = setTimeout(function() {
    showSalaryChartModal(player, team);
  }, 600);
}

function handlePlayerMouseUp(e) {
  if (_longPressTimer) {
    clearTimeout(_longPressTimer);
    _longPressTimer = null;
  }
}

function handlePlayerMouseLeave(e) {
  if (_longPressTimer) {
    clearTimeout(_longPressTimer);
    _longPressTimer = null;
  }
}

function showSalaryChartModal(player, team) {
  var modal = document.getElementById('modal-salary-chart');
  if (!modal) return;

  var titleEl = document.getElementById('salary-chart-title');
  var legendEl = document.getElementById('salary-chart-legend');
  var canvas = document.getElementById('salary-chart-canvas');
  if (!titleEl || !legendEl || !canvas) return;

  titleEl.innerHTML = '<span class="material-symbols-outlined">bar_chart</span> ' + player.name + ' 薪资折线图';

  // Build legend
  legendEl.innerHTML = '';
  var teamColor = team ? team.color : '#c8102e';
  var legendItem = document.createElement('span');
  legendItem.className = 'salary-chart-legend-item';
  legendItem.innerHTML = '<span class="salary-chart-legend-dot" style="background:' + teamColor + ';"></span>' +
    '<span class="legend-player-name">' + player.name + '</span>' +
    ' <span style="color:var(--outline-variant)">·</span> ' + (team ? team.shortName || team.name : '');
  legendEl.appendChild(legendItem);

  // Draw chart
  drawSalaryChart(canvas, player, teamColor);

  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function drawSalaryChart(canvas, player, lineColor) {
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var displayWidth = canvas.clientWidth || 500;
  var displayHeight = canvas.clientHeight || 260;
  
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  ctx.scale(dpr, dpr);

  var W = displayWidth;
  var H = displayHeight;
  var pad = { top: 30, bottom: 40, left: 70, right: 30 };
  var chartW = W - pad.left - pad.right;
  var chartH = H - pad.top - pad.bottom;

  // Collect salary data
  var years = ['2025-26', '2026-27', '2027-28', '2028-29', '2029-30'];
  var values = [
    player.salary,
    player.salary_2026_27,
    player.salary_2027_28,
    player.salary_2028_29,
    player.salary_2029_30
  ];

  // Filter to non-null values for scaling
  var validVals = values.filter(function(v) { return v !== null && v !== undefined; });
  if (validVals.length === 0) {
    ctx.fillStyle = '#ccc';
    ctx.font = '14px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('暂无薪资数据', W / 2, H / 2);
    return;
  }

  var maxVal = Math.max.apply(null, validVals);
  var minVal = Math.min.apply(null, validVals);
  var range = maxVal - minVal;
  if (range === 0) range = maxVal * 0.2 || 1;
  var yPadding = range * 0.1;
  var yMax = maxVal + yPadding;
  var yMin = Math.max(0, minVal - yPadding);

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, W, H);

  // Helper: y position
  function yPos(val) {
    if (val === null || val === undefined) return null;
    return pad.top + chartH - ((val - yMin) / (yMax - yMin)) * chartH;
  }

  // Draw horizontal grid lines
  ctx.strokeStyle = '#e8e8e8';
  ctx.lineWidth = 1;
  var gridCount = 5;
  for (var i = 0; i <= gridCount; i++) {
    var y = pad.top + (chartH / gridCount) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();

    // Y-axis labels
    var val = yMax - ((yMax - yMin) / gridCount) * i;
    ctx.fillStyle = '#999';
    ctx.font = '11px Hanken Grotesk, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(fmt(val), pad.left - 8, y);
  }

  // Calculate points
  var points = [];
  var stepX = chartW / (years.length - 1);
  for (var i = 0; i < years.length; i++) {
    var y = yPos(values[i]);
    points.push({
      x: pad.left + stepX * i,
      y: y,
      val: values[i],
      label: years[i]
    });
  }

  // Filter to valid points for drawing lines
  var validPoints = points.filter(function(p) { return p.y !== null; });

  // Draw area fill
  if (validPoints.length >= 2) {
    ctx.beginPath();
    var first = true;
    validPoints.forEach(function(p) {
      if (first) { ctx.moveTo(p.x, pad.top + chartH); ctx.lineTo(p.x, p.y); first = false; }
      else { ctx.lineTo(p.x, p.y); }
    });
    var last = validPoints[validPoints.length - 1];
    ctx.lineTo(last.x, pad.top + chartH);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, lineColor + '40');
    grad.addColorStop(1, lineColor + '05');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Draw line
  if (validPoints.length >= 2) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    validPoints.forEach(function(p, idx) {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  // Draw dots and labels
  points.forEach(function(p) {
    // X-axis label
    ctx.fillStyle = '#888';
    ctx.font = '11px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(p.label, p.x, pad.top + chartH + 8);

    if (p.y === null) {
      // Draw empty marker (X)
      ctx.fillStyle = '#ccc';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✕', p.x, pad.top + chartH / 2);
      return;
    }

    // Dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Value label above dot
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Hanken Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.val), p.x, p.y - 8);
  });
}

function closeSalaryChartModal() {
  var modal = document.getElementById('modal-salary-chart');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function handlePlayerNameClick(e) {
  e.stopPropagation();
  var pid = this.getAttribute('data-player-id');
  var row = this.closest('.player-row');
  if (!row) return;
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === pid; });
  if (!player) return;

  if (isFreeAgent(player)) {
    showToast(player.name + ' — 自由球员，不可交易', 'warn');
    return;
  }

  if (isPlayerInTrade(pid)) {
    removeMove(pid);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addMove(player, teamId, destTeam.id);
      return;
    }
  }

  openDestinationModal(player, teamId);
}

function handlePlayerClick(e) {
  var row = e.currentTarget;
  var playerId = row.getAttribute('data-player-id');
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === playerId; });

  if (!player) return;

  if (isFreeAgent(player)) {
    showToast(player.name + ' — 自由球员，不可交易', 'warn');
    return;
  }

  if (isPlayerInTrade(playerId)) {
    removeMove(playerId);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addMove(player, teamId, destTeam.id);
      return;
    }
  }

  openDestinationModal(player, teamId);
}

function getTeamShortName(teamId) {
  var t = TEAMS_DATA[teamId];
  return t ? (t.shortName || t.name) : teamId;
}

function handleDraftPickClick(e) {
  var row = e.currentTarget;
  var pickId = row.getAttribute('data-pick-id');
  var teamId = row.getAttribute('data-team-id');
  var draftPicks = DRAFT_PICKS_DATA[teamId] || [];
  var pick = draftPicks.find(function(p) { return p.id === pickId; });

  if (!pick) return;

  if (isDraftPickInTrade(pickId)) {
    removeMove(pickId);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addDraftPickMove(pick, teamId, destTeam.id);
      return;
    }
  }

  openDraftPickDestModal(pick, teamId);
}

function openDraftPickDestModal(draftPick, fromTeamId) {
  var modal = document.getElementById('modal-dest');
  var body = document.getElementById('modal-dest-body');
  var title = document.getElementById('modal-dest-title');

  var roundLabel = draftPick.round === 1 ? '首轮' : '次轮';
  title.textContent = '将 ' + draftPick.year + ' ' + roundLabel + ' 送至';

  var html = '<div class="dest-player-info">' +
    '<span style="color:var(--on-surface-variant);">来自 </span>' +
    '<b>' + getTeamShortName(fromTeamId) + '</b>' +
    '<span style="color:var(--on-surface-variant);"> · ' + draftPick.label + '</span>' +
    '</div>';

  html += '<div class="modal-section-title">选择目标球队</div>';

  state.teams.forEach(function(t) {
    if (t.id === fromTeamId) return;
    html += '<div class="modal-team-row" data-team-id="' + t.id + '" role="button" tabindex="0">' +
      '<div class="modal-team-logo" style="background:' + t.color + ';">' + getShortName(t, 2) + '</div>' +
      '<span class="modal-team-name">' + t.name + '</span>' +
      '<span class="material-symbols-outlined" style="margin-left:auto;font-size:16px;color:var(--outline-variant);">east</span>' +
      '</div>';
  });

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var toTeamId = this.getAttribute('data-team-id');
      addDraftPickMove(draftPick, fromTeamId, toTeamId);
      hideModal('modal-dest');
    });
  });

  showModal('modal-dest');
}

function renderCheckButton() {
}

function updateResultVisibility() {
}

function openTeamModal() {
  var modal = document.getElementById('modal-team');
  var body = document.getElementById('modal-team-body');
  var selectedIds = state.teams.map(function(t) { return t.id; });

  var westTeams = TEAM_LIST.filter(function(t) { return t.conference === 'west'; });
  var eastTeams = TEAM_LIST.filter(function(t) { return t.conference === 'east'; });

  var html = '<div class="modal-team-intro">选择一支球队开始交易模拟</div>';

  html += '<div class="modal-conf-section">';
  html += '<div class="modal-conf-title conf-east"><span class="material-symbols-outlined" style="font-size:16px;">public</span> 东部联盟 · EASTERN</div>';
  html += '<div class="modal-team-grid">';
  eastTeams.forEach(function(t) {
    var isSelected = selectedIds.indexOf(t.id) !== -1;
    var isFull = state.teams.length >= MAX_TEAMS;
    html += renderTeamCard(t, isSelected, isFull);
  });
  html += '</div></div>';

  html += '<div class="modal-conf-section">';
  html += '<div class="modal-conf-title conf-west"><span class="material-symbols-outlined" style="font-size:16px;">public</span> 西部联盟 · WESTERN</div>';
  html += '<div class="modal-team-grid">';
  westTeams.forEach(function(t) {
    var isSelected = selectedIds.indexOf(t.id) !== -1;
    var isFull = state.teams.length >= MAX_TEAMS;
    html += renderTeamCard(t, isSelected, isFull);
  });
  html += '</div></div>';

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var tid = this.getAttribute('data-team-id');
      if (this.classList.contains('selected') || this.classList.contains('disabled')) return;
      addTeam(tid);
      hideModal('modal-team');
    });
  });

  showModal('modal-team');
}

function renderTeamCard(team, isSelected, isFull) {
  var city = team.name.replace(team.shortName, '').trim();
  var cls = 'modal-team-card';
  if (isSelected) cls += ' selected';
  if (isFull && !isSelected) cls += ' disabled';

  return '<div class="' + cls + '" data-team-id="' + team.id + '" role="button" tabindex="0">' +
    '<div class="modal-card-letter-bg" aria-hidden="true">' + String(team.id).toUpperCase() + '</div>' +
    '<div class="modal-card-left">' +
      '<div class="modal-card-logo" style="background:' + team.color + ';">' +
        '<span>' + String(team.id).toUpperCase().substring(0, 2) + '</span>' +
      '</div>' +
      '<div class="modal-card-info">' +
        '<div class="modal-card-city">' + team.shortName + '</div>' +
        '<div class="modal-card-name">' + city + '</div>' +
      '</div>' +
    '</div>' +
    '<button class="modal-card-trade-btn' + (isSelected ? ' is-selected' : '') + '"' +
      ' type="button">' +
      (isSelected
        ? '<span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> 已选'
        : '<span class="material-symbols-outlined" style="font-size:16px;">swap_horiz</span> Trade') +
    '</button>' +
  '</div>';
}

function openDestinationModal(player, fromTeamId) {
  var modal = document.getElementById('modal-dest');
  var body = document.getElementById('modal-dest-body');
  var title = document.getElementById('modal-dest-title');

  title.textContent = '将 ' + player.name + ' 送至';

  var html = '<div class="dest-player-info">' +
    '<span style="color:var(--on-surface-variant);">来自 </span>' +
    '<b>' + getShortName(TEAMS_DATA[fromTeamId], 6) + '</b>' +
    '<span style="color:var(--on-surface-variant);"> · ' + fmt(player.salary) + '</span>' +
    (player.restricted ? ' <span style="color:var(--tertiary);font-size:11px;"><span class="material-symbols-outlined" style="font-size:12px;vertical-align:middle;">lock</span> ' + restrictionLabel(player.restrictionType) + '</span>' : '') +
    '</div>';

  html += '<div class="modal-section-title">选择目标球队</div>';

  state.teams.forEach(function(t) {
    if (t.id === fromTeamId) return;
    html += '<div class="modal-team-row" data-team-id="' + t.id + '" role="button" tabindex="0">' +
      '<div class="modal-team-logo" style="background:' + t.color + ';">' + getShortName(t, 2) + '</div>' +
      '<span class="modal-team-name">' + t.name + '</span>' +
      '<span class="material-symbols-outlined" style="margin-left:auto;font-size:16px;color:var(--outline-variant);">east</span>' +
      '</div>';
  });

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var toTeamId = this.getAttribute('data-team-id');
      addMove(player, fromTeamId, toTeamId);
      hideModal('modal-dest');
    });
  });

  showModal('modal-dest');
}


var playerDetailVisible = false;

function showPlayerDetail(playerId) {
  var player = null;
  var playerTeam = null;

  for (var tid in TEAMS_DATA) {
    var team = TEAMS_DATA[tid];
    for (var i = 0; i < team.players.length; i++) {
      if (team.players[i].id === playerId) {
        player = team.players[i];
        playerTeam = team;
        break;
      }
    }
    if (player) break;
  }

  if (!player || !playerTeam) return;

  var container = document.getElementById('player-detail-overlay');
  if (!container) {
    container = document.createElement('div');
    container.id = 'player-detail-overlay';
    container.className = 'player-detail-overlay';
    document.body.appendChild(container);
  }

  var stats = player.stats || {};
  var hasStats = stats.g > 0;

  var html = '<div class="player-detail-panel">';

  html += '<div class="player-detail-back" id="player-detail-close">';
  html += '<span class="material-symbols-outlined">close</span>';
  html += '</div>';

  html += '<div class="player-detail-header">';
  html += '<div class="player-detail-avatar" style="background:' + playerTeam.color + ';">';
  html += '<span>' + player.name.substring(0, 1) + '</span>';
  html += '</div>';
  html += '<div class="player-detail-info">';
  html += '<h1 class="player-detail-name">' + player.name + '</h1>';
  html += '<div class="player-detail-meta">';
  html += '<span class="player-detail-team" data-team-id="' + playerTeam.id + '">' + playerTeam.shortName + '</span>';
  if (player.pos) html += '<span class="player-detail-pos">' + player.pos + '</span>';
  html += '</div>';
  html += '<div class="player-detail-physical">';
  if (player.ht) html += '<span>' + formatHeight(player.ht) + '</span>';
  if (player.wt) html += '<span>' + player.wt + ' lbs</span>';
  if (player.exp) html += '<span>' + formatExp(player.exp) + '</span>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  html += '<div class="player-detail-contract">';
  html += '<div class="pdc-item">';
  html += '<span class="pdc-label">年薪</span>';
  html += '<span class="pdc-value">' + fmtFull(player.salary) + '</span>';
  html += '</div>';
  html += '<div class="pdc-item">';
  html += '<span class="pdc-label">能力值</span>';
  html += '<span class="pdc-value">' + (player['2k_rating'] != null ? player['2k_rating'] : '-') + '</span>';
  html += '</div>';
  if (player.yearsRemaining) {
    html += '<div class="pdc-item">';
    html += '<span class="pdc-label">剩余年限</span>';
    html += '<span class="pdc-value">' + player.yearsRemaining + '年</span>';
    html += '</div>';
  }
  html += '</div>';

  if (hasStats) {
    html += '<div class="player-detail-section">';
    html += '<h2 class="player-detail-section-title">赛季数据</h2>';
    html += '<div class="player-stats-overview">';
    html += '<div class="pso-item pso-highlight"><span class="pso-value">' + (stats.pts || 0) + '</span><span class="pso-label">得分</span></div>';
    html += '<div class="pso-item"><span class="pso-value">' + (stats.ast || 0) + '</span><span class="pso-label">助攻</span></div>';
    html += '<div class="pso-item"><span class="pso-value">' + (stats.trb || 0) + '</span><span class="pso-label">篮板</span></div>';
    html += '<div class="pso-item"><span class="pso-value">' + (stats.stl || 0) + '</span><span class="pso-label">抢断</span></div>';
    html += '<div class="pso-item"><span class="pso-value">' + (stats.blk || 0) + '</span><span class="pso-label">盖帽</span></div>';
    html += '<div class="pso-item"><span class="pso-value">' + (stats.mp || 0) + '</span><span class="pso-label">分钟</span></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="player-detail-section">';
    html += '<h2 class="player-detail-section-title">详细数据</h2>';
    html += '<div class="player-stats-detail">';

    var detailRows = [
      { label: '出场', gs: '首发', val: stats.g, val2: stats.gs },
      { label: '投篮', sub: '命中率', val: stats.fg, val2: stats.fga ? (stats.fga * 100).toFixed(1) + '%' : null },
      { label: '三分', sub: '命中率', val: stats.fg3, val2: stats.fg3a ? (stats.fg3a * 100).toFixed(1) + '%' : null },
      { label: '罚球', sub: '命中率', val: stats.ft, val2: stats.ft_pct ? (stats.ft_pct * 100).toFixed(1) + '%' : null },
      { label: '前板', sub: '后板', val: stats.orb, val2: stats.drb },
      { label: '失误', sub: '犯规', val: stats.tov, val2: stats.pf }
    ];

    detailRows.forEach(function(row) {
      html += '<div class="psd-row">';
      html += '<span class="psd-label">' + row.label + '</span>';
      html += '<span class="psd-value">' + (row.val != null ? row.val : '-') + '</span>';
      if (row.val2 != null) {
        html += '<span class="psd-sub">' + row.sub + ' ' + row.val2 + '</span>';
      }
      html += '</div>';
    });

    html += '</div>';
    html += '</div>';
  }

  html += '<div class="player-detail-action">';
  html += '<button class="action-btn ai-btn" id="btn-player-trade" data-player-id="' + player.id + '" type="button">';
  html += '<span class="material-symbols-outlined">swap_horiz</span>';
  html += '<span>加入交易模拟</span>';
  html += '</button>';
  html += '</div>';

  html += '</div>';

  container.innerHTML = html;
  container.classList.add('active');
  playerDetailVisible = true;
  document.body.style.overflow = 'hidden';

  container.addEventListener('click', function(e) {
    if (e.target === container) closePlayerDetail();
  });

  document.getElementById('player-detail-close').addEventListener('click', closePlayerDetail);

  var tradeBtn = document.getElementById('btn-player-trade');
  if (tradeBtn) {
    tradeBtn.addEventListener('click', function() {
      var pid = this.getAttribute('data-player-id');
      closePlayerDetail();
      switchMainTab('trade');
      setTimeout(function() {
        var p = findPlayerById(pid);
        if (p && p.teamId) addTeam(p.teamId);
      }, 200);
    });
  }

  var teamLink = container.querySelector('.player-detail-team');
  if (teamLink) {
    teamLink.addEventListener('click', function() {
      var tid = this.getAttribute('data-team-id');
      closePlayerDetail();
      switchMainTab('teams');
      setTimeout(function() {
        if (typeof showTeamDetail === 'function') showTeamDetail(tid);
      }, 100);
    });
  }
}

function closePlayerDetail() {
  var container = document.getElementById('player-detail-overlay');
  if (container) {
    container.classList.remove('active');
    playerDetailVisible = false;
    document.body.style.overflow = '';
  }
}

function findPlayerById(playerId) {
  for (var tid in TEAMS_DATA) {
    var team = TEAMS_DATA[tid];
    for (var i = 0; i < team.players.length; i++) {
      if (team.players[i].id === playerId) {
        return { player: team.players[i], teamId: tid };
      }
    }
  }
  return null;
}

function formatHeight(inches) {
  if (!inches) return '';
  var ft = Math.floor(inches / 12);
  var inch = inches % 12;
  return ft + '\'' + inch + '"';
}

function formatExp(exp) {
  if (exp === 'R' || exp === '0') return '新秀';
  return exp + '年经验';
}


function initApp() {
  patchPlayerSalaries();
  initMainTabs();

  document.getElementById('modal-team-close').addEventListener('click', function() {
    hideModal('modal-team');
  });
  document.getElementById('modal-team').addEventListener('click', function(e) {
    if (e.target === this) hideModal('modal-team');
  });

  document.getElementById('modal-dest-close').addEventListener('click', function() {
    hideModal('modal-dest');
  });
  document.getElementById('modal-dest').addEventListener('click', function(e) {
    if (e.target === this) hideModal('modal-dest');
  });

  document.getElementById('modal-trade-result-close').addEventListener('click', function() {
    hideModal('modal-trade-result');
  });
  document.getElementById('modal-trade-result').addEventListener('click', function(e) {
    if (e.target === this) hideModal('modal-trade-result');
  });

  document.getElementById('btn-check-trade').addEventListener('click', function() {
    if (this.disabled) return;
    checkTrade();
  });

  document.getElementById('btn-reset').addEventListener('click', function() {
    if (state.teams.length || state.moves.length) {
      resetAll();
      hideModal('modal-trade-result');
    }
  });

  document.getElementById('modal-salary-chart-close').addEventListener('click', function() {
    closeSalaryChartModal();
  });
  document.getElementById('modal-salary-chart').addEventListener('click', function(e) {
    if (e.target === this) closeSalaryChartModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideAllModals();
      closeSalaryChartModal();
    }
  });

  restoreFromUrl();
  renderAll();

  window.__tradeState = state;
}

function handleShare() {
  if (state.teams.length === 0) { showToast('请先添加球队', 'warn'); return; }

  var params = new URLSearchParams();
  state.teams.forEach(function(t) { params.append('t', t.id); });
  state.moves.forEach(function(m) { params.append('m', m.player.id + '|' + m.from + '|' + m.to); });

  var url = window.location.origin + window.location.pathname + '?' + params.toString();
  var shareText = url + '\n🏀 NBA AI经理 · 交易模拟器\n关注抖音: https://v.douyin.com/-Qhq5XTt_rM/';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(function() {
      showToast('🔗 交易链接已复制（含抖音关注链接）', 'success');
    }).catch(function() {
      showToast('链接: ' + url, 'info');
    });
  } else {
    showToast('链接: ' + url, 'info');
  }
}

function restoreFromUrl() {
  try {
    var sp = new URLSearchParams(window.location.search);
    var teamIds = sp.getAll('t');
    var moveParams = sp.getAll('m');

    teamIds.forEach(function(tid) {
      if (TEAMS_DATA[tid] && state.teams.length < MAX_TEAMS) {
        state.teams.push(TEAMS_DATA[tid]);
      }
    });

    moveParams.forEach(function(param) {
      var parts = param.split('|');
      if (parts.length !== 3) return;
      var pid = parts[0], fromId = parts[1], toId = parts[2];

      var fromTeam = TEAMS_DATA[fromId];
      if (!fromTeam) return;
      var player = fromTeam.players.find(function(p) { return p.id === pid; });
      if (!player) return;
      if (!hasTeam(fromId) || !hasTeam(toId)) return;

      state.moves.push({ player: player, from: fromId, to: toId });
    });

    if (state.teams.length) showToast('📎 已从链接恢复交易方案', 'info');
  } catch (e) {}
}

var currentMainTab = 'trade';

function initMainTabs() {
  var links = document.querySelectorAll('.top-nav-link');
  links.forEach(function(link) {
    link.addEventListener('click', function() {
      switchMainTab(this.getAttribute('data-tab'));
    });
  });

  document.getElementById('btn-home').addEventListener('click', function() {
  });
}

function switchMainTab(tabId) {
  if (tabId === currentMainTab) return;
  currentMainTab = tabId;

  document.querySelectorAll('.top-nav-link').forEach(function(t) {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.tab-panel').forEach(function(p) {
    p.classList.toggle('active', p.id === 'tab-' + tabId);
  });

  var checkBtn = document.getElementById('btn-check-trade');
  if (tabId === 'trade') {
    if (checkBtn) checkBtn.style.display = '';
  } else {
    if (checkBtn) checkBtn.style.display = 'none';
  }

  if (tabId === 'home' && typeof renderHomePage === 'function') renderHomePage();
  if (tabId === 'teams' && typeof renderTeamList === 'function') renderTeamList();
  if (tabId === 'data' && typeof renderDataTab === 'function') renderDataTab();
}

window.addEventListener('load', function() {
  var ratingsPromise = window.ratingsReady || Promise.resolve();
  ratingsPromise.then(function() {
    try {
      initApp();
    } catch (error) {
      console.error(error);
      var fb = document.createElement('div');
      fb.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0f1117;color:#e2e8f0;font-size:16px;padding:24px;text-align:center;z-index:9999;';
      fb.textContent = '哎呀，出错了，请刷新页面试试吧~';
      document.body.innerHTML = '';
      document.body.appendChild(fb);
    }
  });
});

