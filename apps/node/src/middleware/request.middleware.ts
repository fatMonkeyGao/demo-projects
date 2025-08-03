import type { Context, Next } from "koa";

/**
 * 请求日志中间件
 */
export const requestLogger = async (ctx: Context, next: Next) => {
  const start = Date.now();

  console.log(`🚀 ${ctx.method} ${ctx.url} - Start`);

  await next();

  const duration = Date.now() - start;
  console.log(`✅ ${ctx.method} ${ctx.url} - ${ctx.status} (${duration}ms)`);
};

/**
 * 响应时间中间件
 */
export const responseTime = async (ctx: Context, next: Next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  ctx.set("X-Response-Time", `${duration}ms`);
};
