import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

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

  showNewChat: boolean = false;
  showNewGroupChat: boolean = false;

  newChatSearchTerm: string = '';
  filteredUsersForNewChat: any[] = [];

  newGroupChatSearchTerm: string = '';
  filteredUsersForNewGroupChat: any[] = [];
  selectedGroupUsers: any[] = [];

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.loadChatRooms();
    this.loadChats();

    this.isAdmin = localStorage.getItem('admin') === 'true';
    // this.loadMessages();

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadChatRoomsByUser(userId);
    }
    
  }

  newChat() {
    this.router.navigate(['/chat/new']);
  }

  loadChatRoomsByUser(userId: string) {
    this.chatService.getChatRoomsByUser(userId).subscribe((response) => {
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

  openChat(chat: any): void {
    this.router.navigate(['/chat', chat.chatTitle ?? chat.groupName, chat.roomId]);
  }

  startNewChat(): void {
    this.router.navigate(['/chat/new']);
  }

  loadChats() {
    this.isLoadingUsers = true;
    this.chatService.getChats().subscribe(data => {
      this.users = data;
      this.isLoadingUsers = false;
      this.filteredUsersForNewChat = this.users;
      this.filteredUsersForNewGroupChat = this.users;
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

  filterUsersForNewChat() {
    const term = this.newChatSearchTerm.toLowerCase();
    this.filteredUsersForNewChat = this.users.filter(user => user.userName.toLowerCase().includes(term));
  }

  cancelNewChat() {
    this.showNewChat = false;
    this.newChatSearchTerm = '';
  }

  filterUsersForNewGroupChat() {
    const term = this.newGroupChatSearchTerm.toLowerCase();
    this.filteredUsersForNewGroupChat = this.users.filter(user => user.userName.toLowerCase().includes(term));
  }

  toggleGroupUserSelection(user: any) {
    const index = this.selectedGroupUsers.indexOf(user);
    if (index > -1) {
      this.selectedGroupUsers.splice(index, 1);
    } else {
      this.selectedGroupUsers.push(user);
    }
  }

  createGroupChat() {
    if (this.selectedGroupUsers.length === 0) {
      alert('Please select at least one user for the group chat.');
      return;
    }
    const groupName = 'New Group Chat'; // Could be enhanced to ask for group name
    const newGroupChat = {
      roomId: Date.now(),
      groupName: groupName,
      isGroup: true,
      userIds: this.selectedGroupUsers.map(u => u.userId)
    };
    this.recentChats.unshift(newGroupChat);
    this.filteredChats = this.recentChats;
    this.showNewGroupChat = false;
    this.newGroupChatSearchTerm = '';
    this.selectedGroupUsers = [];
  }

  cancelNewGroupChat() {
    this.showNewGroupChat = false;
    this.newGroupChatSearchTerm = '';
    this.selectedGroupUsers = [];
  }
}