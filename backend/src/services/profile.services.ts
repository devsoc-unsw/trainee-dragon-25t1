import { ErrorMap } from '../constants/errors';
import {
  Name,
  Email,
  Password,
  User,
  SessionId,
  GeoSpot,
} from '../constants/types';
import { getData, getSessions, setData } from '../dataStore';
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from '../helpers/users.helpers';

/**
 * Retrieve user profile and returns a user profile
//  * @param sessionId
 * @param email
 */
export function profileRetrieve(session: SessionId): User {
  const sessions = getSessions();

  const userId = sessions.find((s) => s.sessionId == session)?.userId as number;
  if (!userId || userId === undefined) {
    throw new Error(ErrorMap['INVALID_SESSION']);
  }

  const user = getData().users.find((u) => u.userId == userId);
  if (!user || user === undefined) {
    throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);
  }

  return user;
}

/**
 * Fetch the likes array from the user profile
 * @param session
 */
export function fetchLikes(session: SessionId): GeoSpot[] {
  const user = profileRetrieve(session);
  return user.likes ?? [];
}

/**
 * Fetch the dislikes array from the user profile
 * @param session
 */
export function fetchDislikes(session: SessionId): GeoSpot[] {
  const user = profileRetrieve(session);
  return user.dislikes ?? [];
}

/**
 * Edit user profile and returns nth
 * @param sessionId
 * @param name
 * @param email
 * @param password
 * @param bookmarks
 * @param likes
 * @param dislikes
 */
export function profileEdit(
  session: SessionId,
  newBookmarks: Array<GeoSpot>,
  removedBookmarks: Array<GeoSpot>,
  likes: Array<GeoSpot>,
  dislikes: Array<GeoSpot>,
  name?: Name,
  email?: Email,
  password?: Password
) {
  // name is greater than 100 or less than 1 characters
  if (name !== undefined && isValidName(name) !== true) {
    throw new Error(isValidName(name) as string);
  }

  // name is greater than 100 or less than 1 characters
  if (email !== undefined && isValidEmail(email, true) !== true) {
    throw new Error(isValidEmail(email) as string);
  }

  // password should have 1 uppercase, 1 lowercase, and 1 number
  if (password !== undefined && isValidPassword(password) !== true) {
    throw new Error(isValidPassword(password) as string);
  }

  const sessions = getSessions();
  const userId = sessions.find((s) => s.sessionId == session)?.userId as number;

  const data = getData();
  const user = data.users.find((u) => u.userId == userId);
  if (!user || user === undefined) {
    throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);
  }

  removedBookmarks.forEach((removedBookmark) => {
    const index = user.bookmarks.findIndex(
      (bookmark) => bookmark === removedBookmark
    );
    user.bookmarks.splice(index, 1);
  });

  dislikes.forEach((dislike) => {
    const index = user.likes.findIndex((like) => like === dislike);
    user.likes.splice(index, 1);
  });

  const newProfile: User = {
    ...user,
    ...(name !== undefined && { name }),
    ...(email !== undefined && { email }),
    ...(password !== undefined && { password }),
    bookmarks: [...user.bookmarks, ...newBookmarks],
    likes: [...user.likes, ...likes],
  };

  const index = data.users.indexOf(user);
  if (index !== -1) {
    data.users[index] = newProfile;
  }

  setData(data);

  return {};
}
