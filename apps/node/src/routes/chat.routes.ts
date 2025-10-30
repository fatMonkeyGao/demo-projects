import Router from "@koa/router";
import { ChatController } from "../controllers";

const router = new Router({ prefix: "/chat" });

router.post("/agent", ChatController.agentChat);

export default router;
