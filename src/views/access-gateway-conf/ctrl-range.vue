<template>
  <div class="content-container">
    <p class="content-title">
      控制范围
      <span class="content-title-tip">
        * 此范围无法通过认证的计算机被阻断，访问网络受限
      </span>
    </p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <div class="toolbar-btns">
            <span class="save-tip">* 修改设置后需要保存才生效</span>
            <el-button type="primary" class="custom-btn" icon="el-icon-plus">
              添加
            </el-button>
            <el-button class="custom-btn" @click="dialogSaveVisible = true">
              保存
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
            <el-table-column prop="ip" label="网络地址" sortable> </el-table-column>
            <el-table-column prop="remark" label="备注" sortable> </el-table-column>
          </template>
        </custom-table>
        <custom-pagination
          :total="confData.length"
          :pageInfo="pageInfo"
        ></custom-pagination>
      </div>
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
      dialogSaveVisible: false,
      confData: getConfData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
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
  justify-content: flex-end;
}
</style>
