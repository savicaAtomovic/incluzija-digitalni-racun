import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainEvent } from '../models/event';
import { Language } from '../models/language';
import { SettingsService } from '../services/settings.service';
import { TopbarTitleService } from '../services/title.service';
import { SocialSituationService } from './social-situation.service';

@Component({
  selector: 'app-social-situation-list',
  templateUrl: './social-situation-list.component.html',
  styleUrls: ['./social-situation-list.component.scss'],
})
export class SocialSituationsListComponent implements OnInit {
  constructor(
    private socialSituationService: SocialSituationService,
    private router: Router,
    private titleService: TopbarTitleService,
    public settingsService: SettingsService
  ) {}

  events: MainEvent[] = [];
  MAIN_TITLE: string = 'POČETNA';
  Language = Language;

  ngOnInit(): void {
    this.titleService.topbarTitle.next(this.MAIN_TITLE);
    this.socialSituationService.events.subscribe((events) => {
      this.events = events;
      this.socialSituationService.addDefaultAlbaniaDescriptionMainEvents(
        this.events
      );
    });
  }

  onClick(event: MainEvent) {
    console.log('image onClick', event);
    this.router.navigate(['/social-situations', event.id]);
  }

  goBack() {
    this.router.navigate(['/social-situations']);
  }
}
