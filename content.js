console.log('Load content.js');

window.addEventListener("message", receiveMessage, false);


function receiveMessage(event) {
    chrome.runtime.sendMessage(event.data, function (response) {
        console.log(response);
    });
}
