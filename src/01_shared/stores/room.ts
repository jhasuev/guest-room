import { defineStore } from "pinia";
import Room from "@/01_shared/services/Room";
import type { IMessage } from "@/01_shared/interfaces/IMessage";

interface State {
  messages: IMessage[];
}

export const useAuthStore = defineStore("room", {
  state: (): State => ({
    messages: [],
  }),
  getters: {
    getMessages: (state) => !!state.messages,
  },
  actions: {
    register(fields: any) {
      return Room.register(fields);
    },
  },
});
