<template>
  <div class="content-container">
    <p class="content-title">访问范围</p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <el-form
            :inline="true"
            :model="ipFilterForm"
            class="demo-form-inline"
            size="small"
          >
            <el-form-item label="网络地址">
              <el-input
                v-model="ipFilterForm.ip"
                placeholder="请输入网络地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="阻断状态">
              <el-select v-model="ipFilterForm.blocked" placeholder="全部">
                <el-option label="全部" value="all"></el-option>
                <el-option label="阻断" value="阻断"></el-option>
                <el-option label="未阻断" value="未阻断"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前标识">
              <el-select v-model="ipFilterForm.nowMark" placeholder="全部">
                <el-option label="全部" value="all"></el-option>
                <el-option label="合规" value="合规"></el-option>
                <el-option label="不合规" value="不合规"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: auto; text-align: right">
              <el-button type="primary" class="custom-btn"> 查询 </el-button>
              <el-button class="custom-btn">导出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <custom-table
          :pageData="pageData"
          :pageInfo="pageInfo"
          :confCol="false"
          :checkbox="false"
        >
          <template slot="custom-col">
            <el-table-column prop="ip" label="网络地址" sortable>
            </el-table-column>
            <el-table-column prop="startTime" label="启动时间" sortable="">
            </el-table-column>
            <el-table-column prop="blocked" label="阻断状态" sortable>
            </el-table-column>
            <el-table-column prop="nowMark" label="当前标识" sortable>
            </el-table-column>
          </template>
        </custom-table>
        <custom-pagination
          :total="confData.length"
          :pageInfo="pageInfo"
        ></custom-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getIPInfoData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      confData: getIPInfoData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      ipFilterForm: {
        ip: "",
        blocked: "",
        nowMark: "",
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: center;
  .el-form {
    width: 100%;
  }
}
</style>
