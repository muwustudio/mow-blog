// ============================================================
// parallax.ts — 鼠标视差 + 草地生成 + 萤火虫生成
// ============================================================

export function initParallax(): void {
  // --- 草地生成 ---
  const grassLayer = document.querySelector('.grass-layer');
  if (grassLayer) {
    for (let i = 0; i < 80; i++) {
      const blade = document.createElement('div');
      blade.className = 'grass-blade';
      blade.style.setProperty('--sway-dur', `${2.5 + Math.random() * 4}s`);
      blade.style.setProperty('--sway-delay', `${Math.random() * 5}s`);
      blade.style.setProperty('--skew-a', `${-3 + Math.random() * 6}deg`);
      blade.style.setProperty('--skew-b', `${-3 + Math.random() * 6}deg`);
      blade.style.setProperty('--skew-c', `${-3 + Math.random() * 6}deg`);
      blade.style.setProperty('--skew-d', `${-3 + Math.random() * 6}deg`);
      blade.style.setProperty('--rot-a', `${-2 + Math.random() * 4}deg`);
      blade.style.setProperty('--rot-b', `${-2 + Math.random() * 4}deg`);
      blade.style.setProperty('--rot-c', `${-2 + Math.random() * 4}deg`);
      blade.style.setProperty('--rot-d', `${-2 + Math.random() * 4}deg`);
      blade.style.left = `${Math.random() * 100}%`;
      blade.style.width = `${3 + Math.random() * 8}px`;
      blade.style.height = `${40 + Math.random() * 80}px`;
      grassLayer.appendChild(blade);
    }
  }

  // --- 萤火虫生成 ---
  const fireflyLayer = document.querySelector('.firefly-layer');
  if (fireflyLayer) {
    for (let i = 0; i < 15; i++) {
      const ff = document.createElement('div');
      ff.className = 'firefly';
      ff.style.setProperty('--ff-dur', `${4 + Math.random() * 8}s`);
      ff.style.setProperty('--ff-delay', `${Math.random() * 10}s`);
      ff.style.setProperty('--ff-dx1', `${-40 + Math.random() * 80}px`);
      ff.style.setProperty('--ff-dy1', `${-60 - Math.random() * 40}px`);
      ff.style.setProperty('--ff-dx2', `${-30 + Math.random() * 60}px`);
      ff.style.setProperty('--ff-dy2', `${-100 - Math.random() * 40}px`);
      ff.style.setProperty('--ff-dx3', `${-20 + Math.random() * 40}px`);
      ff.style.setProperty('--ff-dy3', `${-130 - Math.random() * 30}px`);
      ff.style.left = `${10 + Math.random() * 80}%`;
      ff.style.top = `${20 + Math.random() * 60}%`;
      fireflyLayer.appendChild(ff);
    }
  }

  // --- 鼠标视差 ---
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // 移动端陀螺仪回退
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetX = Math.max(-1, Math.min(1, (e.gamma || 0) / 30));
        targetY = Math.max(-1, Math.min(1, (e.beta || 0) / 30));
      }
    });
  }

  function animate() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    const bgDay = document.querySelector('.bg-day') as HTMLElement;
    const bgNight = document.querySelector('.bg-night') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    const grass = document.querySelector('.grass-layer') as HTMLElement;

    if (bgDay) bgDay.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 20}px, 0)`;
    if (bgNight) bgNight.style.transform = `translate3d(${mouseX * 20}px, ${mouseY * 20}px, 0)`;
    if (content) content.style.transform = `translate3d(${mouseX * 8}px, ${mouseY * 8}px, 0)`;
    if (grass) grass.style.transform = `translate3d(${mouseX * 15}px, 0, 0)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
