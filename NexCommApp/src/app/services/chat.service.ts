import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private apiUrl = 'http://192.168.1.37:3000'; // Replace with your API URL
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getChats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Dashboard/online-users`);
  } 

  getChatRoomsByUser(userId: string): Observable<{ roomId: number, groupName: string, userNames: string[] }[]> {
    return this.http.get<{ roomId: number, groupName: string, userNames: string[] }[]>(`${this.apiUrl}/api/Dashboard/rooms/${userId}`);
  }

  getMessages(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Dashboard/rooms/${userId}`);
  }

  getLatestMessage(roomId: string): Observable<{ message: any, userName: string }> {
    return this.http.get<{ message: any, userName: string }>(`${this.apiUrl}/api/Dashboard/latest-message/${roomId}`);
  }

  getMessagesForRoom(roomId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/GroupChat/GetMessagesForRoom?roomId=${roomId}`);
  }

  sendMessage(message: { userId: number; roomId: number; text: string; createdAt: string }): Observable<any> {
    const messageData = {
      userId: message.userId,
      roomId: message.roomId,
      text: message.text,
      createdAt: message.createdAt
    };

    return this.http.post<any>(`${this.apiUrl}/api/GroupChat/SendMessage`, messageData);
  }

  getOnlineUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Dashboard/online-users`);
  }

  createChatRoom(userId: number): Observable<{ roomId: number; groupName: string }> {
    return this.http.post<{ roomId: number; groupName: string }>(`${this.apiUrl}/api/GroupChat/CreateRoom`, { userId });
  }
}
