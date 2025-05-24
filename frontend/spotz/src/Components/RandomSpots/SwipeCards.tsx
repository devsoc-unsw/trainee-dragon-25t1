import { Dispatch, SetStateAction, useState } from 'react';
import { cardData } from './CardData';
import { Card } from './Card';
import { GeoData } from './types';
import { useNavigate } from 'react-router-dom';

interface SwipeCardsProps {
  setLikes: Dispatch<SetStateAction<GeoData[]>>;
  setDislikes: Dispatch<SetStateAction<GeoData[]>>;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({
  setLikes,
  setDislikes,
}) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>(() =>
    [...cardData]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );  //change the [...cardData] as it can cause duplicated data.
  console.log(cards);

  const handleSubmit = () => {
    // api call to add likes/dislikes
    navigate('/');
  };

  return (
    <div
      className="absolute grid z-[1000] top-0 min-h-screen w-full place-items-center"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' 
        stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
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
