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

        <select class="dropdown-function">
          <option class="dropdown-item" v-for="(test, i) in test" :key="i">{{
            test
          }}</option>
        </select>

        <div>
          <a style="cursor:pointer;">
            <i class="fas fa-compress"></i>
            <i class="fas fa-expand"></i>
          </a>
        </div>
      </div>

      <div
        id="board"
        @dragover.prevent
        @drop.prevent="dropOnBoard"
        class="board scrollarea"
      >
        <div>
          <div class="terminator-f" style="margin:10px 0 0 0">
            <div class="text-f">START</div>
          </div>
        </div>

        <div
          @dragover.prevent
          @drop.prevent="dropArrow"
          id="arrowSet1"
          class="arrow-container"
        >
          <img src="../assets/arrow.svg" height="30px" />
        </div>
      </div>
      <div class="side-toolbar-container">
        <div class="side-toolbar">
          <a
            @dragover.prevent
            @drop.prevent="deleteObject"
            style="cursor:pointer;"
          >
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
// import * as boardScript from "../js/board.js";
// const boardScript = require("../js/board.js");

const displayPic = require("../assets/sidebar/display-green.svg");
const conditionPic = require("../assets/sidebar/condition.svg");
const arrow = require("../assets/arrow.svg");

// const op_calculate = ["+", "-", "*", "/", "%", "^"];
const op_compare = ["==", "<", ">", "!="];
// const op_connect = ["and","or","not"];
const op_maxmin = ["Max", "Min"];
const op_pushpop = ["Push", "Pop"];
const op_queue = ["Enqueue", "dequeue"];

export default {
  name: "board",

  data() {
    return {
      // boardScript,
      textarea: null,
      arrow: 1,
      variable: ["x", "y", "z"],
      test: ["main", "function", "function"],
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
      maxminFunc: 0,
      pushpopFunc: 0,
      queueFunc: 0,
      sortFunc: 0,
      lengthFunc: 0,
      floorFunc: 0,
      roundFunc: 0,
      swapFunc: 0,
      randomFunc: 0,
      squareRootFunc: 0,
      connector: 0,
    };
  },

  methods: {
    autosizeTextArea(textarea) {
      var el = textarea;
      setTimeout(function() {
        el.style.cssText = "height:auto; padding:0";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    },

    dragStart: (e, arrow) => {
      var id = e.target.id;
      var data = id.split(/([0-9]+)/);

      if (data[0] == "condition") {
        var img = new Image();
        img.src = conditionPic;
        e.dataTransfer.setDragImage(img, 200, 100);
      }
      // if (data[0] == "read" || data[0] == "print") {
      //   var imgPara = new Image();
      //   imgPara.src = parallelPic;
      //   imgPara.style.width = "10px";
      //   e.dataTransfer.setDragImage(imgPara, 200, 50);
      // }

      e.dataTransfer.setData("object_id", e.target.id);
      e.dataTransfer.setData("arrow", arrow);
    },

    dropOnBoard(e) {
      var board = document.getElementById("board");
      var data = e.dataTransfer.getData("object_id");
      var lastChild = board.lastChild.id;

      if (e.target.id == "board") {
        this.choose_style(board, data, lastChild);
      }
    },

    dropArrow(e) {
      var board = document.getElementById("board");

      // Object that placed
      var data = e.dataTransfer.getData("object_id");
      var object = document.getElementById(data);
      var data2 = e.dataTransfer.getData("arrow");
      var arrow_object = document.getElementById(data2);

      // Arrow target
      var arrow_id = e.target.id;
      var arrow_split = arrow_id.split(/([0-9]+)/);
      if (arrow_split[0] == "arrow") {
        arrow_split[0] = "arrowSet";
        arrow_id = arrow_split.join("");
      }
      var arrow_target = document.getElementById(arrow_id);

      // Object next from arrow target
      var nextElement = arrow_target.nextElementSibling;

      // Split to check that come from sidebar
      var myArray = data.split(/([0-9]+)/);

      // Object from sidebar
      if (myArray.length == 1) {
        this.choose_style(board, data, arrow_id);
      }
      // Swap Object
      else {
        if (nextElement == null) {
          board.appendChild(object);
          board.appendChild(arrow_object);
        } else if (object.id != nextElement.id) {
          board.insertBefore(object, nextElement);
          board.insertBefore(arrow_object, nextElement);
        }
      }
    },

    drop_var(e) {
      var data = e.dataTransfer.getData("object_id");
      console.log("var", data);
    },

    deleteObject() {
      console.log("delete");
    },

    style_arrow(board, object) {
      var nextElement = object.nextElementSibling;

      this.arrow += 1;
      var div = document.createElement("div");
      div.id = "arrowSet" + this.arrow;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }

      document.getElementById(div.id).classList.add("arrow-container-f");

      div.ondragover = function(event) {
        event.preventDefault();
      };
      div.ondrop = function(event) {
        event.preventDefault();
        this.dropArrow(event);
      }.bind(this);

      var img = document.createElement("img");
      img.id = "arrow" + this.arrow;
      img.src = arrow;
      img.setAttribute("height", "30px");

      div.appendChild(img);
    },

    choose_style(board, data, arrow_target) {
      if (data == "end" && this.terminator == 1) {
        this.style_terminator(board, data, arrow_target);
      }
      if (data == "read" || data == "print") {
        this.style_parallelogram(board, data, arrow_target);
      }
      if (data == "display") {
        this.style_display(board, data, arrow_target);
      }
      if (
        data == "declare_int" ||
        data == "declare_string" ||
        data == "declare_array"
      ) {
        this.style_declare(board, data, arrow_target);
      }
      if (
        data == "assign_int" ||
        data == "assign_string" ||
        data == "assign_array"
      ) {
        this.style_assign(board, data, arrow_target);
      }
      if (data == "condition") {
        this.style_condition(board, data, arrow_target);
      }
      if (data == "declare_function") {
        this.style_function(board, data, arrow_target);
      }
      if (data == "call_function") {
        this.style_callFunction(board, data, arrow_target);
      }
      if (data == "connector") {
        this.style_connector(board, data, arrow_target);
      }
      if (
        data == "maxmin_function" ||
        data == "pushpop_function" ||
        data == "queue_function"
      ) {
        this.style_maxminFunction(board, data, arrow_target);
      }
      if (
        data == "sort_function" ||
        data == "length_function" ||
        data == "floor_function" ||
        data == "round_function"
      ) {
        this.style_sortFunction(board, data, arrow_target);
      }
      if (data == "swap_function" || data == "random_function") {
        this.style_swapFunction(board, data, arrow_target);
      }
      if (data == "squareroot_function") {
        this.style_squareRootFunction(board, data, arrow_target);
      }
    },

    style_terminator(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.terminator += 1;
      var div = document.createElement("div");
      div.id = "terminator" + this.terminator;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      var div1 = document.createElement("div");
      div1.id = "div1_" + this.terminator;
      div.appendChild(div1);
      document.getElementById(div1.id).classList.add("terminator-f");

      var div2 = document.createElement("div");
      div2.id = "text";
      div1.appendChild(div2);
      document.getElementById(div2.id).classList.add("text-f");
      div2.innerHTML = data.toUpperCase();
    },

    style_parallelogram(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;
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
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("parallelogram-f");
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var div1 = document.createElement("div");
      div1.id = "notSkew" + data + temp;
      div.appendChild(div1);
      document.getElementById(div1.id).classList.add("not-skew-f");

      var div2 = document.createElement("div");
      div2.id = "div2_" + data + temp;
      div1.appendChild(div2);
      div2.innerHTML = data[0].toUpperCase() + data.substring(1) + "   ";
      document.getElementById(div2.id).classList.add("text-f");

      // var label = document.createElement("label");
      // label.id = "label" + data + temp;
      // label.innerHTML = data[0].toUpperCase() + data.substring(1) + "   ";
      // document.getElementById(div1.id).appendChild(label);

      if (data == "print") {
        var div4 = document.createElement("div");
        div4.id = "div4_" + data + temp;
        div1.appendChild(div4);
        div4.innerHTML = "&#8220";
        document.getElementById(div4.id).classList.add("text-declare-before-f");

        // var label = document.createElement("label");
        // label.id = "label_" + data + temp;
        // div1.appendChild(label);
        // document.getElementById(label.id).classList.add("input-declare-f");

        var div6 = document.createElement("div");
        div6.id = "div6_" + data + temp;
        div1.appendChild(div6);
        // document.getElementById(div6.id).classList.add("grow-wrap");

        var textarea = document.createElement("textarea");
        textarea.id = "textarea_" + data + temp;
        div1.appendChild(textarea);
        document.getElementById(textarea.id).classList.add("textarea");
        document.getElementById(textarea.id).contentEditable = "true";
        textarea.innerHTML = "";
        textarea.oninput = function(event) {
          this.autosizeTextArea(event.target);
        }.bind(this);

        var div5 = document.createElement("div");
        div5.id = "div5_" + data + temp;
        div1.appendChild(div5);
        div5.innerHTML = "&#8221";
        document.getElementById(div5.id).classList.add("text-declare-after-f");
      }
      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + temp;
      div1.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");

      var select = document.createElement("select");
      select.id = "select" + data + temp;

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

      this.style_arrow(board, div);
    },

    style_display(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.display += 1;
      var div = document.createElement("div");
      div.id = data + this.display;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("display-f");
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var img = document.createElement("img");
      img.id = "img" + data + this.display;
      img.src = displayPic;
      img.setAttribute("width", "200px");
      div.appendChild(img);

      var span = document.createElement("span");
      span.id = "span" + data + this.display;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input-display-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "x";

      this.style_arrow(board, div);
    },

    style_declare(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      var temp = 0;
      var text = "";
      var bText = "";
      var aText = "";
      if (data == "declare_int") {
        this.declare_int += 1;
        temp = this.declare_int;
        text = "0";
        // bText = "&nbsp";
        // aText = "&nbsp";
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

      var div = document.createElement("div");
      div.id = data + temp;
      board.appendChild(div);
      document.getElementById(div.id).classList.add("square-box-long-f");
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

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

      this.style_arrow(board, div);
    },

    style_assign(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      var temp = 0;
      var text = "";
      var bText = "";
      var aText = "";

      if (data == "assign_int") {
        this.assign_int += 1;
        temp = this.assign_int;
        text = "0";
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
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#6181F3";

      if (data == "assign_array") {
        var store = document.createElement("div");
        store.id = "store_" + data + temp;
        div.appendChild(store);
        store.innerHTML = "Store";
        document.getElementById(store.id).classList.add("text-f");
      }

      // Dropdown1
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
      select.draggable = "true";
      select.ondragstart = function(event) {
        console.log(event.target.id);
      }.bind(this);

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + temp;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      if (data == "assign_array") {
        var div4 = document.createElement("div");
        div4.id = "div4_" + data + temp;
        div.appendChild(div4);
        div4.innerHTML = bText;
        document.getElementById(div4.id).classList.add("text-array-before-f");

        var span1 = document.createElement("input");
        span1.id = "span1_" + data + temp;
        div.appendChild(span1);
        document.getElementById(span1.id).classList.add("input-array-f");
        document.getElementById(span1.id).contentEditable = "true";
        span1.maxLength = "10";
        span1.setAttribute("role", "textbox");
        span1.innerHTML = text;

        var div5 = document.createElement("div");
        div5.id = "div5_" + data + temp;
        div.appendChild(div5);
        div5.innerHTML = aText;
        document.getElementById(div5.id).classList.add("text-array-after-f");
      }

      // Equal Sign
      var equal = document.createElement("div");
      equal.id = "equal_" + data + temp;
      div.appendChild(equal);
      equal.innerHTML = "=";
      document
        .getElementById(equal.id)
        .classList.add("square-round-box-short-f");

      // InputBox
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

      this.style_arrow(board, div);
    },

    style_condition(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.condition += 1;
      var div = document.createElement("div");
      div.id = data + this.condition;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("display-f");
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var img = document.createElement("img");
      img.id = "img" + this.condition;
      img.src = conditionPic;
      img.setAttribute("width", "250px");
      div.appendChild(img);
      document.getElementById(img.id).classList.add("diamond-img-f");

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
      var drop2 = document.createElement("div");
      drop2.id = "drop2_" + data + this.condition;
      div2.appendChild(drop2);
      document.getElementById(drop2.id).classList.add("custom-select-f");

      var select2 = document.createElement("select");
      select2.id = "select2_" + data + this.condition;
      for (const val of op_compare) {
        var option2 = document.createElement("option");
        option2.value = val;
        option2.text = val;
        select2.appendChild(option2);
      }
      document.getElementById(drop2.id).appendChild(select2);
      document.getElementById(select2.id).classList.add("dropdown-round-f");

      var tri2 = document.createElement("div");
      tri2.id = "tri2_" + data + this.condition;
      drop2.appendChild(tri2);
      document.getElementById(tri2.id).classList.add("triangle-green");

      var span = document.createElement("span");
      span.id = "span_" + data + this.condition;
      div2.appendChild(span);
      document.getElementById(span.id).classList.add("input-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "text";

      this.style_arrow(board, div);
    },

    style_function(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.declareFunc += 1;
      var div = document.createElement("div");
      div.id = data + this.declareFunc;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      document.getElementById(div.id).style.borderRadius = "50px";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var span = document.createElement("span");
      span.id = "span_" + data + this.declareFunc;
      div.appendChild(span);
      document.getElementById(span.id).classList.add("input-f");
      document.getElementById(span.id).contentEditable = "true";
      span.setAttribute("role", "textbox");
      span.innerHTML = "Function";

      this.style_arrow(board, div);
    },

    style_callFunction(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.callFunc += 1;

      var div = document.createElement("div");
      div.id = data + this.callFunc;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      document.getElementById(div.id).style.height = "35px";
      document.getElementById(div.id).style.justifyContent = "space-between";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

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

      this.style_arrow(board, div);
    },

    style_maxminFunction(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      var temp = 0;
      var optionChoose = "";

      if (data == "maxmin_function") {
        this.maxminFunc += 1;
        temp = this.maxminFunc;
        optionChoose = op_maxmin;
      } else if (data == "pushpop_function") {
        this.pushpopFunc += 1;
        temp = this.pushpopFunc;
        optionChoose = op_pushpop;
      } else {
        this.queueFunc += 1;
        temp = this.queueFunc;
        optionChoose = op_queue;
      }

      var div = document.createElement("div");
      div.id = data + temp;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var drop = document.createElement("div");
      drop.id = "drop_" + data + temp;
      div.appendChild(drop);
      document.getElementById(drop.id).classList.add("custom-select-f");

      var select = document.createElement("select");
      select.id = "select_" + data + temp;
      for (const val of optionChoose) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      document.getElementById(drop.id).appendChild(select);
      document.getElementById(select.id).classList.add("dropdown-round-f");

      var tri = document.createElement("div");
      tri.id = "tri_" + data + temp;
      drop.appendChild(tri);
      document.getElementById(tri.id).classList.add("triangle-purple");

      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + temp;
      div.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");

      var select1 = document.createElement("select");
      select1.id = "select1_" + data + temp;
      for (const val of this.variable) {
        var option1 = document.createElement("option");
        option1.value = val;
        option1.text = val;
        select1.appendChild(option1);
      }
      document.getElementById(drop1.id).appendChild(select1);
      document.getElementById(select1.id).classList.add("dropdown-f");

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + temp;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      this.style_arrow(board, div);
    },

    style_sortFunction(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      var temp = 0;
      var text = "";

      if (data == "sort_function") {
        this.sortFunc += 1;
        temp = this.sortFunc;
        text = "SORT";
      } else if (data == "length_function") {
        this.lengthFunc += 1;
        temp = this.lengthFunc;
        text = "LENGTH";
      } else if (data == "floor_function") {
        this.floorFunc += 1;
        temp = this.floorFunc;
        text = "FLOOR";
      } else {
        this.roundFunc += 1;
        temp = this.roundFunc;
        text = "ROUND";
      }

      var div = document.createElement("div");
      div.id = data + temp;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var div2 = document.createElement("div");
      div2.id = "div2_" + data + temp;
      div.appendChild(div2);
      div2.innerHTML = text;
      document.getElementById(div2.id).classList.add("text-f");

      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + temp;
      div.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");

      var select1 = document.createElement("select");
      select1.id = "select1_" + data + temp;
      for (const val of this.variable) {
        var option1 = document.createElement("option");
        option1.value = val;
        option1.text = val;
        select1.appendChild(option1);
      }
      document.getElementById(drop1.id).appendChild(select1);
      document.getElementById(select1.id).classList.add("dropdown-f");

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + temp;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      this.style_arrow(board, div);
    },
    style_swapFunction(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      var temp = 0;
      var text = "";
      var text2 = "";

      if (data == "swap_function") {
        this.swapFunc += 1;
        temp = this.swapFunc;
        text = "SWAP";
        text2 = "and";
      } else {
        this.squareRootFunc += 1;
        temp = this.squareRootFunc;
        text = "RANDOM from";
        text2 = "to";
      }

      var div = document.createElement("div");
      div.id = data + temp;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var div2 = document.createElement("div");
      div2.id = "div2_" + data + temp;
      div.appendChild(div2);
      div2.innerHTML = text;
      document.getElementById(div2.id).classList.add("text-f");

      if (data == "swap_function") {
        var drop1 = document.createElement("div");
        drop1.id = "drop1_" + data + temp;
        div.appendChild(drop1);
        document.getElementById(drop1.id).classList.add("custom-select-f");

        var select1 = document.createElement("select");
        select1.id = "select1_" + data + temp;
        for (const val of this.variable) {
          var option1 = document.createElement("option");
          option1.value = val;
          option1.text = val;
          select1.appendChild(option1);
        }
        document.getElementById(drop1.id).appendChild(select1);
        document.getElementById(select1.id).classList.add("dropdown-f");

        var tri1 = document.createElement("div");
        tri1.id = "tri1_" + data + temp;
        drop1.appendChild(tri1);
        document.getElementById(tri1.id).classList.add("triangle-purple");
      } else {
        var span = document.createElement("span");
        span.id = "span_" + data + temp;
        div.appendChild(span);
        document.getElementById(span.id).classList.add("input-f");
        document.getElementById(span.id).contentEditable = "true";
        span.setAttribute("role", "textbox");
        span.innerHTML = "0";
      }

      var div3 = document.createElement("div");
      div3.id = "div3_" + data + temp;
      div.appendChild(div3);
      div3.innerHTML = text2;
      document.getElementById(div3.id).classList.add("text-f");

      if (data == "swap_function") {
        var drop2 = document.createElement("div");
        drop2.id = "drop2_" + data + temp;
        div.appendChild(drop2);
        document.getElementById(drop2.id).classList.add("custom-select-f");

        var select2 = document.createElement("select");
        select2.id = "select2_" + data + temp;
        for (const val of this.variable) {
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
        document.getElementById(tri2.id).classList.add("triangle-purple");
      } else {
        var span1 = document.createElement("span");
        span1.id = "span1_" + data + temp;
        div.appendChild(span1);
        document.getElementById(span1.id).classList.add("input-f");
        document.getElementById(span1.id).contentEditable = "true";
        span1.setAttribute("role", "textbox");
        span1.innerHTML = "10";
      }

      this.style_arrow(board, div);
    },

    style_squareRootFunction(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.squareRootFunc += 1;

      var div = document.createElement("div");
      div.id = data + this.squareRootFunc;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      document.getElementById(div.id).classList.add("square-box-long-f");
      document.getElementById(div.id).style.background = "#B09CFF";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var div2 = document.createElement("div");
      div2.id = "div2_" + this.squareRootFunc;
      div.appendChild(div2);
      div2.innerHTML = "SQUARE ROOT";
      document.getElementById(div2.id).classList.add("text-f");

      var div4 = document.createElement("div");
      div4.id = "div4_" + this.squareRootFunc;
      div.appendChild(div4);
      div4.innerHTML = "(";
      document.getElementById(div4.id).classList.add("text-declare-before-f");

      var span2 = document.createElement("span");
      span2.id = "span2_" + this.squareRootFunc;
      div.appendChild(span2);
      document.getElementById(span2.id).classList.add("input-declare-f");
      document.getElementById(span2.id).contentEditable = "true";
      span2.setAttribute("role", "textbox");
      span2.innerHTML = "";

      var div3 = document.createElement("div");
      div3.id = "div3_" + this.squareRootFunc;
      div.appendChild(div3);
      div3.innerHTML = ")";
      document.getElementById(div3.id).classList.add("text-declare-after-f");

      this.style_arrow(board, div);
    },

    style_connector(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.connector += 1;
      var div = document.createElement("div");
      div.id = "div_" + data + this.connector;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }

      var div1 = document.createElement("div");
      div1.id = "div1_" + data + this.connector;
      div.appendChild(div1);
      document.getElementById(div1.id).classList.add("circle-f");
      this.style_arrow(board, div);
    },

    style_textbox() {
      // var div4 = document.createElement("div");
      // div4.id = "div4_" + data + temp;
      // div.appendChild(div4);
      // var div4 = document.createElement("div");
      // div4.id = "div4_" + data + temp;
      // div.appendChild(div4);
      // div4.innerHTML = bText;
      // document.getElementById(div4.id).classList.add("text-declare-before-f");
      // var span2 = document.createElement("span");
      // span2.id = "span2_" + data + temp;
      // div.appendChild(span2);
      // document.getElementById(span2.id).classList.add("input-declare-f");
      // document.getElementById(span2.id).contentEditable = "true";
      // span2.setAttribute("role", "textbox");
      // span2.innerHTML = text;
      // var div5 = document.createElement("div");
      // div5.id = "div5_" + data + temp;
      // div.appendChild(div5);
      // div5.innerHTML = aText;
      // document.getElementById(div5.id).classList.add("text-declare-after-f");
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
  padding-bottom: 50px;
}

.arrow-container {
  display: flex;
  justify-content: center;
  width: 100%;
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

.dropdown-function {
  background: var(--dark-blue-1);
  border-radius: 10px;
  border: 0px solid rgb(0 0 0 / 0%);
  color: white;
  outline: none;
}
.dropdown-item {
  color: #ffffff;
  font-weight: 500;
}
.dropdown-item:hover {
  background: var(--pink);
  border-radius: 5px;
}

.scrollarea {
  overflow-y: scroll;
  overflow-x: scroll;
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
