import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Allows the built dist/index.html to work both over HTTP(S) and when opened
 * directly via file:// in a browser (removes ES module CORS restrictions on file://).
 */
function fileProtocolSupport() {
  return {
    name: 'file-protocol-support',
    apply: 'build',
    transformIndexHtml(html) {
      return html
        .replace(/<script data-root-file-redirect>[\s\S]*?<\/script>\s*/i, '')
        .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>')
        .replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, '<link rel="stylesheet" href="$1">');
    },
  };
}

export default defineConfig({
  plugins: [react(), fileProtocolSupport()],
  base: './',
  build: {
    assetsInlineLimit: 100000,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
