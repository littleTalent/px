<template>
  <div class="content-container">
    <p class="content-title">
      管理范围
      <span class="content-title-tip">
        * 此范围无法通过认证的计算机被阻断，访问网络受限
      </span>
    </p>
    <div class="content-body">
      <div class="table-area">
        <div class="custom-toolbar">
          <div class="toolbar-btns">
            <span class="save-tip">* 修改设置后需要保存才生效</span>
            <el-button
              type="primary"
              class="custom-btn"
              icon="el-icon-plus"
              @click="dialogAddManageRangeVisible = true"
            >
              添加
            </el-button>
            <el-button class="custom-btn" @click="dialogSaveVisible = true">
              保存
            </el-button>
            <el-dropdown trigger="click" @command="handleBatchOperation">
              <el-button class="custom-btn">
                批量操作<i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delSelected"
                  >删除选中</el-dropdown-item
                >
                <el-dropdown-item command="delAll"> 删除全部 </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <custom-table
          :pageData="pageData"
          :pageInfo="pageInfo"
          ref="manageRangeCustomTable"
          tableRef="manageRangeTable"
        >
          <template slot="custom-col">
            <el-table-column prop="ip" label="网络地址" sortable>
            </el-table-column>
            <el-table-column prop="remark" label="备注" sortable>
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
                <el-button type="text" class="custom-btn conf-btn">
                  删除配置
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
      <!-- 添加管理范围 -->
      <el-dialog
        :visible.sync="dialogAddManageRangeVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">添加管理范围</template>
        <p class="dialog-form-tip">
          * 请输入IP地址范围，支持IP和IP段输入，多个请使用逗号分隔开
        </p>
        <el-form
          ref="addManageRangeForm"
          :model="addManageRangeForm"
          :rules="addManageRangeFormRules"
          label-width="auto"
          size="small"
        >
          <el-form-item label="IP地址" prop="ip">
            <el-input
              v-model="addManageRangeForm.ip"
              placeholder="请输入IP地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input
              type="textarea"
              v-model="addManageRangeForm.remark"
              placeholder="请输入备注信息"
              rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="submitForm('addManageRangeForm')"
            >
              保存
            </el-button>
            <el-button
              class="custom-btn"
              @click="dialogAddManageRangeVisible = false"
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
          <el-button class="custom-btn" type="primary" @click="saveOk('dialogSaveVisible')">
            保存
          </el-button>
          <el-button class="custom-btn" @click="dialogSaveVisible = false">
            不保存
          </el-button>
          <el-button class="custom-btn" @click="dialogSaveVisible = false">
            取消
          </el-button>
        </template>
      </el-dialog>
      <!-- 编辑管理范围 -->
      <el-dialog
        :visible.sync="dialogEditManageRangeVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-form-dialog"
      >
        <template slot="title">编辑管理范围</template>
        <p class="dialog-form-tip">
          * 请输入IP地址范围，支持IP和IP段输入，多个请使用逗号分隔开
        </p>
        <el-form
          ref="editManageRangeForm"
          :model="editManageRangeForm"
          :rules="editManageRangeFormRules"
          label-width="auto"
          size="small"
        >
          <el-form-item label="IP地址" prop="ip">
            <el-input
              clearable
              v-model="editManageRangeForm.ip"
              placeholder="请输入IP地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input
              type="textarea"
              v-model="editManageRangeForm.remark"
              placeholder="请输入备注信息"
              rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="custom-btn"
              @click="saveOk('dialogEditManageRangeVisible')"
            >
              保存
            </el-button>
            <el-button
              class="custom-btn"
              @click="dialogEditManageRangeVisible = false"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 删除所有确认 -->
      <el-dialog
        :visible.sync="dialogDelAllVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-confirm-dialog"
      >
        <template slot="title">删除所有</template>
        <template>确定删除全部管理范围？</template>
        <template slot="footer" class="dialog-footer">
          <el-button
            class="custom-btn"
            type="primary"
            @click="dialogDelAllVisible = false"
          >
            确认
          </el-button>
          <el-button class="custom-btn" @click="dialogDelAllVisible = false">
            取消
          </el-button>
        </template>
      </el-dialog>
      <!-- 删除选中确认 -->
      <el-dialog
        :visible.sync="dialogDelSelectedVisible"
        width="auto"
        class="custom-dialog-wrapper"
        custom-class="custom-confirm-dialog"
      >
        <template slot="title">删除选中</template>
        <template>
          你已选中{{ selectedRows.length }}条管理范围，确定删除？
        </template>
        <template slot="footer" class="dialog-footer">
          <el-button
            class="custom-btn"
            type="primary"
            @click="dialogDelSelectedVisible = false"
          >
            确认
          </el-button>
          <el-button
            class="custom-btn"
            @click="dialogDelSelectedVisible = false"
          >
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
      confData: getConfData(),
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
      },
      dialogSaveVisible: false,
      dialogDelAllVisible: false,
      dialogDelSelectedVisible: false,
      dialogAddManageRangeVisible: false,
      dialogEditManageRangeVisible: false,
      addManageRangeForm: {
        ip: "",
        remark: "",
      },
      editManageRangeForm: {
        ip: "",
        remark: "",
      },
      confItem: {
        index: null,
        row: null,
      },
      selectedRows: [],
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
    handleEdit(index, row) {
      this.confItem = { index, row };
      this.editManageRangeForm.ip = row.ip;
      this.editManageRangeForm.remark = row.remark;
      this.dialogEditManageRangeVisible = true;
      console.log(this.confItem);
    },
    saveOk(dialog) {
      this[dialog] = false;
      this.$message({ message: "保存成功", type: "success" });
    },
    handleBatchOperation(cmd) {
      if (cmd == "delSelected") {
        this.selectedRows = this.$refs.manageRangeCustomTable.$refs.manageRangeTable.selection;
        if (this.selectedRows.length > 0) {
          this.dialogDelSelectedVisible = true;
        } else {
          this.$message({ message: "没有选中", type: "warning" });
        }
      } else if (cmd == "delAll") {
        this.dialogDelAllVisible = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-toolbar {
  justify-content: flex-end;
}
</style>
