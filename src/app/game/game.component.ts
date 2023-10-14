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

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.gamesService.games.subscribe((games) => {
      this.game = games.find((g: Games) => g.id === Number(id));
      this.topbarTitle = this.game.name;
    });
  }
}
