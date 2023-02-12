import axios from 'axios';

const addFavourite = (favourite) => {
  return axios.post('http://localhost:8080/addFavourite', favourite);
};

export default {
  addFavourite
};