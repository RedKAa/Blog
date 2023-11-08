import axios from "axios";
import request from '../utils/requestServer';
import { getAppToken, getUserInfo } from "../utils/utils";

const URL = import.meta.env.VITE_URL;
const authUser = getUserInfo();


export async function getCurrentUser(options) {
  return request('/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

export const getUserByUsername = (name) => {
  return request.get('/users', {
    params: {
      'UserName': name
    },
    useCache: true,
  });
};

export const getUserById = (id) => {
  return request.get(`/users/${id}`);
};


export const getUsers = (p, filters) => {
  return request.get('/users', {
    params: {
      page: p,
      ...filters
    },
    useCache: true,
  });
};

export async function getUser(id) {
  try {
    const res = await axios.get(`${URL}/users/${id}`);
    return res;
  } catch (e) {
    return e;
  }
}

export async function removeUser(id) {
  try {
    const response = await axios.delete(`${URL}/users/'${id}`);
    return response;
  } catch (e) {
    return e;
  }
}

export const updateUser = (updateUser) => {
  console.log('updateUserById', updateUser);
  return request.put(`/users/${authUser.id}`, {
    data: {
      ...updateUser
    },
  });
}

// export async function updateUser(updateUser) {
//   const jwtToken = getAppToken();
//   try {
//     const response = await axios({
//       url: `${URL}/users/${authUser.id}`,
//       method: "put",
//       data: { ...updateUser },
//       headers: { Authorization: `Bearer ${jwtToken}` },
//     });
//     return response;
//   } catch (e) {
//     return e;
//   }
// }

export async function updateMode(mode) {
  const jwtToken = getAppToken();
  try {
    const response = await axios({
      url: `${URL}/users/${authUser.id}`,
      method: "put",
      data: { mode },
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response;
  } catch (e) {
    return e;
  }
}

export async function register(data) {
  const response = await axios.post(`${URL}/register`, data);
  return response;
}

export async function setNewPassword(data) {
  const { token } = JSON.parse(localStorage.getItem("current_user"));
  try {
    const response = await axios.patch(`${URL}/users/update-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (e) {
    return e;
  }
}
