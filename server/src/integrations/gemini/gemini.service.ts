import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetAIMessageDTO } from './dto/get-ai-response.dto';
import { v4 } from 'uuid';

@Injectable()
export class GeminiService {
  private readonly googleAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  private readonly logger = new Logger(GeminiService.name);
  private chatSessions: { [sessionId: string]: ChatSession } = {};

  constructor(private readonly configService: ConfigService) {
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    const geminiModel = this.configService.get<string>('GEMINI_MODEL');

    this.googleAI = new GoogleGenerativeAI(geminiApiKey);
    this.model = this.googleAI.getGenerativeModel({
      model: geminiModel,
    });
  }

  private getChatSession(sessionId?: string) {
    const sessionIdToUse = sessionId ?? v4();

    let result = this.chatSessions[sessionIdToUse];
    if (!result) {
      result = this.model.startChat();
      this.chatSessions[sessionIdToUse] = result;
    }

    return {
      sessionId: sessionIdToUse,
      chat: result,
    };
  }

  async generateMessage(data: GetAIMessageDTO): Promise<any> {
    try {
      const { sessionId, chat } = this.getChatSession(data.sessionId);

      const result = await chat.sendMessage(data.prompt);

      return {
        result: result.response.text(),
        sessionId,
      };
    } catch (error) {
      this.logger.error('Error generating message', error);
    }
  }
}
