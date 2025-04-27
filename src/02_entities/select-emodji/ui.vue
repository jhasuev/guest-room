<template>
  <div class="select-emodji" ref="containerRef">
    <emodji-item
      class="select-emodji__selected"
      :emodji="selected"
      :selected="true"
      @select="onClickOpen()"
    />

    <div class="select-emodji__list" :class="{ 'is-open': isOpen }">
      <emodji-item
        v-for="(emodji, i) in emodjis"
        :key="i"
        :selected="selected === emodji"
        :emodji="emodji"
        @select="onSelect(emodji)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import EmodjiItem from "@/01_shared/ui/emodji-item";
const props = defineProps({
  modelValue: {
    type: String,
    default: "👨‍🦱",
  },
});
const emit = defineEmits(["update:modelValue"]);

const emodjis = [
  "👩",
  "👨",
  "🧑",
  "👨‍🦱",
  "👩‍🦱",
  "👨‍🦰",
  "👩‍🦰",
  "👨‍🦳",
  "👩‍🦳",
  "👨‍🦲",
  "👩‍🦲",
  "💀",
];

const selected = ref(props.modelValue);
const isOpen = ref(false);
const containerRef = ref(null);

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal;
  }
);

const onClickOpen = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.addEventListener("click", onClickEverywhere);
  } else {
    document.removeEventListener("click", onClickEverywhere);
  }
};

const onClickEverywhere = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    isOpen.value = false;
    document.removeEventListener("click", onClickEverywhere);
  }
};

const onSelect = (emodji) => {
  isOpen.value = false;

  if (selected.value === emodji) return;

  selected.value = emodji;
  emit("update:modelValue", emodji);
};

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickEverywhere);
});
</script>

<style lang="scss">
.select-emodji {
  position: relative;

  & > &__selected {
    height: 50px;
    width: 50px;
  }

  &__list {
    position: absolute;
    z-index: 9;
    top: -5px;
    left: 100%;
    transform: translateX(15px);

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));

    border-radius: 5px;
    background-color: #fff;

    visibility: hidden;
    opacity: 0;
    transition: 0.2s;

    &:after {
      content: "";

      position: absolute;
      right: 100%;
      top: 15px;

      border: 10px solid transparent;
      border-right-color: #fff;
    }

    &.is-open {
      visibility: visible;
      opacity: 1;
      transform: translateX(5px);
    }
  }
}
</style>
