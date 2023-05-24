import { dammy } from "../popup/@types/Timer";

export const pauseTimer = () => {
  chrome.storage.local.set({
    paused: true,
    submited: false,
  });
  chrome.storage.local.get(["CurentIntervalId"], (CurentIntervalId) => {
    clearInterval(CurentIntervalId.CurentIntervalId);
  });
};
