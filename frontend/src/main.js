import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueParticles from "vue-particles";
import interact from "interactjs";

Vue.config.productionTip = false;

Vue.use(VueParticles);
// Vue.use(interact);

new Vue({
  router,
  store,
  interact,
  render: (h) => h(App),
}).$mount("#app");
