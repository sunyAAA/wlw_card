import Vue from 'vue';


export function getTotalPage(pagesize,pageno){
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

export function getCompanyById(id){
    return Vue.http.get('api/device/getCompanyById?companyId='+id)
}

// 查询总流量池
export function getAllPoolDate(begin,end){
    return Vue.http.get('api/pool/list?beginTime='+begin+'&endTime='+end)
}
export function getMypool(){
    return Vue.http.get('api/pool/listPool')
}
export function getPoolById(id,begin,end){
    return Vue.http.get('api/pool/getPoolList?poolId='+id+'&beginTime='+begin+'&endTime='+end)
}

export function getDeviceByPoolId(id,pageSize,pageNo){
    return Vue.http.get('api/pool/getDeviceByPoolId?poolId='+id+'&pagesize='+pageSize+'&pageno='+pageNo)
}