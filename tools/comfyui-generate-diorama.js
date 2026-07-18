// ============================================================
// ComfyUI Diorama Layer Generator
// 通过 ComfyUI API 逐层生成 10 张透明 PNG
// 用法: node tools/comfyui-generate-diorama.js
// ============================================================

const fs = require('fs');
const path = require('path');

const COMFYUI = 'http://127.0.0.1:8188';
const WORKFLOW_PATH = 'D:/Program Files/ComfyUI/user/default/workflows/diorama_layer_rgba.json';
const OUTPUT_DIR = 'D:/Program Files/ComfyUI/output';
const TARGET_DIR = 'D:/Castiel/Estate/Projects/mow-blog/public/assets/diorama';

// ── Layer definitions ──
// Castiel 的原始感觉：「牧屋」— 白天躺在草地上看云，夜晚在暖灯下创造
// 不加风格标签（吉卜力/新海诚/纸艺/童话书），只描述场景内容

const LAYERS = [
  // === Day (白天草原) ===
  {
    file: 'day-sky.png',
    depth: 0.15,
    positive: [
      'vast open sky, soft white clouds drifting slowly',
      'warm golden afternoon light washing across the upper sky',
      'gentle gradient from pale blue to warm cream at the horizon',
      'the feeling of lying on grass looking up — infinite, peaceful, free',
      'soft atmospheric haze, distant and ethereal',
      'isolated subject on transparent background, no ground, no landscape, sky only'
    ].join(', '),
    negative: 'ground, grass, trees, mountains, buildings, people, animals, birds, sun disk, moon, hard edges, photorealism, 3D render, solid background, text, watermark, dark tones, busy composition'
  },
  {
    file: 'day-mountains.png',
    depth: 0.35,
    positive: [
      'distant rolling hills on the horizon line, soft grassland silhouettes',
      'warm muted greens and golden browns, morning mist resting in the valleys',
      'quiet expansive landscape, barely-there detail, atmospheric perspective',
      'the edge where earth meets sky, peaceful and still',
      'isolated on transparent background — hills only, cut out at the horizon, no sky above'
    ].join(', '),
    negative: 'sky, clouds, close-up grass, trees, buildings, animals, people, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'day-trees.png',
    depth: 0.55,
    positive: [
      'a few scattered trees and shrubs in the middle distance of a grassland',
      'warm afternoon light filtering through scattered leaves, dappled shadows on the ground',
      'gentle breeze suggested by slightly bent grass at the base, soft painterly texture',
      'the feeling of walking through an open meadow with occasional shade',
      'isolated on transparent background — trees and their immediate ground only, no sky, no distant horizon'
    ].join(', '),
    negative: 'sky, distant mountains, buildings, animals, people, forest, dense woods, photorealism, 3D render, solid background, text, watermark, dark night tones'
  },
  {
    file: 'day-meadow.png',
    depth: 0.80,
    positive: [
      'wild grassland meadow in the foreground, tall grass and wild plants swaying gently',
      'warm golden-green tones, soft afternoon sunlight, a few tiny wildflowers scattered',
      'the feeling of sitting right in the grass, surrounded by the meadow',
      'loose painterly brushstrokes, slightly soft focus at the edges',
      'isolated on transparent background — meadow vegetation only, bottom half of frame'
    ].join(', '),
    negative: 'sky, horizon, trees, buildings, animals, people, hard edges, photorealism, 3D render, solid background, text, watermark, dark tones'
  },
  {
    file: 'day-fg.png',
    depth: 1.00,
    positive: [
      'extreme foreground framing elements at the very edges of the frame',
      'a few tall grass blades and wild plants slightly out of focus, very close to the viewer',
      'warm soft golden tones, creating depth through blur, like looking past something near your face',
      'the feeling of peeking through grass at the meadow beyond',
      'isolated on transparent background — only edge framing elements, center area fully transparent'
    ].join(', '),
    negative: 'sky, horizon line, trees, buildings, animals, people, solid fill, hard edges, photorealism, 3D render, text, watermark, central subject'
  },

  // === Night (夜晚木屋) ===
  {
    file: 'night-sky.png',
    depth: 0.15,
    positive: [
      'quiet deep night sky, scattered distant stars, soft moonlight glow',
      'deep indigo and dark blue tones, a few wispy night clouds barely visible',
      'vast peaceful darkness, the feeling of looking up at the stars from a cabin porch',
      'subtle gradient from near-black at the top to slightly warmer dark blue near the bottom',
      'isolated on transparent background — sky only, no ground, no cabin, no landscape'
    ].join(', '),
    negative: 'ground, trees, cabin, buildings, moon disk, bright stars, daylight, sunrise, sunset, hard edges, photorealism, 3D render, solid background, text, watermark, busy starfield'
  },
  {
    file: 'night-hills.png',
    depth: 0.35,
    positive: [
      'distant dark hills and fields under moonlight, soft dark silhouettes',
      'deep muted blues and purple-greys, the world sleeping under stars',
      'quiet still landscape at night, barely visible undulating horizon',
      'the feeling of looking out at the quiet countryside after dark',
      'isolated on transparent background — hills only, cut out at the horizon, no sky above'
    ].join(', '),
    negative: 'sky, stars, cabin, buildings, lights, trees, animals, people, daylight, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'night-cabin.png',
    depth: 0.55,
    positive: [
      'a small cozy wooden cabin in the middle distance, warm golden light glowing softly from its windows',
      'thin chimney smoke rising gently into the night air, the cabin nestled in darkness',
      'the feeling of home — warmth and safety in the vast quiet night',
      'wooden textures in warm brown, window light casting a subtle warm pool around the cabin',
      'isolated on transparent background — cabin and its immediate warm glow only, surroundings fade to transparent'
    ].join(', '),
    negative: 'sky, stars, distant hills, people, animals, modern buildings, city lights, daylight, photorealism, 3D render, solid background, text, watermark, multiple cabins'
  },
  {
    file: 'night-porch.png',
    depth: 0.80,
    positive: [
      'wooden cabin porch in the foreground, warm amber lantern light casting a gentle glow',
      'wooden railing and floorboards with warm grain texture, the feeling of sitting on the porch at night',
      'a single warm lantern or candle glow, soft shadows, intimate and peaceful',
      'the boundary between inside warmth and outside night',
      'isolated on transparent background — porch elements only, warm light, bottom portion of frame'
    ].join(', '),
    negative: 'sky, stars, entire cabin exterior, people, animals, daylight, cold blue tones, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'night-fg.png',
    depth: 1.00,
    positive: [
      'extreme foreground framing at the edges, wooden railing corner or warm lantern glow at the frame edge',
      'slightly out of focus, very close to the viewer, creating intimate depth',
      'warm amber and deep brown tones against the darkness beyond',
      'the feeling of standing on the porch, looking past the railing into the night',
      'isolated on transparent background — only edge elements, center area fully transparent'
    ].join(', '),
    negative: 'sky, stars, entire cabin, people, animals, daylight, solid fill, hard edges, photorealism, 3D render, text, watermark, central subject'
  }
];

// ── Helper: API call ──
async function apiPost(endpoint, body) {
  const url = COMFYUI + endpoint;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!resp.ok) throw new Error(`API ${endpoint} returned ${resp.status}`);
  return resp.json();
}

async function apiGet(endpoint) {
  const resp = await fetch(COMFYUI + endpoint);
  if (!resp.ok) throw new Error(`API ${endpoint} returned ${resp.status}`);
  return resp.json();
}

// ── Helper: wait for generation ──
async function waitForPrompt(promptId, timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const history = await apiGet('/history/' + promptId);
    if (history[promptId]) {
      const outputs = history[promptId].outputs;
      if (outputs) return outputs;
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('Timeout waiting for prompt ' + promptId);
}

// ── Main ──
async function main() {
  // Check ComfyUI
  console.log('[1/5] Checking ComfyUI connection...');
  try {
    const stats = await apiGet('/system_stats');
    const vram = (stats.devices[0].vram_free / 1024**3).toFixed(1);
    console.log(`  OK — ComfyUI ${stats.system.comfyui_version}, VRAM free: ${vram}GB`);
  } catch (e) {
    console.error('  FAILED — Is ComfyUI running at', COMFYUI, '?');
    process.exit(1);
  }

  // Load workflow
  console.log('[2/5] Loading workflow template...');
  const template = JSON.parse(fs.readFileSync(WORKFLOW_PATH, 'utf8'));
  console.log(`  OK — ${template.nodes.length} nodes loaded`);

  // Ensure target dir
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Generate each layer
  console.log(`[3/5] Generating ${LAYERS.length} layers...`);

  for (let i = 0; i < LAYERS.length; i++) {
    const layer = LAYERS[i];
    const label = `[${i+1}/${LAYERS.length}] ${layer.file}`;
    console.log(`\n${label} (depth=${layer.depth})`);
    console.log(`  Prompt: ${layer.positive.substring(0, 120)}...`);

    // Clone workflow and set prompt
    const wf = JSON.parse(JSON.stringify(template));
    const posNode = wf.nodes.find(n => n.id === 3);
    const negNode = wf.nodes.find(n => n.id === 4);
    if (!posNode || !negNode) {
      console.error('  ERROR: Prompt nodes not found in workflow');
      continue;
    }
    posNode.widgets_values[0] = layer.positive;
    negNode.widgets_values[0] = layer.negative;

    // Set random seed
    const seedNode = wf.nodes.find(n => n.id === 6);
    seedNode.widgets_values[0] = Math.floor(Math.random() * 999999999999999);

    // Submit
    try {
      const result = await apiPost('/prompt', {
        prompt: wf,
        client_id: 'white-house-diorama'
      });
      console.log(`  Queued: ${result.prompt_id}`);

      // Wait
      const outputs = await waitForPrompt(result.prompt_id);
      console.log(`  Done — output node keys: ${Object.keys(outputs).join(', ')}`);

    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    // Brief cooldown between generations
    if (i < LAYERS.length - 1) {
      console.log('  (cooling down 3s...)');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  // Find and copy output files
  console.log('\n[4/5] Locating output files...');
  const outputFiles = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.startsWith('diorama-layer') && f.endsWith('.png'))
    .sort((a, b) => {
      // Sort by modification time descending
      return fs.statSync(path.join(OUTPUT_DIR, b)).mtimeMs -
             fs.statSync(path.join(OUTPUT_DIR, a)).mtimeMs;
    });

  if (outputFiles.length < LAYERS.length) {
    console.log(`  WARNING: Found ${outputFiles.length} files, expected ${LAYERS.length}`);
  }

  // Copy the most recent N files to target with correct names
  const recentFiles = outputFiles.slice(0, LAYERS.length).reverse();
  console.log(`  Copying ${recentFiles.length} files to ${TARGET_DIR}...`);

  for (let i = 0; i < Math.min(recentFiles.length, LAYERS.length); i++) {
    const src = path.join(OUTPUT_DIR, recentFiles[i]);
    const dst = path.join(TARGET_DIR, LAYERS[i].file);
    fs.copyFileSync(src, dst);
    const size = (fs.statSync(dst).size / 1024).toFixed(0);
    console.log(`  ${LAYERS[i].file} (${size}KB)`);
  }

  console.log('\n[5/5] Done!');
  console.log(`  Files in: ${TARGET_DIR}`);
  console.log('  Next: refresh browser to see updated diorama');
}

main().catch(e => { console.error(e); process.exit(1); });
