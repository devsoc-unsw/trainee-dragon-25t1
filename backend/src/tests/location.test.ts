import { Spot } from '../constants/types';
import { requestAuthRegister, requestClear, requestShareSpot } from './wrapper';

const SPOT: Spot = {
  latitude: expect.any(Number),
  longitude: expect.any(Number),
  seats: expect.any(Number),
  noiseLevel: expect.any(Number),
  comfortability: expect.any(Number),
  popularity: expect.any(Number),
};

const ERROR = { error: expect.any(String) };

let session: any;
beforeEach(() => {
  requestClear();
  session = requestAuthRegister('Gooner GYG', 'devsoc@gmail.com', '010203Ab!');
});

describe('Test share spot', () => {
  test('Successful sharing spot', () => {
    const spot = requestShareSpot(0, 0, 10, 2, 5, 2, session.body.sessionId);
    expect(spot.body).toStrictEqual(SPOT);
    expect(spot.status).toStrictEqual(200);
  });

  test('Invalid latitude', () => {
    const spot = requestShareSpot(91, 0, 10, 2, 5, 2, session.body.sessionId);
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestShareSpot(-91, 0, 10, 2, 5, 2, session.body.sessionId);
    expect(spot2.body).toStrictEqual(ERROR);
    expect(spot2.status).toStrictEqual(400);
  });

  test('Invalid longitude', () => {
    const spot = requestShareSpot(0, 181, 10, 2, 5, 2, session.body.sessionId);
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestShareSpot(
      0,
      -181,
      10,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot2.body).toStrictEqual(ERROR);
    expect(spot2.status).toStrictEqual(400);
  });

  test('Invalid seats', () => {
    const spot = requestShareSpot(0, 0, -1, 2, 5, 2, session.body.sessionId);
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);
  });

  test('Invalid ratings', () => {
    const spot = requestShareSpot(0, 0, 10, 0, 5, 2, session.body.sessionId);
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestShareSpot(0, 0, 10, 1, 6, 2, session.body.sessionId);
    expect(spot2.body).toStrictEqual(ERROR);
    expect(spot2.status).toStrictEqual(400);
  });
});
