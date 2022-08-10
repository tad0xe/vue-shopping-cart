<template>
  <div>
    <br><br> <br> <br>
    <form>
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
              <h3 class="mb-0">Change Password</h3>
            </div>
            <div class="card-body">
              <form
                @submit.prevent="handleSubmit"
                autocomplete="off"
                class="form"
                role="form"
              >
                <div class="form-group">
                  <label for="inputPasswordOld">Change Password</label>
                  <input
                    class="form-control"
                    id="inputPasswordOld"
                    required=""
                    type="password"
                    v-model="password"
                  >
                </div>

                <div class="form-group">
                  <button
                    class="btn btn-success btn-lg float-right"
                    type="submit"
                  >Save</button>
                </div>
                {{message}}
              </form>
            </div>
          </div><!-- /form card change password -->
        </div>
      </div>
    </form>

  </div>

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      message: ""
    };
  },
  mounted() {
    console.log(this.$route.query.token);
  },
  methods: {
    async handleSubmit() {
      const response = await axios
        .post("https://xanddddddd.herokuapp.com/api/auth/updatePassword", {
          password: this.password,
          token: this.$route.query.token
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