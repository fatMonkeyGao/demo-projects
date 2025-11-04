import dotenv from "dotenv";
import { pathToFileURL } from "url";
import { createApp } from "./app";
import { config, isDevelopment } from "./config";
import { dubboService } from "./services";

// 加载环境变量文件
// 先加载 .env，再加载 .env.local（.env.local 会覆盖 .env 中的同名变量）
dotenv.config();
dotenv.config({ path: ".env.local" });

/**
 * 启动服务器
 */
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    // 启动服务器
    const server = app.listen(config.port, async () => {
      if (isDevelopment()) {
        console.log("🛠️ 开发模式已启用");
      }
      console.log(`🚀 服务器运行在 http://localhost:${config.port}`);

      // 服务器启动成功后，初始化 Dubbo 服务
      try {
        console.log("📡 正在初始化 Dubbo 服务...");
        await dubboService.initialize();
        console.log("✅ Dubbo 服务初始化成功");
      } catch (error) {
        console.warn("⚠️  Dubbo 服务初始化失败（服务将继续运行）:", error);
        // Dubbo 初始化失败不影响服务器运行
      }
    });

    // 优雅关闭
    const gracefulShutdown = async () => {
      console.log("\n🛑 正在关闭服务器...");

      // 关闭 Dubbo 连接
      try {
        if (dubboService.isReady()) {
          console.log("📡 正在关闭 Dubbo 连接...");
          await dubboService.close();
        }
      } catch (error) {
        console.error("❌ 关闭 Dubbo 连接时出错:", error);
      }

      // 关闭 HTTP 服务器
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
