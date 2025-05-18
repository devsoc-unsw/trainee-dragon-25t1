import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

export type Card = {
  id: number;
  url: string;
};

interface CardProps {
  id: number;
  url: string;
  setCards: Dispatch<SetStateAction<Card[]>>;
  cards: Card[];
}

export const Card: React.FC<CardProps> = ({ id, url, setCards, cards }) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-220, 220], [-18, 18]);
  const opacity = useTransform(x, [-220, 0, 220], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      // adding likes or dislikes
    }
  };

  return (
    <motion.img
      src={url}
      alt="Placeholder alt"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: '0.125s transform',
        boxShadow: isFront
          ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      // drag={isFront ? 'x' : false}
      drag={'x'}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};
