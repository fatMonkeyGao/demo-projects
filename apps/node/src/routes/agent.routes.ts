import Router from "@koa/router";
import { AgentController } from "../controllers";

const router = new Router({ prefix: "/agents" });

// Coze AI 路由
router.post("/coze/workflow", AgentController.runCozeWorkflow);

// Fire AI 路由
router.get("/fire/config", AgentController.getFireConfig);
router.post("/fire/test", AgentController.testFireConnection);

// LangChain 路由
router.post("/langchain/chat", AgentController.langchainChat);
router.post("/langchain/chat/stream", AgentController.langchainChatStream);
router.post(
  "/langchain/chat/template",
  AgentController.langchainChatWithTemplate
);
router.get("/langchain/config", AgentController.getLangChainConfig);

export default router;
