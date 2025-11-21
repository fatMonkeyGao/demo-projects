import type { AppContext, ApiResponse } from "../types";
import { cozeService, fireService, langchainService } from "../services";
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

  /**
   * LangChain 对话
   */
  static async langchainChat(ctx: AppContext): Promise<void> {
    const { input, systemPrompt } = ctx.request.body as {
      input: string;
      systemPrompt?: string;
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

    if (!langchainService.validateConfig()) {
      const response: ApiResponse = {
        success: false,
        error: "LangChain API 密钥未配置",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    try {
      const result = await langchainService.chat(input, systemPrompt);

      const response: ApiResponse = {
        success: true,
        data: {
          result,
        },
      };

      ctx.body = response;
    } catch (error) {
      console.error("LangChain chat error:", error);
      const response: ApiResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "LangChain 对话失败",
      };
      ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      ctx.body = response;
    }
  }

  /**
   * LangChain 流式对话
   */
  static async langchainChatStream(ctx: AppContext): Promise<void> {
    const { input, systemPrompt } = ctx.request.body as {
      input: string;
      systemPrompt?: string;
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

    if (!langchainService.validateConfig()) {
      const response: ApiResponse = {
        success: false,
        error: "LangChain API 密钥未配置",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    // 设置流式响应头
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.set("X-Accel-Buffering", "no"); // 禁用 Nginx 缓冲

    try {
      // 获取流式响应
      const stream = await langchainService.chatStream(input, systemPrompt);

      // 将响应流直接传递给客户端
      ctx.body = stream;
    } catch (error) {
      console.error("LangChain chat stream error:", error);
      ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      ctx.body = { error: "LangChain 流式对话失败" };
    }
  }

  /**
   * LangChain 使用模板对话
   */
  static async langchainChatWithTemplate(ctx: AppContext): Promise<void> {
    const { template, variables } = ctx.request.body as {
      template: string;
      variables?: Record<string, any>;
    };

    if (!template) {
      const response: ApiResponse = {
        success: false,
        error: "模板不能为空",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    if (!langchainService.validateConfig()) {
      const response: ApiResponse = {
        success: false,
        error: "LangChain API 密钥未配置",
      };
      ctx.status = HTTP_STATUS.BAD_REQUEST;
      ctx.body = response;
      return;
    }

    try {
      const result = await langchainService.chatWithTemplate(
        template,
        variables || {}
      );

      const response: ApiResponse = {
        success: true,
        data: {
          result,
        },
      };

      ctx.body = response;
    } catch (error) {
      console.error("LangChain chat with template error:", error);
      const response: ApiResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "LangChain 模板对话失败",
      };
      ctx.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
      ctx.body = response;
    }
  }

  /**
   * 获取 LangChain 配置信息
   */
  static async getLangChainConfig(ctx: AppContext): Promise<void> {
    const isValid = langchainService.validateConfig();

    const response: ApiResponse = {
      success: true,
      data: {
        apiKeyValid: isValid,
        status: isValid ? "configured" : "not configured",
      },
    };

    ctx.body = response;
  }
}
