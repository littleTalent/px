<template>
  <div id="sys-tool-container">
    <el-row :gutter="25" style="margin-bottom: 25px">
      <el-col :span="8">
        <el-card>
          <div class="pic-text-container" @click="dialogNewVersionVisible = true">
            <div class="pic-container">
              <img src="@/assets/32系统工具-icon-版本升级@2x.png" alt="" />
            </div>
            <div class="text-container">
              <p class="title">版本升级</p>
              <p class="caption">上传新的设备系统版本文件，升级后重启设备即可生效</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="pic-text-container" @click="dialogConfReviewVisible = true">
            <div class="pic-container">
              <img src="@/assets/33系统工具-icon-导入配置@2x.png" alt="" />
            </div>
            <div class="text-container">
              <p class="title">导入配置</p>
              <p class="caption">导入配置可快速精确配置当前准入网关设备</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="pic-text-container">
            <div class="pic-container">
              <img src="@/assets/34系统工具-icon-导出配置@2x.png" alt="" />
            </div>
            <div class="text-container">
              <p class="title">导出配置</p>
              <p class="caption">导出config.xml配置文件，方便存档备份</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="8">
        <el-card>
          <div class="pic-text-container" @click="dialogDeviceRebootVisible = true">
            <div class="pic-container">
              <img src="@/assets/35系统工具-icon-设备重启@2x.png" alt="" />
            </div>
            <div class="text-container">
              <p class="title">设备重启</p>
              <p class="caption">单击此处将准入网关设备重新启动</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="pic-text-container" @click="dialogResetVisible = true">
            <div class="pic-container">
              <img src="@/assets/36系统工具-icon-恢复出厂设置@2x.png" alt="" />
            </div>
            <div class="text-container">
              <p class="title">恢复出厂设置</p>
              <p class="caption">单击此处准入网关设备将恢复到出厂时状态</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 版本升级 -->
    <el-dialog
      :visible.sync="dialogNewVersionVisible"
      width="auto"
      class="custom-dialog-wrapper"
      custom-class="custom-form-dialog"
    >
      <template slot="title">版本升级</template>
      <p class="dialog-form-tip">* 请上传升级包文件</p>
      <el-form
        ref="newVersionForm"
        :model="newVersionForm"
        label-width="auto"
        size="small"
      >
        <el-form-item label="上传文件：" prop="versionPackage">
          <el-input
            v-model="newVersionForm.versionPackage.name"
            readonly
            placeholder="未选择任何文件"
          >
            <el-upload
              action="#"
              :auto-upload="false"
              :on-change="handleFileChange"
              :show-file-list="false"
              slot="prepend"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="custom-btn"
            @click="
              dialogNewVersionVisible = false;
              dialogUpdateRebootVisible = true;
            "
          >
            升级
          </el-button>
          <el-button class="custom-btn" @click="dialogNewVersionVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 升级后设备重启 -->
    <el-dialog
      :visible.sync="dialogUpdateRebootVisible"
      width="auto"
      class="custom-dialog-wrapper"
      custom-class="custom-confirm-dialog"
    >
      <template slot="title">设备重启</template>
      <template>新版本升级完成。重启后即可生效，是否立即重启？</template>
      <template slot="footer" class="dialog-footer">
        <el-button
          class="custom-btn"
          type="primary"
          @click="
            dialogUpdateRebootVisible = false;
            openLoading();
          "
        >
          立即重启
        </el-button>
        <el-button class="custom-btn" @click="dialogUpdateRebootVisible = false">
          稍后重启
        </el-button>
      </template>
    </el-dialog>
    <!-- 配置预览 -->
    <el-dialog
      :visible.sync="dialogConfReviewVisible"
      width="auto"
      class="custom-dialog-wrapper"
    >
      <template slot="title">配置预览</template>
      <div style="height: 300px">
        <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%">
          <el-tree :data="confReviewData" :props="defaultTreeProps">
            <span slot-scope="{ node, data }" @click.stop>
              <el-checkbox v-if="node.level == 1">{{ data.label }}</el-checkbox>
              <span v-else>{{ data.label }}</span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
      <el-divider></el-divider>
      <div class="importAction">
        <div class="import-mode-container">
          <el-radio-group v-model="importMode">
            <el-radio label="append">追加</el-radio>
            <el-radio label="overwrite">覆盖</el-radio>
          </el-radio-group>
        </div>
        <div class="import-btn-container">
          <el-button
            class="custom-btn"
            type="primary"
            v-if="!imported"
            @click="imported = true"
          >
            导入
          </el-button>
          <el-button
            class="custom-btn"
            type="primary"
            v-else
            @click="dialogConfReviewVisible = false"
          >
            保存
          </el-button>
          <el-button class="custom-btn" @click="dialogConfReviewVisible = false">
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 设备重启 -->
    <el-dialog
      :visible.sync="dialogDeviceRebootVisible"
      width="auto"
      class="custom-dialog-wrapper"
      custom-class="custom-confirm-dialog"
    >
      <template slot="title">设备重启</template>
      <template>确定重启准入网关？</template>
      <template slot="footer" class="dialog-footer">
        <el-button
          class="custom-btn"
          type="primary"
          @click="dialogDeviceRebootVisible = false"
        >
          重启
        </el-button>
        <el-button class="custom-btn" @click="dialogDeviceRebootVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
    <!-- 恢复出厂设置 -->
    <el-dialog
      :visible.sync="dialogResetVisible"
      width="auto"
      class="custom-dialog-wrapper"
      custom-class="custom-confirm-dialog"
    >
      <template slot="title">恢复出厂设置</template>
      <template>确定恢复出厂设置？</template>
      <template slot="footer" class="dialog-footer">
        <el-button class="custom-btn" type="primary" @click="dialogResetVisible = false">
          确认
        </el-button>
        <el-button class="custom-btn" @click="dialogResetVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogNewVersionVisible: false,
      newVersionForm: {
        versionPackage: "",
      },
      dialogUpdateRebootVisible: false,
      dialogConfReviewVisible: false,
      dialogDeviceRebootVisible: false,
      dialogResetVisible: false,
      defaultTreeProps: {
        children: "children",
        label: "label",
      },
      confReviewData: [
        {
          label: "管理范围",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "控制范围",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "例外地址",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "主动认证",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "白名单",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "黑名单",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "访客管理",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
        {
          label: "访客范围",
          children: [
            { label: "192.168.1.11" },
            { label: "192.168.11.111" },
            { label: "192.168.111.1-192.168.111.255" },
            { label: "192.168.101.1-192.168.101.255" },
          ],
        },
      ],
      importMode: "append",
      imported: false,
    };
  },
  methods: {
    handleFileChange(file, fileList) {
      this.newVersionForm.versionPackage = file;
    },
    openLoading() {
      let progress = 0;
      const options = {
        text: "已完成 " + progress + "%",
        spinner: "el-icon-loading",
        lock: true,
        background: "rgba(0,0,0,0.5)",
        customClass: "rebootLoading",
      };
      let loadingInstance = this.$loading(options);
      let interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
          progress = 100;
          loadingInstance.setText("已完成 " + progress + "%");
          setTimeout(() => {
            clearInterval(interval);
            loadingInstance.close();
          }, 500);
        } else {
          loadingInstance.setText("已完成 " + progress + "%");
        }
      }, 100);
    },
  },
};
</script>
<style lang="scss">
.rebootLoading {
  .el-loading-spinner {
    .el-loading-text,
    i {
      color: #e8e8e8;
    }
  }
}
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>

<style lang="scss" scoped>
#sys-tool-container {
  margin: 25px;
  .pic-text-container {
    display: flex;
    height: 170px;
    .pic-container {
      img {
        height: 50px;
        width: 50px;
      }
    }
    .text-container {
      margin-left: 15px;
      .title {
        height: 50px;
        line-height: 50px;
        color: #262626;
        font-size: 16px;
        font-weight: bold;
      }
      .caption {
        margin-top: 15px;
        color: #8c8c8c;
        font-size: 14px;
      }
    }
  }
}
.importAction {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .import-mode-container {
    margin-right: 20px;
  }
}
</style>
