<template>
  <div class="content-container">
    <p class="content-title">服务器管理</p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <div class="toolbar-btns" slot="tb-btns">
            <span class="save-tip">* 修改设置后需要保存才生效</span>
            <el-button
              type="primary"
              class="custom-btn"
              icon="el-icon-plus"
              @click="dialogEditServerConfVisible = true"
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
            <el-table-column prop="name" label="名称" sortable> </el-table-column>
            <el-table-column prop="ip" label="网络地址" sortable> </el-table-column>
            <el-table-column
              prop="linked"
              label="连接状态"
              :formatter="fomatterLinked"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="opened"
              label="启用状态"
              :formatter="fomatterOpened"
              sortable
            >
            </el-table-column>
          </template>
          <template slot="custom-conf-col">
            <el-table-column label="配置">
              <div slot-scope="scope" class="conf-col-btns">
                <el-button
                  type="text"
                  class="custom-btn conf-btn"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn"> 删除 </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn"> 禁用 </el-button>
              </div>
            </el-table-column>
          </template>
        </custom-table>
        <custom-pagination
          :total="confData.length"
          :pageInfo="pageInfo"
        ></custom-pagination>
      </div>
      <!-- 编辑服务器配置 -->
      <el-dialog
        :visible.sync="dialogEditServerConfVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">编辑服务器配置</template>
        <p class="dialog-form-tip">
          * 容灾设置：当服务器与准入网关通讯有异常时，执行以下处理
        </p>
        <el-form
          ref="serverConfForm"
          label-width="auto"
          size="mini"
          label-position="top"
          id="edit-server-conf-from"
        >
          <el-form-item label="服务器授权有效时长：">
            <el-checkbox-group v-model="serverConfForm.authDurationList" :max="1">
              <el-checkbox
                class="custom-ck"
                label="始终有效"
                style="display: block"
              ></el-checkbox>
              <el-checkbox
                class="custom-ck"
                label=""
                style="display: block"
                v-model="serverConfForm.authDuration"
              >
                <el-input
                  v-model="serverConfForm.authDuration"
                  style="width: 60px"
                ></el-input>
                分钟有效
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="准入网关控制范围设置：">
            <el-checkbox-group
              v-model="serverConfForm.ctrlRangeList"
              :max="1"
              @change="handleChange"
            >
              <el-checkbox
                class="custom-ck"
                label="始终维持原有控制范围"
                value="always"
                style="display: block"
              ></el-checkbox>
              <el-checkbox class="custom-ck" style="display: block">
                <el-input
                  style="width: 60px"
                  v-model="serverConfForm.ctrlRangeDuration"
                ></el-input>
                <span> 分钟内维持原有控制范围，超过该时间后放开对以下IP范围的控制 </span>
              </el-checkbox>
              <el-input
                clearable
                placeholder="请输入IP范围"
                id="ctrl-range-ipinput"
                v-model="serverConfForm.ctrRangeIP"
                class="input-only-border-bottom"
                size="mini"
                style="margin-top: 20px"
              ></el-input>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('serverConfForm')"
            >
              保存
            </el-button>
            <el-button class="custom-btn" @click="dialogEditServerConfVisible = false">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getServerData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      confData: getServerData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      dialogEditServerConfVisible: false,
      serverConfForm: {
        authDurationList: [],
        authDuration: "",
        ctrlRangeList: [],
        ctrlRangeDuration: "",
        ctrRangeIPRange: "",
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
    fomatterLinked(row, column, val, index) {
      return val ? "已连接" : "未连接";
    },
    fomatterOpened(row, column, val, index) {
      return val ? "已启用" : "未启用";
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogEditServerConfVisible = true;
    },
    handleChange(v) {
      console.log(v);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: flex-end;
}
</style>
<style lang="scss"></style>
