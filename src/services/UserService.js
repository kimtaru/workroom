import axios from 'axios';

//const API_URL = 'url';

export default class UserService {
  static async executeJoin(user) {
    const response = await axios.post(`/api/user/join`, user, {
      headers: {
        Authorization: `Bearer`,
      },
    });
    return response.data;
  }
}
