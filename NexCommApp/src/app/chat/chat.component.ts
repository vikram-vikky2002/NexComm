import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  chatId!: string; // Using definite assignment assertion

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id') || ''; // Handle null case
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages(this.chatId).subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(this.chatId, message).subscribe(() => {
      this.loadMessages();
    });
  }
}
