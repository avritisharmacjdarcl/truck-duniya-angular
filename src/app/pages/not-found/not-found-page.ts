import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Migrated from the original site's public/404.html */
@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage {
}
