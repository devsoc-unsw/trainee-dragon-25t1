import { ErrorMap } from '../constants/errors';
import { SessionId, Spot, GeoSpot } from '../constants/types';
import { getData, getSessions, setData } from '../dataStore';



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

/**
 * Add study spot preference of spots
 * @param sessionId
 * @param likes
 * @param dislikes
 */
export function addStudySpotPreference(
  session: SessionId,
  likes: Array<GeoSpot>,
  dislikes: Array<GeoSpot>
) {
  const sessions = getSessions();
  const userId = sessions.find((s) => s.sessionId == session)?.userId as number;

  const data = getData();
  const user = data.users.find((u) => u.userId == userId);
  if (!user || user === undefined) {
    throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);
  }

  likes.forEach((like) => user.likes.push(like));
  dislikes.forEach((dislike) => user.dislikes.push(dislike));

  setData(data);

  return {};
}

/**
 * Get study spot history of a user
 * @param sessionId
 */
export function getStudySpotHistory(session: SessionId): GeoSpot[] {
  const sessions = getSessions();
  const userId = sessions.find(s => s.sessionId === session)?.userId;
  if (!userId) throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);

  const data = getData();
  const user = data.users.find(u => u.userId === userId)!;
  if (!user) throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);

  return user.histories;
}
  
  /**
   * Save study spot located
   * @param sessionId
   * @param spot
   */
export function saveStudySpotHistory(
  session: SessionId,
  spot: GeoSpot
) {
  const sessions = getSessions();
  const userId = sessions.find(s => s.sessionId === session)?.userId;
  if (!userId) throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);

  const data = getData();
  const user = data.users.find(u => u.userId === userId)!;
  if (!user) throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);

  // push our one spot
  user.histories.push(spot);
  setData(data);

  return {}; 
}