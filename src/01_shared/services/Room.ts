import api from "./BaseAPI";
import type { IMessage } from "@/01_shared/interfaces/IMessage";

export default class {
  static register(payload: any): Promise<IMessage> {
    return api.post("auth/register", payload);
  }
}
