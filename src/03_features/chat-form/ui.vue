<template>
  <form class="chat-form">
    <select-emodji v-model="emodji" class="chat-form__select-emodji" />

    <input type="text" class="chat-form__name-input" />
    <textarea
      name="message"
      class="chat-form__message-textarea"
      :value="userStore.getUser.emodji"
    ></textarea>
    <button class="chat-form__send-btn">➡️</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SelectEmodji from "@/02_entities/select-emodji";
import { useUserStore } from "@shared/stores/user";

const userStore = useUserStore();

const emodji = computed({
  get: () => userStore.getUser.emodji,
  set: (value) => userStore.setEmodji(value),
});
</script>

<style lang="scss">
.chat-form {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  padding: 10px;
  max-width: 500px;
  margin: auto;

  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-template-rows: 50px 100px;
  grid-template-areas:
    "emodji name send"
    "message message send";
  grid-column-gap: 5px;
  grid-row-gap: 5px;

  &__select-emodji {
    // border: 1px solid red;
    grid-area: emodji;
  }
  &__name-input {
    border: 1px solid red;
    grid-area: name;
  }
  &__message-textarea {
    border: 1px solid red;
    resize: none;
    grid-area: message;
  }
  &__send-btn {
    border: 1px solid red;
    grid-area: send;
  }
}
</style>
