console.log('background.js loaded');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);

    var isHoneywell = message.type === 'honeywell_print_label';

    var url = isHoneywell ? 'http://' + message.ip + '/service/printercommand.lua?command=' + encodeURIComponent(message.zpl) : 'http://' + message.ip + '/pstprnt';

    var request = new XMLHttpRequest();

    request.onload = function () {
        sendResponse({ status: request.status });
    }

    request.open(isHoneywell ? 'GET' : 'POST', url, true);
    request.send(isHoneywell ? undefined : message.zpl);

    return true;
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('options.html')
    });
});