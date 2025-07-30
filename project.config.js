/**
 * 项目统一配置文件
 * 用于管理所有子项目的配置规范
 */

module.exports = {
  // Tailwind CSS 配置
  tailwind: {
    content: [
      "./apps/web/index.html",
      "./apps/web/src/**/*.{vue,js,ts,jsx,tsx}",
      "./packages/components/src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eff6ff',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          }
        }
      },
    },
    plugins: [],
  },

  // PostCSS 配置
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // TypeScript 路径映射
  typescript: {
    paths: {
      "@/*": ["./packages/*/src"],
      "@shared/*": ["./packages/shared/src"],
      "@components/*": ["./packages/components/src"],
    },
  },

  // Vite 别名配置
  vite: {
    alias: {
      "@shared": "packages/shared/src",
      "@components": "packages/components/src",
    },
  },
} 