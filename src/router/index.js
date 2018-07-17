import Vue from 'vue'
import Router from 'vue-router'
import TotalPage from '../pages/totalPage/totalPage.vue'

Vue.use(Router)

export default new Router({
    routes :[
        {
            path:'/',
            redirect:'/total'
        },
        {
            path:'/total',
            component:TotalPage
        },
        {
            path:'/pool',
            component:function (resolve) {
                require(['../pages/poolPage/poolPage.vue'], resolve)
            } 
        },
        {
            path:'/device',
            component:function (resolve) {
                require(['../pages/devicePage/devicePage.vue'], resolve)
            } 
        },
        {
            path:'/deviceDetail',
            component:function (resolve) {
                require(['../pages/deviceDeatilPage/deviceDetailPage.vue'], resolve)
            } 
        }
    ]
})