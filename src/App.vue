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
        <router-link to="/cars">Cars</router-link> |
        <router-link to="/payments">Payment</router-link>
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
<style>
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(247, 247, 247);
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu {
  display: flex;
  margin: 0 1rem;
}
.menu h1 {
  font-size: 1rem;
  color: rgb(29, 29, 131);
  padding: 0 0.1rem;
}
#logout {
  text-transform: uppercase;
  color: orange;
  font-weight: 500;
}
#logout:hover {
  cursor: pointer;
}
#nav {
  padding: 4rem;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: 500;
  color: rgb(29, 29, 131);
  font-size: 1rem;
  padding: 0 0.1rem;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: orange;
}
</style>
