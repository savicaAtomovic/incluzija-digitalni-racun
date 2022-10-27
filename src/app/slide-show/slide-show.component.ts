import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActiveSlides } from '../models/active-slides';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  animations: [
    trigger('slideState', [
      state(
        'current',
        style({
          transform: 'translateX(0%)',
          zIndex: 1,
        })
      ),
      state(
        'next',
        style({
          transform: 'translateX(100%)',
          zIndex: 1,
        })
      ),
      state(
        'previous',
        style({
          transform: 'translateX(-100%)',
          zIndex: 1,
        })
      ),
      transition('current => previous', animate('400ms ease-out')),
      transition('next => current', animate('400ms ease-out')),
    ]),
  ],
})
export class SlideShowComponent implements OnInit {
  @Input() slides: any;
  @Input() slideTemplateRef: any;

  AUTO_PLAY_DURATION = 1000;
  currentInterval: any;

  private _activeSlides: any;
  get activeSlides() {
    return this._activeSlides;
  }
  set activeSlides(activeSlides: ActiveSlides) {
    this._activeSlides = activeSlides;
  }

  constructor() {}

  ngOnInit(): void {
    console.log('slides', this.slides);
  }

  getAnimationSlideState(index: number) {
    return index === this.activeSlides.current
      ? 'current'
      : index === this.activeSlides.next
      ? 'next'
      : index === this.activeSlides.previous
      ? 'previous'
      : '';
  }
}
