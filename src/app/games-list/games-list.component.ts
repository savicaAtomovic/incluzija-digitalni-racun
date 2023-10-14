import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { Games } from '../models/games';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  constructor(private gamesService: GamesService, private router: Router) {}

  games: Games[];

  ngOnInit(): void {
    this.gamesService.games.subscribe((games) => {
      this.games = games;
    });
  }

  onClick(game: Games) {
    this.router.navigate(['/games', game.id]);
  }
}
