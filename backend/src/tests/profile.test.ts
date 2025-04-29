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

let session: string;
beforeEach(() => {
  requestClear();
  session = requestAuthRegister('Gooner GYG', 'devsoc@gmail.com', '010203Ab!');
});

describe.skip('Test profile retrieve', () => {
  test('Successful profile retrieve', () => {
    const profile = requestProfileRetrieve('devsoc@gmail.com', session);
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

  test('Not the same user', () => {
    const session2 = requestAuthRegister(
      'Gooner GYG1',
      'devsoc1@gmail.com',
      '010203Ab!'
    );
    const profile = requestProfileRetrieve('devsoc@gmail.com', session2);
    expect(profile.body).toStrictEqual(ERROR);
    expect(profile.status).toStrictEqual(401);
  });
});

describe.skip('Test profile edit', () => {
  test('Successful profile edit', () => {
    const user = requestProfileEdit(
      'Gooner',
      'devsoc@gmail.com',
      '010203Ab!',
      [],
      [],
      session
    );
    expect(user.body).toStrictEqual({});
    expect(user.status).toStrictEqual(200);
  });

  test('Bad name (too short)', () => {
    const user = requestProfileEdit(
      '',
      'devsoc@gmail.com',
      '010203Ab!',
      [],
      [],
      session
    );
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });

  test('Bad name (too long)', () => {
    const user = requestProfileEdit(
      LONG_NAME,
      'devsoc@gmail.com',
      '010203Ab!',
      [],
      [],
      session
    );
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });

  test('Bad password', () => {
    const user = requestProfileEdit(
      'Gooner',
      'devsoc@gmail.com',
      'ababababab',
      [],
      [],
      session
    );
    expect(user.body).toStrictEqual(ERROR);
    expect(user.status).toStrictEqual(400);
  });
});
