<template>
  <div id="container">
    <div id="sidebar" class="flex-shrink-0 p-3">
      <!-- <vue-particles
      style="position:absolute; width: 260px; height: 89%; z-index: -4"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="3"
      :lineLinked="false"
      :moveSpeed="1.5"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    >
    </vue-particles> -->
      <ul v-show="sidebar" class="list-unstyled ps-0">
        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#terminator-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Terminator
          </button>
          <div class="collapse show" id="terminator-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="flowchart">
                <div
                  id="start"
                  class="terminator"
                  style="margin-right:10px"
                  draggable="true"
                  @dragstart="dragStart"
                  @dragover.stop
                >
                  <div class="terminator-text">
                    START
                  </div>
                </div>

                <div
                  id="end"
                  class="terminator"
                  draggable="true"
                  @dragstart="dragStart"
                  @dragover.stop
                >
                  <div class="terminator-text">
                    END
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#inout-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Input / Output
          </button>
          <div class="collapse show" id="inout-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div
                id="read"
                class="parallelogram"
                draggable="true"
                @dragstart="dragStart"
                @dragover.stop
              >
                <div class="not-skew">
                  <div class="place" style="margin-left: 10px;">
                    Read
                  </div>
                  <div class="dropdown-box" style="margin-left: 10px">
                    <div class="triangle-down"></div>
                  </div>
                </div>
              </div>
              <div
                id="print"
                class="parallelogram"
                draggable="true"
                @dragstart="dragStart"
                @dragover.stop
              >
                <div class="not-skew">
                  <div class="place" style="margin-left: 10px;">
                    Print
                  </div>
                  <div class="dropdown-box" style="margin-left: 10px">
                    <div class="triangle-down"></div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#display-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Display
          </button>
          <div class="collapse show" id="display-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="display">
                <div class="square-round">
                  <div
                    class="triangle-left"
                    style="margin-left: -40px; margin-top: 0"
                  ></div>
                  <div
                    class="square-textbox"
                    style=" width: 120px; margin-top: -40px"
                  ></div>
                </div>
              </div>
              <!-- <div class="display">
              <img
                src="../assets/sidebar/display.svg"
                width="200px"
                style="margin-top:10px;"
              />
              <div class="square-textbox" style=" width: 120px;"></div>
            </div> -->
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="true"
            style="margin-top:15px; font-size: 14px"
          >
            Declare / Assign Variable
          </button>
          <div class="collapse show" id="account-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="square-box-long" style="background:#FFA05B">
                Set
                <div class="square-textbox"></div>
                =
                <div class="square-textbox">
                  0
                </div>
              </div>

              <div class="square-box-long" style="background:#FFA05B">
                Set
                <div class="square-textbox"></div>
                =
                <div class="square-textbox">
                  " "
                </div>
              </div>

              <div class="square-box-long" style="background:#FFA05B">
                Set
                <div class="square-textbox"></div>
                =
                <div class="square-textbox">
                  [ ]
                </div>
              </div>

              <div class="square-box-long" style="background:#B09CFF">
                <div class="dropdown-box" style="width: 40px;">
                  <div class="triangle-down"></div>
                </div>
                <div
                  class="dropdown-box"
                  style="border-radius: 10px; width: 40px;"
                >
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #E4AD6A; "
                  ></div>
                </div>
                <div class="square-textbox">0</div>
              </div>

              <div class="square-box-long" style="background:#B09CFF">
                <div class="dropdown-box" style="width: 40px;">
                  <div class="triangle-down"></div>
                </div>
                <div
                  class="dropdown-box"
                  style="border-radius: 10px; width: 40px;"
                >
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #E4AD6A; "
                  ></div>
                </div>
                <div class="square-textbox">
                  " "
                </div>
              </div>
              <div class="square-box-long" style="background:#B09CFF;">
                <div class="dropdown-box" style="width: 40px;">
                  <div class="triangle-down"></div>
                </div>
                <div
                  class="dropdown-box"
                  style="border-radius: 10px; width: 40px;"
                >
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #E4AD6A; "
                  ></div>
                </div>
                <div class="square-textbox">
                  [ ]
                </div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#condition-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Condition
          </button>
          <div class="collapse show" id="condition-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="diamond-square-box">
                <div class="diamond-item">
                  <div class="dropdown-box" style="width: 40px; height:30px">
                    <div class="triangle-down"></div>
                  </div>

                  <div
                    class="dropdown-box"
                    style="border-radius: 13px; width: 40px; height:30px; margin: 15px;"
                  >
                    <div
                      class="triangle-down"
                      style=" border-top: 6px solid #E4AD6A; "
                    ></div>
                  </div>

                  <div
                    class="square-textbox"
                    style="width: 40px; height: 30px"
                  ></div>
                </div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#function-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Function
          </button>
          <div class="collapse show" id="function-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div
                class="square-box-long"
                style="background:#6181f3; border-radius: 50px;"
              >
                <div class="square-textbox" style=" width: 120px; ">
                  " Function "
                </div>
              </div>
              <div
                class="square-box-long"
                style="background:#6181f3;justify-content: space-between;"
              >
                <div class="square-box-short"></div>
                <div
                  class="square-textbox"
                  style="justify-content:flex-end; width: 120px; "
                >
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid var(--dark-blue-2); "
                  ></div>
                </div>
                <div class="square-box-short"></div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#connector-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Connector
          </button>
          <div class="collapse show" id="connector-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="circle"></div>
            </ul>
          </div>
        </li>

        <img
          src="../assets/sidebar/ufo.svg"
          height="20px"
          style="margin-top:25px"
        />

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#text-collapse"
            aria-expanded="true"
            style="margin-top:25px"
          >
            Text / Variable
          </button>
          <div class="collapse show" id="text-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="flowchart">
                <div
                  class="square-textbox"
                  style="margin:10px 10px 0 10px; height:30px; width:60px"
                >
                  " "
                </div>
                <div
                  class="square-textbox"
                  style="justify-content:flex-end; margin:10px 0 0 10px; height:30px;  width:60px"
                >
                  A
                  <div class="triangle-down" style="margin-left:15px"></div>
                </div>
              </div>
            </ul>
          </div>
        </li>

        <li class="mb-1">
          <button
            class="btn btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#operator-collapse"
            aria-expanded="true"
            style="margin-top:15px"
          >
            Operator
          </button>
          <div class="collapse show" id="operator-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <div class="sub-heading" style="color:white; margin-top:10px;">
                Statement
              </div>
              <div class="flowchart">
                <div
                  class="dropdown-box"
                  style="border-radius: 25px; width: 60px; height:30px; margin-right:20px;"
                >
                  <div style="margin-right:15px">+</div>
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #5D9D83; "
                  ></div>
                </div>

                <div
                  class="dropdown-box"
                  style="border-radius: 25px; width: 60px; height:30px;"
                >
                  <div style="margin-right:15px">=</div>
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #E4AD6A; "
                  ></div>
                </div>
              </div>

              <div class="sub-heading" style="color:white; margin-top:10px;">
                Condition
              </div>
              <div class="flowchart">
                <div
                  class="dropdown-box"
                  style="border-radius: 25px; width: 60px; height:30px; margin-right:20px;"
                >
                  <div style="margin-right:10px">==</div>
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #5D83CA; "
                  ></div>
                </div>

                <div
                  class="dropdown-box"
                  style="border-radius: 25px; width: 60px; height:30px;"
                >
                  <div style="margin-right:10px">AND</div>
                  <div
                    class="triangle-down"
                    style=" border-top: 6px solid #DA566E; "
                  ></div>
                </div>
              </div>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- <Board /> -->
  </div>
</template>

<script>
// import Board from "./Board.vue";

export default {
  // components: { Board },
  name: "Tools",
  props: ["sidebar"],
  watch: {
    sidebar: function() {
      this.closeSidebar();
    },
  },
  data() {
    return {};
  },

  methods: {
    closeSidebar() {
      if (this.sidebar == false) {
        this.closeNav();
      } else {
        this.openNav();
      }
    },

    closeNav() {
      document.getElementById("sidebar").style.width = "75px";
    },

    openNav() {
      document.getElementById("sidebar").style.width = "280px";
    },

    dragStart: (e) => {
      e.dataTransfer.setData("object_id", e.target.id);
    },
  },
};
</script>

<style scoped>
body {
  /* min-height: 80vh; */
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}

main {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  height: -webkit-fill-available;
  overflow-x: auto;
  overflow-y: hidden;
}
#container {
  display: flex;
}
.flex-shrink-0 {
  overflow: auto;
  /* width: 280px; */
  border-radius: 0 30px 0 0;
  background-color: var(--dark-blue-2);
  transition: 0.5s;
  height: 100%;
}
.b-example-divider {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle {
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: white;
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover {
  color: white;
  background-color: var(--pink);
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='white' stroke='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: white;
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
  color: white;
}
.btn-toggle-nav a:hover {
  background-color: var(--pink);
}

.scrollarea {
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 0px;
}

.fw-semibold {
  font-weight: 600;
}
.lh-tight {
  line-height: 1.25;
}

.btn.focus,
.btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 0%);
}

/* Sidebar */
.flowchart {
  margin-top: 10px;
  display: flex;
}
.sub-heading {
  padding-right: 50px;
}
.terminator {
  background-color: var(--pink);
  border-radius: 50px;
  height: 35px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.terminator-text {
  color: var(--dark-blue-2);
  text-align: center;
  font-weight: 500;
}

.parallelogram {
  width: 200px;
  height: 35px;
  transform: skew(-20deg);
  background: #86e2ff;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.square-box-long {
  width: 200px;
  height: 35px;
  background: #ffa05b;
  min-width: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  font-weight: 500;
  color: var(--dark-blue-2);
}

.square-box-purple {
  width: 200px;
  height: 35px;
  background: #6181f3;
  min-width: 180px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  font-weight: 500;
  color: var(--dark-blue-2);
}

.square-box-short {
  width: 3px;
  height: 35px;
  background: var(--dark-blue-2);
}

.diamond-square-box {
  width: 140px;
  height: 140px;
  margin: 10px 0 10px 0;
  background-color: #ff9fc2;
  transform: rotateX(45deg) rotateZ(45deg);
  display: flex;
  justify-content: space-evenly;
}

.diamond-item {
  transform: rotateX(0deg) rotateZ(-45deg);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.circle {
  width: 40px;
  height: 40px;
  background: #ffc700;
  border-radius: 50%;
  margin: 10px 0 0 0;
}

.triangle-left {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-right: 40px solid #89cd83;
  border-bottom: 20px solid transparent;
  margin: 10px 0 10px 0;
}

.square-round {
  width: 150px;
  height: 40px;
  border-radius: 0 50px 50px 0;
  background: #89cd83;
  margin: 10px 0 10px 0;
}

.place {
  height: 12px;
  letter-spacing: 0;
  min-width: 41px;
  font-weight: 500;
  width: 41;
  color: var(--dark-blue-2);
}

.not-skew {
  transform: skew(20deg);
  display: flex;
  align-items: flex-start;
}

.dropdown-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60px;
  height: 20px;
  background: #ffffff;
  border-radius: 3px;
  color: var(--dark-blue-2);
}

.triangle-down {
  width: 0;
  height: 0;
  margin-right: 5px;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid #584f84;
}

.btn-toggle-nav {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.square-textbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  background: #ffffff;
  border-radius: 3px;
  color: var(--dark-blue-2);
}
.display {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
