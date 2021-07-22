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

    <div id="board" class="board" @dragover.prevent @drop.prevent="drop"></div>

    <div class="side-toolbar-container">
      <div class="side-toolbar">
        <a style="cursor:pointer;">
          <i class="far fa-trash-alt"></i>
        </a>
        <a style="cursor:pointer; margin-top:15px">
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
    return {
      arrow: 0,
      terminator: 0,
    };
  },

  methods: {
    drop(e) {
      var data = e.dataTransfer.getData("object_id");
      var board = document.getElementById("board");

      if (
        (data == "start" && this.terminator == 0) ||
        (data == "end" && this.terminator == 1)
      ) {
        this.terminator += 1;
        this.style_terminator(board, data);
        this.style_arrow(board);
      }
    },

    style_arrow(board) {
      this.arrow += 1;
      var span = document.createElement("span");
      span.id = "arrow" + this.arrow;
      board.appendChild(span);
      span.innerHTML = "&#8595";
      document.getElementById(span.id).classList.add("arrow");
    },

    style_terminator(board, data) {
      var div = document.createElement("div");
      div.id = "Terminator" + this.terminator;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("terminator");

      var div2 = document.createElement("div");
      div2.id = "textTerminator";
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("terminator-text");
      div2.innerHTML = data.toUpperCase();
    },
  },
};
</script>

<style scoped>
@import "../css/flowchartSign.css";

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
  box-shadow: 0px -3px 20px #91a0a5;
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
  font-size: 25px;
}
.fa-trash-alt:hover {
  color: red;
}
.fa-file-export:hover {
  color: green;
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
