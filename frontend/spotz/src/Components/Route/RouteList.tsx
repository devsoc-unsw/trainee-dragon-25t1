import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { DirectionSearchBar } from './DirectionSearchBar';
import type { Map } from 'mapbox-gl';
import { ListView } from '../MazeMap/constants/types';
import { generateRoute } from './routing';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface RouteListProps {
  mapRef: React.RefObject<Map | null>;
  listView: ListView;
  setListView: Dispatch<SetStateAction<ListView>>;
}

export const RouteList: React.FC<RouteListProps> = ({
  mapRef,
  listView,
  setListView,
}) => {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isFilled2, setIsFilled2] = useState<boolean>(false);
  const [triggerRoute, setTriggerRoute] = useState<number>(0);
  const routeControllerRef = useRef<any>(null);

  useEffect(() => {
    if (listView.isViewing) {
      const curLngLat = localStorage.getItem('curLngLat');
      if (curLngLat) {
        const toDirSearchBar = document.getElementById(
          'searchInput3'
        ) as HTMLInputElement;
        if (toDirSearchBar) toDirSearchBar.value = 'Selected Point';
      }
    }
  }, [listView.isViewing]);

  useEffect(() => {
    if (isFilled && isFilled2) {
      routeControllerRef.current?.clear();
      const point1 = JSON.parse(
        localStorage.getItem('searchedPoint2') as string
      );
      const point2 = JSON.parse(
        localStorage.getItem('searchedPoint3') as string
      );
      generateRoute(mapRef, routeControllerRef, point1, point2);
    }
  }, [triggerRoute]);

  const handleCollapseList = () => {
    if (routeControllerRef.current) {
      routeControllerRef.current.clear();
    }
    setListView((prev: ListView) => {
      const newPrev = { ...prev };
      newPrev.isViewing = !prev.isViewing;
      return newPrev;
    });
  };

  const handleSwapDirection = () => {
    // TODO implement this
    // const searchTag = document.getElementById(
    //   'searchInput2'
    // ) as HTMLInputElement;
    // const searchTag2 = document.getElementById(
    //   'searchInput3'
    // ) as HTMLInputElement;
    // const parent = searchTag.parentNode as HTMLElement;
    // const nextSibling =
    //   searchTag.nextSibling === searchTag2 ? searchTag : searchTag.nextSibling;
    // parent.insertBefore(searchTag2, searchTag);
    // parent.insertBefore(searchTag, nextSibling);
  };

  return (
    <>
      <button onClick={handleCollapseList}>
        <MenuRoundedIcon
          className="absolute top-4 left-4"
          sx={{ height: '3rem', width: '3rem' }}
        />
      </button>
      <h2 className="text-center sm:text-3xl text-lg my-8">
        Direction Selection{' '}
      </h2>
      <div className="flex flex-col gap-2 w-full items-center h-[90%]">
        <div className="flex flex-row justify-center items-center gap-4 w-full h-[12%]">
          <div className="flex flex-col items-center justify-center h-full gap-4 w-[70%]">
            <DirectionSearchBar
              mapRef={mapRef}
              num={2}
              setIsFilled={setIsFilled}
              setTriggerRoute={setTriggerRoute}
            />
            <DirectionSearchBar
              mapRef={mapRef}
              num={3}
              setIsFilled={setIsFilled2}
              setTriggerRoute={setTriggerRoute}
            />
          </div>
          <button onClick={handleSwapDirection}>
            <SwapVertIcon sx={{ height: '2.2rem', width: '2.2rem' }} />
          </button>
        </div>
        <div id="suggestions2" className="search-suggestions2 default"></div>
      </div>
    </>
  );
};
