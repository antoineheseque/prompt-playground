import { Component, output, input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ChatInputData } from '../../core/models/chat';

interface ChatInputForm {
  prompt: FormControl<string>;
  temperature: FormControl<number>;
  maxTokens: FormControl<number>;
  responseFormat: FormControl<'text' | 'json'>;
}

@Component({
  selector: 'app-chat-input',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-input.html',
})
export class ChatInputComponent {
  protected chatForm = new FormGroup<ChatInputForm>({
    prompt: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    temperature: new FormControl(0.7, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(1)],
    }),
    maxTokens: new FormControl(150, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    responseFormat: new FormControl<'text' | 'json'>('text', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isWaitingAnswer = input<boolean>(false);

  messageSent = output<ChatInputData>();

  isFieldInvalid(controlName: keyof ChatInputForm): boolean {
    const control = this.chatForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  sendMessage() {
    if (this.chatForm.invalid) {
      return;
    }

    const formValue = this.chatForm.getRawValue();
    this.messageSent.emit(formValue);
    this.clearPrompt();
  }

  clearPrompt() {
    const promptControl = this.chatForm.controls.prompt;
    promptControl.setValue('');
    promptControl.markAsUntouched();
    promptControl.markAsPristine();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
