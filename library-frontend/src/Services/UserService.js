import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/api/v1/"

class UserService {
    getAllUsers() {
        return axios.get(USER_BASE_REST_API_URL +"users");
    }

    createUser(user){
        return axios.post(USER_BASE_REST_API_URL+"user/save", user);
    }

    getUserById(userId){
        return axios.get(USER_BASE_REST_API_URL +"/"+ userId);
    }

}

export default new UserService();