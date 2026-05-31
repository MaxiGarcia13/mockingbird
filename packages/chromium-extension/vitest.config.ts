import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
});
