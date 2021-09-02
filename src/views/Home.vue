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
      <div class="adding-display" v-if="adding">
        <div class="adding-panel">
          <div class="middled">
            <div class="left-aligned">
              <h3>Add Car</h3>
            </div>
            <div class="right-aligned">
              <button v-on:click="resetPopUp()">X</button>
            </div>
            <div class="input-div">
              <h4>Car</h4>
              <select v-model="car">
                <option
                  v-for="(carVal, index) in user.cars"
                  v-bind:key="index"
                  v-bind:value="
                    carVal.registration + '-' + carVal.brand + '-' + carVal.type
                  "
                >
                  {{
                    carVal.registration + " " + carVal.brand + " " + carVal.type
                  }}
                </option>
              </select>
              <p v-if="carWarning">Please select car</p>
            </div>

            <div class="input-div">
              <h4>Place</h4>
              <select v-model="place">
                <option value="kansas">Kansas</option>
                <option value="new york">New York</option>
                <option value="washington">Washington</option>
                <option value="chicago">Chicago</option>
              </select>
              <p v-if="placeWarning">Please select place</p>
            </div>
            <div class="input-div">
              <h4>Road</h4>
              <select v-model="road">
                <option value="american highway 1">American Highway 1</option>
                <option value="south highway 2">South Highway 2</option>
                <option value="west coast highway 3">
                  West Coast Highway 3
                </option>
                <option value="american highway 4">American Highway 4</option>
              </select>
              <p v-if="roadWarning">Please select road</p>
            </div>

            <div class="middle-aligned">
              <button v-on:click="add()">Add</button>
            </div>
          </div>
        </div>
      </div>
    </template>
          <template v-if="user && email">

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
      <template v--if="user.rides" v-for="ride in user.rides">
        <div class="left-align" v-bind:key="ride.id">
          <h4>{{ride.date}}</h4>
        </div>
        <div class="ride" v-bind:key="ride.id">
          <div class="left">
            <img src="../assets/road.png" />
          </div>
          <div class="middle" v-bind:key="ride.id">
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
            </template>
      </template>
        <div class="new-ride" v-on:click="adding = true"  v-if="user && email">
          <div class="left">
            <img src="../assets/road.png" />
          </div>
          <div class="middle">
            <h3>+ Add ride</h3>
          </div>
          <div class="right"></div>
        </div>
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
    resetPopUp() {
      this.adding = false;
      this.car = "";
      this.place = "";
      this.road = "";
      this.carWarning = false;
      this.roadWarning = false;
      this.placeWarning = false;
    },
    calculatePrice() {
      let price = 0;
      if (this.road === "american highway 1" && this.place === "kansas") {
        price = 1.3;
      } else if (this.road === "south highway 2" && this.place === "kansas") {
        price = 2.4;
      } else if (
        this.road === "west coast highway 3" &&
        this.place === "kansas"
      ) {
        price = 3.2;
      } else if (
        this.road === "american highway 4" &&
        this.place === "kansas"
      ) {
        price = 4.1;
      } else if (
        this.road === "american highway 1" &&
        this.place === "washington"
      ) {
        price = 3.3;
      } else if (
        this.road === "south highway 2" &&
        this.place === "washington"
      ) {
        price = 5.4;
      } else if (
        this.road === "west coast highway 3" &&
        this.place === "washington"
      ) {
        price = 7.2;
      } else if (
        this.road === "american highway 4" &&
        this.place === "washington"
      ) {
        price = 2.1;
      } else if (
        this.road === "american highway 1" &&
        this.place === "new york"
      ) {
        price = 1.6;
      } else if (this.road === "south highway 2" && this.place === "new york") {
        price = 5.1;
      } else if (
        this.road === "west coast highway 3" &&
        this.place === "new york"
      ) {
        price = 4.4;
      } else if (
        this.road === "american highway 4" &&
        this.place === "new york"
      ) {
        price = 4.3;
      } else if (
        this.road === "american highway 1" &&
        this.place === "chicago"
      ) {
        price = 7.7;
      } else if (this.road === "south highway 2" && this.place === "chicago") {
        price = 2.5;
      } else if (
        this.road === "west coast highway 3" &&
        this.place === "chicago"
      ) {
        price = 2.1;
      } else if (
        this.road === "american highway 4" &&
        this.place === "chicago"
      ) {
        price = 5.1;
      }

      return parseFloat(price).toFixed(2);
    },
    add() {
      //console.log(new Date().toLocaleDateString())
      this.car !== "" ? (this.carWarning = false) : (this.carWarning = true);
      this.place !== ""
        ? (this.placeWarning = false)
        : (this.placeWarning = true);
      this.road !== "" ? (this.roadWarning = false) : (this.roadWarning = true);
      if (!this.carWarning && !this.placeWarning && !this.roadWarning) {
        let carArray = this.car.split("-");
        let ridePrice = "";
        ridePrice = this.calculatePrice() + " USD";
        this.user.rides.push({
          car: {
            registration: carArray[0],
            brand: carArray[1],
            type: carArray[2],
          },
          place: this.place,
          road: this.road,
          price: ridePrice,
          date: new Date().toLocaleDateString(),
        });
        fetch(
          "https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users/" +
            this.user.id,
          {
            method: "PUT",
            body: JSON.stringify({
              email: this.user.email,
              password: this.user.password,
              cars: this.user.cars,
              rides: this.user.rides,
              id: this.user.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        ).then(() => {
          this.user = null;
          fetch(
            "https://rocky-citadel-32862.herokuapp.com/Highway-Paying/users"
          )
            .then((response) => response.json())
            .then((data) => (this.users = [...data]))
            .then(() => console.log(this.users))
            .then(() => {
              for (let user of this.users) {
                if (this.email === user.email) {
                  this.user = user;
                  console.log(this.user);
                  this.loaded = true;
                  this.resetPopUp();
                }
              }
            });
        });
      }
    },
  },
  beforeMount() {
    this.updateEmail(this.retrieveEmail);
  },
  created() {
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