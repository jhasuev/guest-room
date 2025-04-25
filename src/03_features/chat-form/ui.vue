<template>
  <form class="chat-form" @submit.prevent>
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
import SelectEmodji from "@/02_entities/select-emodji";
import EnterName from "@/02_entities/enter-name";
import { useUserStore } from "@shared/stores/user";

const userStore = useUserStore();
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

const onSubmit = () => {
  if (!msg.value.trim()) errors.value.msg = true;
  if (!name.value.trim()) errors.value.name = true;

  // we can send message...
  console.log("sending...");
};
</script>

<style lang="scss">
.chat-form {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  padding: 10px;
  max-width: 500px;
  margin: auto;
  border-radius: 3px;

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
    resize: none;
    grid-area: message;

    padding: 15px;
  }
  &__send-btn {
    grid-area: send;
    font-size: 22px;
  }
}
</style>
