import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { Games, MissingGameConfig } from 'src/app/models/games';
import { Language } from 'src/app/models/language';
import { LetterGameCorrect } from 'src/app/models/letter-game-corrrect';
import { SettingsService } from 'src/app/services/settings.service';

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
  LetterGameCorrect = LetterGameCorrect;
  Language = Language;

  shuffledImages: MissingGameConfig[];
  selectedSentence = 0;

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
          this.originalConfigArray = config as MissingGameConfig[];
          this.newGame(this.originalConfigArray);
          return this.settingsService.newMissingWordGame;
        })
      )
      .subscribe((newGame) => {
        if (newGame) {
          this.newGame(this.originalConfigArray);
        }
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
    this.addOrderNumber();
    this.shuffleImages();
  }

  addOrderNumber() {
    this.configArray.forEach((c, index) => {
      c.orderNumber = index + 1;
    });
  }

  shuffleImages() {
    this.shuffledImages = this.gamesService.generateRandomPermutation(
      this.configArray
    );
    this.shuffledImages.forEach((i) => (i.correct = LetterGameCorrect.NONE));
  }

  onSentenceClick(sentence: MissingGameConfig) {
    this.configArray.forEach((s) => {
      s.selected = false;
    });

    this.selectedSentence = sentence.id;
    const clickedIndex = this.configArray.findIndex(
      (s) => s.id === sentence.id
    );

    if (clickedIndex === -1) {
      return;
    }

    const updatedSentence = { ...this.configArray[clickedIndex] };
    if (updatedSentence.correct === LetterGameCorrect.CORRECT) {
      return;
    }
    updatedSentence.selected = true;

    this.configArray[clickedIndex] = updatedSentence;
  }

  onImageClick(image: MissingGameConfig) {
    if (this.selectedSentence === 0) {
      return;
    }
    const clickedIndex = this.shuffledImages.findIndex(
      (i) => i.id === image.id
    );

    if (clickedIndex === -1) {
      return;
    }

    const updatedImage = { ...this.shuffledImages[clickedIndex] };

    // check if correct
    if (!this.selectedSentence) {
      return;
    }

    if (this.selectedSentence === image.id) {
      const sentence = this.configArray.find((s) => s.id === image.id);
      if (!sentence) {
        return;
      }
      updatedImage.correct = LetterGameCorrect.CORRECT;
      this.setCorrectSentence(LetterGameCorrect.CORRECT, sentence);
      this.setAllImagesCorrectToNone();
      this.selectedSentence = 0;
    } else {
      updatedImage.correct = LetterGameCorrect.WRONG;
      setTimeout(() => {
        updatedImage.correct = LetterGameCorrect.NONE;
        this.shuffledImages[clickedIndex] = updatedImage;
      }, 3000);
    }

    this.shuffledImages[clickedIndex] = updatedImage;
  }

  setAllImagesCorrectToNone() {
    this.shuffledImages.forEach((i) => {
      if (i.correct === LetterGameCorrect.WRONG) {
        i.correct = LetterGameCorrect.NONE;
      }
    });
  }
  setCorrectSentence(correct: LetterGameCorrect, sentence: MissingGameConfig) {
    this.configArray.forEach((s) => {
      s.selected = false;
    });
    const clickedIndex = this.configArray.findIndex(
      (c) => c.id === sentence.id
    );

    if (clickedIndex === -1) {
      return;
    }

    const updatedSentence = { ...this.configArray[clickedIndex] };
    updatedSentence.correct = correct;
    this.configArray[clickedIndex] = updatedSentence;
  }

  getSvgPath(orderNumber: number): string {
    return `assets/icons/number-${orderNumber}.svg`;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
