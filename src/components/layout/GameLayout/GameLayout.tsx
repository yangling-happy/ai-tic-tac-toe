import React from 'react';
import { Board } from '../../game/Board/Board';
import { GameStatus } from '../../game/GameStatus/GameStatus';
import { GameControls } from '../../game/GameControls/GameControls';
import { BoardState, Player, GameMode, GameStatus as IGameStatus } from '../../../core/types/game';
import styles from './GameLayout.module.css';

interface GameLayoutProps {
  board: BoardState;
  currentPlayer: Player;
  gameMode: GameMode;
  gameStatus: IGameStatus;
  makeMove: (index: number) => void;
  resetGame: () => void;
  changeGameMode: (mode: GameMode) => void;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
  board,
  currentPlayer,
  gameMode,
  gameStatus,
  makeMove,
  resetGame,
  changeGameMode
}) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>AI Tic Tac Toe</h1>
        <p className={styles.subtitle}>Minimax Algorithm with Alpha-Beta Pruning</p>
      </header>

      <main className={styles.main}>
        <GameStatus
          currentPlayer={currentPlayer}
          winner={gameStatus.winner}
          isDraw={gameStatus.isDraw}
          isGameOver={gameStatus.isGameOver}
          gameMode={gameMode}
        />

        <Board
          squares={board}
          winningLine={gameStatus.winningLine}
          onSquareClick={makeMove}
          disabled={gameStatus.isGameOver || (currentPlayer === 'O' && gameMode.startsWith('PVC'))}
        />

        <GameControls
          gameMode={gameMode}
          onGameModeChange={changeGameMode}
          onReset={resetGame}
          isGameOver={gameStatus.isGameOver}
        />
      </main>

      <footer className={styles.footer}>
        <p>Built with React, TypeScript, and AI Search Algorithms</p>
      </footer>
    </div>
  );
};