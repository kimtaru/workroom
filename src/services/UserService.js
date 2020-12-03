import axios from 'axios';

export default class UserService {
  static async executeJoin(user) {
    const response = await axios.post(`/api/user/join`, user, {
      headers: {
        Authorization: `Bearer`,
      },
    });
    return response.data;
  }

  static async doubleCheck(email) {
    const response = await axios.get(`/api/user/join/${email}`, {
      headers: {
        Authorization: `Bearer`,
      },
    });
    return response.data;
  }
}
