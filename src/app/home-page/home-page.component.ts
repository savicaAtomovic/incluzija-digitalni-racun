import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToSocialSituations() {
    this.router.navigate(['/social-situations']);
  }

  navigateToGames() {
    this.router.navigate(['/games']);
  }

  navigateToPracticalLessons() {
    this.router.navigate(['/practical-lessons']);
  }
}
