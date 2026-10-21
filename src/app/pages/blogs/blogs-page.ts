import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** Migrated from the original site's public/blogs.html */
@Component({
  selector: 'app-blogs-page',
  imports: [RevealDirective],
  templateUrl: './blogs-page.html',
})
export class BlogsPage {
}
