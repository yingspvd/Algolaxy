<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-color">
    <a class="navbar-brand" href="#">Algolaxy</a>
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
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
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
        <a href="#" style="margin-right:40px;">
          <img class="img-signin" src="../assets/Signin.png" alt="" />
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

<style>
.bg-color {
  background: var(--blue);
}

.img-signin {
  height: 50px;
}

.img-moon {
  width: 15px;
  height: 15px;
}

.dropdown-menu {
  background: #e3e8eb;
  border-radius: 10px;
  margin-top: 10px;
}
.dropdown-item {
  color: var(--blue);
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
.navbar-expand-md .navbar-nav .nav-link {
  margin-right: 40px;
}

.navbar-brand {
  margin-left: 40px;
  margin-right: 40px;
}
</style>
