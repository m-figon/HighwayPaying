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
      <div class="left-align">
        <h3>Your rides</h3>
      </div>
      <div class="left-align">
        <h2>27.08.2021</h2>
      </div>
      <div class="ride">
        <div class="left">
          <img src="../assets/road.png" />
        </div>
        <div class="middle">
          <h3>American Highway 2</h3>
          <h3>Kansas</h3>
          <div class="one-line">
            <h4>ABC12345</h4>
            <h4>Honda</h4>
            <h4>Civic</h4>
          </div>
        </div>
        <div class="right">
          <h2>5.30 USD</h2>
        </div>
      </div>
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
<style src="../style/style.css">

</style>