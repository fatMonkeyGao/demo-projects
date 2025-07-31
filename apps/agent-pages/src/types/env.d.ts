/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 应用配置
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string

  // API 配置
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string

  // 功能开关
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_HOT_RELOAD: string

  // 代理配置
  readonly VITE_MAX_AGENTS: string
  readonly VITE_AUTO_START_AGENTS: string

  // 主题配置
  readonly VITE_THEME: string
  readonly VITE_PRIMARY_COLOR: string

  // 开发工具
  readonly VITE_ENABLE_DEVTOOLS?: string
  readonly VITE_ENABLE_LOGGING?: string

  // 性能优化
  readonly VITE_ENABLE_COMPRESSION?: string
  readonly VITE_ENABLE_CACHE?: string

  // 测试配置
  readonly VITE_ENABLE_MOCK?: string
  readonly VITE_ENABLE_TEST_LOGGING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 