<template>
  <div class="register">
    <div class="register-logo">
      <h1>Highway</h1>
      <h1>Paying</h1>
    </div>
    <div class="register-logo2">
      <h2>...comfortable driving!</h2>
    </div>
    <div class="middled">
      <div class="left-aligned">
        <h3>CREATE ACCOUNT</h3>
      </div>

      <div class="input-div">
        <h4>e-mail</h4>
        <input type="text" v-model="email" />
      </div>

      <div class="input-div">
        <h4>password</h4>
        <input type="password" v-model="password" />
      </div>
      <div class="left-aligned">
        <input type="radio" v-bind:checked="terms" v-on:click="termsChanging" />
        <p>I accept terms of using</p>
      </div>
      <div class="left-aligned">
        <button v-on:click="register()">Next</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.register h3 {
  color: rgb(29, 29, 131);
  font-size: 1rem;
  margin-bottom: -1rem;
  margin-left: 2rem;
}
.register button {
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
.register {
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
.register input[type="text"],
.register input[type="password"] {
  width: 20rem;
  height: 2rem;
  padding-left: 1rem;
  border: 1px solid orange;
  color: rgb(29, 29, 131);
  background-color: rgba(255, 255, 255, 0);
  margin-top: -1.7rem;
}
.register h4 {
  padding: 0.3rem;
  margin-left: 0.5rem;
  background-color: rgb(247, 247, 247);
  position: relative;
  z-index: 3;
  color: orange;
  font-size: 0.7rem;
}
.register-logo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
}
.left-aligned {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.register-logo h1:last-child {
  color: rgb(29, 29, 131);
}
p {
  font-size: 0.7rem;
  color: rgb(29, 29, 131);
}
h1 {
  font-size: 3rem;
  color: orange;
  margin: 0;
}
.register-logo2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  margin-bottom: 0.7rem;
}
h2 {
  font-size: 1.7;
  color: rgb(29, 29, 131);
  margin: 0;
  font-weight: bold;
}
</style>

<script>
// @ is an alias to /src

export default {
  data: function () {
    return {
      email: "",
      password: "",
      terms: false,
    };
  },
  methods: {
    termsChanging() {
      this.terms = !this.terms;
    },
    register() {
      if (!(
        this.email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) === null
      )) {
        console.log("email valid");
      }
      if(!(
          this.password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.\-_@$!%*#?&])[A-Za-z\d.\-_@$!%*#?&]{8,13}$/
          ) === null
        )){
          console.log('password valid')
        }
        if(this.terms){
          console.log('terms valid')
        }
    },
  },
};
</script>