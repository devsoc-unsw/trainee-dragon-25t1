import { addMarker } from '../lib/marker';
import type { Map } from 'mapbox-gl';
import { MapClick, MazeMapProps } from '../constants/types';
import { useEffect, useMemo } from 'react';

declare module 'mapbox-gl' {
  interface Map {
    zLevel?: number;
  }
}

interface Searchbar {
  mapRef: React.RefObject<Map | null>;
  mazeProps: MazeMapProps;
  markerRef: React.RefObject<any | null>;
  highlighterRef: React.RefObject<any | null>;
}

export const SearchBar: React.FC<Searchbar> = ({
  mapRef,
  mazeProps,
  markerRef,
  highlighterRef,
}) => {
  const mySearch = useMemo(
    () =>
      new window.Mazemap.Search.SearchController({
        campusid: mazeProps.campuses,
        rows: 10,
        withpois: true,
        withbuilding: false,
        withtype: false,
        withcampus: false,
        resultsFormat: 'geojson',
      }),
    [mazeProps.campuses]
  );

  useEffect(() => {
    let mySearchInput: any;
    mySearchInput = new window.Mazemap.Search.SearchInput({
      container: document.getElementById('search-input-container'),
      input: document.getElementById('searchInput'),
      suggestions: document.getElementById('suggestions'),
      searchController: mySearch,
    });

    mySearchInput.on('itemclick', async (e: any) => {
      if (!mapRef.current) return;
      const [lng, lat] = e.item.geometry.coordinates;
      const coords = { lng, lat };

      mapRef.current.zLevel = e.item.properties.zValue;

      let temp: MapClick = {
        _defaultPrevented: false,
        point: { x: 0, y: 0 },
        lngLat: coords,
        originalEvent: e,
        target: undefined,
        type: '',
      };

      temp.lngLat = coords;

      const marker = await addMarker(
        mapRef,
        mazeProps,
        temp,
        markerRef,
        highlighterRef
      );

      // IGNORE
      // marker.getElement().addEventListener('click', () => {
      //   if (!navigator.geolocation) {
      //     alert('Geolocation is not supported by your browser.');
      //     return;
      //   }
      //   navigator.geolocation.getCurrentPosition(
      //     (position) => {
      //       const userCoords = {
      //         lng: position.coords.longitude,
      //         lat: position.coords.latitude,
      //       };
      //       console.log(userCoords);
      //     });
      //     console.log(lat);
      //     console.log(lng);
          
      // });

      mapRef.current.getCanvas().addEventListener('focus', () => {
        if (mySearchInput) {
          mySearchInput.hideSuggestions();
        }
      });
    });
  }, []);

  return (
    <>
      <div
        id="search-input-container"
        className="search-control-default rounded-full"
      >
        <input
          tabIndex={0}
          id="searchInput"
          className="search-input"
          autoComplete="off"
          type="text"
          name="search"
          placeholder="Search"
        />

        <div id="suggestions" className="search-suggestions default"></div>
      </div>
    </>
  );
};
