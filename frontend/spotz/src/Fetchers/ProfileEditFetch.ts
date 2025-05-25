import axios from 'axios';
const URL = 'http://localhost:3000';

export const profileEdit = async (
  newBookmarks: Array<any>,
  removedBookmarks: Array<any>,
  likes: Array<any>,
  dislikes: Array<any>,
  name?: String,
  email?: String,
  password?: String
) => {
  try {
    // const payload = {
    //   newBookmarks: newBookmarks,
    //   removedBookmarks: removedBookmarks,
    //   likes: likes,
    //   dislikes: dislikes,
    //   name: name,
    //   email: email,
    //   password: password
    // };
    const payload = {
      newBookmarks,
      removedBookmarks,
      likes,
      dislikes,
      name,
      email,
      password,
    };
    console.log(payload);
    const response = await axios.put(`${URL}/profile/edit`, payload, {
      withCredentials: true,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
