import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reportsDirectory: './coverage',
        reporter: ['text', 'lcov', 'html'],
        all: true,
        exclude: [
          'node_modules/',
          'dist/',
          'e2e/',
          'tests/helpers/', // eventueel extra folders
        ],
      },
    },
  }),
);
