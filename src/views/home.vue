<template>
  <div id="index-container">
    <el-alert type="warning" show-icon id="index-warn">
      <span slot="title">
        系统提示：{{ clientNumber }} 设备存储空间不足，请及时检查设备情况。
      </span>
    </el-alert>
    <div id="index-content-container">
      <el-row :gutter="25">
        <el-col :span="12">
          <div id="client-content">
            <div id="client-info">
              <p id="client-title">{{ clientNumber }}</p>
              <div class="client-divider"></div>
              <p id="version-info">当前版本：4.52.0301.9999（发现新版本）</p>
              <p id="running-time">运行时间：105天 10时 30分 10秒</p>
            </div>
            <div class="sw-container">
              <el-switch
                v-model="swCtrl"
                active-color="#00c74f"
                inactive-color="#5390D9"
                active-text="启用控制"
                inactive-text="停用控制"
                :width="100"
                id="sw-ctrl"
              >
              </el-switch>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div id="ip-content">
            <div id="ip-text-info">
              <div id="ip-online-info">
                <p id="ip-online-title">当前在线IP数量</p>
                <p id="ip-online-num">1,400</p>
              </div>
              <p id="ip-through-info">
                <span id="ip-through-title"> 流经设备的IP总数 </span>
                <span id="ip-through-num"> 1,600 </span>
              </p>
            </div>
            <div class="custom-vertical-divider"></div>
            <div id="ip-graph-info">
              <ipInfoCircle
                title="在线阻断数量"
                num="32"
                color="#ffd289"
                ipNum="1600"
                width="120px"
                height="120px"
              ></ipInfoCircle>
              <ipInfoCircle
                title="在线访客数量"
                num="64"
                color="#34A6FF"
                ipNum="1600"
                width="120px"
                height="120px"
              ></ipInfoCircle>
            </div>
            <el-button id="ref-ip-info-btn" icon="el-icon-refresh" title="刷新">
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div id="flow-info-content">
        <div id="flow-title">最近24小时设备流量信息</div>
        <flowInfo :lineData="lineData"></flowInfo>
      </div>
    </div>
  </div>
</template>

<script>
import FlowInfo from "@/components/charts/flowInfo";
import ipInfoCircle from "@/components/charts/ipInfoCircle";
export default {
  name: "index",
  data() {
    return {
      swCtrl: false,
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
      clientNumber: "IPG-4300F",
    };
  },
  components: {
    FlowInfo,
    ipInfoCircle,
  },
};
</script>
<style lang="scss">
$sw_height: 35px; //有1px的border
$core_outwidth: $sw_height;
#index-container {
  #index-content-container {
    #client-content {
      .sw-container {
        .el-switch {
          height: $sw_height;
          .el-switch__label {
            position: absolute;
            // right: 34px;
            color: #fff;
            width: calc(100% - #{$core_outwidth - 4px});
            text-align: center;
            margin: 0;
            padding: 0;
            display: none;
            &.is-active {
              display: inline-block;
              z-index: 999;
            }
          }
          .el-switch__label--left {
            position: absolute;
            left: $core_outwidth - 4px;
          }

          .el-switch__core {
            height: $sw_height;
            border-radius: $core_outwidth;
            &::after {
              width: $core_outwidth - 6px;
              height: $core_outwidth - 6px;
              top: 2px;
              left: 2px;
            }
          }
        }
        .el-switch.is-checked {
          .el-switch__core {
            &::after {
              left: 100%;
              margin-left: -31px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
#index-container {
  // background-color: #fff;
  #index-warn {
    background-color: #fff;
    color: #f38f14;
    border-radius: none;
  }
  #index-content-container {
    padding: 25px;
    #client-content {
      background: -webkit-linear-gradient(left bottom, #2d72e6, #005bc7);
      color: #fff;
      padding: 45px 40px 0 40px;
      display: flex;
      justify-content: space-between;
      height: 210px;
      #client-title {
        font-size: 24px;
      }
      .client-divider {
        height: 1px;
        width: 30px;
        background-color: #fff;
        margin-top: 20px;
      }
      #version-info,
      #running-time {
        font-size: 12px;
        color: #eaf1fc;
        margin-top: 20px;
      }
    }
    #ip-content {
      background-color: #fff;
      height: 210px;
      padding: 30px 40px;
      display: flex;
      justify-content: space-between;
      position: relative;
      #ip-text-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        #ip-online-info {
          #ip-online-title {
            padding-top: 15px;
            color: #999;
          }
          #ip-online-num {
            color: #0071ff;
            font-size: 28px;
            font-weight: bold;
            padding-top: 15px;
          }
        }
        #ip-through-info {
          padding-bottom: 10px;
          #ip-through-title {
            color: #666;
          }
          #ip-through-num {
            color: #555;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
      #ip-graph-info {
        display: flex;
        align-items: center;
        width: 270px;
        justify-content: space-between;
      }
      #ref-ip-info-btn {
        position: absolute;
        right: 15px;
        top: 15px;
        display: block;
        width: 18px;
        height: 18px;
        border: none;
        padding: 0;
        margin: 0;
      }
    }
    #flow-info-content {
      background-color: #fff;
      margin-top: 25px;
      #flow-title {
        height: 50px;
        line-height: 50px;
        padding-left: 35px;
        color: #252525;
        font-size: 18px;
        border-bottom: 1px solid #e8e8e8;
      }
    }
  }
}
</style>
