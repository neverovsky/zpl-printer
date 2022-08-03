const DEVELOPER_MODE = !('update_url' in chrome.runtime.getManifest());

if (DEVELOPER_MODE) {
    console.log('Load content.js');
}
sendResponse({cmd: 'version', value: chrome.runtime.getManifest().version});

window.addEventListener("message", receiveMessage, false);


function receiveMessage(event) {
    if (event.data && event.data.type && event.data.type == 'zpl') {
        const message = event.data;
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
    }
}

function sendResponse(response) {
    if (DEVELOPER_MODE) {
        console.log(response);
    }
    response.type = 'from_zpl_ext';
    window.postMessage(response);
}
