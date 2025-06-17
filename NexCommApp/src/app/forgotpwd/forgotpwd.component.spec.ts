import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotPwdComponent {
  resetEmail: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  otpSent: boolean = false;
  statusMessage: string = '';

  constructor(private router: Router) { }

  requestOtp(): void {
    if (!this.resetEmail) {
      this.statusMessage = 'Please enter your email address.';
      return;
    }

    // Simulate sending OTP
    this.otpSent = true;
    this.statusMessage = 'OTP has been sent to your email.';
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.statusMessage = 'Passwords do not match.';
      return;
    }

    // Simulate password reset logic
    this.statusMessage = 'Your password has been successfully reset!';
  }

  close(): void {
    this.router.navigate(['/login']);
  }
}
