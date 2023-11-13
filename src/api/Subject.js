import axios from "axios";
import request from '../utils/requestServer';

const URL = import.meta.env.VITE_URL;

export const getSubjects = (filters) => {
  return request.get('/subjects', {
    params: {
      ...filters
    },
    useCache: true,
  });
};

export const getSubject = (id) => {
  return request.get(`/subjects/${id}`);
}