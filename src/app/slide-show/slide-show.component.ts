import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
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
import { ActiveSlides, Direction, Animation } from '../models/active-slides';

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

  constructor(
    private cd: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) {}

  ngOnInit(): void {
    if (this.slides) {
      console.log('slides', this.slides);
      this.activeSlides = this.getPreviousCurrentNextIndexes(0);
      this.differ = this.differs.find(this.activeSlides).create();
      if (this.slides.length > 1 && this.autoPlayDuration > 0) {
        this.startTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.resetTimer();
    this.cd.detach();
  }

  select(index: number): void {
    console.log('select -> index', index);
    this.resetTimer();
    this.activeSlides = this.getPreviousCurrentNextIndexes(index);
    this.direction = this.getDirection(this.activeSlides.current, index);
    this.startTimer();
    this.startSound(this.sound);

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
      this.currentInterval = setInterval(
        () => this.select(this.activeSlides.next),
        this.autoPlayDuration
      );
    }
  }

  resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
  }

  stopSound(sound: ElementRef) {
    sound.nativeElement.pause();
    sound.nativeElement.currentTime = 0;
    sound.nativeElement.loop = false;
  }

  startSound(sound: ElementRef) {
    console.log('sound -> ', sound);
    sound.nativeElement.play().catch((error: any) => {
      console.warn('Controls Component ➜ Start Sound: Exception on play.');
      console.error(error);
    });
    sound.nativeElement.loop = true;
  }
}
