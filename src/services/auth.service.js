import axios from 'axios';

const API_URL = ' http://localhost:3000/';

class AuthService {
  login(user) {    
    return axios
      .get(API_URL + `users?email=${user.username}&password=${user.password}`
      ).then(response => {
        if (response.data) {          
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  
  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'users', {
      fristname: user.username,
      email: user.email,
      password: user.password
    });
  }

}

export default new AuthService();
