import { useState } from 'react';
import { SwipeCards } from '../Components/RandomSpots/SwipeCards';
import { Footer } from '../Components/RandomSpots/Footer';
import { GeoData } from '../Components/RandomSpots/types';
import { BackButton } from '../Components/BackButton';
import background from "../assets/background.png"
export const RandomSpot = () => {
  const [likes, setLikes] = useState<GeoData[]>([]);
  const [dislikes, setDislikes] = useState<GeoData[]>([]);

  return (
    <>
      <div className="relative w-full min-h-screen">
  {/* Background image */}
      <img
        src={background}
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
        alt="background"
      />

      {/* Translucent overlay */}
      <div className="fixed inset-0 bg-black/30 -z-10 pointer-events-none" />
      <BackButton />
      <SwipeCards setLikes={setLikes} setDislikes={setDislikes} />
      <Footer likes={likes} dislikes={dislikes} />
      </div>
    </>
  );
};
