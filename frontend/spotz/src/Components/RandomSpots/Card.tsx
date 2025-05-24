import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { CoordinateObject, GeoData } from "./types";

export type Card = {
  id: number;
  url: string;
  roomName: string;
  info: string[];
  lngLat: CoordinateObject;
  zLevel: number;
};

interface CardProps {
  id: number;
  url: string;
  roomName: string;
  info: string[];
  lngLat: CoordinateObject;
  zLevel: number;
  setCards: Dispatch<SetStateAction<Card[]>>;
  setLikes: Dispatch<SetStateAction<GeoData[]>>;
  setDislikes: Dispatch<SetStateAction<GeoData[]>>;
  cards: Card[];
  index: number;
}

export const Card: React.FC<CardProps> = ({
  id,
  url,
  roomName,
  info,
  lngLat,
  zLevel,
  setCards,
  setLikes,
  setDislikes,
  cards,
  index,
}) => {
  const [likeStatus, setLikeStatus] = useState("normal");

  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 2, 0]);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    [
      "oklch(0.808 0.114 17.571)",
      "oklch(1 0 0)", 
      "oklch(0.871 0.15 144.449)",
    ]
  );

  const isFront = index === cards.length - 1;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 10 : -10;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) >= 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  const handleTransitionEnd = () => {
    if (likeStatus != "normal" && Math.abs(x.get()) >= 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
      if (likeStatus == "dislike") {
        setDislikes((prev) => [...prev, { lngLat, zLevel }]);
      }
      if (likeStatus == "like") {
        setLikes((prev) => [...prev, { lngLat, zLevel }]);
      }
    }
  };

  return (
    <>
    <motion.div
      className="h-[650px] w-1/3 origin-bottom rounded-xl border-black shadow-2xl bg-white relative
      hover:cursor-grab active:cursor-grabbing flex flex-col text-3xl"
      variants={{
        normal: {
          x: 0,
          scale: isFront ? 1 : 0.95,
          transition: { duration: 0.3 },
        },
        like: {
          x: 300,
          transition: { duration: 0.3 },
        },
        dislike: {
          x: -300,
          transition: { duration: 0.3 },
        },
      }}
      initial="normal"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        backgroundColor,
        zIndex: index,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
      }}
      animate={likeStatus}
      drag={"x"}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="flex flex-row justify-evenly gap-10 items-center mt-10 font-semibold">
        <div>
          {roomName}
        </div>
        <div className="text-xl">
            {info.map((i, idx) => (
              <p key={idx}>{i}</p>
            ))}
          </div>
        
      </div>
      <div className="m-2">
        <img
          alt="img"
          src={url}
          className="w-[370px] h-[500px] object-cover mx-auto my-8 pointer-events-none rounded-md"
        />
      </div>
      <div className="flex">
        <button
            className="w-1/2 bg-red-300 shadow-xl p-4 rounded-lg"
            onClick={() => setLikeStatus("dislike")}
          >
            👎
        </button>
        <button
          className="w-1/2 bg-green-300 p-4 rounded-lg shadow-xl"
          onClick={() => setLikeStatus("like")}
        >
          👍
        </button>
      </div>
    </motion.div>
    </>
    
  );
};
