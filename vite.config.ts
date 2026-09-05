import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/etoolbox/' : '/',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    // Proxy WebSocket connections for Poker Planning habit-hooks-disable non-essential-comment
    proxy: {
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
    // Node.js polyfills for browser compatibility (required by httpsnippet in the cURL converter) habit-hooks-disable non-essential-comment
    alias: {
      path: 'path-browserify',
      url: 'url',
      stream: 'stream-browserify',
      util: path.resolve(__dirname, 'src/stubs/util.ts'),
      buffer: 'buffer',
      querystring: 'querystring-es3',
      string_decoder: 'string_decoder',
      fs: path.resolve(__dirname, 'src/stubs/fs.ts'),
    },
  },
  define: {
    'process.env': JSON.stringify({}),
    'process.version': JSON.stringify(''),
    'process.platform': JSON.stringify('browser'),
    'process.browser': JSON.stringify(true),
    global: 'globalThis',
  },
}));
