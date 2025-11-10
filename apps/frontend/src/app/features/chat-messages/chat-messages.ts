import { Component, input, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../core/models/chat';

@Component({
  selector: 'app-chat-messages',
  imports: [CommonModule],
  templateUrl: './chat-messages.html',
})
export class ChatMessagesComponent {
  messages = input<ChatMessage[]>([]);
  isWaitingAnswer = input<boolean>(false);

  private scrollContainer =
    viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  constructor() {
    effect(() => {
      this.messages();
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.scrollContainer()?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }
}
