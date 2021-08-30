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
      <template v-if="user.rides">
      <div class="ride" v-for="ride in user.rides" v-bind:key="ride.id">
        <div class="left">
          <img src="../assets/road.png" />
        </div>
        <div class="middle" v-bind:key="user.id">
          <h3>{{ride.road}}</h3>
          <h3>Kansas</h3>
          <div class="one-line">
            <h4>{{ride.car.registration}}</h4>
            <h4>{{ride.car.brand}}</h4>
            <h4>{{ride.car.type}}</h4>
          </div>
        </div>
        <div class="right">
          <h2>{{ride.price}}</h2>
        </div>
      </div>
      </template>
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
      user: null
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
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users")
      .then((response) => response.json())
      .then((data) => (this.users = [...data]))
      .then(() => console.log(this.users)).then(()=>{
        for(let user of this.users){
          if(this.email===user.email){
            this.user = user;
            console.log(this.user);
          }
        }
      })
  },
};
</script>
<style src="../style/style.css">

</style>