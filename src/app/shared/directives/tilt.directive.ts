import { Directive, ElementRef, HostListener, OnInit, inject } from '@angular/core';

/**
 * Subtle 3D tilt that follows the cursor on service cards. Migrated from the
 * "Magnetic / tilt hover" block of the original scripts.js.
 *
 * Applies to any element with a `data-tilt` attribute. It only writes four
 * CSS custom properties (--rx, --ry, --mx, --my); styles.css does the rest.
 */
@Directive({ selector: '[data-tilt]' })
export class TiltDirective implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame: number | null = null;

  ngOnInit(): void {
    this.reset();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const el = this.host.nativeElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const maxTilt = 6;
    const ry = (px - 0.5) * (maxTilt * 2);
    const rx = -(py - 0.5) * (maxTilt * 2);
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    });
  }

  @HostListener('mouseleave')
  reset(): void {
    const el = this.host.nativeElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  }
}
