import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  currantDate: Date = new Date(); // Initialize currentDate with the current date
  constructor(private location: Location) { } // Inject Location service to navigate back

  goBack(): void {

    this.location.back(); // Navigate back to the previous page
  }
}
