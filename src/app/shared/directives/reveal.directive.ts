import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Scroll-reveal. Migrated from the first block of the original scripts.js.
 *
 * Any element with a `data-reveal` attribute (e.g. data-reveal="up") fades and
 * slides in when it scrolls into view. The CSS in styles.css hides
 * [data-reveal] elements until the `is-revealed` class is added here.
 * Optional `data-reveal-delay="150"` delays the animation (milliseconds).
 *
 * Because the selector is an attribute selector, the existing HTML did not
 * have to change: Angular attaches this directive to every element that has
 * data-reveal, as long as the page component imports RevealDirective.
 */
@Directive({ selector: '[data-reveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.transitionDelay = delay + 'ms';

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
