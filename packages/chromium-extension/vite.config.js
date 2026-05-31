import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { interceptorScriptsPlugin } from './plugins';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    interceptorScriptsPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': fileURLToPath(new URL('../..', import.meta.url)),
    },
    dedupe: ['monaco-editor', 'react', 'react-dom'],
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  build: {
    rollupOptions: {
      input: {
        popup: `${root}/index.html`,
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name?.startsWith('content-')) {
            return 'content/[name].js';
          }

          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
