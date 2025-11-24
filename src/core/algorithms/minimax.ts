import { BoardState, Player } from '../types/game';
import { WINNING_LINES } from '../constants/game';

export class MinimaxAI {
  private maxDepth: number;
  private useAlphaBeta: boolean;

  constructor(depth: number = 8, useAlphaBeta: boolean = true) {
    this.maxDepth = depth;
    this.useAlphaBeta = useAlphaBeta;
  }

  public getBestMove(board: BoardState, player: Player): number {
    if (player === null) throw new Error('Player cannot be null');

    const availableMoves = this.getAvailableMoves(board);
    if (availableMoves.length === 0) return -1;

    if (availableMoves.length === 9) {
      return 4;
    }

    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = player;

      const score = this.useAlphaBeta
        ? this.alphaBeta(newBoard, 0, false, player, -Infinity, Infinity)
        : this.minimax(newBoard, 0, false, player);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  private minimax(
    board: BoardState,
    depth: number,
    isMaximizing: boolean,
    maximizingPlayer: Player
  ): number {
    const winner = this.checkWinner(board);
    
    if (winner) {
      return winner === maximizingPlayer ? 100 - depth : depth - 100;
    }

    if (this.getAvailableMoves(board).length === 0 || depth >= this.maxDepth) {
      return this.evaluateBoard(board, maximizingPlayer);
    }

    const availableMoves = this.getAvailableMoves(board);
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = maximizingPlayer;
        const score = this.minimax(newBoard, depth + 1, false, maximizingPlayer);
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const minimizingPlayer = maximizingPlayer === 'X' ? 'O' : 'X';
      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = minimizingPlayer;
        const score = this.minimax(newBoard, depth + 1, true, maximizingPlayer);
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }

  private alphaBeta(
    board: BoardState,
    depth: number,
    isMaximizing: boolean,
    maximizingPlayer: Player,
    alpha: number,
    beta: number
  ): number {
    const winner = this.checkWinner(board);
    
    if (winner) {
      return winner === maximizingPlayer ? 100 - depth : depth - 100;
    }

    if (this.getAvailableMoves(board).length === 0 || depth >= this.maxDepth) {
      return this.evaluateBoard(board, maximizingPlayer);
    }

    const availableMoves = this.getAvailableMoves(board);
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = maximizingPlayer;
        const score = this.alphaBeta(newBoard, depth + 1, false, maximizingPlayer, alpha, beta);
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      const minimizingPlayer = maximizingPlayer === 'X' ? 'O' : 'X';
      for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = minimizingPlayer;
        const score = this.alphaBeta(newBoard, depth + 1, true, maximizingPlayer, alpha, beta);
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
      return bestScore;
    }
  }

  private evaluateBoard(board: BoardState, player: Player): number {
    let score = 0;

    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      score += this.evaluateLine(board[a], board[b], board[c], player);
    }

    return score;
  }

  private evaluateLine(a: Player, b: Player, c: Player, player: Player): number {
    let score = 0;
    const opponent = player === 'X' ? 'O' : 'X';

    const marks = { player: 0, opponent: 0, empty: 0 };
    [a, b, c].forEach(cell => {
      if (cell === player) marks.player++;
      else if (cell === opponent) marks.opponent++;
      else marks.empty++;
    });

    if (marks.player === 3) score += 100;
    else if (marks.player === 2 && marks.empty === 1) score += 10;
    else if (marks.player === 1 && marks.empty === 2) score += 1;
    else if (marks.opponent === 2 && marks.empty === 1) score -= 20;
    else if (marks.opponent === 1 && marks.empty === 2) score -= 2;

    return score;
  }

  private getAvailableMoves(board: BoardState): number[] {
    return board
      .map((cell, index) => cell === null ? index : -1)
      .filter(index => index !== -1);
  }

  private checkWinner(board: BoardState): Player | null {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
}