const DEVELOPER_MODE  = !('update_url' in chrome.runtime.getManifest());;

if(DEVELOPER_MODE){
    console.log('Load content.js',chrome.runtime.getManifest());
}

window.addEventListener("message", receiveMessage, false);


function receiveMessage(event) {
    if (event.data && event.data.type && event.data.type == 'zpl') {
        chrome.runtime.sendMessage(event.data, function (response) {
            console.log(response);
        });
    }
}
