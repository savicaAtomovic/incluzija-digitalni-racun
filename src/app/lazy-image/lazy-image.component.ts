import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.scss',
})
export class LazyImageComponent {
  @Input() src: string;
  @Input() alt: string = '';
  @Input() clickable: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  imageLoaded = false;

  onImageLoad() {
    this.imageLoaded = true;
  }

  onClick() {
    if (this.clickable) {
      this.clicked.emit();
    }
  }
}
