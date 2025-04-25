import { defineStore } from "pinia";
import type { IUser } from "@/01_shared/interfaces/IUser";

interface State {
  user: IUser;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: {
      emodji: "👨‍🦱",
      name: "",
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setEmodji(emodji: string) {
      this.user.emodji = emodji;
    },
    setName(name: string) {
      this.user.name = name;
    },
  },
});
