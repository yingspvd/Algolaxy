<template>
  <div id="container">
    <a href="#">
      <i class="fas fa-undo-alt"></i>
    </a>
    <a href="#">
      <i class="fas fa-redo-alt"></i>
    </a>
    <div id="board" class="board" @dragover.prevent @drop.prevent="drop"></div>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {
      checkDiv: 0,
    };
  },
  created() {},
  methods: {
    drop: (e) => {
      var data = e.dataTransfer.getData("object_id");
      var newObject = document.getElementById(data).cloneNode(true);
      var board = document.getElementById("board");

      board.insertBefore(newObject, board.childNodes[0]);
      console.log(board);
    },
  },
};
</script>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  height: 500px;
  width: 500px;
  margin-left: 100px;
  border-radius: 10px;
  background-color: var(--white-gray);
}

.board {
  height: 500px;
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
</style>
