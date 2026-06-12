// 游戏状态管理（纯客户端逻辑）
const Game = (() => {
  const MAX_GUESSES = 9;

  let state = {
    config: null,
    cells: [],
    guessesUsed: 0,
    isComplete: false,
    mode: 'today',
    score: { correct: 0, totalRarity: 0 },
    _activeCell: null,
  };

  let onStateChange = null;

  function init(config, mode) {
    state = {
      config,
      mode: mode || 'today',
      guessesUsed: 0,
      isComplete: false,
      score: { correct: 0, totalRarity: 0 },
      _activeCell: null,
      cells: [],
    };
    for (let r = 0; r < 3; r++) {
      state.cells[r] = [];
      for (let c = 0; c < 3; c++) {
        state.cells[r][c] = { row: r, col: c, status: 'empty', player: null, rarity: null };
      }
    }
    save();
    notify();
  }

  function getState() { return state; }
  function getCell(row, col) { return state.cells[row] ? state.cells[row][col] : null; }
  function getActiveCell() { return state._activeCell || null; }
  function setActiveCell(row, col) { state._activeCell = { row, col }; notify(); }
  function clearActiveCell() { state._activeCell = null; }

  function setCellLoading(row, col) {
    const cell = getCell(row, col);
    if (cell && cell.status === 'empty') { cell.status = 'loading'; notify(); }
  }

  function setCellFilled(row, col, player, rarity) {
    const cell = getCell(row, col);
    if (!cell) return;
    cell.status = 'filled';
    cell.player = player;
    cell.rarity = rarity;
    state.guessesUsed++;
    state.score.correct++;
    if (rarity !== null && rarity !== undefined) state.score.totalRarity += rarity;
    checkCompletion();
    save();
    notify();
  }

  function setCellWrong(row, col) {
    const cell = getCell(row, col);
    if (!cell) return;
    cell.status = 'wrong';
    state.guessesUsed++;
    setTimeout(() => { if (cell.status === 'wrong') { cell.status = 'empty'; notify(); } }, 600);
    checkCompletion();
    save();
    notify();
  }

  function checkCompletion() {
    if (state.isComplete) return;
    const allFilled = state.cells.every(r => r.every(c => c.status === 'filled'));
    if (allFilled || state.guessesUsed >= MAX_GUESSES) state.isComplete = true;
  }

  function getScore() {
    return {
      correct: state.score.correct,
      total: 9,
      totalRarity: Math.round(state.score.totalRarity * 10) / 10,
    };
  }

  function getRemainingGuesses() { return MAX_GUESSES - state.guessesUsed; }

  function getCellHint(row, col) {
    if (!state.config) return '';
    return `${state.config.rows[row].label} × ${state.config.columns[col].label}`;
  }

  function getUsedPlayerIds() {
    const ids = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cell = state.cells[r][c];
        if (cell.status === 'filled' && cell.player && cell.player.playerId) {
          ids.push(cell.player.playerId);
        }
      }
    }
    return ids;
  }

  function subscribe(callback) { onStateChange = callback; }
  function notify() { if (onStateChange) onStateChange(getState()); }

  // localStorage 持久化
  function save() {
    try {
      localStorage.setItem('ig_state', JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem('ig_state');
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.config && saved.cells) {
          state = saved;
          return true;
        }
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function clearStorage() {
    try { localStorage.removeItem('ig_state'); } catch (e) { /* ignore */ }
  }

  return {
    init, getState, getCell, getScore, getRemainingGuesses, getCellHint, getUsedPlayerIds,
    setActiveCell, getActiveCell, clearActiveCell,
    setCellLoading, setCellFilled, setCellWrong,
    subscribe, save, loadFromStorage, clearStorage,
  };
})();
