import type { Map } from 'mapbox-gl';
import { doSearch } from '../components/DefaultSearchBar';
import {
  Coordinates,
  CoordinatesObject,
  MazeMapProps,
} from '../constants/types';

export const getProp = (
  props: MazeMapProps,
  prop: string,
  key: string,
  defaultValue: any
) => {
  if (!props[prop]) return defaultValue;
  return props[prop][key] || defaultValue;
};

export const getCoordinates = (
  coordinates: Coordinates | CoordinatesObject
): CoordinatesObject => {
  if (Array.isArray(coordinates)) {
    return {
      lng: coordinates[0],
      lat: coordinates[1],
    };
  }
  return coordinates;
};

export const setSpotsVisibility = (
  mapRef: React.RefObject<Map | null>,
  mySearch: any
) => {
  const map = mapRef.current;
  if (!map) return;

  if (map.getLayer('geojsonresults')) {
    const visibility = map.getLayoutProperty('geojsonresults', 'visibility');
    if (visibility === undefined || visibility === 'none') {
      map.setLayoutProperty('geojsonresults', 'visibility', 'visible');
      doSearch(mapRef, mySearch, 'food'); // Refresh data if needed
    } else {
      map.setLayoutProperty('geojsonresults', 'visibility', 'none');
    }
  } else {
    // If the layer doesn't exist yet, create it
    doSearch(mapRef, mySearch, 'food');
  }
};
