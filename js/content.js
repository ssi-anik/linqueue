var title = null;

document.addEventListener("mousedown", function(event){
    //catch the right click event
    if(event.button == 2) { 
        title = event.target.innerText.trim();//get the clicked event text
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === "linqueue_get_anchor_title") {
        sendResponse({'title': title});
    }
});