import { Component, Input, OnInit } from '@angular/core';
import { Games } from 'src/app/models/games';

@Component({
  selector: 'app-letter-permutations-game',
  templateUrl: './letter-permutations-game.component.html',
  styleUrls: ['./letter-permutations-game.component.scss'],
})
export class LetterPermutationsGameComponent implements OnInit {
  @Input() game: Games;

  constructor() {}

  ngOnInit(): void {}
}
