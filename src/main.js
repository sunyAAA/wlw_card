import Vue from 'vue'
import App from './App.vue'
import { Col, Row, Table, DatePicker, Input, Pagination, Menu, MenuItem, Loading, TableColumn, Form, FormItem, Button,Tag } from 'element-ui';
import router from './router'
import VueResource from 'vue-resource'
import config from './config'
import storage from 'good-storage'
import vueiInfinite from 'vue-infinite-scroll'
Vue.use(vueiInfinite)
Vue.use(VueResource)
Vue.use(Col).use(Row).use(Table).use(DatePicker).use(Input).use(Pagination).use(Menu).use(MenuItem).use(Loading).use(TableColumn).use(Form).use(FormItem).use(Button).use(Tag)
Vue.http.interceptors.push((request, next) => {

  var u = storage.get('u')
  if (u) {
    if (request.body) {
      request.body._token = u.token
    } else {
      request.url += request.url.indexOf('?') >= 0 ? '&_token=' + u.token : '?_token=' + u.token
    }
  }
  next((response) => {
    if (response.body.code == 110) {
      config.login = false;
      storage.remove('u');
    }
  })
})
Vue.http.options.root = config.host;
Vue.http.options.emulateJSON = true;

// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// }

require('vue2-animate/dist/vue2-animate.min.css')

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
