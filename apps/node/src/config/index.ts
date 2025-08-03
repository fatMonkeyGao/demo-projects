export interface AppConfig {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
}

export interface DatabaseConfig {
  // 这里可以添加数据库配置
  // 暂时使用内存存储
}

export interface CozeConfig {
  token: string;
  baseURL: string;
}

export interface FireConfig {
  apiKey: string;
}

export const config: AppConfig = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api",
};

export const cozeConfig: CozeConfig = {
  token:
    process.env.COZE_TOKEN ||
    "cztei_hqiuUkSbmpWnlbS6v5B5lkJ0KkFUlmYidqN2f4jrXdYYuga8UVQTJa6hLloVk0Ws0",
  baseURL: process.env.COZE_BASE_URL || "https://api.coze.cn",
};

export const fireConfig: FireConfig = {
  apiKey: process.env.FIRE_API_KEY || "8870ac5b-05a7-4136-a5b2-666497e72b83",
};

// 导出环境判断工具函数
export const isDevelopment = () => config.nodeEnv === "development";
export const isProduction = () => config.nodeEnv === "production";
export const isTest = () => config.nodeEnv === "test";
