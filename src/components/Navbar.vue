<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-color">
    <a class="navbar-brand" href="/" style=" letter-spacing: 5px;">
      <img
        src="../assets/logo.svg"
        height="15px"
        style="margin: 0 -12px 4px 0"
      />
      LGOLAXY
      <a style=" margin-left:-6px; margin-right:60px; letter-spacing: -4px;"
        >II</a
      >
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample04"
      aria-controls="navbarsExample04"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample04">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown04"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >File
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdown04">
            <a class="dropdown-item" href="#">New</a>
            <a class="dropdown-item" href="#">Export Flowchart</a>
            <a class="dropdown-item" href="#">Export Code</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown04"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Edit</a
          >
          <div class="dropdown-menu" aria-labelledby="dropdown04">
            <a class="dropdown-item" href="#">Undo</a>
            <a class="dropdown-item" href="#">Redo</a>
            <a class="dropdown-item" href="#">Delete</a>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#"
            >Tutorial
            <img class="img-moon" src="../assets/moon.png" alt="" />
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-md-0">
        <a href="#" style="margin-right:30px;">
          <img class="img-folder" src="../assets/folder.svg" alt="" />
        </a>
        <a href="#" style="margin-right:40px; text-decoration:none;">
          <div class="signin">
            <div class="signin-text">
              Sign in
            </div>
          </div>
        </a>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {};
  },
};
</script>

<style scoped>
.bg-color {
  background: var(--dark-blue-1);
}

.img-folder {
  height: 25px;
}

.img-signin {
  height: 40px;
}

.signin {
  background-color: #da566e;
  border-radius: 50px;
  height: 35px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signin-text {
  color: white;
  text-align: center;
  font-weight: 500;
}

.img-moon {
  width: 15px;
  height: 15px;
}

.dropdown-menu {
  background: var(--dark-blue-1);
  border-radius: 10px;
  margin-top: 10px;
  border: 0px solid rgb(0 0 0 / 0%);
}

.dropdown-item {
  color: #ffffff;
  font-weight: 500;
}
.dropdown-item:hover {
  background: var(--pink);
  border-radius: 5px;
}
.nav-link {
  font-weight: bold;
}
.nav-link:hover {
  background: var(--pink);
  border-radius: 10px;
}
.active > .nav-link,
.nav-link.active,
.nav-link.show,
.show > .nav-link {
  background: var(--pink);
  border-radius: 10px;
}

.navbar {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
}

.navbar-expand-md .navbar-nav .nav-link {
  margin-right: 40px;
}

.navbar-brand {
  margin-left: 40px;
  margin-right: 50px;
}
</style>
