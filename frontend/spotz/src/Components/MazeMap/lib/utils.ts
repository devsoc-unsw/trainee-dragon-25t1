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
