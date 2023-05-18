import { IContext, IAlert, IUser } from "../models";

const InitialContext: IContext = {
  alert: {
    open: false,
    payload: "",
    severity: "",
  },
  user: {
    email: "",
    id: "",
    name: "",
    image: "",
  },
  setAlert: (_: IAlert) => {},
  setUser: (_: IUser) => {},
};

export default InitialContext;
