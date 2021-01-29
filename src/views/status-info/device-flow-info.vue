<template>
  <div class="content-container">
    <p class="content-title">设备流量信息</p>
    <div class="content-body">
      <div id="btng-time-container">
        <el-button-group>
          <el-button>实时</el-button>
          <el-button>最近10分钟</el-button>
          <el-button>最近1小时</el-button>
          <el-button>最近24小时</el-button>
          <el-button>最近7天</el-button>
          <el-button>最近30天</el-button>
        </el-button-group>
      </div>
      <div class="flow-chart">
        <flowInfo :lineData="lineData"></flowInfo>
      </div>
    </div>
  </div>
</template>

<script>
import FlowInfo from "@/components/charts/flowInfo";

export default {
  components: {
    FlowInfo,
  },
  data() {
    return {
      lineData: [
        8005,
        1436,
        2063,
        3057,
        4618,
        6444,
        9822,
        15468,
        20434,
        24126,
        27387,
        29459,
        31056,
        31982,
        32040,
        31233,
        29224,
        27342,
        26662,
        26956,
        27912,
        28999,
        28965,
        27826,
        25579,
        25722,
        24826,
        24605,
        24304,
        23464,
        23708,
        24099,
        24357,
        24237,
        24401,
        24344,
        23586,
        22380,
        21004,
        17287,
        14747,
        13076,
        12555,
        12144,
        11009,
        10950,
        10871,
        10824,
        10577,
      ],
    };
  },
};
</script>

<style lang="scss">
$primary_blue: #0049ca;
#btng-time-container {
  margin-left: auto;
  text-align: right;
  margin-bottom: 25px;
  .el-button-group {
    .el-button {
      padding: 0 20px;
      width: auto;
      border-radius: 2px;
      height: 30px;

      &:focus,
      &:hover {
        background-color: transparent;
        border-color: $primary_blue;
        color: $primary_blue;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.content-body {
  padding: 25px 25px 25px 0;
}
</style>