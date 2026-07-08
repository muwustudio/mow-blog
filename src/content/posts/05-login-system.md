---
title: "登录系统 —— 单例模式、回调委托与消息分发"
date: 2026-05-11
project: MMORPG
type: 踩坑记录
tech: [C#, 网络]
difficulty: 进阶
tags:
  - MMORPG
  - 登录
  - 网络
description: "MMORPG学习项目 — 单例模式、UnityAction回调委托、MessageDistributer消息分发、TCP断线处理"
---

## 单例模式（Singleton）

**单例**保证一个类在整个游戏生命周期中**只有一个实例**，并提供一个全局访问点 `Instance`。

```csharp
public class Singleton<T> where T : new()
{
    private static T _instance;
    public static T Instance
    {
        get
        {
            if (_instance == null)
                _instance = new T();
            return _instance;
        }
    }
}

// 任何地方调用
UserService.Instance.SayHi();
```

> **注意**：单例方便但不要滥用，它本质是全局变量，过多会让依赖关系混乱。

## UnityAction 回调委托

`UnityAction<T1, T2>` 是 Unity 封装的委托类型。它的作用是：**"我先告诉你将来要执行什么函数，等条件满足时你来调我"**。

## 回调注册与覆盖问题

这里用的是 **`=`（赋值）** 而不是 **`+=`（追加）**。意味着：如果两个界面同时存在，**后执行 Start 的那个会覆盖前一个的回调**。

但本项目设计上同一时刻**只显示一个面板**，所以不会冲突。

## UI 面板互切（SetActive）

`GameObject.SetActive(bool)` 控制一个游戏物体的**激活/隐藏**。

## 待发消息队列（pendingMessage 模式）

当用户点击登录/注册时，TCP 连接**可能还没建立**。此时不能直接发包，而是：

1. 把要发的消息存到 `pendingMessage`
2. 发起连接 `ConnectToServer()`
3. 连接成功后，检查 `pendingMessage`，有就发出去并清空

这是一种**"先存后发"**的异步处理模式。

## 消息订阅与分发（MessageDistributer）

`MessageDistributer` 是一个**消息路由器**。网络层收到服务器的数据包后，根据包类型自动分发到对应的处理函数。

```
服务器发来 UserLoginResponse 
    → NetClient 收到原始字节 
    → 反序列化成对象 
    → MessageDistributer 根据类型查表 
    → 调用 UserService.OnUserLogin(response)
```

## 整体调用流程

### 登录流程

```
① UILogin.Start() → 注册回调
② 用户输入账号密码，点击登录 → 校验输入
③ UserService.SendLogin() → 已连接直接发，未连接先存 pendingMessage
④ 连接成功 → 发送 pendingMessage
⑤ 服务器返回 UserLoginResponse → MessageDistributer 分发
⑥ UILogin.OnLogin() 被调用 → 成功跳转场景，失败弹窗提示
```

## 设计模式速查

本项目用到的设计模式：

```
单例模式 (Singleton)
├── UserService.Instance
├── NetClient.Instance
├── SceneManager.Instance
└── MessageDistributer.Instance

观察者模式 (Observer)
├── UnityAction<Result, string> OnLogin / OnRegister
└── MessageDistributer 的 Subscribe / Unsubscribe

延迟发送模式 (Pending Queue)
└── pendingMessage：未连接时暂存，连通后补发
```

> **一句话总结**：UI 层只管"校验输入 + 显示结果"，网络层只管"连接 + 收发 + 分发"，两者通过**回调委托**桥接，职责清晰，互不侵入。
