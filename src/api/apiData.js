import storage from 'good-storage'
import Vue from 'vue';
var _t ;
export function getTotalPage(){
    _t = storage.get('_token')
    return Vue.http.post('api/v1/gprsrealsingle',{_token:_t},{emulateJSON:true})
}