export interface Games {
  id: number;
  name: string;
  description: string;
  image: string;
  type: GameType;
  config: GameConfig[];
}

export interface GameConfig {
  id: number;
  word: string[];
  image: string;
}

export enum GameType {
  LETTERS = 'LETTERS',
}
