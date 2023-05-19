import { useReducer } from "react";

import Context from "@/Context/Context";
import Reducer from "@/Context/Reducer";

import Contstants from "../Constants";
import { IState, IAlert, IUser } from "../models";

const State = (props: any) => {
  const initialState: IState = Contstants.InitialState;

  let [state, dispatch] = useReducer(Reducer, initialState);

  const setAlert = (payload: IAlert) => {
    dispatch({ type: "setAlert", payload: payload });
  };

  const setUser = (payload: IUser) => {
    dispatch({ type: "setUser", payload: payload });
  };
  return (
    <Context.Provider
      value={{
        ...state,
        setAlert,
        setUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
