console.log('Service worker loaded');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);

    fetch(`http://${message.ip}/pstprnt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: message.zpl
    })
        .then(response => sendResponse({ status: response.status }))
        .catch(error => console.error('Error:', error));

    return true;
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        'url': chrome.runtime.getURL('options.html')
    });
});
