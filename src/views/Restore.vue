<template>
  <div class="login">
    <div v-if="!loaded" class="loading-screen">
        <img src="../assets/load.gif"/>
    </div>
    <div class="middle-form">
      <div class="login-logo">
        <h1>Highway</h1>
        <h1>Paying</h1>
      </div>
      <div class="login-logo2">
        <h2>...comfortable driving!</h2>
      </div>
      <div class="middled">
        <div class="left-aligned">
          <h3>SIGN IN</h3>
        </div>
        <div class="input-div">
          <h4>e-mail</h4>
          <input type="text" v-model="email" />
          <p v-if="emailWarning">Required field</p>
        </div>

        <div class="input-div">
          <h4>new password</h4>
          <input type="password" v-model="password" />
          <p v-if="passwordWarning">Required field</p>
        </div>
      </div>
    </div>
    <div class="middle-aligned">
      <button v-on:click="restore()">Restore</button>
    </div>
  </div>
</template>



<style src="../style/style.css">
</style>

<script>
// @ is an alias to /src
import store from "../store";
import router from "../router";

export default {
  store,
  router,
  data() {
    return {
      email: "",
      password: "",
      terms: false,
      emailWarning: false,
      passwordWarning: false,
      users: [],
      loaded: false,
      stage: 1,
    };
  },
  methods: {
    termsChanging() {
      this.terms = !this.terms;
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.emailWarning = false;
      this.passwordWarning = false;
    },
    restore() {
      !(this.email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) === null)
        ? (this.emailWarning = false)
        : (this.emailWarning = true);

      !(
        this.password.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.\-_@$!%*#?&])[A-Za-z\d.\-_@$!%*#?&]{8,13}$/
        ) === null
      )
        ? (this.passwordWarning = false)
        : (this.passwordWarning = true);
      this.terms ? (this.radioWarning = false) : (this.radioWarning = true);
      if (!this.emailWarning && !this.passwordWarning) {
        let success = false;
        for (const user of this.users) {
          if (this.email === user.email) {
            success = true;
               fetch("https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users/"+user.id, {
          method: "PUT",
          body: JSON.stringify({
            email: user.email,
            password: this.password,
            cars: user.cars,
            rides: user.rides,
            id: user.id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
                    this.resetForm();

            alert("password changed successfully");
          }
        }
        if (!success) {
          alert("wrong data");
        }
      } else {
        alert("wrong data");
      }
    },
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users")
      .then((response) => response.json())
      .then((data) => (this.users = [...data]))
      .then(() => console.log(this.users)).then(()=>this.loaded=true);
  },
};
</script>