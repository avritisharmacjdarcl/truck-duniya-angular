import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/** The three tab panels; the id doubles as the URL fragment (#annual-return). */
export type IrTab = 'financial' | 'annual-return' | 'csr';

/**
 * Investor Relations page. Migrated from public/investor-relations.html and
 * the inline tab-switching <script> it carried. The buttons and panels are
 * the same markup; Angular now drives aria-selected / hidden from `active`.
 */
@Component({
  selector: 'app-investor-relations-page',
  imports: [],
  templateUrl: './investor-relations-page.html',
})
export class InvestorRelationsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly tabs: IrTab[] = ['financial', 'annual-return', 'csr'];
  readonly active = signal<IrTab>('financial');

  ngOnInit(): void {
    // Deep link support: /investor-relations#csr opens the CSR tab.
    const fragment = this.route.snapshot.fragment as IrTab | null;
    if (fragment && this.tabs.includes(fragment)) this.active.set(fragment);
  }

  show(tab: IrTab): void {
    this.active.set(tab);
    history.replaceState(null, '', '#' + tab);
  }

  /** Left/right arrow keys move between tabs, like the original script. */
  onKeydown(event: KeyboardEvent, index: number): void {
    const d = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = this.tabs[(index + d + this.tabs.length) % this.tabs.length];
    this.show(next);
    (document.getElementById('tab-' + next) as HTMLElement | null)?.focus();
  }
}
