<template>
  <div id="container" style="box-shadow: 0px 5px 10px #91A0A5;">
    <div class="tool-container">
      <div class="top-toolbar">
        <div>
          <a style="cursor:pointer;">
            <i class="fas fa-undo-alt"></i>
          </a>
          <a style="cursor:pointer;">
            <i class="fas fa-redo-alt"></i>
          </a>
        </div>
        <div>
          <a style="cursor:pointer;">
            <i class="fas fa-compress"></i>
            <i class="fas fa-expand"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- <div id="board" class="board" @dragover.prevent @drop.prevent="drop"></div> -->

    <div class="side-toolbar-container">
      <div class="side-toolbar" >
        <a style="cursor:pointer;">
          <i class="far fa-trash-alt"></i>
        </a>
        <a style="cursor:pointer; margin-top:5px">
          <i class="fas fa-file-export"></i>
        </a>
      </div>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {};
  },
  created() {},
  methods: {
    drop: (e) => {
      var data = e.dataTransfer.getData("object_id");
      var board = document.getElementById("board");

      // For Copy Element
      // var newObject = document.getElementById(data).cloneNode(true);
      // board.insertBefore(newObject, board.childNodes[0]);

      if (data == "start") {
        let div = document.createElement("div");
        div.id = "startTerminaor";
        div.innerHTML = "CreateElement example";
        board.appendChild(div);
        document.getElementById("startTerminaor").classList.add("test");
      }
    },
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 700px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
.tool-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.top-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  width: 100%;
  height: 50px;
  background-color: var(--dark-blue-1);
  border-radius: 5px;
  box-shadow: 0px -3px 20px #91A0A5;
}
.side-toolbar-container {
  display: flex;
  justify-content: flex-end;
}
.side-toolbar {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.board {
  height: 600px;
  width: 200px;
  border-radius: 10px;
  background-color: var(--white-gray);
}

.fa-undo-alt,
.fa-redo-alt,
.fa-compress,
.fa-expand {
  color: #ffffff;
  width: 20px;
  margin: 0 0 0 10px;
}
.fa-undo-alt:hover,
.fa-redo-alt:hover,
.fa-compress:hover,
.fa-expand:hover {
  color: var(--gray);
}

.fa-trash-alt,
.fa-file-export {
  color: var(--gray);
  margin-right: 10px;
}
.fa-trash-alt:hover {
  color: red;
}
.fa-file-export:hover {
  color: green;
}
.test {
  color: green;
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

@media screen and (max-width: 1439px) {
  #container {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 650px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
}
@media screen and (max-width: 1315px) {
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
@media screen and (max-width: 1280px) {
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
@media screen and (max-width: 1210px) {
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
