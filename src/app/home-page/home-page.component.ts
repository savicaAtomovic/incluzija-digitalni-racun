import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocialSituationService } from '../social-situation-list/social-situation.service';
import { MainEvent } from '../models/event';
import { SettingsService } from '../services/settings.service';
import { Language } from '../models/language';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  homeOptions: MainEvent[] = [];
  currentLanguage: string = 'me';
  private languageSubscription: Subscription;

  constructor(
    private router: Router,
    private socialSituationService: SocialSituationService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    // Subscribe to language changes
    this.languageSubscription = this.settingsService.language.subscribe((lang) => {
      this.currentLanguage = lang === Language.ALBANIA ? 'al' : 'me';
    });

    this.socialSituationService.events.subscribe((events) => {
      // Load only the first 4 events for home page
      this.homeOptions = events;
    });
  }

  getEventName(event: MainEvent): string {
    return this.socialSituationService.getEventName(event, this.currentLanguage);
  }

  navigateToEvent(eventId: number) {
    this.router.navigate(['/account-info', eventId]);
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
