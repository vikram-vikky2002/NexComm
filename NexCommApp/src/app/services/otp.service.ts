import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({ providedIn: 'root' })
export class OtpService {
  private serviceID = 'service_qp9cjxr';
  private templateID = 'template_2d8fvlg';
  private publicKey = 'X4vMA4_wV4gLh-TBf';

  sendOtp(email: string, otp: string): Promise<void> {
    const templateParams = {
      email: email,
      generatedOTP: otp
    };

    return emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
      .then(() => console.log('OTP sent!'))
      .catch((err) => {
        console.error('Failed to send OTP:', err);
        throw err;
      });
  }
}
