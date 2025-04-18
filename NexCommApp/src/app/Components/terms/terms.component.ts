import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent {
  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
