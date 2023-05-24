import React, { useContext, useEffect } from "react";
import { TimerContextType } from "../@types/Timer";
import TimerContext from "../context/TimerContext";
import useTimerHook from "../hooks/useTimerHook";

function TimerInput() {
  const {
    state: { initTimerValue },
    dispatch,
  } = useContext(TimerContext) as TimerContextType;

  const { changeTimerInput } = useTimerHook();

  useEffect(() => {
    chrome.storage.local.get(["submitTimerValue"], (result) => {
      if (result.submitTimerValue) {
        dispatch({
          type: "SUBMIT_FORM",
          payload: {
            initTimerValue: result.submitTimerValue,
          },
        });
      }
    });
    const handleStorageChange = (changes: any) => {
      let { submitTimerValue } = changes;
      dispatch({
        type: "SUBMIT_FORM",
        payload: {
          initTimerValue: !!submitTimerValue
            ? submitTimerValue.newValue
            : undefined,
        },
      });
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);
  return (
    <>
      <input
        onChange={changeTimerInput}
        value={initTimerValue}
        type="time"
        className="input-bordered w-full max-w-xs  rounded-lg p-2 text-black"
        name="timer"
      />
    </>
  );
}

export default TimerInput;
