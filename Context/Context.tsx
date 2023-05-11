import { createContext } from "react";

import { IContext } from "@/models";
import Constants from "@/Constants";

const Context = createContext<IContext>(Constants.InitialContext);

export default Context;
