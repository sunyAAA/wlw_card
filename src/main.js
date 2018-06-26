import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueResource from 'vue-resource'
import config from './config'
Vue.use(VueResource)
// Vue.http.interceptors.push((request, next) => {
//   var u  = storage.get('u')
//   if (u) {
//     Vue.http.headers.common['Authorization'] = u.token
//   }    
// })
Vue.http.options.root = config.host;
// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// }

require('vue2-animate/dist/vue2-animate.min.css')
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
  router,

})
