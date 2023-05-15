import { format } from "date-fns";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { FaRedo } from "react-icons/fa";
interface dammy {
  [key: string]: any;
}

function SettingForm() {
  const [submited, setSubmited] = useState<boolean>(false);
  const [formatedTime, setFormatedTime] = useState<string>("--:--:--");
  const [initTimerValue, setInitTimerValue] = useState<string>();

  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSecconds] = useState<number>(0);
  let timer: number | undefined | false;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formObj: dammy = {};

    var formData = new FormData(e.currentTarget).entries();
    for (const [key, value] of formData) {
      formObj[key] = value;
    }

    let iputhours = Number(formObj.timer.split(":")[0]) || 0;
    let iputminutes = Number(formObj.timer.split(":")[1]) || 0;

    setInitTimerValue(formObj.timer);
    setSubmited(true);
    setFormatedTime(() => {
      return format(new Date(0, 0, 0, iputhours, iputminutes, 59), "HH:mm:ss");
    });
    setHours(iputhours);
    setMinutes(iputminutes);
  };

  useEffect(() => {
    if (submited) {
      runInterval();
      return () => clearInterval(timer as number);
    }
  }, [hours, minutes, submited, seconds]);

  function runInterval(): number | false {
    setFormatedTime(
      format(new Date(0, 0, 0, hours, minutes, seconds), "HH:mm:ss")
    );

    return (timer =
      !timer &&
      setInterval(function () {
        setSecconds((prev) => prev - 1);
        if (seconds === 0 && (minutes !== 0 || hours !== 0)) {
          setSecconds(59);
        }
        if (seconds == 0 && minutes !== 0) {
          setMinutes((prev) => prev - 1);
        } else if (seconds == 0 && minutes == 0) {
          setMinutes(59);
        }
        if (seconds == 0 && minutes == 0 && hours !== 0) {
          setHours((prev) => prev - 1);
        } else if (seconds == 0 && minutes == 0) {
          setHours(23);
        }

        if (seconds === 0 && hours === 0 && minutes === 0) {
          alert("sheeeet");
          setSubmited(false);
          setFormatedTime("--:--:--");
          clearInterval(timer as number);
        }
      }, 100));
  }
  const Reset = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (initTimerValue) {
      const [hours, minutes] = initTimerValue
        .split(":")
        .map((item) => Number(item));

      setFormatedTime(format(new Date(0, 0, 0, hours, minutes), "HH:mm:ss"));
      setHours(hours);
      setMinutes(minutes);
      setSecconds(0);
      clearInterval(timer as number);
    }
  };

  return (
    <div>
      <form className="" onSubmit={onSubmit}>
        <div className="card w-96 bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Set rest Interval</h2>
            <div className=" flex justify-between items-center">
              <h1>{formatedTime}</h1>
              <button className="btn ml-2" onClick={Reset}>
                <FaRedo color="white" fontSize="1.5em" />
              </button>
            </div>
            <p>Each time extension will remind you too rest</p>
            <div className="flex ">
              <input
                type="time"
                className="input-bordered w-full max-w-xs  rounded-lg p-2 text-black"
                name="timer"
              />
              <button type="submit" className="btn ml-2">
                Change interval
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SettingForm;
