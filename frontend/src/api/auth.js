import axios from 'axios';

export const login = (username, password) => {
  return axios.post('/api/token/', { username, password });
};

export const register = (username, password) => {
  return axios.post('/api/users/register/', { username, password });
};
