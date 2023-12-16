import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games-list/games.service';
import { GameType, Games } from '../models/games';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Games;
  GameType = GameType;
  topbarTitle: string;
  showLetterGameSettings: boolean = false;
  showLetterPermutationsGameSettings: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.gamesService.games.subscribe((games) => {
      this.game = games.find((g: Games) => g.id === Number(id));
      this.topbarTitle = this.game.name;
      if (this.game.type === GameType.LETTERS) {
        this.showLetterGameSettings = true;
        this.showLetterPermutationsGameSettings = false;
      } else if (this.game.type === GameType.LETTERS_PERMUTATIONS) {
        this.showLetterGameSettings = false;
        this.showLetterPermutationsGameSettings = true;
      }
    });
  }
}
