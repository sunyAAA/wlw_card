<template>
    <div class="chart"  v-loading="loading"
       element-loading-text="暂无每日用量数据"
       element-loading-spinner="el-icon-time"
    >
    <ve-line :data="data" :settings="chartSettings"></ve-line>
    <el-row>
      <el-col :span='24/bottomList.length' v-for="(item,index) in bottomList" :key='index'>
        <p class="count">{{item.value}} <span class="unit">{{item.unit}}</span> </p>
        <p class="name">{{item.name}}</p>
      </el-col>
    </el-row>
    </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
export default {
  props: {
    color: {
      type: String,
      default: "#f87979"
    },
    bottomList: {
      type: Array
    },
    data: {}
  },
  data() {
    this.chartSettings = {
      area: true,
      xAxisType: "category"
    };
    return {};
  },
  components: {
    VeLine
  },

  computed: {
    loading() {
      return this.data ? (this.data.rows.length ? false : true) : true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.chart {
  margin-top: 50px;
  padding: 20px 50px;
  background: #fff;

  .el-row {
    padding: 20px;

    .el-col {
      height: 50px;
      text-align: center;
    }
  }
}

.el-col {
  p.count {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .name {
    font-size: 14px;
  }

  .unit {
    font-size: 14px;
  }

  &:nth-child(1) .name {
    color: red;
  }

  &:nth-child(2) .name {
    color: #26c6da;
  }

  &:nth-child(3) .name {
    color: #ffa726;
  }

  &:nth-child(4) .name {
    color: #999;
  }
}
</style>

