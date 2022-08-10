<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button @click="submit"> ${{ getCartTotalPriceWithShipping }}</button>
    {{message}}
  </div>
</template>

<script>
import axios from "axios";
import { StripeElementCard } from "@vue-stripe/vue-stripe";

import { mapGetters } from "vuex";
export default {
  components: {
    StripeElementCard
  },
  data() {
    return {
      publishableKey:
        "pk_test_51KGqWkHCcyZvTrDrTmAbtZkngRWbP0FCvV3bgZnz8GXuleqD1fo1lRa5seDD3qKsk0irYLumaH3SeI5cILED3pwq00NR023dNZ",
      charge: null,
      message: null
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  computed: {
    ...mapGetters([
      "getCart",
      "getCartTotalPriceWithShipping",
      "getEstimatedDelivery"
    ])
  },
  methods: {
    submit() {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    tokenCreated(token) {
      console.log(token);
      this.token = token;
      this.charge = {
        source: token.id,
        amount: 4000
      };
      this.sendTokenToServer(this.charge);
    },

    sendTokenToServer(charge, response) {
      var request = {
        totalPrice: this.getCartTotalPriceWithShipping,
        cart: this.getCart,
        estimatedDelivery: this.getEstimatedDelivery
      };
      const token = localStorage.getItem("token");
      //console.log(token);
      axios
        .post(`https://xanddddddd.herokuapp.com/api/pay`, request, {
          headers: {
            Authorization: "Bearer" + token,
            "x-access-token": token
          }
        })
        .then(res => {
          console.log(res);
          this.message = res.data.message;
          this.$store.commit("clearCart");
        });
    }
  }
};
</script>