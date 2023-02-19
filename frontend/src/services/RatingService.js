import axios from "axios";

const FAVMOVIE_BASE_REST_API_URL = "http://localhost:8080/api/v1/ratings";

class UserFavService {
  addRating(ratings) {
    return axios.post(FAVMOVIE_BASE_REST_API_URL + "/addRating", ratings);
  }
}
export default new UserFavService();