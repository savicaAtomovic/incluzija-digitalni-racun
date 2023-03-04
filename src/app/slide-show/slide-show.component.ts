import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { ActiveSlides, Animation, Direction } from '../models/active-slides';
import { Language } from '../models/language';
import { SettingsService } from '../services/settings.service';

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
export class SlideShowComponent implements OnInit, AfterViewInit {
  @Input()
  slides: any;
  @Input()
  isNavigationVisible = false;
  @Input()
  isThumbnailsVisible = false;
  @Input()
  animation: Animation = Animation.Fade;
  @Input()
  autoPlayDuration = 0;
  @Input()
  slideTemplateRef: TemplateRef<any>;
  @Input()
  thumbnailTemplateRef: TemplateRef<any>;
  currentInterval: NodeJS.Timer;
  differ: KeyValueDiffer<ActiveSlides, any>;

  paused: boolean = false;

  MILISECONDS: number = 1000;
  IMAGE_DELAY: number = 1000;

  currentSlideIndex = 0;

  @ViewChild('sound', { static: true })
  sound: ElementRef;

  private _direction: Direction = Direction.Next;
  get direction() {
    return this._direction;
  }
  set direction(direction: Direction) {
    this._direction = direction;
  }

  private _activeSlides: ActiveSlides;
  get activeSlides() {
    return this._activeSlides;
  }
  set activeSlides(activeSlides: ActiveSlides) {
    this._activeSlides = activeSlides;
  }

  Language = Language;

  constructor(
    private cd: ChangeDetectorRef,
    private differs: KeyValueDiffers,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    if (this.slides) {
      this.activeSlides = this.getPreviousCurrentNextIndexes(0);
      const audioObj = new Audio();
      audioObj.src = this.slides[0].sound;
      audioObj.addEventListener('loadeddata', () => {
        let duration = audioObj.duration;
        this.autoPlayDuration = duration * this.MILISECONDS + this.IMAGE_DELAY;
        this.differ = this.differs.find(this.activeSlides).create();
        if (this.slides.length > 1 && this.autoPlayDuration > 0) {
          this.startTimer();
        }
      });
    }
  }

  getDurationOfSound(index: number) {
    const sound = document.getElementById('sound-' + index) as HTMLMediaElement;
    const duration = sound.duration;
    return duration * this.MILISECONDS + this.IMAGE_DELAY;
  }

  ngAfterViewInit() {
    this.startSound(0);
  }

  ngOnDestroy(): void {
    this.resetTimer();
    this.cd.detach();
  }

  select(index: number): void {
    this.resetTimer();
    this.direction = this.getDirection(this.activeSlides.current, index);
    this.activeSlides = this.getPreviousCurrentNextIndexes(index);
    this.autoPlayDuration = this.getDurationOfSound(index);
    this.startTimer();
    // this.stopSound(
    //   this.direction === Direction.Next
    //     ? this.activeSlides.previous
    //     : this.activeSlides.next
    // );
    this.stopSound(this.currentSlideIndex);
    this.currentSlideIndex = index;
    this.startSound(index);

    if (this.differ.diff(this.activeSlides)) {
      this.cd.detectChanges();
    }
  }

  getDirection(oldIndex: number, newIndex: number): Direction {
    const images = this.slides;

    if (oldIndex === images.length - 1 && newIndex === 0) {
      return Direction.Next;
    } else if (oldIndex === 0 && newIndex === images.length - 1) {
      return Direction.Prev;
    }

    return oldIndex < newIndex ? Direction.Next : Direction.Prev;
  }

  getPreviousCurrentNextIndexes(index: number): ActiveSlides {
    const images = this.slides;

    return {
      previous: (index === 0 ? images.length - 1 : index - 1) % images.length,
      current: index % images.length,
      next: (index === images.length - 1 ? 0 : index + 1) % images.length,
    };
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

  startTimer(): void {
    this.resetTimer();

    if (this.autoPlayDuration > 0) {
      this.currentInterval = setInterval(() => {
        if (!this.paused) this.select(this.activeSlides.next);
      }, this.autoPlayDuration);
    }
  }

  pause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.pauseSound(this.activeSlides.current);
    } else {
      this.startSound(this.activeSlides.current);
    }
  }

  resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }

  startSound(index: number) {
    const sound = document.getElementById('sound-' + index) as HTMLMediaElement;
    sound.play();
  }

  stopSound(index: number) {
    const sound = document.getElementById('sound-' + index) as HTMLMediaElement;
    sound.pause();
    sound.currentTime = 0;
  }

  pauseSound(index: number) {
    const sound = document.getElementById('sound-' + index) as HTMLMediaElement;
    sound.pause();
  }
}
