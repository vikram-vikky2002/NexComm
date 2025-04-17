import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    // Replace with your actual API endpoint
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('https://your-api-endpoint.com/login', loginData)
      .subscribe({
        next: (response: any) => {
          // Store user token or other auth data
          localStorage.setItem('authToken', response.token);

          // Redirect to dashboard or home page
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          console.error('Login error:', error);
        }
      });
  }
}
