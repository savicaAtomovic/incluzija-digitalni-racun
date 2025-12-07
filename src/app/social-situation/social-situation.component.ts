import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class SocialSituationComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private socialSituationService: SocialSituationService,
    private titleService: TopbarTitleService,
    private settingsService: SettingsService
  ) {}

  AnimationEnum = Animation;
  slides: EventItem[] = [];
  topbarTitle: string = '';
  paused = false;
  thumbnailErrors: { [key: number]: boolean } = {};
  private currentEvent: MainEvent | undefined;
  private languageSubscription: Subscription;
  private currentLanguage: string = 'me';

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    // Subscribe to language changes
    this.languageSubscription = this.settingsService.language.subscribe((lang) => {
      this.currentLanguage = lang === Language.ALBANIA ? 'al' : 'me';
      if (this.currentEvent) {
        this.updateDisplayLanguage();
      }
    });

    this.socialSituationService.events.subscribe((events) => {
      this.currentEvent = events.find(
        (e: MainEvent) => e.id === Number(id)
      );

      if (!this.currentEvent) return;

      this.socialSituationService.addDefaultSounds(this.currentEvent.eventItems);
      this.socialSituationService.addDefaultMaleSounds(this.currentEvent.eventItems);
      this.socialSituationService.addDefaultAlbaniaFemaleSounds(
        this.currentEvent.eventItems
      );
      this.socialSituationService.addDefaultAlbaniaDescriptionItems(
        this.currentEvent.eventItems
      );

      this.updateDisplayLanguage();
    });
  }

  updateDisplayLanguage() {
    if (!this.currentEvent) return;

    // Reset thumbnail errors when language changes
    this.thumbnailErrors = {};

    // Update title based on language
    this.topbarTitle = this.socialSituationService.getEventDescription(
      this.currentEvent,
      this.currentLanguage
    );
    this.titleService.topbarTitle.next(this.topbarTitle);

    // Create slides with language-aware descriptions and sounds
    this.slides = this.currentEvent.eventItems.map((item) => ({
      ...item,
      description: this.socialSituationService.getDescription(item, this.currentLanguage),
      sound: this.getSoundForLanguageAndVoice(item)
    }));
  }

  getSoundForLanguageAndVoice(item: EventItem): string {
    const isMale = this.settingsService.voiceType.value === VoiceType.MALE;
    const isAlbanian = this.currentLanguage === 'al';

    if (isAlbanian) {
      return item.soundAlb || this.socialSituationService.DEFAULT_SOUND_PATH;
    }
    if (isMale) {
      return item.soundMale || item.sound || this.socialSituationService.DEFAULT_SOUND_PATH;
    }
    return item.sound || this.socialSituationService.DEFAULT_SOUND_PATH;
  }

  pause(event: boolean) {
    this.paused = event;
  }

  onThumbnailError(index: number) {
    this.thumbnailErrors[index] = true;
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
