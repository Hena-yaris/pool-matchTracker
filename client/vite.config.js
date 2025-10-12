import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // ⭐️ PWA Plugin Configuration ⭐️
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      injectRegister: "auto", // Automatically inject the service worker registration code

      // ⭐️ REMOVED CUSTOM FILENAME: We will use the plugin's default 'manifest.webmanifest'
      // filename: "site.webmanifest",

      // ⭐️ NEW OPTION: Instruct the plugin to copy all static assets (including icons)
      // from public/favicon/ to the root of the dist folder,
      // where the manifest file is generated. This simplifies path resolution.
      includeAssets: [
        "/favicon/web-app-manifest-192x192.png",
        "/favicon/web-app-manifest-512x512.png",
        "/favicon/apple-touch-icon.png",
        "/favicon/favicon.ico",
        "/favicon/favicon.svg",
      ],

      // 1. Manifest Definition (The brain of your PWA)
      manifest: {
        name: "RackUp: Pool Match Tracker",
        short_name: "RackUp",
        description: "A stylish, responsive pool match score tracker.",
        theme_color: "#1f2937", // Dark gray/Blue (matches app background)
        background_color: "#111827", // Even darker for splash screens
        display: "standalone",
        icons: [
          // ⭐️ PATHS ARE NOW ROOT-RELATIVE because `includeAssets` copies them to /dist/ ⭐️
          {
            src: "/web-app-manifest-192x192.png", // Path changed from /favicon/...
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/web-app-manifest-512x512.png", // Path changed from /favicon/...
            sizes: "512x512",
            type: "image/png",
          },
          // Maskable icon path also simplified
          {
            src: "/apple-touch-icon.png", // Path changed from /favicon/...
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      // 2. Service Worker Configuration (Handles caching and offline access)
      workbox: {
        // Cache external dependencies like Google fonts and Firebase SDKs if used
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.googleapis.com" ||
              url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
            },
          },
        ],
      },
    }),
  ],
});
