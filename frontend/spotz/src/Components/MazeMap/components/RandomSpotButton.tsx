import { useNavigate } from 'react-router-dom';

export const RandomSpotButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="absolute size-28 bg-purple-700 bottom-10 right-10 z-[999] text-white rounded-3xl px-6 py-2"
        onClick={() => navigate('/randomspot')}
      >
        Random Spots
      </button>
    </>
  );
};
