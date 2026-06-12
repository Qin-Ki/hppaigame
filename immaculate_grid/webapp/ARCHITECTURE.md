🏀 Immaculate Grid - 前后端架构
===============================

目录结构
--------
webapp/
├── package.json          # 后端依赖
├── data/                 # JSON 数据文件（从原 HTML 提取）
│   ├── TD.json           # 球队数据
│   ├── TL.json           # 球队 Logo 链接
│   ├── SL.json           # 球员搜索列表
│   ├── PD.json           # 球员完整数据
│   ├── CN.json           # 中文名映射
│   ├── RR.json           # 稀有度数据
│   ├── SB.json           # 赛季统计分类位掩码
│   └── PB.json           # 球员生涯分类位掩码
├── server/
│   └── index.js          # Express API 服务器
├── client/
│   ├── index.html        # 前端入口
│   ├── css/
│   │   └── style.css     # 样式
│   └── js/
│       ├── config.js     # 常量配置
│       ├── api.js        # API 客户端
│       ├── game.js       # 游戏状态管理
│       ├── ui.js         # UI 渲染
│       ├── poster.js     # 海报生成
│       └── app.js        # 入口、事件绑定
└── README.md             # 部署说明


数据流
------
┌─────────┐    fetch('/api/grid/today')    ┌───────────┐
│         │ ─────────────────────────────→ │           │
│         │    fetch('/api/grid/random')    │  Express  │
│         │ ─────────────────────────────→ │  Server   │
│  Client │    fetch('/api/players/search') │  (Node)   │
│  (SPA)  │ ─────────────────────────────→ │           │
│         │    POST /api/validate           │  ┌─────┐  │
│         │ ─────────────────────────────→ │  │JSON │  │
│         │    POST /api/submit            │  │文件  │  │
│         │ ─────────────────────────────→ │  └─────┘  │
└─────────┘                                └───────────┘


API 端点
--------
GET  /api/health              → { status, players }
GET  /api/teams               → 球队数组
GET  /api/grid/today          → 今日 Grid
GET  /api/grid/random         → 随机 Grid
GET  /api/players/search?q=X  → 搜索球员
POST /api/validate            → 验证答案
POST /api/submit              → 提交答案


部署方案
--------

方案 A：Railway.app（推荐，最简单）
1. 将 webapp/ 推送至 GitHub
2. 在 Railway.app 新建项目 → Deploy from GitHub
3. 设置 Start Command: node server/index.js
4. 自动分配域名 https://xxx.up.railway.app

方案 B：Vercel（免费，Serverless）
1. 安装 Vercel CLI: npm i -g vercel
2. 在 webapp/ 目录运行: vercel
3. 需将 server/index.js 转为 Serverless Function
   （见下方 Vercel 配置说明）

方案 C：VPS（DigitalOcean / 阿里云等）
1. 在服务器上安装 Node.js 18+
2. scp webapp/ 到服务器
3. cd webapp && npm install --production
4. 使用 PM2 守护进程:
   npm install -g pm2
   pm2 start server/index.js --name immaculate-grid
5. 配置 Nginx 反向代理 + 域名

方案 D：Docker
1. docker build -t immaculate-grid .
2. docker run -p 3000:3000 immaculate-grid
3. 部署到任意容器平台


Vercel Serverless 配置
----------------------
在 webapp/ 根目录创建 vercel.json:

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

然后将 /api/health 等路由导出为 serverless handler：

module.exports = (req, res) => {
  // 现有 app 逻辑，但 export 代替 app.listen
  if (req.url === '/api/health') {
    return res.json({ status: 'ok' });
  }
  // ...
};


本地运行
--------
cd webapp
npm install
npm start
# 访问 http://localhost:3000


生产环境建议
-----------
1. 使用环境变量 PORT（默认 3000）
2. 提交数据存数据库（SQLite/PostgreSQL）而不是 JSON 文件
3. 添加 Rate limiting 防止滥用
4. 可选：添加用户系统保存历史记录
5. 静态资源 CDN 加速（字体、头像）
