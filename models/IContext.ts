import { IAlert } from "@/models";

export interface IContext {
  alert: IAlert;
  setAlert: (alert: IAlert) => void;
}
