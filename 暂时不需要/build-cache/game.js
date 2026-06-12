/**
 * API Client - Network layer for backend communication.
 */
const API = {
  baseUrl: '/api',

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const config = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  // Get today's grid
  getTodayGrid() {
    return this.request('/grid/today');
  },

  // Get random grid
  getRandomGrid() {
    return this.request('/grid/random');
  },

  // Search players
  async searchPlayers(query, limit = 10) {
    const data = await this.request(`/players/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return data.results || [];
  },

  // Validate an answer
  validateAnswer(playerId, rowCategory, colCategory) {
    return this.request('/validate', {
      method: 'POST',
      body: JSON.stringify({ playerId, rowCategory, colCategory }),
    });
  },

  // Submit a correct answer for rarity tracking
  submitAnswer(gridId, row, col, playerId) {
    return this.request('/submit-answer', {
      method: 'POST',
      body: JSON.stringify({ gridId, row, col, playerId }),
    });
  },

  // Health check
  async healthCheck() {
    try {
      const data = await this.request('/health');
      return data.status === 'ok';
    } catch {
      return false;
    }
  }
};

/**
 * Game State Management.
 * Handles grid state, cell states, guesses, scoring.
 * Persists state to localStorage.
 */

const Game = (() => {
  // Private state
  let state = {
    config: null,
    cells: [],
    guessesUsed: 0,
    isComplete: false,
    isDaily: true,
    mode: 'today', // 'today' | 'random'
    score: {
      correct: 0,
      totalRarity: 0
    }
  };

  // Callbacks
  let onStateChange = null;

  // Maximum guesses = 9 (one per cell)
  const MAX_GUESSES = 9;

  function init(config, mode) {
    state.config = config;
    state.mode = mode || 'today';
    state.isDaily = state.mode === 'today';
    state.guessesUsed = 0;
    state.isComplete = false;
    state.score = { correct: 0, totalRarity: 0 };

    // Initialize cells: 3x3 grid
    state.cells = [];
    for (let r = 0; r < 3; r++) {
      state.cells[r] = [];
      for (let c = 0; c < 3; c++) {
        state.cells[r][c] = {
          row: r,
          col: c,
          status: 'empty',
          player: null,
          rarity: null
        };
      }
    }

    // Save to localStorage
    saveToStorage();
    notify();
  }

  function getState() {
    return state;
  }

  function getCell(row, col) {
    if (!state.cells[row]) return null;
    return state.cells[row][col] || null;
  }

  function getActiveCell() {
    return state._activeCell || null;
  }

  function setActiveCell(row, col) {
    state._activeCell = { row, col };
    notify();
  }

  function clearActiveCell() {
    state._activeCell = null;
  }

  /**
   * Set a cell to loading state (during validation).
   */
  function setCellLoading(row, col) {
    const cell = getCell(row, col);
    if (cell && cell.status === 'empty') {
      cell.status = 'loading';
      notify();
    }
  }

  /**
   * Fill a cell with a correct answer.
   */
  function setCellFilled(row, col, player, rarity) {
    const cell = getCell(row, col);
    if (!cell) return;

    cell.status = 'filled';
    cell.player = player;
    cell.rarity = rarity;
    cell.wrongAttempts = 0;
    state.guessesUsed++;
    state.score.correct++;

    if (rarity !== null && rarity !== undefined) {
      state.score.totalRarity += rarity;
    }

    checkCompletion();
    saveToStorage();
    notify();
  }

  /**
   * Mark a cell as wrong guess.
   */
  function setCellWrong(row, col) {
    const cell = getCell(row, col);
    if (!cell) return;

    cell.status = 'wrong';
    state.guessesUsed++;

    // Auto-reset to empty after animation completes
    setTimeout(() => {
      if (cell.status === 'wrong') {
        cell.status = 'empty';
        notify();
      }
    }, 600);

    checkCompletion();
    saveToStorage();
    notify();
  }

  /**
   * Check if game is complete.
   */
  function checkCompletion() {
    if (state.isComplete) return;

    // All 9 guesses used or all cells filled
    const allFilled = state.cells.every(row => row.every(c => c.status === 'filled'));
    const noGuessesLeft = state.guessesUsed >= MAX_GUESSES;

    if (allFilled || noGuessesLeft) {
      state.isComplete = true;
    }
  }

  function isComplete() {
    return state.isComplete;
  }

  function getScore() {
    return {
      correct: state.score.correct,
      total: 9,
      totalRarity: Math.round(state.score.totalRarity * 10) / 10
    };
  }

  function getRemainingGuesses() {
    return MAX_GUESSES - state.guessesUsed;
  }

  /**
   * Get hint text for a cell (the categories).
   */
  function getCellHint(row, col) {
    if (!state.config) return '';
    const rowCat = state.config.rows[row];
    const colCat = state.config.columns[col];
    return `${rowCat.label} × ${colCat.label}`;
  }

  /**
   * Subscribe to state changes.
   */
  function subscribe(callback) {
    onStateChange = callback;
  }

  function notify() {
    if (onStateChange) onStateChange(getState());
  }

  // --- localStorage persistence ---

  function saveToStorage() {
    try {
      const data = {
        config: state.config,
        cells: state.cells,
        guessesUsed: state.guessesUsed,
        isComplete: state.isComplete,
        mode: state.mode,
        score: state.score
      };
      localStorage.setItem('immaculateGridState', JSON.stringify(data));
    } catch (e) {
      // localStorage might be full or unavailable
      console.warn('Failed to save game state:', e.message);
    }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem('immaculateGridState');
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (!data.config || !data.cells) return false;

      // Only restore today's grid
      const today = new Date().toISOString().split('T')[0];
      if (data.config.id !== today && data.mode === 'today') {
        localStorage.removeItem('immaculateGridState');
        return false;
      }

      state.config = data.config;
      state.cells = data.cells;
      state.guessesUsed = data.guessesUsed || 0;
      state.isComplete = data.isComplete || false;
      state.mode = data.mode || 'today';
      state.score = data.score || { correct: 0, totalRarity: 0 };

      return true;
    } catch (e) {
      console.warn('Failed to load game state:', e.message);
      return false;
    }
  }

  function clearStorage() {
    localStorage.removeItem('immaculateGridState');
  }

  return {
    init,
    getState,
    getCell,
    getActiveCell,
    setActiveCell,
    clearActiveCell,
    setCellLoading,
    setCellFilled,
    setCellWrong,
    isComplete,
    getScore,
    getRemainingGuesses,
    getCellHint,
    subscribe,
    loadFromStorage,
    clearStorage,
    MAX_GUESSES
  };
})();

/**
 * UI Module - DOM manipulation and rendering.
 * Handles all DOM updates, modal management, and visual feedback.
 */
const UI = (() => {
  // DOM element references
  let els = {};

  function init() {
    // Mutate the existing els object (don't reassign — the exported reference must stay alive)
    const newEls = {
      headerDate: document.getElementById('headerDate'),
      gameLoading: document.getElementById('gameLoading'),
      gameError: document.getElementById('gameError'),
      gameBoard: document.getElementById('gameBoard'),
      grid: document.getElementById('grid'),
      guessesDots: document.getElementById('guessesDots'),
      btnShare: document.getElementById('btnShare'),
      btnNewGame: document.getElementById('btnNewGame'),
      btnRules: document.getElementById('btnRules'),
      searchModal: document.getElementById('searchModal'),
      searchInput: document.getElementById('searchInput'),
      searchClose: document.getElementById('searchClose'),
      cellHint: document.getElementById('cellHint'),
      searchInitial: document.getElementById('searchInitial'),
      searchEmpty: document.getElementById('searchEmpty'),
      searchLoading: document.getElementById('searchLoading'),
      searchError: document.getElementById('searchError'),
      searchResultsList: document.getElementById('searchResultsList'),
      resultsModal: document.getElementById('resultsModal'),
      resultsScore: document.getElementById('resultsScore'),
      resultsRarity: document.getElementById('resultsRarity'),
      resultsGrid: document.getElementById('resultsGrid'),
      resultsMessage: document.getElementById('resultsMessage'),
      resultsClose: document.getElementById('resultsClose'),
      btnPlayAgain: document.getElementById('btnPlayAgain'),
      btnCopyShare: document.getElementById('btnCopyShare'),
      rulesModal: document.getElementById('rulesModal'),
      rulesClose: document.getElementById('rulesClose'),
      toast: document.getElementById('toast'),
      modeBtns: document.querySelectorAll('.mode-btn'),
    };
    Object.assign(els, newEls);

    // Set header date
    const now = new Date();
    els.headerDate.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // --- Loading / Error / Ready ---

  function showLoading() {
    els.gameLoading.classList.remove('hidden');
    els.gameError.classList.add('hidden');
    els.gameBoard.classList.add('hidden');
  }

  function showError() {
    els.gameLoading.classList.add('hidden');
    els.gameError.classList.remove('hidden');
    els.gameBoard.classList.add('hidden');
  }

  function showBoard() {
    els.gameLoading.classList.add('hidden');
    els.gameError.classList.add('hidden');
    els.gameBoard.classList.remove('hidden');
  }

  // --- Grid Rendering ---

  function renderGrid(config) {
    els.grid.innerHTML = '';
    els.grid.style.gridTemplateColumns = `auto repeat(3, 1fr)`;
    els.grid.style.gridTemplateRows = `auto repeat(3, 1fr)`;

    // Top-left corner (empty)
    const corner = document.createElement('div');
    corner.className = 'grid-header-cell';
    corner.style.background = 'transparent';
    els.grid.appendChild(corner);

    // Column headers
    config.columns.forEach(col => {
      const cell = document.createElement('div');
      cell.className = 'grid-header-cell';
      cell.textContent = col.shortLabel || col.label;
      cell.title = col.label;
      els.grid.appendChild(cell);
    });

    // Rows
    for (let r = 0; r < 3; r++) {
      // Row label
      const label = document.createElement('div');
      label.className = 'grid-label-cell';
      label.textContent = config.rows[r].shortLabel || config.rows[r].label;
      label.title = config.rows[r].label;
      els.grid.appendChild(label);

      // Cells
      for (let c = 0; c < 3; c++) {
        const cellEl = document.createElement('div');
        cellEl.className = 'grid-cell cell-empty';
        cellEl.dataset.row = r;
        cellEl.dataset.col = c;
        cellEl.addEventListener('click', () => onCellClick(r, c));
        cellEl.addEventListener('touchend', (e) => {
          // Prevent double-firing on mobile
          e.preventDefault();
          onCellClick(r, c);
        });
        els.grid.appendChild(cellEl);
      }
    }
  }

  // Cell click handler (set by app.js)
  let onCellClick = () => {};

  function setCellClickHandler(handler) {
    onCellClick = handler;
  }

  function updateCell(row, col, cellState) {
    const index = 5 + row * 4 + col; // 1 corner + 3 col headers + 1 row label per row + col offset
    const cellEl = els.grid.children[index];
    if (!cellEl) return;

    // Remove all cell state classes
    cellEl.className = 'grid-cell';

    switch (cellState.status) {
      case 'empty':
        cellEl.classList.add('cell-empty');
        cellEl.style.cursor = 'pointer';
        cellEl.innerHTML = '';
        break;

      case 'loading':
        cellEl.classList.add('cell-loading');
        cellEl.innerHTML = '<div class="spinner"></div>';
        break;

      case 'filled':
        cellEl.classList.add('cell-filled');
        cellEl.style.cursor = 'default';
        const p = cellState.player;
        if (p) {
          // Use div.innerHTML instead of creating elements for speed
          let html = '';
          if (p.headshotUrl) {
            html += `<img class="player-img" src="${p.headshotUrl}" alt="${p.fullName}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><rect fill=%22%23e9ecef%22 width=%2240%22 height=%2240%22/><text font-size=%2220%22 x=%2220%22 y=%2225%22 text-anchor=%22middle%22 fill=%22%23868e96%22>${p.fullName[0]}</text></svg>'">`;
          }
          html += `<span class="player-name">${p.fullName}</span>`;

          if (p.teamLogos && p.teamLogos.length > 0) {
            html += `<div class="player-teams">`;
            // Show first 3 team logos
            p.teamLogos.slice(0, 3).forEach(url => {
              html += `<img src="${url}" alt="" onerror="this.style.display='none'">`;
            });
            html += `</div>`;
          }

          // Rarity bar
          if (cellState.rarity !== null && cellState.rarity !== undefined) {
            html += `<span class="rarity-text">${cellState.rarity}%</span>`;
            html += `<div class="rarity-bar"><div class="rarity-bar-fill" style="width:${Math.min(cellState.rarity, 100)}%"></div></div>`;
          }

          cellEl.innerHTML = html;
        }
        break;

      case 'wrong':
        cellEl.classList.add('cell-wrong');
        cellEl.innerHTML = '';
        break;

      default:
        // disabled or other
        cellEl.classList.add('cell-disabled');
        cellEl.innerHTML = '';
    }
  }

  // --- Guesses Bar ---

  function updateGuesses(used, total) {
    els.guessesDots.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'guess-dot';
      if (i < used) {
        dot.classList.add('used');
      }
      // We don't know which were wrong from this level, but we can track in Game
      els.guessesDots.appendChild(dot);
    }
  }

  function updateGuessesWithState(cells) {
    // Count filled and wrong cells
    let used = 0;
    let wrong = 0;
    cells.forEach(row => {
      row.forEach(cell => {
        if (cell.status === 'filled' || cell.status === 'wrong') {
          used++;
        }
        if (cell.status === 'wrong') {
          wrong++;
        }
      });
    });

    els.guessesDots.innerHTML = '';
    let dotIndex = 0;
    cells.forEach(row => {
      row.forEach(cell => {
        if (dotIndex >= Game.MAX_GUESSES) return;
        const dot = document.createElement('span');
        dot.className = 'guess-dot';
        if (cell.status === 'filled') {
          dot.classList.add('used');
        } else if (cell.status === 'wrong') {
          dot.classList.add('wrong');
        }
        els.guessesDots.appendChild(dot);
        dotIndex++;
      });
    });
  }

  // --- Search Modal ---

  function openSearch(cellHintText) {
    els.searchModal.classList.remove('hidden');
    els.cellHint.innerHTML = `Select a player for: <strong>${cellHintText}</strong>`;
    els.searchInput.value = '';
    els.searchInput.focus();
    showSearchState('initial');

    // Scroll to top of results
    els.searchResultsList.innerHTML = '';
    els.searchResultsList.classList.add('hidden');
  }

  function closeSearch() {
    els.searchModal.classList.add('hidden');
  }

  function showSearchState(state) {
    els.searchInitial.classList.toggle('hidden', state !== 'initial');
    els.searchEmpty.classList.toggle('hidden', state !== 'empty');
    els.searchLoading.classList.toggle('hidden', state !== 'loading');
    els.searchError.classList.toggle('hidden', state !== 'error');
    els.searchResultsList.classList.toggle('hidden', state !== 'results');
  }

  function renderSearchResults(players) {
    els.searchResultsList.innerHTML = '';
    if (players.length === 0) {
      showSearchState('empty');
      return;
    }

    showSearchState('results');
    players.forEach(p => {
      const div = document.createElement('div');
      div.className = 'player-result';
      div.dataset.playerId = p.playerId;
      div.tabIndex = 0;

      let html = '';
      if (p.headshotUrl) {
        html += `<img class="player-result-img" src="${p.headshotUrl}" alt="${p.fullName}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><rect fill=%22%23e9ecef%22 width=%2240%22 height=%2240%22/><text font-size=%2220%22 x=%2220%22 y=%2225%22 text-anchor=%22middle%22 fill=%22%23868e96%22>${p.fullName[0]}</text></svg>'">`;
      } else {
        html += `<div class="player-result-img" style="background:#e9ecef;display:flex;align-items:center;justify-content:center;font-weight:700;color:#868e96">${p.fullName[0]}</div>`;
      }

      html += `<div class="player-result-info"><div class="player-result-name">${p.fullName}</div>`;
      if (p.teamAbbrev) {
        html += `<div class="player-result-teams">${p.teamAbbrev}</div>`;
      }
      html += `</div>`;

      div.innerHTML = html;
      div.addEventListener('click', () => onPlayerSelect(p));
      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') onPlayerSelect(p);
      });

      els.searchResultsList.appendChild(div);
    });
  }

  // Player select handler (set by app.js)
  let onPlayerSelect = () => {};

  function setPlayerSelectHandler(handler) {
    onPlayerSelect = handler;
  }

  // --- Results Modal ---

  function showResults(score, cells) {
    els.resultsScore.textContent = `${score.correct}/${score.total}`;
    els.resultsRarity.textContent = `Total Rarity: ${score.totalRarity}`;

    // Build mini results grid
    els.resultsGrid.innerHTML = '';
    cells.forEach(row => {
      row.forEach(cell => {
        const div = document.createElement('div');
        div.className = `results-cell ${cell.status === 'filled' ? 'correct' : (cell.status === 'wrong' ? 'wrong' : '')}`;
        div.textContent = cell.status === 'filled' ? '✓' : (cell.status === 'wrong' ? '✗' : '—');
        els.resultsGrid.appendChild(div);
      });
    });

    // Message
    if (score.correct === 9) {
      els.resultsMessage.textContent = '🏆 Perfect game! You got all 9 correct!';
    } else if (score.correct >= 7) {
      els.resultsMessage.textContent = 'Great job! You know your basketball!';
    } else if (score.correct >= 5) {
      els.resultsMessage.textContent = 'Nice work! Keep studying those rosters.';
    } else {
      els.resultsMessage.textContent = 'Tough grid! Better luck next time.';
    }

    els.resultsModal.classList.remove('hidden');
  }

  function closeResults() {
    els.resultsModal.classList.add('hidden');
  }

  // --- Rules Modal ---

  function openRules() {
    els.rulesModal.classList.remove('hidden');
  }

  function closeRules() {
    els.rulesModal.classList.add('hidden');
  }

  // --- Toast ---

  function showToast(message, type, duration = 2500) {
    els.toast.textContent = message;
    els.toast.className = 'toast';
    if (type) els.toast.classList.add(type);
    els.toast.classList.remove('hidden');

    clearTimeout(els.toast._timeout);
    els.toast._timeout = setTimeout(() => {
      els.toast.classList.add('hidden');
    }, duration);
  }

  // --- Mode Buttons ---

  function setActiveMode(mode) {
    els.modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }

  // --- Share Button ---

  function enableShare(enable) {
    els.btnShare.disabled = !enable;
  }

  return {
    init,
    showLoading,
    showError,
    showBoard,
    renderGrid,
    updateCell,
    setCellClickHandler,
    updateGuesses,
    updateGuessesWithState,
    openSearch,
    closeSearch,
    showSearchState,
    renderSearchResults,
    setPlayerSelectHandler,
    showResults,
    closeResults,
    openRules,
    closeRules,
    showToast,
    setActiveMode,
    enableShare,
    els
  };
})();

/**
 * Player Search Module.
 * Handles autocomplete search with debounce, keyboard navigation.
 */
const Search = (() => {
  let debounceTimer = null;
  let currentQuery = '';
  let selectedIndex = -1;
  let results = [];

  function init() {
    const input = UI.els.searchInput;
    const list = UI.els.searchResultsList;

    input.addEventListener('input', () => {
      const query = input.value.trim();
      currentQuery = query;
      selectedIndex = -1;

      if (query.length < 2) {
        UI.showSearchState('initial');
        return;
      }

      // Debounce
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(query), 300);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateResults(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateResults(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          UI.onPlayerSelect(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        UI.closeSearch();
      }
    });
  }

  async function performSearch(query) {
    if (query.length < 2) return;

    UI.showSearchState('loading');

    try {
      results = await API.searchPlayers(query);
      if (results.length === 0) {
        UI.showSearchState('empty');
      } else {
        UI.renderSearchResults(results);
        selectedIndex = -1;
      }
    } catch (err) {
      console.error('Search failed:', err);
      UI.showSearchState('error');
    }
  }

  function navigateResults(direction) {
    const items = UI.els.searchResultsList.querySelectorAll('.player-result');
    if (items.length === 0) return;

    // Remove current selection
    if (selectedIndex >= 0 && items[selectedIndex]) {
      items[selectedIndex].classList.remove('selected');
    }

    selectedIndex += direction;

    // Clamp
    if (selectedIndex < 0) selectedIndex = 0;
    if (selectedIndex >= items.length) selectedIndex = items.length - 1;

    // Apply selection
    items[selectedIndex].classList.add('selected');
    items[selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  function resetSearch() {
    currentQuery = '';
    selectedIndex = -1;
    results = [];
    clearTimeout(debounceTimer);
  }

  return {
    init,
    resetSearch
  };
})();

/**
 * Share Module - Generates and copies share text.
 */
const Share = (() => {
  /**
   * Generate shareable text grid.
   * Format:
   * Immaculate Grid 🏀
   * 🟩🟩🟩
   * 🟩🟩⬜
   * 🟩⬜🟩
   * Score: 6/9
   * Rarity: 42.8
   */
  function generateText(cells, score) {
    let text = 'Immaculate Grid 🏀\n';

    cells.forEach(row => {
      const line = row.map(cell => {
        if (cell.status === 'filled') return '🟩';
        if (cell.status === 'wrong') return '🟥';
        return '⬜';
      }).join('');
      text += line + '\n';
    });

    text += `Score: ${score.correct}/${score.total}\n`;
    if (score.totalRarity > 0) {
      text += `Rarity: ${score.totalRarity}`;
    }

    return text;
  }

  async function copyToClipboard(cells, score) {
    const text = generateText(cells, score);

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn('Clipboard API failed:', err);
    }

    // Fallback: use textarea method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (err) {
      console.warn('Fallback copy failed:', err);
      return false;
    }
  }

  return {
    generateText,
    copyToClipboard
  };
})();

/**
 * App Entry Point.
 * Initializes all modules and wires up event handlers.
 */
(function() {
  'use strict';

  // Current active cell being searched
  let activeSearchCell = null;

  // ---- Initialization ----

  async function init() {
    UI.init();
    Search.init();
    setupEventListeners();

    // Subscribe to game state changes
    Game.subscribe(onGameStateChange);

    // Try to restore saved game
    const restored = Game.loadFromStorage();
    const today = new Date().toISOString().split('T')[0];

    if (restored) {
      const state = Game.getState();
      // Check if restored grid is still valid
      if (state.config && (state.config.id === today || state.mode === 'random')) {
        UI.setActiveMode(state.mode);
        renderFullGrid(state.config);
        if (state.isComplete) {
          showResults();
        }
        return;
      }
    }

    // Load today's grid by default
    await loadGrid('today');
  }

  // ---- Event Listeners ----

  function setupEventListeners() {
    // Mode buttons
    UI.els.modeBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const mode = btn.dataset.mode;
        if (mode === Game.getState().mode) return;
        await loadGrid(mode);
      });
    });

    // Share button
    UI.els.btnShare.addEventListener('click', showResults);

    // New game button
    UI.els.btnNewGame.addEventListener('click', async () => {
      await loadGrid('random');
    });

    // Rules button
    UI.els.btnRules.addEventListener('click', UI.openRules);

    // Search modal close
    UI.els.searchClose.addEventListener('click', UI.closeSearch);
    UI.els.searchModal.addEventListener('click', (e) => {
      if (e.target === UI.els.searchModal) UI.closeSearch();
    });

    // Results modal close
    UI.els.resultsClose.addEventListener('click', UI.closeResults);

    // Play again
    UI.els.btnPlayAgain.addEventListener('click', async () => {
      UI.closeResults();
      await loadGrid('random');
    });

    // Copy share
    UI.els.btnCopyShare.addEventListener('click', async () => {
      const state = Game.getState();
      const score = Game.getScore();
      const success = await Share.copyToClipboard(state.cells, score);
      if (success) {
        UI.showToast('Copied to clipboard!', 'success');
      } else {
        UI.showToast('Could not copy. Try manually.', 'error');
      }
    });

    // Rules modal close
    UI.els.rulesClose.addEventListener('click', UI.closeRules);
    UI.els.rulesModal.addEventListener('click', (e) => {
      if (e.target === UI.els.rulesModal) UI.closeRules();
    });

    // Cell click handler (UI will call this)
    UI.setCellClickHandler(onCellClicked);

    // Player select handler
    UI.setPlayerSelectHandler(onPlayerSelected);
  }

  // ---- Grid Loading ----

  async function loadGrid(mode) {
    UI.showLoading();
    UI.enableShare(false);
    UI.closeResults();

    try {
      const config = mode === 'today' ? await API.getTodayGrid() : await API.getRandomGrid();

      // Random mode needs a stable ID
      if (mode === 'random' && !config.id) {
        config.id = `random-${Date.now()}`;
      }

      Game.init(config, mode);
      UI.setActiveMode(mode);
      Game.clearStorage();
      renderFullGrid(config);
      UI.showBoard();
      UI.enableShare(false);
    } catch (err) {
      console.error('Failed to load grid:', err);
      UI.showError();
    }
  }

  function renderFullGrid(config) {
    UI.renderGrid(config);
    const state = Game.getState();

    // Update all cells
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cell = Game.getCell(r, c);
        UI.updateCell(r, c, cell);
      }
    }

    // Update guesses
    UI.updateGuessesWithState(state.cells);
  }

  // ---- Game State Change Handler ----

  function onGameStateChange(state) {
    // Update cells
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cell = Game.getCell(r, c);
        UI.updateCell(r, c, cell);
      }
    }

    // Update guesses
    UI.updateGuessesWithState(state.cells);

    // Check completion
    if (state.isComplete) {
      UI.enableShare(true);
      setTimeout(showResults, 500);
    }
  }

  // ---- Cell Interaction ----

  function onCellClicked(row, col) {
    const state = Game.getState();

    // Ignore if game is over or cell is already filled
    if (state.isComplete) return;

    const cell = Game.getCell(row, col);
    if (!cell || cell.status === 'filled' || cell.status === 'loading') return;

    // Set active cell
    activeSearchCell = { row, col };
    Game.setActiveCell(row, col);

    // Open search modal
    const hint = Game.getCellHint(row, col);
    UI.openSearch(hint);
    Search.resetSearch();
  }

  async function onPlayerSelected(player) {
    if (!activeSearchCell) return;

    const { row, col } = activeSearchCell;
    const state = Game.getState();

    // Close search modal
    UI.closeSearch();

    // Set cell to loading
    Game.setCellLoading(row, col);

    // Validate answer
    try {
      const rowCat = state.config.rows[row];
      const colCat = state.config.columns[col];

      const result = await API.validateAnswer(player.playerId, rowCat, colCat);

      if (result.valid) {
        // Submit for rarity
        try {
          const rarityResult = await API.submitAnswer(
            state.config.id, row, col, player.playerId
          );
          const rarity = rarityResult.rarity !== undefined ? rarityResult.rarity : null;

          // Build player info for storage
          const playerInfo = {
            playerId: player.playerId,
            fullName: player.fullName,
            headshotUrl: player.headshotUrl || '',
            teamIds: result.player ? result.player.teamIds : [player.teamId].filter(Boolean),
            teamLogos: result.player ? result.player.teamLogos : [],
            teamAbbrevs: result.player ? result.player.teamAbbrevs : [player.teamAbbrev].filter(Boolean)
          };

          Game.setCellFilled(row, col, playerInfo, rarity);
        } catch (e) {
          // Rarity submission failed but validation succeeded
          const playerInfo = {
            playerId: player.playerId,
            fullName: player.fullName,
            headshotUrl: player.headshotUrl || '',
            teamIds: [],
            teamLogos: [],
            teamAbbrevs: []
          };
          Game.setCellFilled(row, col, playerInfo, null);
        }
      } else {
        Game.setCellWrong(row, col);
        UI.showToast('Not a valid answer for this cell', 'error', 2000);
      }
    } catch (err) {
      console.error('Validation failed:', err);
      Game.setCellWrong(row, col);
      UI.showToast('Validation failed. Try again.', 'error');
    }

    activeSearchCell = null;
    Game.clearActiveCell();
  }

  // ---- Results ----

  function showResults() {
    const state = Game.getState();
    const score = Game.getScore();
    UI.showResults(score, state.cells);
  }

  // ---- Start ----

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();