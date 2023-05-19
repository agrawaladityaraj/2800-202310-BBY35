import { IState } from "../models";

const InitialState: IState = {
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
};

export default InitialState;
