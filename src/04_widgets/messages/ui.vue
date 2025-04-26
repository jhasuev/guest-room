<template>
  <div class="messages">
    <message-item
      v-for="(message, i) in props.messages"
      v-bind="message"
      :key="i"
      @remove="emit('removeById', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import MessageItem from "@features/message-item";
import type { IMessage } from "@shared/interfaces/IMessage";
import { defineEmits } from "vue";

const emit = defineEmits(["removeById"]);

const props = defineProps<{
  messages: IMessage[];
}>();
</script>

<style lang="scss">
.messages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>
