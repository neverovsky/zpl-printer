# ZPL Printer Chrome extension

Allow to print any raw data from JavaScript at any opened page directly to any .ZPL printer like Zebra


##Usage:
###Print barcode 1234567
```
window.postMessage(
{
    type: "zpl", 
    cmd: "print", 
    printer: 'http://127.0.0.1:9100', 
    raw: "^XA^FO50,50^B8N,100,Y,N^FD1234567^FS^XZ"
});
```
###Listen extension:
```
window.addEventListener("message", function (event){
    if (event.data && event.data.type && event.data.type == 'from_zpl_ext') {
        // receive version of extension if exists
        if (event.data.cmd === 'version') {
            ZPL_EXTENSION_VERSION = event.data.value;
            return;
        }
        // receive status of printing
        if (event.data.cmd === 'status') {
            console.log(event.data)
            return;
        }
    }
}, false);
```
