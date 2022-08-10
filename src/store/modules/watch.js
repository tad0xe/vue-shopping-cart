import axios from 'axios';

const state = {
    watch: [],
    watchLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: "",
      token: localStorage.getItem("token") || "",
};

const getters = {
  isLoggedIn: state => !!state.token,
    getWatchLength(state) {
        return state.watchLength;
      },
      getWatch(state) {
        return state.watch;
      },
      getWatchTotalPrice(state) {
        let total = 0;
        state.watch.map(product => {
          total += product.price * product.quantity;
        });
  
        return total;
      },
      getWatchTotalPriceWithShipping(state) {
        let total = 0;
        state.watch.map(product => {
          total += product.price * product.quantity;
        });
  
        return total + state.shippingPrice;
      },
      getEstimatedDelivery(state) {
        return state.shippingEstimatedDelivery;
      },
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status
};

const actions = {
    addProductToWatch({ state, commit }, product) {
        const watchProduct = state.watch.find(prod => prod._id === product._id);
  
        if (!watchProduct) {
          commit("pushProductToWatch", product);
        } else {
          commit("incrementProductQty", watchProduct);
        }
  
        commit("incrementWatchLength");
      },
};

const mutations = {
    pushProductToWatch(state, product) {
        product.quantity = 1;
        state.watch.push(product);
      },
  
      incrementProductQty(state, product) {
        product.quantity++;
        let indexOfProduct = state.watch.indexOf(product);
        state.watch.splice(indexOfProduct, 1, product);
      },
  
      incrementWatchLength(state) {
        state.watchLength = 0;
        if (state.watch.length > 0) {
          state.watch.map(product => {
            state.watchLength += product.quantity;
          });
        }
      },
      /*
      1. Find the product in the watch
      2. Change the quantity of the product
      3. Update the length of the watch
      4. replace the old product with the updated product
      */
      changeQty(state, { product, qty }) {
        let watchProduct = state.watch.find(prod => prod._id === product._id);
        watchProduct.quantity = qty;
  
        state.watchLength = 0;
        if (state.watch.length > 0) {
          state.watch.map(product => {
            state.watchLength += product.quantity;
          });
        }
  
        let indexOfProduct = state.watch.indexOf(watchProduct);
        state.watch.splice(indexOfProduct, 1, watchProduct);
      },
      /*
      1. remove the product quantity from the cartLength
      2. get the index of the product that we want to delete
      3. remove that product by using splice
      */
      removeWatchProduct(state, product) {
        state.watchLength -= product.quantity;
        let indexOfProduct = state.watch.indexOf(product);
        state.watch.splice(indexOfProduct, 1);
      },
  
      setShipping(state, { price, estimatedDelivery }) {
        state.shippingPrice = price;
        state.shippingEstimatedDelivery = estimatedDelivery;
      },
  
      clearWatch(state) {
        state.watch = [];
        state.watchLength = 0;
        state.shippingPrice = 0;
        state.shippingEstimatedDelivery = "";
      },
      AUTH_REQUEST(state) {
        state.status = "loading";
      },
  
      AUTH_SUCCESS(state, token, email, user, name) {
        state.status = "success";
        state.token = token;
        state.user = user;
        state.user = email;
        state.user = name;
        state.user = token;
      },
  
      AUTH_ERROR(state) {
        state.status = "error";
      },
  
      AUTH_LOGOUT(state) {
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
