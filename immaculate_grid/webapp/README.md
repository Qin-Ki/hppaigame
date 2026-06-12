# 🏀 Immaculate Grid - 完整前后端版本

## 本地运行

```bash
cd webapp
npm install
npm start
# 浏览器打开 http://localhost:3000
```

## 目录结构

```
webapp/
├── package.json          # Node 依赖
├── data/                 # JSON 数据（从 index.html 提取）
│   ├── TD.json           # 30 支球队
│   ├── TL.json           # 球队 Logo
│   ├── SL.json           # 5135 位球员索引
│   ├── PD.json           # 球员完整数据
│   ├── CN.json           # 中文名
│   ├── RR.json           # 配对稀有度
│   ├── SB.json           # 赛季统计位掩码
│   └── PB.json           # 生涯成就位掩码
├── server/
│   └── index.js          # Express API + 游戏逻辑
├── client/
│   ├── index.html        # 前端页面
│   ├── css/style.css     # 样式
│   └── js/               # 模块化 JS
│       ├── config.js     # 常量
│       ├── api.js        # API 客户端
│       ├── game.js       # 游戏状态
│       ├── ui.js         # UI 渲染
│       ├── poster.js     # 海报生成
│       └── app.js        # 入口
└── README.md
```

## 部署方案

### 🚄 方案 A：Railway.app（推荐，最省心）

1. 把 `webapp/` 推送到 GitHub 仓库
2. 打开 [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. 选你的仓库，Railway 自动检测 Node.js
4. 设置 Start Command: `node server/index.js`
5. 部署完毕自动分配 `https://xxx.up.railway.app` 域名
6. 可在 Settings 绑定自定义域名

**费用**: 每月 $5 起（免费额度 $5，基本够用）

### ▲ 方案 B：Vercel（免费）

1. 安装 CLI: `npm install -g vercel`
2. 在 `webapp/` 目录创建 `vercel.json`：

```json
{
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" },
    { "src": "client/**", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.js" },
    { "src": "/(.*)", "dest": "client/$1" }
  ]
}
```

3. 在 `server/index.js` 末尾添加导出：

```javascript
module.exports = app;
// 删除 app.listen 或保留但只在非 Vercel 环境运行
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Running on :${PORT}`));
}
```

4. 运行 `vercel` 部署

**费用**: 免费版每月 100h 运行时间 + 100GB 带宽

### ☁️ 方案 C：VPS（阿里云 / 腾讯云 / DigitalOcean）

```bash
# 1. 服务器安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 上传项目
scp -r webapp/ user@your-server:~/immaculate-grid

# 3. 安装依赖
cd ~/immaculate-grid && npm install --production

# 4. PM2 守护进程
npm install -g pm2
pm2 start server/index.js --name immaculate-grid
pm2 save
pm2 startup

# 5. Nginx 反向代理（可选）
# /etc/nginx/sites-available/immaculate-grid
server {
    listen 80;
    server_name your-domain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 🐳 方案 D：Docker

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server/index.js"]
```

```bash
docker build -t immaculate-grid .
docker run -p 3000:3000 immaculate-grid
```

## API 文档

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/teams` | GET | 所有球队 |
| `/api/grid/today` | GET | 今日 Grid |
| `/api/grid/random` | GET | 随机 Grid |
| `/api/players/search?q=X&limit=10` | GET | 搜索球员 |
| `/api/validate` | POST | 验证答案 `{playerId, rowCategory, colCategory}` |
| `/api/submit` | POST | 提交答案 `{gridId, row, col, playerId}` |

## 与旧版（public/index.html）的关系

- `public/index.html` 是**单文件全功能版**，所有数据 + 逻辑内嵌
- `webapp/` 是**前后端分离版**，数据放服务器，前端通过 API 调用
- 两版功能一致，数据同源（CN 翻译从 `webapp/data/CN.json` 同步）
- 部署时推荐用 `webapp/` 版本，方便维护和扩展
