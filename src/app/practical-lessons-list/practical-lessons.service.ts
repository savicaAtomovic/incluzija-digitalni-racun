import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventItem } from '../models/event-item';
import { MainEvent } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class PracticalLessonsService {
  constructor(private http: HttpClient) {}

  DEFAULT_SOUND_PATH = 'assets/multimedia/default-sound.mp3';
  DEFAULT_DESCRIPTION = 'N/A';

  get practicalLessons(): Observable<any> {
    return this.http.get('assets/mock-data/practical-lessons.json');
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
