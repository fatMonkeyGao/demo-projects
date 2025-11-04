import zookeeper from "node-zookeeper-client";
import { dubboConfig } from "../config";

/**
 * Dubbo 服务调用选项
 */
export interface DubboInvokeOptions {
  interfaceName: string;
  methodName: string;
  args?: any[];
  version?: string;
  group?: string;
}

/**
 * Dubbo 服务客户端
 * 用于连接和调用 Dubbo 服务
 *
 * 注意：此实现提供了基础的 Dubbo 客户端框架
 * 实际使用时需要根据具体的 dubbo2.js 或 dubbo 客户端库的 API 进行调整
 */
export class DubboService {
  private zkClient: zookeeper.Client | null = null;
  private isConnected = false;
  private dubboClient: any = null; // 存储实际的 dubbo 客户端实例

  /**
   * 初始化 Dubbo 客户端
   */
  async initialize(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    try {
      // 创建 Zookeeper 客户端
      this.zkClient = zookeeper.createClient(dubboConfig.registry.address);

      // 连接 Zookeeper
      await new Promise<void>((resolve, reject) => {
        if (!this.zkClient) {
          reject(new Error("Zookeeper client not initialized"));
          return;
        }

        // 设置连接超时
        const timeout = setTimeout(() => {
          reject(new Error("Zookeeper 连接超时"));
        }, 10000); // 10秒超时

        this.zkClient.once("connected", () => {
          clearTimeout(timeout);
          console.log("✅ Zookeeper 连接成功");
          resolve();
        });

        // 监听状态变化来处理错误
        this.zkClient.once("state", (state) => {
          if (state === zookeeper.State.DISCONNECTED) {
            clearTimeout(timeout);
            reject(new Error("Zookeeper 连接已断开"));
          }
        });

        // 使用类型断言处理 error 事件（类型定义可能不完整）
        (this.zkClient as any).on?.("error", (error: any) => {
          clearTimeout(timeout);
          console.error("❌ Zookeeper 连接失败:", error);
          reject(error);
        });

        this.zkClient.connect();
      });

      // 初始化 Dubbo 客户端
      // 注意：这里需要根据实际使用的 dubbo 客户端库进行配置
      // 示例使用 dubbo2.js（需要根据实际 API 调整）
      try {
        const { Dubbo } = await import("dubbo2.js");
        // dubbo2.js 配置（根据实际 API 调整）
        this.dubboClient = new Dubbo({
          application: { name: dubboConfig.application.name },
          register: dubboConfig.registry.address,
          service: [],
          // dubboSetting 的属性需要根据 dubbo2.js 的实际类型定义调整
          dubboSetting: {
            retries: dubboConfig.consumer?.retries || 2,
            // timeout 可能不在 Setting 类型中，使用类型断言或移除
          } as any,
        });
      } catch (error) {
        console.warn("⚠️  Dubbo2.js 未正确安装或配置，请检查依赖和 API");
        // 可以在这里添加其他 dubbo 客户端库的初始化逻辑
      }

      this.isConnected = true;
      console.log("✅ Dubbo 客户端初始化成功");
    } catch (error) {
      console.error("❌ Dubbo 客户端初始化失败:", error);
      throw error;
    }
  }

  /**
   * 调用 Dubbo 服务
   * @param options 调用选项
   */
  async invoke<T = any>(options: DubboInvokeOptions): Promise<T> {
    const { interfaceName, methodName, args = [], version, group } = options;

    if (!this.isConnected) {
      await this.initialize();
    }

    if (!this.dubboClient) {
      throw new Error(
        "Dubbo 客户端未初始化，请检查 dubbo 客户端库是否正确安装"
      );
    }

    try {
      // 使用 dubbo2.js 调用服务
      // 注意：这里需要根据实际的 dubbo2.js 或使用的 dubbo 客户端库的 API 进行调整
      if (
        this.dubboClient &&
        typeof this.dubboClient.proxyService === "function"
      ) {
        const serviceProxy = this.dubboClient.proxyService({
          dubboInterface: interfaceName,
          methods: {
            [methodName]: async (...params: any[]) => {
              // 实际的 dubbo 调用逻辑
              // 这里需要根据具体的 dubbo 客户端库实现
              return params;
            },
          },
          version,
          group,
        });

        return await (serviceProxy as any)[methodName](...args);
      } else {
        throw new Error(
          "Dubbo 客户端不支持 proxyService 方法，请检查客户端库版本"
        );
      }
    } catch (error) {
      console.error("Dubbo 服务调用失败:", {
        interfaceName,
        methodName,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * 便捷方法：调用 Dubbo 服务（简化参数）
   */
  async call<T = any>(
    interfaceName: string,
    methodName: string,
    args?: any[],
    version?: string,
    group?: string
  ): Promise<T> {
    return this.invoke<T>({
      interfaceName,
      methodName,
      args,
      version,
      group,
    });
  }

  /**
   * 关闭连接
   */
  async close(): Promise<void> {
    if (this.zkClient) {
      this.zkClient.close();
      this.zkClient = null;
    }

    if (this.dubboClient && typeof this.dubboClient.close === "function") {
      await this.dubboClient.close();
    }

    this.dubboClient = null;
    this.isConnected = false;
    console.log("✅ Dubbo 客户端已关闭");
  }

  /**
   * 检查连接状态
   */
  isReady(): boolean {
    return this.isConnected && this.dubboClient !== null;
  }

  /**
   * 获取 Zookeeper 客户端（用于高级操作）
   */
  getZookeeperClient(): zookeeper.Client | null {
    return this.zkClient;
  }
}

// 导出单例实例
export const dubboService = new DubboService();
