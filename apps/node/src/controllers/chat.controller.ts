import { AppContext } from "src/types";
import { chatService } from "src/services/chat.service";

export class ChatController {
  static async agentChat(ctx: AppContext): Promise<void> {
    const { input } = ctx.request.body as { input: string };
    const response = await chatService.agentChat(input);
    ctx.body = response;
  }
}
