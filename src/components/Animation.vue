<template>
  <div id="container" style="box-shadow: 0px 5px 10px #91A0A5;">
    <div class="animation" style="margin-top:10px">
      test
      <span 
        class="input" 
        role="textbox" 
        aria-placeholder="0"
        contenteditable>
          
      </span>
      <span 
        class="input" 
        role="textbox" 
        contenteditable>
          0
      </span>
    </div>
    <div class="tool-container">
      <div class="bottom-toolbar">
        <a>
          <img
            class="img-control-back"
            src="../assets/controlMedia/back.svg"
            alt=""
          />
        </a>
        <a>
          <img
            class="img-control"
            src="../assets/controlMedia/stop.svg"
            alt=""
          />
        </a>
        <a>
          <img
            class="img-control"
            src="../assets/controlMedia/play.svg"
            alt=""
          />
        </a>
        <a>
          <img
            class="img-control"
            src="../assets/controlMedia/pause.svg"
            alt=""
          />
        </a>
        <a>
          <img
            class="img-control-next"
            src="../assets/controlMedia/next.svg"
            alt=""
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#container {
  /* width: 500px; */
  width: 35vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-left: 20px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
.tool-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.bottom-toolbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: var(--dark-blue-1);
  border-radius: 5px;
  box-shadow: 0px -3px 20px #91a0a5;
}
.bottom-toolbar a {
  cursor: pointer;
  /* box-shadow: 0px 5px 10px #123346; */
}
.bottom-toolbar a:hover {
  cursor: pointer;
  height: 33px;
  /* box-shadow: 0px 0px 2px #6F8F9E; */
}
.img-control {
  height: 30px;
}
.img-control-back {
  height: 30px;
  margin-left: 60px;
}
.img-control-next {
  height: 30px;
  margin-right: 60px;
}

/* @media screen and (max-width: 1500px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 725px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1440px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 700px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1320px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 675px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1220px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1120px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 275px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1050px) {
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 275px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
} */
</style>
