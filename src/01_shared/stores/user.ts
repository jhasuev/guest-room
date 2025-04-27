import { defineStore } from "pinia";
import type { IUser } from "@shared/interfaces/IUser";
import { getRandomgUserId } from "@shared/utils/hash";

interface State {
  user: IUser;
}

let uid = localStorage.uid;
if (!uid) {
  uid = localStorage.uid = getRandomgUserId();
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: {
      id: uid,
      emodji: localStorage.emodji || "👨‍🦱",
      name: localStorage.name || "",
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setEmodji(emodji: string) {
      this.user.emodji = emodji;
      localStorage.emodji = emodji;
    },
    setName(name: string) {
      this.user.name = name;
      localStorage.name = name;
    },
  },
});
