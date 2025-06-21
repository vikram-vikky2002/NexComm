import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { OtpService } from '../../services/otp.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('floatIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.9)' }),
        animate('400ms 200ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('strengthPopup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NewPasswordComponent implements OnInit {
  otp: string = '';
  generatedOTP: string = '';
  newPassword: string = '';
  email: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isFormValid: boolean = false;
  showConfirmError: boolean = false;
  isOTPVerified: boolean = false;

  // Password validation properties
  showPasswordHints: boolean = false;
  hasMinLength: boolean = false;
  hasUppercase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;

  // Password strength properties
  showStrengthPopup: boolean = false;
  strengthMessage: string = '';
  strengthClass: string = '';
  private strengthTimeout: any;

  constructor(private router: Router, private otpService: OtpService, private authService: AuthService) { }

  ngOnInit(): void { }

  validateNewPassword(): void {
    if (!this.newPassword) {
      this.showPasswordHints = false;
      this.hideStrengthPopup();
      this.checkFormValidity();
      return;
    }

    this.showPasswordHints = true;
    this.hasMinLength = this.newPassword.length >= 8;
    this.hasUppercase = /[A-Z]/.test(this.newPassword);
    this.hasNumber = /[0-9]/.test(this.newPassword);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);

    this.calculateStrength();
    this.validateConfirmPassword();
  }

  validateConfirmPassword(): void {
    this.showConfirmError = this.newPassword !== this.confirmPassword && this.confirmPassword.length > 0;
    this.checkFormValidity();
  }

  calculateStrength(): void {
    let strength = 0;

    if (this.newPassword.length >= 12) strength += 3;
    else if (this.newPassword.length >= 8) strength += 2;
    else strength += 1;

    if (this.hasUppercase) strength += 1;
    if (this.hasNumber) strength += 1;
    if (this.hasSpecialChar) strength += 1;

    if (strength <= 3) {
      this.strengthMessage = 'Weak Password';
      this.strengthClass = 'weak';
    } else if (strength <= 5) {
      this.strengthMessage = 'Medium Password';
      this.strengthClass = 'medium';
    } else {
      this.strengthMessage = 'Strong Password!';
      this.strengthClass = 'strong';
    }

    this.showStrengthPopup = true;

    clearTimeout(this.strengthTimeout);
    this.strengthTimeout = setTimeout(() => {
      this.hideStrengthPopup();
    }, 3000);
  }

  hideStrengthPopup(): void {
    this.showStrengthPopup = false;
  }

  checkFormValidity(): void {
    this.isFormValid =
      this.newPassword.length >= 8 &&
      this.hasUppercase &&
      this.hasNumber &&
      this.hasSpecialChar &&
      this.newPassword === this.confirmPassword;
  }

  // onSubmit(): void {
  //   if (!this.isFormValid) {
  //     this.errorMessage = 'Please fill all required fields';
  //     return;
  //   }
  
  //   if (!this.generatedOTP) {
  //     // Generate and send OTP if not already generated
  //     this.generateAndSendOTP();
  //     return;
  //   }
  
  //   if (!this.isOTPVerified) {
  //     // Verify OTP if already generated
  //     this.verifyOTP();
  //     return;
  //   }
  
  //   // If OTP is verified, proceed with password update
  //   this.updatePassword();
  // }

  generateAndSendOTP(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    // Generate a 6-digit OTP
    this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    this.otpService.sendOtp(this.email, this.generatedOTP)
      .then(() => alert('OTP sent to your email!'))
      .catch(() => alert('Failed to send OTP.'));
    
    // Store OTP in session storage
    sessionStorage.setItem('resetPasswordOTP', this.generatedOTP);
    sessionStorage.setItem('resetPasswordEmail', this.email);
  
    // Simulate sending email
    setTimeout(() => {
      this.isLoading = false;
      this.errorMessage = 'OTP has been sent to your email. Please check your inbox.';
    }, 2000);
  }
  
  verifyOTP(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    const storedOTP = sessionStorage.getItem('resetPasswordOTP');
    const storedEmail = sessionStorage.getItem('resetPasswordEmail');
  
    if (storedOTP && storedEmail && storedEmail === this.email && this.otp === storedOTP) {
      this.isOTPVerified = true;
      this.errorMessage = 'OTP verified successfully!';
    } else {
      this.errorMessage = 'Invalid OTP. Please try again.';
    }
  
    this.isLoading = false;
  }
  
  updatePassword(): void {
    this.isLoading = true;
    this.errorMessage = '';
    alert('Password updated successfully! Please login with your new password.');
      this.authService.setNewPassword(this.newPassword, this.email)
      .subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
          alert('Password updated successfully! Please login with your new password.');
        }
      );
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}
