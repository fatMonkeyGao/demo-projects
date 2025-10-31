import Router from "@koa/router";
import { config } from "../config";
import { AppController } from "../controllers";
import agentRoutes from "./agent.routes";
import chatRoutes from "./chat.routes";
import photoRoutes from "./photo.routes";
import userRoutes from "./user.routes";

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
apiRouter.use(chatRoutes.routes(), chatRoutes.allowedMethods());
apiRouter.use(photoRoutes.routes(), photoRoutes.allowedMethods());

// 将 API 路由添加到主路由
router.use(apiRouter.routes(), apiRouter.allowedMethods());

export default router;
