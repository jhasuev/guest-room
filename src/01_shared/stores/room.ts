import { defineStore } from "pinia";
import Room from "@shared/services/Room";
import type { IMessage } from "@shared/interfaces/IMessage";

interface State {
  messages: IMessage[];
}

export const useRoomStore = defineStore("room", {
  state: (): State => ({
    messages: [],
  }),
  getters: {
    getMessages: (state) => state.messages,
  },
  actions: {
    setMessages(messages: IMessage[]) {
      this.messages = messages;
    },

    async loadMessages() {
      try {
        const messages = await Room.load();
        this.setMessages(messages);
        return messages;
      } catch (error) {
        return null;
      }
    },

    async send(messages: IMessage[]) {
      try {
        // TODO load messages before send to resolve overwriting
        const result = await Room.send(messages);
        this.messages = result;

        return result;
      } catch (error) {
        return null;
      }
    },

    async sendMessage(message: IMessage) {
      const messages = [...this.messages];
      messages.unshift(message);
      this.send(messages);
    },

    async removeMessage(id: string) {
      const messages = [...this.messages].filter((msg) => msg.id != id);
      return await this.send(messages);
    },
  },
});
