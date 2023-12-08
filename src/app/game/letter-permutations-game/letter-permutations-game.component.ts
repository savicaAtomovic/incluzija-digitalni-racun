import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
      config.wordCyr = this.gamesService.generateRandomPermutation(
        config.wordCyr
      ) as string[];
    }
    console.log('this.userInputMap', this.userInputMap);

    this.configArray = selectedConfigs;

    this.updateConfigArrayValues();
  }

  updateConfigArrayValues() {
    this.configArray.forEach((config, index) => {
      const userInputArray = [];
      const isSerbian =
        this.settingsService.language.value === Language.SERBIAN;

      for (
        let i = 0;
        i < (isSerbian ? config.wordCyr.length : config.wordLat.length);
        i++
      ) {
        userInputArray.push('');
      }

      this.userInputMap.set(index, userInputArray);
      this.correctInput.set(index, LetterGameCorrect.NONE);
    });
  }

  isCorrect(index: number) {
    return this.correctInput.get(index);
  }

  drop(event: CdkDragDrop<string[]>, configIndex: number) {
    console.log('event.container', event.container);
    console.log('event.previousContainer', event.previousContainer);
    if (!event.container.data || !event.previousContainer.data) {
      console.error('Invalid array data');
      return;
    }
    // if (event.previousContainer === event.container) {
    if (false) {
      console.log('11111');
      // Reorder letters within the same container
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('22222');
      // Transfer letters between containers
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Find the corresponding configuration based on configIndex
      const config = this.configArray[configIndex];

      // Update userInputMap based on the dropped letter
      const isSerbian =
        this.settingsService.language.value === Language.SERBIAN;
      const userInputArray = this.userInputMap.get(configIndex) || [];

      if (isSerbian) {
        // Assuming config.wordCyr is the correct order
        userInputArray[event.currentIndex] = event.item.data;
      } else {
        // Assuming config.wordLat is the correct order
        userInputArray[event.currentIndex] = event.item.data;
      }

      this.userInputMap.set(configIndex, userInputArray);

      // Check if the word is correct
      const userWord = userInputArray.join('');
      const correctWord = isSerbian
        ? config.wordCyr.join('')
        : config.wordLat.join('');
      const isCorrect = userWord === correctWord;

      // Update the correctInput map
      this.correctInput.set(
        configIndex,
        isCorrect ? LetterGameCorrect.CORRECT : LetterGameCorrect.WRONG
      );
      console.log('this.consoleInpuy', this.userInputMap);
    }
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
