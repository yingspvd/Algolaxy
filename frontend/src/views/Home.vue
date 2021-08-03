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
    <a @click="closeSidebar()" style="margin-top:120px">
      <img
        :src="require(`../assets/sidebar/${btnColor}.svg`)"
        height="65px"
        style="margin:50px 0 0 250px; position:fixed; cursor:pointer; "
        id="sidebarBtn"
      />
    </a>
    <Tools :sidebar="sidebar" style="margin-top:120px" />

    <div class="workspace">
      <Board />
      <Animation />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Tools from "../components/Tools.vue";
import Board from "../components/Board.vue";
import Animation from "../components/Animation.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Tools,
    Board,
    Animation,
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
        document.getElementById("sidebarBtn").style.marginLeft = "255px";
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
  background: #bacdd3;
}

.home {
  height: 100vh;
  display: flex;
  /* padding-top: 120px; */
}
.workspace {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 120px;
}
#sidebarBtn,
#astronaut {
  transition: 0.5s;
}
</style>
