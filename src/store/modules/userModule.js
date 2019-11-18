import {helper} from "@/bootstrap/helper";
import serviceAPI from '@/store/serviceAPI'
import ls from '@/store/localStorageService'

const userModule = {
  state: {
    request_data: null,
    response_data: null,
    auth: null,
  },
  getters: {},
  mutations: {
    setRequestData(state, request_data) {
      state.request_data = helper.prepareObjectToSend(request_data);
    },
    setResponseData(state, response_data) {
      state.response_data = response_data;
    },
    setAuthUser(state, authUser) {
      state.auth = authUser
    },
    // clearAuth(state) {
    //   state.auth = null;
    // },
  },
  actions: {
    // actions
    registerAuthUser({commit, dispatch}, addUserData) {
      commit('setRequestData', addUserData);
      dispatch('registerAuthUserService')
    },

    // services
    async registerAuthUserService({state, commit, dispatch}) {
      let request_data = state.request_data;
      return serviceAPI.API().post(serviceAPI.REGISTER_NEW_ACCOUNT, request_data);
      // .then((response) => {
      //   commit('setResponseData', response.data)
      // });
    },
  }
};

export default userModule;
