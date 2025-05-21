import axios from 'axios';
export const getPlacesData = async (type: string) => {
  const UNSW_CENTER = { lng: 151.230996, lat: -33.917867 };
  const ne = { lng: UNSW_CENTER.lng + 0.53, lat: UNSW_CENTER.lat + 0.53 };
  const sw = { lng: UNSW_CENTER.lng - 0.43, lat: UNSW_CENTER.lat - 0.43 };

  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          // 'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
          'x-rapidapi-key':
            '1fa164eba3mshf33a868fd8e50d8p185a49jsn119904188b3d',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
