import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Animated number counter. Migrated from the "Number counters" block of the
 * original scripts.js.
 *
 * Usage (unchanged from the old HTML):
 *   <span class="count-up" data-target="86" data-suffix="%">0%</span>
 *
 * When the element scrolls into view it counts from 0 to data-target over
 * 1.6 seconds, formatted with Indian digit grouping (en-IN).
 */
@Directive({ selector: '.count-up' })
export class CountUpDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.animate();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.animate();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const el = this.host.nativeElement;
    const target = parseFloat(el.getAttribute('data-target') ?? '') || 0;
    const suffix = el.getAttribute('data-suffix') ?? '';
    const prefix = el.getAttribute('data-prefix') ?? '';
    const decimals = parseInt(el.getAttribute('data-decimals') ?? '0', 10);
    const duration = 1600;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const format = (v: number) =>
      prefix + v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      el.textContent = format(target * easeOut(p));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };
    requestAnimationFrame(tick);
  }
}
