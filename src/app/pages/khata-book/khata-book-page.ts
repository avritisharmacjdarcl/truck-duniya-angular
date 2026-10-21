import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

/** Migrated from the original site's public/khata-book.html */
@Component({
  selector: 'app-khata-book-page',
  imports: [RouterLink, RevealDirective, TiltDirective],
  templateUrl: './khata-book-page.html',
})
export class KhataBookPage {
}
