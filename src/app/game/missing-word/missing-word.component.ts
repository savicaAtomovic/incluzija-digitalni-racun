import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, switchMap, takeUntil } from 'rxjs';
import { GamesService } from 'src/app/games-list/games.service';
import { Games, MissingGameConfig } from 'src/app/models/games';
import { Language } from 'src/app/models/language';
import { LetterGameCorrect } from 'src/app/models/letter-game-corrrect';
import { SettingsService } from 'src/app/services/settings.service';
import { PausableObservable, pausable } from 'rxjs-pausable';

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
  LetterGameCorrect = LetterGameCorrect;
  Language = Language;

  shuffledImages: MissingGameConfig[];
  selectedSentence = 0;

  pausable: PausableObservable<number>;

  constructor(
    private gamesService: GamesService,
    public settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    this.pausable = interval(800).pipe(
      // @ts-ignore
      pausable()
    ) as PausableObservable<number>;
    this.pausable.subscribe(this.shoot.bind(this));
    this.pausable.pause();
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

  playFirework() {
    this.pausable.resume();
  }

  stopFirework() {
    this.pausable.pause();
  }

  newGame(configs: MissingGameConfig[]) {
    this.stopFirework();
    if (this.generatedNumbers.length + this.game.perPage > configs.length) {
      this.generatedNumbers = [];
    }

    const randomIndexes = this.gamesService.newGame(
      this.game.perPage,
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

  gameOver() {
    return this.configArray.every(
      (config) => config.correct === LetterGameCorrect.CORRECT
    );
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
      if (this.gameOver()) {
        this.shoot();
        this.playFirework();
      }
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

  confetti(args: any) {
    // @ts-ignore
    return window['confetti'].apply(this, arguments);
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 50),
        origin: {
          y: 0.6,
        },
      });
    } catch (e) {
      // noop, confettijs may not be loaded yet
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  ngOnDestroy(): void {
    this.stopFirework();
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
