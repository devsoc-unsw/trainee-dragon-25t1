import axios from 'axios';

const URL = 'http://localhost:3000';

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const payload = {name, email, password}
        console.log (payload);
        const response = await axios.post(`${URL}/auth/register`, payload);
        console.log(response.data);
        return response;
    }
    catch (error) {
        console.error(error)
    }
};