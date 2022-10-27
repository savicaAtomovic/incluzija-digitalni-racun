import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/image';
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

  images: Image[] = [];
  MAIN_TITLE: string = 'POČETNA';

  ngOnInit(): void {
    this.titleService.topbarTitle.next(this.MAIN_TITLE);
    this.mainService.images.subscribe((images) => {
      this.images = images;
    });
  }

  onClick(image: Image) {
    console.log('image onClick', image);
    this.router.navigate(['/board', image.number]);
  }

  goBack() {
    this.router.navigate(['/board']);
  }
}
