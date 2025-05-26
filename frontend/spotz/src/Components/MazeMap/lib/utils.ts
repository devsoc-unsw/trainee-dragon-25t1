import type { Map } from 'mapbox-gl';
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
  sourceName: string,
  callBackFn: () => void
) => {
  const map = mapRef.current;
  if (!map) return;
  // Define which layers belong to which source
  const sourceToLayers: Record<string, string[]> = {
    geojsonresults: ['outer-circle1', 'inner-circle1'],
    geojsonresults2: ['outer-circle2', 'inner-circle2'],
    geojsonresults3: ['outer-circle3', 'inner-circle3'],
  };
  const targetLayers = sourceToLayers[sourceName];
  const otherSourceName =
    sourceName === 'geojsonresults' ? 'geojsonresults2' : 'geojsonresults';
  const otherLayers = sourceToLayers[otherSourceName];

  // Get current visibility of one layer to decide toggle
  const currentVisibility = map.getLayoutProperty(
    targetLayers[0],
    'visibility'
  );

  if (currentVisibility === undefined || currentVisibility === 'none') {
    // Make target layers visible
    for (const layer of targetLayers) {
      if (map.getLayer(layer)) {
        map.setLayoutProperty(layer, 'visibility', 'visible');
      }
    }
    // Hide the other source's layers
    for (const layer of otherLayers) {
      if (map.getLayer(layer)) {
        map.setLayoutProperty(layer, 'visibility', 'none');
      }
    }

    callBackFn();
  } else {
    // Toggle off target layers
    for (const layer of targetLayers) {
      if (map.getLayer(layer)) {
        map.setLayoutProperty(layer, 'visibility', 'none');
      }
    }
  }
};
