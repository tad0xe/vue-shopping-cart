<template>
  <div>
    <div class="card-wrapper">

      <div class="row">

        <div
          class="col-lg-4 col-md-6 mb-4"
          v-for="product in  currentProducts"
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
                  <button
                    class="btn btn-outline-primary btn-block"
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Product",
  components: {},
  data() {
    return {
      category: {},
      categories: [],
      products: [],
      catID: []
    };
  },
  watch: {
    "$route.params.id": {
      handler(newVal) {
        this.loadCategories(newVal);
      }
    }
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  mounted() {
    this.loadCategories(this.$route.params.id);

    axios
      .get(`https://xanddddddd.herokuapp.com/api/products`, {})
      .then(response => {
        console.log(response);

        this.products = response.data.products;
        const catID = this.category._id;
        // this.products = this.products.filter(
        //  ({ category }) => catID === category._id
        // );
      })
      .catch(error => {
        error;
      });
  },

  computed: {
    currentProducts() {
      if (!this.category._id) {
        return this.products;
      }
      return this.products.filter(
        ({ category }) => category._id === this.category._id
      );
    }
  },
  methods: {
    loadCategories(id) {
      axios
        .get(`https://xanddddddd.herokuapp.com/api/categories/${id}`, {})
        .then(response => {
          console.log(response);
          this.category = response.data.category;
        })
        .catch(error => {
          console.log(error);
          error;
        });
    },
    ...mapActions(["addProductToCart"]),
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.br {
  border-radius: 7px;
}
</style>
  