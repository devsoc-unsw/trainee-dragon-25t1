import axios from 'axios';
const URL = 'http://localhost:3000';

export const getLikedSpots = async () => {
  try {
    const res = await axios.get(`${URL}/profile/likes`, {
      withCredentials: true,
    });

    const liked = res.data.likes;

    return {
      type: 'FeatureCollection',
      features: liked.map((spot: any, index: number) => ({
        type: 'Feature',
        properties: {
          zValue: spot.zLevel,
        },
        geometry: {
          type: 'Point',
          coordinates: [spot.lngLat.lng, spot.lngLat.lat],
        },
      })),
    };
  } catch (err) {
    console.error('Failed to load liked spots', err);
    return { type: 'FeatureCollection', features: [] };
  }
};
