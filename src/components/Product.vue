<template>
  <div>
    <div class="container">

      <div class="detail-container rounded my-5 row">
        &nbsp &nbsp SKU: N/A category: {{product.category.type}}
        <span></span>
        <div class="col-md-12 ">

          <div class="row">

            <div class="rounded-left col-md-6 product bg-white">

              <img
                class="mt-5"
                :src="product.photo"
                width=100%
                alt=""
              >

            </div>
            <div class="rounded-right col-md-6 detail bg-dange pb-5">

              <h5 class="px-1 desc  text-white text-center">Lorem ipsum lorem ipsum dolores queira
                <div class="text-muted">${{product.price}}</div>
              </h5>
              <div class="py-5 px-4">
                {{ product.description }}
              </div>
              <div class="text-center price">

              </div>
              <div class="text-center mt-4">

                <button
                  class="btn bg-warning ml-5"
                  @click="addProductToCart(product)"
                >Add to cart</button>
              </div>
              <i
                class="fa fa-share-square-o"
                aria-hidden="true"
              ></i>
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
      product: []
    };
  },

  mounted() {
    console.log("the id is :" + this.$route.params.id);
    axios
      .get(`https://xanddddddd.herokuapp.com/api/products/${this.$route.params.id}`, {})
      .then(response => {
        console.log(response);
        this.product = response.data.product;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    ...mapActions(["addProductToWatch"]),
    ...mapActions(["addProductToCart"]),
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);
      this.$store.commit("changeQty", { product, qty });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>