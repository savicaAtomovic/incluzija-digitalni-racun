import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MainEvent } from '../models/event';

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

  fileExists(url: string): Observable<boolean> {
    return this.http.get(url).pipe(
      map((response) => {
        return true;
      }),
      catchError((error) => {
        return of(false);
      })
    );
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
          ei.soundAlb = this.DEFAULT_SOUND_PATH;
        }
      })
    );
  }

  addDefaultAlbaniaDescription(events: MainEvent[]) {
    events.forEach((e) => {
      e.descriptionALB = e.descriptionALB ?? this.DEFAULT_DESCRIPTION;
      e.eventItems.forEach((ei) => {
        if (!ei.descriptionAlb) {
          ei.descriptionAlb = this.DEFAULT_DESCRIPTION;
        }
      });
    });
  }
}
