import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-missing-word',
  templateUrl: './missing-word.component.html',
  styleUrls: ['./missing-word.component.scss'],
})
export class MissingWordComponent implements OnInit {
  @Input() game: any;

  constructor() {}

  ngOnInit(): void {
    console.log('game', this.game);
  }
}
