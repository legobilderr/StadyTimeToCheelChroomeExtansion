import { FaRedo } from "react-icons/fa";
import useTimerHook from "../hooks/useTimerHook";
import RunButton from "./RunButton";
import TimeZone from "./TimeZone";
import TimerInput from "./TimerInput";

function SettingForm() {
  const { reset, startTimer } = useTimerHook();
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
              <TimerInput />
              <RunButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingForm;
