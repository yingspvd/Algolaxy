<template>
  <div class="flex-shrink-0 p-3 overflow-auto">
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#terminator-collapse"
          aria-expanded="true"
        >
          Terminator
        </button>
        <div class="collapse show" id="terminator-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <div class="flowchart">
              <div class="terminator" style="margin-right:10px">
                <div class="terminator-text">
                  START
                </div>
              </div>
              <div class="terminator">
                <div class="terminator-text">END</div>
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
        >
          Input / Output
        </button>
        <div class="collapse show" id="inout-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <div class="parallelogram">
              <div class="not-skew">
                <div class="place" style="margin-left: 10px;">
                  Read
                </div>
                <div class="dropdown-box" style="margin-left: 10px">
                  <div class="triangle-down"></div>
                </div>
              </div>
            </div>
            <div class="parallelogram" style="margin-bottom:10px">
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
        >
          Display
        </button>
        <div class="collapse show" id="display-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New</a></li>
          </ul>
        </div>
      </li>

      <li class="mb-1">
        <button
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#account-collapse"
          aria-expanded="true"
          style="font-size: 14px"
        >
          Declare / Assign Variable
        </button>
        <div class="collapse show" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <div class="square-box-orange">
              Set
              <div class="square-textbox"></div>
              =
              <div class="square-textbox">
                0
              </div>
            </div>

            <div class="square-box-orange">
              Set
              <div class="square-textbox"></div>
              =
              <div class="square-textbox">
                " "
              </div>
            </div>

            <div class="square-box-orange">
              Set
              <div class="square-textbox"></div>
              =
              <div class="square-textbox">
                [ ]
              </div>
            </div>

            <div class="square-box-purple">
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

            <div class="square-box-purple">
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
            <div class="square-box-purple" style="margin-bottom:10px">
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
        >
          Condition
        </button>
        <div class="collapse show" id="condition-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <div class="diamond-square-box">
              <div class="diamond-item">
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

                <div class="dropdown-box"></div>
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
        >
          Function
        </button>
        <div class="collapse show" id="function-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <div class="square-round">
              <div class="square-textbox" style=" width: 120px; ">
                " Function "
              </div>
            </div>
            <div class="square-dark-purple"></div>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
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
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}
.flex-shrink-0 {
  width: 280px;
  height: 86vh;
  border-radius: 0 30px 30px 0;
  margin-top: -4px;
  background-color: var(--dark-blue);
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
  overflow-y: auto;
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
  align-items: flex-start;
  display: flex;
  min-width: 100px;
  margin-top: 10px;
}

.terminator {
  align-items: flex-start;
  background-color: var(--pink);
  border-radius: 50px;
  height: 35px;
  justify-content: flex-end;
  min-width: 100px;
  padding: 5.3px 8.2px;
}

.terminator-text {
  color: var(--dark-blue);
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

.square-box-orange {
  width: 200px;
  height: 35px;
  background: #ffae74;
  min-width: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  font-weight: 500;
  color: var(--dark-blue);
}

.square-box-purple {
  width: 200px;
  height: 35px;
  background: #c6b8ff;
  min-width: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  font-weight: 500;
}

.diamond-square-box {
  width: 130px;
  height: 130px;
  margin: 10px 0 10px 0;
  background-color: #ff9fc2;
  transform: rotateX(45deg) rotateZ(45deg);
}

.diamond-item {
  transform: rotateX(0deg) rotateZ(-45deg);
}

.square-round {
  align-items: flex-start;
  background-color: #6181f3;
  border-radius: 50px;
  height: 35px;
  width: 200px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 500;
}

.square-dark-purple {
  align-items: flex-start;
  background-color: #6181f3;
  height: 35px;
  width: 200px;
  margin-top: 10px;
  justify-content: flex-end;
}

.place {
  height: 12px;
  letter-spacing: 0;
  min-width: 41px;
  font-weight: 500;
  width: 41;
  color: var(--dark-blue);
}

.not-skew {
  transform: skew(20deg);
  display: flex;
}

.dropdown-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60px;
  height: 20px;
  background: #ffffff;
  border-radius: 3px;
  color: var(--dark-blue);
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
  color: var(--dark-blue);
}
</style>
