import Router from "@koa/router";
import { ChatController } from "../controllers";

const router = new Router({ prefix: "/chat" });

router.get("/agent-sse", ChatController.agentChat);
router.post("/agent", ChatController.agentChat);

export default router;
