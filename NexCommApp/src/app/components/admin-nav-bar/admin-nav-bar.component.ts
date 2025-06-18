import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {
  isMenuOpen: boolean = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private el: ElementRef,
      private renderer: Renderer2
    ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.renderer.addClass(document.body, 'menu-open');
    } else {
      this.renderer.removeClass(document.body, 'menu-open');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
      this.renderer.removeClass(document.body, 'menu-open');
    }
  }

  gotoChat() {
    this.router.navigate(['/chats']);
  }

  onLogout(): void {
    // Clear the token and user data
    this.authService.logout();
    // Navigate to login page
    this.router.navigate(['/login']);
    // Remove blur effect
    this.renderer.removeClass(document.body, 'menu-open');
  }
}
