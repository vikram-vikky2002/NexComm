import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NexCommApp';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.checkNetworkConnection();
  }

  checkNetworkConnection(): void {
    this.http.get<boolean>('http://172.20.10.4:3000/api/Dashboard/testing').subscribe({
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
