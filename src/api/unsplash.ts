import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID iGEDdqIrMOagEXLKKdciqlSQj7JKuy5UXnM2Ki4xu48`,
  },
});

export default unsplashApi;