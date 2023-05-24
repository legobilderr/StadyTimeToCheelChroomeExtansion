import { format } from "date-fns";
import React, { ChangeEvent, FormEvent, MouseEvent, useContext } from "react";
import { TimerContextType, dammy } from "../@types/Timer";
import TimerContext from "../context/TimerContext";

function useTimerHook() {
  const { dispatch } = useContext(TimerContext) as TimerContextType;

  const startTimer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formObj: dammy = {};

    var formData = new FormData(e.currentTarget).entries();
    for (const [key, value] of formData) {
      formObj[key] = value;
    }

    chrome.runtime.sendMessage({
      action: "SIBMIT_TIMEMR",
      inputValue: formObj.timer,
    });
  };

  const reset = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    chrome.runtime.sendMessage({
      action: "RESET_TIMER",
    });
  };

  const pauseInterval = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    chrome.runtime.sendMessage({
      action: "PAUSE_TIMER",
    });
  };

  const changeTimerInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SUBMIT_FORM",
      payload: {
        initTimerValue: e.currentTarget.value,
      },
    });
  };
  return { startTimer, reset, pauseInterval, changeTimerInput };
}

export default useTimerHook;
