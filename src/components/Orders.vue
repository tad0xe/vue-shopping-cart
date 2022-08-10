<template>
  <div>
    <section style="background-color: #eee;">
      <div class="container py-5">
        <div class="row justify-content-center mb-3"  v-for="order in orders"
                  :key="order._id">
          <div class="col-md-12 col-xl-10"   v-for="product in order.products"
                    :key="product._id">
            <div class="card shadow-0 border rounded-3">
              <div class="card-body">
                <div
                  class="row"
                 
                >
                  <div
                    class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0"
                  
                  >
                    <div >
                      <img
                        :src="product.productID.photo"
                        class="w-100"
                      />
                      <a href="#!">
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style="background-color: rgba(253, 253, 253, 0.15);"
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 col-xl-6">
                    <h5>   {{product.productID.title}}</h5>

                    <p class="text-truncate mb-4 mb-md-0">
                     {{product.productID.description}}
                    </p>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                      <h4 class="mb-1 me-1"> ${{ product.productID.price }}</h4>
                      
                     
                    </div>
                    <span class="text-danger">  <p>{{product.quantity}} * quantity</p></span>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      products: "",
      orders: []
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("https://xanddddddd.herokuapp.com/api/orders", {
        headers: {
          Authorization: "Bearer" + token,
          "x-access-token": token
        }
      })
      .then(res => {
        console.log(res);

        this.orders = res.data.products;
      });
  }
};
</script>
