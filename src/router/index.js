import Vue from 'vue'
import Router from 'vue-router'
import TotalPage from '../pages/totalPage/totalPage.vue'
import PoolPage from '../pages/poolPage/poolPage.vue'
import DevicePage from '../pages/devicePage/devicePage.vue'
import DeviceDetailPage from '../pages/deviceDeatilPage/deviceDetailPage.vue'

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
            component:PoolPage
        },
        {
            path:'/device',
            component:DevicePage
        },
        {
            path:'/deviceDetail',
            component:DeviceDetailPage
        }
    ]
})