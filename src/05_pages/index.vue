<template>
  <div class="app">
    <pages-toggle-tabs class="app__tabs" />
    <router-view class="app__content" />
    <Footer class="app__footer" />
  </div>
</template>

<script setup lang="ts">
import PagesToggleTabs from "@widgets/pages-toggle-tabs/";
import Footer from "@widgets/footer";
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__tabs {
    margin-bottom: 15px;
  }

  &__content {
    flex-grow: 1;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 0.8rem;
  }

  &__footer {
    margin-top: 1rem;
  }
}
</style>
