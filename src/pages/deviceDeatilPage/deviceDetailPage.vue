<template>
    <div class="device-detail-page">
        <p class="title">设备详情 <span class="text">{{name}}</span> </p>
        <el-row class="row">
            <el-col :span="8" class="col">
                <panel
                    title="基本信息"
                    icon="menu"
                >
                    <div slot="tab">
                        <el-tabs v-model="activeName" aria-readonly style="height: 40px;float:right">
                            <el-tab-pane name='cm' label="移动"></el-tab-pane>
                            <el-tab-pane name='ct' label="联通"></el-tab-pane>
                            <el-tab-pane name='cu' label="电信"></el-tab-pane>
                        </el-tabs>  
                        <div class="card-box">
                            <card name="卡号" :val="cardNumber || ''"></card>
                            <card name="ICCID" :val="cmIccid || ''"></card>
                            <card name="IMSI" :val="isSms || ''"></card>
                        </div>
                    </div>
                </panel>
            </el-col>
            <el-col :span="8" class="col">
                <panel
                    title="实时信息"
                    icon='refresh'
                    color='#00acc1'
                >
                    <div slot="tab">
                        <div class="card-box">
                            <card name="在线信息" :val="deviceMsg.onlineStatus?'在线':'离线'"></card>
                            <card name="IP" :val="deviceMsg.ip"></card>
                            <card name="RAT" :val="deviceMsg.rat"></card>
                        </div>
                    </div>
                </panel>
            </el-col>
            <el-col :span="8" class="col">
                <panel
                    title="资费信息"
                    icon='document'
                    color='#fb8c00'
                >
                    <div slot="tab">
                        <div class="card-box">
                            <card name="流量限额" :val="deviceMsg.userLimit"></card>
                            <card name="达量断网" val=""></card>
                            <card name="月租" :val="deviceMsg.sysUserLimit"></card>
                        </div>
                    </div>
                </panel>
            </el-col>
        </el-row>
        <div class="blank"></div>
            <div class="chart-box">
        <div class="chart-icon-box">
            <i class="el-icon-news"></i>
        </div>
        <div class="picker-box">
            <date-picker 
                @pick='pickChange'
            ></date-picker>
        </div>
        <p>  总流量 （MB）</p>
        <chart :data='chartData' :bottomList='bottomList'></chart>
    </div>
    </div>
</template>

<script>
import Panel from '../../components/panel/panel'
import Card from '../../components/card/card'
import chart from '../../components/chart/chart'
import DatePicker from '../../components/datePicker/datePicker'
import {query,format} from '../../api/dataUtil.js'
import {getDeviceDetailById,getDevicePool,getCompanyById} from '../../api/apiData.js'
export default {
    components:{Panel,Card,chart,DatePicker},
    data(){
        return{
            activeName:'cm',
            deviceId :'',
            deviceMsg:{},
            bottomList:[],
            chartData:{
                labels:[],
                datasets:[
                    {
                        label:'单卡流量',
                        backgroundColor: '#e4393c',
                        data:[]
                    }
                ]
            },
            name:''
        }
    },
    created(){
        this.deviceId = this.$route.query['id'];
        getDeviceDetailById(this.deviceId).then(res=>{
           var type  =  res.body.data.netWork;
           var arr =['','cm','ct','cu']
           this.activeName = arr[type]
           this.deviceMsg = res.body.data;
           getCompanyById(res.body.data.companyId).then(res=>{
               var d = res.body.data;
                this.name = res.body.data.name
           })
        }) 
        getDevicePool(this.deviceId,
            format(new Date('2017/5/3').getTime(),'Y-m-d H:i:s'),
            format(new Date().getTime(),'Y-m-d H:i:s')
        ).then(res=>{
            var d = res.body.data;
            if(d.length){
                this.bottomList.push({name:'本月用量',value:d[0].usageMonth})
                this.bottomList.push({name:'昨日用量',value:d[0].usageYesterday})
                this.bottomList.push({name:'剩余流量',value:d[0].userLimit - d[0].usageMonth})

                for(var item of d){
                    this.chartData.labels.push(format(item.insertTime,'m-d'));
                    this.chartData.datasets[0].data.push(item.usageYesterday)
                }
            }

    //               datacollection: {
    //     labels: ["06-18",'06-19','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20'],
    //     datasets: [
    //       {
    //         label: "用量(M)",
    //         backgroundColor: this.color,
    //         data: [40, 20,25,28,17,19,60,80,10,40, 20,25,28,17, 20,25,28,17,19,60,80,10,19,60,80,10,40,]
    //       }
    //     ]
    //   },
        })
    },
    methods:{
        pickChange(val){
            console.log(val)
        }
    },
    computed:{
        cardNumber(){
            return this.activeName == 'cm' ?this.deviceMsg.cardNumber : ''
        },
        cmIccid(){
            return this.activeName == 'cm' ?this.deviceMsg.cmIccid : ''
        },
        isSms(){
            return this.activeName == 'cm' ?this.deviceMsg.isSms : ''
        },
    }
}
</script>

<style lang="stylus" scoped>
.device-detail-page
    background #eee
.title
    height 40px
    line-height 40px
    font-size 24px
    padding 10px 0 0 10px
    .text
        font-size 16px
        padding-left 20px
.row
    margin  40px 20px
    .col
        padding-right 30px
        border-radius 5px
        box-sizing border-box
    .card-box
        padding-top 50px
        padding-bottom 20px
.blank
    height 50px
    background #eee
.chart-box
    position relative
    background #fff
    p
        padding 10px 25px 0px 100px
    .chart-icon-box
        position absolute
        width 54px
        height 54px
        line-height 54px
        top -20px
        left 20px
        text-align center
        font-size 20px
        background #26c6da
        color #fff
.picker-box
    margin-top 20px
    margin-right 50px
    float right
</style>
