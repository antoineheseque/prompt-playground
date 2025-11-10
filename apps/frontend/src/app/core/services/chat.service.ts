import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChatRequestDto, ChatResponseDto } from '@prompt-playground/types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/chat';

  /**
   * Retrieve AI response from backend
   * @param request The chat request data
   * @returns A promise that resolves with the chat response data
   */
  sendMessage(request: ChatRequestDto): Promise<ChatResponseDto> {
    return firstValueFrom(
      this.http.post<ChatResponseDto>(this.apiUrl, request)
    );
  }
}
