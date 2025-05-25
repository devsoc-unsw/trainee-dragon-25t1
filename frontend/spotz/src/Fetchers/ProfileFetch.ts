import axios from "axios";
const URL = "http://localhost:3000";

export const profileFetch = async () => {
  try {
    const response = await axios.get(`${URL}/profile`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
