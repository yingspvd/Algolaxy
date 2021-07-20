<template>
  <div class="home">
    <!-- <vue-particles
      style="position: absolute; width: 100%;"
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
    
    <a @click="closeSidebar()">
      <img
        :src="require(`../assets/${btnColor}.svg`)"
        height="65px"
        style="margin:50px 0 0 260px; position:fixed; cursor:pointer"
        id="sidebarBtn"
      />
    </a>

    <Tools :sidebar="sidebar" style="margin:120px 0 0 0;"/>
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
    // Workspace,
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
        document.getElementById("sidebarBtn").style.marginLeft = "50px";
      } else {
        this.btnColor = "sidebar-yellow";
        document.getElementById("sidebarBtn").style.marginLeft = "260px";
      }
    },
  },
};
</script>

<style scoped>
body {
  overflow: hidden;
  display: flex;
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
