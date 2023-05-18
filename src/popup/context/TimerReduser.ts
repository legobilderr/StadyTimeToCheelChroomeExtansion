import { Reducer } from "react";
import { Timer, TimerAction } from "../@types/Timer";

const timerReduser: Reducer<Timer, TimerAction> = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMER":
      return {
        ...state,
        formatedTime: action.payload?.formatedTime
          ? action.payload.formatedTime
          : state.formatedTime,
        hours:
          action.payload?.hours !== undefined
            ? action.payload.hours
            : state.hours,
        minutes:
          action.payload?.minutes !== undefined
            ? action.payload.minutes
            : state.minutes,
        seconds:
          action.payload?.seconds !== undefined
            ? action.payload.seconds
            : state.seconds,
      };
    case "SUBMIT_FORM":
      return {
        ...state,
        submited:
          action.payload?.submited !== undefined
            ? action.payload.submited
            : state.submited,
        initTimerValue:
          action.payload?.initTimerValue !== undefined
            ? action.payload.initTimerValue
            : state.initTimerValue,
      };
    case "RUN_INTERVAL":
      return {
        ...state,
        formatedTime: action.payload?.formatedTime,
        timerId: action.payload?.timerId,
      };
    case "FINISH_TIMER":
      return {
        ...state,
        formatedTime:
          action.payload?.formatedTime !== undefined
            ? action.payload.formatedTime
            : state.formatedTime,
        submited:
          action.payload?.submited !== undefined
            ? action.payload.submited
            : state.submited,
      };
    case "PAUSE_TIMER":
      return {
        ...state,
        submited:
          action.payload?.submited !== undefined
            ? action.payload.submited
            : state.submited,
        paused:
          action.payload?.paused !== undefined
            ? action.payload.paused
            : state.paused,
      };
    default:
      return state;
  }
};

export default timerReduser;
