import axios from "axios";
import request from '../utils/requestServer';
import { getUserInfo } from "../utils/utils";
const authUser = getUserInfo();
const URL = import.meta.env.VITE_URL;

// export const checkReacted = async (post_id) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user")) || {
//     token: null,
//   };
//   if (token) {
//     try {
//       const res = await axios({
//         url: `${URL}/post-reactions/check`,
//         method: "GET",
//         params: { post_id },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return res;
//     } catch (error) {
//       return error;
//     }
//   }
// };

export const checkReacted = async (post_id) => {
  return request.get(`/post-reactions/${post_id}/check`);
};

// export const toggleReaction = async (data) => {
//   const { token } = JSON.parse(localStorage.getItem("current_user")) || {
//     token: null,
//   };

//   if (token) {
//     try {
//       const res = await axios({
//         url: `${URL}/post-reactions/`,
//         method: "POST",
//         data,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return res;
//     } catch (error) {
//       return error;
//     }
//   }
// };

export const toggleReaction = (postid) => {
  return request.post(`/post-reactions/react`, {
    data: {
      postId: postid,
      userId:authUser.id
    },
  });
}

// export const nbrReactionsByPost = async (postId) => {
//   try {
//     const res = await axios({
//       url: `${URL}/post-reactions/${postId}`,
//       method: "GET",
//     });

//     return res;
//   } catch (error) {
//     return error;
//   }
// };


export const nbrReactionsByPost = async (post_id) => {
  return request.get(`/post-reactions/${post_id}`);
};