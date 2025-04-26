import api from "./BaseAPI";
import type { IMessage } from "@shared/interfaces/IMessage";

export default class {
  static load(): Promise<IMessage[]> {
    return api.get("/");
  }
  static send(payload: IMessage[]): Promise<IMessage[]> {
    return api.put("/", payload);
  }
}
