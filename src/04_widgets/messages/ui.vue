<template>
  <div class="messages">
    <messages-state-block
      class="messages__info"
      :count="roomStore.getMessages.length"
      :state="roomStore.getState"
      @refresh="refresh()"
    />

    <alert-block
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
    </alert-block>

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
import { ref, nextTick, onMounted } from "vue";
import { useRoomStore } from "@store";

import MessageItem from "@features/message-item";
import AlertBlock from "@shared/ui/alert-block";
import MessagesStateBlock from "@features/messages-state-block";

const roomStore = useRoomStore();
const isLoading = ref(false);

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

const refresh = async () => {
  await roomStore.loadMessages();
};

onMounted(async () => {
  if (!roomStore.getMessages.length) {
    await roomStore.loadMessages();
  }
});
</script>

<style lang="scss">
.messages {
  &__info {
    margin-bottom: 1rem;
  }

  &__empty-message {
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
