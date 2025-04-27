<template>
  <div class="messages-state-block">
    <div class="messages-state-block__count">
      count: <b>{{ props.count }}</b>
    </div>
    <div class="messages-state-block__state">
      {{ props.state }}
    </div>
    <button
      type="button"
      class="messages-state-block__btn btn"
      :disabled="!!refreshTime || !!props.state"
      @click="refresh()"
    >
      {{ (refreshTime || "") + " ↻" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, defineEmits, onMounted } from "vue";
import { DEFAULT_REFRESH_SECONDS } from "@shared/config/consts";

const refreshTime = ref(DEFAULT_REFRESH_SECONDS);
const timer: any = ref(null);
const emit = defineEmits(["refresh"]);

interface IProps {
  count: number;
  state: string | null;
}
const props = withDefaults(defineProps<IProps>(), {
  count: 0,
  state: "",
});

const runTimer = () => {
  if (timer.value) return;

  timer.value = setInterval(() => {
    if (!props.state && --refreshTime.value <= 0)
      timer.value = clearInterval(timer.value);
  }, 1000);
};

const refresh = async () => {
  emit("refresh");
  await new Promise((res) => setTimeout(res, 1000));
  refreshTime.value = DEFAULT_REFRESH_SECONDS;
  runTimer();
};

onMounted(async () => runTimer());
onBeforeUnmount(() => clearInterval(timer.value));
</script>

<style lang="scss">
.messages-state-block {
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  &__count {
    margin-right: 10px;
  }

  &__state {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
