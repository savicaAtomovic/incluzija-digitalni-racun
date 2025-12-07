import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.scss',
})
export class LazyImageComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string = '';
  @Input() clickable: boolean = false;
  @Input() heightVar: string = '--image-height';
  @Output() clicked = new EventEmitter<void>();

  imageLoaded = false;
  imageError = false;

  ngOnInit() {
    document.documentElement.style.setProperty(
      '--height-var',
      `var(${this.heightVar})`
    );
  }

  onImageLoad() {
    this.imageLoaded = true;
    this.imageError = false;
  }

  onImageError() {
    this.imageLoaded = false;
    this.imageError = true;
  }

  onClick() {
    if (this.clickable) {
      this.clicked.emit();
    }
  }
}
