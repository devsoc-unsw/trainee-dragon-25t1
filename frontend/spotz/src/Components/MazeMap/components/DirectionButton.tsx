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
      if (
        !prev.isViewing ||
        !['food', 'studyspot', 'likedStudySpot'].includes(prev.type)
      ) {
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
        className="absolute flex flex-row items-center justify-evenly bottom-11 left-[40%] h-20 w-1/5 sm:w-[13%] 
        bg-white text-2xl rounded-full hover:bg-black/15 duration-500 font-medium border border-gray-200"
        onClick={handleClick}
      >
        <Directions></Directions>
        Get Directions
      </button>
    </>
  );
};
