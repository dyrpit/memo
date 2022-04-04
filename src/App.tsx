import React, { FC, useState } from 'react';
import { KEY, useGame } from './hooks/useGame';

import Card from './components/Card/Card';

import './App.css';
import Modal from './components/Modal/Modal';

const App: FC = () => {
  const { flippCard, flippedCards, gameState, isGameEnd, shuffleDeck } =
    useGame();

    const [show, setShow] = useState<boolean>(false);

  return (
    <div style={{position: 'relative'}}>
      <header className='header'>React memo game</header>
      <main className='container'>
        <button onClick={shuffleDeck}>New Game</button>
        <button onClick={() => setShow(true)}>Show</button>
        <h2>{gameState.turns}</h2>
        <div className='grid'>
          {gameState.cards.map((card) => (
            <Card
              backImg='/images/cover.png'
              card={card}
              isFlipped={
                card.match ||
                flippedCards.findIndex(({ id }) => id === card.id) > -1
              }
              onClick={flippCard}
              key={card.id}
            />
          ))}
        </div>
      </main>
      {isGameEnd && <Modal >
        <p>{`Congrats you end the game in ${gameState.turns} turns`}</p>
        <p>{`Currently best score is: ${localStorage.getItem(KEY)}`}</p>
        </Modal>}
    </div>
  );
};

export default App;
