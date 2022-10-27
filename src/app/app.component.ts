import { Component, OnInit } from '@angular/core';

import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'aac-za-djecu-web';
  currentRoute = '';
  topbarTitle: String = '';

  constructor(private titleService: TitleService) {
    this.titleService.topbarTitle.subscribe((title) => {
      this.topbarTitle = title;
      console.log('topbarTitle', title);
    });
  }

  ngOnInit(): void {}
}
