import { useState } from 'react';
import { SwipeCards } from '../Components/RandomSpots/SwipeCards';
import { Footer } from '../Components/RandomSpots/footer';
import { GeoData } from '../Components/RandomSpots/types';
import { BackButton } from '../Components/BackButton';

export const RandomSpot = () => {
  const [likes, setLikes] = useState<GeoData[]>([]);
  const [dislikes, setDislikes] = useState<GeoData[]>([]);

  return (
    <>
      <BackButton />
      <SwipeCards setLikes={setLikes} setDislikes={setDislikes} />
      <Footer likes={likes} dislikes={dislikes} />
    </>
  );
};
