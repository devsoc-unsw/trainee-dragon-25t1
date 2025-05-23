import { Spot } from '../constants/types';
import {
  requestAddStudySpotPreferenceSpot,
  requestAuthRegister,
  requestClear,
  requestRecommendSpot,
} from './wrapper';

const SPOT: Spot = {
  latitude: expect.any(Number),
  longitude: expect.any(Number),
  zLevel: expect.any(Number),
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
    const spot = requestRecommendSpot(
      0,
      0,
      1,
      10,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot.body).toStrictEqual(SPOT);
    expect(spot.status).toStrictEqual(200);
  });

  test('Invalid latitude', () => {
    const spot = requestRecommendSpot(
      91,
      0,
      1,
      10,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestRecommendSpot(
      -91,
      0,
      1,
      10,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot2.body).toStrictEqual(ERROR);
    expect(spot2.status).toStrictEqual(400);
  });

  test('Invalid longitude', () => {
    const spot = requestRecommendSpot(
      0,
      181,
      1,
      10,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestRecommendSpot(
      0,
      -181,
      1,
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
    const spot = requestRecommendSpot(
      0,
      0,
      1,
      -1,
      2,
      5,
      2,
      session.body.sessionId
    );
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);
  });

  test('Invalid ratings', () => {
    const spot = requestRecommendSpot(
      0,
      0,
      1,
      10,
      0,
      5,
      2,
      session.body.sessionId
    );
    expect(spot.body).toStrictEqual(ERROR);
    expect(spot.status).toStrictEqual(400);

    const spot2 = requestRecommendSpot(
      0,
      0,
      1,
      10,
      1,
      6,
      2,
      session.body.sessionId
    );
    expect(spot2.body).toStrictEqual(ERROR);
    expect(spot2.status).toStrictEqual(400);
  });
});

describe('Test adding study spot preferences', () => {
  test('Successful adding study spo preferences without data', () => {
    const spot = requestAddStudySpotPreferenceSpot(
      session.body.sessionId,
      [],
      []
    );
    expect(spot.body).toStrictEqual({});
    expect(spot.status).toStrictEqual(200);
  });

  test('Successful adding study spo preferences with data', () => {
    const spot = requestAddStudySpotPreferenceSpot(
      session.body.sessionId,
      [{ lngLat: { lng: 1, lat: 1 }, zLevel: 1 }],
      [{ lngLat: { lng: 2, lat: 2 }, zLevel: 1 }]
    );
    expect(spot.body).toStrictEqual({});
    expect(spot.status).toStrictEqual(200);
  });
});
