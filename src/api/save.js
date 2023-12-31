import axios from "axios";
import { getAppToken } from "../utils/utils";

const URL = import.meta.env.VITE_URL;

export const getAllSavePosts = async (tag_id = 0, q) => {
  const jwtToken = getAppToken();
  if (jwtToken) {
    let params = {};
    if (tag_id !== 0) {
      params = { ...params, tag_id };
    }

    if (q) {
      params = { ...params, q };
    }
    try {
      const res = await axios({
        url: `${URL}/saves`,
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};

export const getAllTagsOfSaves = async () => {
  const jwtToken = getAppToken();
  if (jwtToken) {
    try {
      const res = await axios({
        url: `${URL}/saves/find-all-tags`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};

export const checkSaved = async (post_id) => {
  // console.log('checkSaved', post_id);

  const jwtToken = getAppToken();
  if (jwtToken) {
    try {
      const res = await axios({
        url: `${URL}/saves/${post_id}/check`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      return res;
    } catch (error) {
      return error;
    }
  }
};

export const nbrSavesByPost = async (post_id) => {
  // console.log('nbrSavesByPoste', post_id);

  const jwtToken = getAppToken();
  if (jwtToken) {
    try {
      const res = await axios({
        url: `${URL}/saves/${post_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      return res;
    } catch (error) {
      return error;
    }
  }
};

export const toggleSave = async (post_id) => {
  // console.log('toggle save', post_id);
  const jwtToken = getAppToken();
  if (jwtToken) {
    try {
      const res = await axios({
        url: `${URL}/saves/${post_id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};

export const removeSave = async (id) => {
  const jwtToken = getAppToken();
  if (jwtToken) {
    try {
      const res = await axios({
        url: `${URL}/saves/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }
};
