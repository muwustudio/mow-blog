---
title: "进度条假加载 —— 协程与Mathf实战"
date: 2026-05-11
project: MMORPG
type: 踩坑记录
tech: [C#, Unity]
difficulty: 进阶
tags:
  - MMORPG
  - UI
  - 进度条
description: "MMORPG学习项目 — 协程IEnumerator、Mathf.RoundToInt、SceneManager.LoadScene"
---

## [Header] 和 [Tooltip]

这两个是 **Inspector 可视化特性**，写在变量上方，不影响任何逻辑。

```csharp
[Header("UI 组件")]          // 在Inspector中显示分类标题
[Tooltip("这是进度条")]       // 鼠标悬停时显示说明文字
public Slider progressSlider;
```

> 🗣️ **口诀**：Header 是分组标题，Tooltip 是鼠标提示，纯粹美化 Inspector 用。

## 协程 IEnumerator

> 普通函数：**一帧内从头跑到尾**，中途无法暂停。
> 协程：**可以在中途暂停，等条件满足后再继续**，不会卡住画面。

```csharp
IEnumerator GoodExample()
{
    for (int i = 0; i <= 100; i++)
    {
        progressSlider.value = i;
        yield return null;             // ← 暂停，等下一帧再继续
    }
}

// 启动协程（必须用StartCoroutine！）
StartCoroutine(GoodExample());
```

**常用 yield 暂停方式：**

```csharp
yield return null;                     // 等待下一帧
yield return new WaitForSeconds(2f);   // 等待2秒
```

> 🗣️ **口诀**：需要"等待"或"逐帧更新"，就用协程，用 `yield return` 控制暂停。

## Mathf.RoundToInt()

`Mathf` 是 Unity 内置数学工具箱。`RoundToInt` = Round（四舍五入）+ ToInt（转成整数）。

```csharp
int result = Mathf.RoundToInt(99.6f);  // result = 100
progressText.text = result + "%";      // 显示：100%
```

> 🗣️ **口诀**：Mathf 是数学工具箱，float 转 int 显示用 RoundToInt，四舍五入更美观。

## SceneManager.LoadScene()

```csharp
using UnityEngine.SceneManagement;
SceneManager.LoadScene("MainGame");
```

> 🗣️ **口诀**：跳转场景找 SceneManager，用之前加 using，场景名要在 Build Settings 里注册。

## 总览速查表

| 知识点 | 一句话口诀 |
| ------ | ---------- |
| `[Header]` / `[Tooltip]` | 纯粹美化 Inspector，不影响逻辑 |
| 协程 `IEnumerator` | 需要等待或逐帧更新，就用协程，`yield return` 控制暂停 |
| `Mathf.RoundToInt()` | float 转 int 显示用 RoundToInt，四舍五入更美观 |
| `SceneManager.LoadScene()` | 跳转场景找 SceneManager，用之前加 using |
