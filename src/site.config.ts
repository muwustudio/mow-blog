// ============================================================
// 全站配置集中管理
// ★ 这是全站唯一需要改"数据"的地方
// 所有组件从这里读取配置，不硬编码文字/链接
// ============================================================

export const SITE = {
  title: '牧羊人的博客',
  subtitle: "Shepherd's Blog",
  description: '一个游戏开发者的个人空间 — UE5 C++ 游戏开发、图形学、架构设计',
  url: 'https://mow-blog.pages.dev',
  lang: 'zh-CN',
  ogImage: 'https://mow-blog.pages.dev/assets/og-image.jpg',
};

export const NAV = [
  { label: '文章', href: '/', icon: 'book' },
  { label: '项目', href: '/projects', icon: 'folder' },
  { label: '标签', href: '/tags', icon: 'tag' },
  { label: '关于', href: '/about', icon: 'user' },
];

export const SOCIAL = [
  { label: 'B站', href: '#', icon: 'tv' },
  { label: '联系', href: '#', icon: 'mail' },
  { label: 'GitHub', href: 'https://github.com/2949078758', icon: 'github' },
];

export const HERO = {
  greeting: '一个游戏开发者的个人空间',
  headline: '在草地与木屋之间\n写下代码与思考',
  bio: 'UE5 C++ 游戏开发 · 图形学 · 架构设计',
  bioExtended: '白天在草地上阅读，夜晚在小木屋里编码',
  ctaLabel: '浏览文章',
  ctaHref: '#postsSection',
};

export const FOOTER = {
  techStack: 'Astro + Cloudflare Pages',
  sceneDesign: 'mu01 / mu02',
  whisper: '我在风花雪月里等你',
  since: 2026,
};

// 主题时间段（可调）
export const THEME = {
  dayStart: 6,    // 早上 6 点切换为白天
  nightStart: 18, // 晚上 6 点切换为夜晚
};
