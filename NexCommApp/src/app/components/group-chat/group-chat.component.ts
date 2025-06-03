import { Component } from '@angular/core';

@Component({
  selector: 'app-groupchat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupchatComponent {
  message: string = '';
  messages: string[] = [];

  sendMessage() {
    if (this.message.trim()) {
      this.messages.push(`You: ${this.message}`);
      console.log('Message sent:', this.message);
      this.message = '';
    }
  }
}
