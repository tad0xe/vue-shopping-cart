<template>
  <div>
    
    <div>
      <div
        class
        v-for="product in getWatch"
        :key="product._id"
        style="padding-top:8%;"
      >

        <div>
          <table class="table is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th class="is-narrow">

                </th>

                <th></th>
                <th>product</th>
                <th>Price</th>
                
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>

                </td>
                <td>

                  <img
                    :src="product.photo"
                    width="120"
                  >

                </td>
                <td>{{product.title}}</td>

                <td><code>${{product.price}}</code></td>
               
                
                <td>
                  <div class="">

                    <span
                      class=""
                      @click="$store.commit('removeWatchProduct', product)"
                    >x</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
    
  computed: {
    ...mapGetters(
      ["getWatch", "getCartTotalPrice", "getWatchLength"],
      ["isLoggedIn"]
    )
  },
  methods: {
    onChangeQuantity(event, product) {
      let qty = parseInt(event.target.value);
      this.$store.commit("changeQty", { product, qty });
    }
  }
};
</script>