import { defineStore } from "pinia";
import type { IUser } from "@shared/interfaces/IUser";

interface State {
  user: IUser;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: {
      id: "asdasdasd-gfhvcnsd-3dwefsdh-bgfntyt4w",
      emodji: "👨‍🦱",
      name: localStorage.name || "",
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
      localStorage.name = name;
    },
  },
});
