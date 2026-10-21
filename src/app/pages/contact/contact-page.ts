import { Component, inject, signal } from '@angular/core';
import { EnquiryService } from '../../core/enquiry.service';

/**
 * Contact page. Migrated from the original public/contact.html plus the
 * window.tdContactSubmit function in partner.js.
 */
@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
})
export class ContactPage {
  private readonly enquiry = inject(EnquiryService);

  readonly sending = signal(false);
  /** Message under the button, and whether it is a success ('ok') or an error ('err'). */
  readonly status = signal('');
  readonly statusKind = signal<'ok' | 'err' | ''>('');

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Honeypot: real users never fill the hidden "_company" field.
    const honeypot = form.elements.namedItem('_company') as HTMLInputElement | null;
    if (honeypot?.value) return;

    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => {
      if (k !== '_company') data[k] = String(v);
    });

    this.sending.set(true);
    this.status.set('');
    this.statusKind.set('');

    this.enquiry.send('Contact Us', data).subscribe({
      next: () => {
        form.reset();
        this.sending.set(false);
        this.statusKind.set('ok');
        this.status.set('Thanks! Your message has been sent. Our team will get back to you within one working day.');
      },
      error: () => {
        this.sending.set(false);
        this.statusKind.set('err');
        this.status.set('Sorry, your message could not be sent. Please call our Helpline no. 1800 202 2123 or email reachus@truckduniya.co.in.');
      },
    });
  }
}
