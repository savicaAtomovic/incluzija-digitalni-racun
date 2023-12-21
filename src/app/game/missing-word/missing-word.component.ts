import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { Games, MissingGameConfig } from 'src/app/models/games';

@Component({
  selector: 'app-missing-word',
  templateUrl: './missing-word.component.html',
  styleUrls: ['./missing-word.component.scss'],
})
export class MissingWordComponent implements OnInit, OnDestroy {
  @Input() game: Games;
  private destroyed$ = new Subject();

  configArray: MissingGameConfig[];
  originalConfigArray: MissingGameConfig[];
  generatedNumbers: number[] = [];
  sentencesPerGame = 6;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService
      .getGameConfigByLocation(this.game.configLocation)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((config) => {
        this.originalConfigArray = config as MissingGameConfig[];
        this.newGame(this.originalConfigArray);
      });
  }

  newGame(configs: MissingGameConfig[]) {
    if (this.generatedNumbers.length + this.sentencesPerGame > configs.length) {
      this.generatedNumbers = [];
    }

    const randomIndexes = this.gamesService.newGame(
      this.sentencesPerGame,
      configs.length,
      this.generatedNumbers
    );

    this.generatedNumbers = randomIndexes;

    const selectedConfigs = randomIndexes.map((index) => configs[index]);

    this.configArray = selectedConfigs;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
