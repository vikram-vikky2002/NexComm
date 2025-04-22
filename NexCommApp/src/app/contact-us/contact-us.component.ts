
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  sendEmail(event: Event) {
    event.preventDefault();

    const subject = encodeURIComponent(`Message from ${this.formData.name}`);
    const body = encodeURIComponent(
      `Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`
    );
    const mailtoLink = `mailto:vivek.prasad@nexturn.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  }
}
