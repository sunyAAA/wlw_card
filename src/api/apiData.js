import Vue from 'vue';
let pagesize = 999;
let pageno = 1;
export function getTotalPage(){
    return Vue.http.post('api/device/getList',{pagesize,pageno})
}

export function getPoolList(){
    return Vue.http.post('api/pool/list',{pagesize,pageno})  
}

export function getDeviceDetailById(id){
    return Vue.http.get('api/device/getById?deviceId='+id)  
}

export function getDevicePool(id,beginTime,endTime){
    return Vue.http.get('api/device/getLogId?deviceId='+id+'&beginTime='+beginTime+'&endTime='+endTime)
}