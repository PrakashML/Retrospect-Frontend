import axios from 'axios';

class RetrospectService {
  loginUser(userData) {
    return axios.post("http://localhost:8080/login", userData);
  }

  getUserByToken(token) {
    return axios.get("http://localhost:8080/getbyJWT", {
      headers: {
        'token': token
      }
    });
  }

  register(userData) {
    return axios.post("http://localhost:8080/signup", userData)
  }

  getAllRooms(){
    return axios.get("http://localhost:8080/rooms")
  }

  createRoom(roomDetails) {
    return axios.post("http://localhost:8080/addrooms", roomDetails);
  }

}

const retro = new RetrospectService();
export default retro;