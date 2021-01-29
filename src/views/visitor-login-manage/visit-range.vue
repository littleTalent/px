<template>
  <div class="content-container">
    <p class="content-title">访问范围</p>
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
            <el-table-column
              prop="opened"
              label="启用"
              :formatter="fomatterOpened"
            >
            </el-table-column>
            <el-table-column prop="ip" label="网络地址"> </el-table-column>
            <el-table-column prop="action" label="动作" sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注" sortable>
            </el-table-column>
          </template>
          <template slot="custom-conf-col">
            <el-table-column label="配置">
              <div slot-scope="scope" class="conf-col-btns">
                <el-button type="text" class="custom-btn conf-btn">
                  停用
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button
                  type="text"
                  class="custom-btn conf-btn"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" class="custom-btn conf-btn">
                  删除
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
      <!-- 编辑访问范围 -->
      <el-dialog
        :visible.sync="dialogEditVisitRangeVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">编辑访问范围</template>
        <p class="dialog-form-tip">
          * 请输入IP地址范围，支持IP和IP段输入，多个请使用逗号分隔开
        </p>
        <el-form
          ref="visitRangeForm"
          :model="visitRangeForm"
          :rules="visitRangeFormRules"
          label-width="auto"
          size="small"
        >
          <el-form-item label="动作" prop="action">
            <el-select v-model="visitRangeForm.action" style="width: 100%">
              <el-option label="禁止" value="false"></el-option>
              <el-option label="允许" value="true"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址" prop="ip">
            <el-input
              v-model="visitRangeForm.ip"
              placeholder="请输入IP地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input
              type="textarea"
              v-model="visitRangeForm.remark"
              placeholder="请输入备注信息"
              rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('visitRangeForm')"
            >
              保存
            </el-button>
            <el-button
              class="custom-btn"
              @click="dialogEditVisitRangeVisible = false"
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
import { getVisitRangeData } from "@/utils/getData";
import CustomTable from "@/components/tableArea/customTable";
import CustomPagination from "@/components/tableArea/customPagination.vue";

export default {
  components: { CustomTable, CustomPagination },
  data() {
    return {
      confData: getVisitRangeData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      dialogSaveVisible: false,
      dialogEditVisitRangeVisible: false,
      visitRangeForm: {
        action: "",
        ip: "",
        remark: "",
      },
      confItem: {
        index: null,
        row: null,
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
    fomatterOpened(row, column, val, index) {
      return val ? "启用" : "停用";
    },
    handleEdit(index, row) {
      this.confItem = { index, row };
      this.visitRangeForm.action = row.action;
      this.visitRangeForm.ip = row.ip;
      this.visitRangeForm.remark = row.remark;
      this.dialogEditVisitRangeVisible = true;
      console.log(this.confItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: flex-end;
}
</style>
