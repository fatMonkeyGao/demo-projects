import type { Context, Next } from "koa";
import type { AppError, ApiResponse } from "../types";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants";

/**
 * 全局错误处理中间件
 */
export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const error = err as AppError;

    // 设置状态码
    ctx.status = error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    // 构造错误响应
    const response: ApiResponse = {
      success: false,
      error: error.message || ERROR_MESSAGES.INTERNAL_ERROR,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    };

    ctx.body = response;

    // 记录错误日志
    console.error("Error occurred:", {
      status: ctx.status,
      message: error.message,
      stack: error.stack,
      url: ctx.url,
      method: ctx.method,
    });
  }
};

/**
 * 404 处理中间件
 */
export const notFoundHandler = async (ctx: Context, next: Next) => {
  await next();

  if (ctx.status === 404) {
    const response: ApiResponse = {
      success: false,
      error: ERROR_MESSAGES.ROUTE_NOT_FOUND,
    };
    ctx.body = response;
  }
};
