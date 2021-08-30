<template>
  <div class="cars">
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
        <h3>Your cars</h3>
      </div>
      <template v-if="user.cars">
      <div class="ride"  v-for="car in user.cars" v-bind:key="car.id">
        <div class="left">
          <img src="../assets/car.png" />
        </div>
        <div class="middle">
          <div class="one-line">
            <h3>{{car.brand}}</h3>
            <h3>{{car.type}}</h3>
          </div>
          <h4>{{car.registration}}</h4>
          <h3 id="active">Active</h3>
        </div>
        <div class="right">
          <div class="right-arrow"></div>
        </div>
      </div>
      </template>
      <div class="new-ride">
        <div class="left">
          <img src="../assets/car.png" />
        </div>
        <div class="middle">
          <h3>+ Add car</h3>
        </div>
        <div class="right">
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