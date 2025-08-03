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
import { isDevelopment } from "./config";

/**
 * 创建 Koa 应用实例
 */
export const createApp = (): Koa => {
  const app = new Koa();

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
