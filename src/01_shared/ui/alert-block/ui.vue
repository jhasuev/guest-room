<template>
  <div class="alert-block">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.alert-block {
  @include default-shadow;
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem;
}
</style>
