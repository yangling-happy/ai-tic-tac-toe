import { useState, useCallback, useMemo } from 'react';
import { BoardState, Player, GameMode, GameStatus } from '../core/types/game';
import { INITIAL_BOARD, AI_DIFFICULTIES } from '../core/constants/game';
import { MinimaxAI } from '../core/algorithms/minimax';
import { checkWinner, getWinningLine } from '../core/utils/gameLogic';

export const useGame = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('PVC_HARD');
  const [moveHistory, setMoveHistory] = useState<number[]>([]);

  const gameStatus = useMemo((): GameStatus => {
    const winner = checkWinner(board);
    const winningLine = winner ? getWinningLine(board) : null;
    const isDraw = !winner && board.every(cell => cell !== null);
    
    return {
      winner,
      winningLine,
      isDraw,
      isGameOver: !!winner || isDraw
    };
  }, [board]);

  const ai = useMemo(() => {
    const difficulty = gameMode === 'PVC_HARD' ? AI_DIFFICULTIES.HARD : AI_DIFFICULTIES.EASY;
    return new MinimaxAI(difficulty.depth, difficulty.useAlphaBeta);
  }, [gameMode]);

  const makeMove = useCallback((index: number) => {
    if (board[index] !== null || gameStatus.isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoveHistory(prev => [...prev, index]);
    setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, gameStatus.isGameOver]);

  const makeAIMove = useCallback(() => {
    if (currentPlayer === 'O' && gameMode.startsWith('PVC') && !gameStatus.isGameOver) {
      const aiMove = ai.getBestMove(board, 'O');
      if (aiMove !== -1) {
        makeMove(aiMove);
      }
    }
  }, [board, currentPlayer, gameMode, gameStatus.isGameOver, ai, makeMove]);

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer('X');
    setMoveHistory([]);
  }, []);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    resetGame();
  }, [resetGame]);

  return {
    board,
    currentPlayer,
    gameMode,
    gameStatus,
    moveHistory,
    makeMove,
    makeAIMove,
    resetGame,
    changeGameMode
  };
};