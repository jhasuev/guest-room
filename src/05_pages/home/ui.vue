<script setup lang="ts">
defineOptions({ name: "Room" });
import ChatForm from "@features/chat-form/";
import Messages from "@widgets/messages";
import { useRoomStore } from "@shared/stores/room";
import { onMounted } from "vue";

const roomStore = useRoomStore();

onMounted(async () => {
  // const messages = await roomStore.request();
  // console.log(messages);
});

const onRemoveById = (id: string) => {
  console.log(id);
  roomStore.removeMessage(id);
};
</script>

<template>
  <div>
    <chat-form />
    <messages
      class="messages"
      :messages="roomStore.getMessages"
      @removeById="onRemoveById($event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.messages {
  margin-top: 20px;
}
</style>
