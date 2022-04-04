import { useEffect, useState } from 'react';
import { ICard, IGameState, UseGameType } from '../interfaces/interfaces';

const cardIamges = [
  {
    src: '/images/helmet.png',
    name: 'helmet',
  },
  {
    src: '/images/potion.png',
    name: 'potion',
  },
  {
    src: '/images/ring.png',
    name: 'ring',
  },
  {
    src: '/images/scroll.png',
    name: 'scroll',
  },
  {
    src: '/images/shield.png',
    name: 'shield',
  },
  {
    src: '/images/sword.png',
    name: 'sword',
  },
];

export const KEY = 'best-score';

const initialState: IGameState = {
  cards: [],
  turns: 0,
};

export const useGame: UseGameType = () => {
  const [gameState, setGameState] = useState<IGameState>(initialState);
  const [flippedCards, setFlippedCard] = useState<ICard[] | []>([]);
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false);

  const shuffleDeck = (): void => {
    const doubledCards = [...cardIamges, ...cardIamges];

    const shuffledCards = doubledCards
      .sort(() => Math.random() - 0.5)
      .map(({ src, name }, index) => ({
        match: false,
        name,
        id: index + 1,
        src,
      }));

    setGameState({
      cards: shuffledCards,
      turns: 0,
    });
    setIsGameEnd(false);
  };

  const flippCard = (card: ICard): void => {
    setFlippedCard([...flippedCards, card]);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    
      console.log(flippedCards)
    if (flippedCards.length === 2) {
      const isPair = flippedCards[0].name === flippedCards[1].name;

      if (isPair) {
        setGameState((prevState) => ({
          ...prevState,
          cards: prevState.cards.map((card) =>
            flippedCards.findIndex(({ id }) => id === card.id) > -1
              ? { ...card, match: true }
              : { ...card }
          ),
          turns: prevState.turns + 1,
        }));
      }

      if (!isPair) {
        setGameState((prevState) => ({
          ...prevState,
          turns: prevState.turns + 1,
        }));
      }

      timeout = setTimeout(() => {
        setFlippedCard([]);
      }, 500);
      console.log(timeout);
    }


    return () => clearTimeout(timeout);
  }, [flippedCards]);

  useEffect(() => {
    if (gameState.cards.length && gameState.cards.every(({ match }) => match)) {
      setIsGameEnd(true);
      const storedValue = localStorage.getItem(KEY);

      if (!storedValue || gameState.turns < JSON.parse(storedValue)) {
        localStorage.setItem(KEY, JSON.stringify(gameState.turns));
      }

      console.log(storedValue);
    }
  }, [gameState.cards, gameState.turns]);

  return { flippCard, flippedCards, gameState, isGameEnd, shuffleDeck };
};
