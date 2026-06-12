const Api = (() => {
  async function request(path, opts = {}) {
    const url = CONFIG.API_BASE + path;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      ...opts,
    });
    if (!res.ok) throw new Error(`API ${path}: ${res.status}`);
    return res.json();
  }

  return {
    getTodayGrid: () => request('/grid/today'),
    getRandomGrid: () => request('/grid/random'),
    searchPlayers: (q, limit = 10) => request(`/players/search?q=${encodeURIComponent(q)}&limit=${limit}`),
    validateAnswer: (playerId, rowCategory, colCategory) =>
      request('/validate', {
        method: 'POST',
        body: JSON.stringify({ playerId, rowCategory, colCategory }),
      }),
    submitAnswer: (gridId, row, col, playerId) =>
      request('/submit', {
        method: 'POST',
        body: JSON.stringify({ gridId, row, col, playerId }),
      }),
    getTeams: () => request('/teams'),
    healthCheck: () => request('/health'),
  };
})();
