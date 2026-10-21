import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';
import { HeroParallaxDirective } from '../../shared/directives/hero-parallax.directive';

/** Migrated from the original site's public/index.html */
@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RevealDirective, TiltDirective, CountUpDirective, HeroParallaxDirective],
  templateUrl: './home-page.html',
})
export class HomePage {
}
