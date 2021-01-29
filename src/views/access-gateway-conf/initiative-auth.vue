<template>
  <div class="content-container">
    <p class="content-title">主动认证</p>
    <div class="content-body">
      <el-form ref="authForm" :model="authForm" id="auth-form" size="small">
        <el-form-item prop="trustClientAuth">
          <el-checkbox class="custom-ck" v-model="authForm.trustClientAuth">
            信任客户端认证
          </el-checkbox>
          <p class="help-block">开启此项，控制器将接受客户端发送的主动认证信息。</p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item prop="trustServerClientAuth" class="sub-ck-item">
          <el-checkbox
            class="custom-ck"
            v-model="authForm.trustServerClientAuth"
            :disabled="!authForm.trustClientAuth"
          >
            仅信任所连服务器的客户端主动认证
          </el-checkbox>
          <p class="help-block">
            关闭此项，则接受所有客户端主动认证；开启此项。则只会信任所连服务器的客户端主动认证，不信任其余服务器的客户端主动信任。
          </p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item prop="banNAT" class="sub-ck-item">
          <el-checkbox
            class="custom-ck"
            v-model="authForm.banNAT"
            :disabled="!authForm.trustClientAuth"
          >
            禁止网络地址转换 (NAT)
          </el-checkbox>
          <p class="help-block">
            关闭此项，在NAT设备(路由、 无线路由等)
            架构下，只要其中一台电脑设备主动认证成功，该NAT设备下连接的其他电脑设备，也都允许接入受保护网络；开启此项，NAT设备架构下的电脑设备，都无法主动认证成功。
          </p>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item prop="compatibleWithUnsafeClientAuth">
          <el-checkbox
            class="custom-ck"
            v-model="authForm.compatibleWithUnsafeClientAuth"
          >
            兼容非安全检测客户端
          </el-checkbox>
          <p class="help-block">
            关闭此项，则只接受支持安全检测功能的客户端发送的认证信息；开启此项。则接受所有客户端发送的认证信息。
          </p>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="custom-btn"
            @click="submitForm('editManageRangeForm')"
          >
            保存
          </el-button>
          <el-button class="custom-btn"> 取消 </el-button>
          <p class="save-tip">* 修改设置后需要保存才生效</p>
        </el-form-item>
      </el-form>
      <p class="notice-text">
        ※
        不支持虑拟环境架构：无论是否开启“禁止网络地址转换（NAT）”，只要虚拟环境以NAT模式透过实体主机连接网络，则虚拟环境对受保护网络的访问，将与主机相同。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authForm: {
        trustClientAuth: false,
        trustServerClientAuth: false,
        banNAT: false,
        compatibleWithUnsafeClientAuth: false,
      },
    };
  },
};
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.sub-ck-item {
  padding-left: 25px;
}
.help-block {
  padding: 10px 65px 0 24px;
  color: #aaa;
  line-height: 1;
}
.notice-text {
  background-color: #e4effc;
  padding: 10px 5px;
  font-size: 14px;
}
</style>
