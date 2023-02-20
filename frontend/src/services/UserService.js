import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/api/v1/users";

class UserService {

  // Get all users
  getAllUsers() {
    return axios.get(USER_BASE_REST_API_URL + "/getAll");
  }

  // Create a new user
  createUser(user) {
    return axios.post(USER_BASE_REST_API_URL + "/addUser", user); 
  }

  // Get user by userId
  getUserbyId(userId) {
    return axios.get(USER_BASE_REST_API_URL + "/getUserById/" + userId); 
  }

  // Update an existing user
  updateUser(userId, user) {
    return axios.put(USER_BASE_REST_API_URL + "/updateUser/" + userId, user); 
  }

  // Delete a user by userId
  deleteUser(userId) {
    return axios.delete(USER_BASE_REST_API_URL + "/deleteUser/" + userId); 
  }

  // User login verification
  loginUser(user) {
    return axios.post("http://localhost:8080/api/v1/login/", user); 
  }
}

export default new UserService();