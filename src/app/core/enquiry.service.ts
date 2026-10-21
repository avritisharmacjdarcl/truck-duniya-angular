import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/** The inbox that receives website enquiries (was window.TD_ENQUIRY_EMAIL). */
export const ENQUIRY_EMAIL = 'reachus@truckduniya.co.in';

/** Shape of FormSubmit's JSON reply. */
interface FormSubmitReply {
  success?: string | boolean;
  message?: string;
}

/**
 * Sends Contact Us and Sales Partner submissions by email.
 * Migrated from window.tdSendEnquiry in the original partner.js.
 *
 * Today this goes through the FormSubmit relay (formsubmit.co), exactly as the
 * original site does. FormSubmit only delivers after the inbox owner clicks the
 * one-time "Activate Form" email it sends on the first submission from a domain.
 *
 * To switch to the Firebase Cloud Function in truck-duniya-website/functions
 * (once that project is on the Blaze plan and the function is deployed with a
 * Hosting rewrite for /api/enquiry), replace the body of send() with:
 *
 *   return this.http
 *     .post<{ ok: boolean; error?: string }>('/api/enquiry', {
 *       form: formName,
 *       fields: data,
 *       page: location.href,
 *     })
 *     .pipe(map((j) => { if (!j.ok) throw new Error(j.error || 'Send failed'); }));
 *
 * Nothing else in the app needs to change, because the components only know
 * about this service, not about where the email goes.
 */
@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly http = inject(HttpClient);

  send(formName: string, data: Record<string, string>): Observable<void> {
    const payload: Record<string, string> = {
      _subject: 'Truck Duniya enquiry: ' + formName,
      _template: 'table',
      _captcha: 'false',
      Form: formName,
      Page: location.href,
      ...data,
    };
    if (data['email']) payload['_replyto'] = data['email'];

    return this.http
      .post<FormSubmitReply>('https://formsubmit.co/ajax/' + ENQUIRY_EMAIL, payload, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((reply) => {
          if (String(reply.success) !== 'true') throw new Error(reply.message || 'Send failed');
        }),
      );
  }
}
