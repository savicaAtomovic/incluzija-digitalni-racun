import { Component, OnInit } from '@angular/core';

import { TopbarTitleService } from './services/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'aac-za-djecu-web';
  currentRoute = '';
  topbarTitle: String = '';

  constructor(
    private topbarTitleService: TopbarTitleService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Vladam situacijom');
    this.topbarTitleService.topbarTitle.subscribe((title) => {
      this.topbarTitle = title;
      console.log('topbarTitle', title);
    });
  }

  ngOnInit(): void {}
}
