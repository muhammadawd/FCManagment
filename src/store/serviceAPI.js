import axios from 'axios'

let BASE_URL = 'https://credit-h-system.herokuapp.com/';

export default {
  REGISTER_NEW_ACCOUNT: 'users',
  AUTH_ACCOUNT: 'auth',

  API: () => {
    return axios.create({
      baseURL: BASE_URL,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      }
    })
  },
}
