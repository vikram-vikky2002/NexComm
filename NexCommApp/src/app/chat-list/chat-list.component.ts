import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  users: any[] = [];
  recentChats: any[] = [
    { title: 'Project Team', description: 'Let’s finalize the designs' },
    { title: 'John Doe', description: 'Are we meeting tomorrow?' },
    { title: 'Support Group', description: 'Ticket #123 has been resolved' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' },
    { title: 'HR', description: 'Policy update from last week' }
  ];
  

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chatService.getChats().subscribe(data => {
      this.users = data;
    });
  }
}
