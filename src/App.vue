<template>
  <div id="app">
    <div id="nav">
      <div class="menu" v-if="email">
        <h1>{{ email }}</h1>
        <h1>|</h1>
        <h1 id="logout" v-on:click="signOut()">Sign out</h1>
      </div>
      <template v-if="!email">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
      <template v-else-if="email">
        <router-link to="/">Rides</router-link> |
        <router-link to="/cars">Cars</router-link>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>
import store from "./store";
export default {
  name: "App",
  store,
  data() {
    return {
      email: "",
    };
  },
  computed: {
    retrieveEmail() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    retrieveEmail(newVal){
      this.updateEmail(newVal);
    }
  },
  methods: {
    signOut() {
      this.$store.commit("changeEmail", "");
    },
    updateEmail(val) {
      this.email = val;
    },
  }
};
</script>
<style src="./style/style.css">

</style>
