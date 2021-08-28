<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import store from "./store";

export default {
  name: "App",
  store,
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

#nav {
  padding: 4rem;
}

#nav a {
  font-weight: 500;
  color: rgb(29, 29, 131);
}

#nav a.router-link-exact-active {
  color: orange;
}
</style>
