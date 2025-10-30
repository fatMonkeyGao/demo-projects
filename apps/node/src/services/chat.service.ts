class ChatService {
  async agentChat(input: string): Promise<string> {
    return `Hello, ${input}`;
  }
}

export const chatService = new ChatService();
