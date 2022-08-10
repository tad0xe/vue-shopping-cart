<template>
  <div>
    <section class="h-100 gradient-custom">
      <div class="container py-5">
        <div class="row d-flex justify-content-center my-4">
          <div class="col-md-8">
            <div class="card mb-4">
              <div class="card-header py-3">

              </div>
              <div class="card-body">

                <!-- Single item -->

                <hr class="my-4" />

                <!-- Single item -->
                <div
                  class="row"
                  v-for="product in getCart"
                  :key="product._id"
                >
                  <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <!-- Image -->
                    <div
                      class="bg-image hover-overlay hover-zoom ripple rounded"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        :src="product.photo"
                        class="w-100"
                      />
                      <a href="#!">
                        <div
                          class="mask"
                          style="background-color: rgba(251, 251, 251, 0.2)"
                        ></div>
                      </a>
                    </div>
                    <!-- Image -->
                  </div>

                  <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <!-- Data -->
                    <p><strong>{{product.title}}</strong></p>
                    <p>${{product.price}}</p>
                    <p>Size: M</p>

                    <a
                      href="#"
                      @click="$store.commit('removeProduct', product)"
                    >
                      <i class="fas fa-trash"></i>
                    </a>
                    <a
                      href="#"
                      @click="$store.commit('removeProduct', product)"
                    > <i class="fas fa-heart"></i></a>

                    <!-- Data -->
                  </div>

                  <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <!-- Quantity -->
                    <select
                      class="btn bg-info mr-2"
                      @change="onChangeQuantity($event, product)"
                    >
                      <option
                        v-for="i in 10"
                        :key="i"
                        :value="i"
                      >Qty: &nbsp;{{i}}</option>
                    </select>
                    <!-- Quantity -->

                    <!-- Price -->
                    <p class="text-start text-md-center">

                    </p>
                    <!-- Price -->
                  </div>
                </div>
                <!-- Single item -->
              </div>
            </div>
            <div class="card mb-4">
              <div class="card-body">
                <p><strong>{{estimatedDelivery}}</strong></p>
               
                <div class="a-spacing-mini wednesday">
                  <!-- Shipping normal -->
                  <input
                    type="radio"
                    name="order0"
                    checked="checked"
                    @change="onChooseShipping('normal')"
                  />
                  <span class="a-radio-label">
                    <span class="a-color-success">
                      <strong>Averages 7 business days</strong>
                    </span>
                    <br />
                    <span class="a-color-secondary">$13.98&nbsp;-&nbsp;Standard International Shipping - No Tracking</span>
                  </span>
                </div>
                <br />
                <div class="a-spacing-mini tuesday">
                  <!-- Shipping fast -->
                  <input
                    type="radio"
                    name="order0"
                    @change="onChooseShipping('fast')"
                  />
                  <span class="a-radio-label">
                    <span class="a-color-success">
                      <strong>Averages 3 business days</strong>
                    </span>
                    <br />
                    <span class="a-color-secondary">$49.98&nbsp;-&nbsp;Shipping</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="card mb-4 mb-lg-0">

            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-header py-3">
                <h5 class="mb-0">Summary</h5>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total
                    <span>${{ getCartTotalPrice }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>{{ shippingPrice }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p class="mb-0">(including shipping)</p>
                      </strong>
                    </div>
                    <span><strong>${{getCartTotalPriceWithShipping}}</strong></span>
                  </li>
                </ul>
                <router-link to="/payment">
                  Go to checkout
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
  
    shippingPrice:"",
   estimatedDelivery:""
  }),
  async mounted() {
    try {
      let response = await axios.post("http://localhost:5000/api/shipment", {
        shipment: "normal"
      });
      store.commit("setShipping", {
        price: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      });
      return {
        shippingPrice: response.shipment.price,
        estimatedDelivery: response.shipment.estimated
      };
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters(
      [
        "getCart",
        "getCartTotalPrice",
        "getCartTotalPriceWithShipping",
        "getCartLength"
      ],
      ["isLoggedIn"]
    )
  },
  methods: {
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);
      this.$store.commit("changeQty", { product, qty });
    },

    async onChooseShipping(shipment) {
      try {
        let response = await axios.post("http://localhost:5000/api/shipment", {
          shipment: shipment
        });
        this.$store.commit("setShipping", {
          price: response.shipment.price,
          estimatedDelivery: response.shipment.estimated
        });
        this.shippingPrice = response.shipment.price;
        this.estimatedDelivery = response.shipment.estimated;
      } catch (err) {}
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>