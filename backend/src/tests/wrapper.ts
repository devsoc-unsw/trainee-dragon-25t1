import request, { HttpVerb } from 'sync-request-curl';
import { PORT } from '../../config.json';
import {
  DataStore,
  Email,
  MailIds,
  Message,
  Name,
  Password,
  Receivers,
  SessionId,
  SessionStore,
  Spot,
  Title,
} from '../constants/types';
import { setData, setSessions } from '../dataStore';
import { Session } from 'inspector/promises';

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
    session,
    payload: {},
  });
}

export function requestProfileRetrieve(email: Email, session: string) {
  return requestHelper({
    method: 'GET',
    path: '/profile',
    session,
    payload: { email },
  });
}

export function requestProfileEdit(
  name: Name,
  email: Email,
  password: Password,
  bookmarks: Array<Spot>,
  likes: Array<Spot>,
  session: string
) {
  return requestHelper({
    method: 'PUT',
    path: '/profile/edit',
    session,
    payload: { name, email, password, bookmarks, likes },
  });
}

// export function requestMailSend(
//   receivers: Receivers,
//   title: Title,
//   message: Message,
//   session: SessionId
// ) {
//   return requestHelper({
//     method: 'POST',
//     path: '/mail/send',
//     payload: { receivers, title, message },
//     session: session,
//   });
// }

// export function requestMailDelete(mailIds: MailIds, session: SessionId) {
//   return requestHelper({
//     method: 'DELETE',
//     path: '/mail/delete',
//     payload: { mailIds: mailIds },
//     session: session,
//   });
// }

export function requestClear() {
  console.log('Clearing now!');
  return requestHelper({
    method: 'DELETE',
    path: '/clear',
    payload: {},
  });
}
