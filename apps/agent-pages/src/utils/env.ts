/**
 * 环境变量工具函数
 */

// 获取环境变量，带类型转换
export const getEnv = {
  // 应用配置
  appTitle: () => import.meta.env.VITE_APP_TITLE || 'Agent Pages',
  appVersion: () => import.meta.env.VITE_APP_VERSION || '1.0.0',
  appDescription: () => import.meta.env.VITE_APP_DESCRIPTION || '智能代理管理系统',

  // API 配置
  apiBaseUrl: () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  apiTimeout: () => parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),

  // 功能开关
  enableAnalytics: () => import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebug: () => import.meta.env.VITE_ENABLE_DEBUG === 'true',
  enableNotifications: () => import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  enableHotReload: () => import.meta.env.VITE_ENABLE_HOT_RELOAD === 'true',

  // 代理配置
  maxAgents: () => parseInt(import.meta.env.VITE_MAX_AGENTS || '10'),
  autoStartAgents: () => import.meta.env.VITE_AUTO_START_AGENTS === 'true',

  // 主题配置
  theme: () => import.meta.env.VITE_THEME || 'light',
  primaryColor: () => import.meta.env.VITE_PRIMARY_COLOR || '#3B82F6',

  // 开发工具
  enableDevtools: () => import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  enableLogging: () => import.meta.env.VITE_ENABLE_LOGGING === 'true',

  // 性能优化
  enableCompression: () => import.meta.env.VITE_ENABLE_COMPRESSION === 'true',
  enableCache: () => import.meta.env.VITE_ENABLE_CACHE === 'true',

  // 测试配置
  enableMock: () => import.meta.env.VITE_ENABLE_MOCK === 'true',
  enableTestLogging: () => import.meta.env.VITE_ENABLE_TEST_LOGGING === 'true',
}

// 获取当前环境
export const getEnvironment = () => {
  return import.meta.env.MODE || 'development'
}

// 检查是否为开发环境
export const isDevelopment = () => {
  return getEnvironment() === 'development'
}

// 检查是否为生产环境
export const isProduction = () => {
  return getEnvironment() === 'production'
}

// 检查是否为测试环境
export const isTest = () => {
  return getEnvironment() === 'test'
}

// 获取所有环境变量（用于调试）
export const getAllEnvVars = () => {
  return {
    mode: getEnvironment(),
    app: {
      title: getEnv.appTitle(),
      version: getEnv.appVersion(),
      description: getEnv.appDescription(),
    },
    api: {
      baseUrl: getEnv.apiBaseUrl(),
      timeout: getEnv.apiTimeout(),
    },
    features: {
      analytics: getEnv.enableAnalytics(),
      debug: getEnv.enableDebug(),
      notifications: getEnv.enableNotifications(),
      hotReload: getEnv.enableHotReload(),
    },
    agents: {
      maxAgents: getEnv.maxAgents(),
      autoStart: getEnv.autoStartAgents(),
    },
    theme: {
      theme: getEnv.theme(),
      primaryColor: getEnv.primaryColor(),
    },
  }
} 