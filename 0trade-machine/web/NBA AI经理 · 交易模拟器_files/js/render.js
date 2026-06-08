var activeTeamIndex = 0;

function isDesktop() {
  return window.innerWidth >= 1024;
}

function renderAll() {
  renderTradeBar();
  renderActiveTeamPanel();
}

window.addEventListener('resize', function() {
  renderActiveTeamPanel();
});

function renderTradeBar() {
  var container = document.getElementById('trade-bar-teams');
  var checkBtn = document.getElementById('btn-check-trade');

  var html = '';

  state.teams.forEach(function(team, idx) {
    var isActive = idx === activeTeamIndex;
    var outgoing = state.moves.filter(function(m) { return m.from === team.id; });
    var incoming = state.moves.filter(function(m) { return m.to === team.id; });
    var outPlayers = outgoing.filter(function(m) { return m.type !== 'draft_pick'; });
    var inPlayers = incoming.filter(function(m) { return m.type !== 'draft_pick'; });
    var outPicks = outgoing.filter(function(m) { return m.type === 'draft_pick'; });
    var inPicks = incoming.filter(function(m) { return m.type === 'draft_pick'; });
    var outSalary = outPlayers.reduce(function(s, m) { return s + m.player.salary; }, 0);
    var inSalary = inPlayers.reduce(function(s, m) { return s + m.player.salary; }, 0);
    var hasMoves = outgoing.length + incoming.length > 0;

    var cls = 'trade-bar-team-card' + (isActive ? ' active' : '');

    html += '<div class="' + cls + '" onclick="switchTeamTab(' + idx + ')" style="' + (isActive ? 'border-color:' + team.color + ';background:' + team.color + '08;' : '') + '">' +
      '<div class="trade-bar-card-head">' +
        '<span class="trade-bar-card-logo" style="background:' + team.color + ';">' + getShortName(team, 2) + '</span>' +
        '<span class="trade-bar-card-name">' + (team.shortName || team.name) + '</span>' +
        (isActive ? '<span class="trade-bar-card-remove" onclick="event.stopPropagation(); removeTeam(\'' + team.id + '\')" title="移除"><span class="material-symbols-outlined">close</span></span>' : '') +
      '</div>' +
      (hasMoves ?
        '<div class="trade-bar-card-info">' +
        (outPlayers.length > 0 ? '<div class="trade-bar-row trade-bar-out"><span class="material-symbols-outlined">north_east</span><span>送出 ' + outPlayers.length + '人 ' + fmt(outSalary) + '</span></div>' : '') +
        (outPicks.length > 0 ? '<div class="trade-bar-row trade-bar-out"><span class="material-symbols-outlined">north_east</span><span>送出 ' + outPicks.length + '签</span></div>' : '') +
        (inPlayers.length > 0 ? '<div class="trade-bar-row trade-bar-in"><span class="material-symbols-outlined">south_west</span><span>接收 ' + inPlayers.length + '人 ' + fmt(inSalary) + '</span></div>' : '') +
        (inPicks.length > 0 ? '<div class="trade-bar-row trade-bar-in"><span class="material-symbols-outlined">south_west</span><span>接收 ' + inPicks.length + '签</span></div>' : '') +
        '</div>'
      : '<div class="trade-bar-card-info trade-bar-card-empty">暂无交易</div>') +
      '</div>';
  });

  if (state.teams.length < MAX_TEAMS) {
    html += '<div class="trade-bar-team-card add-card" onclick="openTeamModal()">' +
      '<span class="material-symbols-outlined" style="font-size:24px;">add</span>' +
      '<span>添加球队</span>' +
      '</div>';
  }

  container.innerHTML = html;
  if (checkBtn) checkBtn.disabled = state.moves.length === 0 || state.teams.length < 2;
}

function switchTeamTab(idx) {
  activeTeamIndex = idx;
  renderTradeBar();
  if (!isDesktop()) {
    renderActiveTeamPanel();
  }
}

function renderActiveTeamPanel() {
  var container = document.getElementById('team-panel-container');

  if (state.teams.length === 0) {
    container.innerHTML = '<div class="panels-empty">' +
      '<span class="material-symbols-outlined" style="font-size:48px;color:var(--outline-variant);display:block;margin-bottom:12px;">swap_horiz</span>' +
      '请点击上方「+ 添加球队」开始构建交易</div>';
    return;
  }

  if (isDesktop()) {
    var allHtml = '<div class="panels-scroll multi-panel">';
    state.teams.forEach(function(team) {
      allHtml += renderTeamPanel(team);
    });
    allHtml += '</div>';
    container.innerHTML = allHtml;
  } else {
    var team = state.teams[activeTeamIndex] || state.teams[0];
    if (!team) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = renderTeamPanel(team);
  }

  attachPanelEvents();
}

function renderTeamPanel(team) {
  var outgoingIds = state.moves
    .filter(function(m) { return m.from === team.id && m.type !== 'draft_pick'; })
    .map(function(m) { return m.player.id; });
  var outgoingPickIds = state.moves
    .filter(function(m) { return m.from === team.id && m.type === 'draft_pick'; })
    .map(function(m) { return m.draftPick.id; });

  var primaryColor = team.color || '#c8102e';
  var accentColor = team.accent || primaryColor;
  var bgStyle = 'background: linear-gradient(135deg, ' + primaryColor + '08 0%, ' + primaryColor + '04 50%, #ffffff 100%); --panel-accent: ' + primaryColor + '; --panel-accent-secondary: ' + accentColor + ';';

  var html = '<div class="team-panel" data-team-id="' + team.id + '" style="' + bgStyle + '">';

  html += '<div class="panel-letter-bg" style="color:' + primaryColor + ';" aria-hidden="true">' + String(team.id).toUpperCase() + '</div>';

  html += '<div class="panel-head" style="background: linear-gradient(to right, ' + primaryColor + '18, ' + primaryColor + '08);">' +
    '<div class="panel-logo" style="background:' + primaryColor + ';">' + getShortName(team, 2) + '</div>' +
    '<span class="panel-name" style="color:' + primaryColor + ';">' + team.name + '</span>' +
    '<span class="panel-conf" style="background:' + primaryColor + '15; color:' + primaryColor + '; border:1px solid ' + primaryColor + '30;">' + (team.conference === 'west' ? 'WEST' : 'EAST') + '</span>' +
    '</div>';

  html += '<div class="panel-finance" style="background: linear-gradient(to right, ' + accentColor + '10, ' + primaryColor + '06);">' +
    '<div><span class="fin-label">超税线</span><br><span class="fin-val ' + (team.overTaxLine > 0 ? 'danger' : 'success') + '">' + fmt(team.overTaxLine) + '</span></div>' +
    '<div><span class="fin-label">薪资空间</span><br><span class="fin-val ' + (team.capRoom >= 0 ? 'success' : 'danger') + '">' + fmt(team.capRoom) + '</span></div>' +
    '</div>';

  html += '<div class="player-list-header" style="border-bottom-color:' + primaryColor + '30;">' +
    '<span class="plh-name">球员</span>' +
    '<span class="plh-salary">薪资</span>' +
    '<span class="plh-action"></span>' +
    '</div>';

  html += '<div class="player-list">';

  team.players.slice().sort(function(a, b) { return b.salary - a.salary; }).forEach(function(p) {
    var isOut = outgoingIds.indexOf(p.id) !== -1;
    var isInMove = state.moves.some(function(m) { return m.type !== 'draft_pick' && m.player.id === p.id; });
    var isInFromOther = isInMove && !isOut;
    var isFA = isFreeAgent(p);

    var cls = '';
    if (isOut) cls = ' selected';
    else if (isInFromOther) cls = ' restricted';
    else if (p.restricted) cls = ' restricted';
    else if (isFA) cls = ' free-agent';

    var pos = (typeof getPlayerPosition === 'function') ? getPlayerPosition(p.id) : null;
    var posLabel = pos ? (pos + ' / ' + String(team.id).toUpperCase()) : String(team.id).toUpperCase();

    // Check for player option badge (only 2026-27 season)
    var optionInfo = typeof getPlayerOptionById === 'function' ? getPlayerOptionById(p.id) : null;
    var optionBadge = '';
    if (optionInfo && optionInfo[1] === '2026-27') {
      var optType = optionInfo[0] === 'player' ? 'PO' : 'TO';
      optionBadge = ' <span class="option-badge ' + (optionInfo[0] === 'player' ? 'player-option' : 'team-option') + '" title="2026-27 ' + (optionInfo[0] === 'player' ? '球员选项' : '球队选项') + '">' + optType + '</span>';
    }

    html += '<div class="player-row' + cls + '" data-player-id="' + p.id + '" data-team-id="' + team.id + '"' + (isFA ? ' title="自由球员，不可交易"' : '') + '>' +
      '<div class="player-avatar">' + (p.img ? '<img class="player-img" src="' + p.img + '" alt="">' : p.name.charAt(0)) + '</div>' +
      '<div class="player-info">' +
        '<span class="player-name" data-player-id="' + p.id + '">' + p.name + '</span>' +
        '<span class="player-position">' + posLabel + (isFA ? ' <span class="fa-badge">自由球员</span>' : '') + optionBadge + '</span>' +
      '</div>' +
      (p.restricted ? '<span class="material-symbols-outlined lock-icon" style="font-size:12px;color:var(--tertiary);">lock</span>' : '') +
      '<span class="player-salary">' + fmt(p.salary) + '</span>' +
      '<span class="player-action">' + (isFA ? '<span class="material-symbols-outlined" style="font-size:14px;color:var(--outline-variant);">block</span>' : (isOut ? '<span class="material-symbols-outlined checked" style="font-size:16px;">check_circle</span>' : (isInFromOther ? '<span class="material-symbols-outlined arrow" style="font-size:14px;">fiber_manual_record</span>' : '<span class="material-symbols-outlined arrow" style="font-size:14px;">east</span>'))) + '</span>' +
      '</div>';
  });

  var draftPicks = DRAFT_PICKS_DATA[team.id] || [];
  if (draftPicks.length > 0) {
    html += '<div class="draft-pick-section-header" style="border-top-color:' + primaryColor + '30; color:' + primaryColor + ';">' +
      '<span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;">sell</span> 选秀权' +
      '</div>';
    html += '<div class="draft-pick-list">';

    draftPicks.forEach(function(pick) {
      var isOut = outgoingPickIds.indexOf(pick.id) !== -1;
      var isInMove = isDraftPickInTrade(pick.id) && !isOut;

      var cls = 'draft-pick-row';
      if (isOut) cls += ' selected';
      else if (isInMove) cls += ' restricted';

      var roundLabel = pick.round === 1 ? '首轮' : '次轮';
      var protectionLabel = pick.protection !== 'none' ? ' <span class="pick-protection">' + pick.protection + '</span>' : '';

      // Extract pick number from label like "2026首轮（#8，来自鹈鹕）"
      var pickNum = '';
      if (pick.label) {
        var m = pick.label.match(/#(\d+)/);
        if (m) pickNum = ' <span class="pick-number">#' + m[1] + '</span>';
      }

      html += '<div class="' + cls + '" data-pick-id="' + pick.id + '" data-team-id="' + team.id + '">' +
        '<div class="pick-avatar"><span class="material-symbols-outlined" style="font-size:14px;">sell</span></div>' +
        '<div class="pick-info">' +
          '<span class="pick-label">' + pick.year + ' ' + roundLabel + pickNum + protectionLabel + '</span>' +
          '<span class="pick-origin">' + (pick.originalTeam === team.id ? '自有' : '来自' + getTeamShortName(pick.originalTeam)) + '</span>' +
        '</div>' +
        '<span class="pick-action">' + (isOut ? '<span class="material-symbols-outlined checked" style="font-size:16px;">check_circle</span>' : (isInMove ? '<span class="material-symbols-outlined arrow" style="font-size:14px;">fiber_manual_record</span>' : '<span class="material-symbols-outlined arrow" style="font-size:14px;">east</span>')) + '</span>' +
        '</div>';
    });

    html += '</div>';
  }

  html += '</div></div>';
  return html;
}

function attachPanelEvents() {
  document.querySelectorAll('.player-row').forEach(function(row) {
    row.removeEventListener('click', handlePlayerClick);
    row.addEventListener('click', handlePlayerClick);
    row.removeEventListener('mousedown', handlePlayerMouseDown);
    row.addEventListener('mousedown', handlePlayerMouseDown);
    row.removeEventListener('mouseup', handlePlayerMouseUp);
    row.addEventListener('mouseup', handlePlayerMouseUp);
    row.removeEventListener('mouseleave', handlePlayerMouseLeave);
    row.addEventListener('mouseleave', handlePlayerMouseLeave);
  });

  document.querySelectorAll('.player-name[data-player-id]').forEach(function(el) {
    el.removeEventListener('click', handlePlayerNameClick);
    el.addEventListener('click', handlePlayerNameClick);
  });

  document.querySelectorAll('.draft-pick-row').forEach(function(row) {
    row.removeEventListener('click', handleDraftPickClick);
    row.addEventListener('click', handleDraftPickClick);
  });
}

var _longPressTimer = null;
var _longPressPlayer = null;
var _longPressRow = null;

function handlePlayerMouseDown(e) {
  if (e.button !== 0) return;
  var row = e.currentTarget;
  var playerId = row.getAttribute('data-player-id');
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === playerId; });
  if (!player) return;
  
  _longPressPlayer = player;
  _longPressRow = row;
  _longPressTimer = setTimeout(function() {
    showSalaryChartModal(player, team);
  }, 600);
}

function handlePlayerMouseUp(e) {
  if (_longPressTimer) {
    clearTimeout(_longPressTimer);
    _longPressTimer = null;
  }
}

function handlePlayerMouseLeave(e) {
  if (_longPressTimer) {
    clearTimeout(_longPressTimer);
    _longPressTimer = null;
  }
}

function showSalaryChartModal(player, team) {
  var modal = document.getElementById('modal-salary-chart');
  if (!modal) return;

  var titleEl = document.getElementById('salary-chart-title');
  var legendEl = document.getElementById('salary-chart-legend');
  var canvas = document.getElementById('salary-chart-canvas');
  if (!titleEl || !legendEl || !canvas) return;

  titleEl.innerHTML = '<span class="material-symbols-outlined">bar_chart</span> ' + player.name + ' 薪资折线图';

  // Build legend
  legendEl.innerHTML = '';
  var teamColor = team ? team.color : '#c8102e';
  var legendItem = document.createElement('span');
  legendItem.className = 'salary-chart-legend-item';
  legendItem.innerHTML = '<span class="salary-chart-legend-dot" style="background:' + teamColor + ';"></span>' +
    '<span class="legend-player-name">' + player.name + '</span>' +
    ' <span style="color:var(--outline-variant)">·</span> ' + (team ? team.shortName || team.name : '');
  legendEl.appendChild(legendItem);

  // Draw chart
  drawSalaryChart(canvas, player, teamColor);

  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function drawSalaryChart(canvas, player, lineColor) {
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var displayWidth = canvas.clientWidth || 500;
  var displayHeight = canvas.clientHeight || 260;
  
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  ctx.scale(dpr, dpr);

  var W = displayWidth;
  var H = displayHeight;
  var pad = { top: 30, bottom: 40, left: 70, right: 30 };
  var chartW = W - pad.left - pad.right;
  var chartH = H - pad.top - pad.bottom;

  // Collect salary data
  var years = ['2025-26', '2026-27', '2027-28', '2028-29', '2029-30'];
  var values = [
    player.salary,
    player.salary_2026_27,
    player.salary_2027_28,
    player.salary_2028_29,
    player.salary_2029_30
  ];

  // Filter to non-null values for scaling
  var validVals = values.filter(function(v) { return v !== null && v !== undefined; });
  if (validVals.length === 0) {
    ctx.fillStyle = '#ccc';
    ctx.font = '14px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('暂无薪资数据', W / 2, H / 2);
    return;
  }

  var maxVal = Math.max.apply(null, validVals);
  var minVal = Math.min.apply(null, validVals);
  var range = maxVal - minVal;
  if (range === 0) range = maxVal * 0.2 || 1;
  var yPadding = range * 0.1;
  var yMax = maxVal + yPadding;
  var yMin = Math.max(0, minVal - yPadding);

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, W, H);

  // Helper: y position
  function yPos(val) {
    if (val === null || val === undefined) return null;
    return pad.top + chartH - ((val - yMin) / (yMax - yMin)) * chartH;
  }

  // Draw horizontal grid lines
  ctx.strokeStyle = '#e8e8e8';
  ctx.lineWidth = 1;
  var gridCount = 5;
  for (var i = 0; i <= gridCount; i++) {
    var y = pad.top + (chartH / gridCount) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + chartW, y);
    ctx.stroke();

    // Y-axis labels
    var val = yMax - ((yMax - yMin) / gridCount) * i;
    ctx.fillStyle = '#999';
    ctx.font = '11px Hanken Grotesk, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(fmt(val), pad.left - 8, y);
  }

  // Calculate points
  var points = [];
  var stepX = chartW / (years.length - 1);
  for (var i = 0; i < years.length; i++) {
    var y = yPos(values[i]);
    points.push({
      x: pad.left + stepX * i,
      y: y,
      val: values[i],
      label: years[i]
    });
  }

  // Filter to valid points for drawing lines
  var validPoints = points.filter(function(p) { return p.y !== null; });

  // Draw area fill
  if (validPoints.length >= 2) {
    ctx.beginPath();
    var first = true;
    validPoints.forEach(function(p) {
      if (first) { ctx.moveTo(p.x, pad.top + chartH); ctx.lineTo(p.x, p.y); first = false; }
      else { ctx.lineTo(p.x, p.y); }
    });
    var last = validPoints[validPoints.length - 1];
    ctx.lineTo(last.x, pad.top + chartH);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, lineColor + '40');
    grad.addColorStop(1, lineColor + '05');
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // Draw line
  if (validPoints.length >= 2) {
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    validPoints.forEach(function(p, idx) {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  // Draw dots and labels
  points.forEach(function(p) {
    // X-axis label
    ctx.fillStyle = '#888';
    ctx.font = '11px Sora, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(p.label, p.x, pad.top + chartH + 8);

    if (p.y === null) {
      // Draw empty marker (X)
      ctx.fillStyle = '#ccc';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✕', p.x, pad.top + chartH / 2);
      return;
    }

    // Dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Value label above dot
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Hanken Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(fmt(p.val), p.x, p.y - 8);
  });
}

function closeSalaryChartModal() {
  var modal = document.getElementById('modal-salary-chart');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function handlePlayerNameClick(e) {
  e.stopPropagation();
  var pid = this.getAttribute('data-player-id');
  var row = this.closest('.player-row');
  if (!row) return;
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === pid; });
  if (!player) return;

  if (isFreeAgent(player)) {
    showToast(player.name + ' — 自由球员，不可交易', 'warn');
    return;
  }

  if (isPlayerInTrade(pid)) {
    removeMove(pid);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addMove(player, teamId, destTeam.id);
      return;
    }
  }

  openDestinationModal(player, teamId);
}

function handlePlayerClick(e) {
  var row = e.currentTarget;
  var playerId = row.getAttribute('data-player-id');
  var teamId = row.getAttribute('data-team-id');
  var team = TEAMS_DATA[teamId];
  var player = team.players.find(function(p) { return p.id === playerId; });

  if (!player) return;

  if (isFreeAgent(player)) {
    showToast(player.name + ' — 自由球员，不可交易', 'warn');
    return;
  }

  if (isPlayerInTrade(playerId)) {
    removeMove(playerId);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addMove(player, teamId, destTeam.id);
      return;
    }
  }

  openDestinationModal(player, teamId);
}

function getTeamShortName(teamId) {
  var t = TEAMS_DATA[teamId];
  return t ? (t.shortName || t.name) : teamId;
}

function handleDraftPickClick(e) {
  var row = e.currentTarget;
  var pickId = row.getAttribute('data-pick-id');
  var teamId = row.getAttribute('data-team-id');
  var draftPicks = DRAFT_PICKS_DATA[teamId] || [];
  var pick = draftPicks.find(function(p) { return p.id === pickId; });

  if (!pick) return;

  if (isDraftPickInTrade(pickId)) {
    removeMove(pickId);
    return;
  }

  if (state.teams.length < 2) {
    showToast('请先添加至少 2 支球队', 'warn');
    return;
  }

  if (state.teams.length === 2) {
    var destTeam = state.teams.find(function(t) { return t.id !== teamId; });
    if (destTeam) {
      addDraftPickMove(pick, teamId, destTeam.id);
      return;
    }
  }

  openDraftPickDestModal(pick, teamId);
}

function openDraftPickDestModal(draftPick, fromTeamId) {
  var modal = document.getElementById('modal-dest');
  var body = document.getElementById('modal-dest-body');
  var title = document.getElementById('modal-dest-title');

  var roundLabel = draftPick.round === 1 ? '首轮' : '次轮';
  title.textContent = '将 ' + draftPick.year + ' ' + roundLabel + ' 送至';

  var html = '<div class="dest-player-info">' +
    '<span style="color:var(--on-surface-variant);">来自 </span>' +
    '<b>' + getTeamShortName(fromTeamId) + '</b>' +
    '<span style="color:var(--on-surface-variant);"> · ' + draftPick.label + '</span>' +
    '</div>';

  html += '<div class="modal-section-title">选择目标球队</div>';

  state.teams.forEach(function(t) {
    if (t.id === fromTeamId) return;
    html += '<div class="modal-team-row" data-team-id="' + t.id + '" role="button" tabindex="0">' +
      '<div class="modal-team-logo" style="background:' + t.color + ';">' + getShortName(t, 2) + '</div>' +
      '<span class="modal-team-name">' + t.name + '</span>' +
      '<span class="material-symbols-outlined" style="margin-left:auto;font-size:16px;color:var(--outline-variant);">east</span>' +
      '</div>';
  });

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var toTeamId = this.getAttribute('data-team-id');
      addDraftPickMove(draftPick, fromTeamId, toTeamId);
      hideModal('modal-dest');
    });
  });

  showModal('modal-dest');
}

function renderCheckButton() {
}

function updateResultVisibility() {
}

function openTeamModal() {
  var modal = document.getElementById('modal-team');
  var body = document.getElementById('modal-team-body');
  var selectedIds = state.teams.map(function(t) { return t.id; });

  var westTeams = TEAM_LIST.filter(function(t) { return t.conference === 'west'; });
  var eastTeams = TEAM_LIST.filter(function(t) { return t.conference === 'east'; });

  var html = '<div class="modal-team-intro">选择一支球队开始交易模拟</div>';

  html += '<div class="modal-conf-section">';
  html += '<div class="modal-conf-title conf-east"><span class="material-symbols-outlined" style="font-size:16px;">public</span> 东部联盟 · EASTERN</div>';
  html += '<div class="modal-team-grid">';
  eastTeams.forEach(function(t) {
    var isSelected = selectedIds.indexOf(t.id) !== -1;
    var isFull = state.teams.length >= MAX_TEAMS;
    html += renderTeamCard(t, isSelected, isFull);
  });
  html += '</div></div>';

  html += '<div class="modal-conf-section">';
  html += '<div class="modal-conf-title conf-west"><span class="material-symbols-outlined" style="font-size:16px;">public</span> 西部联盟 · WESTERN</div>';
  html += '<div class="modal-team-grid">';
  westTeams.forEach(function(t) {
    var isSelected = selectedIds.indexOf(t.id) !== -1;
    var isFull = state.teams.length >= MAX_TEAMS;
    html += renderTeamCard(t, isSelected, isFull);
  });
  html += '</div></div>';

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var tid = this.getAttribute('data-team-id');
      if (this.classList.contains('selected') || this.classList.contains('disabled')) return;
      addTeam(tid);
      hideModal('modal-team');
    });
  });

  showModal('modal-team');
}

function renderTeamCard(team, isSelected, isFull) {
  var city = team.name.replace(team.shortName, '').trim();
  var cls = 'modal-team-card';
  if (isSelected) cls += ' selected';
  if (isFull && !isSelected) cls += ' disabled';

  return '<div class="' + cls + '" data-team-id="' + team.id + '" role="button" tabindex="0">' +
    '<div class="modal-card-letter-bg" aria-hidden="true">' + String(team.id).toUpperCase() + '</div>' +
    '<div class="modal-card-left">' +
      '<div class="modal-card-logo" style="background:' + team.color + ';">' +
        '<span>' + String(team.id).toUpperCase().substring(0, 2) + '</span>' +
      '</div>' +
      '<div class="modal-card-info">' +
        '<div class="modal-card-city">' + team.shortName + '</div>' +
        '<div class="modal-card-name">' + city + '</div>' +
      '</div>' +
    '</div>' +
    '<button class="modal-card-trade-btn' + (isSelected ? ' is-selected' : '') + '"' +
      ' type="button">' +
      (isSelected
        ? '<span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> 已选'
        : '<span class="material-symbols-outlined" style="font-size:16px;">swap_horiz</span> Trade') +
    '</button>' +
  '</div>';
}

function openDestinationModal(player, fromTeamId) {
  var modal = document.getElementById('modal-dest');
  var body = document.getElementById('modal-dest-body');
  var title = document.getElementById('modal-dest-title');

  title.textContent = '将 ' + player.name + ' 送至';

  var html = '<div class="dest-player-info">' +
    '<span style="color:var(--on-surface-variant);">来自 </span>' +
    '<b>' + getShortName(TEAMS_DATA[fromTeamId], 6) + '</b>' +
    '<span style="color:var(--on-surface-variant);"> · ' + fmt(player.salary) + '</span>' +
    (player.restricted ? ' <span style="color:var(--tertiary);font-size:11px;"><span class="material-symbols-outlined" style="font-size:12px;vertical-align:middle;">lock</span> ' + restrictionLabel(player.restrictionType) + '</span>' : '') +
    '</div>';

  html += '<div class="modal-section-title">选择目标球队</div>';

  state.teams.forEach(function(t) {
    if (t.id === fromTeamId) return;
    html += '<div class="modal-team-row" data-team-id="' + t.id + '" role="button" tabindex="0">' +
      '<div class="modal-team-logo" style="background:' + t.color + ';">' + getShortName(t, 2) + '</div>' +
      '<span class="modal-team-name">' + t.name + '</span>' +
      '<span class="material-symbols-outlined" style="margin-left:auto;font-size:16px;color:var(--outline-variant);">east</span>' +
      '</div>';
  });

  body.innerHTML = html;

  body.querySelectorAll('.modal-team-row').forEach(function(row) {
    row.addEventListener('click', function() {
      var toTeamId = this.getAttribute('data-team-id');
      addMove(player, fromTeamId, toTeamId);
      hideModal('modal-dest');
    });
  });

  showModal('modal-dest');
}
