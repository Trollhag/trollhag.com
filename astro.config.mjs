/* eslint-disable import/no-default-export */
import alpinejs from '@astrojs/alpinejs'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://trollhag.com',
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
  },
  integrations: [sitemap(), alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: true,
  },
})
