import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Migrated from the original site's public/privacy-policy.html.
 * This page has its own simple "document" header and footer (no navigation),
 * so its route sets `layout: 'doc'` and the shared header/footer are hidden.
 */
@Component({
  selector: 'app-privacy-policy-page',
  imports: [RouterLink],
  templateUrl: './privacy-policy-page.html',
  styleUrl: './privacy-policy-page.css',
})
export class PrivacyPolicyPage {
  /** Shown in this page's own footer (replaces the old <span id="year"> script). */
  readonly year = new Date().getFullYear();
}
