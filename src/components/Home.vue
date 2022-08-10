<template>
  <div class="about">
    <div class="container pt-5">
      <div class="row align-items-center justify-content-between">

        <div class="filter float-end">
          <label><input
              type="radio"
              v-model="filterPrice"
              value="false"
            > All Price</label>

          <label><input
              type="radio"
              v-model="filterPrice"
              value="true"
            > Filter Price</label>
          <input
            type="input"
            v-model.number="minPrice"
            value="100"
            :disabled="filterPrice!=='true'"
          > -
          <input
            type="input"
            v-model.number="maxPrice"
            value="200"
            :disabled="filterPrice!=='true'"
          >

        </div>
      </div>
    </div>

    <div class="container">
      <hr />
    </div>

    <div class="container">
      <div class="col-lg-2 col-md-3 col-sm-4 col-7">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            v-model="searchValue"
            class="form-control"
            placeholder="search product"
            aria-label="Search"
          />
        </div>
      </div>
      <div class="text-center container py-5">

        <div class="row">

          <div
            class="col-lg-4 col-md-6 mb-4"
            v-for="product in filteredRecipes"
            :key="product._id"
          >
            <div class="card">
              <router-link :to="`/product/${product._id}`">
                <div
                  class="bg-image hover-zoom ripple"
                  data-mdb-ripple-color="light"
                >
                  <img
                    :src="product.photo"
                    class="w-100"
                  />

                </div>
              </router-link>
              <div class="card-body">
                <a
                  href=""
                  class="text-reset"
                >
                  <h5 class="card-title mb-3"> {{product.title}}</h5>
                </a>
                <a
                  href=""
                  class="text-reset"
                >
                  <p>Category</p>
                </a>
                <h6 class="mb-3">
                  <s>$61.99</s><strong class="ms-2 text-danger"> ${{ product.price }}</strong>
                </h6>
                <div class="d-flex justify-content-between">
                  <div class="col px-0">
                    <button class="btn btn-outline-primary btn-block"
                     @click="addProductToCart(product)"
                    >
                      Add To Cart
                      <i
                        class="fa fa-shopping-basket"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                  <div class="ml-2">
                    <a
                      href="#"
                      class="btn btn-outline-success"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to Wishlist"
                      @click="addProductToWatch(product)"
                    >
                      <i
                        class="fa fa-heart"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>

    <div class="container">
      <hr />
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

import axios from "axios";

export default {
  components: {},
  name: "Products",
  data() {
    return {
      products: [],

      name: "",
      email: "",
      ascending: true,
      minPrice: 0,
      maxPrice: 2000,
      sortBy: "alphabetically",
      searchValue: "",
      price: null,
      filterPrice: "",
      pric: null
    };
  },
  /*created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
*/
  computed: {
    ...mapGetters(["isLoggedIn"]),
    filteredRecipes() {
      let tempRecipes = this.products;

      // Process search input
      if (this.searchValue != "" && this.searchValue) {
        tempRecipes = tempRecipes.filter(item => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      // Filter out by single price
      /*
      if (this.price === "All") return tempRecipes;
      tempRecipes = tempRecipes.filter(item => {
        return item.price >= this.price;
      });
      if (this.price)
        tempRecipes = tempRecipes.filter(item => {
          return item.price <= this.price;
        });
        */
      if (this.filterPrice !== "true") return tempRecipes;
      tempRecipes = tempRecipes.filter(item => {
        return item.price >= this.minPrice && item.price <= this.maxPrice;
      });
      // Sort by alphabetical order
      tempRecipes = tempRecipes.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else if (this.sortBy == "title") {
          return a.title - b.title;
        }
      });

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        tempRecipes.reverse();
      }

      return tempRecipes;
    }
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios.get("https://xanddddddd.herokuapp.com/api/products").then(res => {
      console.log(res);

      this.products = res.data.products;
    });
  },

  methods: {
    ...mapActions(["addProductToCart","addProductToWatch"]),

    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    getProducts() {
      const priceRange = this.price.split("to");
      tempRecipes = tempRecipes.filter(({ price }) => {
        return priceRange[1]
          ? price > Number(priceRange[0]) && price < Number(priceRange[1])
          : price === Number(priceRange[0]);
      });
    }
  }
};
</script>



<style>
.card {
  border-radius: 10px;
}
.br {
  border-radius: 7px;
}
.search {
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
