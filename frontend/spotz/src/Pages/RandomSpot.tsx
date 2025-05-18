import { useNavigate } from 'react-router-dom';
import { SwipeCards } from '../Components/RandomSpots/SwipeCards';

export const RandomSpot = () => {
  const navigate = useNavigate();
  return (
    <>
      <SwipeCards />
      {/* <div className="text-7xl">TINDER SWIPING PAGE</div> */}
      <button
        className="absolute top-0 text-5xl bg-blue-500 rounded-3xl size-64"
        onClick={() => navigate('/')}
      >
        GO BACK
      </button>
    </>
  );
};
