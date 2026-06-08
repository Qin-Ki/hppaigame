var homeRendered = false;

function renderHomePage() {
  var container = document.getElementById('home-content');
  if (!container) return;

  if (homeRendered) return;
  homeRendered = true;

  var html = '';

  html += '<section class="home-section">';
  html += '<h2 class="home-section-title">昨日赛果</h2>';
  html += '<div id="home-games"></div>';
  html += '</section>';

  html += '<section class="home-section">';
  html += '<h2 class="home-section-title">数据洞察</h2>';
  html += '<div class="insight-cards">';
  html += renderInsightCards();
  html += '</div>';
  html += '</section>';

  html += '<section class="home-section">';
  html += '<h2 class="home-section-title">热门球队</h2>';
  html += '<div id="home-teams"></div>';
  html += '</section>';

  container.innerHTML = html;

  loadHomeGames();
  renderHomeTeams();
}

function loadHomeGames() {
  var container = document.getElementById('home-games');
  if (!container) return;

  if (typeof renderGameResultsSection === 'function') {
    renderGameResultsSection(container);
  } else {
    container.innerHTML = '<div class="home-empty">暂无比赛数据</div>';
  }
}

function loadHomeNews() {
  var newsContainer = document.getElementById('home-news');
  if (!newsContainer) return;

  var hupuUrl = 'data/output/news/news_hupu_2026-05-25.json';
  var hoopsUrl = 'data/output/news/news_hoopsrumors_2026-05-25.json';

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

    renderHomeNewsFeed(newsContainer, allNews.slice(0, 8));
  }).catch(function() {
    newsContainer.innerHTML = '<div class="home-empty">暂无新闻数据</div>';
  });
}

function renderHomeNewsFeed(container, newsList) {
  if (!newsList || newsList.length === 0) {
    container.innerHTML = '<div class="home-empty">暂无新闻数据</div>';
    return;
  }

  var html = '';
  newsList.forEach(function(news) {
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
    '</a>';
  });

  html += '<button class="home-more-btn" id="home-more-news" type="button">查看更多新闻</button>';
  container.innerHTML = html;

  document.getElementById('home-more-news').addEventListener('click', function() {
    switchMainTab('data');
  });
}

function renderHomeTeams() {
  var container = document.getElementById('home-teams');
  if (!container) return;

  var hotTeamIds = ['lal', 'bos', 'gsw', 'okc', 'cle', 'nyk'];
  var html = '<div class="home-teams-grid">';

  hotTeamIds.forEach(function(tid) {
    var team = TEAMS_DATA[tid];
    if (!team) return;

    var capLabel = team.capRoom >= 0 ? '帽空间' : '超税线';
    var capValue = team.capRoom >= 0 ? fmt(team.capRoom) : fmt(Math.abs(team.capRoom));
    var capClass = team.capRoom >= 0 ? 'success' : 'danger';

    html += '<div class="home-team-card" data-team-id="' + tid + '">' +
      '<div class="home-team-logo">' + getShortName(team, 2) + '</div>' +
      '<div class="home-team-info">' +
        '<span class="home-team-name">' + team.shortName + '</span>' +
        '<span class="home-team-sub">' + capLabel + ' <span class="' + capClass + '">' + capValue + '</span></span>' +
      '</div>' +
    '</div>';
  });

  html += '</div>';
  html += '<button class="home-more-btn" id="home-more-teams" type="button">查看全部球队</button>';
  container.innerHTML = html;

  container.querySelectorAll('.home-team-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var tid = this.getAttribute('data-team-id');
      switchMainTab('teams');
      setTimeout(function() {
        if (typeof showTeamDetail === 'function') showTeamDetail(tid);
      }, 100);
    });
  });

  document.getElementById('home-more-teams').addEventListener('click', function() {
    switchMainTab('teams');
  });
}
