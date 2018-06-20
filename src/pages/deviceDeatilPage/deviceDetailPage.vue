<template>
    <div class="device-detail-page">
        <p class="title">设备详情</p>
        <el-row class="row">
            <el-col :span="8" class="col">
                <panel
                    title="基本信息"
                    icon="menu"
                >
                    <div slot="tab">
                        <el-tabs  style="height: 40px;float:right">
                            <el-tab-pane label="移动"></el-tab-pane>
                            <el-tab-pane label="联通"></el-tab-pane>
                            <el-tab-pane label="电信"></el-tab-pane>
                        </el-tabs>
                        <div class="card-box">
                            <card name="卡号" val="1064877196052"></card>
                            <card name="卡号" val="1064877196052"></card>
                            <card name="卡号" val="1064877196052"></card>
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
                            <card name="在线信息" val="离线"></card>
                            <card name="卡号" val="1064877196052"></card>
                            <card name="卡号" val="1064877196052"></card>
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
                            <card name="卡号" val="1064877196052"></card>
                            <card name="卡号" val="1064877196052"></card>
                            <card name="卡号" val="1064877196052"></card>
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
        <chart></chart>
    </div>
    </div>
</template>

<script>
import Panel from '../../components/panel/panel'
import Card from '../../components/card/card'
import chart from '../../components/chart/chart'
import DatePicker from '../../components/datePicker/datePicker'
export default {
    components:{Panel,Card,chart,DatePicker},
    data(){
        return{
            activeName:'first'
        }
    },
    methods:{
        pickChange(val){
            
        }
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
