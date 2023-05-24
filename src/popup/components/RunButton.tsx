import React, { useContext, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { TimerContextType } from "../@types/Timer";
import TimerContext from "../context/TimerContext";
import useTimerHook from "../hooks/useTimerHook";

function RunButton() {
  const {
    state: { submited },
    dispatch,
  } = useContext(TimerContext) as TimerContextType;
  const { pauseInterval } = useTimerHook();

  useEffect(() => {
    chrome.storage.local.get(["paused", "submited"], ({ paused, submited }) => {
      dispatch({
        type: "SUBMIT_FORM",
        payload: {
          submited: submited,
          paused: paused,
        },
      });
    });

    const handleStorageChange = (changes: any) => {
      let { paused, submited } = changes;
      dispatch({
        type: "SUBMIT_FORM",
        payload: {
          submited: !!submited ? submited.newValue : undefined,
          paused: !!paused ? paused.newValue : undefined,
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
      {submited ? (
        <button className="btn-warning ml-2" onClick={pauseInterval}>
          <FaPause color="white" fontSize="1.5em" />
        </button>
      ) : (
        <button type="submit" className="btn ml-2">
          <FaPlay color="white" fontSize="1.5em" />
        </button>
      )}
    </>
  );
}

export default RunButton;
