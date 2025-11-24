import React from "react";
import { Square } from "../../ui/Square/Square";
import styles from "./Board.module.css";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  winningLine: number[] | null;
  onSquareClick: (index: number) => void;
  disabled: boolean;
}

export const Board: React.FC<BoardProps> = ({
  squares,
  winningLine,
  onSquareClick,
  disabled,
}) => {
  const renderSquare = (index: number) => (
    <Square
      key={index}
      value={squares[index]}
      onClick={() => onSquareClick(index)}
      isWinning={winningLine?.includes(index) || false}
      disabled={disabled || squares[index] !== null}
    />
  );

  return (
    <div className={styles.board} role="grid" aria-label="Tic Tac Toe Board">
      <div className={styles.row}>{[0, 1, 2].map(renderSquare)}</div>
      <div className={styles.row}>{[3, 4, 5].map(renderSquare)}</div>
      <div className={styles.row}>{[6, 7, 8].map(renderSquare)}</div>
    </div>
  );
};
