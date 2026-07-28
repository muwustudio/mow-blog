# 牧屋博客 — 内容治理约定

> 先知和白屋 Agent 处理博客内容时遵守此文件。Castiel 写文章时不需看这个。

---

## 目录结构

```
src/content/posts/
  blog/           ← 博客本身相关（介绍、搭建、设计决策）
  mmorpg/         ← Unity MMORPG 项目
  ue5/            ← UE5 学习路径（四个游戏项目）
  {新项目}/       ← 按此模式扩展
```

建新项目目录时：先知提案 → Castiel 确认。

---

## 文件命名

```
{项目}-{描述}.md

正确：
  blog-intro.md
  mmorpg-csharp-review.md
  ue5-game1-obstacle-assault.md

错误：
  01-muwu-intro.md       ← 不要数字前缀（排序靠 date）
  UE5-Game1.md           ← 不要大写（URL 难看）
  obstacle_assault.md    ← 不要下划线（用连字符）
```

规则：
- 全小写，连字符分隔
- `{项目}` 前缀 = 目录名
- `{描述}` = 简短英文 slug，3-5 词
- 排序和顺序由 frontmatter `date` 决定，不在文件名里编号

---

## Frontmatter

```yaml
---
title: "文章标题"
date: YYYY-MM-DD
project: 四游戏-1 | MMORPG | 白屋 | 其他
type: 知识点 | 踩坑记录 | 设计决策 | 复盘总结 | 教程
tech: [C++, UE5]     ← 来自 content.config.ts 的 enum
difficulty: 基础 | 进阶 | 疑难
tags: []              ← 留空，由 schema 自动推导
description: "一句话描述"
---
```

规则：
- `tags` 永远留空 `[]`。标签从 project/type/tech/difficulty 自动推导。
- `date` 必须填。这是排序和归档的唯一依据。
- 新 project/type/tech 值需要先在 `content.config.ts` 的 enum 中注册。

---

## 媒体资源

```
public/assets/posts/
  {项目}/{post-slug}/
    screenshot.webp
    diagram.png
    demo.gif
```

规则：
- 按 post slug 建子目录。不需要媒体时不建。
- 图片格式：截图用 WebP，图表用 PNG，动作用 GIF/WebP
- 图片宽度 ≤1200px，压缩后 ≤200KB
- Markdown 引用：`/assets/posts/ue5/game1/screenshot.webp`
- 大文件（安装包、zip、视频）不入 git → 放 Cloudflare R2 或网盘，文章里外链

### 图片 Alt 文本

每张图片必须有 `alt` 描述：

```markdown
![UE5 Details 面板中 EditAnywhere 的效果](/assets/posts/ue5/game1/editanywhere.png)
```

---

## 部署

```
cd D:/Castiel/Estate/Projects/mow-blog
npm run build
npx wrangler pages deploy dist --project-name=mow-blog --branch=main
```

或运行 `deploy.cmd`。

部署前必须 build 通过。build 失败 → 不部署，先修。

---

## 先知/AI 处理笔记时的规则

1. **尊重目录约定**：新文章放在正确的项目目录下
2. **命名遵守此文件**：`{项目}-{描述}.md`
3. **tags 留空**：永远 `tags: []`
4. **引用已有枚举**：project/type/tech/difficulty 必须使用 content.config.ts 中已定义的 enum 值
5. **新枚举值需注册**：如果需要新 project 或 tech 值，先在 content.config.ts 中加了再用
6. **媒体放对位置**：图片放在 `public/assets/posts/{项目}/{post-slug}/`

---

## 修订记录

| 日期 | 变更 |
|------|------|
| 2026-07-28 | 初稿：目录结构、命名、frontmatter、媒体、部署约定 |
