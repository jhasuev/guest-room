<template>
  <transition-group name="fade" tag="div" class="messages">
    <message-item
      v-for="message in props.messages"
      v-bind="message"
      :key="message.id"
      @remove="onRemoveById($event)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import MessageItem from "@features/message-item";
import type { IMessage } from "@shared/interfaces/IMessage";
import { useRoomStore } from "@shared/stores/room";
import { ref, nextTick } from "vue";

const roomStore = useRoomStore();
const isLoading = ref(false);

const props = defineProps<{
  messages: IMessage[];
}>();

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
</script>

<style lang="scss">
.messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
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
