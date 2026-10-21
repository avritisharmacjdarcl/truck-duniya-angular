import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

/** Migrated from the original site's public/services.html */
@Component({
  selector: 'app-services-page',
  imports: [RouterLink, RevealDirective, TiltDirective],
  templateUrl: './services-page.html',
})
export class ServicesPage {
}
