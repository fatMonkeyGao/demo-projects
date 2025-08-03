// 主入口文件 - 导出核心模块
import { pathToFileURL } from "url";
export { default as app, createApp } from "./app";
export { config, cozeConfig, fireConfig } from "./config";
export * from "./types";
export * from "./constants";
export * from "./controllers";
export * from "./services";
export * from "./middleware";
export * from "./utils";

// 如果直接运行此文件，启动服务器
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import("./server");
}
