import { dammy } from "../popup/@types/Timer";

export const resetTimer = () => {
  chrome.storage.local.set({
    paused: false,
    submited: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  chrome.storage.local.get(["CurentIntervalId"], (CurentIntervalId) => {
    clearInterval(CurentIntervalId.CurentIntervalId);
  });
};
