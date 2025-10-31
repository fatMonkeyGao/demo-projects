import dotenv from "dotenv";
import { pathToFileURL } from "url";
import { createApp } from "./app";
import { config, isDevelopment } from "./config";

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
    const server = app.listen(config.port, () => {
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
