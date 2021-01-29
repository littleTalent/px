<template>
  <div id="basic-setting-container">
    <div class="content-container">
      <p class="content-title">基本设置</p>
      <div class="content-body">
        <el-form
          ref="basicForm"
          :model="basicForm"
          :rules="basicRules"
          label-width="auto"
          style="width: 450px; padding: 20px 0; margin: 0 auto"
          size="small"
        >
          <el-form-item label="选择模式" prop="mode">
            <el-select
              v-model="basicForm.mode"
              placeholder="请选择模式"
              style="width: 100%"
            >
              <el-option label="网桥模式" value="bridge-mode"></el-option>
              <el-option label="模式二" value="mode2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="basicForm.ip" placeholder="请输入IP地址"></el-input>
          </el-form-item>
          <el-form-item label="子网掩码" prop="mask">
            <el-input v-model="basicForm.mask" placeholder="请输入子网掩码"></el-input>
          </el-form-item>
          <el-form-item label="网关地址" prop="gateway">
            <el-input v-model="basicForm.gateway" placeholder="请输入网关地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="custom-btn" @click="submitForm('basicForm')">
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content-container">
      <p class="content-title">VLAN配置</p>
      <div class="content-body">
        <div class="table-area">
          <div class="custom-toolbar">
            <div class="sw-container">
              <span>开启TRUNK：</span>
              <el-switch v-model="swTrunk" active-color="#0049ca" inactive-color="#AAA">
              </el-switch>
            </div>
            <div class="toolbar-btns">
              <span class="save-tip">* 修改设置后需要保存才生效</span>
              <el-button
                type="primary"
                class="custom-btn"
                icon="el-icon-plus"
                @click="dialogAddVlanVisible = true"
                :disabled="!swTrunk"
              >
                添加
              </el-button>
              <el-button
                class="custom-btn"
                :disabled="!swTrunk"
                @click="dialogSaveVisible = true"
              >
                保存
              </el-button>
              <el-dropdown trigger="click">
                <el-button class="custom-btn" :disabled="!swTrunk">
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
            :class="{ light: !swTrunk }"
          >
            <template slot="custom-col">
              <el-table-column prop="vlan" label="VLAN ID"> </el-table-column>
              <el-table-column prop="ip" label="网络地址" sortable> </el-table-column>
              <el-table-column prop="mask" label="子网掩码" sortable> </el-table-column>
            </template>
          </custom-table>
          <custom-pagination
            :total="confData.length"
            :pageInfo="pageInfo"
          ></custom-pagination>
        </div>
        <!-- 添加vlan配置 -->
        <el-dialog
          :visible.sync="dialogAddVlanVisible"
          width="auto"
          id="dialog-add-vlan"
          class="custom-dialog-wrapper"
          custom-class="custom-form-dialog"
        >
          <template slot="title">添加VLAN配置</template>
          <el-form
            ref="vlanForm"
            :model="vlanForm"
            :rules="vlanFormRules"
            label-width="auto"
            size="small"
          >
            <el-form-item label="VLAN ID" prop="vlan">
              <el-input v-model="vlanForm.vlan" placeholder="请输入VLAN ID"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" prop="ip">
              <el-input v-model="vlanForm.ip" placeholder="请输入IP地址"></el-input>
            </el-form-item>
            <el-form-item label="子网掩码" prop="mask">
              <el-input v-model="vlanForm.mask" placeholder="请输入子网掩码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="custom-btn"
                @click="submitForm('vlanForm')"
              >
                保存
              </el-button>
              <el-button class="custom-btn" @click="dialogAddVlanVisible = false">
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
              在网桥模式下，以下网络环境需启用VLAN配置，其他网络环境则无需启用
            </p>
            <p class="item-text">
              如果准入网关部署在以TRUNK方式相连的交换机之间，同时设置阻断时的转发功能，则需要启用准入网关的TRUNK功能。如不是此种网络环境，无需要启用。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validIP, validMask, validGateway } from "@/utils/validate";
import { getConfData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    const validateIP = (rule, value, callback) => {
      if (!validIP(value)) {
        callback(new Error("输入的IP无效"));
      } else {
        callback();
      }
    };
    const validateMask = (rule, value, callback) => {
      if (!validMask(value)) {
        callback(new Error("输入的子网掩码无效"));
      } else {
        callback();
      }
    };
    const validateGateway = (rule, value, callback) => {
      if (!validGateway(value)) {
        callback(new Error("输入的网关地址无效"));
      } else {
        callback();
      }
    };
    return {
      basicForm: {
        mode: "",
        ip: "",
        mask: "",
        gateway: "",
      },
      basicRules: {
        ip: [{ required: true, trigger: "blur", validator: validateIP }],
        mask: [{ required: true, trigger: "blur", validator: validateMask }],
        gateway: [{ required: true, trigger: "blur", validator: validateGateway }],
      },
      swTrunk: true,
      confData: getConfData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      vlanForm: {
        vlan: "",
        ip: "",
        mask: "",
      },
      dialogSaveVisible: false,
      dialogAddVlanVisible: false,
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

<style lang="scss" scoped></style>
