import axios from "axios";


class UserService {
    getAllUsers() {
        return axios.get("http://localhost:8080/api/v1/users");
    }

    createUser(user){
        return axios.post("http://localhost:8080/api/v1/user/save", user);
    }

    getUserById(userId){
        return axios.get("http://localhost:8080/api/v1/"+ userId);
    }

    login(user){
        return axios.post("http://localhost:8080/api/v1/login", user);
    }
}

export default new UserService();