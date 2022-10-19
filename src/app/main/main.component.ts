import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from '../models/image';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService, private router: Router) {}

  images: Image[] = [];

  ngOnInit(): void {
    this.mainService.images.subscribe((images) => {
      this.images = images;
    });
  }

  onClick(image: Image) {
    console.log('image onClick', image);
    this.router.navigate(['/board', image.number]);
  }
}
