import { CozeAPI } from "@coze/api";
import { cozeConfig, fireConfig } from "../config";

/**
 * Coze AI 服务
 */
class CozeService {
  private apiClient: CozeAPI;

  constructor() {
    this.apiClient = new CozeAPI({
      token: cozeConfig.token,
      baseURL: cozeConfig.baseURL,
    });
  }

  /**
   * 执行工作流
   */
  async runWorkflow(input: string, workflowId?: string): Promise<any> {
    try {
      const response = await this.apiClient.workflows.runs.create({
        workflow_id: workflowId || "7522658628480155690",
        parameters: {
          input,
        },
      });
      return response;
    } catch (error) {
      console.error("Coze workflow execution failed:", error);
      throw error;
    }
  }
}

/**
 * Fire AI 服务
 */
class FireService {
  private apiKey: string;

  constructor() {
    this.apiKey = fireConfig.apiKey;
  }

  /**
   * 获取 API 密钥信息
   */
  getApiKey(): string {
    return this.apiKey;
  }

  /**
   * 验证 API 密钥
   */
  validateApiKey(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  // 这里可以添加更多 Fire AI 相关的方法
}

// 导出服务实例
export const cozeService = new CozeService();
export const fireService = new FireService();
