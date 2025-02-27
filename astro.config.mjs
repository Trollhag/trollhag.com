import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
// import vercel from "@astrojs/vercel/serverless";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://trollhag.com",

  integrations: [
    sitemap(),
    alpinejs(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: true,
  },
});
