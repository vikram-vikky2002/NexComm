import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogout(): void {
    // Clear the token and user data
    this.authService.logout();
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
