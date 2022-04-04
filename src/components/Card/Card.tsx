import { FC } from 'react';
import { FlippCardType, ICard } from '../../interfaces/interfaces';

import './Card.css';

interface IProps {
  backImg: string;
  card: ICard;
  isFlipped: boolean;
  onClick: FlippCardType;
}

const Card: FC<IProps> = ({ backImg, card, isFlipped, onClick }) => {
  const flippedClass = isFlipped ? 'flipped' : '';

  return (
    <div className='card'>
      <div className={`card-inner ${flippedClass}`}>
        <img className='front' src={card.src} alt='Card front' />
        <img
          className='back'
          onClick={() => onClick(card)}
          src={backImg}
          alt='Card back'
        />
      </div>
    </div>
  );
};

export default Card;
