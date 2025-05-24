import { useNavigate } from 'react-router-dom';
import { GeoData } from './types';
import Save from '../icons/Save';

interface FooterProps {
  likes: GeoData[];
  dislikes: GeoData[];
}

export const Footer: React.FC<FooterProps> = ({ likes, dislikes }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // api call to add likes/dislikes
    console.log(likes, dislikes);
    navigate('/');
  };
  return (
    <>
      <button
        className="absolute flex flex-row items-center justify-center gap-3 bottom-0 right-0 p-5 m-5 z-[1000] bg-white font-medium rounded-xl w-[220px] h-[50px] border text-lg"
        onClick={handleSubmit}
      >
        Save Submissions
        <Save />
      </button>
    </>
  );
};
