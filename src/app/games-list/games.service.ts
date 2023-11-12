import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameConfig } from '../models/games';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  get games(): Observable<any> {
    return this.http.get('assets/mock-data/games.json');
  }

  getGameConfigByLocation(file: string): Observable<GameConfig[]> {
    return this.http.get(file) as Observable<GameConfig[]>;
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
}
