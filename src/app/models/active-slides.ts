export interface ActiveSlides {
  previous: number;
  current: number;
  next: number;
}

export enum Direction {
  Next,
  Prev,
}

export enum Animation {
  Fade = 'fade',
  Slide = 'slide',
}

export interface ActiveSlides {
  previous: number;
  current: number;
  next: number;
}
