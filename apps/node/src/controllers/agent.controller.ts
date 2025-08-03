import type { AppContext, ApiResponse } from "../types";
import { cozeService, fireService } from "../services";
import { HTTP_STATUS } from "../constants";

/**
 * AI Agent 控制器
 */
export class AgentController {
  /**
   * 执行 Coze 工作流
   */
  static async runCozeWorkflow(ctx: AppContext): Promise<void> {
    const { input, workflowId } = ctx.request.body as {
      input: string;
      workflowId?: string;
    };

    if (!input) {
      const response: ApiResponse = {
        success: false,
        error: "输入内容不能为空",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    const result = await cozeService.runWorkflow(input, workflowId);

    const response: ApiResponse = {
      success: true,
      data: result,
    };

    ctx.body = response;
  }

  /**
   * 获取 Fire AI 配置信息
   */
  static async getFireConfig(ctx: AppContext): Promise<void> {
    const isValid = fireService.validateApiKey();

    const response: ApiResponse = {
      success: true,
      data: {
        apiKeyValid: isValid,
        status: isValid ? "configured" : "not configured",
      },
    };

    ctx.body = response;
  }

  /**
   * 测试 Fire AI 连接
   */
  static async testFireConnection(ctx: AppContext): Promise<void> {
    const isValid = fireService.validateApiKey();

    if (!isValid) {
      const response: ApiResponse = {
        success: false,
        error: "Fire AI API 密钥未配置",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        message: "Fire AI 连接正常",
        apiKey: fireService.getApiKey().substring(0, 8) + "...",
      },
    };

    ctx.body = response;
  }
}
