---
title: "MMORPG项目-C#复习手册"
date: 2026-04-02
project: MMORPG
type: 知识点
tech: [C#]
difficulty: 基础
tags: []
description: "适用项目：Unity MMORPG客户端开发"
---

## 🎮 MMORPG项目 · C# 复习手册

> 适用项目：Unity MMORPG客户端开发
> 阅读建议：按章节顺序读，重点看⭐标注的内容

## 第一章：C# 基础快速复习

### 变量与数据类型

```csharp
int     level   = 1;          // 整数：等级、数量
float   hp      = 100.5f;     // 小数：血量、速度（注意要加f）
bool    isAlive = true;       // 布尔：死活、开关状态
string  name    = "战士";     // 字符串：名字、描述
```

### 运算符

```csharp
int a = 10 + 3;   // 13  加
int b = 10 - 3;   // 7   减
int c = 10 * 3;   // 30  乘
int d = 10 / 3;   // 3   除（整数相除，小数部分丢弃！）
int e = 10 % 3;   // 1   取余（常用于判断奇偶、循环）
```

### 条件判断

```csharp
if (playerLevel >= 60)
    Debug.Log("满级玩家");
else if (playerLevel >= 30)
    Debug.Log("中级玩家");
else
    Debug.Log("新手玩家");
```

## 第二章：面向对象核心（OOP）

⭐ **这一章是最重要的，游戏里所有东西都是"对象"**

### 继承

```csharp
public class Warrior : Character
{
    public int Armor { get; private set; }
    
    public override void TakeDamage(int damage)
    {
        int realDamage = Mathf.Max(0, damage - Armor); // 护甲减伤
        base.TakeDamage(realDamage);
    }
}
```

### 接口

接口定义"能做什么"的规范：
- `IDamageable` — 可以受伤
- `IInteractable` — 可以被交互
- `IPickable` — 可以被拾取

## 第三章：Unity常用C#特性

### MonoBehaviour 生命周期

```
Awake → OnEnable → Start → Update(每帧) → OnDisable → OnDestroy
                            FixedUpdate(物理帧)
```

### 协程（Coroutine）

协程 = 可以"暂停等待"的方法，不会阻塞主线程。

```csharp
IEnumerator SkillCooldown(float cooldownTime)
{
    isOnCooldown = true;
    yield return new WaitForSeconds(cooldownTime);
    isOnCooldown = false;
}
```

### 委托与事件

事件 = 一种通知机制，"某事发生了，通知所有关心这件事的人"。

## 设计模式速查

- **单例模式**：全局唯一的管理器（GameManager、AudioManager）
- **状态机**：玩家动作状态、怪物AI
- **对象池**：避免频繁 Instantiate/Destroy
- **观察者模式**：任务系统监听游戏事件
