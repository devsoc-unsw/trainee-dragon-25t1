import type { Map } from 'mapbox-gl';
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import './style.css';

declare module 'mapbox-gl' {
  interface Map {
    zLevel?: number;
  }
}

interface DirectionSearchbar {
  mapRef: React.RefObject<Map | null>;
  num: number;
  setIsFilled: Dispatch<SetStateAction<boolean>>;
  setTriggerRoute: Dispatch<SetStateAction<number>>;
}

export const DirectionSearchBar: React.FC<DirectionSearchbar> = ({
  mapRef,
  num,
  setTriggerRoute,
  setIsFilled,
}) => {
  const mySearch = useMemo(
    () =>
      new window.Mazemap.Search.SearchController({
        campusid: 111,
        rows: 10,
        withpois: true,
        withbuilding: false,
        withtype: false,
        withcampus: false,
        resultsFormat: 'geojson',
      }),
    []
  );

  useEffect(() => {
    let mySearchInput: any;
    mySearchInput = new window.Mazemap.Search.SearchInput({
      container: document.getElementById(`search-input-container${num}`),
      input: document.getElementById(`searchInput${num}`),
      suggestions: document.getElementById(`suggestions2`),
      searchController: mySearch,
    });

    mySearchInput.on('itemclick', async (e: any) => {
      if (!mapRef.current) return;
      const [lng, lat] = e.item.geometry.coordinates;
      const zLevel = e.item.properties.zValue;
      const searchedPoint = { lngLat: { lng, lat }, zLevel };
      localStorage.setItem(
        `searchedPoint${num}`,
        JSON.stringify(searchedPoint)
      );

      mapRef.current.getCanvas().addEventListener('focus', () => {
        if (mySearchInput) {
          mySearchInput.hideSuggestions();
        }
      });

      const searchTag = document.getElementById(
        `searchInput${num}`
      ) as HTMLInputElement;
      if (searchTag.value) {
        setIsFilled(true);
        setTriggerRoute((prev) => prev + 1);
      } else {
        setIsFilled(false);
      }
    });
  }, []);

  return (
    <>
      <div
        id={`search-input-container${num}`}
        className="search-control-default2 rounded-full"
      >
        <input
          tabIndex={0}
          id={`searchInput${num}`}
          className="w-full h-full px-3 border border-black rounded-2xl" // change myself for design
          autoComplete="off"
          type="text"
          name="search"
          placeholder={num === 2 ? 'From' : 'To'}
        />
      </div>
    </>
  );
};
