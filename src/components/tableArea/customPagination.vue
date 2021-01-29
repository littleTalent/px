<template>
  <el-pagination
    background
    layout="prev, pager, next, sizes, jumper"
    :total="total"
    :page-sizes="[5, 10, 20, 40]"
    hide-on-single-page
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    @prev-click="handlePrevClick"
    @next-click="handleNextClick"
  ></el-pagination>
</template>

<script>
export default {
  name: "CustomPagination",
  props: ["total", "pageInfo"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
    },
    handleCurrentChange(current) {
      this.pageInfo.pageNum = current;
    },
    handlePrevClick(current) {
      this.pageInfo.pageNum = current - 1;
    },
    handleNextClick(current) {
      this.pageInfo.pageNum = current + 1;
    },
  },
};
</script>

<style></style>
