import axios from 'axios'

const USER_BASE_REST_API_URL='http://localhost:8080/api/v1/users';

class UserService{
    
    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URL + '/getAll') //get method 
    }
    createUser(user){
        return axios.post(USER_BASE_REST_API_URL + '/addUser', user) //post method
    }
    getUserbyId(userId){
        return axios.get(USER_BASE_REST_API_URL + '/getUserById/' + userId) //get method
    }
    updateUser(userId, user){
        return axios.put(USER_BASE_REST_API_URL + '/updateUser/' + userId, user) //put method
    }
    deleteUser(userId){
        return axios.delete(USER_BASE_REST_API_URL+ '/deleteUser/' + userId) //delete method
    }
    loginUser(user){
        return axios.post('http://localhost:8080/api/v1/login/', user) //delete method
    }
}

export default new UserService();