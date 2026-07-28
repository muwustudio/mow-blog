---
title: "UE5 C++ 从零开始 — 项目一：障碍突袭"
date: 2026-07-13
project: 四游戏-1
type: 知识点
tech: [C++, UE5]
difficulty: 基础
tags: []
description: "UE5 C++ 入门：UPROPERTY、FVector、FRotator、坐标操作、帧率无关旋转与常见踩坑"
---

> 第一个项目——3D 跑酷游戏。平台往返移动和旋转，最后打包成功运行。

## UPROPERTY 宏

`UPROPERTY` 是 UE5 的反射宏。它把 C++ 变量暴露给引擎编辑器——不加这个宏，变量在 Details 面板里就看不到，也不能被蓝图访问。

```cpp
UPROPERTY(EditAnywhere)    // 可在 Details 面板中编辑
UPROPERTY(VisibleAnywhere) // 只读显示（灰显），不可编辑
```

- `EditAnywhere`：类的**任何实例**都能在 Details 面板中修改该值（放在关卡里的 Actor + 蓝图默认值都可以改）。
- `VisibleAnywhere`：在 Details 面板里**可见但灰显**——只能看，不能改。常用于调试时查看内部状态。

> 🗣️ **口诀**：UPROPERTY = 给 C++ 变量发一张「引擎通行证」，没有它编辑器就看不见。

> 💡 **拓展**：`UFUNCTION` 是 UPROPERTY 的函数版本——将 C++ 函数暴露给蓝图调用。学到那里时回头对照。

---

## FVector — UE5 的三维向量

`FVector` 是 UE5 内置的三维向量结构体，存三个 `double` 值（X, Y, Z）。用途极其广泛：位置、方向、速度、缩放，全用它。

```cpp
FVector myVector = FVector(10.0f, 10.0f, 10.0f); // X=10, Y=10, Z=10
```

和 Unity 的 `Vector3` 是同一个概念，但 UE5 的类型名以 `F` 开头（`FVector`、`FRotator`、`FString`——F 前缀 = 结构体/值类型）。

---

## FRotator — 旋转的表示

`FRotator` 用**角度**存储旋转，三个分量：

| 分量 | 绕哪个轴转 | 常见叫法 |
|------|-----------|---------|
| Pitch | Y 轴 | 上下看 |
| Yaw | Z 轴 | 左右看 |
| Roll | X 轴 | 歪头（侧倾） |

```cpp
FRotator RotationVelocity; // 旋转速度（度/秒）
```

注意 `FRotator` 存的是**欧拉角**（度），不是弧度，不是四元数。做旋转运算时直接加减即可，但复杂旋转（如万向节锁场景）需要用 `FQuat`。

---

## 坐标操作：拿位置、设位置、算距离

```cpp
SetActorLocation();  // 把 Actor 瞬间移动到指定世界坐标
GetActorLocation();  // 返回 Actor 当前的世界坐标

// 计算两点之间的直线距离（返回 float，单位 = UE5 厘米）
MovedDistance = FVector::Dist(StartLocation, GetActorLocation());
```

`FVector::Dist` 是静态方法（`::` 调用，不需要实例），内部是标准的欧几里得距离公式：√((x₁-x₂)² + (y₁-y₂)² + (z₁-z₂)²)。

> 💡 **拓展**：如果只需要比较距离大小（不需要精确值），用 `FVector::DistSquared` 跳过开方运算——性能更好，尤其循环中大量比较时。

---

## 精确设定位置：方向归一化

直接硬设位置可能导致偏移累积。标准做法：

```cpp
FVector MoveDirection = PlatFormVelocity.GetSafeNormal();  // 取单位方向向量
FVector NewStartLocation = StartLocation + MoveDirection * MaxDistance;
SetActorLocation(NewStartLocation);
```

**`GetSafeNormal()` 做了什么**：将任意向量转换为同方向的**单位向量**（长度 = 1）。然后乘以 `MaxDistance` 得到精确偏移量。

- 「Safe」= 安全：如果向量是零向量（长度 = 0），除零会崩溃。`GetSafeNormal()` 检测到零向量时返回 (0,0,0)，而不是崩溃。
- 不归一化直接用原向量 × MaxDistance → 移动距离会随速度大小变化，不可控。

> 🗣️ **口诀**：确定方向用 Normalize，确定距离用乘法。方向 × 距离 = 精确位置。

---

## 帧率无关旋转

```cpp
FRotator RotationAdd = RotationVelocity * DeltaTime;
AddActorLocalRotation(RotationAdd);
```

**为什么乘以 DeltaTime**：`DeltaTime` 是上一帧到当前帧的秒数。乘以它之后，旋转量从「每帧转 N 度」变成「每秒转 N 度」——无论 30 FPS 还是 120 FPS，旋转速度一致。

不乘 DeltaTime → 高帧率机器上角色转得飞快，低帧率机器上慢悠悠。这是所有逐帧更新的黄金法则。

---

## 易错记录

### float 字面量必须有 `.0f`

```cpp
float MyFloat = 10.0f; // ✅ 正确 — 显式 float 字面量
float MyFloat = 10.0;  // ⚠️ 警告 — double 赋值给 float，精度损失
float MyFloat = 10;    // ❌ 错 — int 隐式转换
```

C++ 默认把 `10` 当作 `int`，`10.0` 当作 `double`。`10.0f` 中的 `f` 告诉编译器这是 `float` 类型。UE5 编译器配置严格，类型不匹配会报错。

### C++ Actor 类需拖入场景后才生效

只创建 C++ 类 ≠ Actor 出现在游戏里。C++ 类只是一个「模板」，必须：
- **拖入关卡场景**（手动放置），或
- **通过代码动态生成**（`SpawnActor`）

才能存在于游戏世界中。

### FString 用 `*` 取 C 风格字符串

```cpp
FString mystring;
UE_LOG(LogTemp, Warning, TEXT("mystring: %s"), *mystring); // *mystring → const TCHAR*
```

`FString` 重载了 `*` 运算符，返回 `const TCHAR*`（UE5 的宽字符 C 字符串），用于 `UE_LOG` 的 `%s` 格式化。这不是指针解引用——是 UE5 特有的类型转换约定。

> 🗣️ **口诀**：`FString` → `UE_LOG` 输出，加 `*`。其他地方用 FString 本身的方法。

---

## 速查表

| 知识点 | 一句话 |
|--------|--------|
| `UPROPERTY` | 把 C++ 变量暴露给编辑器/蓝图 |
| `EditAnywhere` vs `VisibleAnywhere` | 可编辑 vs 只读显示 |
| `FVector` | 三维向量，位置/方向/速度，类似 Unity Vector3 |
| `FRotator` | 欧拉角旋转（Pitch/Yaw/Roll），单位 = 度 |
| `FVector::Dist` | 两点之间的直线距离 |
| `GetSafeNormal()` | 取单位方向向量，安全处理零向量 |
| `DeltaTime` | 帧间隔秒数，乘它 = 帧率无关 |
| `float x = 10.0f` | `.0f` 不能省，否则类型不匹配 |
| `FString` 的 `*` | 重载运算符返回 `const TCHAR*`，用于 UE_LOG |
