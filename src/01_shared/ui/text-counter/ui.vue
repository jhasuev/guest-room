<template>
  <div class="text-counter">{{ props.count }}/{{ props.max }}</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

interface IProps {
  count: number;
  max: number;
}

const props = withDefaults(defineProps<IProps>(), {
  max: 20,
  count: 0,
});
</script>

<style lang="scss" scoped>
.text-counter {
  position: absolute;
  font-size: 0.65rem;
  opacity: 0.7;
}
</style>
