<template>
  <div class="home">
    <!-- <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="3"
        :lineLinked="false"
        :moveSpeed="1.5"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles> -->
    <Navbar />
    <img
      src="../assets/astronaut.svg"
      height="45px"
      style="margin:80px 0 0 30px;"
      id="astronaut"
    />

    <a @click="closeSidebar()">
      <img
        :src="require(`../assets/${btnColor}.svg`)"
        height="65px"
        style="margin:175px 0 0 175px; position:fixed; cursor:pointer"
        id="sidebarBtn"
      />
    </a>

    <Tools :sidebar="sidebar" />
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
  data() {
    return {
      sidebar: true,
      btnColor: "sidebar-yellow",
    };
  },
  methods: {
    closeSidebar() {
      this.sidebar = !this.sidebar;
      this.checkCloseSidebar();
    },
    checkCloseSidebar() {
      if (this.sidebar == false) {
        this.btnColor = "sidebar-green";
        document.getElementById("astronaut").style.marginLeft = "10px";
        document.getElementById("sidebarBtn").style.marginLeft = "-5px";
      } else {
        this.btnColor = "sidebar-yellow";
        document.getElementById("astronaut").style.marginLeft = "30px";
        document.getElementById("sidebarBtn").style.marginLeft = "175px";
      }
    },
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

#sidebarBtn,
#astronaut {
  transition: 0.5s;
}
</style>
