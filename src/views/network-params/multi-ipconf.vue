<template>
  <div class="content-container">
    <p class="content-title">多IP配置</p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <div class="sw-container">
            <span>开启多IP绑定：</span>
            <el-switch
              v-model="swMultiIP"
              active-color="#0049ca"
              inactive-color="#AAA"
            >
            </el-switch>
          </div>
          <div class="toolbar-btns">
            <span class="save-tip">* 修改设置后需要保存才生效</span>
            <el-button
              type="primary"
              class="custom-btn"
              icon="el-icon-plus"
              @click="dialogAddMultiIPVisible = true"
              :disabled="!swMultiIP"
            >
              添加
            </el-button>
            <el-button
              class="custom-btn"
              :disabled="!swMultiIP"
              @click="dialogSaveVisible = true"
            >
              保存
            </el-button>
            <el-dropdown trigger="click">
              <el-button class="custom-btn" :disabled="!swMultiIP">
                批量操作<i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>批量启用</el-dropdown-item>
                <el-dropdown-item>批量禁用</el-dropdown-item>
                <el-dropdown-item>删除选中</el-dropdown-item>
                <el-dropdown-item>删除全部</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <custom-table
          :pageData="pageData"
          :pageInfo="pageInfo"
          :class="{ light: !swMultiIP }"
        >
          <template slot="custom-col">
            <el-table-column prop="vlan" label="VLAN ID"> </el-table-column>
            <el-table-column prop="ip" label="网络地址" sortable>
            </el-table-column>
            <el-table-column prop="mask" label="子网掩码" sortable>
            </el-table-column>
          </template>
        </custom-table>
        <custom-pagination
          :total="confData.length"
          :pageInfo="pageInfo"
        ></custom-pagination>
      </div>
      <!-- 添加多IP绑定配置 -->
      <el-dialog
        :visible.sync="dialogAddMultiIPVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">添加多IP绑定配置</template>
        <el-form
          ref="multiIPForm"
          :model="multiIPForm"
          :rules="multiIPFormRules"
          label-width="auto"
          size="small"
        >
          <el-form-item label="IP地址" prop="ip">
            <el-input
              v-model="multiIPForm.ip"
              placeholder="请输入IP地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" prop="mask">
            <el-input
              v-model="multiIPForm.mask"
              placeholder="请输入子网掩码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('multiIPForm')"
            >
              确认
            </el-button>
            <el-button
              class="custom-btn"
              @click="dialogAddMultiIPVisible = false"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 保存确认 -->
      <el-dialog
        :visible.sync="dialogSaveVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-confirm-dialog"
      >
        <template slot="title">保存</template>
        <template>修改设置后需要保存才生效，是否保存？</template>
        <template slot="footer" class="dialog-footer">
          <el-button class="custom-btn" type="primary"> 确认 </el-button>
          <el-button class="custom-btn" @click="dialogSaveVisible = false">
            取消
          </el-button>
        </template>
      </el-dialog>
      <div class="conf-caption">
        <p class="caption-title">说明</p>
        <div class="caption-item">
          <p class="item-title">
            在网桥运行模式下，以下网络环境需启用多IP绑定配置，其他网络环境则无需启用
          </p>
          <p class="item-text">
            准入网关设备部署在二层交换机和三层交换机之间，二层交换机上的PC有多个网段(非VLAN)
            ，且网关上也有对应这些网段的IP.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getConfData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      swMultiIP: true,
      confData: getConfData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      multiIPForm: {
        ip: "",
        mask: "",
      },
      multiIPFormRules: {},
      dialogSaveVisible: false,
      dialogAddMultiIPVisible: false,
    };
  },
  computed: {
    pageData() {
      return this.confData.slice(
        (this.pageInfo.pageNum - 1) * this.pageInfo.pageSize,
        this.pageInfo.pageNum * this.pageInfo.pageSize
      );
    },
  },
  methods: {
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

<style></style>
