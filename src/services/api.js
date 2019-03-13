import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

API.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('@token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  config.headers['Access-Control-Allow-Credentials'] = 'true';
  config.headers['Access-Control-Allow-Headers'] = 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,multipart/form-data';
  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS';
  config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
}, err => Promise.reject(err));


export default API;