<template>
  <div id="container" style="box-shadow: 0px 5px 10px #91A0A5;">
    <div class="tool-container">
      <div class="bottom-toolbar" >
        <a>
          <img class="img-control-back" src="../assets/back.svg" alt="" >
        </a>
        <a>
          <img class="img-control" src="../assets/stop.svg" alt="" >
        </a>
        <a>
          <img class="img-control" src="../assets/play.svg" alt="" >
        </a>
        <a>
          <img class="img-control" src="../assets/pause.svg" alt="" >
        </a>
        <a>
          <img class="img-control-next" src="../assets/next.svg" alt="" >
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
  width: 500px;
  height: 700px;
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
  box-shadow: 0px -3px 20px #91A0A5;
}
.bottom-toolbar a{
  cursor: pointer;
  /* box-shadow: 0px 5px 10px #123346; */
}
.bottom-toolbar a:hover{
  cursor: pointer;
  height: 33px;
  /* box-shadow: 0px 0px 2px #6F8F9E; */
}
.img-control{
  height: 30px;
}
.img-control-back{
  height: 30px;
  margin-left: 60px;
}
.img-control-next{
  height: 30px;
  margin-right: 60px;
}

@media screen and (max-width: 1439px) {
  #container {
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 650px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
}
@media screen and (max-width: 1310px) {
  #container {
  display: flex;
  flex-direction: column;
  width: 425px;
  height: 650px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
}
@media screen and (max-width: 1280px) {
  #container {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 650px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
}
</style>
