var newsCache = null;

function renderContentTab() {
  var container = document.getElementById('content-tab-content');
  if (!container) return;

  var html = '';

  html += '<div class="content-section">';
  html += '<h2 class="content-section-title">数据洞察</h2>';
  html += '<div class="insight-cards">';
  html += renderInsightCards();
  html += '</div></div>';

  container.innerHTML = html;
}

function renderInsightCards() {
  var cards = getInsightData();
  var html = '';

  cards.forEach(function(card) {
    html += '<div class="insight-card" style="border-left-color:' + card.color + ';">' +
      '<div class="insight-card-icon" style="background:' + card.color + ';">' +
        '<span class="material-symbols-outlined">' + card.icon + '</span>' +
      '</div>' +
      '<div class="insight-card-body">' +
        '<span class="insight-card-label">' + card.label + '</span>' +
        '<span class="insight-card-value">' + card.value + '</span>' +
        '<span class="insight-card-sub">' + card.sub + '</span>' +
      '</div>' +
    '</div>';
  });

  return html;
}

function getInsightData() {
  var allPlayers = [];
  for (var tid in TEAMS_DATA) {
    var team = TEAMS_DATA[tid];
    team.players.forEach(function(p) {
      if (p.stats) {
        allPlayers.push({
          name: p.name,
          team: team.shortName,
          teamId: tid,
          stats: p.stats,
          per: p.per,
          rating: p['2k_rating'],
          salary: p.salary
        });
      }
    });
  }

  var cards = [];

  var topScorer = findTop(allPlayers, function(p) { return p.stats.pts; });
  if (topScorer) {
    cards.push({
      label: '得分王',
      value: topScorer.name,
      sub: topScorer.team + ' · ' + topScorer.stats.pts + ' 分/场',
      icon: 'local_fire_department',
      color: '#ef4444'
    });
  }

  var topAssist = findTop(allPlayers, function(p) { return p.stats.ast; });
  if (topAssist) {
    cards.push({
      label: '助攻王',
      value: topAssist.name,
      sub: topAssist.team + ' · ' + topAssist.stats.ast + ' 助/场',
      icon: 'passkey',
      color: '#3b82f6'
    });
  }

  var topRebound = findTop(allPlayers, function(p) { return p.stats.trb; });
  if (topRebound) {
    cards.push({
      label: '篮板王',
      value: topRebound.name,
      sub: topRebound.team + ' · ' + topRebound.stats.trb + ' 板/场',
      icon: 'fitness_center',
      color: '#22c55e'
    });
  }

  var topBlock = findTop(allPlayers, function(p) { return p.stats.blk; });
  if (topBlock) {
    cards.push({
      label: '盖帽王',
      value: topBlock.name,
      sub: topBlock.team + ' · ' + topBlock.stats.blk + ' 帽/场',
      icon: 'shield',
      color: '#a855f7'
    });
  }

  var topSteal = findTop(allPlayers, function(p) { return p.stats.stl; });
  if (topSteal) {
    cards.push({
      label: '抢断王',
      value: topSteal.name,
      sub: topSteal.team + ' · ' + topSteal.stats.stl + ' 断/场',
      icon: 'back_hand',
      color: '#f59e0b'
    });
  }

  var topRating = findTop(allPlayers, function(p) { return p.rating; });
  if (topRating) {
    cards.push({
      label: '能力值最高',
      value: topRating.name,
      sub: topRating.team + ' · 能力值 ' + topRating.rating,
      icon: 'trending_up',
      color: '#06b6d4'
    });
  }

  var top3pt = findTop(allPlayers, function(p) { return p.stats.fg3; });
  if (top3pt) {
    cards.push({
      label: '三分王',
      value: top3pt.name,
      sub: top3pt.team + ' · ' + top3pt.stats.fg3 + ' 三分/场',
      icon: 'gps_fixed',
      color: '#ec4899'
    });
  }

  var topMinutes = findTop(allPlayers, function(p) { return p.stats.mp; });
  if (topMinutes) {
    cards.push({
      label: '铁人',
      value: topMinutes.name,
      sub: topMinutes.team + ' · ' + topMinutes.stats.mp + ' 分钟/场',
      icon: 'timer',
      color: '#64748b'
    });
  }

  return cards;
}

function findTop(players, getter) {
  var top = null;
  var topVal = -Infinity;
  players.forEach(function(p) {
    var val = getter(p);
    if (val > topVal) {
      topVal = val;
      top = p;
    }
  });
  return top;
}

function loadNews() {
  if (newsCache) {
    renderNewsFeed(newsCache);
    return;
  }

  var hupuUrl = findLatestNewsUrl('news_hupu');
  var hoopsUrl = findLatestNewsUrl('news_hoopsrumors');

  var hupuPromise = fetchNews(hupuUrl);
  var hoopsPromise = fetchNews(hoopsUrl);

  Promise.all([hupuPromise, hoopsPromise]).then(function(results) {
    var allNews = [];
    if (results[0] && results[0].news) {
      results[0].news.forEach(function(n) { n._source = 'hupu'; allNews.push(n); });
    }
    if (results[1] && results[1].news) {
      results[1].news.forEach(function(n) { n._source = 'hoopsrumors'; allNews.push(n); });
    }

    allNews.sort(function(a, b) {
      var la = a.level || 'B';
      var lb = b.level || 'B';
      var order = { S: 0, A: 1, B: 2 };
      var diff = (order[la] || 2) - (order[lb] || 2);
      if (diff !== 0) return diff;
      return (b.score || 0) - (a.score || 0);
    });

    newsCache = allNews;
    renderNewsFeed(allNews);
  }).catch(function() {
    var container = document.getElementById('news-feed-container');
    if (container) container.innerHTML = '<div class="news-empty">暂无新闻数据</div>';
  });
}

function findLatestNewsUrl(prefix) {
  return 'data/output/news/' + prefix + '_2026-05-25.json';
}

function fetchNews(url) {
  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error('not found');
    return r.json();
  }).catch(function() {
    return null;
  });
}

function renderNewsFeed(newsList) {
  var container = document.getElementById('news-feed-container');
  if (!container) return;

  if (!newsList || newsList.length === 0) {
    container.innerHTML = '<div class="news-empty">暂无新闻数据</div>';
    return;
  }

  var html = '';
  var shown = 0;
  var maxShow = 30;

  newsList.forEach(function(news) {
    if (shown >= maxShow) return;
    shown++;

    var levelClass = 'news-level-' + (news.level || 'B').toLowerCase();
    var levelLabel = news.level === 'S' ? '确认' : news.level === 'A' ? '权威' : '流言';
    var sourceLabel = news._source === 'hupu' ? '虎扑' : 'HoopsRumors';
    var dateStr = news.date || '';

    html += '<a class="news-item ' + levelClass + '" href="' + (news.url || '#') + '" target="_blank" rel="noopener">' +
      '<div class="news-item-head">' +
        '<span class="news-level-badge">' + levelLabel + '</span>' +
        '<span class="news-source">' + sourceLabel + '</span>' +
        (dateStr ? '<span class="news-date">' + dateStr + '</span>' : '') +
      '</div>' +
      '<div class="news-title">' + (news.title || '') + '</div>' +
      (news.excerpt ? '<div class="news-excerpt">' + truncate(news.excerpt, 100) + '</div>' : '') +
    '</a>';
  });

  container.innerHTML = html;
}

function truncate(str, max) {
  if (!str) return '';
  if (str.length <= max) return str;
  return str.substring(0, max) + '...';
}
