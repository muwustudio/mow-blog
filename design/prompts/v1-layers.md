# MOW 博客 — 图片生成提示词

> 日系动漫风 · 双主题 · 多层透明背景插画 · 视差景深
> 2026-07-09 先知撰写

---

## 架构概览

每个主题需要 **4 层独立透明 PNG 插画**，在网页上通过 CSS 叠加，鼠标移动时各层以不同速率平移，制造景深感（类似参考网站 diorama 效果）。

| 层 | 名称 | 深度 | 鼠标移动速率 | 说明 |
|----|------|------|-------------|------|
| L1 | 远景 | 最远 | 5px | 天空 / 远景，几乎不动 |
| L2 | 中景 | 中间 | 12px | 山丘 / 森林，微动 |
| L3 | 近景主体 | 较近 | 20px | 核心场景内容 |
| L4 | 前景遮罩 | 最近 | 28px | 花草 / 窗框 / 物件边缘，快速移动 |

所有图片规格：
- **分辨率**：1920×1080（保持宽高比）
- **格式**：PNG，透明背景
- **风格**：日系动画电影风格（参考新海诚 / 吉卜力背景美术）
- **光照**：统一主光源方向，柔和自然光

---

## 白天主题：「草地牧羊人」🌿

### L1 — 远景天空

**中文提示词（复制即用）：**

> 日系动画电影风格的天空全景插画，吉卜力/新海诚式背景美术。广阔柔和的蓝天，大朵蓬松的白云从画面左上向右下缓缓铺展，云层有微妙的粉色和金色暖调边缘光。远处地平线处有极淡的远山剪影。整体色调温暖、通透、宁静。画面底部约30%区域留白/透明，用于过渡到中景层。画面比例16:9。透明背景PNG。只画天空和云，不画地面物体。

**English prompt (copy & use):**

> Japanese anime film-style sky panorama illustration, Studio Ghibli / Makoto Shinkai background art aesthetic. Expansive soft blue sky, large fluffy white clouds spreading from upper left to lower right, with subtle pink and golden warm rim light on cloud edges. Faint distant mountain silhouettes at the far horizon line. Overall tone warm, airy, peaceful. The bottom ~30% of the image should be empty/transparent for blending into the midground layer. 16:9 aspect ratio. Transparent background PNG. Paint only sky and clouds, no ground objects.

---

### L2 — 中景山丘

**中文提示词（复制即用）：**

> 日系动画电影风格的草原丘陵全景插画，新海诚式背景美术。绵延起伏的绿色丘陵从画面左端延伸到右端，草地的绿色有丰富的层次——近处偏黄绿，远处偏蓝绿。丘陵之间有隐约的泥土小径蜿蜒。几棵稀疏的远树点缀在丘陵上，树形为日系动画常见的圆形树冠。画面顶部约40%透明，底部约20%透明，用于叠层。光线来自右上方，在丘陵的向阳面有温暖的金色高光。透明背景PNG。只画丘陵草地和远树，不画天空，不画人物。

**English prompt (copy & use):**

> Japanese anime film-style grassland hills panorama illustration, Makoto Shinkai background art aesthetic. Rolling green hills stretching from left to right edge of frame, grass greens with rich tonal variation — yellow-green in near areas, blue-green in distance. A faint winding dirt path between the hills. A few sparse distant trees dotting the hills, with the round canopy silhouette typical of anime background art. Top ~40% transparent, bottom ~20% transparent for layer stacking. Light from upper right, warm golden highlights on sun-facing hill slopes. Transparent background PNG. Paint only hills, grass, and distant trees — no sky, no figures.

---

### L3 — 近景主体：牧羊人与牧羊犬

**中文提示词（复制即用）：**

> 日系动画电影风格的角色场景插画，吉卜力式宁静氛围。画面中央偏右的绿色山丘顶上，一个年轻牧羊人背对镜头坐着，望向远方广阔风景。牧羊人穿宽松的米色亚麻衬衫，深棕色裤子，戴一顶草帽放在身旁。一只边境牧羊犬（黑白毛色）安静趴在牧羊人身边，耳朵微竖，望向同一方向。几只白羊散布在周围山坡上吃草。整个场景传达出宁静、守护、与自然共处的感觉。人物为中远景——牧羊人占画面高度约15%，不露脸（背影）。画面边缘（上下左右各约15%）留透明区域用于层叠。色彩统一在暖绿和土色调中。透明背景PNG。

**English prompt (copy & use):**

> Japanese anime film-style character scene illustration, Studio Ghibli quiet atmosphere. On a green hilltop slightly right of center, a young shepherd sits facing away from the viewer, gazing out at the vast landscape. The shepherd wears a loose beige linen shirt, dark brown pants, a straw hat resting beside them. A border collie (black and white coat) lies quietly beside the shepherd, ears slightly perked, looking in the same direction. A few white sheep scattered on surrounding slopes, grazing. The entire scene conveys peace, guardianship, and harmony with nature. Figure is mid-to-long shot — the shepherd occupies ~15% of frame height, face not shown (back view). Edges of the image (roughly 15% on all sides) left transparent for layer blending. Colors unified in warm greens and earth tones. Transparent background PNG.

---

### L4 — 前景遮罩：花草边缘

**中文提示词（复制即用）：**

> 日系动画风格的近景花草插画，用于视差前景层。画面底部生长着茂密的野花和长草——白色雏菊、黄色小野花、紫色薰衣草状花穗，草叶高低错落。画面左右下角各有一些向外延伸的灌木枝条，带柔和的散景（bokeh）虚化效果。画面顶部80%区域完全透明。花草画风细腻但不失日系动画的笔触感——柔和轮廓线，水彩般的色彩过渡。晨光从上方洒落，在草叶边缘形成细微的逆光金边。透明背景PNG。

**English prompt (copy & use):**

> Japanese anime-style close-up wildflowers and grass illustration, for parallax foreground layer. Dense wildflowers and tall grass growing from the bottom edge — white daisies, small yellow wildflowers, purple lavender-like spikes, grass blades at varying heights. Some shrub branches extending inward from the lower left and right corners, with soft bokeh blur effect. Top ~80% of image completely transparent. Flowers and grass painted with detail but retaining anime brushwork feel — soft contour lines, watercolor-like color transitions. Morning light falling from above, creating subtle backlit gold edges on grass blades. Transparent background PNG.

---

## 夜晚主题：「木屋暖灯」🏠

### L1 — 远景窗口夜空

**中文提示词（复制即用）：**

> 日系动画电影风格，从室内窗户向外望去的夜空景色。深蓝色夜空清澈如水，满月悬挂在画面右上角，月光柔和明亮带有轻微光晕。稀疏的银色星星散布天空。远处有极淡的针叶林树冠剪影在地平线上。整幅画面被温暖的月光微微染上蓝银色调。画面为透过长方形窗户看到的景色——但窗户本身不画在此层，属于L2层。透明背景PNG。只画夜空、月亮、星星、远林剪影。

**English prompt (copy & use):**

> Japanese anime film-style night sky view, as seen through a window from inside a room. Deep blue night sky clear as water, full moon hanging in upper right corner, moonlight soft and bright with a subtle glow halo. Sparse silver stars scattered across the sky. Very faint coniferous forest treetop silhouettes at the horizon. The entire scene is gently tinted in blue-silver moonlight tones. This is the view through a rectangular window — but the window frame itself is not painted in this layer (belongs to L2). Transparent background PNG. Paint only night sky, moon, stars, distant forest silhouettes.

---

### L2 — 窗口与郁金香

**中文提示词（复制即用）：**

> 日系动画风格的室内窗框前景插画。画面主体为一个木质窗框——深色木材、日式简约设计、横竖格栅线条干净。窗台宽大，上面摆放一只素色陶土花盆，里面种着几株盛开的郁金香——温暖的橘粉色和奶油白，花瓣在月光下微微发光。窗户打开约三分之一，薄纱窗帘在微风中轻轻飘动。窗框外的区域（玻璃部分）完全透明——夜空属于L1层。画面四周约10%留透明边距。整体色调温暖——木材的红棕色和郁金香的暖色与窗外冷色夜空形成对比。透明背景PNG。

**English prompt (copy & use):**

> Japanese anime-style interior window frame foreground illustration. The main subject is a wooden window frame — dark wood, Japanese minimalist design, clean horizontal and vertical mullion lines. A wide windowsill holds a simple terracotta flower pot with several blooming tulips — warm orange-pink and cream white, petals subtly glowing in moonlight. The window is open about one-third, sheer curtains gently billowing in a light breeze. The area outside the window glass must be fully transparent — the night sky belongs to L1 layer. Approximately 10% transparent margin on all edges. Overall tone warm — reddish-brown wood and warm tulip colors contrasting with the cool night sky beyond. Transparent background PNG.

---

### L3 — 近景主体：弹吉他的牧羊人与牧羊犬

**中文提示词（复制即用）：**

> 日系动画电影风格的温馨室内场景插画，吉卜力式的"生活气息"。一个日式小木屋内部：浅色木地板（有榻榻米质感），暖黄色纸灯笼吊灯从天花板垂下发出柔和光芒。房间右侧，一个年轻牧羊人盘腿坐在深蓝色软垫上，怀抱一把黑色木吉他正在轻轻弹奏。吉他的共鸣箱上有精致的手绘玫瑰图案（红色和暗红色）。牧羊人穿宽松的米白棉质家居服，表情放松、沉浸于音乐中，眼睛微闭。他身旁，一只边境牧羊犬蜷缩在米色毯子上安静睡觉，耳朵偶尔微动。房间左侧是一面浅色木质书架，摆着几本书和小摆件。角落有一张小矮桌，上面放着一杯冒着热气的茶。画面边缘留约10%透明区域。光线来源：灯笼的暖黄光 + 从窗口（画面中偏上方，属于L2层位置）泻入的蓝白月光，两种光线在木地板上交融。整体氛围极度温馨、安静、有归属感。透明背景PNG。

**English prompt (copy & use):**

> Japanese anime film-style cozy interior scene illustration, Studio Ghibli "lived-in" warmth. Inside a small Japanese-style cabin: light-colored wooden floor (tatami-like texture), a warm yellow paper lantern pendant light hanging from the ceiling casting soft glow. On the right side of the room, a young shepherd sits cross-legged on a dark blue cushion, gently playing a black wooden guitar. The guitar's soundbox features an intricately hand-painted rose pattern (red and dark crimson). The shepherd wears loose cream-white cotton loungewear, expression relaxed and immersed in the music, eyes gently closed. Beside them, a border collie curls up sleeping quietly on a beige blanket, ears occasionally twitching. Left side of the room features a light wood bookshelf with a few books and small decorative objects. In a corner, a low chabudai table holds a cup of steaming tea. ~10% transparent margins on edges. Light sources: warm yellow lantern light + blue-white moonlight streaming in through the window (positioned mid-upper in frame, belonging to the L2 layer area), the two light sources blending beautifully on the wooden floor. Overall atmosphere: intensely cozy, quiet, a sense of belonging. Transparent background PNG.

---

### L4 — 前景遮罩：室内物件边缘

**中文提示词（复制即用）：**

> 日系动画风格的超近景室内物件插画，用于视差前景层。画面左下角是一盏放在地上的暖黄光小台灯（日系简约陶瓷底座+布质灯罩），灯罩边缘带柔和发光效果。画面右下角有几本堆叠的书，最上面一本摊开着，旁边放着一副圆框眼镜。画面底部边缘处有一角编织毯子的纹理边缘。画面顶部和中部大面积（约70%）完全透明。所有物件为超近景——模糊虚化感（浅景深效果），仿佛观看者就坐在这些物件旁边。温暖的金色调为主。透明背景PNG。

**English prompt (copy & use):**

> Japanese anime-style ultra-close-up interior objects illustration, for parallax foreground layer. Lower left corner: a small warm-glow table lamp on the floor (Japanese minimalist ceramic base + fabric shade), the shade edges with a soft luminous glow effect. Lower right corner: a stack of several books, the top one lying open, a pair of round-frame glasses resting nearby. Bottom edge: the textured edge of a woven blanket corner. The top and center areas (~70%) completely transparent. All objects in extreme close-up — with a soft blur / shallow depth-of-field effect, as if the viewer is sitting right next to these items. Dominant warm golden tones. Transparent background PNG.

---

## 附加：Mascot（吉祥物）提示词

如果需要一只更风格化的 mascot 角色（用于网站 logo / favicon / 404 页面等），以下是单独的提示词：

### 牧羊犬 Mascot

**中文提示词：**

> 日系动画风格的可爱边境牧羊犬半身插画，用于网站吉祥物。一只黑白毛色的边境牧羊犬，正面朝向镜头，头部微微歪向一侧，眼睛大而明亮（吉卜力式温柔眼神），嘴角带着仿佛在微笑的弧度。脖子上系着一条细的红色围巾，围巾尾端微微飘起。背景为柔和的圆形暖色光晕（奶白到浅黄渐变），光晕外部完全透明。笔触干净柔和，线条温暖不过于锐利。适合裁切为圆形头像。透明背景PNG。

**English prompt:**

> Japanese anime-style cute border collie bust illustration, for website mascot. A black-and-white border collie facing the camera, head slightly tilted to one side, eyes large and bright with a gentle Studio Ghibli warmth, mouth curved in what almost looks like a smile. A thin red scarf tied around the neck, the scarf ends gently floating. Background is a soft circular warm glow (cream white to pale yellow gradient), fully transparent outside the glow. Clean soft brushwork, lines warm rather than sharp. Suitable for cropping into a circular avatar. Transparent background PNG.

---

## 层叠方案速查

| 主题 | L1 (远) | L2 (中) | L3 (近主体) | L4 (前景) |
|------|---------|---------|------------|----------|
| 白天 | 蓝天白云 | 丘陵远树 | 牧羊人+牧羊犬+羊群 | 花草边缘+散景 |
| 夜晚 | 月夜星空 | 窗框+郁金香 | 室内弹吉他+牧羊犬 | 台灯+书堆+毯子 |

鼠标视差速率参考（`translate3d`）：
- L1：`mouse * 5px` — 几乎不动
- L2：`mouse * 12px` — 微动
- L3：`mouse * 20px` — 中速
- L4：`mouse * 28px` — 最快，制造前景遮罩感
