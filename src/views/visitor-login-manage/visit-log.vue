<template>
  <div class="content-container">
    <p class="content-title">访问日志</p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <el-form
            ref="filterForm"
            :model="filterForm"
            label-width="auto"
            size="small"
            style="width: 100%"
          >
            <el-row type="flex" align="bottom" justify="space-between">
              <el-col :span="7">
                <el-form-item label="时间范围" prop="timeRange">
                  <el-date-picker
                    v-model="filterForm.timeRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="请选择"
                    end-placeholder="请选择"
                    style="width: auto"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="网络地址" prop="ip">
                  <el-input
                    v-model="filterForm.ip"
                    placeholder="请输入网络地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="类型" prop="type">
                  <el-select
                    v-model="filterForm.type"
                    placeholder="全部"
                    style="width: 100%"
                  >
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="账号验证" value="账号验证"></el-option>
                    <el-option label="短信验证" value="短信验证"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="账户" prop="account">
                  <el-input
                    v-model="filterForm.account"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  style="margin-left: auto; text-align: right"
                  label-width="0"
                >
                  <el-button
                    type="primary"
                    class="custom-btn"
                    @click="submitForm('filterForm')"
                  >
                    查询
                  </el-button>
                  <el-button
                    class="custom-btn"
                    @click="resetForm('filterForm')"
                  >
                    重置
                  </el-button>
                  <el-button class="custom-btn"> 导出 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <custom-table
          :pageData="pageData"
          :pageInfo="pageInfo"
          :checkbox="false"
          :confCol="false"
        >
          <template slot="custom-col">
            <el-table-column prop="time" label="时间" sortable>
            </el-table-column>
            <el-table-column prop="ip" label="网络地址" sortable="">
            </el-table-column>
            <el-table-column prop="type" label="类型" sortable>
            </el-table-column>
            <el-table-column prop="account" label="账号" sortable>
            </el-table-column>
            <el-table-column prop="action" label="操作" sortable>
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
import { getVisitLogData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      confData: getVisitLogData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      filterForm: {
        timeRange: "",
        ip: "",
        type: "",
        account: "",
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
    submitForm(formName) {
      console.log("submit", formName);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: flex-end;
}
</style>
