// UI 渲染模块
const UI = (() => {
  const els = {};

  function init() {
    els.startScreen = document.getElementById('startScreen');
    els.gameBoard = document.getElementById('gameBoard');
    els.gameLoading = document.getElementById('gameLoading');
    els.gameError = document.getElementById('gameError');
    els.grid = document.getElementById('grid');
    els.guesses = document.getElementById('guesses');
    els.scoreDisplay = document.getElementById('scoreDisplay');
    els.modeBtns = document.querySelectorAll('.mode-btn');
    els.searchModal = document.getElementById('searchModal');
    els.searchInput = document.getElementById('searchInput');
    els.searchResults = document.getElementById('searchResults');
    els.searchClose = document.getElementById('searchClose');
    els.btnRules = document.getElementById('btnRules');
    els.btnNewGame = document.getElementById('btnNewGame');
    els.rulesModal = document.getElementById('rulesModal');
    els.toast = document.getElementById('toast');

    // 结果海报
    els.resultsOverlay = document.getElementById('resultsOverlay');
    els.posterScore = document.getElementById('posterScore');
    els.posterPreview = document.getElementById('posterPreviewImg');
    els.posterCanvas = document.getElementById('posterCanvas');
  }

  function hide(el) { el.classList.add('hidden'); }
  function show(el) { el.classList.remove('hidden'); }

  function showLoading() { hide(els.gameError); show(els.gameLoading); }
  function hideLoading() { hide(els.gameLoading); }

  function showError() { hide(els.gameLoading); show(els.gameError); }
  function hideError() { hide(els.gameError); }

  function showBoard() { hide(els.gameLoading); hide(els.gameError); show(els.gameBoard); }

  function renderGrid(config) {
    els.grid.innerHTML = '';
    // 左上角
    const corner = document.createElement('div');
    corner.className = 'grid-header-cell';
    els.grid.appendChild(corner);

    // 列表头
    config.columns.forEach(col => {
      const cell = document.createElement('div');
      cell.className = 'grid-header-cell';
      cell.title = col.label;
      cell.innerHTML = col.shortLabel || col.label;
      els.grid.appendChild(cell);
    });

    // 行
    for (let r = 0; r < 3; r++) {
      const label = document.createElement('div');
      label.className = 'grid-label-cell';
      label.title = config.rows[r].label;
      label.textContent = config.rows[r].shortLabel || config.rows[r].label;
      els.grid.appendChild(label);

      for (let c = 0; c < 3; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell cell-empty';
        cell.dataset.row = r;
        cell.dataset.col = c;
        els.grid.appendChild(cell);
      }
    }
  }

  function updateCell(row, col, cellState) {
    const index = 5 + row * 4 + col;
    const el = els.grid.children[index];
    if (!el) return;

    el.className = 'grid-cell';
    switch (cellState.status) {
      case 'empty':
        el.classList.add('cell-empty');
        el.style.cursor = 'pointer';
        el.innerHTML = '';
        break;
      case 'loading':
        el.classList.add('cell-loading');
        el.innerHTML = '<div class="spinner"></div>';
        break;
      case 'filled':
        el.classList.add('cell-filled');
        el.style.cursor = 'default';
        if (cellState.player) {
          el.innerHTML = `<span class="player-name">${cellState.player.fullName}</span>`;
        }
        break;
      case 'wrong':
        el.classList.add('cell-wrong');
        el.innerHTML = '<span class="wrong-mark">✕</span>';
        break;
    }
  }

  function openSearch(hint) {
    els.searchInput.value = '';
    els.searchResults.innerHTML = '';
    els.searchInput.placeholder = hint || '输入球员名...';
    show(els.searchModal);
    setTimeout(() => els.searchInput.focus(), 100);
  }

  function closeSearch() {
    hide(els.searchModal);
    els.searchInput.value = '';
    els.searchResults.innerHTML = '';
  }

  function showSearchResults(players, onSelect) {
    els.searchResults.innerHTML = '';
    if (players.length === 0) {
      els.searchResults.innerHTML = '<div class="search-empty">无匹配球员</div>';
      return;
    }
    players.forEach(p => {
      const div = document.createElement('div');
      div.className = 'player-result';
      div.innerHTML = `<span class="player-result-name">${p.fullName}</span>`;
      div.addEventListener('click', () => onSelect(p));
      els.searchResults.appendChild(div);
    });
  }

  function updateGuesses(remaining) {
    els.guesses.textContent = `${remaining}/9 次`;
  }

  function updateGuessesWithState(cells) {
    let filled = 0;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (cells[r][c].status === 'filled' || cells[r][c].status === 'wrong') filled++;
      }
    }
    els.guesses.textContent = `${filled}/9`;
  }

  function showResults(score) {
    els.posterScore.innerHTML = `正确: <strong>${score.correct}</strong>/9 | 稀有度: <strong>${score.totalRarity}</strong>`;
    show(els.resultsOverlay);
  }

  function closeResults() {
    hide(els.resultsOverlay);
  }

  function openRules() { show(els.rulesModal); }
  function closeRules() { hide(els.rulesModal); }

  function showToast(msg, type, duration = 2500) {
    els.toast.textContent = msg;
    els.toast.className = 'toast';
    if (type) els.toast.classList.add(type);
    show(els.toast);
    clearTimeout(els.toast._timeout);
    els.toast._timeout = setTimeout(() => hide(els.toast), duration);
  }

  return {
    init, els,
    showLoading, hideLoading, showError, showBoard,
    renderGrid, updateCell,
    openSearch, closeSearch, showSearchResults,
    updateGuesses, updateGuessesWithState,
    showResults, closeResults,
    openRules, closeRules,
    showToast,
  };
})();
