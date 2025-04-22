import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  users: any[] = [];
  latestMessage : any[] = [];
  filteredChats : any[] = []
  recentChats: any[] = [];
  isLoadingChats = true;
  isLoadingUsers = true;
  isAdmin = false;
  

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadChatRooms();
    this.loadChats();
    // this.loadMessages();
  }

  loadChatRooms() {
    this.chatService.getChatRoomsByUser("101").subscribe((response) => {
      this.recentChats = response;
      this.isLoadingChats = false;

      this.filteredChats = this.recentChats;
  
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

  loadChats() {
    this.isLoadingUsers = true;
    this.chatService.getChats().subscribe(data => {
      this.users = data;
      this.isLoadingUsers = false;
    });
  }

  searchTerm: string = '';

  filterChats() {
    const term = this.searchTerm?.toLowerCase() || '';
  
    this.filteredChats = this.recentChats.filter(chat => {
      const userId = chat.userId?.toString().toLowerCase() || '';
      const groupName = chat.groupName?.toString().toLowerCase() || '';
      const latest = this.latestMessage[chat.roomId];
      const message = latest?.message?.toString().toLowerCase() || '';
      const userName = latest?.userName?.toString().toLowerCase() || '';
  
      return (
        userId.includes(term) ||
        groupName.includes(term) ||
        message.includes(term) ||
        userName.includes(term)
      );
    });
  }
}
