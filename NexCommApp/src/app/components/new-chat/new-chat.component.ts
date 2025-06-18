import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  userId: number;
  userName: string;
}

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {
  newChatForm: FormGroup;
  users: User[] = [];
  loading: boolean = false;
  error: string = '';
  isAdmin: boolean = false;
  isGroupChat: boolean = false; // Can be toggled dynamically
  selectedUsers: number[] = [];

  constructor(
    private router: Router,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {
    this.newChatForm = this.fb.group({
      groupName: ['', Validators.required],
      selectedUsers: [[], Validators.required],
      selectedUser: ['', Validators.required]
    });
  }

  onUserSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(select.selectedOptions).map(opt => parseInt(opt.value, 10));
    this.selectedUsers.push(...selectedOptions);
    // make it unique
    this.selectedUsers = [...new Set(this.selectedUsers)];
    this.newChatForm.get('selectedUsers')?.setValue(this.selectedUsers);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.isAdmin = localStorage.getItem('admin') === 'true';
    this.setValidators();
    this.newChatForm.get('selectedUsers')?.valueChanges.subscribe(val => {
      console.log('Selected group users:', val);
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.chatService.getOnlineUsers().subscribe(
      (users) => {
        this.users = users;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
      }
    );
  }

  setValidators(): void {
    if (this.isGroupChat) {
      this.newChatForm.get('selectedUsers')?.setValidators([Validators.required]);
      this.newChatForm.get('selectedUser')?.clearValidators();
    } else {
      this.newChatForm.get('selectedUser')?.setValidators([Validators.required]);
      this.newChatForm.get('selectedUsers')?.clearValidators();
    }

    this.newChatForm.get('selectedUser')?.updateValueAndValidity();
    this.newChatForm.get('selectedUsers')?.updateValueAndValidity();
  }

  createChat(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    this.selectedUsers.push(userId);
    if (this.isGroupChat) {
      if (this.selectedUsers && this.selectedUsers.length > 0) {
        this.loading = true;
        this.chatService.createChatRoom(
          userId,
          this.isGroupChat,
          this.newChatForm.value.groupName,
          this.selectedUsers
        ).subscribe(
          (response) => {
            this.loading = false;
            this.router.navigate(['/chat', response.groupName, response.roomId]);
          },
          (error) => {
            this.loading = false;
            console.error('Error creating group chat:', error);
            this.error = 'Failed to create group chat. Please try again.';
          }
        );
      }
    } else {
      this.selectedUsers = [];
      const userId = parseInt(localStorage.getItem('userId') || '0');
      this.selectedUsers.push(userId);
      this.selectedUsers.push(parseInt(this.newChatForm.value.selectedUser));
      console.log(this.selectedUsers);
      if (this.selectedUsers && this.selectedUsers.length > 0) {
        this.loading = true;
        this.chatService.createChatRoom(
          userId,
          false,
          '',
          this.selectedUsers
        ).subscribe(
          (response) => {
            this.loading = false;
            this.router.navigate(['/chat', response.groupName, response.roomId]);
          },
          (error) => {
            this.loading = false;
            console.error('Error creating chat:', error);
            this.error = 'Failed to create chat. Please try again.';
          }
        );
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/chats']);
  }

  toggleChatType(): void {
    this.isGroupChat = !this.isGroupChat;
    this.setValidators();
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.userId === +userId); // Adjusted for number comparison
    return user ? user.userName : 'Unknown';
  }
  
  removeUser(userId: string): void {
    const selected = this.newChatForm.get('selectedUsers')?.value || [];
    const updated = selected.filter((id: string) => +id !== +userId); // ensure type match
    this.newChatForm.get('selectedUsers')?.setValue(updated);
  }
  
}
