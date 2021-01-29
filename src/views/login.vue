<template>
  <div class="login-container">
    <div class="content-body">
      <div class="logo-container">
        <img src="@/assets/login-logo.png" alt="" />
      </div>
      <div class="login-box">
        <div class="title-container">
          <h3 class="login-box-title">网络准入网关控制系统</h3>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <p class="form-title">用户登录</p>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
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
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
            <el-button :loading="loading"> 取消 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <p class="copyright-text">Copyright@ 2012-2018</p>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("用户名不存在"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码输入错误"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        password: [{ required: true, trigger: "blur", validator: validatePassword }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
$cursor: #fff;
$primary_blue: #0049ca;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 45px;
    input {
      background: transparent;
      border-radius: 3px;
      padding: 5px 40px;
      color: black;
      height: 45px;
    }
    .el-input__prefix,
    .el-input__suffix {
      color: #000;
    }
  }
  .el-form-item__error {
    color: #ff1e1e;
    font-size: 14px;
  }
  .el-button {
    height: 45px;
    line-height: 45px;
    padding: 0;
    margin: 0;
    border: transparent;
    width: 100%;
  }
  .el-button--primary {
    background-color: $primary_blue;
    border-radius: 3px;
  }
  .el-form-item {
    margin-bottom: 25px;
  }
  .el-form-item.is-error .el-input__inner {
    border-color: #dcdfe6;
  }
}
</style>

<style lang="scss" scoped>
$primary_blue: #0049ca;

.login-container {
  min-height: 100%;
  width: 100%;
  min-width: 1200px;
  // max-width: 1200px;
  background: url("~@/assets/login-bg.png") no-repeat;
  overflow: hidden;
  position: relative;
  .content-body {
    height: 850px;
    padding-top: 50px;
    .logo-container {
      margin-left: 80px;
      width: 140px;
      position: relative;
    }
    .login-box {
      width: 300px;
      margin-top: 135px;
      margin-left: 775px;
      .title-container {
        position: relative;
        .login-box-title {
          font-size: 24px;
          margin: 0px auto 25px auto;
          text-align: center;
          font-weight: bold;
          color: #fff;
        }
      }
      .login-form {
        position: relative;
        width: 100%;
        height: 305px;
        border-radius: 10px;
        padding: 24px;
        overflow: hidden;
        background-color: #f8fafe;
        .form-title {
          font-size: 18px;
          color: $primary_blue;
          margin-bottom: 20px;
        }
      }
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: #000;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
      }
    }
  }
  .footer {
    .copyright-text {
      line-height: 50px;
      height: 50px;
      background-color: #f3f3f3;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
  }
}
</style>
