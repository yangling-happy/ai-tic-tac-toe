import React from "react";
import { Button } from "../../ui/Button";
import { GameMode } from "../../../core/types/game";
import styles from "./GameControls.module.css";

interface GameControlsProps {
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  onReset: () => void;
  isGameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  onGameModeChange,
  onReset,
  isGameOver,
}) => {
  const gameModes: { value: GameMode; label: string }[] = [
    { value: "PVP", label: "PvP" },
    { value: "PVC_EASY", label: "vs AI (Easy)" },
    { value: "PVC_HARD", label: "vs AI (Hard)" },
  ];

  return (
    <div className={styles.controls}>
      <div className={styles.modeSelector}>
        <span className={styles.label}>Game Mode:</span>
        <div className={styles.buttons}>
          {gameModes.map((mode) => (
            <Button
              key={mode.value}
              variant={gameMode === mode.value ? "primary" : "outline"}
              size="sm"
              onClick={() => onGameModeChange(mode.value)}
            >
              {mode.label}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        onClick={onReset}
        className={styles.resetButton}
      >
        {isGameOver ? "Play Again" : "Reset Game"}
      </Button>
    </div>
  );
};
