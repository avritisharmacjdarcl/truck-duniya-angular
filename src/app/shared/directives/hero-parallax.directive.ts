import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Parallax on the home-page hero video. Migrated from the "Parallax on hero
 * video" block of the original scripts.js. Attaches to `.hero-video-el`.
 */
@Directive({ selector: '.hero-video-el' })
export class HeroParallaxDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      this.host.nativeElement.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(1.04)`;
    }
  }
}
