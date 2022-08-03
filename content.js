const DEVELOPER_MODE = !('update_url' in chrome.runtime.getManifest());
const FROM_ZPL_CODE = 'from_zpl_ext';

if (DEVELOPER_MODE) {
    console.log('Load content.js', chrome.runtime.getManifest());
}

window.postMessage({
    type: FROM_ZPL_CODE,
    cmd: 'version',
    value: chrome.runtime.getManifest().version
});

window.addEventListener("message", receiveMessage, false);


function receiveMessage(event) {
    if (event.data && event.data.type && event.data.type == 'zpl') {
        chrome.runtime.sendMessage(event.data, function (response) {
            if (DEVELOPER_MODE) {
                console.log(response);
            }
            response.type = FROM_ZPL_CODE;
            window.postMessage(response);
        });
    }
}
