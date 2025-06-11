import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    ])
  ]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Add any initialization logic
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call (replace with your actual API call)
    setTimeout(() => {
      // Mock authentication
      if (this.username === 'admin' && this.password === 'admin123') {
        localStorage.setItem('authToken', 'mock-token');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
        this.isLoading = false;
      }
    }, 1500);
  }
}
