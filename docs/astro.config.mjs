import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'rose-pine',
      wrap: true
    }
  },
  integrations: [tailwind(), mdx()]
});
