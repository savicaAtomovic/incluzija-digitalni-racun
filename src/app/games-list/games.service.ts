import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameConfig, MissingGameConfig } from '../models/games';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  get games(): Observable<any> {
    return this.http.get('assets/mock-data/games.json');
  }

  getGameConfigByLocation(
    file: string
  ): Observable<GameConfig[] | MissingGameConfig[]> {
    return this.http.get(file) as Observable<
      GameConfig[] | MissingGameConfig[]
    >;
  }
  generateRandomArray(k: number, n: number): number[] {
    if (k > n) {
      console.error('k must be less than or equal to n');
    }
    const result: number[] = [];
    const availableNumbers: number[] = Array.from({ length: n }, (_, i) => i);
    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomValue = availableNumbers.splice(randomIndex, 1)[0];
      result.push(randomValue);
    }
    return result;
  }

  newGame(k: number, n: number, alreadyGeneratedNumbers: number[]): number[] {
    if (k > n) {
      console.error('k must be less than or equal to n');
    }
    const result: number[] = [];
    const availableNumbers: number[] = Array.from({ length: n }, (_, i) => i);

    if (alreadyGeneratedNumbers.length > 0) {
      alreadyGeneratedNumbers.forEach((num) => {
        const indexToRemove = availableNumbers.indexOf(num);
        if (indexToRemove !== -1) {
          availableNumbers.splice(indexToRemove, 1);
        }
      });
    }

    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomValue = availableNumbers.splice(randomIndex, 1)[0];
      result.push(randomValue);
    }
    return result;
  }
  generateRandomPermutation<T>(arr: T[]): T[] {
    const shuffledArray = [...arr];

    // Fisher-Yates shuffle algorithm with a random seed
    const getRandomInt = (max: number) => Math.floor(Math.random() * (max + 1));

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = getRandomInt(i);
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }
}
