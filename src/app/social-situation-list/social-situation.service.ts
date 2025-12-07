import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { shareReplay } from 'rxjs/operators';

import { MainEvent } from '../models/event';
import { EventItem } from '../models/event-item';

@Injectable({
  providedIn: 'root',
})
export class SocialSituationService {
  constructor(private http: HttpClient) {}

  DEFAULT_SOUND_PATH = 'assets/multimedia/default-sound.mp3';
  DEFAULT_DESCRIPTION = 'N/A';

  private eventsCache$: Observable<MainEvent[]>;

  get events(): Observable<MainEvent[]> {
    if (!this.eventsCache$) {
      this.eventsCache$ = this.http.get<MainEvent[]>('assets/mock-data/events.json').pipe(
        shareReplay(1) // Cache the result
      );
    }
    return this.eventsCache$;
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

  // Helper method to get description based on language
  getDescription(item: EventItem, language: string): string {
    if (language === 'al' && item.descriptionAlb) {
      return item.descriptionAlb;
    }
    return item.description || this.DEFAULT_DESCRIPTION;
  }

  // Helper method to get event description based on language
  getEventDescription(event: MainEvent, language: string): string {
    if (language === 'al' && event.descriptionALB) {
      return event.descriptionALB;
    }
    return event.description || this.DEFAULT_DESCRIPTION;
  }

  // Helper method to get event name based on language
  getEventName(event: MainEvent, language: string): string {
    if (language === 'al' && event.descriptionALB) {
      return event.descriptionALB;
    }
    return event.name || '';
  }
}
