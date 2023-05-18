import { CSSProperties, useContext, useEffect } from "react";
import { TimerContextType, extendProperties } from "../@types/Timer";
import TimerContext from "../context/TimerContext";

function TimeZone() {
  const {
    state: { hours, minutes, seconds },
  } = useContext(TimerContext) as TimerContextType;
  return (
    <>
      <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours } as any}></span>
          </span>
          hours
        </div>
        <span className="font-mono text-3xl items-center flex">:</span>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes } as any}></span>
          </span>
          min
        </div>
        <span className="font-mono text-3xl items-center flex">:</span>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds } as any}></span>
          </span>
          sec
        </div>
      </div>
    </>
  );
}

export default TimeZone;
