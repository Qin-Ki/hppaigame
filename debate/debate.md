# 埋点清单 — 页面ID: PHBS7947

## BMC098 — 活动关键点击

| 序号 | 点位编码 | 触发行为 | 区块 | 标签(label) | 说明 |
|:---:|:-------:|:--------:|:----:|:----------:|:----:|
| 1 | TC1 | click | BMC098 | — | 正方发帖（hot-left 跳转） |
| 2 | TC2 | click | BMC098 | — | 反方发帖（hot-right 跳转） |
| 3 | TC3 | click | BMC098 | — | 话题跳转（hot-bottom） |
| 4 | TC4 | click | BMC098 | 聊聊我的看法 | 发帖引导按钮 |
| 5 | TC5 | click | BMC098 | 加载更多讨论 | 加载更多 |
| 6 | TC6 | click | BMC098 | 正方 / 反方 | 弹窗选择阵营 |
| 7 | TC7 | click | BMC098 | 取消 | 关闭阵营选择弹窗（按钮/遮罩） |
| 8 | TC8 | click | BMC098 | 全部 | 筛选标签-全部 |
| 9 | TC9 | click | BMC098 | 正方 | 筛选标签-正方 |
| 10 | TC10 | click | BMC098 | 反方 | 筛选标签-反方 |
| 11 | TC11 | click | BMC098 | 最新 | 筛选标签-最新 |

## BMC099 — 内容信息流

| 触发行为 | 区块 | 点位编码 | 标签(label) | 说明 |
|:-------:|:----:|:-------:|:----------:|:----:|
| click | BMC099 | T1 ~ Tn | threadId/pId | 帖子卡片点击，从上到下自增 |
| exposure | BMC099 | T1 ~ Tn | threadId/pId | 帖子卡片曝光（IntersectionObserver, threshold≥0.5, 单次） |
