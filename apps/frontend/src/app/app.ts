import { Component, signal, inject } from '@angular/core';
import { ChatMessagesComponent } from './features/chat-messages/chat-messages';
import { ChatInputComponent } from './features/chat-input/chat-input';
import { HeaderComponent } from './features/header/header';
import { ChatService } from './core/services/chat.service';
import { ChatInputData, ChatMessage } from './core/models/chat';

@Component({
  imports: [HeaderComponent, ChatMessagesComponent, ChatInputComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly chat = inject(ChatService);

  protected messages = signal<ChatMessage[]>([
    {
      type: 'response',
      content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  protected isWaitingAnswer = signal(false);

  onMessageSent({
    prompt,
    temperature,
    maxTokens,
    responseFormat,
  }: ChatInputData) {
    this.messages.update((msgs) => [
      ...msgs,
      {
        type: 'request',
        content: prompt,
        timestamp: new Date(),
      },
    ]);
    this.isWaitingAnswer.set(true);

    this.chat
      .sendMessage({
        prompt,
        temperature,
        maxTokens,
        responseFormat,
      })
      .then((response) => {
        this.messages.update((msgs) => [
          ...msgs,
          {
            type: 'response',
            content: response.response,
            timestamp: new Date(),
          },
        ]);
      })
      .catch((error) => {
        console.error('Error calling chat API:', error);
        this.messages.update((msgs) => [
          ...msgs,
          {
            type: 'response',
            content: `Erreur lors de l'appel à l'API: ${
              error.message || 'Erreur inconnue'
            }`,
            timestamp: new Date(),
          },
        ]);
      })
      .finally(() => {
        this.isWaitingAnswer.set(false);
      });
  }
}
