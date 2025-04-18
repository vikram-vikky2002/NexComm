import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Iuser } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  AddLoginUser(User: Iuser) {
    var tempvar = this._http.post("https://localhost:7143/api/NexComm/Login", User).pipe(catchError(this.errorHandler));
    return tempvar;

  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
