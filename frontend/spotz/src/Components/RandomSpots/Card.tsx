import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';

export type Card = {
  id: number;
  url: string;
  roomName: string;
  info: string[];
};

interface CardProps {
  id: number;
  url: string;
  roomName: string;
  info: string[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  cards: Card[];
}

export const Card: React.FC<CardProps> = ({ id, url, roomName, info, setCards, cards }) => {
  const [likeStatus, setLikeStatus] = useState("normal");
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-300, 300], [-18, 18]);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);
  const backgroundColor = useTransform(x, [-100, 0, 100], ['oklch(0.808 0.114 19.571)', 'oklch(0.945 0.129 101.54)', 'oklch(0.871 0.15 154.449)']);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) >= 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      // adding likes or dislikes
    }
  };

  const handleTransitionEnd = () => {
    if (likeStatus != "normal" && Math.abs(x.get()) >= 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  }

  return (
    <motion.div
      className="h-576 w-432 p-[20px] origin-bottom rounded-lg bg-yellow-200 hover:cursor-grab active:cursor-grabbing text-center text-5xl"
      variants={{
        normal: {
          x: 0,
          scale: isFront ? 1 : 0.98,
          transition: { duration: 0.3 },
        },
        like: {
          x: 300,
          transition: { duration: 0.3 },

        },
        dislike: {
          x: -300,
          transition: { duration: 0.3 },

        }
      }}
      initial="normal"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        backgroundColor,
        transition: '0.125s transform',
        boxShadow: isFront
          ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
          : undefined,
      }}
      animate={
        likeStatus
      }
      // drag={isFront ? 'x' : false}
      drag={'x'}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      <img alt="img" src={url} className="h-96 w-192 mx-auto my-5 pointer-events-none">

      </img>

      {roomName}

      <div className="text-4xl my-5">
        {info.map(i => <><>{i}</><br /></>)}
      </div>

      <div className="rounded-2xl bg-white p-[15px] mx-auto nowrap">
        <button className="mx-[10%]" onClick={() => setLikeStatus("dislike")}>
          👎
        </button>
        <button className="mx-[10%]" onClick={() => setLikeStatus("like")}>
          👍
        </button>
      </div>
    </motion.div>
  );
};
