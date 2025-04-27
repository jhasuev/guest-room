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
    />

    <textarea
      v-model="msg"
      name="message"
      class="chat-form__message-textarea field"
      :class="{ error: errors.msg }"
      @input="errors.msg = false"
    ></textarea>
    <button type="button" class="chat-form__send-btn btn" @click="onSubmit">
      🚀
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SelectEmodji from "@entities/select-emodji";
import EnterName from "@entities/enter-name";
import { useUserStore } from "@shared/stores/user";
import { useRoomStore } from "@shared/stores/room";
import { getRandomgUserId } from "@shared/utils/hash";

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
    const now = new Date();
    const utcString = now.toUTCString();

    try {
      roomStore.sendMessage({
        id: getRandomgUserId(),
        uid: userStore.getUser.id,
        emodji: userStore.getUser.emodji,
        name: userStore.getUser.name,
        msg: msg.value,
        dt: utcString,
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
  &__message-textarea {
    width: 100%;
    resize: none;
    grid-area: message;

    padding: 15px;
    font-size: 1rem;
  }
  &__send-btn {
    grid-area: send;
    font-size: 1.45rem;
  }
}
</style>
