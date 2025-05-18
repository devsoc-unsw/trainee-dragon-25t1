import { useNavigate } from 'react-router-dom';

export const RandomSpot = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-7xl">TINDER SWIPING PAGE</div>
      <button
        className="text-5xl bg-blue-500 rounded-3xl size-64"
        onClick={() => navigate('/')}
      >
        GO BACK
      </button>
    </>
  );
};
