import { Component, input } from '@angular/core';
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
}
