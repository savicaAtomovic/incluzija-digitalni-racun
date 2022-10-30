import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main/main.service';
import { Image } from '../models/image';
import { TitleService } from '../services/title.service';
import { Animation } from '../models/active-slides';

@Component({
  selector: 'app-slide-show-wrapper',
  templateUrl: './slide-show-wrapper.component.html',
  styleUrls: ['./slide-show-wrapper.component.scss'],
})
export class SlideShowWrapperComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private titleService: TitleService
  ) {}

  images: Image[] = [];
  AnimationEnum = Animation;
  slides: any;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id from route', id);
    // TODO get all content related to content with id {id}

    // this.titleService.topbarTitle.next(id ? id.toString() : '');

    this.mainService.images.subscribe((images) => {
      this.images = images;
      this.slides = images;
      const topbarTitle = this.images.find(
        (image) => image.number === Number(id)
      );
      this.titleService.topbarTitle.next(topbarTitle ? topbarTitle.name : '');
    });
  }
}
