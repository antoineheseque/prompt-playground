import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatRequestDto, ChatResponseDto } from '@prompt-playground/types';
import { ChatService as ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Post()
  @ApiOperation({
    summary: 'Process a chat prompt',
    description:
      'Processes a prompt with specified parameters and returns the generated response along with usage statistics',
  })
  @ApiBody({
    type: ChatRequestDto,
    description:
      'Chat request parameters including prompt, temperature, max tokens, and response format',
  })
  @ApiResponse({
    status: 201,
    description: 'The prompt has been successfully processed',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid request parameters (e.g., temperature out of range, invalid response format)',
  })
  async processChat(
    @Body() requestDto: ChatRequestDto
  ): Promise<ChatResponseDto> {
    return this.service.processChat(requestDto);
  }
}
