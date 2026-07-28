---
title: "从零搭建博客：Astro 7 + Cloudflare Pages 全流程"
date: 2026-03-25
project: 白屋
type: 教程
tech: [工具链]
difficulty: 基础
tags: [Astro, Cloudflare Pages]
description: "手把手用 Astro 7 + Cloudflare Pages 搭建一个免费、快速、双主题的个人技术博客"
---

## 为什么我要搭建个人博客？

作为一名独立游戏开发者，我一直想拥有一个属于自己的技术博客。

不是寄居在 CSDN 或掘金上的一亩三分地——那些平台虽然方便，但你的内容被算法控制，页面充斥着广告，而且你永远不知道哪天平台会改变规则。

我想要的是一个**完全属于自己的空间**：
- 记录游戏开发日志
- 沉淀技术学习笔记
- 展示个人作品和项目
- 建立自己的个人品牌

这个博客就是你现在看到的「牧屋」。

## 技术选型：为什么是这套方案？

市面上搭建博客的方案很多，我最终选择了 **Astro 7 + Cloudflare Pages** 的组合。

### Astro：现代前端框架

Astro 是一个专为内容型网站设计的框架。和传统 SPA 框架（React、Vue）不同，Astro 默认输出零 JavaScript 的静态 HTML——这对博客来说完美。

**为什么选 Astro 而不是 Hugo？**

我最初用的确实是 Hugo。Hugo 构建极快、生态成熟，但有两个痛点让我决定迁移：

1. **模板语法受限**。Go Template 的灵活性远不如 JSX/TSX，想做高度自定义的布局和交互时处处碰壁。
2. **前端生态隔离**。Hugo 无法直接用 npm 生态的 CSS 框架、动画库、图标方案，每次集成都是一场手工适配。

Astro 解决了这两个问题：组件用类似 JSX 的 `.astro` 语法，可以直接 import npm 包；同时默认 zero-JS 输出，性能不输 Hugo。

**Astro 7 的 Content Layer API** 是另一个亮点。用 `getCollection()` 加载 Markdown 文章，自动生成 TypeScript 类型，写模板时有 IDE 智能提示——这在 Hugo 里完全做不到。

### Cloudflare Pages：免费 + 全球 CDN

Cloudflare Pages 对标 GitHub Pages，但有几个明显优势：

| 对比维度 | Cloudflare Pages | GitHub Pages |
|---------|-----------------|-------------|
| 构建速度 | 快（全球 build 节点） | 一般 |
| 全球 CDN | Cloudflare 边缘网络 | Fastly CDN |
| 自定义域名 | 免费 + 自动 HTTPS | 免费 + 自动 HTTPS |
| 并发构建 | 1 个 | 1 个 |
| 预览部署 | 每个 PR 自动生成预览链接 | 无 |
| 带宽限制 | 无限制 | 100GB/月 |

对我这种个人博客来说，Cloudflare Pages 的「push 即部署」体验非常丝滑——写完文章 `git push`，一分钟后线上就更新了。

### 自定义设计：牧屋的视觉语言

我没有用任何现成主题。从零手写了整套 CSS 设计系统：

- **双主题**：日间草原暖色调 / 夜间木屋烛光色调，按时间自动切换
- **视差背景**：两张 AI 生成的场景图，鼠标移动时有微妙的景深感
- **环境音**：Web Audio API 生成——白天草原微风 + 鸟鸣，夜晚木屋暖炉嗡鸣 + 壁炉噼啪
- **字体**：Cormorant Garamond（英文展示）+ Noto Serif SC（中文正文）+ Long Cang（手写点缀）+ JetBrains Mono（代码块）
- **代码高亮**：Shiki 双主题配色，日间暖纸底、夜间深木色底，注释清晰可读
- **滚动揭示**：IntersectionObserver 实现卡片淡入动画
- **毛玻璃**：backdrop-filter blur 用在卡片、导航栏、代码块上

组件架构：

```
src/
├── components/     # Header, Hero, Footer, PostCard, TagCloud...
├── layouts/        # BaseLayout（FOUC 防护 + 场景层）, MainLayout（全局 JS）
├── pages/          # index.astro, projects, about, posts/[...slug].astro
├── styles/         # tokens.css（变量）, global.css, scene.css, cards.css...
├── content/        # Markdown 文章（posts/blog/, posts/ue5/, ...）
└── site.config.ts  # 全站配置唯一入口
```

## 部署流程

整个部署只用了三步：

1. **创建 Cloudflare Pages 项目** — 在 Cloudflare 控制台关联 GitHub 仓库，设置构建命令 `npm run build`，输出目录 `dist`
2. **配置域名** — 免费分配 `*.pages.dev` 子域名，自定义域名需加一条 CNAME 记录
3. **推送代码** — `git push` 到 master 分支，Cloudflare 自动构建部署

每次推送后 30 秒左右就能在线上看到更新。不需要 SSH、不需要服务器、不需要运维。

## 最后

这个博客会持续记录我的游戏开发旅程、技术学习笔记、读书思考。如果你也想搭建类似的博客，可以参考这个项目——所有代码都是开源的。

牧屋，一个牧羊人在数字草原上的小屋。欢迎来访。
