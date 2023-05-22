import { dammy } from "../popup/@types/Timer";

export const startTimer = (inputValue: string) => {
  const formObj: dammy = {};

  let iputhours = Number(inputValue.split(":")[0]) || 0;
  let iputminutes = Number(inputValue.split(":")[1]) || 0;
  console.log(iputhours, iputminutes);
  chrome.storage.local
    .set({ hours: iputhours, minutes: iputminutes, seconds: 60 })
    .then(() => {
      console.log("Value is set to " + iputhours + " minutes " + iputminutes);
    });
  getTimerId();
};

const runInterval = () => {
  //   dispatch({
  //     type: "RUN_INTERVAL",
  //     payload: {
  //       timerId: getTimerId(),
  //     },
  //   });
};

const getTimerId = () => {
  var CurentIntervalId = setInterval(function () {
    chrome.storage.local.get(["hours", "minutes", "seconds"]).then((result) => {
      console.log(result);
    });
    //     if (result.name) {
    //       alert(`Time to rest dear ${result.name}`);
    //     } else {
    //       alert("Time to rest my friend");
    //     }
    //   });
    // if (seconds !== 0) {
    //   dispatch({
    //     type: "UPDATE_TIMER",
    //     payload: {
    //       seconds: seconds - 1,
    //     },
    //   });
    // } else if (minutes !== 0) {
    //   dispatch({
    //     type: "UPDATE_TIMER",
    //     payload: {
    //       minutes: minutes - 1,
    //       seconds: 59,
    //     },
    //   });
    // } else if (hours !== 0) {
    //   dispatch({
    //     type: "UPDATE_TIMER",
    //     payload: {
    //       hours: hours - 1,
    //       minutes: 59,
    //       seconds: 59,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: "FINISH_TIMER",
    //     payload: {
    //       formatedTime: "--:--:--",
    //       submited: false,
    //     },
    //   });
    //   clearInterval(timerId as number);
    //   clearInterval(CurentIntervalId as number);
    //   chrome.storage.sync.get(["name"]).then((result) => {
    //     if (result.name) {
    //       alert(`Time to rest dear ${result.name}`);
    //     } else {
    //       alert("Time to rest my friend");
    //     }
    //   });
    // }
  }, 1000);
  return CurentIntervalId;
};
