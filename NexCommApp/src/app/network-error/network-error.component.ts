import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.css']
})
export class NetworkErrorComponent {
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.checkNetworkConnection();
  }
  
  checkNetworkConnection(): void {
    this.http.get<boolean>('http://localhost:3000/api/Dashboard/testing').subscribe({
      next: (response: boolean) => {
        if (!response) {
          this.router.navigate(['/network-error']);
        }
      },
      error: () => {
        this.router.navigate(['/network-error']);
      }
    });
  }
}
