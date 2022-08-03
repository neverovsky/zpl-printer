const DEVELOPER_MODE = !('update_url' in chrome.runtime.getManifest());

if (DEVELOPER_MODE) {
    console.log('Load background.js');
}


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (DEVELOPER_MODE) {
        console.log(message);
    }

    if (message.cmd === 'version') {
        const manifestData = chrome.runtime.getManifest();
        sendResponse({cmd: 'version', value: manifestData.version});
        return true;
    }

    if (message.cmd === 'print') {
        if (DEVELOPER_MODE) {
            console.log('printing');
        }
        fetch(message.printer, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: message.raw
        }).catch(function () {
        }).finally(function () {
            if (DEVELOPER_MODE) {
                console.log('printed');
            }
            sendResponse({cmd: 'status', value: 'success'});
        })
    }
    return true;
});
