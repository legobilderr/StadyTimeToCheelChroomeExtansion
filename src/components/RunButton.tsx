import React, { useContext } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { TimerContextType } from "../@types/Timer";
import TimerContext from "../context/TimerContext";
import useTimerHook from "../hooks/useTimerHook";

function RunButton() {
  const {
    state: { hours, minutes, seconds, submited, formatedTime, timerId },
  } = useContext(TimerContext) as TimerContextType;
  const { pauseInterval } = useTimerHook();

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
