import { defineStore } from "pinia";
import Room from "@shared/services/Room";
import type { IMessage } from "@shared/interfaces/IMessage";

type TState = "loading" | "sending" | "removing" | "error" | null;

interface State {
  messages: IMessage[];
  state: TState;
}

export const useRoomStore = defineStore("room", {
  state: (): State => ({
    messages: [],
    state: null,
  }),
  getters: {
    getMessages: (state) => state.messages,
    getState: (state) => state.state,
  },
  actions: {
    setSate(state?: TState) {
      this.state = state ?? null;
    },

    setMessages(messages: IMessage[]) {
      this.messages = messages;
    },

    async loadMessages() {
      this.setSate("loading");
      try {
        const messages = await Room.load();
        this.setMessages(messages);

        this.setSate(null);
        return messages;
      } catch (error) {
        this.setSate("error");
        return error;
      }
    },

    async send(messages: IMessage[]) {
      try {
        const result = await Room.send(messages);
        this.messages = result;

        this.setSate(null);
        return result;
      } catch (error) {
        this.setSate("error");
        return error;
      }
    },

    async sendMessage(message: IMessage) {
      try {
        this.setSate("sending");
        const remoteMessages = await Room.load();

        const messages = [...remoteMessages];
        messages.unshift(message);

        const result = await this.send(messages);
        this.setSate(null);
        return result;
      } catch (error) {
        this.setSate("error");
        return error;
      }
    },

    async removeMessage(id: string) {
      try {
        this.setSate("removing");
        const remoteMessages = await Room.load();

        const messages = [...remoteMessages].filter((msg) => msg.id != id);
        const result = await this.send(messages);

        this.setSate(null);
        return result;
      } catch (error) {
        this.setSate("error");
        return error;
      }
    },
  },
});
