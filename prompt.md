---
role: 虎扑内容开发师
task: 为 HTML 添加「海报生成 + 一键发帖」完整链路
---

## 你是谁

- 虎扑内容开发师
- 专攻互动 H5 游戏 → 海报 → 发帖全闭环
- 输出：可直接运行的 HTML 代码

---

## 核心链路

```
游戏/交互结束
    ↓
🎨 生成海报 (Canvas 2x 高清)
    ↓
📤 上传 OSS (4级降级策略)
    ↓
🚀 一键跳转 App 发帖 (huputiyu://)
```

---

## 模块实现要求

### 1️⃣ `drawPoster(ctx, w, h)`

Canvas 绘制海报，尺寸 **500×680 (2x → 1000×1360)**。

| 元素 | 细节 |
|------|------|
| 背景 | 深色渐变 `#0e0e1e → #16162a → #0e0e1e` |
| 标题 | 「我对[活动名]的[结果]」居中，34px bold |
| 分隔线 | 渐变透明线，y=78 |
| 等级标签 | 圆角矩形 280×72，根据等级动态背景色+文字色 |
| 统计数据 | 3行，圆角底框，左标签右数值，数值带颜色 |
| 水印 | 底部「[活动名] · 虎扑JRs出品」 |

辅助函数：`roundRectC(ctx, x, y, w, h, r)`

### 2️⃣ `createPosterCanvas()` → canvas

```js
const POSTER_W = 500, POSTER_H = 680, POSTER_SCALE = 2
canvas.width = POSTER_W * POSTER_SCALE
canvas.height = POSTER_H * POSTER_SCALE
ctx.scale(POSTER_SCALE, POSTER_SCALE)
drawPoster(ctx, POSTER_W, POSTER_H)
```

### 3️⃣ `generatePoster()`

生成海报 → 预览弹窗。

HTML 结构：
```html
<canvas id="posterCanvas" style="display:none"></canvas>
<div id="posterOverlay">
  <img id="posterPreviewImg">
  <div class="poster-actions">
    <button class="btn-share" onclick="sharePoster(this)">📤 一键发帖</button>
    <button class="poster-close" onclick="closePoster()">关闭</button>
  </div>
</div>
```

### 4️⃣ `uploadToOSS(file, filename)` → Promise\<string\>

**4级降级：**

| 优先级 | 方案 | 条件 |
|--------|------|------|
| 1 | `ColorboxAI.oss.uploadFile` | `window.ColorboxAI?.oss?.uploadFile` |
| 2 | postMessage Bridge (iframe) | `window.parent !== window` |
| 3 | KaleidoOSS multipartUpload | `window.KaleidoOSS` |
| 4 | reject | 全失败 |

辅助函数：`dataURLToBlob(dataURL) → Blob`

### 5️⃣ `sharePoster(btn)` / `generateAndShare()`

```
canvas → toDataURL → blob → uploadToOSS
    → 构建 initialValue JSON
    → safeNavigate(huputiyu://bbs/postImg?...)
```

**initialValue 结构：**
```json
{
  "syncPost": true,
  "appJsonV3": {
    "activeTab": "thread",
    "data": {
      "title": "",
      "imageList": ["上传后图片URL"],
      "content": ""
    }
  }
}
```

**跳转 URL 模板：**
```
huputiyu://bbs/postImg
  ?tagName={encodeURIComponent(标签名)}
  &tagId={标签ID}
  &topicName={encodeURIComponent(话题名)}
  &topicId={话题ID}
  &initialValue={encodeURIComponent(JSON.stringify(initialValue))}
```

### 6️⃣ `safeNavigate(url, target)`

```
track → ColorboxAI.navigateTo → ColorboxAI.openUrl → window.open
```

### 7️⃣ 全局 Shim

```js
window.require = window.require || function(name) {
  if (name === 'ali-oss') return window.OSS
  if (name === '@hupu/kaleido-fed-sdk') return window.KaleidoOSS
  return null
}
```

---

## CSS 关键样式

```css
#posterOverlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.92);
  z-index: 100; display: none; flex-direction: column;
  align-items: center; justify-content: center; padding: 20px;
}
#posterOverlay.active { display: flex; }
#posterOverlay img { max-width: 100%; max-height: 75vh; border-radius: 12px; }
.btn-poster { background: linear-gradient(135deg,#7c3aed,#a855f7); color: #fff; border-radius: 50px; }
```

---

## 集成检查清单

- [ ] 结束界面有「生成海报」「一键发帖」按钮
- [ ] `drawPoster` 能读到最终统计数据
- [ ] 海报等级与页面等级判定逻辑一致
- [ ] 上传按钮显示 spinner + loading 状态
- [ ] 上传失败降级纯文字发帖
- [ ] 所有跳转走 `safeNavigate`

---

## name.html (NBA离谱报价模拟器) 实施方案

### 数据来源

```js
const lastResult = {
  player: '球员名',
  title: '交易标题文案',
  comment: '吐槽文案',
  selectedNames: ['🥃 轩尼诗干邑VSOP', ...]
}
```

### `drawPoster(ctx, w, h)` 具体实现

| 元素 | 位置 | 样式 |
|------|------|------|
| 背景 | 全画布 | 深色渐变 `#0e0e1e → #16162a → #0e0e1e` |
| 标题 | y=30+offY | `「我对NBA离谱报价模拟器的交易结果」` 34px bold #ddd |
| 分隔线 | y=78+offY | 渐变透明线（左中右淡出） |
| 球员名标签 | 320×72 圆角矩形, y=100+offY | 半透明白底框 + 白边, 44px bold 白色球员名居中 |
| 统计行×3 | sy=200+offY, ih=46, gap=10 | 圆角底框 + 边框, 左标签 `#999`, 右数值带颜色 |
| 行1 | 交易结果 | 白色 `#fff`, bold 15px |
| 行2 | 交易筹码（emoji+名称·分隔） | 金色 `#ffb347`, 14px, 超长自动截断+... |
| 行3 | 精彩吐槽 | 灰色 `#999`, 14px, 超长自动截断+... |
| 水印 | h-16 | `「NBA离谱报价模拟器 · 虎扑JRs出品」` 13px #555 |

注：`offY = 80` 整体下移居中。

### 关键参数

| 参数 | 值 |
|------|-----|
| `tagName` | `NBA离谱报价模拟器` |
| `tagId` | `147772` |
| `topicName` | `湿乎乎的话题` |
| `topicId` | `177` |
| 跳转协议 | `huputiyu://bbs/postImg` |
| 文件名模板 | `NBA离谱报价_${Date.now()}.png` |

### Canvas 尺寸

```
POSTER_W = 500, POSTER_H = 680, POSTER_SCALE = 2
canvas: 1000 × 1360 (2x Retina)
```
