import { PropsWithChildren, createContext, useReducer } from "react";
import { Timer, TimerContextType, dammy } from "../@types/Timer";
import timerReduser from "./TimerReduser";

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: PropsWithChildren) => {
  const timer: Timer = {
    hours: 0,
    seconds: 0,
    minutes: 0,
    submited: false,
    formatedTime: "--:--:--",
    timerId: undefined,
    initTimerValue: "",
    paused: false,
  };

  const [state, dispatch] = useReducer(timerReduser, timer);

  return (
    <TimerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
