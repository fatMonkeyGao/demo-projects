import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages'),
      '@shared': resolve(__dirname, './packages/shared/src')
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      external: ['vue']
    }
  }
}) 