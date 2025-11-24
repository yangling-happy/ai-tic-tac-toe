import React from 'react';
import { Player, GameMode } from '../../../core/types/game';
import styles from './GameStatus.module.css';

interface GameStatusProps {
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;
  isGameOver: boolean;
  gameMode: GameMode;
}

export const GameStatus: React.FC<GameStatusProps> = ({
  currentPlayer,
  winner,
  isDraw,
  isGameOver,
  gameMode
}) => {
  const getStatusMessage = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return "It's a draw!";
    }
    
    const isAITurn = currentPlayer === 'O' && gameMode.startsWith('PVC');
    return `Next player: ${currentPlayer}${isAITurn ? ' (AI)' : ''}`;
  };

  const getGameModeText = () => {
    switch (gameMode) {
      case 'PVP':
        return 'Player vs Player';
      case 'PVC_EASY':
        return 'Player vs AI (Easy)';
      case 'PVC_HARD':
        return 'Player vs AI (Hard)';
      default:
        return gameMode;
    }
  };

  return (
    <div className={styles.status}>
      <div className={styles.mode}>{getGameModeText()}</div>
      <div className={`${styles.message} ${isGameOver ? styles.gameOver : ''}`}>
        {getStatusMessage()}
      </div>
    </div>
  );
};