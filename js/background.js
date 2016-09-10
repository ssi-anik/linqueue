// callback to be called on click performed.
function saveLink(info, tab){
	var message = { "message": "linqueue_get_anchor_title" };
	var key = getCurrentTime();
	var value = {};

	chrome.tabs.sendMessage(tab.id, message, function(response) {
		//Title text got from content script
		var title = (response && response.value)? response.value : "Title not found";
		
		var url = info.linkUrl; // get the url
		value.title = title; // set the title to value
		value.url = url; // set the url to value

		saveData(key, value); // save the data to localstorage
    });
};

// save the data to local storage
function saveData(key, value){
	window.localStorage[key] = JSON.stringify(value);
}

// get the current time using moment.js
function getCurrentTime(){
	return moment().format('MM-DD-YY hh:mm:ss');
}

// add to context menu.
chrome.contextMenus.create({
    title: "Add to linqueue", // context menu title
    contexts:["link"],  // ContextType (Only work on link on a page)
    onclick: saveLink // A callback function to handle the context menu clicked event
});