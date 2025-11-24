import { useEffect } from 'react';
import { GameLayout } from './components/layout/GameLayout';
import { useGame } from './hooks/useGame';

function App() {
  const game = useGame();

  useEffect(() => {
    if (game.currentPlayer === 'O' && game.gameMode.startsWith('PVC')) {
      const timer = setTimeout(() => {
        game.makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [game.currentPlayer, game.gameMode, game.makeAIMove]);

  return (
    <div className="App">
      <GameLayout {...game} />
    </div>
  );
}

export default App;