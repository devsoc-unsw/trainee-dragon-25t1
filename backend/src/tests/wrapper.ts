import request, { HttpVerb } from 'sync-request-curl';
import { PORT } from '../../config.json';
import {
  Email,
  Name,
  Password,
  Spot,
  GeoSpot,
} from '../constants/types';

interface RequestOptions {
  method: HttpVerb;
  path: string;
  payload?: object;
  session?: string;
}

const SERVER_URL = `http://localhost:${PORT}`;
const TIMEOUT_MS = 5000;

export function requestHelper({
  method,
  path,
  payload,
  session,
}: RequestOptions): any {
  let query: any = {};
  let body: any = {};
  const header = { session };

  if (['PUT', 'POST'].includes(method)) {
    body = payload;
  } else {
    // GET/DELETE
    query = payload;
  }

  const res = request(method, SERVER_URL + path, {
    qs: query,
    json: body,
    headers: header,
    timeout: TIMEOUT_MS,
  });
  const bodyString = res.body.toString();
  let bodyObject: any;
  try {
    bodyObject = {
      body: JSON.parse(bodyString),
      status: res.statusCode,
    };
  } catch (err: any) {
    bodyObject = {
      error: `Server responded with ${res.statusCode}, but body is not JSON 
              GIVEN: ${bodyString} 
              REASON: ${err.message}
              HINT: Did you res.json(undefined)?`,
      status: res.statusCode,
    };
  }
  return bodyObject;
}

export function requestAuthRegister(
  name: Name,
  email: Email,
  password: Password
) {
  return requestHelper({
    method: 'POST',
    path: '/auth/register',
    payload: { name, email, password },
  });
}

export function requestAuthLogin(email: Email, password: Password) {
  return requestHelper({
    method: 'POST',
    path: '/auth/login',
    payload: { email, password },
  });
}

export function requestAuthLogout(session: string) {
  return requestHelper({
    method: 'DELETE',
    path: '/auth/logout',
    payload: {},
    session,
  });
}

export function requestProfileRetrieve(session: string) {
  return requestHelper({
    method: 'GET',
    path: '/profile',
    payload: {},
    session,
  });
}

export function requestProfileEdit(
  newBookmarks: Array<Spot>,
  removedBookmarks: Array<Spot>,
  likes: Array<Spot>,
  dislikes: Array<Spot>,
  session: string,
  name?: Name,
  email?: Email,
  password?: Password
) {
  const payload: Record<string, any> = {
    newBookmarks,
    removedBookmarks,
    likes,
    dislikes,
  };

  if (name !== undefined) payload.name = name;
  if (email !== undefined) payload.email = email;
  if (password !== undefined) payload.password = password;

  return requestHelper({
    method: 'PUT',
    path: '/profile/edit',
    payload,
    session,
  });
}

export function requestRecommendSpot(
  latitude: number,
  longitude: number,
  zLevel: number,
  seats: number,
  noiseLevel: number,
  comfortability: number,
  popularity: number,
  session: string
) {
  return requestHelper({
    method: 'POST',
    path: '/location/recommend',
    payload: {
      latitude,
      longitude,
      zLevel,
      seats,
      noiseLevel,
      comfortability,
      popularity,
    },
    session,
  });
}

export function requestAddStudySpotPreferenceSpot(
  session: string,
  likes: GeoSpot[],
  dislikes: GeoSpot[]
) {
  return requestHelper({
    method: 'POST',
    path: '/location/studyspot/preference',
    payload: {
      likes,
      dislikes,
    },
    session,
  });
}

export function requestClear() {
  console.log('Clearing now!');
  return requestHelper({
    method: 'DELETE',
    path: '/clear',
    payload: {},
  });
}
