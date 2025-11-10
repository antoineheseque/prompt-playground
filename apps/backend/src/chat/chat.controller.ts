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
  @ApiResponse({
    status: 401,
    description: 'Invalid or unrecognized API key',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid API key' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Requested model not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Model not found' },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 429 },
        message: { type: 'string', example: 'Rate limit exceeded' },
      },
    },
  })
  @ApiResponse({
    status: 502,
    description: 'Upstream service error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 502 },
        message: { type: 'string', example: 'Upstream service error' },
      },
    },
  })
  async processChat(
    @Body() requestDto: ChatRequestDto
  ): Promise<ChatResponseDto> {
    return this.service.processChat(requestDto);
  }
}
