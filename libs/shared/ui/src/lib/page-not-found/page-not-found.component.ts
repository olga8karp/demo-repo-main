import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-repo-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  /**
   * Navigate to home page
   */
  navigateToHomePage(): void {
    this.router.navigate(['']);
  }
}
