import axios from 'axios';
const URL = 'http://localhost:3000';

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${URL}/auth/logout`, {}, {
            withCredentials: true,
        });
        console.log(response.data);
        return response;
    }
    catch (error) {
        console.error(error)
    }
};