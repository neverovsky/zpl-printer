console.log('Load background.js');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);

    if (message.cmd === 'print') {
        console.log('printing');
        fetch(message.printer, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: message.raw
        }).catch(function () {
        }).finally(function () {
            console.log('printed');
            sendResponse({status: 'success'});
        })

    }
    return true;
});
