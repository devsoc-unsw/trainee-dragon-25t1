import { ErrorMap } from '../constants/errors';
import { Spot } from '../constants/types';
import { getData, setData } from '../dataStore';

/**
 * Share location of a spot
 * @param latitude
 * @param longitude
 * @param zLevel
 * @param numSeats 0 - inf
 * @param noiseLevel 1 - 5
 * @param comfortability 1 - 5
 * @param popularity 1 - 5
 */
export function recommendSpot(
  latitude: number,
  longitude: number,
  zLevel: number,
  seats: number,
  noiseLevel: number,
  comfortability: number,
  popularity: number
): Spot {
  if (latitude < -90.0 || latitude > 90.0) {
    throw new Error(ErrorMap['LATITUDE_INCORRECT']);
  }

  if (longitude < -180.0 || longitude > 180.0) {
    throw new Error(ErrorMap['LONGITUDE_INCORRECT']);
  }

  if (seats < 0) {
    throw new Error(ErrorMap['SEATS_INCORRECT']);
  }

  if (
    noiseLevel < 1 ||
    noiseLevel > 5 ||
    comfortability < 1 ||
    comfortability > 5 ||
    popularity < 1 ||
    popularity > 5
  ) {
    throw new Error(ErrorMap['RATING_INCORRECT']);
  }

  const database = getData();

  const spot: Spot = {
    latitude,
    longitude,
    zLevel,
    seats,
    noiseLevel,
    comfortability,
    popularity,
  };

  database.spots.push(spot);

  setData(database);

  return spot;
}
