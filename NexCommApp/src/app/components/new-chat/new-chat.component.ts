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
  selectedUser: User | null = null;
  loading: boolean = false;
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
    const selectedUserId = this.selectedUser?.userId;
    if (selectedUserId) {
      this.chatService.createChatRoom(selectedUserId).subscribe(
        (response) => {
          // Use the groupName from the response instead of 'New Chat'
          this.router.navigate(['/chat', response.groupName, response.roomId]);
        },
        (error) => {
          console.error('Error creating chat:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/chats']);
  }
}
