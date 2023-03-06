import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainEvent } from '../models/event';
import { EventItem } from '../models/event-item';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  DEFAULT_SOUND_PATH = 'assets/multimedia/default-sound.mp3';
  DEFAULT_DESCRIPTION = 'N/A';

  get events(): Observable<any> {
    return this.http.get('assets/mock-data/events.json');
  }

  addDefaultSounds(eventItems: EventItem[]) {
    eventItems.forEach((ei) => {
      if (!ei.sound) {
        ei.sound = this.DEFAULT_SOUND_PATH;
      }
    });
  }

  addDefaultMaleSounds(eventItems: EventItem[]) {
    eventItems.forEach((ei) => {
      if (!ei.soundMale) {
        ei.soundMale = ei.sound;
      }
    });
  }

  addDefaultAlbaniaFemaleSounds(eventItems: EventItem[]) {
    eventItems.forEach((ei) => {
      if (!ei.soundAlb) {
        ei.soundAlb = this.DEFAULT_SOUND_PATH;
      }
    });
  }

  addDefaultAlbaniaDescriptionItems(eventItems: EventItem[]) {
    eventItems.forEach((ei) => {
      if (!ei.descriptionAlb) {
        ei.descriptionAlb = this.DEFAULT_DESCRIPTION;
      }
    });
  }

  addDefaultAlbaniaDescriptionMainEvents(events: MainEvent[]) {
    events.forEach((ei) => {
      if (!ei.descriptionALB) {
        ei.descriptionALB = this.DEFAULT_DESCRIPTION;
      }
    });
  }
}
