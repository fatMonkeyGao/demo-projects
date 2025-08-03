import type { AppContext, ApiResponse } from "../types";

/**
 * 应用控制器
 */
export class AppController {
  /**
   * 应用健康检查
   */
  static async health(ctx: AppContext): Promise<void> {
    const response: ApiResponse = {
      success: true,
      data: {
        message: "Demo Projects API",
        timestamp: new Date().toISOString(),
        version: "2.0.0",
        status: "healthy",
      },
    };

    ctx.body = response;
  }

  /**
   * API 信息
   */
  static async apiInfo(ctx: AppContext): Promise<void> {
    const response: ApiResponse = {
      success: true,
      data: {
        name: "Demo Projects API",
        version: "2.0.0",
        description: "基于 Koa 的现代化 Node.js API",
        endpoints: {
          health: "GET /",
          users: "GET /api/users",
          userById: "GET /api/users/:id",
          createUser: "POST /api/users",
          updateUser: "PUT /api/users/:id",
          deleteUser: "DELETE /api/users/:id",
        },
      },
    };

    ctx.body = response;
  }
}
