<template>
  <div class="warn-page-container">
    <div class="warn-info-container">
      <div class="warn-pic-title">
        <img src="@/assets/警告页面-png.png" alt="" />
        <p class="title">网络准入控制2.201</p>
      </div>
      <el-divider></el-divider>
      <p class="warn-content">
        我们已经启用了网络准入控制功能，将对某些区域的网络访问进行控制。您看到这个网页可能是因为你的机器不符合安全管理条件而被转到本网页。请确保已安装网络安全管理客户端，并确保符合相关的安全管理策略。
      </p>
      <div class="warn-solution">
        <p class="solution-item">
          1、点击下载链接可以下载该程序。
          <el-link type="primary" class="custom-link"> 下载网络管理客户端程序 </el-link>
        </p>
        <p class="solution-item">2、更加详细的安全管理策略信息，请咨询信息管理部。</p>
      </div>
      <el-divider></el-divider>
    </div>
    <el-form
      ref="visitorLoginForm"
      :model="visitorLoginForm"
      class="login-form"
      auto-complete="on"
      size="small"
    >
      <p class="form-title">访客登录</p>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="visitorLoginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="el-icon-user"
          suffix-icon="el-icon-arrow-down"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="visitorLoginForm.password"
          type="password"
          placeholder="请输入密码"
          auto-complete="on"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-slider
          @click.native="handleSliderClick"
          @input="handleSliderChange"
          v-model="validSlider"
          :show-tooltip="true"
        ></el-slider>
      </el-form-item>
      <el-form-item style="text-align: right; margin: 0 auto">
        <el-button
          type="primary"
          class="custom-btn"
          id="login-btn"
          @click.native.prevent.stop="handleLogin"
        >
          登录
        </el-button>
        <el-button class="custom-btn" id="cancle-btn"> 取消 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      require: true,
    },
    content: {
      require: true,
    },
    clientLink: {
      require: true,
    },
  },
  data() {
    return {
      validSlider: 0,
      validPass: false,
      visitorLoginForm: {
        username: "vistor",
        password: "111111",
      },
    };
  },
  methods: {
    handleSliderClick() {
      if (this.validSlider != 100) {
        this.validSlider = 0;
      } else {
        this.validPass = true;
      }
    },
    handleSliderChange() {
      if (this.validPass) {
        this.validSlider = 100;
      }
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>
<style lang="scss">
.el-slider {
  .el-slider__runway {
    background-color: #f4f4f4;
    height: 32px;
    border: 1px solid #e8e8e8;
    border-right: none;
    margin: 0;
    width: calc(100% - 35px);
    border-radius: 3px 0 0 3px;
    &::before {
      content: "拖动滑块验证";
      position: absolute;
      width: calc(100% + 35px);
      text-align: center;
    }
    &::after {
      content: "";
      height: 32px;
      background-color: #f4f4f4;
      border: 1px solid #e8e8e8;
      border-left: none;
      border-radius: 0 3px 3px 0;
      position: absolute;
      left: 100%;
      top: -1px;
      width: 36px;
    }
    .el-slider__bar {
      height: 100%;
    }
    .el-slider__button-wrapper {
      top: 0;
      height: 100%;
      width: 35px;
      transform: none;
      .el-slider__button {
        border: none;
        border-radius: 3px;
        height: 100%;
        width: 35px;
        &.dragging,
        &.hover,
        &:hover {
          transform: none;
        }
      }
    }
  }
}
#login-btn {
  background: -webkit-linear-gradient(left top, #6bbd7b, #229a39);
  border-color: #e8e8e8;
}
#cancle-btn {
  background-color: #e8f7e3;
}
</style>
<style lang="scss" scoped>
.warn-page-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: #f9f9f9;
  min-width: 1200px;
  .warn-info-container {
    width: 720px;
    .warn-pic-title {
      text-align: center;

      .title {
        text-align: center;
        font-size: 22px;
        color: #333;
        margin-top: 35px;
      }
    }
    .warn-content {
      padding: 0 15px;
      line-height: 32px;
      color: #666;
      font-size: 13px;
    }
    .warn-solution {
      padding: 10px 15px;
      .solution-item {
        color: #666;
        line-height: 32px;
        font-size: 13px;
      }
    }
  }
  .login-form {
    width: 240px;
    // height: 260px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px 15px;
    .form-title {
      color: #585858;
      font-size: 12px;
      margin-bottom: 30px;
    }
  }
}
</style>
