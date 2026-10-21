import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { PartnerModal } from './shared/partner-modal/partner-modal';
import { PageMetaService } from './core/page-meta.service';

/**
 * Root component = the page "shell". The header and footer stay on screen
 * while <router-outlet> swaps the page component for the current URL.
 * The Privacy Policy route sets `layout: 'doc'` and brings its own simple
 * header/footer, so the shared ones are hidden there.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, PartnerModal],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly pageMeta = inject(PageMetaService);

  get docLayout(): boolean {
    return this.pageMeta.current().layout === 'doc';
  }

  ngOnInit(): void {
    this.pageMeta.start();
  }
}
