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

      <div
        id="board"
        class="board scrollarea"
        @dragover.prevent
        @drop.prevent="drop"
      >
        <div class="terminator-f" style="margin:10px 0 0 0">
          <div class="text-f">START</div>
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
  </div>
</template>

<script>
const displayPic = require("../assets/sidebar/display-green.svg");
const conditionPic = require("../assets/sidebar/condition.svg");
const arrow = require("../assets/arrow.svg");

// const op_calculate = ["+", "-", "*", "/", "%", "^"];
const op_assign = ["=", "++", "--"];
// const op_compare = ["==", "<", ">","!="];
// const op_connect = ["and","or","not"];

export default {
  name: "board",
  data() {
    return {
      divSet: 0,
      arrow: 0,
      allSet:[],
      variable: ["x", "y", "z"],
      function: ["function", "function", "function"],
      terminator: 1,
      read: 0,
      print: 0,
      display: 0,
      declare_int: 0,
      declare_string: 0,
      declare_array: 0,
      assign_int: 0,
      assign_string: 0,
      assign_array: 0,
      condition: 0,
      declareFunc: 0,
      callFunc: 0,
      connector: 0,
    };
  },

  methods: {
    drop(e) {
      var data = e.dataTransfer.getData("object_id");
      var board = document.getElementById("board");

      this.create_div(board);
      var set = "set" + this.divSet;
      var divSet = document.getElementById(set);

      if (data != "" && data != "start" && data != "end") {
        this.style_arrow(board);
      }
      if (data == "end" && this.terminator == 1) {
        this.style_arrow(board);
        this.style_terminator(board, data);
      }
      this.choose_style(board, data, divSet);
    },

    choose_style(board, data, divSet) {
      console.log(divSet);
      if (data == "read" || data == "print") {
        this.style_parallelogram(board, data);
      }
      if (data == "display") {
        this.style_display(board, data);
      }
      if (
        data == "declare_int" ||
        data == "declare_string" ||
        data == "declare_array"
      ) {
        this.style_declare(board, data);
      }
      if (
        data == "assign_int" ||
        data == "assign_string" ||
        data == "assign_array"
      ) {
        this.style_assign(board, data);
      }
      if (data == "condition") {
        this.style_condition(board, data);
      }
      if (data == "declare_function") {
        this.style_function(board, data);
      }
      if (data == "call_function") {
        this.style_callFunction(board, data);
      }
      if (data == "connector") {
        this.style_connector(board, data);
      }
    },

    create_div(board) {
      this.divSet += 1;
      var div = document.createElement("div");
      div.id = "set" + this.divSet;
      board.appendChild(div);
    },

    style_arrow(divSet) {
      this.arrow += 1;
      var img = document.createElement("img");
      img.id = "arrow" + this.arrow;
      img.src = arrow;
      img.setAttribute("height", "30px");
      divSet.appendChild(img);
    },

    // style_arrow(board) {
    //   // var set = "set" + this.div;
    //   // var div = document.getElementById("board");
    //   this.arrow += 1;
    //   var img = document.createElement("img");
    //   img.id = "arrow" + this.arrow;
    //   img.src = arrow;
    //   img.setAttribute("height", "30px");
    //   board.appendChild(img);
    // },

    test() {
      console.log("TEST : ");
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
      div.setAttribute("draggable", "true");
      div.ondragstart = function(event) {
        console.log(event.target.id);
      };

      var div2 = document.createElement("div");
      div2.id = "notSkew" + data + temp;
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("not-skew-f");

      var select = document.createElement("select");
      select.id = "select" + data + temp;

      for (const val of this.variable) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
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
      document.getElementById(div.id).classList.add("display-f");

      var img = document.createElement("img");
      img.id = "img" + this.display;
      img.src = displayPic;
      img.setAttribute("width", "200px");
      div.appendChild(img);

      var span = document.createElement("span");
      span.id = "span" + this.display;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input-display-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "x";
    },

    style_declare(board, data) {
      var temp = 0;
      var text = "";
      var bText = "";
      var aText = "";
      if (data == "declare_int") {
        this.declare_int += 1;
        temp = this.declare_int;
        text = "0";
        bText = "&nbsp";
        aText = "&nbsp";
      } else if (data == "declare_string") {
        this.declare_string += 1;
        temp = this.declare_string;
        bText = "&#8220";
        aText = "&#8221";
      } else {
        this.declare_array += 1;
        temp = this.declare_array;
        bText = "[";
        aText = "]";
      }
      console.log(bText);
      console.log(aText);

      var div = document.createElement("div");
      div.id = data + temp;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");

      var div2 = document.createElement("div");
      div2.id = "div2_" + data + temp;
      div.appendChild(div2);
      div2.innerHTML = "Set";
      document.getElementById(div2.id).classList.add("text-f");

      var span = document.createElement("span");
      span.id = "span_" + data + temp;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "x";

      if (data == "declare_int" || data == "declare_string") {
        var div3 = document.createElement("div");
        div3.id = "div3_" + data + temp;
        div.appendChild(div3);
        div3.innerHTML = "=";
        document.getElementById(div3.id).classList.add("text-f");
      }

      var div4 = document.createElement("div");
      div4.id = "div4_" + data + temp;
      div.appendChild(div4);
      div4.innerHTML = bText;
      document.getElementById(div4.id).classList.add("text-declare-before-f");

      var span2 = document.createElement("span");
      span2.id = "span2_" + data + temp;
      div.appendChild(span2);
      document.getElementById(span2.id).classList.add("input-declare-f");
      document.getElementById(span2.id).contentEditable = "true";
      span2.setAttribute("role", "textbox");
      span2.innerHTML = text;

      var div5 = document.createElement("div");
      div5.id = "div5_" + data + temp;
      div.appendChild(div5);
      div5.innerHTML = aText;
      document.getElementById(div5.id).classList.add("text-declare-after-f");
    },

    style_assign(board, data) {
      var temp = 0;
      var text = "";
      var bText = "";
      var aText = "";

      if (data == "assign_int") {
        this.assign_int += 1;
        temp = this.assign_int;
        text = "0";
        bText = "&nbsp";
        aText = "&nbsp";
      } else if (data == "assign_string") {
        this.assign_string += 1;
        temp = this.assign_string;
        bText = "&#8220";
        aText = "&#8221";
      } else {
        this.assign_array += 1;
        temp = this.assign_array;
        bText = "[";
        aText = "]";
      }

      var div = document.createElement("div");
      div.id = data + temp;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";

      if (data == "assign_array") {
        var store = document.createElement("div");
        store.id = "store_" + data + temp;
        div.appendChild(store);
        store.innerHTML = "Store";
        document.getElementById(store.id).classList.add("text-f");
      }

      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + temp;
      div.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");

      var select = document.createElement("select");
      select.id = "select_" + data + temp;
      for (const val of this.variable) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      document.getElementById(drop1.id).appendChild(select);
      document.getElementById(select.id).classList.add("dropdown-f");

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + temp;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      if (data == "assign_array") {
        var div4 = document.createElement("div");
        div4.id = "div4_" + data + temp;
        div.appendChild(div4);
        div4.innerHTML = bText;
        document.getElementById(div4.id).classList.add("text-declare-before-f");

        var span1 = document.createElement("span");
        span1.id = "span1_" + data + temp;
        div.appendChild(span1);
        document.getElementById(span1.id).classList.add("input-declare-f");
        document.getElementById(span1.id).contentEditable = "true";
        span1.setAttribute("role", "textbox");
        span1.innerHTML = text;

        var div5 = document.createElement("div");
        div5.id = "div5_" + data + temp;
        div.appendChild(div5);
        div5.innerHTML = aText;
        document.getElementById(div5.id).classList.add("text-declare-after-f");
      }

      var drop2 = document.createElement("div");
      drop2.id = "drop2_" + data + temp;
      div.appendChild(drop2);
      document.getElementById(drop2.id).classList.add("custom-select-f");

      var select2 = document.createElement("select");
      select2.id = "select2_" + data + temp;
      for (const val of op_assign) {
        var option2 = document.createElement("option");
        option2.value = val;
        option2.text = val;
        select2.appendChild(option2);
      }
      document.getElementById(drop2.id).appendChild(select2);
      document.getElementById(select2.id).classList.add("dropdown-f");

      var tri2 = document.createElement("div");
      tri2.id = "tri2_" + data + temp;
      drop2.appendChild(tri2);
      document.getElementById(tri2.id).classList.add("triangle-yellow");

      if (data == "assign_int" || data == "assign_string") {
        var div2 = document.createElement("div");
        div2.id = "div2_" + data + temp;
        div.appendChild(div2);
        div2.innerHTML = bText;
        document.getElementById(div2.id).classList.add("text-declare-before-f");

        var span = document.createElement("span");
        span.id = "span_" + data + temp;
        div.appendChild(span);
        document.getElementById(span.id).classList.add("input-declare-f");
        document.getElementById(span.id).contentEditable = "true";
        span.setAttribute("role", "textbox");
        span.innerHTML = text;

        var div3 = document.createElement("div");
        div3.id = "div3_" + data + temp;
        div.appendChild(div3);
        div3.innerHTML = aText;
        document.getElementById(div3.id).classList.add("text-declare-after-f");
      } else {
        var span2 = document.createElement("span");
        span2.id = "span2_" + data + temp;
        div.appendChild(span2);
        document.getElementById(span2.id).classList.add("input-f");
        document.getElementById(span2.id).contentEditable = "true";
        span2.setAttribute("role", "textbox");
        span2.innerHTML = text;
      }
    },

    style_condition(board, data) {
      this.condition += 1;
      var div = document.createElement("div");
      div.id = data + this.condition;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("display-f");

      var img = document.createElement("img");
      img.id = "img" + this.condition;
      img.src = conditionPic;
      img.setAttribute("width", "200px");
      div.appendChild(img);

      var div2 = document.createElement("div");
      div2.id = "item" + this.condition;
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("diamond-item-f");

      // Dropdown
      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + this.condition;
      div2.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");

      var select = document.createElement("select");
      select.id = "select_" + data + this.condition;
      for (const val of this.variable) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      document.getElementById(drop1.id).appendChild(select);
      document.getElementById(select.id).classList.add("dropdown-f");

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + this.condition;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      // Dropdown
      var select2 = document.createElement("select");
      select2.id = "select2_" + data + this.condition;
      for (const val of this.variable) {
        var option2 = document.createElement("option");
        option2.value = val;
        option2.text = val;
        select2.appendChild(option2);
      }
      document.getElementById(div2.id).appendChild(select2);
      document.getElementById(select2.id).classList.add("dropdown-f");

      var span = document.createElement("span");
      span.id = "span_" + data + this.condition;
      div2.appendChild(span);
      document.getElementById(span.id).classList.add("input-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "text";
    },

    style_function(board, data) {
      this.declareFunc += 1;
      var div = document.createElement("div");
      div.id = data + this.declareFunc;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#6181f3";
      document.getElementById(div.id).style.borderRadius = "50px";

      var span = document.createElement("span");
      span.id = "span_" + data + this.declareFunc;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "Function";
    },

    style_callFunction(board, data) {
      this.callFunc += 1;

      var div = document.createElement("div");
      div.id = data + this.callFunc;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#6181f3";
      document.getElementById(div.id).style.justifyContent = "space-between";

      var div2 = document.createElement("div");
      div2.id = "div2_" + this.callFunc;
      div.appendChild(div2);
      document.getElementById(div2.id).classList.add("square-box-short-f");

      var select = document.createElement("select");
      select.id = "select_" + data + this.callFunc;
      for (const val of this.function) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      document.getElementById(div.id).appendChild(select);
      document.getElementById(select.id).classList.add("dropdown-f");

      var div3 = document.createElement("div");
      div3.id = "div3_" + this.callFunc;
      div.appendChild(div3);
      document.getElementById(div3.id).classList.add("square-box-short-f");
    },

    style_connector(board, data) {
      var div = document.createElement("div");
      div.id = data + this.connector;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("circle-f");
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
  position: relative;
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
  position: absolute;
  top: 87%;
  left: 92%;
}
.side-toolbar {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /* position: absolute; */
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

.scrollarea {
  overflow-x: scroll;
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #7ca3b2;
  width: 1px;
  border-radius: 10px;
}

.fw-semibold {
  font-weight: 600;
}
.lh-tight {
  line-height: 1.25;
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
