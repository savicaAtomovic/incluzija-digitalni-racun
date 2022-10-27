import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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

  constructor(private router: Router, private titleService: TitleService) {
    console.log(router.url);

    this.router.events
      // .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        // this.currentRoute = event.url;
        console.log('router', event);
      });
    this.titleService.topbarTitle.subscribe((title) => {
      this.topbarTitle = title;
      console.log('topbarTitle', title);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
