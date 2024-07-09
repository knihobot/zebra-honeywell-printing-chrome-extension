console.log('Service worker loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);

    const isHoneywell = message.type === 'honeywell_print_label';
    const url = isHoneywell ? `http://${message.ip}/service/printercommand.lua?command=${encodeURIComponent(message.zpl)}` : `http://${message.ip}/pstprnt`;

    fetch(url, {
        method: isHoneywell ? 'GET' : 'POST',
        headers: {
            'Content-Type': isHoneywell ? 'application/json' : 'text/plain'
        },
        body: isHoneywell ? null : message.zpl
    })
        .then(response => sendResponse({ status: response.status }))
        .catch(error => console.error('Error:', error));

    return true; // Indicates that the response will be sent asynchronously
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        'url': chrome.runtime.getURL('options.html')
    });
});
