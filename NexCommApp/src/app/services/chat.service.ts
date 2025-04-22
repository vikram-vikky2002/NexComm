import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

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
}
