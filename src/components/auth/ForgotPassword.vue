<template>
  <div>
    <br><br> <br> <br>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <span
          class="anchor"
          id="formChangePassword"
        ></span>
        <hr class="mb-5">
        <!-- form card change password -->
        <div class="card card-outline-secondary">
          <div class="card-header">
            <h3 class="mb-0">enter </h3>
          </div>
          <div class="card-body">
            <form
              @submit.prevent="handleSubmit"
              autocomplete="off"
              class="form"
              role="form"
            >
              <div class="form-group">
                <label for="inputPasswordOld">enter email</label>
                <input
                  class="form-control"
                  id="inputPasswordOld"
                  required=""
                  type="email"
                  v-model="email"
                >
              </div>

              <div class="form-group">
                <button
                  class="btn btn-success btn-lg float-right"
                  type="submit"
                >Send</button>
              </div>
              {{message}}
            </form>

          </div>
</div>
</div>
</div>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      message: ""
    };
  },

  methods: {
    async handleSubmit() {
      const response = await axios
        .post("https://xanddddddd.herokuapp.com/api/auth/forgotPassword", {
          email: this.email
        })
        .then(response => {
          console.log(response);
          this.message = response.data.message;
        })
        .catch(err => console.log(err));
      console.log(response);
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>