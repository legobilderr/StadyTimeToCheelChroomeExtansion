import { PropsWithChildren, createContext, useReducer } from "react";
import { anyObject, optionsContextType } from "../@types/Options";
import optionsReduser from "./OptionsRedusser";

const OptionContext = createContext<optionsContextType | null>(null);

export const OptionProvider = ({ children }: PropsWithChildren) => {
  const options: anyObject = {
    name: "",
  };
  const [state, dispatch] = useReducer(optionsReduser, options);

  return (
    <OptionContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export default OptionContext;
