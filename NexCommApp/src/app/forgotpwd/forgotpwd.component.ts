//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-forgotpwd',
//  templateUrl: './forgotpwd.component.html',
//  styleUrls: ['./forgotpwd.component.css']
//})
//export class ForgotpwdComponent {

//}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class forgotpwdComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  resetEmail: string = '';
  confirmPassword: string = '';
  otpSent: boolean = false;
  statusMessage: string = '';
  showForgotPassword: boolean = true;

  constructor(private http: HttpClient) { }

  requestOtp() {
    if (!this.email) {
      this.statusMessage = 'Please enter your email address.';
      return;
    }

    this.statusMessage = 'Sending OTP...';

    this.http.post('https://localhost:5001/api/account/request-otp', { email: this.email })
      .pipe(
        catchError((error) => {
          this.statusMessage = 'Failed to send OTP.';
          return of(null);
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.statusMessage = 'OTP sent to your email.';
          this.otpSent = true;
        }
      });
  }

  resetPassword() {
    if (!this.otp || !this.newPassword || !this.confirmPassword) {
      this.statusMessage = 'All fields are required.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.statusMessage = 'Passwords do not match.';
      return;
    }

    this.statusMessage = 'Verifying OTP...';

    this.http.post('https://localhost:5001/api/account/verify-otp', {
      email: this.email,
      otp: this.otp
    }).pipe(
      catchError((error) => {
        this.statusMessage = 'Invalid OTP.';
        return of(null);
      })
    ).subscribe((verifyRes: any) => {
      if (verifyRes) {
        this.http.post('https://localhost:5001/api/account/reset-password', {
          email: this.email,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        }).pipe(
          catchError((error) => {
            this.statusMessage = 'Password reset failed.';
            return of(null);
          })
        ).subscribe((resetRes: any) => {
          if (resetRes) {
            this.statusMessage = 'Password reset successful!';
            this.otpSent = false;
            this.email = '';
            this.otp = '';
            this.newPassword = '';
            this.confirmPassword = '';
          }
        });
      }
    });
  }
}

