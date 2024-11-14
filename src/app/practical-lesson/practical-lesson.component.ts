import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animation } from '../models/active-slides';
import { MainEvent } from '../models/event';
import { EventItem } from '../models/event-item';
import { Language } from '../models/language';
import { VoiceType } from '../models/voice-type';
import { PracticalLessonsService } from '../practical-lessons-list/practical-lessons.service';
import { SettingsService } from '../services/settings.service';
import { TopbarTitleService } from '../services/title.service';

@Component({
  selector: 'app-practical-lesson',
  templateUrl: './practical-lesson.component.html',
  styleUrls: ['./practical-lesson.component.scss'],
})
export class PracticalLessonComponent implements OnInit {
  slides: EventItem[] = [];
  topbarTitle: string = '';
  paused = false;
  AnimationEnum = Animation;

  constructor(
    private activatedRoute: ActivatedRoute,
    private practicalLessonsService: PracticalLessonsService,
    private titleService: TopbarTitleService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id', id);
    this.practicalLessonsService.practicalLessons.subscribe(
      (lessons: MainEvent[]) => {
        console.log('lessons', lessons);
        const lesson = lessons.find((l: MainEvent) => l.id === Number(id));
        console.log('lesson', lesson);
        if (lesson) {
          this.practicalLessonsService.addDefaultSounds(lesson.eventItems);
          this.practicalLessonsService.addDefaultMaleSounds(lesson.eventItems);
          this.practicalLessonsService.addDefaultAlbaniaFemaleSounds(
            lesson.eventItems
          );
          this.practicalLessonsService.addDefaultAlbaniaDescriptionItems(
            lesson.eventItems
          );

          if (this.settingsService.voiceType.value === VoiceType.MALE) {
            lesson.eventItems.forEach(
              (eventItem: EventItem) => (eventItem.sound = eventItem.soundMale)
            );
          }

          if (this.settingsService.language.value === Language.ALBANIA) {
            lesson.eventItems.forEach((eventItem: EventItem) => {
              eventItem.sound = eventItem.soundAlb;
              eventItem.description = eventItem.descriptionAlb;
            });
            this.practicalLessonsService.addDefaultAlbaniaDescriptionMainEvents(
              [lesson]
            );
          }

          console.log('lesson', lesson);
          this.topbarTitle = lesson.description;
          this.slides = lesson.eventItems;
          this.titleService.topbarTitle.next(lesson.description);
        }
      }
    );
  }

  pause(event: boolean) {
    this.paused = event;
  }
}
