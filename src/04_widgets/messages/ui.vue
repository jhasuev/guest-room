<template>
  <div class="messages">
    <div class="messages__info">
      <div class="messages__info-count">
        count: <b>{{ roomStore.getMessages.length }}</b>
      </div>
      <div class="messages__info-state">
        {{ roomStore.getState }}
      </div>
      <button
        type="button"
        class="messages__info-btn btn"
        :disabled="!!refreshTime"
        @click="refresh"
      >
        {{ (refreshTime || "") + " ↻" }}
      </button>
    </div>

    <div
      v-if="
        (!roomStore.getMessages.length && !roomStore.getState) ||
        roomStore.getState === 'error'
      "
      class="messages__empty-message"
    >
      <div v-if="roomStore.getState === 'error'">Something went wrong..</div>
      <div v-else>
        There is empty yet. <br />
        You can be first guest!
      </div>
    </div>

    <transition-group
      name="fade"
      tag="div"
      class="messages__list"
      :class="{ disabled: roomStore.getState === 'removing' }"
    >
      <message-item
        v-for="message in roomStore.getMessages"
        v-bind="message"
        :key="message.id"
        @remove="onRemoveById($event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import MessageItem from "@features/message-item";
import { useRoomStore } from "@shared/stores/room";
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

const DEFAULT_REFRESH_SECONDS = 5;
const roomStore = useRoomStore();
const isLoading = ref(false);
const refreshTime = ref(DEFAULT_REFRESH_SECONDS);
const timer: any = ref(null);

const onRemoveById = async (id: string) => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    await nextTick();
    await roomStore.removeMessage(id);
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const runTimer = () => {
  if (timer.value) return;

  timer.value = setInterval(() => {
    if (--refreshTime.value <= 0) timer.value = clearInterval(timer.value);
  }, 1000);
};

const refresh = async () => {
  await roomStore.loadMessages();
  refreshTime.value = DEFAULT_REFRESH_SECONDS;
  runTimer();
};

onMounted(async () => {
  if (!roomStore.getMessages.length) {
    await roomStore.loadMessages();
  }
  runTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style lang="scss">
.messages {
  &__info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 0.75rem;

    &-count {
      margin-right: 10px;
    }

    &-state {
      margin-left: auto;
      margin-right: 10px;
    }
  }

  &__empty-message {
    @include default-shadow;
    text-align: center;
    font-size: 0.8rem;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
