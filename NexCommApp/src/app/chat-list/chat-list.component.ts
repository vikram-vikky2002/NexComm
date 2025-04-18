import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  users: any[] = [];
  latestMessage : any[] = [];
  recentChats: any[] = [
    // { title: 'Project Team', description: 'Let’s finalize the designs' },
    // { title: 'John Doe', description: 'Are we meeting tomorrow?' },
    // { title: 'Support Group', description: 'Ticket #123 has been resolved' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' },
    // { title: 'HR', description: 'Policy update from last week' }
  ];
  

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChatRooms();
    this.loadChats();
    // this.loadMessages();
  }

  loadChatRooms() {
    this.chatService.getChatRoomsByUser("101").subscribe((response) => {
      this.recentChats = response;
  
      this.recentChats.forEach(room => {
        this.chatService.getLatestMessage(room.roomId).subscribe(data => {
          this.latestMessage[room.roomId] = {
            message: data.message,
            userName: data.userName
          };
        });
      });
    });
  }
  

  loadMessages() {
    this.chatService.getMessages("101").subscribe((response) => {
      this.recentChats = response;
  
      this.recentChats.forEach(room => {
        this.chatService.getLatestMessage(room.roomId).subscribe(data => {
          this.latestMessage[room.roomId] = {
            message: data.message,
            userName: data.userName
          };
        });
      });
  
      console.log(this.latestMessage);
    });
  }

  loadChats() {
    this.chatService.getChats().subscribe(data => {
      this.users = data;
    });
  }

  // loadLatestChat(roomId: string) {
  //   this.chatService.getLatestMessage(roomId).subscribe(data => {
  //     return data;
  //   });
  // }
}
