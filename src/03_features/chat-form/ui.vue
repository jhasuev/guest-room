<template>
  <form
    class="chat-form"
    :class="{ disabled: roomStore.getState === 'sending' }"
    @submit.prevent
  >
    <select-emodji v-model="emodji" class="chat-form__select-emodji" />

    <enter-name
      v-model="name"
      @input="errors.name = false"
      class="chat-form__name-input"
      :error="errors.name"
      :maxLength="MAX_NAME_LENGTH"
    />

    <div class="chat-form__message">
      <textarea
        v-model="msg"
        name="message"
        class="field"
        :class="{ error: errors.msg }"
        @input="errors.msg = false"
        :maxLength="MAX_MESSAGE_LENGTH"
      ></textarea>

      <text-counter
        class="chat-form__message-counter"
        :count="msg.length"
        :max="MAX_MESSAGE_LENGTH"
      />
    </div>

    <button type="button" class="chat-form__send-btn btn" @click="onSubmit">
      🚀
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SelectEmodji from "@entities/select-emodji";
import EnterName from "@entities/enter-name";
import { useUserStore } from "@store";
import { useRoomStore } from "@store";
import { getRandomgHashId } from "@shared/utils/hash";
import TextCounter from "@shared/ui/text-counter";
import { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } from "@shared/config/consts";

const userStore = useUserStore();
const roomStore = useRoomStore();
const msg = ref("");
const errors = ref({
  name: false,
  msg: false,
});

const emodji = computed({
  get: () => userStore.getUser.emodji,
  set: (value) => userStore.setEmodji(value),
});

const name = computed({
  get: () => userStore.getUser.name,
  set: (value) => userStore.setName(value),
});

const onSubmit = async () => {
  if (!msg.value.trim()) errors.value.msg = true;
  if (!name.value.trim()) errors.value.name = true;

  const errorsValues = new Set(Object.values(errors.value));
  if (errorsValues.size === 1 && !errorsValues.has(true)) {
    try {
      roomStore.sendMessage({
        id: getRandomgHashId(),
        uid: userStore.getUser.id,
        emodji: userStore.getUser.emodji,
        name: userStore.getUser.name,
        msg: msg.value,
        dt: new Date().toUTCString(),
      });

      msg.value = "";
    } catch (error) {
      console.log("error", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-form {
  @include default-shadow;
  padding: 10px;
  margin: auto;

  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-template-rows: 50px 100px;
  grid-template-areas:
    "emodji name send"
    "message message send";
  --gap: 8px;
  grid-column-gap: var(--gap);
  grid-row-gap: var(--gap);

  &__select-emodji {
    grid-area: emodji;
  }
  &__name-input {
    grid-area: name;
  }
  &__message {
    grid-area: message;
    position: relative;

    & > &-counter {
      z-index: 111;
      opacity: 1;
      right: 15px;
      bottom: 2px;
      background-color: #fff;
      padding: 2px 4px;
    }
  }
  &__send-btn {
    grid-area: send;
    font-size: 1.45rem;
  }
}
</style>
