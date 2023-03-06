import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main/main.service';
import { Image } from '../models/image';
import { TopbarTitleService } from '../services/title.service';
import { Animation } from '../models/active-slides';
import { MainEvent } from '../models/event';
import { SettingsService } from '../services/settings.service';
import { VoiceType } from '../models/voice-type';
import { Language } from '../models/language';
import { EventItem } from '../models/event-item';

@Component({
  selector: 'app-slide-show-wrapper',
  templateUrl: './slide-show-wrapper.component.html',
  styleUrls: ['./slide-show-wrapper.component.scss'],
})
export class SlideShowWrapperComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private titleService: TopbarTitleService,
    private settingsService: SettingsService
  ) {}

  AnimationEnum = Animation;
  slides: any;
  topbarTitle: String;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id from route', id);
    // TODO get all content related to content with id {id}

    this.mainService.events.subscribe((events) => {
      const event: MainEvent = events.find(
        (e: MainEvent) => e.id === Number(id)
      );

      this.mainService.addDefaultSounds(event.eventItems);
      this.mainService.addDefaultMaleSounds(event.eventItems);
      this.mainService.addDefaultAlbaniaFemaleSounds(event.eventItems);
      this.mainService.addDefaultAlbaniaDescriptionItems(event.eventItems);

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
      this.topbarTitle = event?.description ?? '';
      this.slides = event?.eventItems;
      this.titleService.topbarTitle.next(event ? event.description : '');
    });
  }
}
