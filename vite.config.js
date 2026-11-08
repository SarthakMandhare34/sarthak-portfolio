/**
 * @file vite.config.js
 * @description Vite 8 Configuration for Pure Vanilla HTML/CSS/JavaScript Portfolio
 * 
 * PURPOSE:
 * Configures Vite to serve and build the application using standard web technologies:
 * 1. tailwindcss(): Uses the official Tailwind CSS v4 Vite integration to scan
 *    all HTML and JavaScript files for utility classes and compile them into CSS.
 * 2. server: Configures the local development server to run on port 3000 across all
 *    network interfaces (0.0.0.0) with Hot Module Replacement (HMR) enabled.
 */

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  // ──────────────── PLUGINS ────────────────
  // Tailwind v4 Vite plugin compiles modern utility classes directly from HTML & JS
  plugins: [tailwindcss()],

  // ──────────────── DEV SERVER CONFIGURATION ────────────────
  server: {
    // Port 3000 for standard local development
    port: 3000,
    // Host 0.0.0.0 allows testing on local area network devices (phones, tablets)
    host: '0.0.0.0',
    // Disable intrusive full-screen error overlays for a cleaner development experience
    hmr: {
      overlay: false,
    },
  },
});
