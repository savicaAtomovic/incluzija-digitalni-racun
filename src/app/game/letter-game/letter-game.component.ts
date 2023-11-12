import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { GameConfig, Games } from 'src/app/models/games';
import { Language } from 'src/app/models/language';
import { LetterGameCorrect } from 'src/app/models/letter-game-corrrect';
import { LetterGameLevel } from 'src/app/models/letter-game-level';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-letter-game',
  templateUrl: './letter-game.component.html',
  styleUrls: ['./letter-game.component.scss'],
})
export class LetterGameComponent implements OnInit, OnDestroy {
  @Input() game: Games;

  wordsPerGame = 6;

  private destroyed$ = new Subject();

  Language = Language;
  LetterGameCorrect = LetterGameCorrect;
  configArray: GameConfig[];

  userInputMap: Map<number, string[]> = new Map(); // Map to store user input for each configuration
  correctInput: Map<number, LetterGameCorrect> = new Map();

  constructor(
    public settingsService: SettingsService,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.gamesService
      .getGameConfigByLocation(this.game.configLocation)
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((configs) => {
          this.newGame(configs);
          return this.settingsService.letterGameLevel;
        }),
        switchMap((gameLevel) => {
          switch (gameLevel) {
            case LetterGameLevel.FIRST_LETTER:
              this.missingFirstLetter();
              break;
            case LetterGameLevel.ONE_LETTER:
              this.missingRandomLetters(1);
              break;
            case LetterGameLevel.TWO_LETTERS:
              this.missingRandomLetters(2);
              break;
            case LetterGameLevel.THREE_LETTERS:
              this.missingRandomLetters(3);
              break;
          }
          return this.settingsService.language;
        }),
        switchMap((_) => {
          return this.settingsService.newLetterGame;
        })
      )
      .subscribe((newLetterGame) => {
        if (newLetterGame) {
          this.newGame(this.configArray);
        }
        this.updateConfigArrayValues();
      });
  }

  newGame(configs: GameConfig[]) {
    const randomIndexes = this.gamesService.generateRandomArray(
      this.wordsPerGame,
      configs.length
    );
    const selectedConfigs = randomIndexes.map((index) => configs[index]);
    this.configArray = selectedConfigs;
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
        userInputArray.push(
          this.isMissing(i, config) ? '' : this.getCurrentWord(config)[i]
        );
      }

      this.userInputMap.set(index, userInputArray);
      this.correctInput.set(index, LetterGameCorrect.NONE);
    });
  }

  isCorrect(index: number) {
    return this.correctInput.get(index);
  }

  getCurrentWord(config: GameConfig): string[] {
    const isSerbian = this.settingsService.language.value === Language.SERBIAN;
    return isSerbian ? config.wordCyr : config.wordLat;
  }

  isMissing(index: number, config: GameConfig): boolean {
    return !!config.missing && config.missing.indexOf(index) !== -1;
  }

  checkWord(configIndex: number): void {
    const userInputArray = this.userInputMap.get(configIndex);
    if (userInputArray) {
      const userWord = userInputArray.join(''); // Join user input array to form the word
      const wordToCheck = this.getWordToCheck(configIndex);

      // Convert userWord to an array of strings
      const userWordArray = userWord.split('');

      if (
        this.numberOfLettersInStringArray(userWordArray) !=
        this.numberOfLettersInStringArray(wordToCheck)
      ) {
        this.correctInput.set(configIndex, LetterGameCorrect.NONE);
        return;
      }

      // Check if userWordArray and wordToCheck are equal
      const isCorrect =
        userWordArray.join('').toUpperCase() ===
        wordToCheck.join('').toUpperCase();

      if (isCorrect) {
        console.log(`Configuration ${configIndex}: Word is correct!`);
        // You can add further logic here.
        this.correctInput.set(configIndex, LetterGameCorrect.CORRECT);
      } else {
        console.log(
          `Configuration ${configIndex}: Word is incorrect. Try again.`
        );
        // Handle incorrect word input.
        this.correctInput.set(configIndex, LetterGameCorrect.WRONG);
      }
    }
  }

  getWordToCheck(configIndex: number): string[] {
    // Get the configuration for the specified index
    const config = this.configArray[configIndex];

    // Determine the language
    const selectedLanguage = this.settingsService.language.value;

    // Determine the word to check based on the language
    let wordToCheck: string[] = [];

    if (selectedLanguage === Language.MONTENEGRO) {
      wordToCheck = config.wordLat; // Use the Latin word
    } else if (selectedLanguage === Language.SERBIAN) {
      wordToCheck = config.wordCyr; // Use the Cyrillic word
    } else {
      wordToCheck = config.wordLat; // Default to Latin word
    }

    return wordToCheck;
  }

  updateUserInput(configIndex: number, i: number, event: any): void {
    const userInput = this.userInputMap?.get(configIndex);

    if (userInput) {
      userInput[i] = event.target.value;
      this.checkWord(configIndex);
    }
  }

  missingFirstLetter() {
    this.configArray.forEach((config) => {
      config.missing = [0];
    });
  }

  missingRandomLetters(n: number) {
    const isSerbian = this.settingsService.language.value === Language.SERBIAN;
    this.configArray.forEach((config) => {
      config.missing = this.gamesService.generateRandomArray(
        n,
        isSerbian ? config.wordCyr.length : config.wordLat.length
      );
    });
  }

  numberOfLettersInStringArray(stringArray: string[]): number {
    let totalLetters = 0;

    for (const element of stringArray) {
      totalLetters += element.length;
    }
    return totalLetters;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
