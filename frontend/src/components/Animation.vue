<template>
  <div id="container" style="box-shadow: 0px 5px 10px #91A0A5;">
    <div class="tool-box">
      <div class="tool-bottom">
        <button>back</button>
        <button>stop</button>
        <button>play</button>
        <button>pause</button>
        <button>next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#container {
  height: 600px;
  width: 500px;
  /* margin-left: 20px; */
  border-radius: 5px;
  background-color: var(--white-gray);
}
.tool-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.tool-bottom {
  display: flex;
  justify-content: space-around;
}
</style>
