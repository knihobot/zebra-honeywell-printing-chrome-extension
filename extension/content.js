console.log("content.js loaded");

let messageListenerAdded = false;

if (!messageListenerAdded) {
  window.addEventListener(
    "message",
    function (event) {
      if (
        typeof event.data.type === "undefined" ||
        event.data.type !== "zebra_print_label"
      ) {
        return;
      }

      console.log("Forwarding message to background.js");

      chrome.runtime.sendMessage(event.data, function (response) {
        console.log(response);
      });
    },
    false
  );

  messageListenerAdded = true;
}
