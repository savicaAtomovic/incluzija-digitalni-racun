import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MainEvent } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  DEFAULT_SOUND_PATH = 'assets/multimedia/default-sound.mp3';

  get events(): Observable<any> {
    return this.http.get('assets/mock-data/events.json');
  }

  addDefaultSounds(events: MainEvent[]) {
    events.forEach((e) =>
      e.eventItems.forEach((ei) => {
        if (!ei.sound) {
          ei.sound = this.DEFAULT_SOUND_PATH;
        }
      })
    );
  }

  addDefaultMaleSounds(events: MainEvent[]) {
    events.forEach((e) =>
      e.eventItems.forEach((ei) => {
        if (!ei.soundMale) {
          ei.soundMale = ei.sound;
        }
      })
    );
  }

  addDefaultAlbaniaFemaleSounds(events: MainEvent[]) {
    events.forEach((e) =>
      e.eventItems.forEach((ei) => {
        if (!ei.soundAlb) {
          ei.soundAlb = ei.sound;
        }
      })
    );
  }

  addDefaultAlbaniaDescription(events: MainEvent[]) {
    events.forEach((e) =>
      e.eventItems.forEach((ei) => {
        if (!ei.descriptionALB) {
          ei.descriptionALB = ei.description;
        }
      })
    );
  }
}
