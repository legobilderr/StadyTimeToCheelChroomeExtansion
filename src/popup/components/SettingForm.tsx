import { useContext, useEffect } from "react";
import { FaRedo } from "react-icons/fa";
import { TimerContextType } from "../@types/Timer";
import TimerContext from "../context/TimerContext";
import useTimerHook from "../hooks/useTimerHook";
import RunButton from "./RunButton";
import TimeZone from "./TimeZone";

function SettingForm() {
  const {
    state: { hours, minutes, seconds, submited, formatedTime, timerId },
  } = useContext(TimerContext) as TimerContextType;
  const { reset, runInterval, startTimer } = useTimerHook();

  useEffect(() => {
    if (submited) {
      runInterval();
      return () => clearInterval(timerId as number);
    }
  }, [hours, minutes, submited, seconds]);

  return (
    <div>
      <form className="" onSubmit={startTimer}>
        <div className="card w-96 bg-primary text-primary-content rounded-sm">
          <div className="card-body">
            <h2 className="card-title">Set rest Interval</h2>
            <div className=" flex justify-between items-center">
              <TimeZone />
              <button className="btn ml-2" onClick={reset}>
                <FaRedo color="white" fontSize="1.5em" />
              </button>
            </div>
            <p>Each time extension will remind you too rest</p>
            <div className="flex h-11">
              <input
                type="time"
                className="input-bordered w-full max-w-xs  rounded-lg p-2 text-black"
                name="timer"
              />
              <RunButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingForm;
