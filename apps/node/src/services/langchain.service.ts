import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { langchainConfig } from "../config";

/**
 * LangChain 服务
 * 提供基于 LangChain 的 AI 对话和链式调用功能
 */
class LangChainService {
  private chatModel: ChatOpenAI | null = null;

  /**
   * 初始化聊天模型
   */
  private initializeChatModel(): ChatOpenAI {
    if (!this.chatModel) {
      const config: any = {
        openAIApiKey: langchainConfig.apiKey,
        modelName: langchainConfig.model || "gpt-3.5-turbo",
        temperature: langchainConfig.temperature || 0.7,
        streaming: langchainConfig.streaming || false,
      };

      if (langchainConfig.maxTokens) {
        config.maxTokens = langchainConfig.maxTokens;
      }

      if (langchainConfig.baseURL) {
        config.configuration = {
          baseURL: langchainConfig.baseURL,
        };
      }

      this.chatModel = new ChatOpenAI(config);
    }
    return this.chatModel;
  }

  /**
   * 简单的对话调用
   * @param input 用户输入
   * @param systemPrompt 可选的系统提示词
   */
  async chat(input: string, systemPrompt?: string): Promise<string> {
    try {
      const model = this.initializeChatModel();

      const prompt = systemPrompt
        ? ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", "{input}"],
          ])
        : ChatPromptTemplate.fromMessages([["human", "{input}"]]);

      const outputParser = new StringOutputParser();

      const chain = RunnableSequence.from([prompt, model, outputParser]);

      const result = await chain.invoke({ input });
      return result;
    } catch (error) {
      console.error("LangChain chat error:", error);
      throw error;
    }
  }

  /**
   * 流式对话调用
   * @param input 用户输入
   * @param systemPrompt 可选的系统提示词
   */
  async chatStream(
    input: string,
    systemPrompt?: string
  ): Promise<NodeJS.ReadableStream> {
    try {
      const model = this.initializeChatModel();

      const prompt = systemPrompt
        ? ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["human", "{input}"],
          ])
        : ChatPromptTemplate.fromMessages([["human", "{input}"]]);

      const outputParser = new StringOutputParser();

      const chain = RunnableSequence.from([prompt, model, outputParser]);

      const stream = await chain.stream({ input });

      // 将 AsyncIterable 转换为 NodeJS.ReadableStream
      const { Readable } = await import("stream");
      const readable = new Readable({
        read() {
          // 这个方法会在需要数据时被调用
        },
      });

      // 异步处理流数据
      (async () => {
        try {
          for await (const chunk of stream) {
            const data = `data: ${JSON.stringify({ content: chunk })}\n\n`;
            readable.push(data);
          }
          readable.push(null); // 结束流
        } catch (error) {
          readable.destroy(error as Error);
        }
      })();

      return readable as NodeJS.ReadableStream;
    } catch (error) {
      console.error("LangChain chat stream error:", error);
      throw error;
    }
  }

  /**
   * 使用自定义提示词模板进行对话
   * @param template 提示词模板
   * @param variables 模板变量
   */
  async chatWithTemplate(
    template: string,
    variables: Record<string, any>
  ): Promise<string> {
    try {
      const model = this.initializeChatModel();
      const prompt = ChatPromptTemplate.fromTemplate(template);
      const outputParser = new StringOutputParser();

      const chain = RunnableSequence.from([prompt, model, outputParser]);

      const result = await chain.invoke(variables);
      return result;
    } catch (error) {
      console.error("LangChain chat with template error:", error);
      throw error;
    }
  }

  /**
   * 获取聊天模型实例（用于高级用法）
   */
  getChatModel(): ChatOpenAI {
    return this.initializeChatModel();
  }

  /**
   * 验证配置
   */
  validateConfig(): boolean {
    return !!langchainConfig.apiKey && langchainConfig.apiKey.length > 0;
  }

  /**
   * 重置聊天模型（用于更新配置后重新初始化）
   */
  resetChatModel(): void {
    this.chatModel = null;
  }
}

// 导出服务实例
export const langchainService = new LangChainService();
