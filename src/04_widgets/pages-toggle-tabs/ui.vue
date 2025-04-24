<template>
  <div class="tabs">
    <router-link
      v-for="tab in tabs"
      :key="tab.title"
      :to="tab.to"
      class="tabs__item"
      activeClass="tabs__item--active"
    >
      {{ tab.title }}
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tabs = ref([
  {
    to: "/",
    title: "🏨 Guest Room",
  },
  {
    to: "/about",
    title: "ℹ️ About",
  },
]);
</script>

<style lang="scss">
.tabs {
  --gap: 30px;

  display: flex;
  justify-content: center;
  gap: var(--gap);
  padding: 5px 0 15px;

  &__item {
    position: relative;

    text-decoration: none;
    font-size: 18px;
    opacity: 0.6;

    &--active {
      opacity: 1;
      color: var(--primary-color);
    }

    &:after {
      --dot-radius: 3px;

      content: "";
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      border: var(--dot-radius) solid var(--primary-color);
      width: 0;
      height: 0;
      pointer-events: none;
      margin: auto;
      margin-left: calc(var(--gap) / 2 - var(--dot-radius));
      border-radius: 50%;
      opacity: 0.5;
    }

    &:last-child:after {
      display: none;
    }
  }
}
</style>
