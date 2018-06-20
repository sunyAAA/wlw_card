<template>
    <div class="search-box">
        <transition name="fadeDown">
            <el-input
                v-show='isShow'
                placeholder="设备编号"
                suffix-icon="el-icon-search"
                type="number"
                v-model="val"
                @blur='search'
                >
            </el-input>
        </transition>
        <i class="el-icon-search" @click='toggle'></i>
    </div>
</template>
<script>
export default {
  props:{
      width:{
          type:String,
          default:'150px'
      }
  },
  data() {
    return {
      val: '',
      isShow:false
    };
  },
  methods:{
      toggle(){
          this.isShow = !this.isShow
      },
      search(){
          this.$emit('search',this.val)
      }
  }
};
</script>

<style lang="stylus" scoped>
.search-box {
    width: 200px;
    height 40px
    float: right;
    margin-right: 120px;
    position: relative;
    margin-top 20px 
    i {
        position: absolute;
        right: -70px;
        z-index: 100;
        top: 0px;
        height: 40px;
        line-height: 40px;
        width: 50px;
        background: #f87979;
        text-align: center;
        color: #fff;
    }
}
</style>
