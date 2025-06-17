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

  constructor(
    private router: Router,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {
    this.newChatForm = this.fb.group({
      selectedUser: [''],  // for single chat
      selectedUsers: [[], Validators.required]  // for group chat
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.isAdmin = localStorage.getItem('admin') === 'true';
    this.setValidators();
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
    if (this.isGroupChat) {
      const selectedUserIds = this.newChatForm.value.selectedUsers;
      if (selectedUserIds && selectedUserIds.length > 0) {
        this.chatService.createChatRoom(selectedUserIds).subscribe(
          (response) => {
            this.router.navigate(['/chat', response.groupName, response.roomId]);
          },
          (error) => {
            console.error('Error creating group chat:', error);
          }
        );
      }
    } else {
      const selectedUserId = this.newChatForm.value.selectedUser;
      if (selectedUserId) {
        this.chatService.createChatRoom(selectedUserId).subscribe(
          (response) => {
            this.router.navigate(['/chat', response.groupName, response.roomId]);
          },
          (error) => {
            console.error('Error creating chat:', error);
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
}
