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
