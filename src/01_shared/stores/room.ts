import { defineStore } from "pinia";
import Room from "@shared/services/Room";
import type { IMessage } from "@shared/interfaces/IMessage";

interface State {
  messages: IMessage[];
}

export const useRoomStore = defineStore("room", {
  state: (): State => ({
    messages: [
      {
        id: "asdhsdffggh",
        uid: "1234",
        emodji: "🍍",
        name: "111 John Smith",
        msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente enim, molestias, facilis accusantium quisquam ipsum cum magni recusandae asperiores pariatur nam eum repellat, maiores reprehenderit? Facere molestiae exercitationem minus harum.",
        dt: "Fri, 25 Apr 2025 12:34:40 GMT",
      },
      {
        id: "asdhssfggh",
        uid: "12345",
        emodji: "🍍",
        name: "22 John Smith",
        msg: "Lorem ipsum dolor sit amet consect eprehenderit? Facere molestiae exercitationem minus harum.",
        dt: "Fri, 24 Apr 2025 13:34:40 GMT",
      },
      {
        id: "asdhsfdfdfggh",
        uid: "12346",
        emodji: "🍍",
        name: "33 John Smith",
        msg: "Lorem ips quisquam ipsum ationem minus harum.",
        dt: "Fri, 23 Apr 2025 11:34:40 GMT",
      },
    ],
  }),
  getters: {
    getMessages: (state) => state.messages,
  },
  actions: {
    setMessages(messages: IMessage[]) {
      this.messages = messages;
      // localStorage.messages = JSON.stringify(messages);
    },

    async request() {
      try {
        const messages = await Room.requestMessages();
        this.setMessages(messages);
        return messages;
      } catch (error) {
        return null;
      }
    },

    async sendMessage(message: IMessage) {
      this.messages.unshift(message);
      try {
        // const messages = await Room.requestMessages();
        // this.setMessages(messages);
        // return messages;
      } catch (error) {
        return null;
      }
    },

    async removeMessage(id: string) {
      console.log(id, this.messages);

      this.messages = this.messages.filter((msg) => msg.id != id);
    },
  },
});
