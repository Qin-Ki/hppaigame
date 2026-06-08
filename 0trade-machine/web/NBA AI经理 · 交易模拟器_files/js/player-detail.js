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
