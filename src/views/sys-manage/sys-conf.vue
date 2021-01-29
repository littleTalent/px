<template>
  <div class="content-container">
    <div class="content-body">
      <div class="link-nav">
        <li @click="handlelinkNav(1)" :class="{ active: activeNavIndex == 1 }">
          <el-link class="custom-link" href="#timed-restart"> 定时重启 </el-link>
        </li>
        <li @click="handlelinkNav(2)" :class="{ active: activeNavIndex == 2 }">
          <el-link class="custom-link" href="#sys-time-setting"> 系统时间设置 </el-link>
        </li>
        <li @click="handlelinkNav(3)" :class="{ active: activeNavIndex == 3 }">
          <el-link class="custom-link" href="#advanced-conf"> 高级配置 </el-link>
        </li>
      </div>
      <div class="sys-conf-content">
        <div class="sys-conf-item" id="timed-restart">
          <p class="item-title">定时重启</p>
          <div class="item-body">
            <el-form
              ref="timedRestartForm"
              :model="timedRestartForm"
              label-width="auto"
              size="small"
            >
              <el-form-item label="定时重启：" prop="timedRestartOpen">
                <el-switch
                  v-model="timedRestartForm.timedRestartOpen"
                  active-color="#0049ca"
                  inactive-color="#aaa"
                  :width="50"
                  id="sw-timed-restart"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="当前时间："> 2020/11/11 11:11:11 </el-form-item>
              <el-form-item label="重启周期：" prop="restartCycle">
                <el-cascader
                  v-model="timedRestartForm.restartCycle"
                  :options="cycleOptions"
                  style="width: 100%"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="重启时间：" prop="restartTime">
                <el-row :gutter="10" type="flex">
                  <el-col :span="12">
                    <el-time-picker
                      placeholder="请选择时间"
                      v-model="timedRestartForm.restartTime.time"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-col>
                  <el-col :span="12">
                    <el-select
                      v-model="timedRestartForm.restartTime.timeZone"
                      placeholder="请选择时区"
                      style="width: 100%"
                    >
                      <el-option label="(GMT + 08:00)" value="(GMT + 08:00)"></el-option>
                      <el-option label="(GMT + 09:00)" value="(GMT + 09:00)"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="custom-btn"> 保存 </el-button>
                <el-button class="custom-btn"> 取消 </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="sys-conf-item" id="sys-time-setting">
          <p class="item-title">系统时间设置</p>
          <div class="item-body">
            <el-form label-width="auto" size="small">
              <el-form-item label="启用时间：">
                {{ sysTime.openTime }}
              </el-form-item>
              <el-form-item label="运行时间："> 11天 11时 11秒 </el-form-item>
              <el-form-item label="当前时间：">
                {{ sysTime.nowTime }}
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="custom-btn"
                  @click="dialogEditNowTimeVisible = true"
                >
                  编辑
                </el-button>
                <el-button class="custom-btn"> 取消 </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="sys-conf-item" id="advanced-conf">
          <p class="item-title">高级配置</p>
          <div class="item-body">
            <el-form label-width="auto" size="small">
              <el-form-item label="配置内容：">
                <div id="advanced-conf-editor"></div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="custom-btn"
                  @click="dialogEditNowTimeVisible = true"
                >
                  保存
                </el-button>
                <el-button class="custom-btn"> 取消 </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 系统时间设置 修改当前时间 -->
      <el-dialog
        :visible.sync="dialogEditNowTimeVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">修改当前时间</template>
        <p class="dialog-form-tip">* 修改保存后，将同步更新设备的启动时间</p>
        <el-form
          ref="editNowTimeForm"
          :model="editNowTimeForm"
          label-width="auto"
          size="small"
        >
          <el-form-item label="当前时间" prop="nowTime">
            <el-date-picker
              v-model="editNowTimeForm.time"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy/MM/dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('editNowTimeForm')"
            >
              保存
            </el-button>
            <el-button class="custom-btn" @click="dialogEditNowTimeVisible = false">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ice } from "@/assets/lib/iceEditor/iceEditor.min";
export default {
  data() {
    return {
      timedRestartForm: {
        timedRestartOpen: true,
        nowTime: "",
        restartCycle: "",
        restartTime: {
          time: "",
          timeZone: "",
        },
      },
      cycleOptions: [
        {
          value: "每天",
          label: "每天",
        },
        {
          value: "每周",
          label: "每周",
          children: [
            {
              value: "星期天",
              label: "星期天",
            },
            {
              value: "星期一",
              label: "星期一",
            },
            {
              value: "星期二",
              label: "星期二",
            },
            {
              value: "星期三",
              label: "星期三",
            },
            {
              value: "星期四",
              label: "星期四",
            },
            {
              value: "星期五",
              label: "星期五",
            },
            {
              value: "星期六",
              label: "星期六",
            },
          ],
        },
        {
          value: "每月",
          label: "每月",
        },
        {
          value: "每季",
          label: "每季",
        },
      ],
      dialogEditNowTimeVisible: false,
      sysTime: {
        openTime: "2020/11/11 11:11:11",
        runningTime: "11天 11时 11秒",
        nowTime: "2020/11/11 11:11:11",
      },
      editNowTimeForm: {
        time: new Date(),
      },
      activeNavIndex: 0,
    };
  },
  methods: {
    submitForm(formName) {
      this.sysTime.openTime = this.editNowTimeForm.time;
      this.sysTime.nowTime = this.editNowTimeForm.time;
      this.dialogEditNowTimeVisible = false;
    },
    handlelinkNav(index) {
      this.activeNavIndex = index;
    },
  },
  mounted() {
    let editor = new ice.editor("advanced-conf-editor");
    editor.width = "700px"; //设置宽度
    editor.height = "250px"; //设置高度
    editor.maxWindow = false; //取消最大化
    editor.menu = [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "line",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "line",
      "createLink",
      "unlink",
      "face",
      "insertImage",
    ];
    editor.create();
  },
};
</script>

<style lang="scss" scoped>
.content-body {
  padding: 20px 0;
  display: flex;
  .link-nav {
    width: 210px;
    li {
      list-style: circle;
      padding: 10px 15px;
      &.active,
      &.active a {
        color: #0049ca;
      }
    }
  }
  .sys-conf-content {
    padding-left: 60px;
    flex: 1;
    border-left: 1px solid #e8e8e8;

    .sys-conf-item {
      margin-bottom: 70px;
      .item-title {
        font-size: 16px;
        font-weight: bold;
        color: #000;
        padding-bottom: 15px;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 40px;
      }
      .item-body {
        width: fit-content;
      }
    }
  }
}
</style>
<style lang="scss">
#advanced-conf-editor {
  .iceEditor-drag {
    display: none;
  }
}
</style>
