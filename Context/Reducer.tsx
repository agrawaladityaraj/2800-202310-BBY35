import { IState } from "@/models";

const Reducer = (state: IState, action: { type: string; payload: any }) => {
  const { type, payload } = action;
  switch (type) {
    case "setAlert":
      return {
        ...state,
        alert: payload,
      };
    case "setUser":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default Reducer;
