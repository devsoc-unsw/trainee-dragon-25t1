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
}) => {
  const [likeStatus, setLikeStatus] = useState("normal");

  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-250, 250], [-18, 18]);
  const opacity = useTransform(x, [-250, 0, 250], [0, 2, 0]);
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    [
      "oklch(0.808 0.114 19.571)",
      "oklch(0.945 0.129 101.54)",
      "oklch(0.871 0.15 154.449)",
    ]
  );

  const isFront = id === cards[cards.length - 1].id;

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
    <motion.div
      className="h-3/4 w-1/3 origin-bottom rounded-2xl bg-yellow-200 relative
      hover:cursor-grab active:cursor-grabbing text-center text-5xl 
      shadow-inner bg-gradient-to-br from-white/10 via-transparent"
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
        zIndex: id,
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
      <div className="bg-gray-100 m-[40px] py-[10px] rounded-2xl">
        <img
          alt="img"
          src={url}
          className="size-96 object-cover mx-auto my-10 pointer-events-none rounded-xl shadow-xl"
        />

        {roomName}

        <div className="text-4xl my-7">
          {info.map((i, index) => (
            <>
              <>{i}</>
              <br key={index} />
            </>
          ))}
        </div>
      </div>

      <div className="flex justify-evenly rounded-2xl px-10 nowrap gap-4 absolute bottom-10 w-full left-0">
        <button
          className="w-1/2 bg-red-300 p-4 rounded-lg shadow-lg"
          onClick={() => setLikeStatus("dislike")}
        >
          👎
        </button>
        <button
          className="w-1/2 bg-green-300 p-4 rounded-lg shadow-lg"
          onClick={() => setLikeStatus("like")}
        >
          👍
        </button>
      </div>
    </motion.div>
  );
};
