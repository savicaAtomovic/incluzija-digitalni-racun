import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainEvent } from '../models/event';
import { TitleService } from '../services/title.service';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private mainService: MainService,
    private router: Router,
    private titleService: TitleService
  ) {}

  events: MainEvent[] = [];
  MAIN_TITLE: string = 'POČETNA';

  ngOnInit(): void {
    this.titleService.topbarTitle.next(this.MAIN_TITLE);
    this.mainService.events.subscribe((events) => {
      this.events = events;
    });
  }

  onClick(event: MainEvent) {
    console.log('image onClick', event);
    this.router.navigate(['/board', event.id]);
  }

  goBack() {
    this.router.navigate(['/board']);
  }
}
