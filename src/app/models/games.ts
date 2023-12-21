import { LetterGameCorrect } from './letter-game-corrrect';

export interface Games {
  id: number;
  name: string;
  description: string;
  image: string;
  type: GameType;
  configLocation: string;
}

export interface GameConfig {
  id: number;
  wordLat: string[];
  wordCyr: string[];
  image: string;
  missing?: number[];
  selected?: number;
  used?: number[];
  originalWordLat?: string[];
  originalWordCyr?: string[];
}

export interface MissingGameConfig {
  id: number;
  sentenceLat: string;
  sentenceCyr: string;
  image: string;
}

export enum GameType {
  LETTERS = 'LETTERS',
  LETTERS_PERMUTATIONS = 'LETTERS_PERMUTATIONS',
  MISSING_WORD = 'MISSING_WORD',
}

export interface UserInput {
  id: number;
  userInput: string[];
  correctLetters: number[];
  wrongLetters: number[];
  gameCorrect: LetterGameCorrect;
}
