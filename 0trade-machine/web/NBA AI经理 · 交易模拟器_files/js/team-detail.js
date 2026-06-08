var tpeCache = null;

function showTeamDetail(teamId) {
  var team = TEAMS_DATA[teamId];
  if (!team) return;

  var container = document.getElementById('teams-tab-content');
  if (!container) return;

  var totalSalary = team.players.reduce(function(s, p) { return s + p.salary; }, 0);
  var confLabel = team.conference === 'east' ? '东部' : '西部';
  var capLabel = team.capRoom >= 0 ? '帽空间' : '超税线';
  var capValue = team.capRoom >= 0 ? fmtFull(team.capRoom) : fmtFull(Math.abs(team.capRoom));
  var capClass = team.capRoom >= 0 ? 'success' : 'danger';

  var html = '';

  html += '<div class="team-detail-back" id="team-detail-back">' +
    '<span class="material-symbols-outlined">arrow_back</span>' +
    '<span>返回球队列表</span>' +
  '</div>';

  html += '<div class="team-detail-header" style="border-left-color:' + team.color + ';">';
  html += '<div class="team-detail-logo" style="background:' + team.color + ';">' + getShortName(team, 2) + '</div>';
  html += '<div class="team-detail-info">';
  html += '<h1 class="team-detail-name">' + team.name + '</h1>';
  html += '<span class="team-detail-conf">' + confLabel + '</span>';
  html += '</div>';
  html += '<div class="team-detail-finance">';
  html += '<div class="td-fin-item"><span class="td-fin-label">总薪资</span><span class="td-fin-value">' + fmtFull(totalSalary) + '</span></div>';
  html += '<div class="td-fin-item"><span class="td-fin-label">' + capLabel + '</span><span class="td-fin-value ' + capClass + '">' + capValue + '</span></div>';
  html += '<div class="td-fin-item"><span class="td-fin-label">球员</span><span class="td-fin-value">' + team.players.length + '人</span></div>';
  html += '</div>';
  html += '</div>';

  var teamStats = calcTeamStats(team);
  if (teamStats) {
    html += '<div class="team-detail-section">';
    html += '<h2 class="team-detail-section-title">赛季数据（场均）</h2>';
    html += '<div class="team-stats-grid">';
    html += '<div class="ts-item"><span class="ts-label">得分</span><span class="ts-value">' + teamStats.pts + '</span></div>';
    html += '<div class="ts-item"><span class="ts-label">助攻</span><span class="ts-value">' + teamStats.ast + '</span></div>';
    html += '<div class="ts-item"><span class="ts-label">篮板</span><span class="ts-value">' + teamStats.trb + '</span></div>';
    html += '<div class="ts-item"><span class="ts-label">抢断</span><span class="ts-value">' + teamStats.stl + '</span></div>';
    html += '<div class="ts-item"><span class="ts-label">盖帽</span><span class="ts-value">' + teamStats.blk + '</span></div>';
    html += '<div class="ts-item"><span class="ts-label">失误</span><span class="ts-value">' + teamStats.tov + '</span></div>';
    html += '</div></div>';
  }

  html += '<div class="team-detail-section">';
  html += '<h2 class="team-detail-section-title">球员名单</h2>';
  html += '<div class="team-detail-table-wrap">';
  html += '<table class="team-detail-table">';
  html += '<thead><tr>';
  html += '<th>球员</th><th>位置</th><th>能力值</th><th>薪资</th><th>得分</th><th>助攻</th><th>篮板</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  var sortedPlayers = team.players.slice().sort(function(a, b) { return b.salary - a.salary; });
  sortedPlayers.forEach(function(p) {
    var stats = p.stats || {};
    html += '<tr>';
    html += '<td class="td-player-name" data-player-id="' + p.id + '" style="cursor:pointer;">' + p.name + '</td>';
    html += '<td>' + (stats.pos || '-') + '</td>';
    html += '<td>' + (p['2k_rating'] != null ? p['2k_rating'] : '-') + '</td>';
    html += '<td class="td-salary">' + fmt(p.salary) + '</td>';
    html += '<td>' + (stats.pts != null ? stats.pts : '-') + '</td>';
    html += '<td>' + (stats.ast != null ? stats.ast : '-') + '</td>';
    html += '<td>' + (stats.trb != null ? stats.trb : '-') + '</td>';
    html += '</tr>';
  });

  html += '</tbody></table></div></div>';

  html += renderTPESection(teamId);

  html += '<div class="team-detail-action">';
  html += '<button class="action-btn ai-btn" id="btn-team-trade" data-team-id="' + teamId + '" type="button">';
  html += '<span class="material-symbols-outlined">swap_horiz</span>';
  html += '<span>进入交易模拟器</span>';
  html += '</button>';
  html += '</div>';

  container.innerHTML = html;

  document.getElementById('team-detail-back').addEventListener('click', function() {
    renderTeamList();
  });

  document.getElementById('btn-team-trade').addEventListener('click', function() {
    var tid = this.getAttribute('data-team-id');
    switchMainTab('trade');
    addTeam(tid);
  });

  container.querySelectorAll('.td-player-name[data-player-id]').forEach(function(el) {
    el.addEventListener('click', function() {
      var pid = this.getAttribute('data-player-id');
      if (typeof showPlayerDetail === 'function') showPlayerDetail(pid);
    });
  });

  loadTPEData(teamId);
}

function calcTeamStats(team) {
  var totals = { pts: 0, ast: 0, trb: 0, stl: 0, blk: 0, tov: 0, count: 0 };
  team.players.forEach(function(p) {
    if (p.stats && p.stats.g > 0) {
      totals.pts += p.stats.pts || 0;
      totals.ast += p.stats.ast || 0;
      totals.trb += p.stats.trb || 0;
      totals.stl += p.stats.stl || 0;
      totals.blk += p.stats.blk || 0;
      totals.tov += p.stats.tov || 0;
      totals.count++;
    }
  });

  if (totals.count === 0) return null;

  return {
    pts: (totals.pts / totals.count).toFixed(1),
    ast: (totals.ast / totals.count).toFixed(1),
    trb: (totals.trb / totals.count).toFixed(1),
    stl: (totals.stl / totals.count).toFixed(1),
    blk: (totals.blk / totals.count).toFixed(1),
    tov: (totals.tov / totals.count).toFixed(1)
  };
}

function renderTPESection(teamId) {
  var html = '<div class="team-detail-section" id="tpe-section">';
  html += '<h2 class="team-detail-section-title">交易特例 (TPE)</h2>';
  html += '<div id="tpe-content"><span class="tpe-loading">加载中...</span></div>';
  html += '</div>';
  return html;
}

function loadTPEData(teamId) {
  var team = TEAMS_DATA[teamId];
  if (!team) return;

  var teamName = team.name;
  var shortId = String(teamId).toUpperCase();

  fetch('data/output/team_tpes.json')
    .then(function(r) { return r.ok ? r.json() : null; })
    .then(function(data) {
      if (!data || !data.teams) {
        renderTPEContent([]);
        return;
      }

      var tpeList = [];
      for (var name in data.teams) {
        var entry = data.teams[name];
        if (entry.abbrev === shortId) {
          tpeList = entry.tpes || [];
          break;
        }
      }
      renderTPEContent(tpeList);
    })
    .catch(function() {
      renderTPEContent([]);
    });
}

function renderTPEContent(tpes) {
  var container = document.getElementById('tpe-content');
  if (!container) return;

  if (!tpes || tpes.length === 0) {
    container.innerHTML = '<div class="tpe-empty">暂无交易特例</div>';
    return;
  }

  var html = '<div class="tpe-list">';
  tpes.forEach(function(tpe) {
    html += '<div class="tpe-item">';
    html += '<div class="tpe-amount">' + fmt(tpe.amount_remaining) + '</div>';
    html += '<div class="tpe-info">';
    html += '<span class="tpe-source">来自 ' + (tpe.source_player || '未知') + '</span>';
    html += '<span class="tpe-expires">到期: ' + (tpe.expires || '未知') + '</span>';
    html += '</div>';
    if (tpe.apron_restricted) {
      html += '<span class="tpe-restricted">受限</span>';
    }
    html += '</div>';
  });
  html += '</div>';

  container.innerHTML = html;
}
