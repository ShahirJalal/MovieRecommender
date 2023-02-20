import axios from "axios";

// Base URL
const API_URL = "http://localhost:8080/api/v1/favourites/";

class FavouriteService {

  // Get all favourites
  getAll() {
    return axios.get(API_URL + "getAll"); 
  }

  // Get favourites by userId
  getFavouriteById(userId) {
    return axios.get(API_URL + `favourites/${userId}`); 
  }

  // Add a new favourite
  addFavourite(favourite) {
    return axios.post(API_URL + "addFavourite", favourite); 
  }

  // Delete a favourite by favouriteId
  deleteFavourite(favouriteId) {
    return axios.delete(API_URL + `deleteFavourite/${favouriteId}`); 
  }
}

export default new FavouriteService();