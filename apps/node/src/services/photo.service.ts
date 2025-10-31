import https from "https";
import { URL } from "url";

class PhotoService {
  async generatePhoto(input: string): Promise<NodeJS.ReadableStream> {
    return new Promise((resolve, reject) => {
      const url = new URL(
        "https://ark.cn-beijing.volces.com/api/v3/images/generations"
      );

      // 请求配置
      const options = {
        hostname: url.hostname,
        port: 443, // HTTPS 端口
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ARK_API_KEY}`,
        },
      };

      // 构建请求体
      const requestBody = JSON.stringify({
        stream: true,
        model: "doubao-seedream-4-0-250828",
        prompt: input,
        response_format: "url",
        size: "2K",
        watermark: false,
      });

      const req = https.request(options, (response) => {
        console.log("Status Code:", response.statusCode);

        if (response.statusCode !== 200) {
          reject(new Error(`请求失败: ${response.statusCode}`));
          return;
        }

        // 直接返回响应流
        resolve(response);
      });

      req.on("error", (error) => {
        console.error("请求错误:", error);
        reject(error);
      });

      // 发送请求体
      req.write(requestBody);
      req.end();
    });
  }
}

export const photoService = new PhotoService();
