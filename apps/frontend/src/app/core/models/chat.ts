export interface ChatMessage {
  type: 'request' | 'response';
  content: string;
  timestamp?: Date;
}

export interface ChatInputData {
  prompt: string;
  temperature: number;
  maxTokens: number;
  responseFormat: 'text' | 'json';
}
