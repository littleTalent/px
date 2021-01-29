<template>
  <div class="app-wrapper">
    <headerbar :name="name" />
    <div class="side-main-container">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Headerbar, Sidebar } from "./components";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    Headerbar,
    Sidebar,
  },
  computed: {
    ...mapGetters(["name"]),
    key() {
      return this.$route.path;
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  .side-main-container {
    min-height: calc(100% - #{$headerBarHeight});
    position: relative;
    display: flex;
    .main-container {
      background-color: #f3f3f3;
    }
  }
}
</style>
