import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Iuser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  //validateCredentials(id: string, password: string): Observable<string> {
  //  var userObj: Iuser;
  //  userObj = { emailId: id, password: password, userName: "null", role: "null", phone: "null", newUser: true, live:  };
  //  return this._http.post<string>('https://localhost:7143/api/NexComm/Login', userObj).pipe(catchError(this.errorHandler));
  //}

  //errorHandler(error: HttpErrorResponse) {
  //  console.error(error);
  //  return throwError(error.message || "Server Error");
  //}

}
