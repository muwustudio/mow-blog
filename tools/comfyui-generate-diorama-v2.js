// ============================================================
// ComfyUI Diorama Layer Generator v2
// 使用正确的 ComfyUI API 格式（从浏览器 graph.serialize() 提取）
// ============================================================

const fs = require('fs');
const path = require('path');

const COMFYUI = 'http://127.0.0.1:8188';
const OUTPUT_DIR = 'D:/Program Files/ComfyUI/output';
const TARGET_DIR = 'D:/Castiel/Estate/Projects/mow-blog/public/assets/diorama';

// ── API-format workflow template (from browser graph.serialize()) ──
const TEMPLATE = {"id":"diorama-gen","revision":0,"last_node_id":50,"last_link_id":80,"nodes":[{"id":1,"type":"CheckpointLoaderSimple","pos":[50,400],"size":[315,98],"flags":{},"order":0,"mode":0,"inputs":[{"localized_name":"Checkpoint名称","name":"ckpt_name","type":"COMBO","widget":{"name":"ckpt_name"},"link":null}],"outputs":[{"localized_name":"模型","name":"MODEL","type":"MODEL","slot_index":0,"links":[10]},{"localized_name":"CLIP","name":"CLIP","type":"CLIP","slot_index":1,"links":[11,12]},{"localized_name":"VAE","name":"VAE","type":"VAE","slot_index":2,"links":[13]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"CheckpointLoaderSimple"},"widgets_values":["sd_xl_base_1.0.safetensors"]},{"id":2,"type":"LayeredDiffusionApply","pos":[450,100],"size":[350,106],"flags":{},"order":2,"mode":0,"inputs":[{"localized_name":"模型","name":"model","type":"MODEL","link":10},{"localized_name":"配置","name":"config","type":"COMBO","widget":{"name":"config"},"link":null},{"localized_name":"权重","name":"weight","type":"FLOAT","widget":{"name":"weight"},"link":null}],"outputs":[{"localized_name":"模型","name":"MODEL","type":"MODEL","slot_index":0,"links":[20]}],"properties":{"cnr_id":"comfyui-layerdiffuse","ver":"b4f6a9e024064a4489f774a8b91049ce0b606ea3","Node name for S&R":"LayeredDiffusionApply"},"widgets_values":["SDXL, Conv Injection",1]},{"id":3,"type":"CLIPTextEncode","pos":[450,300],"size":[450,200],"flags":{},"order":3,"mode":0,"inputs":[{"localized_name":"clip","name":"clip","type":"CLIP","link":11},{"localized_name":"文本","name":"text","type":"STRING","widget":{"name":"text"},"link":null}],"outputs":[{"localized_name":"条件","name":"CONDITIONING","type":"CONDITIONING","slot_index":0,"links":[30]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"CLIPTextEncode"},"widgets_values":["PLACEHOLDER_POSITIVE"]},{"id":4,"type":"CLIPTextEncode","pos":[450,520],"size":[450,200],"flags":{},"order":4,"mode":0,"inputs":[{"localized_name":"clip","name":"clip","type":"CLIP","link":12},{"localized_name":"文本","name":"text","type":"STRING","widget":{"name":"text"},"link":null}],"outputs":[{"localized_name":"条件","name":"CONDITIONING","type":"CONDITIONING","slot_index":0,"links":[40]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"CLIPTextEncode"},"widgets_values":["PLACEHOLDER_NEGATIVE"]},{"id":5,"type":"EmptyLatentImage","pos":[450,750],"size":[315,106],"flags":{},"order":1,"mode":0,"inputs":[{"localized_name":"宽度","name":"width","type":"INT","widget":{"name":"width"},"link":null},{"localized_name":"高度","name":"height","type":"INT","widget":{"name":"height"},"link":null},{"localized_name":"批量大小","name":"batch_size","type":"INT","widget":{"name":"batch_size"},"link":null}],"outputs":[{"localized_name":"Latent","name":"LATENT","type":"LATENT","slot_index":0,"links":[50]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"EmptyLatentImage"},"widgets_values":[1024,576,1]},{"id":6,"type":"KSampler","pos":[950,200],"size":[315,262],"flags":{},"order":5,"mode":0,"inputs":[{"localized_name":"模型","name":"model","type":"MODEL","link":20},{"localized_name":"正面条件","name":"positive","type":"CONDITIONING","link":30},{"localized_name":"负面条件","name":"negative","type":"CONDITIONING","link":40},{"localized_name":"Latent图像","name":"latent_image","type":"LATENT","link":50},{"localized_name":"种子","name":"seed","type":"INT","widget":{"name":"seed"},"link":null},{"localized_name":"步数","name":"steps","type":"INT","widget":{"name":"steps"},"link":null},{"localized_name":"cfg","name":"cfg","type":"FLOAT","widget":{"name":"cfg"},"link":null},{"localized_name":"采样器名称","name":"sampler_name","type":"COMBO","widget":{"name":"sampler_name"},"link":null},{"localized_name":"调度器","name":"scheduler","type":"COMBO","widget":{"name":"scheduler"},"link":null},{"localized_name":"降噪","name":"denoise","type":"FLOAT","widget":{"name":"denoise"},"link":null}],"outputs":[{"localized_name":"Latent","name":"LATENT","type":"LATENT","slot_index":0,"links":[60,61]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"KSampler"},"widgets_values":[156680208700286,"randomize",20,8,"euler","normal",1]},{"id":7,"type":"VAEDecode","pos":[1350,200],"size":[210,46],"flags":{},"order":6,"mode":0,"inputs":[{"localized_name":"Latent","name":"samples","type":"LATENT","link":60},{"localized_name":"vae","name":"vae","type":"VAE","link":13}],"outputs":[{"localized_name":"图像","name":"IMAGE","type":"IMAGE","slot_index":0,"links":[70,71]}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"VAEDecode"},"widgets_values":[]},{"id":8,"type":"LayeredDiffusionDecodeRGBA","pos":[1650,200],"size":[260,102],"flags":{},"order":8,"mode":0,"inputs":[{"localized_name":"样本","name":"samples","type":"LATENT","link":61},{"localized_name":"图像","name":"images","type":"IMAGE","link":71},{"localized_name":"sd版本","name":"sd_version","type":"COMBO","widget":{"name":"sd_version"},"link":null},{"localized_name":"子批量大小","name":"sub_batch_size","type":"INT","widget":{"name":"sub_batch_size"},"link":null}],"outputs":[{"localized_name":"图像","name":"IMAGE","type":"IMAGE","links":[80]}],"properties":{"cnr_id":"comfyui-layerdiffuse","ver":"b4f6a9e024064a4489f774a8b91049ce0b606ea3","Node name for S&R":"LayeredDiffusionDecodeRGBA"},"widgets_values":["SDXL",16]},{"id":9,"type":"SaveImage","pos":[2000,200],"size":[315,270],"flags":{},"order":7,"mode":0,"inputs":[{"localized_name":"图片","name":"images","type":"IMAGE","link":80},{"localized_name":"文件名前缀","name":"filename_prefix","type":"STRING","widget":{"name":"filename_prefix"},"link":null}],"outputs":[{"localized_name":"images","name":"images","type":"IMAGE","links":null}],"properties":{"cnr_id":"comfy-core","ver":"0.27.0","Node name for S&R":"SaveImage"},"widgets_values":["diorama-layer"]}],"links":[[10,1,0,2,0,"MODEL"],[11,1,1,3,0,"CLIP"],[12,1,1,4,0,"CLIP"],[13,1,2,7,1,"VAE"],[20,2,0,6,0,"MODEL"],[30,3,0,6,1,"CONDITIONING"],[40,4,0,6,2,"CONDITIONING"],[50,5,0,6,3,"LATENT"],[60,6,0,7,0,"LATENT"],[61,6,0,8,0,"LATENT"],[70,7,0,9,0,"IMAGE"],[71,7,0,8,1,"IMAGE"],[80,8,0,9,0,"IMAGE"]],"groups":[],"config":{},"extra":{},"version":0.4};

// ── Layer definitions ──
// Castiel 的原始感觉：「牧屋」— 白天躺在草地上看云，夜晚在暖灯下创造
// 不用风格标签。每个词都服务于场景内容。

const LAYERS = [
  // === Day (白天草原) ===
  {
    file: 'day-sky.png', depth: 0.15,
    positive: 'vast open sky with soft white clouds drifting, warm golden afternoon light, gentle gradient from pale blue to warm cream at horizon, the feeling of lying on grass looking up at infinite sky, peaceful and free, transparent background with sky only',
    negative: 'ground, grass, trees, mountains, buildings, people, animals, birds, sun disk, moon, hard edges, photorealism, 3D render, solid background, text, watermark, dark tones'
  },
  {
    file: 'day-mountains.png', depth: 0.35,
    positive: 'distant rolling hills on the horizon, soft grassland silhouettes, warm muted greens and golden browns, morning mist in valleys, quiet expansive landscape, atmospheric perspective, transparent background with hills only cut out at horizon line, no sky above',
    negative: 'sky, clouds, close-up grass, trees, buildings, animals, people, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'day-trees.png', depth: 0.55,
    positive: 'a few scattered trees and shrubs in middle distance grassland, warm afternoon light through leaves, dappled shadows, gentle breeze in grass, soft painterly feel, isolated on transparent background with trees and immediate ground only',
    negative: 'sky, distant mountains, buildings, animals, people, dense forest, photorealism, 3D render, solid background, text, watermark, dark night tones'
  },
  {
    file: 'day-meadow.png', depth: 0.80,
    positive: 'wild grassland meadow foreground, tall grass swaying, warm golden-green tones, soft afternoon light, a few tiny wildflowers, the feeling of sitting in the grass surrounded by meadow, transparent background with meadow vegetation only',
    negative: 'sky, horizon, trees, buildings, animals, people, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'day-fg.png', depth: 1.00,
    positive: 'extreme foreground framing at edges only, tall grass blades slightly out of focus very close to viewer, warm soft golden tones, creating depth through soft blur, center area fully transparent, only edge elements',
    negative: 'sky, horizon line, trees, buildings, animals, people, solid fill center, hard edges, photorealism, 3D render, text, watermark'
  },
  // === Night (夜晚木屋) ===
  {
    file: 'night-sky.png', depth: 0.15,
    positive: 'quiet deep night sky, scattered distant stars, soft moonlight glow, deep indigo and dark blue tones, a few wispy night clouds, vast peaceful darkness, looking up at stars from a cabin porch, transparent background with sky only',
    negative: 'ground, trees, cabin, buildings, moon disk, bright stars, daylight, sunrise, sunset, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'night-hills.png', depth: 0.35,
    positive: 'distant dark hills and fields under moonlight, soft dark silhouettes, deep muted blues and purple-greys, world sleeping under stars, quiet still landscape at night, transparent background with hills only cut out at horizon, no sky',
    negative: 'sky, stars, cabin, buildings, lights, trees, animals, people, daylight, hard edges, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'night-cabin.png', depth: 0.55,
    positive: 'a small cozy wooden cabin in middle distance, warm golden light glowing softly from windows, thin chimney smoke rising into night, the feeling of home and warmth in darkness, transparent background with cabin and its warm glow only',
    negative: 'sky, stars, distant hills, people, animals, modern buildings, city lights, daylight, photorealism, 3D render, solid background, text, watermark, multiple cabins'
  },
  {
    file: 'night-porch.png', depth: 0.80,
    positive: 'wooden cabin porch in foreground, warm amber lantern light casting gentle glow, wooden railing and floorboards with grain texture, sitting on the porch at night looking out, intimate and peaceful, transparent background with porch elements only',
    negative: 'sky, stars, entire cabin exterior, people, animals, daylight, cold blue tones, photorealism, 3D render, solid background, text, watermark'
  },
  {
    file: 'night-fg.png', depth: 1.00,
    positive: 'extreme foreground framing at edges, wooden railing corner or warm lantern glow at frame edge, slightly out of focus very close to viewer, warm amber and deep brown against darkness beyond, center area fully transparent',
    negative: 'sky, stars, entire cabin, people, animals, daylight, solid fill center, hard edges, photorealism, 3D render, text, watermark'
  }
];

// ── Convert template nodes array to API format (object keyed by node ID) ──
function toApiFormat(template) {
  const prompt = {};
  for (const node of template.nodes) {
    const inputs = {};
    for (const inp of node.inputs) {
      if (inp.link !== null && inp.link !== undefined) {
        // Find the link source
        const link = template.links.find(l => l[0] === inp.link);
        if (link) {
          inputs[inp.name] = [String(link[1]), link[3]]; // [source_node_id, output_slot]
        }
      } else if (node.widgets_values !== undefined) {
        // Widget value - find matching widget position
        const widgetIdx = node.inputs.filter(i => i.widget && !i.link).indexOf(inp);
        if (widgetIdx >= 0 && widgetIdx < node.widgets_values.length) {
          inputs[inp.name] = node.widgets_values[widgetIdx];
        }
      }
    }
    prompt[String(node.id)] = {
      inputs,
      class_type: node.type,
      _meta: { title: node.type }
    };
  }
  return prompt;
}

// ── Helpers ──
async function apiPost(endpoint, body) {
  const url = COMFYUI + endpoint;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`${resp.status}: ${text.substring(0, 200)}`);
  try { return JSON.parse(text); } catch { return text; }
}

async function apiGet(endpoint) {
  const resp = await fetch(COMFYUI + endpoint);
  return resp.json();
}

async function waitForPrompt(promptId, timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const history = await apiGet('/history/' + promptId);
    if (history[promptId] && history[promptId].outputs) {
      return history[promptId].outputs;
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('Timeout');
}

// ── Main ──
async function main() {
  console.log('[1/4] Checking ComfyUI...');
  const stats = await apiGet('/system_stats');
  console.log(`  ComfyUI ${stats.system.comfyui_version}, VRAM free: ${(stats.devices[0].vram_free/1024**3).toFixed(1)}GB`);

  // Build base API prompt
  const basePrompt = toApiFormat(TEMPLATE);
  console.log(`[2/4] API workflow ready (${Object.keys(basePrompt).length} nodes)`);

  if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });

  // Get initial file list to track new outputs
  const beforeFiles = new Set(fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png')));

  console.log(`[3/4] Generating ${LAYERS.length} layers...\n`);

  for (let i = 0; i < LAYERS.length; i++) {
    const layer = LAYERS[i];
    console.log(`[${i+1}/${LAYERS.length}] ${layer.file} (depth=${layer.depth})`);

    // Clone and set prompts
    const wf = JSON.parse(JSON.stringify(basePrompt));
    wf['3'].inputs.text = layer.positive;
    wf['4'].inputs.text = layer.negative;
    wf['6'].inputs.seed = Math.floor(Math.random() * 999999999999999);
    wf['9'].inputs.filename_prefix = layer.file.replace('.png', '');

    try {
      const result = await apiPost('/prompt', { prompt: wf, client_id: 'wh-diorama-v2' });
      console.log(`  Queued: ${result.prompt_id}`);
      const outputs = await waitForPrompt(result.prompt_id);
      const outputKeys = Object.keys(outputs);
      console.log(`  Done: ${outputKeys.join(', ')} (${outputs[outputKeys[0]]?.images?.length || 0} images)`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }

    if (i < LAYERS.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Find new files
  console.log('\n[4/4] Copying new files...');
  const afterFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png'));
  const newFiles = afterFiles.filter(f => !beforeFiles.has(f));

  if (newFiles.length === 0) {
    // Fallback: copy most recent files matching layer names
    console.log('  No new files detected, using most recent matching files...');
    for (const layer of LAYERS) {
      const prefix = layer.file.replace('.png', '');
      const matches = afterFiles
        .filter(f => f.startsWith(prefix))
        .sort((a, b) => fs.statSync(path.join(OUTPUT_DIR, b)).mtimeMs - fs.statSync(path.join(OUTPUT_DIR, a)).mtimeMs);
      if (matches.length > 0) {
        const src = path.join(OUTPUT_DIR, matches[0]);
        const dst = path.join(TARGET_DIR, layer.file);
        fs.copyFileSync(src, dst);
        console.log(`  ${layer.file} ← ${matches[0]} (${(fs.statSync(dst).size/1024).toFixed(0)}KB)`);
      }
    }
  } else {
    console.log(`  Found ${newFiles.length} new files`);
    // Map new files to layers by prefix
    for (const layer of LAYERS) {
      const prefix = layer.file.replace('.png', '');
      const match = newFiles.find(f => f.startsWith(prefix));
      if (match) {
        const src = path.join(OUTPUT_DIR, match);
        const dst = path.join(TARGET_DIR, layer.file);
        fs.copyFileSync(src, dst);
        console.log(`  ${layer.file} ← ${match} (${(fs.statSync(dst).size/1024).toFixed(0)}KB)`);
      }
    }
  }

  console.log('\nDone! Refresh browser to see results.');
}

main().catch(e => { console.error(e); process.exit(1); });
