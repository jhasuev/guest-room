<script setup lang="ts">
defineOptions({ name: "Room" });
import ChatForm from "@features/chat-form/";
import Messages from "@widgets/messages";
import { useRoomStore } from "@shared/stores/room";
import { onMounted } from "vue";

const roomStore = useRoomStore();

onMounted(async () => {
  if (!roomStore.getMessages.length) {
    const messages = await roomStore.loadMessages();
    console.log(messages);
  }
});
</script>

<template>
  <div>
    <chat-form />
    <messages class="messages" :messages="roomStore.getMessages" />
  </div>
</template>

<style lang="scss" scoped>
.messages {
  margin-top: 40px;
}
</style>
