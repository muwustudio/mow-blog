# 牧屋博客 (mow-blog)

> Astro 7 静态博客 · Cloudflare Pages · 内容集合 + 四维分类

## 架构

```
mow-blog/
  src/
    content/
      posts/                    ← 内容集合（glob loader 扫描所有 .md）
        blog/                   ← 博客本身相关
        mmorpg/                 ← Unity MMORPG 项目
        ue5/                    ← UE5 学习路径
    pages/
      index.astro               ← 首页：Hero + TagCloud + PostList
      posts/[...slug].astro     ← 文章详情页（动态路由，post.id 匹配）
    components/
      BaseLayout.astro          ← HTML 骨架（全局样式、meta）
      MainLayout.astro          ← Header + slot + Footer
      Hero.astro                ← 首页标题区
      TagCloud.astro            ← 标签云（只显示 ≥2 篇文章的标签）
      PostList.astro            ← 文章列表
      PostCard.astro            ← 单篇文章卡片
      SquigglyDivider.astro     ← 波浪分割线
      Header.astro / Footer.astro
    layouts/
      MainLayout.astro          ← 页面通用布局
  public/
    assets/posts/               ← 文章媒体文件
  BLOG-CONVENTIONS.md           ← 内容治理约定（目录、命名、frontmatter、媒体）
```

## 技术栈

- **Astro 7.0.7** · Content Layer API + glob loader
- **Cloudflare Pages** · `mow-blog.pages.dev` · Git 集成自动部署
- **Node ≥22.12.0** · pnpm/npm
- **纯静态输出** · `output: 'static'`

## 内容系统

### 四维分类 (content.config.ts)

所有文章通过 4 个字段分类，标签自动推导：

| 维度 | 字段 | 用途 |
|------|------|------|
| 项目 | `project` | 文章属于哪个项目（四游戏-1~4, MMORPG, 白屋, 其他） |
| 类型 | `type` | 知识点/踩坑记录/设计决策/复盘总结/教程 |
| 技术 | `tech[]` | C++/C#/UE5/Unity/蓝图/网络/图形学/架构… |
| 难度 | `difficulty` | 基础/进阶/疑难 |

### Frontmatter 模板

```yaml
---
title: "文章标题"
date: YYYY-MM-DD
project: 四游戏-1
type: 知识点
tech: [C++, UE5]
difficulty: 基础
tags: []              # 永远留空 — schema 自动推导
description: "一句话描述"
image: ""             # 可选封面图路径
draft: false
---
```

### 标签系统

- `tags: []` 留空 → 系统从 project/type/tech/difficulty 自动生成
- 首页标签云过滤出现次数 ≥2 的标签
- 需要新枚举值 → 先在 `content.config.ts` 注册

## 常用操作

### 开发

```bash
cd D:/Castiel/Estate/Projects/mow-blog
npm run dev        # 启动开发服务器
npm run build      # 构建到 dist/
npm run preview    # 预览构建结果
```

### 部署

Cloudflare Pages Git 集成 — push 到 master 自动部署。无需手动操作。

手动部署（仅在自动部署失效时）：
```bash
npm run build
npx wrangler pages deploy dist --project-name=mow-blog --branch=main
```

### 新增文章

1. 在对应项目目录下创建 `{项目}-{描述}.md`
2. 填写 frontmatter（tags 留空）
3. 确认 project/type/tech/difficulty 值在 content.config.ts enum 中存在
4. build 通过后 push

详细命名和目录约定 → `BLOG-CONVENTIONS.md`

### 新增项目目录

1. 在 `src/content/posts/` 下创建目录
2. 在 `content.config.ts` 的 `project` enum 中注册
3. 更新 `BLOG-CONVENTIONS.md`

### 图片/媒体

放在 `public/assets/posts/{项目}/{post-slug}/`，文章中引用 `/assets/posts/{项目}/{post-slug}/file.webp`。

详细规则 → `BLOG-CONVENTIONS.md`

## AI/Agent 处理规则

当 AI 工具（先知、Claude Code 等）操作此博客时：

1. `tags` 永远 `[]` — 不要填
2. 文件名全小写连字符 — `{项目}-{描述}.md`
3. 新文章放在正确的项目子目录
4. enum 值必须在 content.config.ts 中存在
5. build 不过不部署
6. 详见 `BLOG-CONVENTIONS.md`

## 已知欠账

- 文章封面图 — `image` 字段已有，UI 未渲染
- Diorama 多层视差 — 暂停（闪烁问题）
- 音效按钮优化
- Mascot (border collie)
