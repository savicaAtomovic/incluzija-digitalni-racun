import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animation } from '../models/active-slides';
import { MainEvent } from '../models/event';
import { EventItem } from '../models/event-item';
import { Language } from '../models/language';
import { VoiceType } from '../models/voice-type';
import { SettingsService } from '../services/settings.service';
import { TopbarTitleService } from '../services/title.service';
import { SocialSituationService } from '../social-situation-list/social-situation.service';

@Component({
  selector: 'app-social-situation',
  templateUrl: './social-situation.component.html',
  styleUrls: ['./social-situation.component.scss'],
})
export class SocialSituationComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private socialSituationService: SocialSituationService,
    private titleService: TopbarTitleService,
    private settingsService: SettingsService
  ) {}

  AnimationEnum = Animation;
  slides: any;
  topbarTitle: String;
  paused = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id from route', id);
    // TODO get all content related to content with id {id}

    this.socialSituationService.events.subscribe((events) => {
      const event: MainEvent = events.find(
        (e: MainEvent) => e.id === Number(id)
      );

      this.socialSituationService.addDefaultSounds(event.eventItems);
      this.socialSituationService.addDefaultMaleSounds(event.eventItems);
      this.socialSituationService.addDefaultAlbaniaFemaleSounds(
        event.eventItems
      );
      this.socialSituationService.addDefaultAlbaniaDescriptionItems(
        event.eventItems
      );

      if (this.settingsService.voiceType.value == VoiceType.MALE) {
        event.eventItems.forEach(
          (eventItem: EventItem) => (eventItem.sound = eventItem.soundMale)
        );
      }

      if (this.settingsService.language.value == Language.ALBANIA) {
        event.eventItems.forEach((eventItem: EventItem) => {
          eventItem.sound = eventItem.soundAlb;
          eventItem.description = eventItem.descriptionAlb;
        });
      }

      console.log('event', event);
      this.topbarTitle = event?.description ?? '';
      this.slides = event?.eventItems;
      this.titleService.topbarTitle.next(event ? event.description : '');
    });
  }

  pause(event: boolean) {
    console.log('eventpuse', event);
    this.paused = event;
  }
}
