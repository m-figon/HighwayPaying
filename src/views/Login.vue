<template>
  <div class="login">
    <div class="login-logo">
      <h1>Highway</h1>
      <h1>Paying</h1>
    </div>
    <div class="login-logo2">
      <h2>...comfortable driving!</h2>
    </div>
    <div class="middled">
      <div class="left-aligned">
        <h3>SIGN IN</h3>
      </div>
      <div class="input-div">
        <h4>e-mail</h4>
        <input type="text" v-model="email" />
        <p v-if="emailWarning">Field required</p>
      </div>

      <div class="input-div">
        <h4>password</h4>
        <input type="password" v-model="password" />
        <p v-if="passwordWarning">Field required</p>
      </div>
      <div class="left-aligned">
        <p>Don't remember the password?</p>
        <router-link to="/restore"
          ><p id="login-link">Restore it</p></router-link
        >
      </div>
      <div class="left-aligned">
        <p>Don't have an account</p>
        <router-link to="/register"><p id="login-link">Sign up</p></router-link>
      </div>
      <div class="middle-aligned">
        <button v-on:click="login()">Login</button>
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
import store from "../store";
import router from "../router"

export default {
  store,
  router,
  data() {
    return {
      email: "",
      password: "",
      terms: false,
      emailWarning: false,
      passwordWarning: false,
      users: [],
    };
  },
  methods: {
    termsChanging() {
      this.terms = !this.terms;
    },
    resetForm() {
      this.email = "";
      this.password = "";
      this.emailWarning = false;
      this.passwordWarning = false;
    },
    login() {
      !this.email ? (this.emailWarning = true) : (this.emailWarning = false);
      !this.password
        ? (this.passwordWarning = true)
        : (this.passwordWarning = false);
      if (this.email && this.password) {
        let success = false;
        for (const user of this.users) {
          if (this.email === user.email && this.password === user.password) {
            success = true;
            this.$store.commit("changeEmail", this.email);
            console.log(this.$store.getters.getUser);
            this.resetForm();
            alert("loged successfully");
            this.$router.push('/')
          }
        }

        if (!success) {
          alert("wrong data");
        }
      }
    },
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/users")
      .then((response) => response.json())
      .then((data) => (this.users = [...data]))
      .then(() => console.log(this.users));
  },
};
</script>