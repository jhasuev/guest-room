<template>
  <div
    class="emodji-item"
    :class="{ 'emodji-item--selected': selected }"
    @click="emit('select', props.emodji)"
  >
    {{ props.emodji }}
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

interface IProps {
  selected: boolean;
  emodji: string;
}
const props = withDefaults(defineProps<IProps>(), {
  selected: false,
  emodji: "",
});
const emit = defineEmits(["select"]);
</script>

<style lang="scss" scoped>
.emodji-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  @include default-shadow;
  border: 1px solid transparent;

  width: 60px;
  height: 60px;

  cursor: pointer;
  transition: transform 0.1s;

  &:hover {
    transform: scale(0.9);
  }

  &--selected {
    box-shadow: inset 0 0 40px var(--action-color);
    border-radius: 5px;
    font-size: 1.5rem;
  }
  &--selected:hover {
    transform: scale(1);
  }
}
</style>
