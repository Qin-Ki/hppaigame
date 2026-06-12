// 应用入口
(async function () {
  'use strict';

  let activeSearchCell = null;
  let debounceTimer = null;

  // ─── 初始化 ───
  async function init(force) {
    UI.init();

    // 订阅状态变化
    Game.subscribe(onGameStateChange);

    if (!force) {
      const today = new Date().toISOString().split('T')[0];
      if (Game.loadFromStorage()) {
        const s = Game.getState();
        if (s.config && (s.config.id === today || s.mode === 'random')) {
          UI.renderGrid(s.config);
          UI.showBoard();
          updateUI();
          return;
        }
      }
    }

    await loadGrid('today');
  }

  // ─── 加载 Grid ───
  async function loadGrid(mode) {
    UI.showLoading();
    try {
      const grid = mode === 'random' ? await Api.getRandomGrid() : await Api.getTodayGrid();
      Game.init(grid, mode);
      UI.renderGrid(grid);
      UI.showBoard();
      updateUI();
      bindCellClicks();
    } catch (err) {
      console.error('Failed to load grid:', err);
      UI.showError();
    }
  }

  // ─── 事件绑定 ───
  function setupEventListeners() {
    // 模式切换
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const mode = btn.dataset.mode;
        if (mode === Game.getState().mode) return;
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Game.clearStorage();
        await loadGrid(mode);
      });
    });

    // 新游戏
    document.getElementById('btnNewGame').addEventListener('click', async () => {
      Game.clearStorage();
      await loadGrid('random');
    });

    // 规则
    document.getElementById('btnRules').addEventListener('click', UI.openRules);

    // 搜索关闭
    document.getElementById('searchClose').addEventListener('click', UI.closeSearch);
    document.getElementById('searchModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) UI.closeSearch();
    });

    // 搜索输入
    document.getElementById('searchInput').addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const q = e.target.value.trim();
      if (q.length < 2) { UI.showSearchResults([]); return; }
      debounceTimer = setTimeout(async () => {
        try {
          const results = await Api.searchPlayers(q);
          UI.showSearchResults(results, onPlayerSelected);
        } catch (err) {
          console.error('Search failed:', err);
        }
      }, 200);
    });

    // 搜索结果键盘导航
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
      if (e.key === 'Escape') UI.closeSearch();
    });

    // 关闭弹窗
    document.getElementById('btnCloseResults').addEventListener('click', UI.closeResults);
    document.getElementById('btnPostShare').addEventListener('click', function() {
      Poster.share(this);
    });
    document.getElementById('btnViewOther').addEventListener('click', function() {
      Poster.safeNavigate('huputiyu://bbs/topicTag?tagId=' + CONFIG.TAG_ID, '_self', 'click_view_ranking');
    });
  }

  function bindCellClicks() {
    document.querySelectorAll('.grid-cell.cell-empty').forEach(el => {
      el.addEventListener('click', () => {
        const row = parseInt(el.dataset.row);
        const col = parseInt(el.dataset.col);
        onCellClicked(row, col);
      });
    });
  }

  // ─── 游戏逻辑 ───
  function onCellClicked(row, col) {
    const state = Game.getState();
    if (state.isComplete) return;
    const cell = Game.getCell(row, col);
    if (!cell || cell.status === 'filled' || cell.status === 'loading') return;

    activeSearchCell = { row, col };
    Game.setActiveCell(row, col);
    const hint = Game.getCellHint(row, col);
    UI.openSearch(hint);
  }

  function onPlayerSelected(player) {
    if (!activeSearchCell) return;
    const { row, col } = activeSearchCell;
    const state = Game.getState();
    UI.closeSearch();

    Game.setCellLoading(row, col);

    (async () => {
      try {
        const rowCat = state.config.rows[row];
        const colCat = state.config.columns[col];
        const result = await Api.validateAnswer(player.playerId, rowCat, colCat);

        if (result.valid) {
          try {
            await Api.submitAnswer(state.config.id, row, col, player.playerId);
          } catch (e) { /* optional */ }

          const playerInfo = {
            playerId: player.playerId,
            fullName: player.fullName,
            headshotUrl: player.headshotUrl || '',
            teamIds: result.player ? result.player.teamIds : [],
            teamLogos: result.player ? result.player.teamLogos : [],
            teamAbbrevs: result.player ? result.player.teamAbbrevs : [],
          };
          Game.setCellFilled(row, col, playerInfo, result.pairRarity !== undefined ? result.pairRarity : 50);
        } else {
          Game.setCellWrong(row, col);
        }
      } catch (err) {
        console.error('Validation failed:', err);
        Game.setCellWrong(row, col);
      }
      activeSearchCell = null;
    })();
  }

  // ─── 状态变化回调 ───
  function onGameStateChange(state) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        UI.updateCell(r, c, Game.getCell(r, c));
      }
    }
    UI.updateGuessesWithState(state.cells);
    if (state.isComplete) {
      setTimeout(() => {
        UI.showResults(Game.getScore());
        Poster.generate();
      }, 500);
    }
  }

  function updateUI() {
    const state = Game.getState();
    UI.updateGuesses(Game.getRemainingGuesses());
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === state.mode);
    });
  }

  // ─── 启动 ───
  setupEventListeners();
  await init(false);
})();
