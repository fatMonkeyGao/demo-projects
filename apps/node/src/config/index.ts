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

export interface SessionConfig {
  key: string;
  maxAge: number;
  autoCommit: boolean;
  overwrite: boolean;
  httpOnly: boolean;
  signed: boolean;
  rolling: boolean;
  renew: boolean;
}

export interface DubboConfig {
  application: {
    name: string;
  };
  registry: {
    address: string;
    protocol?: string;
  };
  consumer?: {
    timeout?: number;
    retries?: number;
  };
}

export interface RemoteUserServiceConfig {
  interfaceName: string;
  version?: string;
  group?: string;
}

// 延迟初始化配置对象，确保在访问时才读取 process.env
// 这样可以确保 dotenv 已经加载完成

const getConfig = (): AppConfig => ({
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api",
});

const getCozeConfig = (): CozeConfig => ({
  token:
    process.env.COZE_TOKEN ||
    "cztei_hqiuUkSbmpWnlbS6v5B5lkJ0KkFUlmYidqN2f4jrXdYYuga8UVQTJa6hLloVk0Ws0",
  baseURL: process.env.COZE_BASE_URL || "https://api.coze.cn",
});

const getFireConfig = (): FireConfig => ({
  apiKey: process.env.FIRE_API_KEY || "8870ac5b-05a7-4136-a5b2-666497e72b83",
});

const getSessionConfig = (): SessionConfig => ({
  key: process.env.SESSION_KEY || "koa:sess",
  maxAge: Number(process.env.SESSION_MAX_AGE) || 86400000, // 24小时，单位毫秒
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
});

const getDubboConfig = (): DubboConfig => ({
  application: {
    name: process.env.DUBBO_APPLICATION_NAME || "demo-node-app",
  },
  registry: {
    address: process.env.DUBBO_REGISTRY_ADDRESS || "127.0.0.1:2181",
    protocol: process.env.DUBBO_REGISTRY_PROTOCOL || "zookeeper",
  },
  consumer: {
    timeout: Number(process.env.DUBBO_CONSUMER_TIMEOUT) || 6000,
    retries: Number(process.env.DUBBO_CONSUMER_RETRIES) || 2,
  },
});

const getRemoteUserServiceConfig = (): RemoteUserServiceConfig => ({
  interfaceName: process.env.REMOTE_USER_SERVICE_INTERFACE || "",
  version: process.env.REMOTE_USER_SERVICE_VERSION || "1.0.0",
  group: process.env.REMOTE_USER_SERVICE_GROUP || "",
});

// 使用 Proxy 实现延迟初始化，保持原有的 API 接口
// 支持普通的属性访问以及 Object.keys()、Object.entries() 等方法
const createConfigProxy = <T extends object>(getConfigFn: () => T): T => {
  return new Proxy({} as T, {
    get(_target, prop) {
      const config = getConfigFn();
      const value = config[prop as keyof T];
      // 如果访问的是对象方法（如 toString、valueOf 等），需要特殊处理
      if (typeof value === "function" && prop !== "constructor") {
        return value.bind(config);
      }
      return value;
    },
    ownKeys(_target) {
      return Reflect.ownKeys(getConfigFn());
    },
    getOwnPropertyDescriptor(_target, prop) {
      const config = getConfigFn();
      return Reflect.getOwnPropertyDescriptor(config, prop);
    },
    has(_target, prop) {
      return prop in getConfigFn();
    },
  });
};

export const config = createConfigProxy(getConfig);
export const cozeConfig = createConfigProxy(getCozeConfig);
export const fireConfig = createConfigProxy(getFireConfig);
export const sessionConfig = createConfigProxy(getSessionConfig);
export const dubboConfig = createConfigProxy(getDubboConfig);
export const remoteUserServiceConfig = createConfigProxy(
  getRemoteUserServiceConfig
);

// 导出环境判断工具函数
export const isDevelopment = () => getConfig().nodeEnv === "development";
export const isProduction = () => getConfig().nodeEnv === "production";
export const isTest = () => getConfig().nodeEnv === "test";
