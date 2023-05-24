import { dammy } from "../popup/@types/Timer";

export const startTimer = (inputValue: string) => {
  const formObj: dammy = {};
  console.log("SIBMIT_TIMEMR2");
  chrome.storage.local.get(["paused"], (paused) => {
    paused.paused ? afterPauseRunImterval() : firstTimeRunInterval(inputValue);
  });
};

const firstTimeRunInterval = (inputValue: string) => {
  let iputhours = Number(inputValue.split(":")[0]) || 0;
  let iputminutes = Number(inputValue.split(":")[1]) || 0;
  console.log(iputhours, iputminutes);

  chrome.storage.local
    .set({
      hours: iputhours,
      minutes: iputminutes,
      seconds: 0,
      submited: true,
      submitTimerValue: inputValue,
      paused: false,
    })
    .then(() => {
      getTimerId();
    });
};

const afterPauseRunImterval = () => {
  chrome.storage.local
    .set({
      submited: true,
      paused: false,
    })
    .then(() => {
      getTimerId();
    });
};

const getTimerId = () => {
  console.log("SIBMIT_TIMEMR3");
  var CurentIntervalId = setInterval(function () {
    chrome.storage.local
      .get(["hours", "minutes", "seconds"])
      .then(({ hours, minutes, seconds }) => {
        if (seconds !== 0) {
          chrome.storage.local.set({ seconds: seconds - 1 });
        } else if (minutes !== 0) {
          chrome.storage.local.set({ minutes: minutes - 1, seconds: 59 });
        } else if (hours !== 0) {
          chrome.storage.local.set({
            hours: hours - 1,
            minutes: 59,
            seconds: 59,
          });
        } else {
          chrome.storage.local.set({
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          clearInterval(CurentIntervalId as number);
        }
        chrome.storage.local.set({ CurentIntervalId: CurentIntervalId });
      });
  }, 1000);
  return CurentIntervalId;
};
