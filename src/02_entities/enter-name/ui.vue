<template>
  <div class="enter-name">
    <input
      ref="inputRef"
      type="text"
      :value="props.modelValue"
      @input="updateValue($event.target.value)"
      class="enter-name__field field"
      :class="{ error: props.error }"
      :disabled="!isEdit"
      :maxlength="maxLength"
    />

    <div class="enter-name__counter">
      {{ props.modelValue.length }}/{{ maxLength }}
    </div>

    <button type="button" class="enter-name__btn btn" @click="onClickEdit">
      {{ !isEdit ? "✏️" : "✔️" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick, withDefaults } from "vue";

interface IProps {
  modelValue: string;
  maxLength?: number;
  error?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  maxLength: 20,
  error: false,
});
const emit = defineEmits(["update:modelValue"]);
const isEdit = ref(false);
const inputRef = ref(null);

onMounted(() => {
  if (!props.modelValue) isEdit.value = true;
});

watch(isEdit, (val) => {
  if (val) nextTick(() => inputRef.value?.focus());
});

const updateValue = (name: string) => {
  emit("update:modelValue", name);
};

const onClickEdit = () => {
  const filteredName = props.modelValue.trim();
  if (!filteredName) return;

  isEdit.value = !isEdit.value;
  updateValue(filteredName);
};
</script>

<style lang="scss">
.enter-name {
  position: relative;
  width: 100%;

  display: flex;

  border-radius: 3px;

  &__field {
    flex-grow: 1;

    height: 100%;
    padding: 0 15px;

    border-radius: 3px 0px 0px 3px;

    &:disabled {
      cursor: not-allowed;

      opacity: 0.25;
    }
  }

  &__counter {
    position: absolute;
    bottom: 2px;
    right: 60px;
    font-size: 10px;
  }

  &__btn {
    padding: 15px;
  }
}
</style>
