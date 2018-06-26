<template>
    <div class="chart">
        <line-chart :data='datacollection'   :options="{responsive: true, maintainAspectRatio: false}"
  :height="400"></line-chart>
    <el-row>
      <el-col :span='6'>
        <p class="count">12.9 <span class="unit">M</span> </p>
        <p class="name">本月用量</p>
      </el-col>
      <el-col :span='6'>
        <p class="count">12.9 <span class="unit">M</span> </p>
        <p class="name">昨日用量</p>
      </el-col>
      <el-col :span='6'>
        <p class="count">12.9 <span class="unit">M</span> </p>
        <p class="name">资费</p>
      </el-col>
      <el-col :span='6'>
        <p class="count">25<span class="unit"></span> </p>
        <p class="name">卡数</p>
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
    }
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
            data: [40, 20,25,28,17,19,60,80,10,40, 20,25,28,17, 20,25,28,17,19,60,80,10,19,60,80,10,40,]
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

