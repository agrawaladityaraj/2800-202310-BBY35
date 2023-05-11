import { useReducer } from "react";

import Context from "@/Context/Context";
import Reducer from "@/Context/Reducer";

import Contstants from "../Constants";
import { IState, IAlert } from "../models";

const State = (props: any) => {
  const initialState: IState = Contstants.InitialState;

  let [state, dispatch] = useReducer(Reducer, initialState);

  const setAlert = (payload: IAlert) => {
    dispatch({ type: "setAlert", payload: payload });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        setAlert,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
