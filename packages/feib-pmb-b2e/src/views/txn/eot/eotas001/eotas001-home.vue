<template></template>

<script setup lang="ts">
import { useAppPage } from "@twix/feib-lib-vue";

const page = useAppPage(
  {
    desc: "home",
    showHeader() {
      return true;
    },
    showNav() {
      return true;
    },
  },
  {}
);
</script>

<style scoped lang="scss">
@import "../eot.scss";
</style>
