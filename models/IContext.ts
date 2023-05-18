import { IAlert, IUser } from "@/models";

export interface IContext {
  alert: IAlert;
  setAlert: (alert: IAlert) => void;
  user: IUser;
  setUser: (user: IUser) => void;
}
