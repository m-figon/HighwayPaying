<template>
  <div class="login">
    <login-form
      v-if="stage === 1"
      v-on:updateEmail="updateEmailParam($event)"
      v-on:updatePassword="updatePasswordParam($event)"
      v-bind:emailWarning="emailWarning"
      v-bind:passwordWarning="passwordWarning"
      firstWarning="Please enter valid email"
      secondWarning="Password should have at least 8 signs, big letter, digit and special
          sign"
    >
    </login-form>
    <div v-if="stage === 1">
      <div class="left-aligned">
        <input type="radio" v-bind:checked="terms" v-on:click="termsChanging" />
        <p>I accept terms of using</p>
      </div>
      <div class="left-aligned">
        <p id="warning" v-if="radioWarning">Required field</p>
      </div>
      <div class="left-aligned">
        <p>Already got an account?</p>
        <router-link to="/login"><p id="login-link">Sign in</p></router-link>
      </div>
      <div class="middle-aligned">
        <button v-on:click="next()">Next</button>
      </div>
    </div>
    <div class="middled" v-if="stage === 2">
      <div class="left-aligned">
        <h3>CREATE ACCOUNT</h3>
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
        <button v-on:click="finish()">Finish</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.login h3 {
  color: rgb(29, 29, 131);
  font-size: 1rem;
  margin-bottom: -1rem;
  margin-left: 2rem;
}
a:-webkit-any-link {
  text-decoration: none;
}
#login-link {
  color: orange;
  margin-left: 0.3rem;
}
.input-div p,
#warning {
  color: red;
  font-size: 0.6rem;
}
#warning {
  margin-top: 0rem;
}
.login button {
  border-radius: 10px;
  width: 6rem;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
  background: orange;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  border: 0px;
  -webkit-box-shadow: 1px 1px 8px 0px #aaaaaa;
  box-shadow: 1px 1px 8px 0px #aaaaaa;
  margin-top: 1rem;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
}
.input-div {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;
}
.login input[type="text"],
.login input[type="password"],
select {
  width: 20rem;
  height: 2rem;
  padding-left: 1rem;
  border: 1px solid orange;
  color: rgb(29, 29, 131);
  background-color: rgba(255, 255, 255, 0);
  margin-top: -1.7rem;
}
.login h4 {
  padding: 0.3rem;
  margin-left: 0.5rem;
  background-color: rgb(247, 247, 247);
  position: relative;
  z-index: 3;
  color: orange;
  font-size: 0.7rem;
}
.login-logo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
}
.left-aligned,
.middle-aligned {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.middle-aligned {
  justify-content: center;
}
.login-logo h1:last-child {
  color: rgb(29, 29, 131);
}
p {
  font-size: 0.7rem;
  color: rgb(29, 29, 131);
}
h1 {
  font-size: 1.5rem;
  color: orange;
  margin: 0;
}
.login-logo2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  margin-bottom: 0.7rem;
}
h2 {
  font-size: 1rem;
  color: rgb(29, 29, 131);
  margin: 0;
  font-weight: bold;
}
button:hover {
  cursor: pointer;
}
</style>

<script>
// @ is an alias to /src
import Form from "../components/Form.vue";

export default {
  components: {
    "login-form": Form,
  },
  data() {
    return {
      email: "",
      password: "",
      terms: false,
      emailWarning: false,
      passwordWarning: false,
      radioWarning: false,
      brand: "",
      type: "",
      registration: "",
      brandWarning: false,
      typeWarning: false,
      registrationWarning: false,
      stage: 1,
    };
  },
  methods: {
    termsChanging() {
      this.terms = !this.terms;
    },
    finish() {
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
        this.brand = "";
        this.type = "";
        this.registration = "";
        fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/users", {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        alert("logined correctly");
      }
    },
    next() {
      !(this.email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) === null)
        ? (this.emailWarning = false)
        : (this.emailWarning = true);

      !(
        this.password.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.\-_@$!%*#?&])[A-Za-z\d.\-_@$!%*#?&]{8,13}$/
        ) === null
      )
        ? (this.passwordWarning = false)
        : (this.passwordWarning = true);
      this.terms ? (this.radioWarning = false) : (this.radioWarning = true);
      if (!this.emailWarning && !this.passwordWarning && !this.radioWarning) {
        this.stage = 2;
      }
    },
    updateEmailParam(param) {
      this.email = param;
      //console.log(this.email);
    },
    updatePasswordParam(param) {
      this.password = param;
      //console.log(this.password);
    },
  },
};
</script>