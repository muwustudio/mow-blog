# MOW 博客 — 图片生成提示词 v3 (image2 精简版)

> 3 风格 × 2 主题 = 6 张完整场景 · 短提示词（适配 image2，不支持深度思考）
> 2026-07-09 先知撰写

---

## image2 vs nano banana 2 策略差异

| | nano banana 2 | image2 |
|----|-------------|--------|
| 提示词长度 | 三段式，越长越准 | **短句，越精越准** |
| 结构 | 风格→构图→技术 | **Style tag + Scene + Key elements + Mood + Negative** |
| 复杂场景 | 能处理 | **元素多容易乱，宁少勿多** |
| 速度 | 慢 | 快 |

**image2 核心原则**：把最重要的东西放在最前面。它读提示词的注意力从前往后递减。

---

## 通用格式

```
[风格关键词], [主场景一句话], [必须包含的元素列表], [色调氛围], [不要画的东西]
```

---

## 通过 / 重来（简化为三项）

| ✅ 通过 | ❌ 重来 |
|---------|---------|
| 风格一眼可辨 | 风格混乱 |
| 牧羊人 + 边牧都在画面里 | 缺元素/人崩/狗不像 |
| 没有明显 AI 瑕疵 | 手指粘连、物体融合 |

---

## 通用负面词（每条提示词末尾都加上）

```
no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark

Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
```

---

---

# 风格一：日漫风

---

## 1-1 白天：「草地牧羊人」

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Studio Ghibli anime background art style, vast green rolling hills prairie under warm morning sunlight.
A young shepherd in beige linen shirt and brown pants sits on a hilltop facing away, gazing at the distance.
A border collie dog (black and white coat) lying beside the shepherd.
A few white sheep grazing on the slopes, a winding dirt path, soft blue sky with fluffy white clouds, wildflowers at the bottom edge.
Warm golden-green palette, soft watercolor-like brushwork, gentle bloom lighting, peaceful atmosphere.
16:9 aspect ratio.
no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

## 1-2 夜晚：「木屋暖灯」

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Studio Ghibli anime interior art style, cozy Japanese wooden cabin at night.
A young shepherd in cream-white loungewear sits cross-legged on a dark blue cushion, playing a black acoustic guitar with white rose pattern.
A border collie dog (black and white coat) curled up sleeping on a beige blanket nearby.
A wooden lattice window showing deep blue night sky with full moon and stars, tulips in a terracotta pot on the windowsill.
Warm yellow paper lantern hanging from ceiling, wooden floor with tatami texture, bookshelf, steaming tea cup on a low table.
Warm amber and deep brown tones inside vs cool blue moonlight from window, cozy lived-in atmosphere.
16:9 aspect ratio.
no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

---

# 风格二：雨雾之都风

---

## 2-1 白天：「草地牧羊人」— 晨雾草原

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Varsapura 2.5D anime style: realistically rendered natural environment with anime-styled character face.
Misty morning grassland, rolling green hills with muted gray-green tones, thin fog veils in the low areas, dew reflections on grass blades.
A young shepherd (anime face, realistic clothing texture) in beige linen shirt sits on a hilltop facing away.
A border collie (black and white coat) lying beside the shepherd, a few white sheep on the slopes.
Pale blue-gray sky with uniform thin cloud layer, soft diffuse light from upper right, damp dirt path winding to distance.
Restrained elegant color palette: gray-green, gray-blue, warm gray, earth tones. Atmospheric and serene.
16:9 aspect ratio.
no vivid saturated colors, no cel-shading hard shadows, no pure blue sky, no cartoon rendering, no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

## 2-2 夜晚：「木屋暖灯」— 雨夜木屋

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Varsapura 2.5D anime style: realistically rendered environment with anime-styled character face.
Interior of a Japanese wooden cabin on a rainy night. Through the lattice window: gray-blue rainy sky, visible slanting rain streaks, distant forest blurred in mist, no moon, no stars. Water droplets on window glass.
Tulips in a terracotta pot on the windowsill, petals with fine water droplets.
A young shepherd (anime face) in cream-white loungewear playing a black guitar with red rose pattern, sitting on a dark blue cushion.
A border collie curled asleep on a beige blanket. Warm yellow paper lantern as the single main light source, wooden floor, bookshelf, steaming tea.
Warm amber lighting inside vs cool gray-blue rainy ambience from window. Restrained palette, cozy shelter feeling.
16:9 aspect ratio.
no clear night sky, no moon, no stars, no vivid colors, no cartoon rendering, no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

---

# 风格三：绝区零风

---

## 3-1 白天：「草地牧羊人」— 插画风草原

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Zenless Zone Zero illustration art style: bold powerful contour lines, multi-layered shadows with hard edges, high saturation, rim lighting.
Vast green rolling hills with crisp defined outlines, grass shadows showing multiple layers: bright yellow-green highlights, deep dark green shadows, visible mid-tone.
A young shepherd with bold line-art contours, beige shirt with defined fold shadows, sitting on a hilltop facing away.
A border collie (black and white coat, near pure white vs deep black, golden rim light tracing its body edge) lying beside the shepherd.
Rich saturated blue sky with geometric-shaped clouds (not soft, more like designed illustration clouds).
Golden rim light on grass edges from upper right sunlight. Like a high-quality game concept illustration or album cover.
High saturation palette: intense grass greens, deep earth browns, vibrant sky blue, bright white clouds, gold rim light.
16:9 aspect ratio.
no soft blurred contours, no low saturation, no watercolor texture, no Ghibli softness, no smooth gradient shadows, no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

## 3-2 夜晚：「木屋暖灯」— 插画风室内

```
Use the uploaded image as style reference only — color palette, lighting, brushwork, atmosphere. Do not copy its content or composition.
Zenless Zone Zero illustration art style: bold powerful contour lines, multi-layered shadows with defined color-block boundaries, high saturation color contrast, rim lighting.
Interior of a Japanese wooden cabin. Wooden lattice window with bold straight frame lines. Outside: deep ink-blue night sky, bright full moon with sharp rim-light glow, large designed star patterns.
Tulips in terracotta pot on windowsill with rich saturated orange-pink and cream-white petals.
Wooden floor with clearly defined shadow layers: warm orange where lantern light hits, deep brown near-black in shadow, hard edge between them (not soft gradient — ZZZ signature).
Warm yellow paper lantern with near-white reflective highlight and rich orange shadow, hanging from ceiling.
A young shepherd with bold contour lines playing a black guitar — the guitar black has layered dark tones and glossy highlight (vinyl figure material quality), rose pattern in dark + bright white contrast.
A border collie curled on a blanket with multi-layered fold shadows, strong volumetric feel. Bookshelf, steaming tea with clear white swirl outlines.
Two light sources: strong warm yellow lantern light (dominant) vs sharp blue-white moonlight through window, forming a clear light-shadow dividing line on the floor.
High saturation contrast palette: warm amber + deep brown + orange vs ink blue + bright white moonlight.
16:9 aspect ratio.
no soft gradient shadows, no low saturation, no Ghibli softness, no realistic rendering, no cel-shading single shadow layer, no photorealistic, no 3D render, no ugly, no deformed hands, no extra fingers, no text, no watermark
```

---

---

# 生成策略

```
Phase 1: 日漫风（最快、最熟悉）
  白天 → 最多 3 次
  夜晚 → 最多 3 次

Phase 2: 雨雾之都风（中等难度，提示词长一点）
  白天 → 最多 3 次
  夜晚 → 最多 3 次

Phase 3: 绝区零风（最难命中，多给预算）
  白天 → 最多 4 次
  夜晚 → 最多 4 次

计划消费：20 次。余 20 次备用。
```

**image2 特别建议**：
- 元素过多的提示词（夜晚绝区零风）如果连续翻车，尝试拆成两次生成——先生成"窗外夜空"，再生成"室内场景"，看哪个描述是干扰源
- 如果某个风格的夜晚一直出问题，可能是"双光源"描述让 image2 困惑——删掉第二光源，只保留灯笼光
- 边牧画不对时，把 "border collie" 替换为 "black and white sheepdog with white chest and white face stripe"

---

# 翻车补救速查

| 现象 | 追加到提示词末尾 |
|------|-----------------|
| 风格不对 | 日漫：`hand-painted anime background, not a photo` / 绝区零：`illustration with bold outlines, not cel animation` |
| 人崩了 | `simple back view of a person, no face visible, seated pose, normal proportions` |
| 狗像狼 | `medium-sized border collie sheepdog, not a wolf, not a husky` |
| 元素丢失 | 把你最想要的那个元素移到提示词的第一句 |
| 颜色太艳 | `muted colors, film-like color grading` |
| 颜色太灰 | `vibrant but natural colors, golden hour lighting` |