import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { EnquiryService } from '../../core/enquiry.service';

type Step = 'intro' | 'form' | 'success';

/**
 * "Become a Sales Partner": the floating bottom-right button plus a modal with
 * three states (intro -> form -> success). Migrated from the original
 * partner.js, which built this markup with document.createElement at load
 * time. Here the markup lives in partner-modal.html and Angular shows/hides
 * the pieces based on the `open` and `step` signals.
 */
@Component({
  selector: 'app-partner-modal',
  templateUrl: './partner-modal.html',
})
export class PartnerModal {
  private readonly enquiry = inject(EnquiryService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly open = signal(false);
  readonly step = signal<Step>('intro');
  readonly submitting = signal(false);
  readonly error = signal('');

  private lastFocused: Element | null = null;

  openModal(): void {
    this.lastFocused = document.activeElement;
    this.open.set(true);
    document.body.classList.add('td-partner-open');
    this.setStep('intro');
    setTimeout(() => this.query<HTMLElement>('.td-partner-close')?.focus(), 30);
  }

  closeModal(): void {
    this.open.set(false);
    document.body.classList.remove('td-partner-open');
    this.resetForm();
    (this.lastFocused as HTMLElement | null)?.focus?.();
  }

  setStep(step: Step): void {
    this.step.set(step);
    if (step === 'form') {
      setTimeout(() => this.query<HTMLInputElement>('input[name="fullname"]')?.focus(), 40);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.closeModal();
  }

  submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      this.error.set('Please fill all required fields correctly.');
      form.reportValidity();
      return;
    }
    this.error.set('');
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => (data[k] = String(v)));

    this.submitting.set(true);
    this.enquiry
      .send('Sales Partner Registration', {
        'Full Name': data['fullname'],
        'Mobile Number': data['mobile'],
        email: data['email'],
        'City / District': data['city'],
        State: data['state'],
        'PIN Code': data['pincode'],
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.setStep('success');
        },
        error: () => {
          this.submitting.set(false);
          this.error.set('Sorry, your details could not be sent. Please try again, or call Helpline no. 1800 202 2123.');
        },
      });
  }

  private resetForm(): void {
    this.query<HTMLFormElement>('form.td-partner-step')?.reset();
    this.error.set('');
  }

  private query<T extends Element>(selector: string): T | null {
    return this.host.nativeElement.querySelector<T>(selector);
  }
}
