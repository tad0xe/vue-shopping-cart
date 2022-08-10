import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./modules/cart";
import watch from "./modules/watch";
import auth from "./modules/auth";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    watch,
    auth,

  }
})
