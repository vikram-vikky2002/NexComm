import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://localhost:7143/api/NexComm/online-users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getChats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMessages(chatId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${chatId}/messages`);
  }

  sendMessage(chatId: string, message: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${chatId}/messages`, { text: message });
  }
}
