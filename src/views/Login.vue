<template>
  
  <div class="login">
    <div v-if="!loaded" class="loading-screen">
        <img src="../assets/load.gif"/>
    </div>
    <login-form
      v-on:updateEmail="updateEmailParam($event)"
      v-on:updatePassword="updatePasswordParam($event)"
      v-bind:emailWarning="emailWarning"
      v-bind:passwordWarning="passwordWarning"
      firstWarning="Required field"
      secondWarning="Required field"
    >
    </login-form>
    <div class="left-aligned">
      <p>Don't remember the password?</p>
      <router-link to="/restore"><p id="login-link">Restore it</p></router-link>
    </div>
    <div class="left-aligned">
      <p>Don't have an account</p>
      <router-link to="/register"><p id="login-link">Sign up</p></router-link>
    </div>
    <div class="middle-aligned">
      <button v-on:click="login()">Login</button>
    </div>
  </div>
</template>



<style src="../style/style.css">

</style>

<script>
// @ is an alias to /src
import store from "../store";
import router from "../router";
import Form from "../components/Form.vue";

export default {
  store,
  router,
  components: {
    "login-form": Form,
  },
  data() {
    return {
      email: "",
      password: "",
      terms: false,
      emailWarning: false,
      passwordWarning: false,
      users: [],
      loaded: false,
      stage:1
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
    login() {
      !this.email ? (this.emailWarning = true) : (this.emailWarning = false);
      !this.password
        ? (this.passwordWarning = true)
        : (this.passwordWarning = false);
      if (this.email && this.password) {
        let success = false;
        for (const user of this.users) {
          if (this.email === user.email && this.password === user.password) {
            success = true;
            this.$store.commit("changeEmail", this.email);
            console.log(this.$store.getters.getUser);
            this.resetForm();
            alert("loged successfully");
            this.$router.push("/");
          }
        }

        if (!success) {
          alert("wrong data");
        }
      }
    },
    updateEmailParam(param) {
      this.email = param;
      //console.log(this.email);
    },
    updatePasswordParam(param) {
      this.password = param;
      //console.log(this.password);
    },
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users")
      .then((response) => response.json())
      .then((data) => (this.users = [...data]))
      .then(() => console.log(this.users)).then(()=>{
        this.loaded=true;
      });
  },
};
</script>