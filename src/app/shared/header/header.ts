import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageService } from '../../core/language.service';

/**
 * Site header: logo, navigation, "Buy FASTag" / "Buy GPS" buttons and the
 * language switcher. In the old site this <header> block was copied into
 * 20 HTML files; now it exists once and is shown on every route.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly router = inject(Router);
  readonly lang = inject(LanguageService);

  /** Mobile menu open/closed (was the inline onclick toggling class "open"). */
  readonly menuOpen = signal(false);

  /** True once the page is scrolled 40px; adds .is-scrolled to shrink the bar. */
  readonly scrolled = signal(false);

  ngOnInit(): void {
    this.lang.load();
    this.onScroll();
    // Close the mobile menu whenever the user navigates to another page.
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  changeLanguage(event: Event): void {
    this.lang.set((event.target as HTMLSelectElement).value);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
