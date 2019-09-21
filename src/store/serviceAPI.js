import axios from 'axios'

let BASE_URL = 'https://credit-h-system.herokuapp.com/';

export default {
  REGISTER_NEW_ACCOUNT: 'users',
  AUTH_ACCOUNT: 'auth',

  ALL_STUFF_MEMBERS: 'stuffMembers', // get
  ADD_STUFF_MEMBER: 'stuffMembers', // post , [name , nationalNum , type => 0]

  API: () => {
    let token = null;
    try {
      let auth_data = window.ls.getFromStorage('auth_data');
      auth_data = JSON.parse(auth_data);
      token = auth_data.accessToken;
    } catch (e) {
      token = null
    }

    return axios.create({
      baseURL: BASE_URL,
      withCredentials: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        'Authorization': token ? `Bearer ${token}` : '',
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      }
    })
  },
}
