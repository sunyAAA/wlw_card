import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
require('vue2-animate/dist/vue2-animate.min.css')
Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
