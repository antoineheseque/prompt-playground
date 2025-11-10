import { Injectable, Logger } from '@nestjs/common';
import { ChatRequestDto, ChatResponseDto } from '@prompt-playground/types';
import OpenAI from 'openai';
import {
  InvalidApiKeyError,
  ModelNotFoundError,
  RateLimitError,
  UpstreamError,
} from '../common/errors';

@Injectable()
export class ChatService {
  private readonly openai: OpenAI;
  private readonly logger = new Logger(ChatService.name);

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.CLOVIS_API_KEY,
      baseURL: process.env.CLOVIS_API_URL,
    });
  }

  /**
   * Process chat request and return response
   * @param dto Chat request data transfer object
   * @returns A promise resolving to a chat response
   */
  async processChat(dto: ChatRequestDto): Promise<ChatResponseDto> {
    const startTime = Date.now();
    this.logger.log(`Processing chat request: ${dto.prompt}`);

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'ClovisLLM',
        messages: [
          { role: 'system', content: 'Tu es un assistant utile.' },
          {
            role: 'user',
            content: dto.prompt,
          },
        ],
        temperature: dto.temperature,
        max_tokens: dto.maxTokens,
      });

      const endTime = Date.now();
      const latency = endTime - startTime;

      return {
        response: completion.choices[0].message.content,
        usage: {
          promptTokens: completion.usage?.prompt_tokens,
          completionTokens: completion.usage?.completion_tokens,
          totalTokens: completion.usage?.total_tokens,
        },
        latency,
      };
    } catch (error) {
      this.logger.error('Error processing chat request', error);

      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) {
          throw new InvalidApiKeyError(error.message);
        }

        if (error.status === 404) {
          throw new ModelNotFoundError(error.message);
        }

        if (error.status === 429) {
          throw new RateLimitError(error.message);
        }

        if (error.status >= 500) {
          throw new UpstreamError(error.message);
        }
      }

      throw error;
    }
  }
}
