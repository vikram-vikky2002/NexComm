import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, throwError } from 'rxjs';
import { Iuser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  validateCredentials(userObj: Iuser): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/user/login`, userObj)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', {
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      error: error.error
    });

    if (error.status === 0) {
      // Client-side or network error
      return throwError(() => new Error('Network error occurred. Please check your connection.'));
    }

    return throwError(() => new Error(error.error?.message || error.statusText));
  }
}
