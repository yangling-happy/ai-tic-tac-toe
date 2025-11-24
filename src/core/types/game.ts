export type Player = 'X' | 'O' | null;
export type BoardState = Player[];
export type GameMode = 'PVP' | 'PVC_EASY' | 'PVC_HARD';

export interface GameMove {
  board: BoardState;
  moveIndex: number;
  player: Player;
}

export interface GameHistory {
  moves: GameMove[];
  currentMove: number;
}

export interface GameStatus {
  winner: Player;
  winningLine: number[] | null;
  isDraw: boolean;
  isGameOver: boolean;
}

export interface AIDifficulty {
  depth: number;
  useAlphaBeta: boolean;
  evaluation: 'simple' | 'advanced';
}