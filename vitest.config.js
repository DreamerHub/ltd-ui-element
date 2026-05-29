import { resolve } from 'path'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/.claude/**', '**/.git/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/tests/**',
        '**/*.spec.js',
        '**/*.test.js',
        '**/*.config.js',
        'docs/',
        'scripts/'
      ]
    }
  },
  resolve: {
    alias: {
      '@ltd-ui/core': resolve(__dirname, 'packages/core/src/index.js'),
      '@ltd-ui/button': resolve(__dirname, 'packages/components/button/src/index.js'),
      '@ltd-ui/table-pro': resolve(__dirname, 'packages/element-wrappers/table-pro/src/index.js')
    }
  }
})
