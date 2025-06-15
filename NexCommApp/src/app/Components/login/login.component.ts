import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { Iuser } from '../../models/user.model';

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
    private userService: UserService
  ) { }

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

    const userObj = {
      userName: this.username,
      password: this.password
    };

    this.userService.validateCredentials(userObj).subscribe({
      next: (response: any) => {
        // Store user data and token
        console.log(response);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.userName);
        if(response.role == 'admin'){
          localStorage.setItem('admin', 'true');
        }
        else{
          localStorage.setItem('admin', 'false');
        }
        // Redirect to chats page
        this.router.navigate(['/chats']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Invalid username or password';
        this.isLoading = false;
      }
    });
  }
}
