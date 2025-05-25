import { useNavigate } from 'react-router-dom';
import { GeoData } from './types';
import Save from '../icons/Save';
import { preferenceUser } from '../../Fetchers/SpotsPreferencesFetch';

interface FooterProps {
  likes: GeoData[];
  dislikes: GeoData[];
}

export const Footer: React.FC<FooterProps> = ({ likes, dislikes }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // api call to add likes/dislikes
    try {
      console.log(likes, dislikes);
      const res = await preferenceUser(likes, dislikes);
      if (res) {
        navigate('/');
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <button
        className="absolute flex flex-row items-center justify-center gap-3 bottom-0 right-0 p-5 m-5 z-[1000] bg-white font-medium rounded-xl w-[220px] h-[50px] text-lg hover:bg-black/10"
        onClick={handleSubmit}
      >
        Save Submissions
        <Save />
      </button>
    </>
  );
};
