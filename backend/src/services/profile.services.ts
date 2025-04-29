import { ErrorMap } from '../constants/errors';
import { Name, Email, Password, User, Spot } from '../constants/types';
import { getData, setData } from '../dataStore';
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
export function profileRetrieve(email: Email): User {
  const data = getData();

  const user = data.users.find((user) => user.email === email);
  if (!user || user === undefined) {
    throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);
  }

  return user;
}

/**
 * Edit user profile and returns nth
//  * @param sessionId
 * @param name
 * @param email
 * @param password
 * @param bookmarks
 * @param likes
 */
export function profileEdit(
  // sessionId: String,
  // userId: number,
  email: Email,
  name?: Name,
  password?: Password,
  bookmarks?: Array<Spot>,
  likes?: Array<Spot>
) {
  // name is greater than 100 or less than 1 characters
  if (name !== undefined && isValidName(name) !== true) {
    throw new Error(isValidName(name) as string);
  }

  // name is greater than 100 or less than 1 characters
  if (isValidEmail(email, true) !== true) {
    throw new Error(isValidEmail(email) as string);
  }

  // password should have 1 uppercase, 1 lowercase, and 1 number
  if (password !== undefined && isValidPassword(password) !== true) {
    throw new Error(isValidPassword(password) as string);
  }

  const data = getData();

  const user = data.users.find((user) => user.email === email);
  if (!user || user === undefined) {
    throw new Error(ErrorMap['USER_DOES_NOT_EXIST']);
  }

  const newBookmarks = user.bookmarks.filter(
    (bookmark) => !bookmarks?.includes(bookmark)
  );

  const newLikes = user.likes.filter((like) => !likes?.includes(like));

  const newProfile: User = {
    ...user,
    ...(name !== undefined && { name }),
    ...(password !== undefined && { password }),
    bookmarks: newBookmarks,
    likes: newLikes,
  };

  const index = data.users.indexOf(user);

  if (index !== -1) {
    data.users[index] = newProfile;
  }

  setData(data);
  return {};
}
