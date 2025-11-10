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

  private getErrorMessage(status?: number): string {
    switch (status) {
      case 401:
        return "Clé invalide ou non reconnue.\nVérifiez que la clé est correcte et qu'il n'y a pas d'espace en trop.";
      case 404:
        return 'Modèle introuvable.\nVérifiez le nom du modèle (ClovisLLM, etc.).';
      case 429:
        return 'Trop de requêtes ou limite atteinte.\nAttendez quelques secondes avant de réessayer.';
      case 500:
        return "Erreur interne du modèle ou du proxy.\nContactez l'administrateur de l'instance.";
      default:
        return "Une erreur inattendue s'est produite.\nVeuillez réessayer dans quelques instants.";
    }
  }

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
            metadata: {
              promptTokens: response.usage.promptTokens,
              completionTokens: response.usage.completionTokens,
              totalTokens: response.usage.totalTokens,
              latency: response.latency,
            },
          },
        ]);
      })
      .catch((error) => {
        console.error('Error calling chat API:', error);
        const status = error.status || error.statusCode;
        const errorMessage = this.getErrorMessage(status);

        this.messages.update((msgs) => [
          ...msgs,
          {
            type: 'response',
            content: errorMessage,
            timestamp: new Date(),
            isError: true,
          },
        ]);
      })
      .finally(() => {
        this.isWaitingAnswer.set(false);
      });
  }
}
