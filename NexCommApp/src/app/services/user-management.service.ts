import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

 
  private apiUrl = 'http://localhost:3000/api/User'; // Adjust based on your backend URL

  constructor(private http: HttpClient) {}

  // ADD User
  addUser(user: Iuser): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/room`, user);
  }

  // UPDATE User
  updateUser(user: Iuser): Observable<boolean> {
    return this.http.put<boolean>(this.apiUrl, user);
  }
  getAllUsers(): Observable<Iuser[]> {
  return this.http.get<Iuser[]>(`${this.apiUrl}/all`); // Add this endpoint in .NET API
}

  // DELETE User
  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  }

}
