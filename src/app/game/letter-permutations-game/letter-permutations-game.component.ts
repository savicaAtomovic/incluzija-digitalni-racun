import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { GameConfig, Games, UserInput } from 'src/app/models/games';
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

  configArray: GameConfig[];
  originalConfigArray: GameConfig[];

  Language = Language;
  LetterGameCorrect = LetterGameCorrect;

  correctInput: Map<number, LetterGameCorrect> = new Map();

  userInput: UserInput[] = [];

  private destroyed$ = new Subject();

  constructor(
    private gamesService: GamesService,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.gamesService
      .getGameConfigByLocation(this.game.configLocation)
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((config) => {
          this.originalConfigArray = config as GameConfig[];
          this.newGame(config as GameConfig[]);
          return this.settingsService.newLetterPermutationsGame;
        })
      )
      .subscribe((newGame) => {
        if (newGame) {
          this.newGame(this.originalConfigArray);
        }
      });
  }

  onLetterClick(letter: string, config: GameConfig, i: number) {
    this.updateSelected(config.id, i);
  }

  isSelected(i: number, selected: number | undefined) {
    return selected == i;
  }

  isInArray(i: number, array: number[] | undefined) {
    return !!array?.includes(i);
  }

  updateSelected(configId: number, i: number) {
    const index = this.configArray.findIndex(
      (config) => config.id === configId
    );
    if (index != -1) {
      this.configArray[index].selected = i;
    }
  }

  // used should be only correct letters
  updateUsed(configId: number, i: number) {
    const index = this.configArray.findIndex(
      (config) => config.id === configId
    );
    if (index != -1) {
      if (this.configArray[index].used !== undefined) {
        if (!this.configArray[index].used?.includes(i)) {
          this.configArray[index].used!.push(i);
        }
      } else {
        this.configArray[index].used = [i];
      }
    }
  }

  removeSelected(configId: number, i: number) {
    const index = this.configArray.findIndex(
      (config) => config.id === configId
    );
    if (index != -1) {
      this.configArray[index].selected = undefined;
    }
  }

  onUserLetterClick(configIndex: number, config: GameConfig, i: number) {
    const isSerbian = this.settingsService.language.value === Language.SERBIAN;
    const arrayOfLetters = isSerbian ? config.wordCyr : config.wordLat;
    const originalArrayOfLetters = isSerbian
      ? config.originalWordCyr
      : config.originalWordLat;

    const userInput = this.userInput[configIndex];
    if (config.selected !== undefined && userInput) {
      this.userInput[configIndex].userInput[i] =
        arrayOfLetters[config.selected];
    } else {
      return;
    }

    if (originalArrayOfLetters) {
      if (
        this.userInput[configIndex].userInput[i] === originalArrayOfLetters[i]
      ) {
        this.userInput[configIndex].correctLetters.push(i);
      } else {
        this.userInput[configIndex].wrongLetters.push(i);
        // remove from correctLetters array if exists there
        if (this.userInput[configIndex].correctLetters.includes(i)) {
          this.userInput[configIndex].correctLetters = this.userInput[
            configIndex
          ].correctLetters.filter((cl) => cl !== i);
        }
      }
      this.updateUsed(config.id, config.selected ?? 0);
      if (
        this.userInput[configIndex].userInput[i] !== originalArrayOfLetters[i]
      ) {
        this.configArray[configIndex].used = this.configArray[
          configIndex
        ].used?.filter((u) => u !== config.selected);
      }
      this.removeSelected(config.id, i);
      this.checkWord(configIndex);
    }
  }

  checkWord(configIndex: number): void {
    const userInputArray = this.userInput[configIndex].userInput;
    if (userInputArray) {
      const userWord = userInputArray.join(''); // Join user input array to form the word
      const wordToCheck = this.getWordToCheck(configIndex);

      // Convert userWord to an array of strings
      const userWordArray = userWord.split('');

      if (
        this.numberOfLettersInStringArray(userWordArray) !=
        this.numberOfLettersInStringArray(wordToCheck)
      ) {
        this.userInput[configIndex].gameCorrect = LetterGameCorrect.NONE;
        return;
      }

      // Check if userWordArray and wordToCheck are equal
      const isCorrect =
        userWordArray.join('').toUpperCase() ===
        wordToCheck.join('').toUpperCase();

      if (isCorrect) {
        console.log(`Configuration ${configIndex}: Word is correct!`);
        // You can add further logic here.
        this.userInput[configIndex].gameCorrect = LetterGameCorrect.CORRECT;
      } else {
        console.log(
          `Configuration ${configIndex}: Word is incorrect. Try again.`
        );
        // Handle incorrect word input.
        this.userInput[configIndex].gameCorrect = LetterGameCorrect.WRONG;
      }
    }
  }

  numberOfLettersInStringArray(stringArray: string[]): number {
    let totalLetters = 0;

    for (const element of stringArray) {
      totalLetters += element.length;
    }
    return totalLetters;
  }

  getWordToCheck(configIndex: number): string[] {
    // Get the configuration for the specified index
    const config = this.configArray[configIndex];

    // Determine the language
    const selectedLanguage = this.settingsService.language.value;

    // Determine the word to check based on the language
    let wordToCheck: string[] = [];

    if (selectedLanguage === Language.MONTENEGRO) {
      wordToCheck = config.originalWordLat ?? ['']; // Use the Latin word
    } else if (selectedLanguage === Language.SERBIAN) {
      wordToCheck = config.originalWordCyr ?? ['']; // Use the Cyrillic word
    } else {
      wordToCheck = config.originalWordLat ?? ['']; // Default to Latin word
    }

    return wordToCheck;
  }

  newGame(configs: GameConfig[]) {
    const randomIndexes = this.gamesService.generateRandomArray(
      this.game.perPage,
      configs.length
    );
    const selectedConfigs = randomIndexes.map((index) => configs[index]);

    for (const config of selectedConfigs) {
      config.originalWordCyr = config.wordCyr;
      config.originalWordLat = config.wordLat;
      config.wordLat = this.gamesService.generateRandomPermutation(
        config.wordLat
      ) as string[];
      config.wordCyr = this.gamesService.generateRandomPermutation(
        config.wordCyr
      ) as string[];
    }

    this.configArray = selectedConfigs;

    this.updateConfigArrayValues();
  }

  updateConfigArrayValues() {
    this.userInput = [];
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

      this.userInput.push({
        id: config.id,
        correctLetters: [],
        wrongLetters: [],
        userInput: userInputArray,
        gameCorrect: LetterGameCorrect.NONE,
      });
    });
  }

  isCorrect(index: number) {
    return this.userInput[index].gameCorrect;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
