import * as React from "react";

import { Action, initialState, accountReducer, State } from "./common2";

const { createContext, useContext, useReducer } = React;

export const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const Provider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useDispatch = () => {
  return useContext(dispatchCtx);
};

export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(stateCtx);
  return state[property]; // only one depth selector for comparison
};
