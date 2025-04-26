import api from "./BaseAPI";
import type { IMessage } from "@shared/interfaces/IMessage";

export default class {
  static requestMessages(): Promise<IMessage[]> {
    return api.get("/");
  }
}
