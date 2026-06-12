// 海报生成（Canvas）
const Poster = (() => {
  function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
  }

  function generate(callback) {
    const state = Game.getState();
    const config = state.config;
    if (!config) return;

    const canvas = document.getElementById('posterCanvas');
    const W = CONFIG.POSTER_W, H = CONFIG.POSTER_H, SCALE = CONFIG.POSTER_SCALE;
    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext('2d');
    ctx.scale(SCALE, SCALE);

    // 背景
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(1, '#16213e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 标题
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 26px -apple-system,sans-serif';
    ctx.fillText(CONFIG.ACTIVITY_NAME, W / 2, 45);
    ctx.font = '13px -apple-system,sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(new Date().toLocaleDateString('zh-CN'), W / 2, 70);

    // 分数
    const score = Game.getScore();
    ctx.font = 'bold 16px -apple-system,sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(`正确: ${score.correct}/9  稀有度: ${score.totalRarity}`, W / 2, 98);

    // Grid
    const rows = config.rows || [];
    const cols = config.columns || [];
    const gx = 30, gy = 118, gw = W - 60;
    const cellW = gw / 4, cellH = cellW;

    function drawCellBg(x, y, w, h, color) {
      ctx.fillStyle = color || 'rgba(255,255,255,0.06)';
      drawRoundRect(ctx, x, y, w, h, 6);
      ctx.fill();
    }

    // 左上角
    drawCellBg(gx, gy, cellW, cellH, 'rgba(255,255,255,0.1)');

    // 列表头
    for (let c = 0; c < 3; c++) {
      const cx = gx + (c + 1) * cellW, cy = gy;
      drawCellBg(cx, cy, cellW, cellH, 'rgba(255,255,255,0.1)');
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.fillText(cols[c] ? (cols[c].shortLabel || cols[c].label) : '', cx + cellW / 2, cy + cellH / 2);
    }

    // 行标签
    for (let r = 0; r < 3; r++) {
      const rx = gx, ry = gy + (r + 1) * cellH;
      drawCellBg(rx, ry, cellW, cellH, 'rgba(255,255,255,0.1)');
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 11px -apple-system,sans-serif';
      ctx.fillText(rows[r] ? (rows[r].shortLabel || rows[r].label) : '', rx + cellW / 2, ry + cellH / 2);
    }

    // 格子
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const cx = gx + (c + 1) * cellW, cy = gy + (r + 1) * cellH;
        drawCellBg(cx, cy, cellW, cellH);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(cx, cy, cellW, cellH);

        const cell = state.cells[r][c];
        if (cell && cell.status === 'filled' && cell.player) {
          const name = cell.player.fullName || '';
          ctx.fillStyle = 'rgba(0,0,0,0.55)';
          ctx.fillRect(cx, cy + cellH - 24, cellW, 24);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = 'bold 11px -apple-system,"PingFang SC",sans-serif';
          ctx.fillText(name, cx + cellW / 2, cy + cellH - 12);
          if (cell.rarity !== null && cell.rarity !== undefined) {
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.font = '9px -apple-system,sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(cell.rarity + '%', cx + 4, cy + 4);
          }
        }
      }
    }

    // 水印
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.textAlign = 'center';
    ctx.font = '10px -apple-system,sans-serif';
    ctx.fillText(CONFIG.ACTIVITY_NAME, W / 2, H - 16);

    // 输出
    try {
      document.getElementById('posterPreviewImg').src = canvas.toDataURL('image/png');
    } catch (e) { /* ignore */ }
    if (callback) callback();
  }

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bytes = atob(parts[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ab], { type: mime });
  }

  async function share(btn) {
    const canvas = document.getElementById('posterCanvas');
    if (!canvas.width) {
      await new Promise(resolve => generate(resolve));
    }
    const dataURL = canvas.toDataURL('image/png');
    const blob = dataURLToBlob(dataURL);
    if (blob.size === 0) return;

    const filename = `immaculate-grid-${Date.now()}.png`;
    const origText = btn ? btn.innerHTML : '📤 一键发帖';
    if (btn) { btn.innerHTML = '⏳ 上传中...'; btn.disabled = true; }

    try {
      // OSS 上传逻辑（同原版）
      const imageUrl = await uploadToOSS(blob, filename);
      const initialValue = {
        syncPost: true,
        appJsonV3: {
          activeTab: 'thread',
          data: { title: '', imageList: imageUrl ? [imageUrl] : [], content: '' },
        },
      };
      const postUrl = `huputiyu://bbs/postImg?tagName=${encodeURIComponent(CONFIG.ACTIVITY_NAME)}&tagId=${CONFIG.TAG_ID}&topicName=${encodeURIComponent(CONFIG.TOPIC_NAME)}&topicId=${CONFIG.TOPIC_ID}&initialValue=${encodeURIComponent(JSON.stringify(initialValue))}`;
      safeNavigate(postUrl, '_self', 'share_poster');
      closeResults();
    } catch (e) {
      console.warn('Upload failed:', e);
      const fallbackUrl = `huputiyu://bbs/postImg?tagName=${encodeURIComponent(CONFIG.ACTIVITY_NAME)}&tagId=${CONFIG.TAG_ID}&topicName=${encodeURIComponent(CONFIG.TOPIC_NAME)}&topicId=${CONFIG.TOPIC_ID}&initialValue=${encodeURIComponent(JSON.stringify({ syncPost: true, appJsonV3: { activeTab: 'thread', data: { title: '', imageList: [], content: '' } } }))}`;
      safeNavigate(fallbackUrl, '_self', 'share_poster_fallback');
      closeResults();
    } finally {
      if (btn) { btn.innerHTML = origText; btn.disabled = false; }
    }
  }

  function safeNavigate(url, target, eventName) {
    if (!url) return;
    if (window.ColorboxAI && typeof window.ColorboxAI.track === 'function') {
      try { window.ColorboxAI.track({ event: eventName || 'navigate', url, target: target || '_self' }); } catch (e) { }
    }
    if (window.ColorboxAI && typeof window.ColorboxAI.navigateTo === 'function') {
      try { window.ColorboxAI.navigateTo(url, target || '_self'); return; } catch (e) { }
    }
    if (window.ColorboxAI && typeof window.ColorboxAI.openUrl === 'function') {
      try { window.ColorboxAI.openUrl(url); return; } catch (e) { }
    }
  }

  function uploadToOSS(file, filename) {
    return new Promise((resolve, reject) => {
      if (window.ColorboxAI && window.ColorboxAI.oss && typeof window.ColorboxAI.oss.uploadFile === 'function') {
        window.ColorboxAI.oss.uploadFile({ file, filename }).then(res => resolve(res.downloadUrl || '')).catch(reject);
        return;
      }
      if (window.parent && window.parent !== window) {
        const callbackId = `_cb_up_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const timer = setTimeout(() => { cleanup(); reject(new Error('Upload timeout')); }, 30000);
        const handler = (e) => {
          const d = e.data;
          if (d && d.protocol === 'colorbox-ai-bridge' && d.type === 'oss.upload.callback' && d.payload && d.payload.callbackId === callbackId) {
            clearTimeout(timer);
            cleanup();
            d.payload.error ? reject(new Error(d.payload.error)) : resolve(d.payload.downloadUrl || '');
          }
        };
        const cleanup = () => window.removeEventListener('message', handler);
        window.addEventListener('message', handler);
        try {
          window.parent.postMessage({
            protocol: 'colorbox-ai-bridge', version: 1, direction: 'frame-to-host',
            type: 'oss.upload',
            payload: { file, filename, callbackId },
          }, '*');
        } catch (e) { /* ignore */ }
        return;
      }
      reject(new Error('No upload capability'));
    });
  }

  return { generate, share, safeNavigate };
})();
