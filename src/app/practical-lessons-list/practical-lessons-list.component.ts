import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { TopbarTitleService } from '../services/title.service';
import { PracticalLessonsService } from './practical-lessons.service';
import { MainEvent } from '../models/event';
import { Language } from '../models/language';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practical-lessons-list',
  templateUrl: './practical-lessons-list.component.html',
  styleUrl: './practical-lessons-list.component.scss',
})
export class PracticalLessonsListComponent implements OnInit {
  practicalLessons: MainEvent[] = [];
  Language = Language;

  constructor(
    private titleService: TopbarTitleService,
    public settingsService: SettingsService,
    private practicalLessonsService: PracticalLessonsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.practicalLessonsService.practicalLessons.subscribe(
      (practicalLessons) => {
        this.practicalLessons = practicalLessons;
        this.practicalLessonsService.addDefaultAlbaniaDescriptionMainEvents(
          this.practicalLessons
        );
      }
    );
  }

  onClick(practicalLesson: MainEvent) {
    console.log('image onClick', practicalLesson);
    this.router.navigate(['/practical-lessons', practicalLesson.id]);
  }

  goBack() {
    this.router.navigate(['/practical-lessons']);
  }
}
