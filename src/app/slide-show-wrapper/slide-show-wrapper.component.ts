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

  events: MainEvent[] = [];
  AnimationEnum = Animation;
  slides: any;
  topbarTitle: String;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id from route', id);
    // TODO get all content related to content with id {id}

    // this.titleService.topbarTitle.next(id ? id.toString() : '');

    this.mainService.events.subscribe((events) => {
      this.events = events;
      this.mainService.addDefaultSounds(this.events);
      this.mainService.addDefaultMaleSounds(this.events);
      this.mainService.addDefaultAlbaniaFemaleSounds(this.events);
      this.mainService.addDefaultAlbaniaDescription(this.events);
      if (this.settingsService.voiceType.value == VoiceType.MALE) {
        this.events.forEach((event) => {
          event.eventItems.forEach(
            (eventItem) => (eventItem.sound = eventItem.soundMale)
          );
        });
      }

      if (this.settingsService.language.value == Language.ALBANIA) {
        this.events.forEach((event) => {
          event.description = event.descriptionALB;
          event.eventItems.forEach((eventItem) => {
            eventItem.sound = eventItem.soundAlb;
            eventItem.description = eventItem.descriptionAlb;
          });
        });
      }
      const event = this.events.find((e) => e.id === Number(id));
      this.topbarTitle = event?.description ?? '';
      this.slides = event?.eventItems;
      this.titleService.topbarTitle.next(event ? event.description : '');
    });
  }
}
