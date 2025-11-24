import { BoardState, Player } from '../types/game';
import { WINNING_LINES } from '../constants/game';

export function checkWinner(board: BoardState): Player | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function getWinningLine(board: BoardState): number[] | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [...line]; // 转换为普通数组
    }
  }
  return null;
}

export function getAvailableMoves(board: BoardState): number[] {
  return board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
}

export function isBoardFull(board: BoardState): boolean {
  return board.every(cell => cell !== null);
}