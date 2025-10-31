import { photoService } from "src/services/photo.service";
import { AppContext } from "src/types";

export class PhotoController {
  static async generatePhoto(ctx: AppContext): Promise<void> {
    const { input } = ctx.request.body as { input: string };

    // 设置流式响应头
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.set("X-Accel-Buffering", "no"); // 禁用 Nginx 缓冲

    try {
      // 获取流式响应
      const stream = await photoService.generatePhoto(input);

      // 将响应流直接传递给客户端
      ctx.body = stream;
    } catch (error) {
      console.error("流式请求错误:", error);
      ctx.status = 500;
      ctx.body = { error: "流式请求失败" };
    }
  }
}
