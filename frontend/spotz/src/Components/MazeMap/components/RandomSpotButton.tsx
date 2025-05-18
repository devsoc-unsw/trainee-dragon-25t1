import { useNavigate } from 'react-router-dom';

import Shuffle from '../../icons/shuffle'

export const RandomSpotButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <div 
        className='flex flex-col justify-center items-center absolute size-28 bg-white bottom-10 right-3 z-[999] rounded-2xl border hover:bg-black/15 cursor-pointer'
        onClick={() => navigate('/randomspot')}
      > 
        <Shuffle>
          
        </Shuffle>
        <p className="text-black px-3 py-1 font-semibold text-center">
          Randomize
        </p>
      </div>
    </>
  );
};
