import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Message } from '../Models/message.model';
import { UserService } from '../services/user.service';
import { UserManagementService } from '../services/user-management.service';
import { Iuser } from '../Models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  private messagePollingInterval: NodeJS.Timeout | undefined;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private userSvc: UserManagementService
  ) { }

  userId: string = '';
  userName: string = '';
  message: string = '';
  messages: Message[] = [];
  isLoading: boolean = true;
  chatId: string = '';
  roomId: string = '';
  latestMessageId: number = 0; // Track the latest message ID
  isSending: boolean = false; // Track if we're currently sending a message
  selectedFile: File | null = null;
  files: any[] = [];
  fileUploadProgress: number = 0; // Track file upload progress
  currUser: string = '';

  ngOnInit(): void {
    // Get user ID from localStorage and validate

    const userId = localStorage.getItem('userId');
    this.currUser = localStorage.getItem('userName') || '';
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      console.error('Invalid user ID');
      this.router.navigate(['/login']);
      return;
    }

    this.userId = parsedUserId.toString();

    // Start message polling
    this.startMessagePolling();

    this.route.params.subscribe((params: { [key: string]: string | null }) => {
      this.chatId = params['chatTitle'] ?? params['groupName'] ?? '';
      this.roomId = params['roomId'] ?? '';
      this.userName = this.chatId || 'User Name';

      
    });
    this.userSvc.getUser(this.userId).subscribe(u => {
      this.userName = u.userName;
      this.originalName = u.userName;
    });

  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  goBack(): void {
    this.router.navigate(['/chats']);
  }

  private isUserNearBottom(): boolean {
    if (!this.messagesContainer?.nativeElement) return true;
    const threshold = 150; // px from bottom
    const position = this.messagesContainer.nativeElement.scrollTop + this.messagesContainer.nativeElement.clientHeight;
    const height = this.messagesContainer.nativeElement.scrollHeight;
    return height - position < threshold;
  }

  private startMessagePolling(): void {
    // Clear any existing interval
    // this.stopMessagePolling();

    // Start new polling interval
    this.messagePollingInterval = setInterval(() => {
      if (this.roomId && !this.isSending) {
        this.fetchMessages();
        // this.fetchFiles();
      }
    }, 3000); // Poll every 5 seconds
  }

  private stopMessagePolling(): void {
    if (this.messagePollingInterval) {
      clearInterval(this.messagePollingInterval);
      this.messagePollingInterval = undefined;
    }
  }

  fetchMessages(): void {
    if (!this.roomId) return;
    const roomId = parseInt(this.roomId);
    if (isNaN(roomId)) return;

    const shouldAutoScroll = this.isUserNearBottom();

    this.chatService.getMessagesForRoom(this.roomId).subscribe(
      (newMessages: Message[]) => {
        // Sort new messages by creation time
        newMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        // Add only new messages that have a newer ID than our latest
        const messagesToAdd = newMessages.filter(msg => msg.messageId > this.latestMessageId);

        // Update messages array with new messages
        this.messages = [...this.messages, ...messagesToAdd];

        // Update latest message ID if we have any messages (new or existing)
        if (newMessages.length > 0) {
          this.latestMessageId = Math.max(...newMessages.map(msg => msg.messageId));
        }

        this.isLoading = false;
        if (shouldAutoScroll) {
          this.scrollToBottom(); // ✅ Only scroll if user was near bottom
        }
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
        this.isLoading = false;
      }
    );
  }

  fetchFiles(): void {
    this.chatService.getFilesForRoom(this.roomId).subscribe(
      (newFiles: File[]) => {
        this.files = [...newFiles];
      }
    );

     console.log(this.files);
  }

  formatTimestamp(timestamp: string): string {
    const messageDate = new Date(timestamp);
    const currentDate = new Date();

    // Check if the message is from today
    const isToday = messageDate.toDateString() === currentDate.toDateString();

    if (isToday) {
      // Show time for today's messages
      return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    // Show date for older messages
    return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  parseUserId(userId: string): number {
    return parseInt(userId);
  }

  sendMessage(): void {
    if (this.message.trim()) {
      if (!this.roomId) {
        console.error('Room ID is not set');
        return;
      }

      if(this.selectedFile){
        this.message =  `/uploads/${this.selectedFile.name}`;
      }
      else {
        this.message = this.message.trim();
      }

      const messageData = {
        userId: parseInt(this.userId),  // Using user ID from localStorage (already validated)
        roomId: parseInt(this.roomId),
        text: this.message,
        createdAt: new Date().toISOString(),
        filePath: this.selectedFile ? `/uploads/${this.selectedFile.name}` : undefined
      };

      // Temporarily disable polling while sending
      this.isSending = true;
      this.chatService.sendMessage(messageData).subscribe(
        (response) => {
          const newMessage: Message = {
            messageId: Date.now(),
            userId: parseInt(this.userId),  // Using user ID from localStorage (already validated)
            roomId: parseInt(this.roomId),
            text: this.message,
            createdAt: messageData.createdAt,
            userName: this.currUser
          };

          // Add the message directly
          this.messages.push(newMessage);
          this.message = '';
          this.scrollToBottom();

          // Update latest message ID
          this.latestMessageId = newMessage.messageId;

          // Re-enable polling
          this.isSending = false;
        },
        (error) => {
          console.error('Error sending message:', error);
          alert('Failed to send message. Please try again.');
          this.isSending = false;
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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  handleFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.selectedFile = target.files[0];
      // Reset the input value to allow selecting the same file again
      target.value = '';
    }
  }

  downloadFile(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  isEditing = false;
  private originalName = '';

  userwe: Iuser = {
    userId: Number(this.userId),
    userName: '',
    "role": "",
    "emailId": "",
    "phone": "",
    "newUser": false,
    "password": '',
    lastLogin:'',
    "live": false,
    "isAdmin": false
    // other fields if any...
  };
  toggleEdit() {
    const trimmedName = this.userName.trim();
    console.log(this.roomId, trimmedName)
    if (this.isEditing) {
      if (trimmedName && trimmedName !== this.originalName) {
        this.userSvc.updateGroupName(+this.roomId, trimmedName).subscribe({
          next: (success) => {
            if (success) {
              this.originalName = trimmedName;
            } else {
              this.userName = this.originalName;
              alert('Failed to update group name');
            }
            this.isEditing = false;
          },
          error: () => {
            this.userName = this.originalName;
            alert('Error occurred while updating group name');
            this.isEditing = false;
          }
        });
      } else {
        this.userName = this.originalName;
        this.isEditing = false;
      }
    } else {
      this.originalName = this.userName;
      this.isEditing = true;
    }
  }

}

