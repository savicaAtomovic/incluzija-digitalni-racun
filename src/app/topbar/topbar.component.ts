import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language } from '../models/language';
import { VoiceType } from '../models/voice-type';
import { SettingsService } from '../services/settings.service';
import { LetterGameLevel } from '../models/letter-game-level';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  constructor(
    private router: Router,
    public settingsService: SettingsService
  ) {}

  @Input() title: String = '';
  @Input() showBackButton: boolean;
  @Input() showSettings: boolean;
  @Input() backOnPage: string;
  @Input() showLetterGameSettings: boolean;

  VoiceType = VoiceType;
  Language = Language;
  LetterGameLevel = LetterGameLevel;

  ngOnInit(): void {}

  goBack() {
    this.backOnPage
      ? this.router.navigate([this.backOnPage])
      : this.router.navigate(['/board']);
  }

  setVoice(voiceType: VoiceType) {
    this.settingsService.voiceType.next(voiceType);
  }

  setLanguage(language: Language) {
    this.settingsService.language.next(language);
  }

  setLetterGameLevel(letterGameLevel: LetterGameLevel) {
    this.settingsService.letterGameLevel.next(letterGameLevel);
  }

  newLetterGame() {
    this.settingsService.newLetterGame.next(true);
  }
}
