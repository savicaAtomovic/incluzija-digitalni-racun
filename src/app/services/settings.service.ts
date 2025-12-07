import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Language } from '../models/language';
import { VoiceType } from '../models/voice-type';
import { LetterGameLevel } from '../models/letter-game-level';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public voiceType = new BehaviorSubject<VoiceType>(VoiceType.FEMALE);
  public language = new BehaviorSubject<Language>(Language.MONTENEGRO);
  public letterGameLevel = new BehaviorSubject<LetterGameLevel>(
    LetterGameLevel.FIRST_LETTER
  );
  public newLetterGame = new BehaviorSubject<boolean>(false);

  public newLetterPermutationsGame = new BehaviorSubject<boolean>(false);

  public newMissingWordGame = new BehaviorSubject<boolean>(false);

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('me');
    this.language.subscribe((lang) => {
      switch (lang) {
        case Language.MONTENEGRO:
          this.translate.use('me');
          break;
        case Language.ALBANIA:
          this.translate.use('al');
          break;
        case Language.SERBIAN:
          this.translate.use('sr');
          break;
      }
    });
  }
}
