import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MainEvent } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  get events(): Observable<any> {
    return this.http.get('assets/mock-data/events.json');
  }

  addDefaultSounds(events: MainEvent[]) {
    events.forEach((e) =>
      e.eventItems.forEach((ei) => {
        if (!ei.sound) {
          ei.sound = 'assets/multimedia/default-sound.mp3';
        }
      })
    );
  }
}
