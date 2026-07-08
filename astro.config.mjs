import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://mow-blog.pages.dev',
  build: {
    assets: 'assets',
  },
});
