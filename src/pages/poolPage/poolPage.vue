<template>
    <div class="pool-page">
        <p class="title">流量池</p>
        <div v-for='(item,index) in poolList' :key='index'>
            <pool-box   :pool='item'></pool-box>
            <div class="blank"></div>
        </div>

    </div>
</template>

<script>
import PoolBox from '../../components/poolBox/poolBox'
import {getMypool} from '../../api/apiData.js'
export default {
    data(){
        return{
            poolList:[]
        }
    },
    components:{PoolBox},
    mounted(){
        getMypool().then(res=>{
            if(res.body.code == 1){
                this.poolList = res.body.data;
            }
        })
    }
}
</script>


<style lang="stylus" scoped>
.pool-page
    .title
        padding-bottom 50px
        background #eee
        padding-left 10px
        padding-top 10px
        font-size 24px
    .blank
        background #eeeeee
        height 50px
</style>

