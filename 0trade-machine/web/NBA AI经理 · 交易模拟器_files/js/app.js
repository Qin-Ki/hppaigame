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
