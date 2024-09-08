import { useState } from 'react';
import styles from '../styles/ReactionTest.module.css';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [boxColor, setBoxColor] = useState('#cc3333');
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleStartGame = () => {
    setGameStarted(true);
    setReactionTime(null);
    setBoxColor('#cc3333');
    
    const delay = Math.floor(Math.random() * 5000) + 1000; // 1-6 saniye arasında rastgele bir süre
    const id = setTimeout(() => {
      setBoxColor('#00ff00');
      setStartTime(Date.now());
    }, delay);

    setTimeoutId(id);
  };

  const handleBoxClick = () => {
    if (boxColor === '#cc3333') {
      setReactionTime('You clicked too early!');
      resetGame();
    } else if (boxColor === '#00ff00') {
      const endTime = Date.now();
      setReactionTime(`You took ${endTime - startTime}ms!`);
      resetGame();
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setBoxColor('#cc3333');
    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    <div className={styles.container}>
      {!gameStarted ? (
        <button onClick={handleStartGame} className={styles.startButton}>Start Game</button>
      ) : (
        <div
          onClick={handleBoxClick}
          className={styles.box}
          style={{ backgroundColor: boxColor }}
        />
      )}
      {reactionTime !== null && <p className={styles.reactionTime}>{reactionTime}</p>}
    </div>
  );
}
