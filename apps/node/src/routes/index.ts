import Router from "@koa/router";
import { AppController } from "../controllers";
import userRoutes from "./user.routes";
import agentRoutes from "./agent.routes";
import { config } from "../config";

// 创建主路由
const router = new Router();

// 应用根路由
router.get("/", AppController.health);
router.get("/info", AppController.apiInfo);

// API 路由组
const apiRouter = new Router({ prefix: config.apiPrefix });

// 注册子路由
apiRouter.use(userRoutes.routes(), userRoutes.allowedMethods());
apiRouter.use(agentRoutes.routes(), agentRoutes.allowedMethods());

// 将 API 路由添加到主路由
router.use(apiRouter.routes(), apiRouter.allowedMethods());

export default router;
