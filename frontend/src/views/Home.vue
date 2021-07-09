<template>
  <div class="home">
    
    <Navbar />
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
html,
body {
  background: var(--blue);
}
.home {
  height: 100vh;
}
</style>
