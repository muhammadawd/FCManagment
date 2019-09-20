import Vue from 'vue'
import Vuex from 'vuex'

import userModule from '@/store/modules/userModule'

Vue.use(Vuex);


export const store = new Vuex.Store({
  modules: {
    userModule: userModule,
  }
});
