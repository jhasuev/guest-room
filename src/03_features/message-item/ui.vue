<template>
  <div class="message-item">
    <div class="message-item__emodji">{{ props.emodji }}</div>

    <div
      class="message-item__name"
      :class="{
        'message-item__name--author': isMe,
      }"
      :title="isMe ? 'It\'s you...' : ''"
    >
      {{ props.name }}
    </div>

    <div class="message-item__message">
      {{ props.msg }}

      <div class="message-item__date">
        {{ formatMessageTime(props.dt) }}
      </div>
    </div>

    <button
      v-if="isMe"
      @click="emit('remove', props.id)"
      class="message-item__remove"
    >
      🗑️
    </button>
  </div>
</template>

<script setup lang="ts">
import { formatMessageTime } from "@shared/utils/time";
import type { IMessage } from "@shared/interfaces/IMessage";
import { useUserStore } from "@shared/stores/user";
import { computed, defineEmits } from "vue";

const userStore = useUserStore();
const props = defineProps<IMessage>();
const emit = defineEmits(["remove"]);

const isMe = computed(() => userStore.getUser.id === props.uid);
</script>

<style lang="scss" scoped>
.message-item {
  position: relative;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  padding: 10px;
  width: 100%;
  border-radius: 3px;

  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    "emodji name"
    "message message";

  &__emodji {
    grid-area: emodji;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 32px;
  }
  &__name {
    grid-area: name;
    display: flex;
    align-items: center;
    font-size: 1.125rem;
    padding-left: 10px;

    &--author {
      font-weight: bold;
      color: var(--action-color);
    }
  }
  &__message {
    grid-area: message;
    padding: 15px 5px 5px;
    white-space: pre-line;
    word-break: break-word;
  }
  &__date {
    margin-top: 10px;
    text-align: right;
    font-size: 0.7rem;
    color: #aaa;
  }

  &__remove {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    background-color: transparent;
  }
}
</style>
