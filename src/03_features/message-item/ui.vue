<template>
  <div class="message-item">
    <emodji-item
      class="message-item__emodji"
      :emodji="props.emodji"
      :selected="isMe"
    />

    <div
      class="message-item__name"
      :class="{
        'message-item__name--author': isMe,
      }"
    >
      <div>
        {{ props.name }}
      </div>
    </div>

    <div class="message-item__message">
      {{ props.msg }}

      <div class="message-item__date">
        {{ formatMessageTime(props.dt) }}
      </div>
    </div>

    <button
      v-if="isMe || isAdmin"
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
import { useUserStore } from "@store";
import EmodjiItem from "@shared/ui/emodji-item";
import { computed, defineEmits } from "vue";

const userStore = useUserStore();
const props = defineProps<IMessage>();
const emit = defineEmits(["remove"]);

const isMe = computed(() => userStore.getUser.id === props.uid);
const isAdmin = computed(() => !!localStorage.isAdmin);
</script>

<style lang="scss" scoped>
.message-item {
  position: relative;

  @include default-shadow;
  padding: 10px;
  width: 100%;

  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    "emodji name"
    "message message";

  &__emodji {
    grid-area: emodji;

    cursor: default;
    width: 50px;
    height: 50px;
    pointer-events: none;
  }
  &__name {
    grid-area: name;

    display: flex;
    align-items: center;
    font-size: 1.125rem;
    padding-left: 10px;
    overflow: hidden;

    div {
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

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
