<template>
  <div class="app">
    <pages-toggle-tabs />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import PagesToggleTabs from "@widgets/pages-toggle-tabs/";
</script>

<style lang="scss">
.app {
  padding: 15px;
}
</style>
