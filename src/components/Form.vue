<template>
  <div class="middle-form">
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
        <p v-if="emailWarning">{{firstWarning}}</p>
      </div>

      <div class="input-div">
        <h4>password</h4>
        <input type="password" v-model="password" />
        <p v-if="passwordWarning">{{secondWarning}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["emailWarning", "passwordWarning","firstWarning","secondWarning"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {},
  beforeUpdate() {
    this.$emit("updateEmail", this.email);
    this.$emit("updatePassword", this.password);
  },
};
</script>

<style src="../style/style.css">

</style>
