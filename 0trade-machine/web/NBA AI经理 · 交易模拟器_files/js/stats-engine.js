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
