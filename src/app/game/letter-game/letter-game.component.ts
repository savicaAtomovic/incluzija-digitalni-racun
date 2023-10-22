import { Component, Input, OnInit } from '@angular/core';
import { GameConfig, Games } from 'src/app/models/games';
import { Language } from 'src/app/models/language';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-letter-game',
  templateUrl: './letter-game.component.html',
  styleUrls: ['./letter-game.component.scss'],
})
export class LetterGameComponent implements OnInit {
  @Input() game: Games;

  Language = Language;
  userInputMap: Map<number, string[]> = new Map(); // Map to store user input for each configuration
  correctInput: Map<number, boolean> = new Map();

  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    // Initialize the userInputMap with empty arrays for each configuration
    this.game.config.forEach((config, index) => {
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
      this.correctInput.set(index, false);
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

      // Check if userWordArray and wordToCheck are equal
      const isCorrect =
        userWordArray.join('').toUpperCase() ===
        wordToCheck.join('').toUpperCase();

      if (isCorrect) {
        console.log(`Configuration ${configIndex}: Word is correct!`);
        // You can add further logic here.
        this.correctInput.set(configIndex, true);
      } else {
        console.log(
          `Configuration ${configIndex}: Word is incorrect. Try again.`
        );
        // Handle incorrect word input.
        this.correctInput.set(configIndex, false);
      }
    }
  }

  getWordToCheck(configIndex: number): string[] {
    // Get the configuration for the specified index
    const config = this.game.config[configIndex];

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
}
