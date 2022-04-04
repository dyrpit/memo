export interface ICard {
  match: boolean;
  name: string;
  src: string;
  id: number;
}

export interface IGameState {
  cards: ICard[] | [];
  turns: number;
}

export type FlippCardType = (card: ICard) => void;

export type ShuffleDeckType = () => void;

export type UseGameType = () => {
  flippCard: FlippCardType;
  flippedCards: ICard[] | [];
  gameState: IGameState;
  isGameEnd: boolean;
  shuffleDeck: ShuffleDeckType;
};
