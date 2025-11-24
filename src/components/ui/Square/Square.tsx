import React from 'react';
import styles from './Square.module.css';

interface SquareProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  isWinning,
  disabled
}) => {
  const classNames = [
    styles.square,
    isWinning && styles.winning,
    disabled && styles.disabled,
    value && styles[value.toLowerCase()]
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
};