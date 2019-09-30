import axios from 'axios'

// let BASE_URL = 'https://credit-h-system.herokuapp.com/';
let BASE_URL = 'http://localhost:3000/';

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
  FIND_GOVERNRATES: 'governorates', // get +/id
  UPDATE_GOVERNRATES: 'governorates',  // put +/id
  DELETE_GOVERNRATES: 'governorates', // delete +/id

  ALL_CITIES: 'cities', // get ?idgovernorates
  ADD_CITIES: 'cities', // post [name]
  FIND_CITIES: 'cities', // get +/id
  UPDATE_CITIES: 'cities',  // put +/id
  DELETE_CITIES: 'cities', // delete +/id

  ALL_SEC_DEPTS: 'secondaryDepts', // get
  ADD_SEC_DEPTS: 'secondaryDepts', // post [name,note]
  FIND_SEC_DEPTS: 'secondaryDepts', // get +/id
  UPDATE_SEC_DEPTS: 'secondaryDepts',  // put +/id
  DELETE_SEC_DEPTS: 'secondaryDepts', // delete +/id

  ALL_STUDENTS: 'students', // get
  ADD_STUDENTS: 'students', // post [name,note]
  FIND_STUDENTS: 'students', // get +/id
  UPDATE_STUDENTS: 'students',  // put +/id
  DELETE_STUDENTS: 'students', // delete +/id

  ALL_PROGRAMS: 'programs', // get
  ADD_PROGRAMS: 'programs', // post [name,note]
  FIND_PROGRAMS: 'programs', // get +/id
  UPDATE_PROGRAMS: 'programs',  // put +/id
  DELETE_PROGRAMS: 'programs', // delete +/id

  ADD_PROGRAM_GRADES: 'grades', // get [idprogram]
  FIND_PROGRAM_GRADES: 'grades', // get [idprogram]
  DELETE_PROGRAM_GRADE: 'grades', // delete +/id

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
        'Accept': 'application/json'
      }
    })
  },
}
