import {
  requestAuthLogin,
  requestAuthLogout,
  requestAuthRegister,
  requestClear,
} from './wrapper';

const SESSION = {
  sessionId: expect.any(String),
  userId: expect.any(Number),
};

const ERROR = { error: expect.any(String) };
const LONG_NAME =
  'Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss Ramonaaaaaaaaaaaaaaaaaaaaaaaaa Flowersssssssssssssss';

beforeEach(() => {
  requestClear();
});

describe('Test register', () => {
  test('Successful register', () => {
    const session = requestAuthRegister(
      'Gooner GYG',
      'devsoc@gmail.com',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(SESSION);
    expect(session.status).toStrictEqual(200);
  });

  test('Bad name (too short)', () => {
    const session = requestAuthRegister('', 'devsoc@gmail.com', '010203Ab!');
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad name (too long)', () => {
    const session = requestAuthRegister(
      LONG_NAME,
      'devsoc@gmail.com',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad email (suffix)', () => {
    const session = requestAuthRegister(
      'Gooner GYG',
      'devsoc@gmailcom',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad email (already exists)', () => {
    requestAuthRegister('Gooner GYG', 'devsoc@gmail.com', '010203Ab!');
    const session = requestAuthRegister(
      'Gooner GYG',
      'devsoc@gmail.com',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad password', () => {
    const session = requestAuthRegister(
      'Gooner GYG',
      'devsoc@gmail.com',
      'abcabcabc'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });
});

describe('Test login', () => {
  beforeEach(() => {
    requestAuthRegister('', 'devsoc@gmail.com', '010203Ab!');
  });

  test('Successful login', () => {
    const session = requestAuthLogin('devsoc@gmail.com', '010203Ab!');
    expect(session.body).toStrictEqual(SESSION);
    expect(session.status).toStrictEqual(200);
  });

  test('Bad email (wrong suffix)', () => {
    const session = requestAuthLogin('devsoc@gmailcom', '010203Ab!');
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad email (not found)', () => {
    const session = requestAuthLogin(
      'devsoc1231231312312312312312@gmail.com',
      '010203Ab!'
    );
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });

  test('Bad password', () => {
    const session = requestAuthLogin('devsoc@gmail.com', 'abcabcabc');
    expect(session.body).toStrictEqual(ERROR);
    expect(session.status).toStrictEqual(400);
  });
});

describe('Test logout', () => {
  let session: string;
  beforeEach(() => {
    session = requestAuthRegister('', 'devsoc@gmail.com', '010203Ab!');
  });

  test('Successful logout', () => {
    const logout = requestAuthLogout(session);
    expect(logout.body).toStrictEqual(SESSION);
    expect(logout.status).toStrictEqual(200);
  });

  test('Not the same user', () => {
    const session2 = requestAuthRegister(
      'Gooner GYG1',
      'devsoc1@gmail.com',
      '010203Ab!'
    );
    const logout = requestAuthLogout(session2);
    expect(logout.body).toStrictEqual(ERROR);
    expect(logout.status).toStrictEqual(401);
  });

  test('Logout twice', () => {
    requestAuthLogout(session);
    const logout = requestAuthLogout(session);
    expect(logout.body).toStrictEqual(ERROR);
    expect(logout.status).toStrictEqual(400);
  });
});
