<template>
  <el-table
    :data="pageData"
    style="width: 100%"
    :ref="tableRef"
    max-height="470"
    page-sizes="[5, 10, 20, 40]"
    header-row-class-name="custom-header-row"
    header-cell-class-name="custom-header-cell"
    row-class-name="custom-row"
    cell-class-name="custom-cell"
  >
    <el-table-column type="selection" v-if="checkbox"> </el-table-column>
    <el-table-column type="index" :index="indexMethod" label="序号"> </el-table-column>
    <slot name="custom-col"></slot>
    <slot name="custom-conf-col" v-if="confCol">
      <el-table-column label="配置">
        <div slot-scope="scope" class="conf-col-btns">
          <el-button type="text" class="custom-btn conf-btn"> 编辑 </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" class="custom-btn conf-btn"> 删除配置 </el-button>
        </div>
      </el-table-column>
    </slot>
  </el-table>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    pageData: {
      require: true,
    },
    tableRef:{
      default:"tableRef"
    },
    checkbox: {
      default: true,
    },
    confCol: {
      default: true,
    },
    pageInfo: {
      require: true,
    },
  },
  methods: {
    indexMethod(index) {
      return (this.pageInfo.pageNum - 1) * this.pageInfo.pageSize + index + 1;
    },
  },
};
</script>

<style></style>
