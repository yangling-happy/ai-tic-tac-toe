import { AIDifficulty, BoardState } from '../types/game';

export const BOARD_SIZE = 9;
export const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
] as const;

export const AI_DIFFICULTIES: Record<string, AIDifficulty> = {
  EASY: { depth: 2, useAlphaBeta: false, evaluation: 'simple' },
  HARD: { depth: 8, useAlphaBeta: true, evaluation: 'advanced' }
};

export const INITIAL_BOARD: BoardState = Array(BOARD_SIZE).fill(null);