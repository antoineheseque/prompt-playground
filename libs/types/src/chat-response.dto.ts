import { ApiProperty } from '@nestjs/swagger';

class UsageDto {
  @ApiProperty({
    description: 'Number of tokens in the prompt',
    example: 92,
    type: Number,
  })
  promptTokens!: number;

  @ApiProperty({
    description: 'Number of tokens in the completion',
    example: 70,
    type: Number,
  })
  completionTokens!: number;

  @ApiProperty({
    description: 'Total number of tokens used',
    example: 162,
    type: Number,
  })
  totalTokens!: number;
}

export class ChatResponseDto {
  @ApiProperty({
    description: 'The generated response text',
    example: 'An API is an interface that allows two systems to communicate.',
    type: String,
  })
  response!: string;

  @ApiProperty({
    description: 'Token usage statistics for the request',
    type: () => UsageDto,
  })
  usage!: UsageDto;

  @ApiProperty({
    description: 'Response latency in milliseconds',
    example: 1340,
    type: Number,
  })
  latency!: number;
}
