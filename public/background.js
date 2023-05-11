chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "translate") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["public/translateHandler.js"],
    });
  }
});
