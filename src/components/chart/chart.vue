<template>
    <div class="chart">
        <line-chart :data='data'
  :height="400"></line-chart>
    <el-row>
      <el-col :span='24/bottomList.length' v-for="(item,index) in bottomList" :key='index'>
        <p class="count">{{item.value}} <span class="unit">M</span> </p>
        <p class="name">{{item.name}}</p>
      </el-col>

    </el-row>
    </div>
</template>

<script>
import LineChart from "./LinecChart.js";
export default {
  props:{
    color:{
      type:String,
      default:'#f87979'
    },
    bottomList:{
      type:Array,
    },
    data:{}
  },
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {
        labels: ["06-18",'06-19','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20',"06-18",'06-20','06-20','06-20','06-20','06-20','06-20','06-20','06-20'],
        datasets: [
          {
            label: "用量(M)",
            backgroundColor: this.color,
            data: [0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,1,3,0]
          }
        ]
      },
    };
  }
};
</script>

<style lang="stylus" scoped>
.chart
    margin-top 50px
    padding 20px 50px
    background #fff
    .el-row
      padding 20px
      .el-col
        height 50px
        text-align center
.el-col
  p.count
    font-size 24px
    margin-bottom 5px
  .name
    font-size 14px
  .unit
    font-size 14px
  &:nth-child(1) .name
    color red
  &:nth-child(2) .name
    color #26c6da
  &:nth-child(3) .name
    color #ffa726
  &:nth-child(4) .name
    color #999
</style>

