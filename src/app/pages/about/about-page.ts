import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

/** Migrated from the original site's public/about.html */
@Component({
  selector: 'app-about-page',
  imports: [RouterLink, RevealDirective, TiltDirective],
  templateUrl: './about-page.html',
})
export class AboutPage {
}
