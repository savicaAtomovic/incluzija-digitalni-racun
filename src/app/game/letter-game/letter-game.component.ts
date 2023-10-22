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

  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {}

  isMissing(index: number, config: GameConfig): boolean {
    return !!config.missing && config.missing.indexOf(index) !== -1;
  }
}
