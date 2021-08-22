<template>
  <div class="about">
    <div class="about-logo">
      <h1>Highway</h1>
      <h1>Paying</h1>
    </div>
    <div class="about-logo2">
      <h2>...comfortable driving!</h2>
    </div>
    <div class="left-aligned">
      <h3>CREATE ACCOUNT</h3>
      <input />
    <input />
    </div>
    
  </div>
</template>



<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
}
.about input {
  width: 20rem;
  margin: 2rem 0;
  border: 1px solid orange;
}
.about-logo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width:65%;
}
.left-aligned{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
}
.about-logo h1:last-child {
  color: rgb(29, 29, 131);
}
h1 {
  font-size: 3rem;
  color: orange;
  margin: 0;
}
.about-logo2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  margin-bottom: 2rem;
}
h2 {
  font-size: 1.7;
  color: rgb(29, 29, 131);
  margin: 0;
  font-weight: bold;
}
</style>