import axios from 'axios'

let BASE_URL = 'https://credit-h-system.herokuapp.com/';

export default {
  REGISTER_NEW_ACCOUNT: 'users',
  AUTH_ACCOUNT: 'auth',

  ALL_STUFF_MEMBERS: 'stuffMembers', // get
  ADD_STUFF_MEMBER: 'stuffMembers', // post , [name , nationalNum , type => 0]
  FIND_STUFF_MEMBER: 'stuffMembers', // get +/id
  UPDATE_STUFF_MEMBER: 'stuffMembers', // put +/id
  DELETE_STUFF_MEMBER: 'stuffMembers', // delete +/id

  ALL_COUNTRIES: 'countries', // get
  ADD_COUNTRIES: 'countries', // post [name]
  FIND_COUNTRIES: 'countries', // get +/id
  UPDATE_COUNTRIES: 'countries', // put +/id
  DELETE_COUNTRIES: 'countries', // delete +/id

  ALL_GOVERNRATES: 'governorates', // get ?idcountries
  ADD_GOVERNRATES: 'governorates', // post [name]
  DELETE_GOVERNRATES: 'governorates', // delete +/id

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
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        // 'Content-Type': "application/json",
        // 'Content-Type': 'application/json'
      }
    })
  },
}
