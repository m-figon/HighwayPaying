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
      <template v-if="user.rides.length > 0">
        <div class="left-align">
          <h3>Your rides</h3>
        </div>
      </template>
      <template v-if="user.rides.length <= 0">
        <div class="left-align">
          <h3>You don't have any rides added yet</h3>
        </div>
      </template>
      <div v-if="!user" class="loading-screen">
        <img src="../assets/load.gif" />
      </div>
      <template v-else-if="user.rides">
        <fragment v-for="ride in user.rides" v-bind:key="ride.id">
          <div class="ride" v-if="ride.car.registration===registrationFilter && ride.car.brand===brandFilter && ride.car.type===typeFilter">
            <div class="left">
              <img src="../assets/road.png" />
            </div>
            <div class="middle" v-bind:key="user.id">
              <h3>{{ ride.road }}</h3>
              <h3>Kansas</h3>
              <div class="one-line">
                <h4>{{ ride.car.registration }}</h4>
                <h4>{{ ride.car.brand }}</h4>
                <h4>{{ ride.car.type }}</h4>
              </div>
            </div>
            <div class="right">
              <h2>{{ ride.price }}</h2>
            </div>
          </div>
        </fragment>
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
      user: null,
      adding: false,
      car: "",
      place: "",
      road: "",
      registrationFilter: "",
      brandFilter: "",
      typeFilter: "",
      carWarning: false,
      placeWarning: false,
      roadWarning: false,
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
    console.log(this.$route.params.value);
    this.registrationFilter = this.$route.params.value.split("-")[0];
    this.brandFilter = this.$route.params.value.split("-")[1];
    this.typeFilter = this.$route.params.value.split("-")[2];

    fetch("https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users")
      .then((response) => response.json())
      .then((data) => (this.users = [...data]))
      .then(() => console.log(this.users))
      .then(() => {
        for (let user of this.users) {
          if (this.email === user.email) {
            this.user = user;
            console.log(this.user);
            this.loaded = true;
          }
        }
      });
  },
};
</script>
<style src="../style/style.css">
</style>