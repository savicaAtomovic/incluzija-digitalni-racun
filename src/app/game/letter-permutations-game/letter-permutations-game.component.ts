import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, config, switchMap, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { GameConfig, Games } from 'src/app/models/games';
import { Language } from 'src/app/models/language';
import { LetterGameCorrect } from 'src/app/models/letter-game-corrrect';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-letter-permutations-game',
  templateUrl: './letter-permutations-game.component.html',
  styleUrls: ['./letter-permutations-game.component.scss'],
})
export class LetterPermutationsGameComponent implements OnInit, OnDestroy {
  updateUserInput(_t5: number, _t20: number, $event: Event) {
    throw new Error('Method not implemented.');
  }

  @Input() game: Games;

  wordsPerGame = 6;
  configArray: GameConfig[];
  Language = Language;
  LetterGameCorrect = LetterGameCorrect;

  userInputMap: Map<number, string[]> = new Map(); // Map to store user input for each configuration
  correctInput: Map<number, LetterGameCorrect> = new Map();

  private destroyed$ = new Subject();

  constructor(
    private gamesService: GamesService,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.gamesService
      .getGameConfigByLocation(this.game.configLocation)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((config) => {
        this.newGame(config);
      });
  }

  newGame(configs: GameConfig[]) {
    const randomIndexes = this.gamesService.generateRandomArray(
      this.wordsPerGame,
      configs.length
    );
    const selectedConfigs = randomIndexes.map((index) => configs[index]);

    for (const config of selectedConfigs) {
      config.wordLat = this.gamesService.generateRandomPermutation(
        config.wordLat
      ) as string[];
      console.log('wordLat', config.wordLat);
      config.wordCyr = this.gamesService.generateRandomPermutation(
        config.wordCyr
      ) as string[];
      console.log('wordCyr', config.wordCyr);
    }

    this.configArray = selectedConfigs;
  }

  isCorrect(index: number) {
    return this.correctInput.get(index);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
