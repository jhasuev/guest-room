<template>
  <div class="select-emodji" ref="containerRef">
    <div class="select-emodji__selected" @click="onClickOpen()">
      {{ selected }}
    </div>

    <div class="select-emodji__list" :class="{ 'is-open': isOpen }">
      <div
        v-for="(emodji, i) in emodjis"
        :key="i"
        class="select-emodji__list-item"
        :class="{ 'select-emodji__list-item--selected': selected === emodji }"
        @click="onSelect(emodji)"
      >
        {{ emodji }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
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
  height: 50px;
  width: 50px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  user-select: none;

  &__selected {
    display: flex;
    align-items: center;
    justify-content: center;

    height: inherit;
    font-size: 30px;

    cursor: pointer;
  }

  &__list {
    position: absolute;
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

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.125);
      border: 1px solid transparent;

      width: 60px;
      height: 60px;

      cursor: pointer;
      transition: transform 0.1s;

      &:hover {
        transform: scale(0.9);
      }

      &--selected {
        box-shadow: inset 0 0 15px var(--primary-color);
        border-radius: 4px;
        font-size: 30px;
      }
      &--selected:hover {
        transform: scale(1);
      }
    }
  }
}
</style>
