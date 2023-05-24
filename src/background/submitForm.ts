import { dammy } from "../popup/@types/Timer";

export const startTimer = (inputValue: string) => {
  const formObj: dammy = {};
  chrome.storage.local.get(["paused"], (paused) => {
    paused.paused ? afterPauseRunImterval() : firstTimeRunInterval(inputValue);
  });
};

const firstTimeRunInterval = (inputValue: string) => {
  let iputhours = Number(inputValue.split(":")[0]) || 0;
  let iputminutes = Number(inputValue.split(":")[1]) || 0;

  chrome.storage.local
    .set({
      hours: iputhours,
      minutes: iputminutes,
      seconds: 0,
      submited: true,
      submitTimerValue: inputValue,
      paused: false,
      timeExpired: false,
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
            submited: false,
            paused: false,
            timeExpired: true,
          });
          runAlert();
          clearInterval(CurentIntervalId as number);
        }
        chrome.storage.local.set({ CurentIntervalId: CurentIntervalId });
      });
  }, 1000);
  return CurentIntervalId;
};

const runAlert = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id as number },
      func: () => {
        chrome.storage.sync.get(["name"]).then((result) => {
          if (result?.name) {
            alert(`Time to rest dear ${result.name}`);
          } else {
            alert("Time to rest my friend");
          }
        });
      },
    });
  });
};
