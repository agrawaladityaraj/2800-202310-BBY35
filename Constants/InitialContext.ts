import { IContext, IAlert } from "../models";

const InitialContext: IContext = {
  alert: {
    open: false,
    payload: "",
    severity: "",
  },
  setAlert: (_: IAlert) => {},
};

export default InitialContext;
