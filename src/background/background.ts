import { startTimer } from "./submitForm";

// chrome.alarms.create({
//   periodInMinutes: 1 / 60,
// });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "SIBMIT_TIMEMR") {
    startTimer(request.inputValue);
    // chrome.alarms.create({
    //   periodInMinutes: 1 / 60,
    // });
    // setInterval(() => {
    //   console.log(222);
    // }, 1000);
  }

  // chrome.alarms.onAlarm.addListener( )
});
