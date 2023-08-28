import axios from 'axios';

const instance = axios.create({
  baseURL: "https://mr-app.astrokleem.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
