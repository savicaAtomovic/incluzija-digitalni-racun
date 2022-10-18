import { Component, OnInit } from '@angular/core';
import { Image } from '../models/image';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService) {}

  images: Image[] = [];

  ngOnInit(): void {
    this.mainService.images.subscribe((images) => {
      this.images = images;
    });
  }
}
