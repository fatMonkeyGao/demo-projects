import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";

import router from "./routes";
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  responseTime,
} from "./middleware";
import { createSessionMiddleware } from "./middleware/session.middleware";
import { isDevelopment } from "./config";

/**
 * 创建 Koa 应用实例
 */
export const createApp = (): Koa => {
  const app = new Koa();

  // 设置 session 签名密钥（用于签名 cookie）
  // 在生产环境中，应该使用环境变量提供安全的密钥
  app.keys = [process.env.SESSION_SECRET || "demo-session-secret-key-change-in-production"];

  // Session 中间件（需要在 CORS 之前配置，因为需要设置 cookie）
  // 注意：session 中间件需要 app 实例作为参数
  app.use(createSessionMiddleware(app));

  // 安全中间件
  app.use(helmet());

  // CORS 支持
  app.use(
    cors({
      origin: isDevelopment() ? "*" : "http://localhost:3000",
      credentials: true,
    })
  );

  // 请求体解析
  app.use(
    bodyParser({
      jsonLimit: "1mb",
      formLimit: "1mb",
      textLimit: "1mb",
    })
  );

  // 响应时间
  app.use(responseTime);

  // 请求日志（仅在开发环境）
  if (isDevelopment()) {
    app.use(requestLogger);
  }

  // 全局错误处理
  app.use(errorHandler);

  // 路由
  app.use(router.routes());
  app.use(router.allowedMethods());

  // 404 处理
  app.use(notFoundHandler);

  return app;
};

// 导出应用实例
export default createApp();
