<template>
  <div class="app">
    <pages-toggle-tabs class="app__tabs" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import PagesToggleTabs from "@widgets/pages-toggle-tabs/";
</script>

<style lang="scss">
.app {
  padding: 15px;

  &__tabs {
    margin-bottom: 15px;
  }
}
</style>
