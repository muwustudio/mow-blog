// ============================================================
// theme.ts — 主题检测、切换、localStorage 持久化、FOUC 防护
// ============================================================

const THEME_KEY = 'blog-theme';
const DAY_START = 6;
const NIGHT_START = 18;

type Theme = 'day' | 'night';

function detectTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'day' || saved === 'night') return saved;
  const hour = new Date().getHours();
  return hour >= DAY_START && hour < NIGHT_START ? 'day' : 'night';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.setAttribute('aria-label', theme === 'day' ? '切换到夜晚主题' : '切换到白天主题');
  }
}

export function initTheme(): void {
  const theme = detectTheme();
  applyTheme(theme);

  // 如果没有手动保存过，每 60 秒重新检测系统时间
  const hasSaved = localStorage.getItem(THEME_KEY);
  if (!hasSaved) {
    setInterval(() => {
      const current = detectTheme();
      const active = document.documentElement.getAttribute('data-theme') as Theme;
      if (current !== active) {
        applyTheme(current);
      }
    }, 60000);
  }
}

export function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as Theme;
  const next: Theme = current === 'day' ? 'night' : 'day';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  showToast(next === 'day' ? '☀️ 切换到白天模式' : '🌙 切换到夜晚模式');
}

function showToast(msg: string): void {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout((toast as any).__timeout);
  (toast as any).__timeout = setTimeout(() => toast.classList.remove('show'), 2000);
}

// 彩蛋："风花雪月" 四次点击
const EASTER_SEQUENCE = ['风', '花', '雪', '月'];
let easterIndex = 0;

export function initEasterEgg(): void {
  const btn = document.getElementById('easterEgg');
  if (!btn) return;
  btn.addEventListener('click', () => {
    easterIndex++;
    if (easterIndex >= EASTER_SEQUENCE.length) {
      easterIndex = 0;
      showToast('🌸 风花雪月 — 我在风花雪月里等你');
    }
  });
}

// 键盘快捷键
export function initKeyboard(): void {
  document.addEventListener('keydown', (e) => {
    // t = 切换主题
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      toggleTheme();
    }
    // / 或 Ctrl+K = 聚焦搜索
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      document.getElementById('searchInput')?.focus();
    }
    // Escape = 清除搜索
    if (e.key === 'Escape') {
      const input = document.getElementById('searchInput') as HTMLInputElement;
      if (input && document.activeElement === input) {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.blur();
      }
    }
  });
}
