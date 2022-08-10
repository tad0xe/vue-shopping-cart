import axios from "axios";

const state = {
    
  status: "",
  token: localStorage.getItem("token") || "",
  user: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  //authStatus: state => state.token,
  authStatus: state => state.user,
  user(state){
      return state.user
  }
};

const actions = {
  Product({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "http://localhost:5000/api/auth/login",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);

          // Add the following line:
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({
        url: "http://localhost:5000/api/auth/register",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          // Add the following line:
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, data) {
    state.status = "success";
    state.token = token;
    state.user = data;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
