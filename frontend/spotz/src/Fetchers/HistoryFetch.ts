import axios from 'axios';
const URL = 'http://localhost:3000';

const getSessionFromCookie = () => {
  const sessionCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('sessionId='));
  return sessionCookie ? sessionCookie.split('=')[1] : null;
};

export const fetchStudySpotHistory = async () => {
  try {
    const session = getSessionFromCookie();
    if (!session) throw new Error('Not logged in');

    const response = await axios.get(`${URL}/location/studyspot/history`, {
      headers: {
        'session': session,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveStudySpotToHistory = async (latitude: number, longitude: number, zLevel: number) => {
  try {
    const session = getSessionFromCookie();
    if (!session) {
      console.log('User not logged in for history');
      return;
    }

    const payload = { latitude, longitude, zLevel };
    console.log(payload);
    const response = await axios.post(`${URL}/location/studyspot/visited`, payload, {
      headers: {
        'session': session,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};