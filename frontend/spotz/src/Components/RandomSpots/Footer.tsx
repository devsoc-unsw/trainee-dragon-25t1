import { useNavigate } from 'react-router-dom';
import { GeoData } from './types';

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
        className="absolute top-0 right-0 text-5xl bg-blue-500 rounded-3xl size-64"
        onClick={handleSubmit}
      >
        SUBMIT
      </button>
    </>
  );
};
