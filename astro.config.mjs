import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import sitemap from "@astrojs/sitemap";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
// import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "server", // "static",
  // site: "https://trollhag.com",
  adapter: awsAmplify(),
  integrations: [
    sitemap({
      serialize(item) {
        if (/frontpage/.test(item.url)) {
          return undefined;
        }
        return item
      }
    }),
    tailwind(),
    alpinejs(),
  ],
  experimental: {
    svg: true,
  },
});
