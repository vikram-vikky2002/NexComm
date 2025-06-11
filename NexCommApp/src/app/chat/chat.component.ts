import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) { }

  userName: string = '';
  message: string = '';
  messages: Message[] = [];
  chatId: string = '';
  roomId: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = params['chatTitle'] ?? params['groupName'];
      this.roomId = params['roomId'];
      this.userName = this.chatId || 'User Name';
      this.fetchMessages();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  goBack(): void {
    this.router.navigate(['/chats']);
  }

  fetchMessages(): void {
    if (this.roomId) {
      this.isLoading = true;
      this.chatService.getMessagesForRoom(this.roomId).subscribe(
        (messages: Message[]) => {
          this.messages = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          console.log(this.messages);
          this.isLoading = false;
          this.scrollToBottom();
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
          this.isLoading = false;
        }
      );
    }
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const messageData = {
        userId: 101,  // Assuming 101 is the current user's ID
        roomId: parseInt(this.roomId),
        text: this.message,
        createdAt: new Date().toISOString()
      };

      this.chatService.sendMessage(messageData).subscribe(
        (response) => {
          const newMessage: Message = {
            messageId: Date.now(),
            userId: 101,
            roomId: parseInt(this.roomId),
            text: this.message,
            createdAt: messageData.createdAt,
            room: null,
            user: null
          };
          this.messages.push(newMessage);
          this.message = '';
          this.scrollToBottom();
        },
        (error) => {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
        }
      );
    }
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer?.nativeElement) {
        setTimeout(() => {
          this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        }, 100);
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
