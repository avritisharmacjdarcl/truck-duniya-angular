import { Injectable, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Extra per-page settings carried in each route's `data` (see app.routes.ts). */
export interface PageData {
  /** <meta name="description"> for the page. */
  description?: string;
  /** Extra class on <body>, e.g. 'page-home' (styles.css uses body.page-home). */
  bodyClass?: string;
  /** 'doc' = page brings its own simple header/footer (Privacy Policy). */
  layout?: 'doc';
  /** vltd page lists an extra "Buy GPS" link in the footer. */
  footerBuyGps?: boolean;
}

/**
 * On every navigation, applies the active route's data to the document:
 * meta description and <body> class. (The page <title> is handled by Angular's
 * built-in TitleStrategy from the `title` on each route.)
 *
 * In the old site each HTML file had its own <head> and <body class>. In a
 * single-page app there is only one index.html, so this service updates it.
 */
@Injectable({ providedIn: 'root' })
export class PageMetaService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);

  /** Data of the page currently shown; components can read it as a signal. */
  readonly current = signal<PageData>({});

  private bodyClass = '';

  start(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let r = this.route;
      while (r.firstChild) r = r.firstChild;
      const data = (r.snapshot.data ?? {}) as PageData;
      this.current.set(data);

      if (data.description) this.meta.updateTag({ name: 'description', content: data.description });
      else this.meta.removeTag('name="description"');

      if (this.bodyClass) document.body.classList.remove(this.bodyClass);
      this.bodyClass = data.bodyClass ?? '';
      if (this.bodyClass) document.body.classList.add(this.bodyClass);
    });
  }
}
