import { Component, Input, OnInit } from '@angular/core';
import { Games } from 'src/app/models/games';

@Component({
  selector: 'app-letter-game',
  templateUrl: './letter-game.component.html',
  styleUrls: ['./letter-game.component.scss'],
})
export class LetterGameComponent implements OnInit {
  @Input() game: Games;

  constructor() {}

  ngOnInit(): void {}
}
