import { Dispatch, SetStateAction } from 'react';
import { ListView } from '../constants/types';

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
      newPrev.isViewing = !prev.isViewing;
      newPrev.type = 'direction';
      return newPrev;
    });
    setIsDirecting((prev) => !prev);
  };

  return (
    <>
      <button
        className="absolute bottom-8 left-1/3 h-20 w-1/3 bg-white text-4xl rounded-full hover:bg-black/15 duration-500"
        onClick={handleClick}
      >
        Get Directions
      </button>
    </>
  );
};
