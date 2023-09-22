import axios from 'axios';

const instance = axios.create({
  baseURL: "https://mr-app.astrokleem.in/api", //"http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
