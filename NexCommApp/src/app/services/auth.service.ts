import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private tokenKey = 'auth_token';
  public redirectUrl: string = '/chats';

  constructor(
    private http: HttpClient,   
    private router: Router
  ) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:3000/api/user/login`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            console.log(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem(this.tokenKey, user.token);
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;
    
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken || !decodedToken.exp) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }
}
