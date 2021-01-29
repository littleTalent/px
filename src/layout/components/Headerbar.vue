<template>
  <div class="header">
    <div class="logo-name-container">
      <img src="@/assets/index-logo.png" alt="" />
      <span id="sys-name">网络准入网关控制系统</span>
    </div>
    <div class="user-about">
      <div id="user-dd" class="custom-dd-container">
        <el-dropdown trigger="click" placement="bottom" @command="handleUser">
          <el-button class="custom-btn" id="user-btn" icon="el-icon-user">
            {{ name }}<i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="custom-ddm user-ddm">
            <el-dropdown-item command="cmd-update-pw"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="cmd-logout" divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div id="about-dd" class="custom-dd-container">
        <el-dropdown
          trigger="click"
          :hide-on-click="false"
          placement="bottom-end"
          @command="handleAbout"
        >
          <el-button class="custom-btn" id="about-btn" icon="el-icon-info">
            关于
          </el-button>
          <el-dropdown-menu slot="dropdown" class="custom-ddm about-ddm">
            <el-dropdown-item command="about-info">
              关于准入网关信息
            </el-dropdown-item>
            <el-dropdown-item command="lang-setting" divided>
              <el-dropdown
                trigger="click"
                @command="chooseLang"
                @visible-change="handleLangVisible"
                class="custom-dd lang-dd"
                placement="bottom"
              >
                <span
                  class="el-dropdown-link"
                  :class="{ active: choosingLang }"
                >
                  语言设置 <i class="el-icon-arrow-right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="custom-ddm lang-ddm">
                  <el-dropdown-item
                    v-for="(langItem, index) in langs"
                    :key="langItem + index"
                    :command="langItem.code"
                    :divided="index > 0"
                    :class="langItem.code == lang ? 'active' : ''"
                  >
                    {{ langItem.name }}
                    <i
                      :class="langItem.code == lang ? 'el-icon-check' : ''"
                    ></i>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 登出确认 -->
    <el-dialog
      :visible.sync="dialogLogoutVisible"
      width="auto"
      class="custom-dialog-wrapper"
      custom-class="custom-confirm-dialog"
    >
      <template slot="title">退出登录</template>
      <template>确定退出当前登录？</template>
      <template slot="footer" class="dialog-footer">
        <el-button class="custom-btn" type="primary" @click="logout">
          确认
        </el-button>
        <el-button class="custom-btn" @click="dialogLogoutVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      :visible.sync="dialogUpdatePwVisible"
      width="auto"
      id="dialog-update-pw"
      class="custom-dialog-wrapper"
      custom-class="custom-form-dialog"
    >
      <template slot="title">修改准入网关登录密码</template>
      <el-form
        ref="pwForm"
        :model="pwForm"
        :rules="pwFormRules"
        label-width="auto"
        size="small"
      >
        <el-form-item label="原密码" prop="oldPw">
          <el-input
            v-model="pwForm.oldPw"
            placeholder="请输入原密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPw">
          <el-input
            v-model="pwForm.newPw"
            placeholder="请输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPw2">
          <el-input
            v-model="pwForm.newPw2"
            placeholder="请再次输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="custom-btn"
            @click="submitForm('pwForm')"
          >
            保存
          </el-button>
          <el-button class="custom-btn" @click="dialogUpdatePwVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 关于准入网关信息 -->
    <el-dialog
      :visible.sync="dialogAboutInfoVisible"
      width="auto"
      id="dialog-about-info"
      class="custom-dialog-wrapper"
    >
      <template slot="title">关于准入网关信息</template>
      <div class="about-info-content">
        <div class="info-device-content">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">出产版本：</span>
                <span class="info-text">1.1.1</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">当前版本：</span>
                <span class="info-text">1.1.1</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">Web版本：</span>
                <span class="info-text">1.1.1</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">运行平台：</span>
                <span class="info-text">x64</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">硬件型号：</span>
                <span class="info-text">IPG-4300F</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="info-item">
                <span class="info-title">检验结果：</span>
                <span class="info-text">OK</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="info-time">
          <div id="info-time-now" class="info-time-item">
            <span>当前时间：2020-09-30 11:11:11</span>
            <el-button type="text" class="custom-btn" style="float:right"> 去设置 </el-button>
          </div>
          <div id="info-time-start" class="info-time-item">
            <span>启动时间：2020-09-30 11:11:11</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validOldPw, validNewPw, validNewPw2 } from "@/utils/validate";
export default {
  name: "Headerbar",
  props: ["name"],
  data() {
    const validateOldPw = (rule, value, callback) => {
      if (!validOldPw(value)) {
        callback(new Error("密码错误，请重新输入"));
      } else {
        callback();
      }
    };
    const validateNewPw = (rule, value, callback) => {
      if (!validNewPw(value)) {
        callback(new Error("密码长度需大于6位，请重新输入"));
      } else {
        callback();
      }
    };
    const validateNewPw2 = (rule, value, callback) => {
      if (!validNewPw2(this.pwForm.newPW, value)) {
        callback(new Error("新密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      lang: "CHS",
      choosingLang: false,
      langs: [
        {
          name: "简体中文",
          code: "CHS",
        },
        {
          name: "繁体中文",
          code: "CHT",
        },
        {
          name: "English",
          code: "EN",
        },
      ],
      dialogLogoutVisible: false,
      dialogUpdatePwVisible: false,
      pwForm: {
        oldPw: "",
        newPw: "",
        newPw2: "",
      },
      pwFormRules: {
        oldPw: [
          {
            required: true,
            trigger: "blur",
            validator: validateOldPw,
          },
        ],
        newPw: [
          {
            required: true,
            trigger: "blur",
            validator: validateNewPw,
          },
        ],
        newPw2: [
          { required: true, trigger: "blur", validator: validateNewPw2 },
        ],
      },
      dialogAboutInfoVisible: false,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    chooseLang(command) {
      this.lang = command;
      console.log(command);
    },
    handleLangVisible(v) {
      this.choosingLang = v;
    },
    handleAbout(cmd) {
      if (cmd == "about-info") {
        this.dialogAboutInfoVisible = true;
      }
    },
    handleUser(cmd) {
      if (cmd == "cmd-logout") {
        this.dialogLogoutVisible = true;
      } else if (cmd == "cmd-update-pw") {
        this.dialogUpdatePwVisible = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
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
$primary_blue: #0049ca;
.custom-ddm {
  margin: 0;
  padding: 0;
  .el-dropdown-menu__item {
    padding: 0;
    margin: 0 15px;
    &.el-dropdown-menu__item--divided {
      &::before {
        display: none;
      }
    }
    &:hover {
      color: $primary_blue;
      background: none;
    }
  }
  .popper__arrow {
    display: none;
  }
  &.user-ddm {
    .el-dropdown-menu__item {
      width: 90px;
    }
  }
  &.about-ddm {
    .el-dropdown-menu__item {
      width: 120px;
    }
  }
  &.lang-ddm {
    margin-top: 5px;
    .el-dropdown-menu__item {
      width: 90px;
    }
    .el-dropdown-menu__item.active {
      color: $primary_blue;
    }
  }
}
.lang-dd {
  .el-dropdown-link {
    outline: none;
    &:hover,
    &.active {
      color: $primary_blue;
      background: none;
    }
  }
}
#dialog-about-info {
  .about-info-content {
    .info-device-content {
      .info-item {
        margin-top: 10px;
        .info-title {
          color: #000;
        }
        .info-text {
          color: #666;
        }
      }
    }
  }
  .info-time {
    margin: 30px 0 10px 0;
    .info-time-item {
      background-color: #e4effc;
      color: #666;
      font-size: 14px;
      padding: 13px;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: #004291;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .logo-name-container {
    img {
      height: 60px;
      width: auto;
      float: left;
    }
    #sys-name {
      color: #fff;
      font-size: 18px;
      display: inline-block;
      height: 60px;
      line-height: 60px;
    }
  }
  .user-about {
    display: flex;
    .custom-dd-container {
      margin-right: 20px;
    }
    button {
      background-color: #003574;
      color: #fff;
      border-color: #1a4f8e;
    }
    #user-btn {
      width: 115px;
    }
    #about-btn {
      width: 70px;
    }
  }
}
</style>
