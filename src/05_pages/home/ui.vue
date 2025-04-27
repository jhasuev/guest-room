<script setup lang="ts">
defineOptions({ name: "Room" });
import ChatForm from "@features/chat-form/";
import Messages from "@widgets/messages";
</script>

<template>
  <div>
    <chat-form />
    <hr class="divider" />
    <messages class="messages" />
  </div>
</template>

<style lang="scss" scoped>
.messages {
  margin-top: 20px;
}
</style>
