// @ts-check
import { defineConfig, sharpImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), sitemap(), react()],

  site: "https://14bryanespinoza.github.io/deli-hots/",
  base: "/deli-hots/",
  build: { assets: "assets" },

  image: {
    domains: ["devsapihub.com"],
    service: sharpImageService({
      avif: { effort: 4, chromaSubsampling: "4:2:0" },
      webp: { effort: 5 },
      jpeg: { mozjpeg: true },
      png: { compressionLevel: 9 },
    }),
  },
});
