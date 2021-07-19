<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap");

:root {
  --blue: #17435c;
  --dark-blue: #062b41;
  --pink: #f26780;
  --white-gray: #e3e8eb;
  --gray: #858585;
}

html,
body {
  font-family: "Roboto Mono", monospace;
}

body {
  background-color: var(--blue);
}

#app {
  font-family: "Roboto Mono", monospace;
}
</style>
