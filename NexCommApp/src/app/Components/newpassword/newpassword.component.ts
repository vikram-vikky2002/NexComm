import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isFormValid: boolean = false;
  showConfirmError: boolean = false;

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

  constructor(private router: Router) { }

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
      this.currentPassword.length > 0 &&
      this.newPassword.length >= 8 &&
      this.hasUppercase &&
      this.hasNumber &&
      this.hasSpecialChar &&
      this.newPassword === this.confirmPassword;
  }

  onSubmit(): void {
    if (!this.isFormValid) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would call your C# backend here
      console.log('Password change submitted:', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      });

      // Simulate success
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  onCancel(): void {
    this.router.navigate(['/profile']); // Or wherever you want to redirect
  }
}
