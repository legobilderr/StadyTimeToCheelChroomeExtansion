import { format } from "date-fns";
import React, { FormEvent, MouseEvent, useContext } from "react";
import { TimerContextType, dammy } from "../@types/Timer";
import TimerContext from "../context/TimerContext";

function useTimerHook() {
  const {
    state: {
      hours,
      minutes,
      seconds,
      submited,
      formatedTime,
      timerId,
      initTimerValue,
      paused,
    },
    dispatch,
  } = useContext(TimerContext) as TimerContextType;

  const startTimer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paused) {
      dispatch({
        type: "SUBMIT_FORM",
        payload: {
          submited: true,
        },
      });
    } else {
      const formObj: dammy = {};

      var formData = new FormData(e.currentTarget).entries();
      for (const [key, value] of formData) {
        formObj[key] = value;
      }

      let iputhours = Number(formObj.timer.split(":")[0]) || 0;
      let iputminutes = Number(formObj.timer.split(":")[1]) || 0;
      let formatedTime = format(
        new Date(0, 0, 0, iputhours, iputminutes, 59),
        "HH:mm:ss"
      );
      dispatch({
        type: "SUBMIT_FORM",
        payload: {
          submited: true,
          initTimerValue: formObj.timer,
        },
      });
      dispatch({
        type: "UPDATE_TIMER",
        payload: {
          hours: iputhours,
          minutes: iputminutes,
          formatedTime: formatedTime,
        },
      });
    }
  };

  const runInterval = () => {
    dispatch({
      type: "RUN_INTERVAL",
      payload: {
        formatedTime: format(
          new Date(0, 0, 0, hours, minutes, seconds),
          "HH:mm:ss"
        ),
        timerId: getTimerId(),
      },
    });
  };

  const getTimerId = () => {
    var CurentIntervalId = setInterval(function () {
      if (seconds !== 0) {
        dispatch({
          type: "UPDATE_TIMER",
          payload: {
            seconds: seconds - 1,
          },
        });
      } else if (minutes !== 0) {
        dispatch({
          type: "UPDATE_TIMER",
          payload: {
            minutes: minutes - 1,
            seconds: 59,
          },
        });
      } else if (hours !== 0) {
        dispatch({
          type: "UPDATE_TIMER",
          payload: {
            hours: hours - 1,
            minutes: 59,
            seconds: 59,
          },
        });
      } else {
        dispatch({
          type: "FINISH_TIMER",
          payload: {
            formatedTime: "--:--:--",
            submited: false,
          },
        });
        clearInterval(timerId as number);
        clearInterval(CurentIntervalId as number);
        chrome.storage.sync.get(["name"]).then((result) => {
          if (result?.name) {
            alert(`Time to rest dear ${result.name}`);
          } else {
            alert("Time to rest my friend");
          }
        });
      }
    }, 1000);
    return CurentIntervalId;
  };

  const reset = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (initTimerValue) {
      const [hours, minutes] = initTimerValue
        .split(":")
        .map((item) => Number(item));
      dispatch({
        type: "UPDATE_TIMER",
        payload: {
          hours: hours,
          minutes: minutes,
          seconds: 0,
          // formatedTime: format(new Date(0, 0, 0, hours, minutes), "HH:mm:ss"),
        },
      });
      clearInterval(timerId as number);
    }
  };

  const pauseInterval = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: "PAUSE_TIMER",
      payload: {
        submited: false,
        paused: true,
      },
    });
  };
  return { startTimer, runInterval, reset, pauseInterval };
}

export default useTimerHook;
