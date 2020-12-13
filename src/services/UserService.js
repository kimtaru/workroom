import axios from 'axios';

const API_URL = 'http://localhost:8080';
const LOCALSTORAGE_KEY = 'token';

export default class UserService {
  static getToken() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static saveToken(token) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }

  static async executeJoin(user) {
    const response = await axios.post(`${API_URL}/api/user/join`, user);
    return response.data;
  }

  static async doubleCheck(email) {
    const response = await axios.get(`${API_URL}/api/user/join/${email}`);
    return response.data;
  }

  static async executeLogin(username, password) {
    const response = await axios.post(`${API_URL}/authenticate`, {
      username,
      password,
    });
    return response.data.token;
  }

  static async resetPwd(username, pwd) {
    const user = {
      userAccount: username,
      password: pwd,
    };
    const response = await axios.put(`${API_URL}/api/user/resetPwd`, user);
    return response.data;
  }

  static async sendEmailToFindPwd(email, key) {
    const URL = 'https://api.emailjs.com/api/v1.0/email/send';

    var data = {
      service_id: 'service_31zdv8f',
      template_id: 'template_mz8cbm4',
      user_id: 'user_kIdduQYtVFKSjOGoHrSig',
      template_params: {
        email_address: email,
        auth_key: key,
      },
    };

    const response = await axios.post(URL, data);
    return response.data;
  }
}
