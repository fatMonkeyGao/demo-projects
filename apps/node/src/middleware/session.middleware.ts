import type { Context, Middleware } from "koa";
import session from "koa-session";
import { sessionConfig } from "../config";

/**
 * 创建 Session 中间件
 * 注意：在生产环境中，建议使用 Redis 或其他外部存储来存储 session
 *
 * @param app Koa 应用实例
 * @returns Session 中间件
 */
export const createSessionMiddleware = (app: any): Middleware => {
  return session(
    {
      ...sessionConfig,
      // 自定义存储（可选，默认使用内存存储）
      // 如果需要使用 Redis，可以在这里配置 store
      // store: new RedisStore({ client: redisClient })
    },
    app
  );
};

/**
 * Session 辅助函数：获取 session
 */
export const getSession = (ctx: Context) => {
  return ctx.session;
};

/**
 * Session 辅助函数：设置 session 值
 */
export const setSession = (ctx: Context, key: string, value: any) => {
  if (ctx.session) {
    ctx.session[key] = value;
  }
};

/**
 * Session 辅助函数：删除 session 值
 */
export const deleteSession = (ctx: Context, key: string) => {
  if (ctx.session && ctx.session[key]) {
    delete ctx.session[key];
  }
};

/**
 * Session 辅助函数：清空 session
 */
export const clearSession = (ctx: Context) => {
  if (ctx.session) {
    ctx.session = null;
  }
};
