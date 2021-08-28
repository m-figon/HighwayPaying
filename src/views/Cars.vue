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
      <div class="ride">
        <div class="left">
          <img src="../assets/car.png" />
        </div>
        <div class="middle">
          <div class="one-line">
            <h3>Honda</h3>
            <h3>Civic</h3>
          </div>
          <h4>ABC12345</h4>
          <h3 id="active">Active</h3>
        </div>
        <div class="right">
          <div class="right-arrow"></div>
        </div>
      </div>
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
.cars {
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
.ride,
.new-ride {
  margin-top: 0.7rem;
  width: 30rem;
  -webkit-box-shadow: 1px 1px 8px 0px #aaaaaa;
  box-shadow: 1px 1px 8px 0px #aaaaaa;
  background-color: white;
  height: 7rem;
  display: flex;
}
.new-ride{
    height: 4rem;
    margin-top: 2rem;
}
.new-ride h3{
    text-transform: uppercase;
    color: rgb(110, 110, 110);
}
.new-ride:hover{
    cursor: pointer;
}
.left-align {
  width: 30rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.left-align h3 {
  margin-left: 10%;
}
.left-align h2 {
  font-size: 1rem;
  margin-top: 1.5rem;
}
.left {
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
}
.left img {
  width: 3rem;
  height: 3rem;
}
.middle {
  width: 53%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1rem;
}
.middle h3 {
  font-size: 1.1rem;
  margin: 0.1rem 0;
}
.middle h4 {
  font-size: 0.8rem;
  color: rgb(175, 175, 175);
  margin: 0.4rem 0;
}
.right {
  width: 27%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
.right h2 {
  margin: 1rem;
  font-size: 1.3rem;
}
.one-line {
  display: flex;
}
.one-line h3 {
  margin-right: 0.2rem;
  text-transform: uppercase;
}
#active {
  color: rgb(155, 216, 63);
}
.right-arrow {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(90deg);
  background-color: rgb(29, 29, 131);
  margin: 1rem;
  width: 1rem;
  height: 1rem;
}
.right-arrow:hover {
  cursor: pointer;
}
</style>