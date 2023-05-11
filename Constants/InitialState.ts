import { IState } from "../models";

const InitialState: IState = {
  alert: {
    open: false,
    payload: "",
    severity: "",
  },
};

export default InitialState;
