import { Dispatch, SetStateAction } from 'react';
import { ListView } from '../constants/types';
import Directions from '../../icons/Dir';
interface DirectionButtonProp {
  setIsDirecting: Dispatch<SetStateAction<boolean>>;
  setListView: Dispatch<SetStateAction<ListView>>;
}

export const DirectionButton: React.FC<DirectionButtonProp> = ({
  setIsDirecting,
  setListView,
}) => {
  const handleClick = () => {
    setListView((prev) => {
      const newPrev = { ...prev };
      if (!prev.isViewing || prev.type !== 'food') {
        newPrev.isViewing = !prev.isViewing;
      }
      newPrev.type = 'direction';
      return newPrev;
    });
    setIsDirecting((prev) => !prev);
  };

  return (
    <>
      
      <button
        className="absolute flex flex-row items-center justify-evenly bottom-11 left-[650px] h-20 w-[200px] bg-white text-2xl rounded-md hover:bg-black/15 duration-500 font-medium border border-gray-200"
        onClick={handleClick}
      >
        <Directions>

        </Directions>
        Get Directions
      </button>
    </>
  );
};
