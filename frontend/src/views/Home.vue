<template>
  <div class="home">
    <Navbar />
    <img
      src="../assets/astronaut.svg"
      height="45px"
      style="margin:80px 0 0 30px"
    />
    <Tools />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Tools from "../components/Tools.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Tools,
  },
};
</script>

<style>
body {
  overflow: hidden;
}

html,
body {
  background: var(--blue);
}

.home {
  height: 100vh;
}
</style>
