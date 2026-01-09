import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/web-toolbox/' : '/',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    proxy: {
      // Proxy WebSocket connections for Poker Planning
      '/ws': {
        target: 'wss://ws-poker-planning.onrender.com',
        changeOrigin: true,
        ws: true,
        secure: true,
      },
    },
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      // Node.js polyfills for browser compatibility
      path: 'path-browserify',
      url: 'url',
      stream: 'stream-browserify',
      util: path.resolve(__dirname, 'src/stubs/util.ts'),
      buffer: 'buffer',
      querystring: 'querystring-es3',
      string_decoder: 'string_decoder',
      // Stub fs module for browser
      fs: path.resolve(__dirname, 'src/stubs/fs.ts'),
    },
  },
  define: {
    // Required for some Node.js packages in browser
    'process.env': JSON.stringify({}),
    'process.version': JSON.stringify(''),
    'process.platform': JSON.stringify('browser'),
    'process.browser': JSON.stringify(true),
    global: 'globalThis',
  },
}));
