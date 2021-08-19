<template>
  <div
    id="container"
    style="box-shadow: 0px 5px 10px #91A0A5; background: var(--white-gray);"
  >
    <div id="tool-container" class="tool-container">
      <div class="top-toolbar">
        <div>
          <a style="cursor:pointer;">
            <i class="fas fa-undo-alt"></i>
          </a>
          <a style="cursor:pointer;">
            <i class="fas fa-redo-alt"></i>
          </a>
        </div>

        <div style="display:flex; align-items:center; margin-right:25px">
            <select class="dropdown-function">
              <option class="dropdown-item " v-for="(test, i) in test" :key="i">{{
                test
              }}</option>
            </select>
          <div class="triangle-down"></div>
        </div>

        <div>
          <a v-if="this.expand == false" style="cursor:pointer;">
            <i @click="clickExpand" class="fas fa-expand"></i>
          </a>
          <a v-else style="cursor:pointer;">
            <i @click="clickExpand" class="fas fa-compress"></i>
          </a>
        </div>
      </div>

      <!-- Trash and export -->
      <div class="side-toolbar-container" v-if="moveMode == false">
        <div class="side-toolbar">
          <a
            @dragover.prevent="isHover = true"
            @dragleave="isHover = false"
            @drop.prevent="deleteObject"
            style="padding-left: 50px"
          >
            <i
              id="trash"
              class="far fa-trash-alt"
              :class="{ trashHover: isHover }"
            ></i>
          </a>
          <a style="cursor:pointer; margin-top:15px; padding-left: 50px">
            <i class="fas fa-file-export"></i>
          </a>
        </div>
      </div>
      <!-- On Move Mode -->
      <div v-else class="side-toolbar-container" style="z-index:2;">
        <div class="side-toolbar">
          <a
            @dragover.prevent="isHover = true"
            @dragleave="isHover = false"
            @drop.prevent="deleteElement"
            style="padding-left: 50px"
          >
            <i
              id="trash"
              class="far fa-trash-alt"
              :class="{ trashHover: isHover }"
            ></i>
          </a>
          <a style="cursor:pointer; margin-top:15px">
            <i class="fas fa-file-export"></i>
          </a>
        </div>
      </div>

      <div class="move-element">
        <i
          v-if="moveMode == false"
          @click="clickMove"
          class="fas fa-arrows-alt"
        ></i>
      </div>
      <div class="move-element">
        <i
          v-if="moveMode == true"
          @click="clickMove"
          class="far fa-times-circle"
        ></i>
      </div>

      <!-- Board -->
      <div id="divboard" class="board-box scrollarea ">
        <div
          id="board"
          @dragover.prevent
          @drop.prevent="dropOnBoard"
          class="board "
        >
          <div>
            <div class="terminator-f" style="margin:10px 0 0 0">
              <div class="text-f not-select">START</div>
            </div>
          </div>

          <div
            @dragover.prevent
            @drop.prevent="dropOnArrow"
            id="arrowSet1"
            class="arrow-container"
          >
            <img src="../assets/arrow.svg" height="30px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as boardScript from "../js/board.js";
// const displayPic = require("../assets/sidebar/display-green.svg");
const conditionPic = require("../assets/sidebar/condition.svg");
const arrow = require("../assets/arrow.svg");
const arrowLong = require("../assets/arrowLong.svg");
const arrowLongLeft = require("../assets/arrowLongLeft.svg");

const op_calculate = ["+", "-", "*", "/", "%", "^"];
const op_compare = ["==", "<", ">", "!="];
const op_connect = ["AND", "OR", "NOT"];
const op_maxmin = ["Max", "Min"];
const op_pushpop = ["Push", "Pop"];
const op_queue = ["Enqueue", "dequeue"];

const elemObName = [
  "select_condition",
  "selectTwo_condition",
  "textareacondition",
  "textarea_text_int",
  "select_assign_int",
  "textareaI_assign_int",
  "select_assign_string",
  "select_assign_array",
  "textarea_assign_array",
  "textareaI_assign_string",
  "beforeA_assign_array",
  "afterA_assign_array",
  "textareaInAA_assign_array",
  "before_text_string",
  "textarea_text_string",
  "after_text_string",
  "before_text_array",
  "textarea_text_array",
  "after_text_array",
  "selectv_variable_drop",
  "select_op_calculate",
  "select_op_connect",
  "select_op_compare",
];

export default {
  name: "board",

  data() {
    return {
      boardScript,
      isHover: false,
      moveMode: false,
      expand: false,
      arrow: 1,
      variable: ["x", "y", "z"],
      test: ["main","function", "function"],
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
      textString: 0,
      textInt: 0,
      textArray: 0,
      variableDrop: 0,
      opCalculate: 0,
      opEqual: 0,
      opCompare: 0,
      opConnect: 0,
      m_pos: null,
    };
  },

  mounted() {
    // Resize Board
    const panel = document.getElementById("container");

    panel.addEventListener(
      "mousedown",
      function(e) {
        var BORDER_SIZE = document.getElementById("container").offsetWidth;

        if (e.offsetX > BORDER_SIZE - 4) {
          this.m_pos = e.x;
          document.addEventListener("mousemove", this.resize, false);
        }
      }.bind(this),
      false
    );

    document.addEventListener(
      "mouseup",
      function() {
        document.removeEventListener("mousemove", this.resize, false);
      }.bind(this),
      false
    );
  },

  methods: {
    scrollLeft() {
      const board = document.getElementById("board");
      let translate = 0;
      translate += 400;
      board.style.transform = "translateX(" + translate + "px" + ")";

      board.scrollIntoView({ block: "center" });
    },

    resize(e) {
      const panel = document.getElementById("container");
      const dx = this.m_pos - e.x;
      this.m_pos = e.x;
      panel.style.width =
        parseInt(getComputedStyle(panel, "").width) - dx + "px";
    },

    clickMove() {
      this.moveMode = !this.moveMode;
      var board = document.getElementById("board");

      if (this.moveMode) {
        var popUp = document.createElement("div");
        board.appendChild(popUp);
        popUp.classList.add("popup");
        popUp.id = "popup";
        popUp.style.cssText = "height:" + board.scrollHeight + "px";
        popUp.style.width = board.scrollWidth + 460 + "px";
      } else {
        var popUpBlack = document.getElementById("popup");
        board.removeChild(popUpBlack);
      }
    },
    clickExpand() {
      this.expand = !this.expand;
    },

    enableMove(element, type) {
      if (this.moveMode) {
        element.draggable = true;
        if (type == "dropdown") {
          element.disabled = true;
        }
      } else {
        element.draggable = false;
        if (type == "dropdown") {
          element.disabled = false;
        }
      }
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

      if (e.target.id == "board" && lastChild != "end2") {
        this.choose_style(board, data, lastChild);
      }
    },

    dropOnArrow(e) {
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

    dropFuncObject(object, type) {
      object.ondragstart = function(e) {
        e.dataTransfer.setData("type", type);
      }.bind(this);

      object.ondragover = function(e) {
        e.preventDefault();
      };

      object.ondrop = function(e) {
        e.preventDefault();
        console.log(e.target);
        this.dropOnObject(e);
      }.bind(this);
    },

    dropOnObject(e) {
      var i = 0;
      var check = false;
      var type = e.dataTransfer.getData("type");
      var data = e.dataTransfer.getData("object_id");
      var myData = data.split(/([0-9]+)/);
      var target = document.getElementById(e.target.id);
      var myTarget = e.target.id.split(/([0-9]+)/);
      var ob_name = myTarget[0];
      console.log(ob_name);
      while (i < elemObName.length) {
        if (ob_name == elemObName[i]) {
          ob_name = target.parentNode;
          check = true;
          break;
        }
        i++;
      }

      if (check == false) {
        ob_name = document.getElementById(e.target.id);
      }

      var parentOb = ob_name.parentNode;
      var nextElement = ob_name.nextElementSibling;

      // From sidebar
      if (myData.length == 1) {
        this.create_style_element(data, parentOb, nextElement);
      }
      // Swap Element
      else {
        this.moveElement(type, data, parentOb, nextElement);
      }
    },

    create_style_element(data, parentOb, nextElement) {
      if (data == "text_int" || data == "text_string" || data == "text_array") {
        this.style_text(data, parentOb, nextElement);
      } else if (data == "variable_drop") {
        this.style_variable(data, parentOb, nextElement);
      } else if (data == "op_calculate" || data == "op_equal") {
        this.style_operator(data, parentOb, nextElement);
      }

      if (data == "op_compare" || data == "op_connect") {
        this.style_operator(data, parentOb, nextElement);
      }
    },

    moveElement(type, data, parentOb, nextElement) {
      var object = document.getElementById(data);

      if (type == "dropdown") {
        object = object.parentNode;
      }

      if (nextElement == null) {
        parentOb.appendChild(object);
      } else if (object.id != nextElement.id) {
        parentOb.insertBefore(object, nextElement);
      }
    },

    deleteObject(e) {
      this.isHover = false;
      var data = e.dataTransfer.getData("object_id");
      var object = document.getElementById(data);
      var board = document.getElementById("board");
      var arrow = object.nextElementSibling;

      board.removeChild(object);
      board.removeChild(arrow);
    },

    deleteElement(e) {
      this.isHover = false;
      var data = e.dataTransfer.getData("object_id");
      var object = document.getElementById(data);
      var parent = object.parentNode;

      parent.removeChild(object);
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

      div.classList.add("arrow-container-f");
      div.classList.add("not-select");

      div.ondragover = function(event) {
        event.preventDefault();
      };
      div.ondrop = function(event) {
        event.preventDefault();
        this.dropOnArrow(event);
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
        data == "maxmin_fn" ||
        data == "pushpop_function" ||
        data == "queue_function"
      ) {
        this.style_maxminFunction(board, data, arrow_target);
      }
      if (
        data == "sort_fn" ||
        data == "length_fn" ||
        data == "floor_fn" ||
        data == "round_fn"
      ) {
        this.style_sortFunction(board, data, arrow_target);
      }
      if (data == "swap_fn" || data == "random_fn") {
        this.style_swapFunction(board, data, arrow_target);
      }
      if (data == "sq_fn") {
        this.style_squareRootFunction(board, data, arrow_target);
      }
    },

    autosizeTextArea(textarea) {
      var el = textarea;
      setTimeout(function() {
        el.style.cssText = "height:auto; padding:0";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    },

    style_terminator(board, data, arrow) {
      var arrow_target = document.getElementById(arrow);
      var nextElement = arrow_target.nextElementSibling;

      this.terminator += 1;
      var div = document.createElement("div");
      div.id = "end" + this.terminator;
      if (nextElement == null) {
        board.appendChild(div);
      } else {
        board.insertBefore(div, nextElement);
      }
      var div1 = document.createElement("div");
      div1.id = "div1_" + this.terminator;
      div.appendChild(div1);
      div1.classList.add("terminator-f");
      div1.classList.add("not-select");

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

        var div6 = document.createElement("div");
        div6.id = "div6_" + data + temp;
        div1.appendChild(div6);

        var textarea = document.createElement("textarea");
        textarea.id = "textarea_" + data + temp;
        div1.appendChild(textarea);
        document.getElementById(textarea.id).classList.add("textarea");
        document.getElementById(textarea.id).contentEditable = "true";
        textarea.placeholder = "Text";
        textarea.rows = "1";
        textarea.oninput = function(event) {
          this.autosizeTextArea(event.target);
        }.bind(this);

        var div5 = document.createElement("div");
        div5.id = "div5_" + data + temp;
        div1.appendChild(div5);
        div5.innerHTML = "&#8221";
        document.getElementById(div5.id).classList.add("text-declare-after-f");
      }

      // Dropdown
      var drop1 = document.createElement("div");
      drop1.id = "drop1_" + data + temp;
      div1.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");
      this.dropFuncObject(drop1, "dropdown");

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

      // var img = document.createElement("img");
      // img.id = "img" + data + this.display;
      // img.src = displayPic;
      // img.setAttribute("width", "200px");
      // div.appendChild(img);

      var triLeft = document.createElement("div");
      triLeft.id = "triLeft" + data + this.display;
      div.appendChild(triLeft);
      document.getElementById(triLeft.id).classList.add("triangle-left-f");

      var square = document.createElement("div");
      square.id = "square" + data + this.display;
      div.appendChild(square);
      document.getElementById(square.id).classList.add("square-round-f");

      var textarea = document.createElement("textarea");
      textarea.id = "textarea" + data + this.display;
      square.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea-1-long-row");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.innerHTML = "";
      textarea.rows = "1";

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
      } else if (data == "declare_string") {
        this.declare_string += 1;
        temp = this.declare_string;
        text = "Text";
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

      var textarea = document.createElement("textarea");
      textarea.id = "textarea" + data + temp;
      div.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.placeholder = "x";
      textarea.draggable = true;
      textarea.rows = "1";
      this.autosizeTextArea(textarea);
      textarea.oninput = function(e) {
        e.stopPropagation();
        this.autosizeTextArea(e.target);
      }.bind(this);

      textarea.ondrag = function(e) {
        e.stopPropagation();
      }.bind(this);

      if (data == "declare_int" || data == "declare_string") {
        var div3 = document.createElement("div");
        div3.id = "div3_" + data + temp;
        div.appendChild(div3);
        div3.innerHTML = "=";
        document.getElementById(div3.id).classList.add("text-f");
      }

      var divTextarea = document.createElement("div");
      divTextarea.id = "divTextarea_" + data + temp;
      div.appendChild(divTextarea);
      document
        .getElementById(divTextarea.id)
        .classList.add("textbox-variable-f");

      var div4 = document.createElement("div");
      div4.id = "div4_" + data + temp;
      divTextarea.appendChild(div4);
      div4.innerHTML = bText;
      document.getElementById(div4.id).classList.add("text-declare-before-f");

      var textarea2 = document.createElement("textarea");
      textarea2.id = "textarea2_" + data + temp;
      divTextarea.appendChild(textarea2);

      if (data == "declare_array") {
        document.getElementById(textarea2.id).classList.add("textarea-array");
        textarea2.maxLength = "9";
      } else {
        document.getElementById(textarea2.id).classList.add("textarea");
      }
      document.getElementById(textarea2.id).contentEditable = "true";
      textarea2.placeholder = text;
      textarea2.rows = "1";
      textarea2.oninput = function(event) {
        this.autosizeTextArea(event.target);
      }.bind(this);

      var div5 = document.createElement("div");
      div5.id = "div5_" + data + temp;
      divTextarea.appendChild(div5);
      div5.innerHTML = aText;
      document.getElementById(div5.id).classList.add("text-declare-after-f");
      document.getElementById(div5.id).classList.add("box-inlne");

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
        text = "Text";
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
      document.getElementById(div.id).style.zIndex = "1";
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      if (data == "assign_array") {
        var store = document.createElement("div");
        div.appendChild(store);
        store.innerHTML = "Store";
        store.classList.add("text-f");
      }

      // Dropdown1
      var drop1 = document.createElement("div");
      drop1.id = "dropOne_" + data + temp;
      div.appendChild(drop1);
      document.getElementById(drop1.id).classList.add("custom-select-f");
      document.getElementById(drop1.id).classList.add("box-inline");

      var select = document.createElement("select");
      select.id = "select_" + data + temp;
      for (const val of this.variable) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      drop1.appendChild(select);
      select.classList.add("dropdown-f");

      var tri1 = document.createElement("div");
      tri1.id = "triOne_" + data + temp;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      if (data == "assign_array") {
        var divTextarea_array = document.createElement("div");
        divTextarea_array.id = "divTextareaA_" + data + temp;
        div.appendChild(divTextarea_array);
        document
          .getElementById(divTextarea_array.id)
          .classList.add("box-inline");

        var container_array = document.createElement("div");
        container_array.id = "container_array_" + data + temp;
        divTextarea_array.appendChild(container_array);
        document
          .getElementById(container_array.id)
          .classList.add("textbox-variable-f");

        var before = document.createElement("div");
        before.id = "beforeA_" + data + temp;
        container_array.appendChild(before);
        before.innerHTML = bText;
        document
          .getElementById(before.id)
          .classList.add("text-declare-before-f");

        var textarea = document.createElement("textarea");
        textarea.id = "textarea_" + data + temp;
        container_array.appendChild(textarea);
        document.getElementById(textarea.id).classList.add("textarea-array");
        document.getElementById(textarea.id).contentEditable = "true";
        textarea.maxLength = "9";
        textarea.rows = "1";
        textarea.placeholder = text;
        textarea.oninput = function(event) {
          this.autosizeTextArea(event.target);
        }.bind(this);

        var after = document.createElement("div");
        after.id = "afterA_" + data + temp;
        container_array.appendChild(after);
        after.innerHTML = aText;
        document.getElementById(after.id).classList.add("text-declare-after-f");
      }

      // Equal Sign
      var equal = document.createElement("div");
      equal.id = "equal_" + data + temp;
      div.appendChild(equal);
      equal.innerHTML = "=";
      document
        .getElementById(equal.id)
        .classList.add("square-round-box-short-f");
      this.dropFuncObject(equal, "text");

      // InputBox
      if (data == "assign_int" || data == "assign_string") {
        var divTextarea = document.createElement("div");
        divTextarea.id = "divTextarea_" + data + temp;
        div.appendChild(divTextarea);
        document
          .getElementById(divTextarea.id)
          .classList.add("textbox-variable-f");
        this.dropFuncObject(divTextarea, "text");
        divTextarea.addEventListener(
          "mousedown",
          function() {
            this.enableMove(divTextarea, "text");
          }.bind(this),
          false
        );

        var beforeI = document.createElement("div");
        beforeI.id = "beforeI_" + data + temp;
        divTextarea.appendChild(beforeI);
        beforeI.innerHTML = bText;
        document
          .getElementById(beforeI.id)
          .classList.add("text-declare-before-f");

        var textarea1 = document.createElement("textarea");
        textarea1.id = "textareaI_" + data + temp;
        divTextarea.appendChild(textarea1);
        document.getElementById(textarea1.id).classList.add("textarea");
        document.getElementById(textarea1.id).contentEditable = "true";
        textarea1.placeholder = text;
        textarea1.rows = "1";
        textarea1.oninput = function(event) {
          this.autosizeTextArea(event.target);
        }.bind(this);

        var afterI = document.createElement("div");
        afterI.id = "afterI_" + data + temp;
        divTextarea.appendChild(afterI);
        afterI.innerHTML = aText;
        document
          .getElementById(afterI.id)
          .classList.add("text-declare-after-f");
      } else {
        var divTextarea2 = document.createElement("div");
        divTextarea2.id = "textareaAA_" + data + temp;
        div.appendChild(divTextarea2);
        document.getElementById(divTextarea2.id).classList.add("box-inline");
        document.getElementById(divTextarea2.id).contentEditable = "true";
        this.dropFuncObject(divTextarea2, "text");
        divTextarea2.addEventListener(
          "mousedown",
          function() {
            this.enableMove(divTextarea2, "text");
          }.bind(this),
          false
        );

        var textarea3 = document.createElement("textarea");
        textarea3.id = "textareaInAA_" + data + temp;
        divTextarea2.appendChild(textarea3);
        document.getElementById(textarea3.id).classList.add("textarea");
        document.getElementById(textarea3.id).contentEditable = "true";
        document.getElementById(textarea3.id).style.margin = "3px 3px";
        textarea3.placeholder = "Text";
        textarea3.rows = "1";
        textarea3.oninput = function(event) {
          this.autosizeTextArea(event.target);
        }.bind(this);
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
      document.getElementById(div.id).classList.add("diamond-img-f");
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      // var img = document.createElement("img");
      // img.id = "img" + this.condition;
      // img.src = conditionPic;
      // img.setAttribute("width", "250px");
      // div.appendChild(img);
      // document.getElementById(img.id).classList.add("diamond-img-f");

      var imgLeft = document.createElement("img");
      imgLeft.id = "arrowLongLeft" + this.arrow;
      imgLeft.src = arrowLongLeft;
      imgLeft.setAttribute("height", "65px");
      div.appendChild(imgLeft);
      document.getElementById(imgLeft.id).classList.add("diamond-long-arrow");
      document.getElementById(imgLeft.id).style.marginLeft = "200px";

      var diamondDiv = document.createElement("div");
      diamondDiv.id = "diamondDiv_" + data + this.condition;
      div.appendChild(diamondDiv);
      document.getElementById(diamondDiv.id).classList.add("diamond-box");
      // document.getElementById(diamondDiv.id).style.zIndex = "1";

      var img = document.createElement("img");
      img.id = "arrowLong" + this.arrow;
      img.src = arrowLong;
      img.setAttribute("height", "65px");
      div.appendChild(img);
      document.getElementById(img.id).classList.add("diamond-long-arrow");
      document.getElementById(img.id).style.marginRight = "200px";

      var diamondAll = document.createElement("div");
      diamondAll.id = "diamondAll_" + data + this.condition;
      diamondDiv.appendChild(diamondAll);
      document.getElementById(diamondAll.id).classList.add("diamond-all");

      var condition = document.createElement("div");
      condition.id = "condition_" + data + this.condition;
      diamondAll.appendChild(condition);
      document.getElementById(condition.id).classList.add("diamond-square-box");

      var div2 = document.createElement("div");
      div2.id = "item_" + this.condition;
      diamondAll.appendChild(div2);
      document.getElementById(div2.id).classList.add("diamond-item-f");

      // Dropdown
      var drop1 = document.createElement("div");
      drop1.id = "drop_" + data + this.condition;
      div2.appendChild(drop1);
      drop1.classList.add("custom-select-f");
      drop1.classList.add("box-inline");
      this.dropFuncObject(drop1, "dropdown");

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
      tri1.id = "tri_" + data + this.condition;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");

      // Dropdown
      var drop2 = document.createElement("div");
      drop2.id = "dropTwo_" + data + this.condition;
      div2.appendChild(drop2);
      document.getElementById(drop2.id).classList.add("custom-select-f");
      document.getElementById(drop2.id).classList.add("box-inline");
      this.dropFuncObject(drop2, "dropdown");

      var select2 = document.createElement("select");
      select2.id = "selectTwo_" + data + this.condition;
      for (const val of op_compare) {
        var option2 = document.createElement("option");
        option2.value = val;
        option2.text = val;
        select2.appendChild(option2);
      }
      document.getElementById(drop2.id).appendChild(select2);
      document.getElementById(select2.id).classList.add("dropdown-round-f");

      var tri2 = document.createElement("div");
      tri2.id = "triTwo_" + data + this.condition;
      drop2.appendChild(tri2);
      document.getElementById(tri2.id).classList.add("triangle-green");

      var divTextarea = document.createElement("div");
      divTextarea.id = "textareaAA_" + data + this.condition;
      div2.appendChild(divTextarea);
      document.getElementById(divTextarea.id).classList.add("box-inline");
      document.getElementById(divTextarea.id).contentEditable = "true";
      document.getElementById(divTextarea.id).style.zIndex = "1";
      document.getElementById(divTextarea.id).style.marginLeft = "5px";
      this.dropFuncObject(divTextarea, "text");

      var textarea = document.createElement("textarea");
      textarea.id = "textarea" + data + this.condition;
      divTextarea.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.rows = "1";
      textarea.placeholder = "Text";

      textarea.addEventListener(
        "mousedown",
        function() {
          this.enableMove(textarea, "text");
        }.bind(this),
        false
      );
      var overflowSize = document.getElementById("board").scrollWidth;
      console.log("overflow", overflowSize);

      this.style_arrow(board, div);
      this.scrollLeft();
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

      var textarea = document.createElement("textarea");
      textarea.id = "textarea_" + data + this.declareFunc;
      div.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea-1-long-row");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.rows = "1";
      textarea.placeholder = "Function";

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
      document
        .getElementById(div.id)
        .classList.add("square-box-long-function-f");
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

      var drop = document.createElement("div");
      drop.id = "drop_" + data + this.callFunc;
      div.appendChild(drop);
      document.getElementById(drop.id).classList.add("custom-select-f");

      var select = document.createElement("select");
      select.id = "select_" + data + this.callFunc;
      for (const val of this.function) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        select.appendChild(option);
      }
      document.getElementById(drop.id).appendChild(select);
      document.getElementById(select.id).classList.add("dropdown-f");

      var tri = document.createElement("div");
      tri.id = "tri_" + data + this.callFunc;
      drop.appendChild(tri);
      document.getElementById(tri.id).classList.add("triangle-purple");

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

      if (data == "maxmin_fn") {
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
      document
        .getElementById(div.id)
        .classList.add("square-box-long-function-f");
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

      if (data == "sort_fn") {
        this.sortFunc += 1;
        temp = this.sortFunc;
        text = "SORT";
      } else if (data == "length_fn") {
        this.lengthFunc += 1;
        temp = this.lengthFunc;
        text = "LENGTH";
      } else if (data == "floor_fn") {
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
      document
        .getElementById(div.id)
        .classList.add("square-box-long-function-f");
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

      if (data == "swap_fn") {
        this.swapFunc += 1;
        temp = this.swapFunc;
        text = "SWAP";
        text2 = "and";
      } else {
        this.randomFunc += 1;
        temp = this.randomFunc;
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
      document
        .getElementById(div.id)
        .classList.add("square-box-long-function-f");
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

      if (data == "swap_fn") {
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
        var textarea = document.createElement("textarea");
        textarea.id = "textarea_" + data + temp;
        div.appendChild(textarea);
        document.getElementById(textarea.id).classList.add("textarea-array");
        document.getElementById(textarea.id).contentEditable = "true";
        textarea.rows = "1";
        textarea.placeholder = "1";
      }

      var div3 = document.createElement("div");
      div3.id = "div3_" + data + temp;
      div.appendChild(div3);
      div3.innerHTML = text2;
      document.getElementById(div3.id).classList.add("text-f");

      if (data == "swap_fn") {
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
        var textarea1 = document.createElement("textarea");
        textarea1.id = "textarea1_" + data + temp;
        div.appendChild(textarea1);
        document.getElementById(textarea1.id).classList.add("textarea-array");
        document.getElementById(textarea1.id).contentEditable = "true";
        textarea1.rows = "1";
        textarea1.placeholder = "10";
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
      document
        .getElementById(div.id)
        .classList.add("square-box-long-function-f");
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

      var textarea = document.createElement("textarea");
      textarea.id = "textarea_" + this.squareRootFunc;
      div.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.placeholder = "2+2";
      textarea.rows = "1";
      textarea.oninput = function(event) {
        this.autosizeTextArea(event.target);
      }.bind(this);

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
      document.getElementById(div.id).classList.add("display-f");
      div.draggable = "true";
      div.ondragstart = function(event) {
        var arrow_object = div.nextElementSibling.id;
        this.dragStart(event, arrow_object);
      }.bind(this);

      var connector = document.createElement("div");
      connector.id = "connector_" + data + this.connector;
      div.appendChild(connector);
      document.getElementById(connector.id).classList.add("circle-f");

      this.style_arrow(board, div);
    },

    style_text(data, parentOb, nextElement) {
      var temp = 0;
      var text = "";
      var bText = "";
      var aText = "";
      if (data == "text_int") {
        this.textInt += 1;
        temp = this.textInt;
        text = "0";
      } else if (data == "text_string") {
        this.textString += 1;
        temp = this.textString;
        text = "Text";
        bText = "&#8220";
        aText = "&#8221";
      } else {
        this.textArray += 1;
        temp = this.textArray;
        bText = "[";
        aText = "]";
      }

      var div = document.createElement("div");
      div.id = "div_" + data + temp;
      parentOb.insertBefore(div, nextElement);
      document.getElementById(div.id).classList.add("box-inline");
      document.getElementById(div.id).classList.add("textbox-variable-f");
      this.dropFuncObject(div, "text");
      div.addEventListener(
        "mousedown",
        function() {
          this.enableMove(div, "text");
        }.bind(this),
        false
      );

      var before = document.createElement("div");
      before.id = "before_" + data + temp;
      div.appendChild(before);
      before.innerHTML = bText;
      document.getElementById(before.id).classList.add("text-declare-before-f");

      var textarea = document.createElement("textarea");
      textarea.id = "textarea_" + data + temp;
      div.appendChild(textarea);
      document.getElementById(textarea.id).classList.add("textarea");
      document.getElementById(textarea.id).contentEditable = "true";
      textarea.placeholder = text;
      textarea.rows = "1";
      textarea.oninput = function(event) {
        this.autosizeTextArea(event.target);
      }.bind(this);

      var after = document.createElement("div");
      after.id = "after_" + data + temp;
      div.appendChild(after);
      after.innerHTML = aText;
      document.getElementById(after.id).classList.add("text-declare-after-f");
    },

    style_variable(data, parentOb, nextElement) {
      this.variableDrop += 1;

      // var div = document.createElement("div");
      // div.id = "div_" + data + this.variableDrop;
      // parentOb.insertBefore(div, nextElement);
      // document.getElementById(div.id).classList.add("box-inline");

      var drop1 = document.createElement("div");
      drop1.id = "dropd_" + data + this.variableDrop;
      parentOb.insertBefore(drop1, nextElement);
      document.getElementById(drop1.id).classList.add("custom-select-f");
      document.getElementById(drop1.id).classList.add("box-inline");

      var select1 = document.createElement("select");
      select1.id = "selectv_" + data + this.variableDrop;
      for (const val of this.variable) {
        var option1 = document.createElement("option");
        option1.value = val;
        option1.text = val;
        select1.appendChild(option1);
      }
      document.getElementById(drop1.id).appendChild(select1);
      document.getElementById(select1.id).classList.add("dropdown-f");
      this.dropFuncObject(select1, "dropdown");
      drop1.addEventListener(
        "mousedown",
        function() {
          this.enableMove(select1, "dropdown");
        }.bind(this),
        false
      );

      var tri1 = document.createElement("div");
      tri1.id = "tri1_" + data + this.variableDrop;
      drop1.appendChild(tri1);
      document.getElementById(tri1.id).classList.add("triangle-purple");
    },

    style_operator(data, parentOb, nextElement) {
      var temp = 0;
      var triColor = "";
      var op = "";

      if (data == "op_calculate") {
        this.opCalculate += 1;
        temp = this.opCalculate;
        triColor = "triangle-green";
        op = op_calculate;
      } else if (data == "op_compare") {
        this.opCompare += 1;
        temp = this.opCompare;
        triColor = "triangle-blue";
        op = op_compare;
      } else if (data == "op_connect") {
        this.opConnect += 1;
        temp = this.opConnect;
        triColor = "triangle-pink";
        op = op_connect;
      } else {
        this.opEqual += 1;
        temp = this.opEqual;
      }

      if (data == "op_equal") {
        var div = document.createElement("div");
        div.id = "div_" + data + temp;
        parentOb.insertBefore(div, nextElement);
        document.getElementById(div.id).classList.add("box-inline");

        var equalBox = document.createElement("div");
        equalBox.id = "equalBox_" + data + temp;
        div.appendChild(equalBox);
        document
          .getElementById(equalBox.id)
          .classList.add("square-round-box-short-f");
        equalBox.innerHTML = "=";

        div.addEventListener(
          "mousedown",
          function() {
            this.enableMove(equalBox, "text");
          }.bind(this),
          false
        );
      } else {
        var drop = document.createElement("div");
        drop.id = "drop_" + data + temp;
        parentOb.insertBefore(drop, nextElement);
        document.getElementById(drop.id).classList.add("custom-select-f");
        document.getElementById(drop.id).classList.add("box-inline");

        var select = document.createElement("select");
        select.id = "select_" + data + temp;
        for (const val of op) {
          var option = document.createElement("option");
          option.value = val;
          option.text = val;
          select.appendChild(option);
        }
        document.getElementById(drop.id).appendChild(select);
        document.getElementById(select.id).classList.add("dropdown-round-f");
        this.dropFuncObject(select, "dropdown");
        drop.addEventListener(
          "mousedown",
          function() {
            this.enableMove(select, "dropdown");
          }.bind(this),
          false
        );

        var tri = document.createElement("div");
        tri.id = "tri_" + data + temp;
        drop.appendChild(tri);
        document.getElementById(tri.id).classList.add(triColor);
      }
    },
  },
};
</script>

<style scoped>
@import "../css/flowchartSign.css";

html {
  height: 100%;
}

#container {
  display: flex;
  flex-direction: column;
  /* width: 550px; */
  width: 42vw;
  height: 90vh;
  min-width: 250px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: var(--white-gray);
  left: 0;
  padding-right: 1px;
  position: relative;
}

#container::after {
  position: absolute;
  content: "";
  width: 4px;
  height: 100%;
  right: 0;
  border-radius: 5px;
  cursor: ew-resize;
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

.move-element {
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 2%;
  z-index: 2;
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
  top: 86%;
  right: 0.5%;
  z-index: 2;
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
  background-color: rgba(0, 0, 0, 0);
  padding-bottom: 50px;
  position: relative;
  z-index: 1;
}
.board-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
.fa-expand:hover,
.fa-times-circle:hover {
  color: var(--gray);
}

.fa-arrows-alt {
  color: var(--gray);
  font-size: 20px;
}

.fa-arrows-alt:hover {
  color: #9b9b9b;
}

.fa-trash-alt,
.fa-file-export {
  color: var(--gray);
  margin-right: 10px;
  font-size: 25px;
}
.trashHover {
  color: red;
}
.fa-file-export:hover {
  color: green;
}
.fa-times-circle {
  font-size: 23px;
  color: white;
}

.dropdown-function {
  background: var(--dark-blue-1);
  border-radius: 10px;
  border: 0px;
  color: white;
  outline: none;
  -webkit-appearance: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.tri-function {
  width: 0;
  height: 0;
  position: absolute;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid #5d9d83;
  top: 45%;
  right: 10%;
  pointer-events: none;
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

/* scrollbar width */
::-webkit-scrollbar {
  width: 0;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #7ca3b2;
  width: 1px;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #7c99a5;
  border-radius: 10px;
}

.fw-semibold {
  font-weight: 600;
}
.lh-tight {
  line-height: 1.25;
}

/* @media screen and (max-width: 1500px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 725px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1440px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 700px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1320px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 675px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1220px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1120px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 325px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
}

@media screen and (max-width: 1050px) {
  #container {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 650px;
    border-radius: 5px;
    background-color: var(--white-gray);
  }
} */
</style>
