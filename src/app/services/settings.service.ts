import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { VoiceType } from '../models/voice-type';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public voiceType = new BehaviorSubject<VoiceType>(VoiceType.FEMALE);
  constructor() {}
}
