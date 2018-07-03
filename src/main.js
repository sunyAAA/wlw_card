import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueResource from 'vue-resource'
import config from './config'
import storage from 'good-storage'
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {

  var u  = storage.get('u')
  if(u){
      if(request.body){
        request.body._token = u.token
      }else{
        request.url += request.url.indexOf('?')>=0?'&_token='+u.token:'?_token='+u.token
      }
  }
  next((response)=>{
    if(response.body.code == 110){
      config.login = false
      storage.remove('u')
    }
  })
})
Vue.http.options.root = config.host;
Vue.http.options.emulateJSON = true;

// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// }

require('vue2-animate/dist/vue2-animate.min.css')
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
