import { Injectable, Logger } from '@nestjs/common';
import { ChatRequestDto, ChatResponseDto } from '@prompt-playground/types';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private logger = new Logger(ChatService.name);

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.CLOVIS_API_KEY,
      baseURL: process.env.CLOVIS_API_URL,
    });
  }

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
        response_format:
          dto.responseFormat === 'json'
            ? { type: 'json_object' }
            : { type: 'text' },
      });

      const endTime = Date.now();
      const latency = endTime - startTime;

      const response = completion.choices[0]?.message?.content || '';

      return {
        response,
        usage: {
          promptTokens: completion.usage?.prompt_tokens,
          completionTokens: completion.usage?.completion_tokens,
          totalTokens: completion.usage?.total_tokens,
        },
        latency,
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
}
