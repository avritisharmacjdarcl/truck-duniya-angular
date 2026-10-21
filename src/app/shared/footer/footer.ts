import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageMetaService } from '../../core/page-meta.service';

/**
 * Site footer, shown on every route. Replaces the <footer> block that was
 * duplicated in each original HTML file. The year is computed here instead of
 * the old <span id="year"> + inline script.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  private readonly pageMeta = inject(PageMetaService);

  readonly year = new Date().getFullYear();

  /** The original vltd.html listed an extra "Buy GPS" link under Products. */
  get showBuyGps(): boolean {
    return !!this.pageMeta.current().footerBuyGps;
  }
}
