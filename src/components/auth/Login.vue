<template>

  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <span
          class="anchor"
          id="formLogin"
        ></span>
        <!-- form card login -->
        <div class="card card-outline-secondary">
          <div class="card-header">
            <h3 class="mb-0">Login</h3>
          </div>
          <div class="card-body">
            <form
              autocomplete="off"
              class="form"
              id="formLogin"
              name="formLogin"
              role="form"
            >
              <div class="form-group">
                <label for="uname1">email</label>
                <input
                  class="form-control"
                  id="uname1"
                  v-model="email"
                  name="uname1"
                  required=""
                  type="text"
                >
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  autocomplete="new-password"
                  class="form-control"
                  id="pwd1"
                  required=""
                  v-model="password"
                  type="password"
                >
              </div>
              <div class="form-check small">
                <label class="form-check-label">
                  <input
                    class="form-check-input"
                    type="checkbox"
                  >
                  <span>Remember me on this computer</span>
                </label>
              </div>
              <button
                @click="submit"
                class="btn btn-success btn-lg float-right"
                type="button"
              >Login</button>
               dont have an account <router-link to="/register">register</router-link>
              forgot password <router-link to="/forgot-password">forgot-password</router-link>

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
  data: () => ({
    valid: true,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    async submit() {
      const response = await axios
        .post("https://xanddddddd.herokuapp.com/api/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          const token = response.data.token;
          localStorage.setItem("token", response.data.token);

                 this.$router.push("/");
        })
        .catch(err => console.log(err));
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

