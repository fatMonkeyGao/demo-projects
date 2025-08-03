import { Context } from "koa";
import type { ApiResponse as BaseApiResponse } from "../../../../packages/shared/src";

// 继承自 shared 包的类型
export type { User } from "../../../../packages/shared/src";
export type { ApiResponse } from "../../../../packages/shared/src";

// 扩展 ApiResponse 类型
export interface ExtendedApiResponse<T = any> extends BaseApiResponse<T> {
  message?: string;
}

// Koa 相关类型扩展
export interface AppContext extends Context {
  // 可以在这里扩展 Koa Context
  request: Context["request"] & {
    body?: any;
  };
}

// 控制器函数类型
export type ControllerFunction = (ctx: AppContext) => Promise<void>;

// 错误类型
export interface AppError extends Error {
  status?: number;
  code?: string;
}

// 分页参数
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// 用户创建参数
export interface CreateUserParams {
  name: string;
  email: string;
}

// 用户更新参数
export interface UpdateUserParams {
  name?: string;
  email?: string;
}
