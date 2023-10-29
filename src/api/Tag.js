import axios from "axios";
import request from '../utils/requestServer';

const URL = import.meta.env.VITE_URL;

// export async function getTags(filters) {
//   try {
//     const res = await axios({
//       url: `${URL}/tags`,
//       method: "GET",
//       params: { ...filters },
//     });
//     return res.data;
//   } catch (e) {
//     return e;
//   }
// }

// export async function getTag(id) {
//   try {
//     const res = await axios.get(`${URL}/tags/${id}`);
//     return res;
//   } catch (e) {
//     return e;
//   }
// }


export const getTags = (filters) => {
  return request.get('/tags', {
    params: {
      ...filters,
      'status': 'Active'
    },
    useCache: true,
  });
};

export const getTag = (id) => {
  return request.get(`/tags/${id}`);
}