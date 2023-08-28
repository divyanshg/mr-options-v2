import axios from 'axios';

const instance = axios.create({
  baseURL: "http://mr-app.astrokleem.com:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
