import {
  requestAuthRegister,
  requestProfileEdit,
  requestProfileRetrieve,
  requestClear,
} from './wrapper';

const USER = {
  name: expect.any(String),
  email: expect.any(String),
  password: expect.any(String),
  bookmarks: expect.any(Array),
  likes: expect.any(Array),
  userId: expect.any(Number),
};

const ERROR = { error: expect.any(String) };
const LONG_NAME =
  'Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss';

let session: any;
beforeEach(() => {
  requestClear();
  session = requestAuthRegister('Gooner GYG', 'devsoc@gmail.com', '010203Ab!');
});

describe('Test profile retrieve', () => {
  test('Successful profile retrieve', () => {
    const profile = requestProfileRetrieve(session.body.sessionId);
    expect(profile.body).toStrictEqual(USER);
    expect(profile.status).toStrictEqual(200);
  });

  test("Bad email (email doesn't exists)", () => {
    requestAuthRegister('Gooner GYG', 'devsoc@gmail.com', '010203Ab!');
    const session = requestAuthRegister(
      'Gooner GYG',
      'devsoc@gmail.com',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Not valid session', () => {
    const profile = requestProfileRetrieve('Not a session');
    expect(profile.body).toStrictEqual(ERROR);
    expect(profile.status).toStrictEqual(401);
  });
});

describe('Test profile edit', () => {
  test('Successful profile edit', () => {
    const user = requestProfileEdit(
      [],
      [],
      [],
      [],
      session.body.sessionId,
      'Gooner'
    );
    expect(user.body).toStrictEqual({});
    expect(user.status).toStrictEqual(200);
  });

  test('Bad name (too short)', () => {
    const user = requestProfileEdit([], [], [], [], session.body.sessionId, '');
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });

  test('Bad name (too long)', () => {
    const user = requestProfileEdit(
      [],
      [],
      [],
      [],
      session.body.sessionId,
      LONG_NAME
    );
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });

  test('Bad password', () => {
    const user = requestProfileEdit(
      [],
      [],
      [],
      [],
      session.body.sessionId,
      'Gooner',
      undefined,
      'ababababab'
    );
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });

  test('Not valid session', () => {
    const profile = requestProfileEdit(
      [],
      [],
      [],
      [],
      'Not A Session',
      'Gooner'
    );
    expect(profile.body).toStrictEqual(ERROR);
    expect(profile.status).toStrictEqual(401);
  });
});
