<template>
    <div class="date-picker">
        <transition name="fadeDown">
            <el-date-picker
            v-if="isShow"
            v-model="val"
            type="daterange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right" 
            @change='pick'>
            </el-date-picker>
        </transition>
        <i class="el-icon-date" @click='toggle' v-waves></i>
    </div>
</template>

<script>
import Waves from "../../directives/waves/waves.js";
export default {
  directives:{Waves},
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate(select){
          var now = new Date().getTime();
          var dayLeft = now - 30*3600*1000*24;
          if( new Date(select).getTime() < now && dayLeft<new Date(select).getTime()){
            return false
          }else{
            return true
          }
        }
      },
      val: "",
      isShow:false
    };
  },
  methods:{
      toggle(){
          this.isShow = !this.isShow
      },
      pick(arr){
        this.$emit('pick',this.val)
      }
  }
};
</script>

<style lang="stylus" scoped>
.date-picker 
    i
        padding 0 15px
        background #f87979
        height 40px
        vertical-align top
        line-height 40px
        color #fff
        margin-left 15px
</style>
