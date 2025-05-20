import { Dispatch, SetStateAction, useState } from 'react';
import { cardData } from './CardData';
import { Card } from './Card';
import { GeoData } from './types';

interface SwipeCardsProps {
  setLikes: Dispatch<SetStateAction<GeoData[]>>;
  setDislikes: Dispatch<SetStateAction<GeoData[]>>;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({
  setLikes,
  setDislikes,
}) => {
  const [cards, setCards] = useState<Card[]>([...cardData]); //change the [...cardData] as it can cause duplicated data.

  return (
    <div
      className="grid min-h-screen w-full place-items-center bg-neutral-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' 
        stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            cards={cards}
            setCards={setCards}
            {...card}
            setLikes={setLikes}
            setDislikes={setDislikes}
          />
        );
      })}
    </div>
  );
};
