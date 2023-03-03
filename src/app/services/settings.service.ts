import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Language } from '../models/language';
import { VoiceType } from '../models/voice-type';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public voiceType = new BehaviorSubject<VoiceType>(VoiceType.FEMALE);
  public language = new BehaviorSubject<Language>(Language.MONTENEGRO);
  constructor() {}
}
