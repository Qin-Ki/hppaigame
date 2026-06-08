var GAMES_DATA = null;
var GAMES_LOADED_DATE = null;

function formatDateYMD(d) {
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function formatWeekday(dateStr) {
  var d = new Date(dateStr);
  var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return days[d.getDay()];
}

function formatGameTime(dateStr) {
  var d = new Date(dateStr);
  var h = d.getHours();
  var m = String(d.getMinutes()).padStart(2, '0');
  var ampm = h >= 12 ? 'PM' : 'AM';
  var h12 = h % 12 || 12;
  return h12 + ':' + m + ' ' + ampm;
}

function loadGamesData(dateStr) {
  return fetch('data/output/games/games_' + dateStr + '.json')
    .then(function(r) {
      if (!r.ok) throw new Error('not found');
      return r.json();
    })
    .then(function(data) {
      GAMES_DATA = data;
      GAMES_LOADED_DATE = dateStr;
      return data;
    })
    .catch(function() {
      return null;
    });
}

function renderGameScoreCard(game) {
  var home = game.home || {};
  var away = game.away || {};
  var isFinal = game.state === 'final';
  var isLive = game.state === 'live';
  var isScheduled = game.state === 'scheduled';
  var isPlayoff = game.is_playoff;

  var stateTag = '';
  if (isFinal) stateTag = '<span class="game-state final">已结束</span>';
  else if (isLive) stateTag = '<span class="game-state live">🔴 进行中</span>';
  else stateTag = '<span class="game-state scheduled">' + formatGameTime(game.date) + '</span>';

  var seriesTag = '';
  if (game.series_note) {
    seriesTag = '<span class="game-series">' + game.series_note + '</span>';
  }

  var playoffBadge = isPlayoff ? '<span class="game-playoff-badge">季后赛</span>' : '';

  var homeWin = home.winner;
  var awayWin = away.winner;

  var homeScoreClass = 'game-team-score' + (homeWin ? ' winner' : '');
  var awayScoreClass = 'game-team-score' + (awayWin ? ' winner' : '');

  var quarterHtml = '';
  if (home.quarter_scores && home.quarter_scores.length > 0) {
    var qCount = home.quarter_scores.length;
    quarterHtml = '<div class="game-quarters" style="--quarter-count:' + qCount + ';">';
    quarterHtml += '<div class="game-quarter-row game-quarter-header">';
    quarterHtml += '<span></span>';
    home.quarter_scores.forEach(function(q) {
      quarterHtml += '<span>Q' + q.period + '</span>';
    });
    quarterHtml += '<span>总分</span>';
    quarterHtml += '</div>';

    quarterHtml += '<div class="game-quarter-row">';
    quarterHtml += '<span class="game-quarter-team">' + (away.name_cn || away.short_name) + '</span>';
    away.quarter_scores.forEach(function(q) {
      quarterHtml += '<span>' + q.score + '</span>';
    });
    quarterHtml += '<span class="' + awayScoreClass + '">' + away.score + '</span>';
    quarterHtml += '</div>';

    quarterHtml += '<div class="game-quarter-row">';
    quarterHtml += '<span class="game-quarter-team">' + (home.name_cn || home.short_name) + '</span>';
    home.quarter_scores.forEach(function(q) {
      quarterHtml += '<span>' + q.score + '</span>';
    });
    quarterHtml += '<span class="' + homeScoreClass + '">' + home.score + '</span>';
    quarterHtml += '</div>';

    quarterHtml += '</div>';
  }

  var leaderHtml = '';
  var homeLeaders = home.top_performers || {};
  var awayLeaders = away.top_performers || {};
  if (homeLeaders.pts_leader || awayLeaders.pts_leader) {
    leaderHtml = '<div class="game-leaders">';
    if (awayLeaders.pts_leader) {
      leaderHtml += '<div class="game-leader-item">';
      leaderHtml += '<span class="game-leader-name">' + awayLeaders.pts_leader.name + '</span>';
      leaderHtml += '<span class="game-leader-stat">' + awayLeaders.pts_leader.value + '分';
      if (awayLeaders.reb_leader) leaderHtml += ' ' + awayLeaders.reb_leader.value + '板';
      if (awayLeaders.ast_leader) leaderHtml += ' ' + awayLeaders.ast_leader.value + '助';
      leaderHtml += '</span>';
      leaderHtml += '</div>';
    }
    if (homeLeaders.pts_leader) {
      leaderHtml += '<div class="game-leader-item">';
      leaderHtml += '<span class="game-leader-name">' + homeLeaders.pts_leader.name + '</span>';
      leaderHtml += '<span class="game-leader-stat">' + homeLeaders.pts_leader.value + '分';
      if (homeLeaders.reb_leader) leaderHtml += ' ' + homeLeaders.reb_leader.value + '板';
      if (homeLeaders.ast_leader) leaderHtml += ' ' + homeLeaders.ast_leader.value + '助';
      leaderHtml += '</span>';
      leaderHtml += '</div>';
    }
    leaderHtml += '</div>';
  }

  var html = '<div class="game-card' + (isPlayoff ? ' playoff' : '') + '">';
  html += '<div class="game-card-header">';
  html += stateTag + seriesTag + playoffBadge;
  html += '</div>';

  html += '<div class="game-card-body">';
  html += '<div class="game-matchup">';
  html += '<div class="game-team away' + (awayWin ? ' winner' : '') + '">';
  html += '<div class="game-team-info">';
  html += '<span class="game-team-logo" style="background:#' + (away.color || '666') + ';">' + (away.abbr || '').toUpperCase().substring(0, 3) + '</span>';
  html += '<span class="game-team-name">' + (away.name_cn || away.short_name) + '</span>';
  if (away.record) html += '<span class="game-team-record">' + away.record + '</span>';
  html += '</div>';
  html += '<span class="' + awayScoreClass + '">' + (isScheduled ? '-' : away.score) + '</span>';
  html += '</div>';

  html += '<div class="game-team home' + (homeWin ? ' winner' : '') + '">';
  html += '<div class="game-team-info">';
  html += '<span class="game-team-logo" style="background:#' + (home.color || '666') + ';">' + (home.abbr || '').toUpperCase().substring(0, 3) + '</span>';
  html += '<span class="game-team-name">' + (home.name_cn || home.short_name) + '</span>';
  if (home.record) html += '<span class="game-team-record">' + home.record + '</span>';
  html += '</div>';
  html += '<span class="' + homeScoreClass + '">' + (isScheduled ? '-' : home.score) + '</span>';
  html += '</div>';
  html += '</div>';

  if (isLive && game.period) {
    html += '<div class="game-live-info">Q' + game.period + ' ' + game.clock + '</div>';
  }

  html += '</div>';

  if (isFinal && quarterHtml) {
    html += quarterHtml;
  }

  if (isFinal && leaderHtml) {
    html += leaderHtml;
  }

  html += '</div>';
  return html;
}

function renderGameResults(container, data) {
  if (!data || !data.games || data.games.length === 0) {
    container.innerHTML = '<div class="game-results-empty">' +
      '<span class="material-symbols-outlined">sports_basketball</span>' +
      '<span>当日无比赛</span>' +
      '</div>';
    return;
  }

  var finalGames = data.games.filter(function(g) { return g.state === 'final'; });
  var liveGames = data.games.filter(function(g) { return g.state === 'live'; });
  var scheduledGames = data.games.filter(function(g) { return g.state === 'scheduled'; });

  var html = '<div class="game-results-section">';

  html += '<div class="game-results-header">';
  html += '<h3 class="game-results-title">';
  html += '<span class="material-symbols-outlined">sports_basketball</span>';
  html += '昨日赛果';
  html += '</h3>';
  html += '<span class="game-results-date">' + data.date + ' ' + formatWeekday(data.date) + '</span>';
  html += '</div>';

  html += '<div class="game-results-summary">';
  html += '<span class="game-count">' + data.total_games + ' 场比赛</span>';
  if (liveGames.length > 0) html += '<span class="game-count live">🔴 ' + liveGames.length + ' 场进行中</span>';
  html += '</div>';

  html += '<div class="game-results-list">';

  liveGames.forEach(function(g) { html += renderGameScoreCard(g); });
  finalGames.forEach(function(g) { html += renderGameScoreCard(g); });
  scheduledGames.forEach(function(g) { html += renderGameScoreCard(g); });

  html += '</div>';
  html += '</div>';

  container.innerHTML = html;
}

function renderGameResultsSection(parentContainer) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dateStr = formatDateYMD(yesterday);

  var sectionId = 'game-results-section';
  var existing = document.getElementById(sectionId);
  if (existing) {
    existing.remove();
  }

  var section = document.createElement('div');
  section.id = sectionId;
  section.className = 'game-results-wrapper';
  section.innerHTML = '<div class="game-results-loading"><span class="material-symbols-outlined spinning">progress_activity</span><span>加载比赛数据...</span></div>';

  parentContainer.insertBefore(section, parentContainer.firstChild);

  loadGamesData(dateStr).then(function(data) {
    if (data) {
      renderGameResults(section, data);
    } else {
      section.innerHTML = '<div class="game-results-empty">' +
        '<span class="material-symbols-outlined">sports_basketball</span>' +
        '<span>暂无比赛数据</span>' +
        '<span class="game-results-hint">运行 python data/scraper/crawl_games.py 获取数据</span>' +
        '</div>';
    }
  });
}

function renderGameResultsOnly() {
  var container = document.getElementById('data-tab-content');
  if (!container) return;

  container.innerHTML = '';

  renderGameResultsSection(container);
}
