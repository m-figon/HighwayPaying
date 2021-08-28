<template>
  <div class="home">
    <template v-if="!email">
      <div class="logo">
        <h1>Highway</h1>
        <h1>Paying</h1>
      </div>
      <div class="logo2">
        <h2>...comfortable driving!</h2>
      </div>
      <h3>I want to join HighwayPaying</h3>
      <router-link to="/register"><button>SIGN UP</button></router-link>

      <h3>I used HighwayPaying before</h3>
      <router-link to="/login"><button>SIGN IN</button></router-link>
    </template>
    <template v-if="email">
      <div class="logo">
        <h1>Highway</h1>
        <h1>Paying</h1>
      </div>
      <div class="logo2">
        <h2>...comfortable driving!</h2>
      </div>
      <h3>Your rides</h3>
    </template>
  </div>
</template>

<script>
import store from "../store";
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
    retrieveEmail(newVal) {
      this.updateEmail(newVal);
    },
  },
  methods: {
    signOut() {
      this.$store.commit("changeEmail", "");
    },
    updateEmail(val) {
      this.email = val;
    },
  },
  beforeMount() {
    this.updateEmail(this.retrieveEmail);
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(247, 247, 247);
  width: 100vw;
  height: 100vh;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
}
.logo h1:last-child {
  color: rgb(29, 29, 131);
}
h1 {
  font-size: 3rem;
  color: orange;
  margin: 0;
}
.logo2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 21rem;
  margin-bottom: 2rem;
}
h2 {
  font-size: 1.7;
  color: rgb(29, 29, 131);
  margin: 0;
  font-weight: bold;
}
h3 {
  font-size: 1.2rem;
  color: rgb(29, 29, 131);
  margin: 0;
}
button {
  border-radius: 10px;
  width: 10rem;
  height: 3rem;
  font-size: 1.7rem;
  color: white;
  background: orange;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  border: 0px;
  -webkit-box-shadow: 1px 1px 8px 0px #aaaaaa;
  box-shadow: 1px 1px 8px 0px #aaaaaa;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
}
button:hover {
  cursor: pointer;
}
</style>