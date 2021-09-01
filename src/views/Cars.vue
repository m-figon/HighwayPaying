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
              <h4>Car Brand</h4>
              <select v-model="brand">
                <option value="honda">Honda</option>
                <option value="audi">Audi</option>
                <option value="opel">Opel</option>
                <option value="volvo">Volvo</option>
              </select>
              <p v-if="brandWarning">Please select car brand</p>
            </div>

            <div class="input-div">
              <h4>Car Type</h4>
              <select v-model="type">
                <option value="hatchback">Hatchback</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
              </select>
              <p v-if="typeWarning">Please select car type</p>
            </div>
            <div class="input-div">
              <h4>Car Registration</h4>
              <input type="text" v-model="registration" />
              <p v-if="registrationWarning">
                Registration should have 8 signs, no special letters sign
              </p>
            </div>

            <div class="middle-aligned">
              <button v-on:click="add()">Add</button>
            </div>
          </div>
        </div>
      </div>
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
      <div v-if="!user" class="loading-screen">
        <img src="../assets/load.gif" />
      </div>
      <template v-else-if="user.cars">
        <div class="ride" v-for="car in user.cars" v-bind:key="car.id">
          <div class="left">
            <img src="../assets/car.png" />
          </div>
          <div class="middle">
            <div class="one-line">
              <h3>{{ car.brand }}</h3>
              <h3>{{ car.type }}</h3>
            </div>
            <h4>{{ car.registration }}</h4>
            <h3 id="active">Active</h3>
          </div>
          <div class="right">
            <router-link v-bind:to="'/'+car.registration+'-'+car.brand+'-'+car.type">
              <div class="right-arrow"></div>
            </router-link>
          </div>
        </div>
      </template>
      <div class="new-ride" v-on:click="adding = true">
        <div class="left">
          <img src="../assets/car.png" />
        </div>
        <div class="middle">
          <h3>+ Add car</h3>
        </div>
        <div class="right"></div>
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
      user: null,
      adding: false,
      brand: "",
      type: "",
      registration: "",
      brandWarning: false,
      typeWarning: false,
      registrationWarning: false,
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
    resetPopUp() {
      this.adding = false;
      this.brand = "";
      this.registration = "";
      this.type = "";
      this.registrationWarning = false;
      this.typeWarning = false;
      this.brandWarning = false;
    },
    add() {
      this.brand !== ""
        ? (this.brandWarning = false)
        : (this.brandWarning = true);
      this.type !== "" ? (this.typeWarning = false) : (this.typeWarning = true);
      !(this.registration.match(/^[a-zA-Z0-9]{8}$/) === null)
        ? (this.registrationWarning = false)
        : (this.registrationWarning = true);
      if (
        !this.brandWarning &&
        !this.typeWarning &&
        !this.registrationWarning
      ) {
        this.user.cars.push({
          brand: this.brand,
          registration: this.registration,
          type: this.type,
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