export interface ChatMessage {
  type: 'request' | 'response';
  content: string;
  timestamp?: Date;
  isError?: boolean;
  metadata?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    latency?: number;
  };
}

export interface ChatInputData {
  prompt: string;
  temperature: number;
  maxTokens: number;
  responseFormat: 'text' | 'json';
}
