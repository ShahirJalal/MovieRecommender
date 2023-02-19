import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/favourites/";

class FavouriteService {
  getAll() {
    return axios.get(API_URL + "getAll");
  }

  getFavouriteById(userId) {
    return axios.get(API_URL + `favourites/${userId}`);
  }

  addFavourite(favourite) {
    return axios.post(API_URL + "addFavourite", favourite);
  }

  deleteFavourite(favouriteId) {
    return axios.delete(API_URL + `deleteFavourite/${favouriteId}`);
  }
}

export default new FavouriteService();