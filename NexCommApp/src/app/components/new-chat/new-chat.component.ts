import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {
  newChatForm: FormGroup;
  users: any[] = [];
  loading = false;
  error: string = '';

  constructor(
    private router: Router,
    private chatService: ChatService,
    private fb: FormBuilder
  ) {
    this.newChatForm = this.fb.group({
      selectedUser: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    // Replace with actual API call to get users
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

  createChat(): void {
    if (this.newChatForm.valid) {
      const selectedUserId = this.newChatForm.value.selectedUser;
      
      this.loading = true;
      this.chatService.createChatRoom(selectedUserId).subscribe(
        (response) => {
          if (response.roomId) {
            this.router.navigate(['/chat', response.groupName || 'New Chat', response.roomId]);
          } else {
            this.error = 'Failed to create chat room';
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error creating chat:', error);
          this.error = 'Failed to create chat room. Please try again.';
          this.loading = false;
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/chats']);
  }
}
