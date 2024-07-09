var print = document.getElementById('print');

print.onclick = function () {
    console.log('Print button clicked.');
    chrome.runtime.sendMessage({
        type: document.getElementById('printerType').value,
        zpl: document.getElementById('zpl').value,
        ip: document.getElementById('printerAddress').value
    });
    return false;
}