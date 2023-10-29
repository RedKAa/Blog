import request from '../utils/requestServer';
import axios from "axios";

const URL = import.meta.env.VITE_URL;

// export const getComments = async (postId, page) => {
//   try {
//     const res = await axios({
//       url: `${URL}/comments/${postId}`,
//       method: "GET",
//       params: {
//         page,
//       },
//     });
//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const getComments = (postId, page) => {
  return request.get('/comments', {
    params: {
      postId,
      page
    },
    useCache: true,
  });
};

export const createComment = (data) => {
  return request.post(`/comments`, {
    data: {
      ...data
    },
  });
}


// export const createComment = async (data) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user"));
//   try {
//     const res = await axios({
//       url: `${URL}/comments`,
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       data,
//     });

//     return res;
//   } catch (e) {
//     return e;
//   }
// };

export const nbrCommentsOfUser = async (id) => {
  try {
    const res = await axios.get(`${URL}/comments/nbrCommentsOfUser/` + id);
    return res;
  } catch (e) {
    return e;
  }
};
