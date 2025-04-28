import { ErrorMap } from '../constants/errors';
import {
  Name,
  Email,
  Password,
  Session,
  UserId,
  User,
  SessionId,
  UserProfile,
} from '../constants/types';

/**
 * Retrieve user profile and returns a user profile
 * @param name
 * @param email
 * @param password
 */
export function profileRetrieve(
  name: Name,
  email: Email,
  password: Password
): UserProfile {
  const profile: UserProfile = {
    name,
    email,
    password,
    userId: 1,
    bookmark: [],
  };
  return profile;
}

/**
 * Edit user profile and returns nth
 * @param name
 * @param email
 * @param password
 */
export function profileEdit(name: Name, email: Email, password: Password) {}
