import { createApp } from "./app";
import { config, isDevelopment } from "./config";
import { pathToFileURL } from "url";

/**
 * 启动服务器
 */
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    // 启动服务器
    const server = app.listen(config.port, () => {
      console.log("🚀 Koa 服务器启动成功!");
      console.log(`📍 服务地址: http://localhost:${config.port}`);
      console.log(`🌍 环境: ${config.nodeEnv}`);
      console.log(`📅 启动时间: ${new Date().toLocaleString("zh-CN")}`);
      console.log("📋 可用接口:");
      console.log(`   GET  /                     - 健康检查`);
      console.log(`   GET  /info                 - API 信息`);
      console.log(`   GET  ${config.apiPrefix}/users           - 获取用户列表`);
      console.log(`   GET  ${config.apiPrefix}/users/:id       - 获取用户详情`);
      console.log(`   POST ${config.apiPrefix}/users           - 创建用户`);
      console.log(`   PUT  ${config.apiPrefix}/users/:id       - 更新用户`);
      console.log(`   DEL  ${config.apiPrefix}/users/:id       - 删除用户`);
      console.log(
        `   POST ${config.apiPrefix}/agents/coze/workflow - 执行 Coze 工作流`
      );
      console.log(
        `   GET  ${config.apiPrefix}/agents/fire/config   - 获取 Fire AI 配置`
      );
      console.log(
        `   POST ${config.apiPrefix}/agents/fire/test     - 测试 Fire AI 连接`
      );

      if (isDevelopment()) {
        console.log("🛠️ 开发模式已启用");
      }
    });

    // 优雅关闭
    const gracefulShutdown = () => {
      console.log("\n🛑 正在关闭服务器...");
      server.close(() => {
        console.log("✅ 服务器已关闭");
        process.exit(0);
      });
    };

    // 监听关闭信号
    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (error) {
    console.error("❌ 服务器启动失败:", error);
    process.exit(1);
  }
};
// 启动服务器
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}
