import { IsString, IsNumber, Min, Max, IsInt, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatRequestDto {
  @ApiProperty({
    description: 'The prompt text to be processed',
    example: 'Explain what an API is',
    type: String,
  })
  @IsString()
  prompt!: string;

  @ApiProperty({
    description:
      'Controls randomness in the response. Lower values make output more focused and deterministic',
    example: 0.7,
    minimum: 0,
    maximum: 1,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  temperature!: number;

  @ApiProperty({
    description: 'Maximum number of tokens to generate in the response',
    example: 200,
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  maxTokens!: number;

  @ApiProperty({
    description: 'Format of the response output',
    example: 'text',
    enum: ['text', 'json'],
  })
  @IsIn(['text', 'json'])
  responseFormat!: 'text' | 'json';
}
