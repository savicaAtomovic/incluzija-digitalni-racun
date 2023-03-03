import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoiceType } from '../models/voice-type';
import { Language } from '../models/language';
import { SettingsService } from '../services/settings.service';

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

  VoiceType = VoiceType;
  Language = Language;

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/board']);
  }

  setFemaleVoice() {
    this.settingsService.voiceType.next(VoiceType.FEMALE);
  }

  setMaleVoice() {
    this.settingsService.voiceType.next(VoiceType.MALE);
  }

  setMontenegroLanguage() {
    this.settingsService.language.next(Language.MONTENEGRO);
  }

  setAlbaniaLanguage() {
    this.settingsService.language.next(Language.ALBANIA);
  }
}
