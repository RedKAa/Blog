import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const login = async (data) => {
  try {
    const res = await axios.post(`${URL}/auth/login`, data);
    return res;
  } catch (e) {
    return e;
  }
};

export const loginfirebase = async (data) => {
  return await axios.post(`${URL}/login/firebase`,data);
};

export const register = async (data) => {
  try {
    const res = await axios.post(`${URL}/auth/register`, data);
    return res;
  } catch (e) {
    return e;
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      url: `${URL}/auth/forgot-password/${email}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios({
      url: `${URL}/auth/reset-password`,
      method: "PATCH",
      data,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};
