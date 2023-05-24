import { pauseTimer } from "./pauseTimer";
import { resetTimer } from "./reset";
import { startTimer } from "./submitForm";

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action == "SIBMIT_TIMEMR") {
    startTimer(request.inputValue);
  }
  if (request.action == "PAUSE_TIMER") {
    pauseTimer();
  }
  if (request.action == "RESET_TIMER") {
    resetTimer();
  }
  // chrome.alarms.onAlarm.addListener( )
});
