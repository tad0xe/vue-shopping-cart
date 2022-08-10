<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link :to="`/`">
        home page
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mr-auto">
          <div
            class="pt-4 p-3"
            v-for="category in categories"
            :key="category._id"
          >
            <router-link :to="`/category/${category._id}`">
              {{ category.type }}
            </router-link>
          </div>

        </ul>
 hello {{ name }}  &nbsp &nbsp &nbsp
        <router-link :to="`/cart`">
          {{ getCartLength }}<i
            class="fa fa-shopping-cart fa-2x"
            aria-hidden="true"
          ></i>
        </router-link>
        &nbsp
        <router-link :to="`/watch`">
          {{ getWatchLength }}<i
            class="fa fa-heart fa-2x"
            aria-hidden="true"
          ></i></router-link> &nbsp &nbsp &nbsp
        <a class="navbar-item">
          <div @click="logout">
            <span class="icon is-small">
              <i class="fa fa-sign-out"></i>
            </span>
            Sign Out
          </div>
        </a>
      </div>
    </nav>

  </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  name: "app",
  components: {},
  data() {
    return {
      categoryID: null,
      name: "",
      email: "",
      categories: [],
      products: [],
      show: null
    };
  },
  created() {
    //user is not authorized
  },
  mounted() {
    const token = localStorage.getItem("token");

    axios.get("https://xanddddddd.herokuapp.com/api/categories").then(res => {
      console.log(res);
      this.categories = res.data.categories;
    });
    axios
      .get("https://xanddddddd.herokuapp.com/api/auth/user", {
        headers: {
          Authorization: "Bearer" + token,
          "x-access-token": token
        }
      })
      .then(res => {
        console.log(res);
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    ...mapGetters(["getCartLength", "getWatchLength", "isLoggedIn"])
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

