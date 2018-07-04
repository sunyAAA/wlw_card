<template>
    <div class="pool-page" 
        v-infinite-scroll="scroll" :infinite-scroll-disabled="noMore" infinite-scroll-distance="10"
    >
        <p class="title">流量池</p>
        <div v-for='(item,index) in renderPool' :key='index'>
            <pool-box :pool='item'></pool-box>
            <div class="blank"></div>
        </div>

    </div>
</template>

<script>
import PoolBox from "../../components/poolBox/poolBox";
import { getMypool } from "../../api/apiData.js";
export default {
  data() {
    return {
      poolList: [],
      poolSize: 5,
      poolNo: 1,
      noMore: false,
      total:0
    };
  },
  components: { PoolBox },
  mounted() {
    getMypool().then(res => {
      if (res.body.code == 1) {
        this.poolList = res.body.data;
        this.total = res.body.data.length
      }
    });
  },
  methods: {
    scroll() {
        this.poolNo++;
        if(this.poolSize * this.pageNo > this.total){
            this.noMore = true;
        }
    }
  },
  computed: {
    renderPool() {
      return this.poolList.slice(0, this.poolSize * this.poolNo - 1);
    }
  }
};
</script>


<style lang="stylus" scoped>
.pool-page {
    .title {
        padding-bottom: 50px;
        background: #eee;
        padding-left: 10px;
        padding-top: 10px;
        font-size: 24px;
    }

    .blank {
        background: #eeeeee;
        height: 50px;
    }
}
</style>

