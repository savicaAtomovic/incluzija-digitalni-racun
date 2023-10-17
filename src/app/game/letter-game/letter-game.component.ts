import { Component, Input, OnInit } from '@angular/core';
import { GameConfig, Games } from 'src/app/models/games';

@Component({
  selector: 'app-letter-game',
  templateUrl: './letter-game.component.html',
  styleUrls: ['./letter-game.component.scss'],
})
export class LetterGameComponent implements OnInit {
  @Input() game: Games;

  constructor() {}

  ngOnInit(): void {}

  isMissing(index: number, config: GameConfig): boolean {
    return !!config.missing && config.missing.indexOf(index) !== -1;
  }
}
