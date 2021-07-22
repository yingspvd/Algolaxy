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
      <div id="board" class="board" @dragover.prevent @drop.prevent="drop">
        <div class="terminator-f" style="margin-top:10px">
          <div class="text-f">START</div>
        </div>
      </div>
    </div>

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
      terminator: 1,
      read: 0,
      print: 0,
      read_value: ["dog", "cat", "parrot", "rabbit"],
      display: 0,
      declare_int: 0,
    };
  },

  methods: {
    drop(e) {
      var data = e.dataTransfer.getData("object_id");
      var board = document.getElementById("board");
      console.log("data", data);
      if (data != "" && data != "start" && data != "end") {
        this.style_arrow(board);
      }
      if (data == "end" && this.terminator == 1) {
        this.style_arrow(board);
        this.style_terminator(board, data);
      }
      if (data == "read" || data == "print") {
        this.style_parallelogram(board, data);
      }
      if (data == "display") {
        this.style_display(board, data);
      }
      if (data == "declare_int") {
        this.style_declare_test(board, data);
      }
    },

    style_arrow(board) {
      this.arrow += 1;
      var span = document.createElement("span");
      span.id = "arrow" + this.arrow;
      board.appendChild(span);
      span.innerHTML = "&#8595";
      document.getElementById(span.id).classList.add("arrow-f");
    },

    style_terminator(board, data) {
      this.terminator += 1;
      var div = document.createElement("div");
      div.id = "terminator" + this.terminator;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("terminator-f");

      var div2 = document.createElement("div");
      div2.id = "text";
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("text-f");
      div2.innerHTML = data.toUpperCase();
    },

    style_parallelogram(board, data) {
      var temp = 0;
      if (data == "read") {
        this.read += 1;
        temp = this.read;
      } else {
        this.print += 1;
        temp = this.print;
      }

      var div = document.createElement("div");
      div.id = data + temp;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("parallelogram-f");

      var div2 = document.createElement("div");
      div2.id = "notSkew" + data + temp;
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("not-skew-f");

      var select = document.createElement("select");
      select.id = "select" + data + temp;

      for (const val of this.read_value) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
      }

      var label = document.createElement("label");
      label.innerHTML = data[0].toUpperCase() + data.substring(1) + "   ";

      document
        .getElementById(div2.id)
        .appendChild(label)
        .appendChild(select);

      document.getElementById(select.id).classList.add("dropdown-f");
    },

    style_display(board, data) {
      this.display += 1;
      var div = document.createElement("div");
      div.id = data + this.display;
      board.appendChild(div);

      var img = document.createElement("img");
      img.id = "img" + this.display;
      img.setAttribute("src", "../assets/sidebar/display.svg");
      img.setAttribute("width", "200px");
      div.appendChild(img);
    },

    style_declare(board, data) {
      this.declare_int += 1;
      var div = document.createElement("div");
      div.id = data + this.declare_int;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");

      var p1 = document.createElement("p");
      p1.id = "p1_" + this.declare_int;
      div.appendChild(p1);
      p1.innerHTML = "Set";
      document.getElementById(p1.id).classList.add("text");

      var inputVar = document.createElement("INPUT");
      inputVar.id = "inputVar" + this.declare_int;
      div.appendChild(inputVar);
      document.getElementById(inputVar.id).classList.add("square-textbox-f");

      var p2 = document.createElement("p");
      p2.id = "p2_" + this.declare_int;
      div.appendChild(p2);
      p2.innerHTML = "=";
      document.getElementById(p2.id).classList.add("text");

      var inputInt = document.createElement("INPUT");
      inputInt.id = "inputInt" + this.declare_int;
      div.appendChild(inputInt);
      document.getElementById(inputInt.id).classList.add("square-textbox-f");
      inputInt.setAttribute("type", "number");
      document.getElementById(inputInt.id).placeholder = "0";
    },

    style_declare_test(board, data) {
      this.declare_int += 1;
      var div = document.createElement("div");
      div.id = data + this.declare_int;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");

      var span = document.createElement("span");
      span.id = data + this.declare_int;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "0";
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
  flex-direction: column;
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
  /* height: 600px;
  width: 200px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
