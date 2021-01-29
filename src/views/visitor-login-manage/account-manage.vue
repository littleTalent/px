<template>
  <div class="content-container">
    <p class="content-title">账号管理</p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <div class="toolbar-btns" slot="tb-btns">
            <span class="save-tip">* 修改设置后需要保存才生效</span>
            <el-button
              type="primary"
              class="custom-btn"
              icon="el-icon-plus"
              @click="dialogAddAccountVisible = true"
            >
              添加
            </el-button>
            <el-dropdown trigger="click">
              <el-button class="custom-btn">
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
        <custom-table :pageData="pageData" :pageInfo="pageInfo">
          <template slot="custom-col">
            <el-table-column prop="name" label="访客名称" sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注" sortable>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              sortable
              :formatter="fomatterStatus"
            >
            </el-table-column>
          </template>
          <template slot="custom-conf-col">
            <el-table-column label="配置">
              <div slot-scope="scope" class="conf-col-btns">
                <el-button type="text" class="custom-btn conf-btn">
                  编辑
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn">
                  禁用
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn">
                  删除
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn">
                  重置密码
                </el-button>
              </div>
            </el-table-column>
          </template>
        </custom-table>
        <custom-pagination
          :total="confData.length"
          :pageInfo="pageInfo"
        ></custom-pagination>
      </div>
      <!-- 添加访客账号 -->
      <el-dialog
        :visible.sync="dialogAddAccountVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">添加访客账号</template>
        <el-form
          ref="addAccountForm"
          :model="addAccountForm"
          label-width="auto"
          size="small"
        >
          <el-form-item label="账号名" prop="accountName">
            <el-input
              v-model="addAccountForm.accountName"
              placeholder="请输入账号名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model="addAccountForm.pwd"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="addAccountForm.remark"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效时间" prop="duration">
            <el-date-picker
              v-model="addAccountForm.duration"
              type="datetime"
              placeholder="请选择有效时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="addAccountForm.allowLoginList" :max="1">
              <el-checkbox class="custom-ck" 
                label="仅允许单点登录"
                value="onlySingle"
                style="display: block"
              ></el-checkbox>
              <el-checkbox class="custom-ck" 
                label="仅允许在指定的IP上登录"
                style="display: block"
              >
              </el-checkbox>
              <el-input
                class="input-only-border-bottom"
                placeholder="请输入IP地址"
                v-model="addAccountForm.allowIP"
              ></el-input>
              <el-checkbox class="custom-ck" 
                label="不允许在客户端上登录"
                value="notClient"
                style="display: block"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('addAccountForm')"
            >
              确认
            </el-button>
            <el-button
              class="custom-btn"
              @click="dialogAddAccountVisible = false"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getVisitorData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      confData: getVisitorData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      dialogAddAccountVisible: false,
      addAccountForm: {
        accountName: "",
        pwd: "",
        remark: "",
        duration: "",
        allowLoginList:[],
        allowIP:""
      },
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
    fomatterStatus(row, column, val, index) {
      return val ? "启用" : "禁用";
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: flex-end;
}
</style>
