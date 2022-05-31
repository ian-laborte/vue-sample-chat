import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueChatScroll from 'vue-chat-scroll';


Vue.use(VueChatScroll);
Vue.config.productionTip = false;
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
});
new Vue({
  router,
  store,
  vuetify,
  el: "#app", 
  render: h => h(App)
}).$mount('#app');
