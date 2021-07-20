<template>
  <div id="container" style="box-shadow: 0px 5px 10px #91A0A5;">
    <a href="#">
      <i class="fas fa-undo-alt"></i>
    </a>
    <a href="#">
      <i class="fas fa-redo-alt"></i>
    </a>

    <a href="#">
      <i class="far fa-file-export"></i>
    </a>
    <div id="board" class="board" @dragover.prevent @drop.prevent="drop"></div>
    
    <a href="#">
      <i class="far fa-trash-alt"></i>
    </a>
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
  justify-content: center;
  height: 600px;
  width: 500px;
  /* margin-left: 65px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}

.board {
  height: 600px;
  width: 200px;
  border-radius: 10px;
  background-color: var(--white-gray);
}

.fa-undo-alt,
.fa-redo-alt {
  color: var(--gray);
  width: 20px;
  margin: 10px 0 0 10px;
}
.fa-trash-alt {
  color: var(--gray);
  width: 30px;
  margin: 10px 0 0 10px;
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
</style>
