import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { Iuser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/chats']);
    }
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = ''; // Clear any previous errors
  
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('admin', response.role === 'admin' ? 'true' : 'false');
  
        const redirectUrl = this.authService.redirectUrl || '/chats';
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Invalid username or password';
      }
    });
  }
}
