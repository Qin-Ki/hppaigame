var RankingsModule = (function() {

  var PLAYER_STATS = [
    { key: 'pts', label: '得分', icon: 'local_fire_department' },
    { key: 'ast', label: '助攻', icon: 'passkey' },
    { key: 'trb', label: '篮板', icon: 'fitness_center' },
    { key: 'stl', label: '抢断', icon: 'back_hand' },
    { key: 'blk', label: '盖帽', icon: 'shield' },
    { key: 'rating', label: '能力值', icon: 'trending_up' },
    { key: 'fg3', label: '三分', icon: 'gps_fixed' },
    { key: 'fg_pct', label: '命中率', icon: 'my_location' },
    { key: 'g', label: '出场', icon: 'event_available' },
    { key: 'mp', label: '上场时间', icon: 'timer' }
  ];

  var TEAM_STATS = [
    { key: 'pts', label: '团队得分', icon: 'local_fire_department' },
    { key: 'ast', label: '团队助攻', icon: 'passkey' },
    { key: 'trb', label: '团队篮板', icon: 'fitness_center' },
    { key: 'stl', label: '团队抢断', icon: 'back_hand' },
    { key: 'blk', label: '团队盖帽', icon: 'shield' },
    { key: 'totalSalary', label: '总薪资', icon: 'payments' },
    { key: 'capRoom', label: '帽空间', icon: 'account_balance_wallet' },
    { key: 'avgRating', label: '平均能力值', icon: 'trending_up' }
  ];

  var SALARY_TABS = [
    { key: 'topSalary', label: '最高薪资', icon: 'payments' },
    { key: 'expiring', label: '到期合同', icon: 'schedule' },
    { key: 'tpe', label: 'TPE持有', icon: 'swap_horiz' }
  ];

  var currentRankingTab = 'player';
  var currentPlayerStat = 'pts';
  var currentTeamStat = 'pts';
  var currentSalaryTab = 'topSalary';
  var showAllPlayers = false;
  var showAllTeams = false;

  function render() {
    var container = document.getElementById('data-tab-content');
    if (!container) return;

    container.innerHTML = '';

    renderGameResultsSection(container);

    var section = document.createElement('div');
    section.className = 'rankings-section';
    section.innerHTML = renderRankingsLayout();
    container.appendChild(section);

    bindEvents(section);
    renderDimTabs(section);
    renderActiveRanking(section);
  }

  function renderRankingsLayout() {
    var html = '';

    html += '<div class="rankings-main-tabs">';
    html += '<button class="rankings-main-tab active" data-rank-tab="player">';
    html += '<span class="material-symbols-outlined">person</span>';
    html += '<span>球员榜</span>';
    html += '</button>';
    html += '<button class="rankings-main-tab" data-rank-tab="team">';
    html += '<span class="material-symbols-outlined">groups</span>';
    html += '<span>球队榜</span>';
    html += '</button>';
    html += '<button class="rankings-main-tab" data-rank-tab="salary">';
    html += '<span class="material-symbols-outlined">payments</span>';
    html += '<span>薪资榜</span>';
    html += '</button>';
    html += '</div>';

    html += '<div class="rankings-dim-tabs" id="rankings-dim-tabs"></div>';
    html += '<div class="rankings-table-wrapper" id="rankings-table-wrapper"></div>';

    return html;
  }

  function bindEvents(section) {
    var mainTabs = section.querySelectorAll('.rankings-main-tab');
    mainTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        mainTabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        currentRankingTab = this.getAttribute('data-rank-tab');
        showAllPlayers = false;
        showAllTeams = false;
        renderDimTabs(section);
        renderActiveRanking(section);
      });
    });
  }

  function renderDimTabs(section) {
    var dimContainer = section.querySelector('#rankings-dim-tabs');
    if (!dimContainer) return;

    var tabs = [];
    if (currentRankingTab === 'player') tabs = PLAYER_STATS;
    else if (currentRankingTab === 'team') tabs = TEAM_STATS;
    else tabs = SALARY_TABS;

    var html = '';
    tabs.forEach(function(t, i) {
      var active = '';
      if (currentRankingTab === 'player' && t.key === currentPlayerStat) active = ' active';
      if (currentRankingTab === 'team' && t.key === currentTeamStat) active = ' active';
      if (currentRankingTab === 'salary' && t.key === currentSalaryTab) active = ' active';
      html += '<button class="rankings-dim-tab' + active + '" data-dim="' + t.key + '">';
      html += '<span class="material-symbols-outlined">' + t.icon + '</span>';
      html += '<span>' + t.label + '</span>';
      html += '</button>';
    });

    dimContainer.innerHTML = html;

    dimContainer.querySelectorAll('.rankings-dim-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        dimContainer.querySelectorAll('.rankings-dim-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var dim = this.getAttribute('data-dim');
        if (currentRankingTab === 'player') currentPlayerStat = dim;
        else if (currentRankingTab === 'team') currentTeamStat = dim;
        else currentSalaryTab = dim;
        showAllPlayers = false;
        showAllTeams = false;
        renderActiveRanking(section);
      });
    });
  }

  function renderActiveRanking(section) {
    var wrapper = section.querySelector('#rankings-table-wrapper');
    if (!wrapper) return;

    if (currentRankingTab === 'player') {
      wrapper.innerHTML = renderPlayerRanking();
    } else if (currentRankingTab === 'team') {
      wrapper.innerHTML = renderTeamRanking();
    } else {
      wrapper.innerHTML = renderSalaryRanking();
    }

    bindTableEvents(wrapper, section);
  }

  function renderPlayerRanking() {
    var stat = currentPlayerStat;
    var topN = showAllPlayers ? 50 : 20;
    var players = StatsEngine.getTopPlayers(stat, topN);

    if (!players || players.length === 0) {
      return '<div class="rankings-empty">暂无数据</div>';
    }

    var html = '<table class="rankings-table">';
    html += '<thead><tr>';
    html += '<th class="rank-col">#</th>';
    html += '<th class="player-col">球员</th>';
    html += '<th class="team-col">球队</th>';
    html += '<th class="value-col">' + StatsEngine.getStatLabel(stat) + '</th>';
    html += '<th class="salary-col">薪资</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    players.forEach(function(p) {
      var rankClass = p.rank <= 3 ? ' rank-top-' + p.rank : '';
      var teamColor = p.teamColor || '#666';

      html += '<tr class="rankings-row" data-player-id="' + p.id + '" data-team-id="' + p.teamId + '">';
      html += '<td class="rank-col' + rankClass + '">' + formatRank(p.rank) + '</td>';
      html += '<td class="player-col">';
      html += '<span class="rankings-player-name">' + p.name + '</span>';
      if (p.pos) html += '<span class="rankings-player-pos">' + p.pos + '</span>';
      html += '</td>';
      html += '<td class="team-col">';
      html += '<span class="rankings-team-badge" style="background:' + teamColor + ';">' + (p.teamName || '') + '</span>';
      html += '</td>';
      html += '<td class="value-col">' + StatsEngine.formatValue(p.value, stat) + '</td>';
      html += '<td class="salary-col">' + StatsEngine.formatValue(p.salary, 'salary') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    if (!showAllPlayers && players.length >= 20) {
      html += '<button class="rankings-show-more" id="btn-show-more-players">展开全部 Top 50</button>';
    }

    return html;
  }

  function renderTeamRanking() {
    var stat = currentTeamStat;
    var teams = StatsEngine.getTeamRanking(stat);
    var topN = showAllTeams ? 30 : 20;
    teams = teams.slice(0, topN);

    if (!teams || teams.length === 0) {
      return '<div class="rankings-empty">暂无数据</div>';
    }

    var html = '<table class="rankings-table">';
    html += '<thead><tr>';
    html += '<th class="rank-col">#</th>';
    html += '<th class="team-col">球队</th>';
    html += '<th class="conf-col">联盟</th>';
    html += '<th class="value-col">' + StatsEngine.getStatLabel(stat) + '</th>';
    html += '<th class="salary-col">总薪资</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    teams.forEach(function(t) {
      var rankClass = t.rank <= 3 ? ' rank-top-' + t.rank : '';
      var teamColor = t.color || '#666';

      html += '<tr class="rankings-row" data-team-id="' + t.id + '">';
      html += '<td class="rank-col' + rankClass + '">' + formatRank(t.rank) + '</td>';
      html += '<td class="team-col">';
      html += '<span class="rankings-team-badge" style="background:' + teamColor + ';">' + (t.shortName || t.name) + '</span>';
      html += '</td>';
      html += '<td class="conf-col">' + (t.conference === 'east' ? '东部' : '西部') + '</td>';
      html += '<td class="value-col">' + StatsEngine.formatValue(t.value, stat) + '</td>';
      html += '<td class="salary-col">' + StatsEngine.formatValue(t.totalSalary, 'salary') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    if (!showAllTeams && teams.length >= 20) {
      html += '<button class="rankings-show-more" id="btn-show-more-teams">展开全部 30 队</button>';
    }

    return html;
  }

  function renderSalaryRanking() {
    var tab = currentSalaryTab;

    if (tab === 'topSalary') return renderTopSalary();
    if (tab === 'expiring') return renderExpiringContracts();
    if (tab === 'tpe') return renderTPEHoldings();

    return '<div class="rankings-empty">暂无数据</div>';
  }

  function renderTopSalary() {
    var players = StatsEngine.getTopPlayers('salary', 20);

    if (!players || players.length === 0) {
      return '<div class="rankings-empty">暂无数据</div>';
    }

    var html = '<table class="rankings-table">';
    html += '<thead><tr>';
    html += '<th class="rank-col">#</th>';
    html += '<th class="player-col">球员</th>';
    html += '<th class="team-col">球队</th>';
    html += '<th class="value-col">年薪</th>';
    html += '<th class="extra-col">能力值</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    players.forEach(function(p) {
      var rankClass = p.rank <= 3 ? ' rank-top-' + p.rank : '';
      var teamColor = p.teamColor || '#666';

      html += '<tr class="rankings-row" data-player-id="' + p.id + '" data-team-id="' + p.teamId + '">';
      html += '<td class="rank-col' + rankClass + '">' + formatRank(p.rank) + '</td>';
      html += '<td class="player-col">';
      html += '<span class="rankings-player-name">' + p.name + '</span>';
      html += '</td>';
      html += '<td class="team-col">';
      html += '<span class="rankings-team-badge" style="background:' + teamColor + ';">' + (p.teamName || '') + '</span>';
      html += '</td>';
      html += '<td class="value-col">' + StatsEngine.formatValue(p.value, 'salary') + '</td>';
      html += '<td class="extra-col">' + (p.rating !== null && p.rating !== undefined ? p.rating : '-') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    return html;
  }

  function renderExpiringContracts() {
    var allPlayers = StatsEngine.getAllPlayers();
    var expiring = allPlayers.filter(function(p) {
      return p.yearsRemaining === 1 && p.salary > 0;
    });

    expiring.sort(function(a, b) {
      return b.salary - a.salary;
    });

    var top = expiring.slice(0, 20);

    if (top.length === 0) {
      return '<div class="rankings-empty">暂无到期合同数据</div>';
    }

    var html = '<table class="rankings-table">';
    html += '<thead><tr>';
    html += '<th class="rank-col">#</th>';
    html += '<th class="player-col">球员</th>';
    html += '<th class="team-col">球队</th>';
    html += '<th class="value-col">到期年薪</th>';
    html += '<th class="extra-col">能力值</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    top.forEach(function(p, i) {
      var rank = i + 1;
      var rankClass = rank <= 3 ? ' rank-top-' + rank : '';
      var teamColor = p.teamColor || '#666';

      html += '<tr class="rankings-row" data-player-id="' + p.id + '" data-team-id="' + p.teamId + '">';
      html += '<td class="rank-col' + rankClass + '">' + formatRank(rank) + '</td>';
      html += '<td class="player-col">';
      html += '<span class="rankings-player-name">' + p.name + '</span>';
      html += '</td>';
      html += '<td class="team-col">';
      html += '<span class="rankings-team-badge" style="background:' + teamColor + ';">' + (p.teamShortName || '') + '</span>';
      html += '</td>';
      html += '<td class="value-col">' + StatsEngine.formatValue(p.salary, 'salary') + '</td>';
      html += '<td class="extra-col">' + (p['2k_rating'] !== null && p['2k_rating'] !== undefined ? p['2k_rating'] : '-') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    return html;
  }

  var tpeCache = null;

  function renderTPEHoldings() {
    if (tpeCache) {
      return renderTPETable(tpeCache);
    }

    var wrapper = document.getElementById('rankings-table-wrapper');
    if (wrapper) {
      wrapper.innerHTML = '<div class="rankings-empty"><span class="material-symbols-outlined spinning">progress_activity</span> 加载TPE数据...</div>';
    }

    fetch('data/output/team_tpes.json')
      .then(function(r) { return r.ok ? r.json() : null; })
      .then(function(data) {
        if (!data || !data.teams) {
          tpeCache = [];
          updateTPEView();
          return;
        }

        var tpeList = [];
        for (var name in data.teams) {
          var entry = data.teams[name];
          var teamId = entry.abbrev ? entry.abbrev.toLowerCase() : '';
          var team = TEAMS_DATA[teamId];
          var tpes = entry.tpes || [];
          var totalTPE = 0;
          var count = 0;

          tpes.forEach(function(tpe) {
            if (tpe.amount) {
              totalTPE += tpe.amount;
              count++;
            }
          });

          if (totalTPE > 0) {
            tpeList.push({
              teamId: teamId,
              name: team ? team.name : name,
              shortName: team ? team.shortName : name,
              color: team ? team.color : '#666',
              conference: team ? team.conference : '',
              totalTPE: totalTPE,
              count: count
            });
          }
        }

        tpeList.sort(function(a, b) { return b.totalTPE - a.totalTPE; });
        tpeCache = tpeList;
        updateTPEView();
      })
      .catch(function() {
        tpeCache = [];
        updateTPEView();
      });

    return '';
  }

  function updateTPEView() {
    var wrapper = document.getElementById('rankings-table-wrapper');
    if (!wrapper) return;
    var section = wrapper.closest('.rankings-section');
    wrapper.innerHTML = renderTPETable(tpeCache);
    if (section) bindTableEvents(wrapper, section);
  }

  function renderTPETable(tpeList) {
    if (!tpeList || tpeList.length === 0) {
      return '<div class="rankings-empty">暂无TPE数据</div>';
    }

    var html = '<table class="rankings-table">';
    html += '<thead><tr>';
    html += '<th class="rank-col">#</th>';
    html += '<th class="team-col">球队</th>';
    html += '<th class="conf-col">联盟</th>';
    html += '<th class="value-col">TPE总额</th>';
    html += '<th class="extra-col">数量</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    tpeList.forEach(function(t, i) {
      var rank = i + 1;
      var rankClass = rank <= 3 ? ' rank-top-' + rank : '';

      html += '<tr class="rankings-row" data-team-id="' + t.teamId + '">';
      html += '<td class="rank-col' + rankClass + '">' + formatRank(rank) + '</td>';
      html += '<td class="team-col">';
      html += '<span class="rankings-team-badge" style="background:' + t.color + ';">' + t.shortName + '</span>';
      html += '</td>';
      html += '<td class="conf-col">' + (t.conference === 'east' ? '东部' : '西部') + '</td>';
      html += '<td class="value-col">' + StatsEngine.formatValue(t.totalTPE, 'salary') + '</td>';
      html += '<td class="extra-col">' + t.count + '个</td>';
      html += '</tr>';
    });

    html += '</tbody></table>';

    return html;
  }

  function bindTableEvents(wrapper, section) {
    wrapper.querySelectorAll('.rankings-row[data-player-id]').forEach(function(row) {
      row.addEventListener('click', function() {
        var playerId = this.getAttribute('data-player-id');
        if (typeof showPlayerDetail === 'function' && playerId) {
          showPlayerDetail(playerId);
        }
      });
    });

    wrapper.querySelectorAll('.rankings-row[data-team-id]:not([data-player-id])').forEach(function(row) {
      row.addEventListener('click', function() {
        var teamId = this.getAttribute('data-team-id');
        if (typeof showTeamDetail === 'function') {
          showTeamDetail(teamId);
        }
      });
    });

    var showMoreBtn = wrapper.querySelector('#btn-show-more-players');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', function() {
        showAllPlayers = true;
        renderActiveRanking(section);
      });
    }

    var showMoreTeamsBtn = wrapper.querySelector('#btn-show-more-teams');
    if (showMoreTeamsBtn) {
      showMoreTeamsBtn.addEventListener('click', function() {
        showAllTeams = true;
        renderActiveRanking(section);
      });
    }
  }

  function formatRank(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return String(rank);
  }

  return {
    render: render
  };

})();

function renderDataTab() {
  RankingsModule.render();
}
