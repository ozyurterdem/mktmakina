// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mktmakina.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: {
          tr: 'tr-TR',
          en: 'en-US',
          de: 'de-DE',
          ar: 'ar-SA',
        },
      },
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'de', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-sans',
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700, 800, 900],
      subsets: ['latin', 'latin-ext'],
    },
    {
      name: 'Space Grotesk',
      cssVariable: '--font-heading',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      subsets: ['latin', 'latin-ext'],
    },
    {
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
