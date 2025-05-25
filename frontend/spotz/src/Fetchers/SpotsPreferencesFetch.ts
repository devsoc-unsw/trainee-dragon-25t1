import axios from 'axios';
const URL = 'http://localhost:3000';
import { GeoData } from '../Components/RandomSpots/types';

export const preferenceUser = async (likes: GeoData[], dislikes: GeoData[]) => {
    try {
        const payload = {likes, dislikes}
        console.log (payload);
        const response = await axios.post(`${URL}/location/studyspot/preference`, payload, {
            withCredentials: true,
        });
        return response;
    }
    catch (error) {
        console.error(error)
    }
};